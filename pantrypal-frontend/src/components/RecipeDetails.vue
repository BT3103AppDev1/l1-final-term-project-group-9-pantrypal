<template>
  <button class="back-button" @click="goBack">
    <i class="fas fa-arrow-left"></i> Back
  </button>
  <div class="horizontalRow">
    <div class="first">
      <RecipeImage :path="selectedRecipe.recipe_img_url" :ifCard="false" />
      <div v-if="!likeExists" class="switch-container">
        <label class="switch">
          <input
            type="checkbox"
            id="publishToCommunity"
            v-model="selectedRecipe.community"
            @change="togglePublishToCommunity"
            :disabled="disabled"
          />
          <span class="slider"></span>
        </label>
        <label for="publishToCommunity">Publish to Community</label>
      </div>
    </div>
    <div class="second">
      <div class="title-row">
        <h1>{{ selectedRecipe.recipe_name }}</h1>
        <LikeButton v-if="likeExists" :recipe="selectedRecipe" />
      </div>
      <div class="warning" v-if="selectedRecipe.AIgenerated && selectedRecipe.editted">
        <img clas="warning-logo" src="../assets/warning-icon.png" height="16px" />
        <span
          >This recipe is AI-generated (edited) and PantryPal has not verified it for
          accuracy and safety.</span
        >
      </div>
      <div class="warning" v-if="selectedRecipe.AIgenerated && !selectedRecipe.editted">
        <img clas="warning-logo" src="../assets/warning-icon.png" height="16px" />
        <span
          >This recipe is AI-generated and PantryPal has not verified it for accuracy and
          safety.</span
        >
      </div>
      <div class="warning" v-if="!selectedRecipe.AIgenerated && selectedRecipe.editted">
        <img clas="warning-logo" src="../assets/warning-icon.png" height="16px" />
        <span>This recipe has been edited since its previous revision.</span>
      </div>
      <p>
        <i v-if="likeExists">
          By @{{ username }},
          {{
            new Date(selectedRecipe.created_date.seconds * 1000).toLocaleDateString(
              "en-GB",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )
          }}
        </i>
        <i v-else>
          By @{{ username }},
          {{
            new Date(selectedRecipe.created_date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </i>
      </p>

      <p class="description">{{ selectedRecipe.description }}</p>
      <p class="serving-size-cooking-time">
        <b>SERVING SIZE:</b> {{ selectedRecipe.serving_size }} |
        <b>COOK TIME:</b>
        {{ cookingTimeInHrAndMin }}
      </p>
      <span class="allergens-container">
        <p><b>CONTAINS:</b></p>
        <template v-for="(allergen, index) in selectedRecipe.allergens" :key="index">
          <span>{{ allergen }}</span>
          <p v-if="index < selectedRecipe.allergens.length - 1">,</p>
        </template>
      </span>
      <span
        v-for="(category, index) in selectedRecipe.categories"
        :key="index"
        class="category-bubble"
        >{{ category }}</span
      >
    </div>
  </div>

  <div class="horizontalRow">
    <div class="first">
      <!-- Ingredients -->
      <div class="recipe-section">
        <h3>Ingredients:</h3>
        <ul class="checkbox-list">
          <li v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index">
            <!--using likeExists to remove checkbox-->
            <input
              v-if="!likeExists"
              type="checkbox"
              :id="'ingredient' + index"
              v-model="selectedIngredients[index]"
            />
            <label :for="'ingredient' + index">{{ ingredient }}</label>
          </li>
        </ul>
      </div>
    </div>

    <!-- Directions -->
    <div class="second">
      <div class="recipe-section">
        <h3>Directions:</h3>
        <ol>
          <li v-for="(step, index) in selectedRecipe.directions" :key="index">
            {{ index + 1 }}. {{ step }}
          </li>
        </ol>
      </div>
      <div
        class="button-container"
        v-if="user && user.uid === selectedRecipe.user_id && likeExists"
      >
        <button class="edit-recipe-button" @click="edit">Edit Recipe</button>
        <button class="delete-recipe-button" @click="confirmDelete">Delete Recipe</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeImage from "./RecipeImage.vue";
import LikeButton from "./LikeButton.vue";
import ConfirmToast from "@/components/ConfirmToast.vue";
import store from "@/store";

import { auth, app, db, storage, fetchCategories } from "../firebase.js";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
  components: {
    RecipeImage,
    LikeButton,
  },
  data() {
    return {
      username: "",
      cookingTimeInHrAndMin: "",
      user: auth.currentUser,
    };
  },
  props: {
    selectedRecipe: {
      type: Object,
      required: true,
    },
    selectedIngredients: {
      type: Array,
      required: true,
    },
    likeExists: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
  setup() {
    const toast = useToast({
      position: "top-center",
      timeout: false,
      hideProgressBar: true,
      closeButton: false,
    });
    return { toast };
  },
  mounted() {
    this.fetchRecipeUsernameAndCookingTime();
    console.log(store.state.RecipeFromPage);
  },
  methods: {
    async fetchRecipeUsernameAndCookingTime() {
      const userQuery = query(
        collection(db, "users"),
        where("user_id", "==", this.selectedRecipe.user_id)
      );
      const userQuerySnapshot = await getDocs(userQuery);
      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        this.username = userData.username;
      }
      this.calculateCookingTime();
    },

    calculateCookingTime() {
      const minutes = this.selectedRecipe.cook_time;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      let result = "";
      if (hours > 0) {
        result += `${hours}h`;
      }
      if (remainingMinutes > 0) {
        result += `${remainingMinutes}mins`;
      }
      this.cookingTimeInHrAndMin = result || "0mins";
    },
    togglePublishToCommunity() {
      this.$emit("togglePublishToCommunity", this.selectedRecipe.community);
    },
    edit() {
      this.$router.push({
        name: "RecipeEdit",
        params: { id: this.selectedRecipe.recipe_id },
      });
    },

    confirmDelete() {
      this.toast.warning({
        component: ConfirmToast,
        props: {
          onConfirm: () => this.deleteRecipe(),
          onCancel: () => this.toast.clear(),
        },
        position: "top-center",
        timeout: false,
        hideProgressBar: true,
        closeButton: false,
      });
    },

    async deleteRecipe() {
      try {
        console.log("Deleting from all_recipes");
        const recipeRef = doc(db, "all_recipes", this.selectedRecipe.recipe_id);
        await deleteDoc(recipeRef);

        console.log("Fetching categories");
        const categoryDocsSnapshot = await getDocs(collection(db, "categories"));
        categoryDocsSnapshot.forEach((doc) => {
          const category = doc.data();
          if (this.selectedRecipe.categories.includes(category.category_name)) {
            updateDoc(doc.ref, {
              recipes: arrayRemove(this.selectedRecipe.recipe_id),
            });
          }
        });

        console.log("Updating user cookbook");
        const userRef = doc(db, "users", this.selectedRecipe.user_id);
        await updateDoc(userRef, {
          my_cookbook: arrayRemove(this.selectedRecipe.recipe_id),
        });

        console.log("Fetching users to update liked recipes");
        const LikedDocsSnapshot = await getDocs(collection(db, "users"));
        LikedDocsSnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.liked_recipes.includes(this.selectedRecipe.recipe_id)) {
            updateDoc(doc.ref, {
              liked_recipes: arrayRemove(this.selectedRecipe.recipe_id),
            });
          }
        });

        console.log("success");
        this.toast.success("Recipe deleted successfully!", {
          timeout: 2000,
          position: "top-center",
          hideProgressBar: true,
        });
        this.$router.push("/community-page");
      } catch (error) {
        this.toast.error("Failed to delete recipe: " + error.message, {
          position: "top-center",
          hideProgressBar: true,
        });
      }
    },

    goBack() {
      if (!this.likeExists) {
        location.reload();
      } else {
        this.$router.push({
          name: this.$store.state.RecipeFromPage,
          query: { selected: this.$store.state.selected },
        });
      }
    },
  },
};
</script>

