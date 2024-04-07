<template>
    <div class="recipeGenerator">
        <TopBar whichPage="generator" />
        <div class="content-container">
            <RecipeGeneratorSidebar :selected="selected" />
            <div class="view-container">
                <InputLeftover v-if="selected === 'input'" @generateRecipe="generateRecipe" />
                <GenerateLoading v-if="selected === 'generate'" :ingredients="ingredients" :categories="categories"
                    :dietaryRestrictions="dietaryRestrictions" :prev_recipe_name="prev_recipe_name"
                    @recipeGenerated="recipeGenerated" @back="handleBack" />
                <div class="recipe-details-container" v-if="selected === 'save'">
                    <RecipeDetails :selectedRecipe="recipe" :selectedIngredients="selectedIngredients"
                        :likeExists="false" />
                    <CircleButton logo="src/assets/chefbot-button.png" @click="toggleChefBot" />
                    <ChefBot :key="componentKey" :selectedRecipe="recipe" v-show="showChefBot"
                        @close="showChefBot = false" @togglePublishToCommunity="togglePublishToCommunity" />
                    <div class="button-container">
                        <SaveRecipeButton @save-recipe="submitRecipe" :disabled="disabled" />
                        <button @click="regenerateRecipe" class="reloadButton">Regenerate</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChefBot from "@/components/ChefBot.vue";
import CircleButton from "@/components/CircleButton.vue";
import InputLeftover from "@/components/InputLeftover.vue";
import TopBar from "@/components/TopBar.vue";
import RecipeGeneratorSidebar from "@/components/RecipeGeneratorSidebar.vue";
import GenerateLoading from "@/components/GenerateLoading.vue";
import RecipeDetails from "@/components/RecipeDetails.vue";
import SaveRecipeButton from "@/components/SaveRecipeButton.vue";
import { app, auth, storage } from "@/firebase.js";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "vue-toastification";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const db = getFirestore(app);

