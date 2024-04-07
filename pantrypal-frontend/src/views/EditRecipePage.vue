<template>
  <TopBar :ifFeed="true" />
  <div class="create-recipe-modal">
    <div class="recipe-form">
      <div class="recipe-form-content">
        <div class="createRecipeRow">
          <div class="first1">
            <input
              type="file"
              id="recipeImage"
              ref="fileInput"
              style="display: none"
              @change="handleImageUpload"
            />
            <div class="plus-icon-container" @click="chooseFile">
              <img
                v-if="recipeData.imageSrc"
                :src="recipeData.imageSrc"
                class="uploaded-image"
                alt="Uploaded Image"
              />
              <img
                :class="{ hidden: recipeData.imageSrc }"
                class="upload-image"
                src="../assets/image-upload.png"
                alt="Upload Image"
              />
            </div>
            <div class="switch-container">
              <label class="switch">
                <input
                  type="checkbox"
                  id="publishToCommunity"
                  v-model="recipeData.publish_to_community"
                />
                <span class="slider"></span>
              </label>
              <label for="publishToCommunity">Publish to Community</label>
            </div>
          </div>
          <div class="first2">
            <label for="recipeName">Title:</label>
            <input
              type="text"
              id="recipeName"
              v-model="recipeData.recipe_name"
            />

            <label for="recipeDescription">Description:</label>
            <textarea
              type="text"
              id="recipeDescription"
              v-model="recipeData.description"
              class="input-text"
            ></textarea>

            <label for="allergenInfo">Allergen Information:</label>
            <textarea
              type="text"
              id="allergenInfo"
              v-model="recipeData.allergen_info"
              class="input-text"
            ></textarea>

            <!-- Added Cook Time, Category and Serving Size -->
            <div class="additional-info">
              <div class="input-group">
                <label for="cookTime">Cook Time:</label>
                <div class="time-input-group">
                  <input
                    type="number"
                    id="cookTimeHours"
                    v-model="recipeData.cook_time_hours"
                    min="0"
                    @keydown="onlyNumberInput($event, 'cook_time_hours')"
                  />
                  <span>hours</span>
                  <input
                    type="number"
                    id="cookTimeMins"
                    v-model="recipeData.cook_time_minutes"
                    min="0"
                    @keydown="onlyNumberInput($event, 'cook_time_minutes')"
                  />
                  <span>mins</span>
                </div>
              </div>
              <div class="input-group">
                <label for="category">Category:</label>
                <multiselect
                  v-model="recipeData.category"
                  :options="recipeData.categories"
                  :multiple="true"
                  :close-on-select="false"
                  :max="3"
                ></multiselect>
              </div>
              <div class="input-group">
                <label for="servingSize">Serving Size:</label>
                <input
                  type="number"
                  id="servingSize"
                  v-model="recipeData.serving_size"
                  min="0"
                  @keydown="onlyNumberInput($event, 'serving_size')"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="createRecipeRow">
          <div class="second1">
            <div class="recipe-section">
              <label for="ingredients">Ingredients:</label>
              <div class="ingredients-container">
                <div
                  v-for="(ingredient, index) in recipeData.ingredients"
                  :key="index"
                  class="ingredient-input"
                >
                  <input
                    type="text"
                    v-model="recipeData.ingredients[index]"
                    placeholder="e.g. 10g Apple"
                  />
                  <button
                    class="remove-button"
                    @click="removeIngredient(index)"
                  >
                    x
                  </button>
                </div>
                <div class="button-group">
                  <button class="add-more-button" @click="addIngredient">
                    + ADD MORE
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Directions -->
          <div class="second2">
            <div class="recipe-section">
              <label for="directions">Directions:</label>
              <div class="directions-container">
                <div
                  v-for="(direction, index) in recipeData.directions"
                  :key="index"
                  class="direction-step"
                >
                  <label :for="'direction' + direction.stepNumber"
                    >Step {{ direction.stepNumber }}</label
                  >
                  <div class="direction-input">
                    <textarea
                      type="text"
                      :id="'direction' + direction.stepNumber"
                      v-model="direction.text"
                      class="input-text"
                    ></textarea>
                    <button
                      class="remove-button"
                      @click="removeDirection(index)"
                    >
                      x
                    </button>
                  </div>
                </div>
                <div class="button-group">
                  <button class="add-more-button" @click="addDirection">
                    + ADD MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-container">
        <button class="cancel-button" @click="close">Cancel</button>
        <save-recipe-button @save-recipe="submitRecipe" />
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import TopBar from "@/components/TopBar.vue";
import SaveRecipeButton from "../components/SaveRecipeButton.vue";
import { auth, app, db, storage, fetchCategories } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
} from "firebase/firestore";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
  components: {
    Multiselect,
    TopBar,
    SaveRecipeButton,
  },
  props: {
    id: String,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      selectedRecipe: null,
      recipeData: {
        imageSrc: null,
        publish_to_community: false,
        recipe_name: "",
        serving_size: "",
        description: "",
        allergen_info: "", //input allergens
        allergens: [], //storing allergens
        cook_time_hours: "",
        cook_time_minutes: "",
        categories: [], //loaded categories
        category: [], //input categories
        ingredients: [""],
        directions: [{ stepNumber: 1, text: "" }],
      },
    };
  },
  async created() {
    this.recipeData.categories = await fetchCategories();
    this.fetchRecipeDetails();
  },
  methods: {
    async fetchRecipeDetails() {
      const recipeDocSnapshot = await getDoc(doc(db, "all_recipes", this.id));
      this.selectedRecipe = recipeDocSnapshot.data();
      this.recipeData.imageSrc = this.selectedRecipe.recipe_img_url;
      this.recipeData.publish_to_community = this.selectedRecipe.community;
      this.recipeData.recipe_name = this.selectedRecipe.recipe_name;
      this.recipeData.serving_size = this.selectedRecipe.serving_size;
      this.recipeData.description = this.selectedRecipe.description;
      this.recipeData.allergen_info = this.selectedRecipe.allergens.join(", "); //input allergens
      this.recipeData.cook_time_hours = Math.floor(
        this.selectedRecipe.cook_time / 60
      );
      this.recipeData.cook_time_minutes = this.selectedRecipe.cook_time % 60;
      this.recipeData.category = this.selectedRecipe.categories;
      this.recipeData.ingredients = this.selectedRecipe.ingredients;
      this.recipeData.directions = this.selectedRecipe.directions.map(
        (direction, index) => {
          return { stepNumber: index + 1, text: direction };
        }
      );
    },
    chooseFile() {
      this.$refs.fileInput.click();
    },
    async handleImageUpload(event) {
      const file = event.target.files[0]; // Get the file from the input
      if (!file || (file.type !== "image/jpeg" && file.type !== "image/png")) {
        this.imageNotValid();
        return;
      }

      try {
        const blob = await this.convertFileToBlob(file);
        const downloadUrl = await this.uploadImageToFirebase(blob, file.name);
        this.recipeData.imageSrc = downloadUrl;
      } catch (error) {
        console.error("Failed to upload image", error);
      }
    },

    async uploadImageToFirebase(blob, path) {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `recipeImg/${path}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
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
    convertFileToBlob(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const blob = new Blob([new Uint8Array(reader.result)], {
            type: file.type,
          });
          resolve(blob);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },
    addIngredient() {
      this.recipeData.ingredients.push("");
    },
    removeIngredient(index) {
      this.recipeData.ingredients.splice(index, 1);
    },
    addDirection() {
      const nextStepNumber = this.recipeData.directions.length + 1;
      this.recipeData.directions.push({ stepNumber: nextStepNumber, text: "" });
    },
    removeDirection(index) {
      this.recipeData.directions.splice(index, 1);
      for (let i = index; i < this.recipeData.directions.length; i++) {
        this.recipeData.directions[i].stepNumber--;
      }
    },
    onlyNumberInput(event, field) {
      const code = event.keyCode || event.which;
      if (code > 31 && (code < 48 || code > 57) && code !== 46) {
        // If the key pressed is not a number or a decimal point, prevent the keypress
        event.preventDefault();
      } else if (code === 46 && this.recipeData[field].includes(".")) {
        // If the key pressed is a decimal point and the current value already includes a decimal point, prevent the keypress
        event.preventDefault();
      } else {
        // If the key pressed is a number or a decimal point, update the value
        this.recipeData[field] = event.target.value;
      }
    },
    close() {
      this.$router.push({
        name: "RecipeDetailsPage",
        params: { id: this.selectedRecipe.recipe_id },
      });
    },
    // validateForm() {
    //   if (
    //     !this.recipeData.recipe_name ||
    //     !this.recipeData.description ||
    //     !this.recipeData.allergen_info ||
    //     (!this.recipeData.cook_time_hours &&
    //       !this.recipeData.cook_time_minutes) ||
    //     !this.recipeData.category.length ||
    //     !this.recipeData.serving_size ||
    //     !this.recipeData.ingredients.length ||
    //     !this.recipeData.directions.length
    //   ) {
    //     // at least one field is empty
    //     this.fillAllFields();
    //     // alert(
    //     //   "Please fill in all fields properly before submitting the recipe."
    //     // );
    //     return false;
    //   }
    //   return true;
    // },
    validateForm() {
      const missingFields = [];
      if (!this.recipeData.recipe_name) {
        missingFields.push("Title");
      }
      if (!this.recipeData.description) {
        missingFields.push("Description");
      }
      if (!this.recipeData.allergen_info) {
        missingFields.push("Allergen Information");
      }
      if (
        !this.recipeData.cook_time_hours &&
        !this.recipeData.cook_time_minutes
      ) {
        missingFields.push("Cook Time");
      }
      if (!this.recipeData.category.length) {
        missingFields.push("Category");
      }
      if (!this.recipeData.serving_size) {
        missingFields.push("Serving Size");
      }
      if (!this.recipeData.ingredients.length) {
        missingFields.push("Ingredients");
      }
      if (!this.recipeData.directions.length) {
        missingFields.push("Directions");
      }
      return missingFields;
    },

    imageNotValid() {
      this.toast.error("Please select a JPG or PNG image file.", {
        position: "top-center",
        hideProgressBar: true,
      });
    },
    // fillAllFields() {
    //   this.toast.error(
    //     "Please fill in all fields properly before submitting the recipe.",
    //     {
    //       position: "top-center",
    //       hideProgressBar: true,
    //     }
    //   );
    // },
    fillAllFields(missingFields) {
      const message = `Please fill in the following fields: ${missingFields.join(
        ", "
      )}.`;
      this.toast.error(message, {
        position: "top-center",
        hideProgressBar: true,
      });
    },
    cannotSaveRecipe() {
      this.toast.error("Recipe could not be saved.", {
        position: "top-center",
        hideProgressBar: true,
      });
    },
    recipeSavedSuccess() {
      this.toast.success("Recipe was successfully created!", {
        timeout: 2000,
        position: "top-center",
        hideProgressBar: true,
      });
    },

    async removeRecipeFromCategories() {
      const db = getFirestore(app);
      const categoryDocsSnapshot = await getDocs(collection(db, "categories"));
      categoryDocsSnapshot.forEach((doc) => {
        const category = doc.data();
        if (!this.recipeData.category.includes(category.name)) {
          updateDoc(doc.ref, {
            recipes: arrayRemove(this.selectedRecipe.recipe_id),
          });
        }
      });
    },

    async submitRecipe() {
      //   if (!this.validateForm()) {
      //     return;
      //   }
      const missingFields = this.validateForm();
      if (missingFields.length > 0) {
        this.fillAllFields(missingFields);
        return;
      }
      const user = auth.currentUser;
      const userId = user ? user.uid : "";
      const recipe_id = this.selectedRecipe.recipe_id;

      if (!this.recipeData.imageSrc) {
        this.recipeData.imageSrc =
          "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1";
      }

      const recipe = {
        allergens: this.recipeData.allergen_info
          .split(",")
          .map((word) => word.trim()),
        categories: this.recipeData.category,
        community: this.recipeData.publish_to_community,
        cook_time:
          parseInt(this.recipeData.cook_time_hours) * 60 +
          parseInt(this.recipeData.cook_time_minutes),
        created_date: new Date(),
        description: this.recipeData.description,
        directions: this.recipeData.directions.map((d) => d.text),
        ingredients: this.recipeData.ingredients,
        like_count: this.selectedRecipe.like_count,
        recipe_id: recipe_id,
        recipe_img_url: this.recipeData.imageSrc,
        recipe_name: this.recipeData.recipe_name,
        serving_size: parseInt(this.recipeData.serving_size),
        user_id: userId,
      };
      const db = getFirestore(app);
      const colRef = collection(db, "all_recipes");
      try {
        const recipeRef = await updateDoc(
          doc(db, "all_recipes", recipe_id),
          recipe
        );
        this.removeRecipeFromCategories();
        console.log(this.categories);
        this.recipeData.categories.forEach((cat) =>
          updateDoc(doc(db, "categories", cat), {
            recipes: arrayUnion(recipe.recipe_id),
          })
        );
        console.log("Document updated successfully.");
        this.$router.push({
          name: "RecipeDetailsPage",
          params: { id: this.selectedRecipe.recipe_id },
        });
        this.recipeSavedSuccess();
      } catch (error) {
        console.error("Error adding document:", error);
        this.cannotSaveRecipe();
      }
    },
  },
};
</script>

<style scoped>
.create-recipe-modal {
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: visible;
}

.recipe-form {
  font-family: "Arial", sans-serif;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  height: 90%;
  overflow-y: visible;
}

.recipe-form label {
  margin-bottom: 5px;
}

.recioe-form-content {
  position: fixed;
}

.createRecipeRow {
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-bottom: 0px;
}

.first1 {
  flex: 0.3;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.uploaded-image {
  max-width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
}

.upload-image {
  width: 100%;
}

.hidden {
  display: none;
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

.first2 {
  flex: 0.7;
  flex-direction: column;
}

.first2 label {
  margin-bottom: 5px;
}

.first2 input,
.first2 textarea {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 10px;
}

.second2 {
  flex: 0.7;
  flex-direction: column;
}

.second2 label {
  margin-bottom: 5px;
}

.second2 input,
.second2 textarea {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 10px;
}

.additional-info {
  display: flex;
  justify-content: space-between;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.input-group label {
  margin-bottom: 5px;
}

.input-group select,
.input-group input[type="number"] {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 10px;
}

.time-input-group {
  display: flex;
  align-items: center;
}

.time-input-group input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.time-input-group span {
  margin-left: 5px;
}

#cookTimeMins {
  margin-left: 10px;
}

input[type="number"] {
  width: 65px;
}

input[type="text"],
input[type="number"],
textarea,
select {
  background-color: #ececec;
  resize: vertical;
  padding: 8px;
  font-size: 16px;
  line-height: 1.2;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

.second1 {
  flex: 0.3;
  margin-right: 50px;
}

.second1 input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 10px;
}

.ingredients-container {
  display: flex;
  flex-direction: column;
}

.ingredients-container .remove-button .add-more-button {
  margin: 0 auto;
}

.ingredient-input {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.add-more-button {
  background-color: transparent;
  border: none;
  color: #8f8e8e;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  margin: 10px 0;
}

.remove-button {
  background-color: transparent;
  border: none;
  color: #000000;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  margin: 10px 0;
}

.add-more-button:hover {
  color: #6b6969;
}

.remove-button:hover {
  color: #6b6969;
}

.directions-container {
  display: flex;
  flex-direction: column;
}

.directions-container .remove-button .add-more-button {
  margin: 0 auto;
}

.direction-step label {
  display: block;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 5px;
}

.direction-input {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  align-items: center;
}

.cancel-button {
  background-color: transparent;
  border: none;
  color: #8f8e8e;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  font-size: 16px;
  margin-right: 20px;
}

.cancel-button:hover {
  color: #6b6969;
}

.save-recipe-button {
  background-color: #60ce64;
  border: none;
  text-decoration: none;
  color: white;
  padding: 0;
  cursor: pointer;
  border-radius: 15px;
  width: 90px;
  height: 32px;
  margin: 0 20px;
}

.save-recipe-button {
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

.save-recipe-button:hover {
  background-color: #596639;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