<style scoped>
.popout-recipe {
  position: fixed;
  top: 100px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popout-recipe-content {
  background-color: white;
  border-radius: 8px;
  width: 80%;
  height: 90%;
  overflow-y: auto;
}

.horizontalRow {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.first {
  flex: 0.3;
  padding-right: 10px;
}

.second {
  flex: 0.7;
}

.checkbox-list {
  list-style-type: none;
  padding: 0;
}

.checkbox-list li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.checkbox-list li input[type="checkbox"] {
  margin-right: 10px;
}

.recipe-section ol {
  padding-left: 20px;
}

.recipe-section ol li {
  position: relative;
  padding-left: 10px;
}

.info {
  display: flex;
  justify-content: space-between;
}

.category-bubble {
  display: inline-block;
  background-color: #fffce2;
  color: #333;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 5px;
  font-size: 0.75rem;
}

.allergens-container {
  display: flex;
  align-items: baseline;
}

.allergens-container p {
  margin-right: 5px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.switch-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.switch-container .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  vertical-align: middle;
}

.switch-container .switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-container .slider {
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 20px;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.switch-container .slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.switch-container input:checked + .slider {
  background-color: black;
}

.switch-container input:checked + .slider:before {
  transform: translateX(20px);
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  align-items: center;
}

.edit-recipe-button {
  background-color: #a7bf6a;
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 15px;
  width: auto;
  height: auto;
  margin: 0 20px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.edit-recipe-button:hover {
  background-color: #596639;
}

.delete-recipe-button {
  background-color: #ff4b4b;
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 15px;
  width: auto;
  height: auto;
  margin: 0 20px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.delete-recipe-button:hover {
  background-color: #cc3333;
}

.warning {
  background-color: #fff7d7;
  padding: 10px 10px;
  border-radius: 8px;
  margin: 5px 10px 5px 0px;
  font-size: 12px;
  vertical-align: middle;
  align-items: center;
  display: flex;
  width: fit-content;
}

img {
  margin-right: 8px;
}

h1 {
  margin: 0px 0px;
}

.back-button {
  margin-bottom: 10px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: black;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.back-button:hover {
  text-decoration: underline;
}

.back-button i {
  margin-right: 5px;
}
</style>