export default {
    name: "Recipe Generator",
    components: {
        ChefBot,
        CircleButton,
        InputLeftover,
        TopBar,
        RecipeGeneratorSidebar,
        GenerateLoading,
        RecipeDetails,
        SaveRecipeButton,
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    data() {
        return {
            showChefBot: false,
            selected: "input",
            categories: null,
            dietaryRestrictions: '',
            ingredients: [],
            recipe: {},
            selectedIngredients: [],
            prev_recipe_name: null,
            disabled: false,
        };
    },
    methods: {
        toggleChefBot() {
            this.showChefBot = !this.showChefBot;
        },
        regenerateRecipe() {
            this.disabled = false;
            this.selected = 'generate';
        },
        handleBack() {
            this.selected = "input";
        },
        generateRecipe(props) {
            this.categories = props.categories;
            this.dietaryRestrictions = props.dietaryRestrictions;
            this.ingredients = props.ingredients;
            this.selected = "generate";
            console.log(this.categories);
            console.log(this.dietaryRestrictions);
        },
        recipeGenerated(props) {
            console.log("recipegenerated :)");
            console.log(props.generatedRecipe);

            try {
                this.recipe = props.generatedRecipe;
                // this.componentKey++;

                const user = auth.currentUser;
                let user_id = user ? user.uid : "chefbot";
                this.recipe.user_id = user_id;
                this.recipe.created_date = new Date();
                this.prev_recipe_name = this.recipe.recipe_name;
                this.recipe.community = false;
                this.recipe.AIgenerated = true;
                this.selectedIngredients = this.recipe.ingredients.map(() => false);


                let temporaryLeftovers = [];

                // Check each ingredient in the recipe if it's present in this.ingredients
                this.recipe.ingredients.forEach((recipeIngredient, recipeIndex) => {
                    // Iterate over this.ingredients to find a match
                    for (let i = 0; i < this.ingredients.length; i++) {
                        const ingredient = this.ingredients[i].name;
                        // Check if the recipeIngredient contains ingredient
                        if (recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())) {
                            this.selectedIngredients[recipeIndex] = true; // Mark checkbox as checked if ingredient is in this.ingredients
                            temporaryLeftovers.push(ingredient.toLowerCase());
                            break; // Exit the loop once a match is found
                        }
                    }
                });

                this.recipe.leftovers = temporaryLeftovers;

                console.log(this.recipe.leftovers);
                this.selected = "save";
                console.log(this.recipe);
                console.log(typeof this.recipe);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        },
        async submitRecipe() {
            this.disabled = true;
            const recipe_id = uuidv4().toString();
            this.recipe.like_count = 0;
            this.recipe.recipe_id = recipe_id;
            console.log(this.recipe);

            try {
                const new_recipe_url = await this.saveDalleImageToFirebase(this.recipe.recipe_img_url, this.recipe.recipe_id);
                this.recipe.recipe_img_url = new_recipe_url;
            } catch (error) {
                console.error("Error converting Dall-e");
            }

            try {
                const recipeRef = await setDoc(doc(db, "all_recipes", recipe_id), this.recipe);
                await updateDoc(doc(db, "users", this.recipe.user_id), {
                    my_cookbook: arrayUnion(this.recipe.recipe_id),
                });

                if (this.recipe.categories) {
                    this.recipe.categories.forEach((cat) =>
                        updateDoc(doc(db, "categories", cat), {
                            recipes: arrayUnion(this.recipe.recipe_id),
                        }));
                }

                this.triggerToast();
            } catch (error) {
                console.error("Error adding document:", error);
            }
        },
        async saveDalleImageToFirebase(imageUrl, firebasePath) {
            try {
                const imageBlob = await this.fetchImageAsBlob(imageUrl);
                const downloadUrl = await this.uploadImageToFirebase(imageBlob, firebasePath);
                console.log('Image uploaded to Firebase:', downloadUrl);
                return downloadUrl;
            } catch (error) {
                console.error('Error saving Dalle image to Firebase:', error);
                throw error;
            }
        },

        async fetchImageAsBlob(imageUrl) {
            const response = await fetch(`http://localhost:3000/fetch-image?url=${encodeURIComponent(imageUrl)}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok for URL: ${imageUrl}`);
            }
            return await response.blob();
        },

        async uploadImageToFirebase(blob, path) {
            return new Promise((resolve, reject) => {
                const storageRef = ref(storage, `recipeImg/${path}`);
                const uploadTask = uploadBytesResumable(storageRef, blob);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.error("Upload failed", error);
                        reject(error); // Reject the promise on error
                    },
                    () => {
                        // Handle successful uploads on complete
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                console.log("File available at", downloadURL);
                                resolve(downloadURL); // Resolve the promise with the download URL
                            })
                            .catch((error) => {
                                console.error("Failed to get download URL", error);
                                reject(error); // Reject the promise if getting the download URL fails
                            });
                    }
                );
            });
        },



        triggerToast() {
            this.toast.success("Recipe saved successfully!", {
                position: "top-center",
                timeout: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
            });
        },
        togglePublishToCommunity(props) {
            this.recipe.community = props;
        }
    },
};
</script>

<style scoped>
.content-container {
    display: flex;
}

.view-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}

.recipe-details-container {
    position: relative;
    padding: 2rem;
    min-height: 400px;
}

/* .reloadButton {
  background-color: #a7bf6a;
  border: none;
  text-decoration: none;
  padding: 0;
  cursor: pointer;
  border-radius: 10px;
  width: 90px;
  height: 32px;
  color: white;
  text-align: center;
  line-height: 32px; 
} */

.reloadButton {
    background-color: #3C1F11;
    border: none;
    color: #CBDF99;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 15px;
    width: auto;
    height: auto;
    margin: 0 20px;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.reloadButton:hover {
    background-color: #321b10;
}

.button-container {
    display: flex;
    justify-content: right;
    margin-top: 20px;
}
</style>