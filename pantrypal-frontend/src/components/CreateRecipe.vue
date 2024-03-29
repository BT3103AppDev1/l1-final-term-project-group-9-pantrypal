<template>
    <div class="create-recipe-modal">
      <div class="recipe-form">
        <div class="recipe-form-content">
  
          <div class="createRecipeRow">
            <div class="first1">
                <input type="file" id="recipeImage" ref="fileInput" style="display: none" @change="handleImageUpload">
                <div class="plus-icon-container" @click="chooseFile">
                <img class="upload-image" src="../assets/image-upload.png" alt="Upload Image">
                </div>
                <div class="switch-container">
                    <label class="switch">
                        <input type="checkbox" id="publishToCommunity" v-model="recipeData.publish_to_community">
                        <span class="slider"></span>
                    </label>
                    <label for="publishToCommunity">Publish to Community</label>
                    </div>
            </div>
            <div class="first2">
              <label for="recipeName">Title:</label>
              <input type="text" id="recipeName" v-model="recipeData.recipe_name" />
  
              <label for="recipeDescription">Description:</label>
              <textarea id="recipeDescription" v-model="recipeData.description"></textarea>
  
              <label for="allergenInfo">Allergen Information:</label>
              <textarea id="allergenInfo" v-model="recipeData.allergen_info"></textarea>
  
              <!-- Added Cook Time, Category and Serving Size -->
              <div class="additional-info">
                <div class="input-group">
                <label for="cookTime">Cook Time:</label>
                <div class="time-input-group">
                    <input type="number" id="cookTimeHours" v-model="recipeData.cook_time_hours" min="0" />
                    <span>hours</span>
                    <input type="number" id="cookTimeMins" v-model="recipeData.cook_time_minutes" min="0" />
                    <span>mins</span>
                </div>
                </div>
                <div class="input-group">
                  <label for="category">Category:</label>
                  <select id="category" v-model="recipeData.category">
                    <option disabled value="">Select</option>
                    <!-- options -->
                  </select>
                </div>
                <div class="input-group">
                  <label for="servingSize">Serving Size:</label>
                  <input type="number" id="servingSize" v-model="recipeData.serving_size" min="0" />
                </div>
              </div>
            </div>
          </div>
  
          <div class="createRecipeRow">
            <div class="second1">
              <!-- Ingredients -->
              <div class="recipe-section">
                <label for="ingredients">Ingredients:</label>
                <div class="ingredients-container">
                <div v-for="(ingredient, index) in recipeData.ingredients" :key="index" class="ingredient-input">
                  <input type="text" v-model="recipeData.ingredients[index]" placeholder="e.g. 10g Apple"/>
                  <!-- <button @click="removeIngredient(index)">Remove</button> -->
                </div>
                <div class="button-group">
                <button class="remove-button" @click="removeIngredient(index)">REMOVE</button>
                <button class="add-more-button" @click="addIngredient">+ ADD MORE</button>
                </div>
              </div>
            </div>
            </div>
  
            <!-- Directions -->
            <div class="second2">
            <div class="recipe-section">
                <label for="directions">Directions:</label>
                <div class="directions-container">
                <div v-for="(direction, index) in recipeData.directions" :key="index" class="direction-step">
                    <label :for="'direction' + direction.stepNumber">Step {{ direction.stepNumber }}</label>
                    <textarea :id="'direction' + direction.stepNumber" v-model="direction.text"></textarea>
                </div>
                <div class="button-group">
                <button class="remove-button" @click="removeDirection(index)">REMOVE</button>
                <button class="add-more-button" @click="addDirection">+ ADD MORE</button>
                </div>
                </div>
            </div>
            </div>
          </div>
        </div>
        <div class="button-container">
          <button class="cancel-button" @click="close">Cancel</button>
          <button class="save-recipe-button" @click="submitRecipe">Save Recipe</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipeData: {
          recipe_name: '',
          serving_size: '',
          description: '',
          allergen_info: '',
          cook_time_hours: '',
          cook_time_minutes: '',
          category: '',
          ingredients: [''],
          directions: [{ stepNumber: 1, text: '' }],
        }
      }
    },
      methods: {
        chooseFile() {
            this.$refs.fileInput.click();
        },
        handleImageUpload(event) {
          // Handle image upload
        },
        addIngredient() {
          this.recipeData.ingredients.push('');
        },
        removeIngredient(index) {
          this.recipeData.ingredients.splice(index, 1);
        },
        addDirection() {
            // Add a new direction with the next step number
            const nextStepNumber = this.recipeData.directions.length + 1;
            this.recipeData.directions.push({ stepNumber: nextStepNumber, text: '' });
        },
        removeDirection(index) {
          this.recipeData.directions.splice(index, 1);
        },
        close() {
          this.$emit('close');
        },
        submitRecipe() {
          // Handle recipe submission
        },
      },
    };
  </script>

<style scoped>
.create-recipe-modal {
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
  overflow-y: auto;
}

.recipe-form {
  font-family: 'Arial', sans-serif;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  height: 90%;
  overflow-y: auto;
}

.recipe-form label {
  margin-bottom: 5px;
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

.upload-image {
  width: 100%;
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
  transition: .4s;
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
  transition: .4s;
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

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px; 
}

.add-more-button {
    background-color: transparent; 
    border: none; 
    color: #8F8E8E; 
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    font-size: 14px; 
    margin: 10px 0; 
}

.remove-button {
    background-color: transparent; 
    border: none; 
    color: #8F8E8E; 
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    font-size: 14px; 
    margin: 10px 0; 
}

.add-more-button:hover {
    color: #6B6969;
}

.remove-button:hover {
    color: #6B6969;
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

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  align-items: center;
}

.cancel-button {
  background-color: transparent;
  border: none;
  color: #8F8E8E;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  font-size: 16px;
  margin-right: 20px;
}

.cancel-button:hover {
  color: #6B6969;
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
  background-color: #A7BF6A;
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 15px;
  width: auto; 
  height: auto; 
  margin: 0 20px;
  font-size: 14px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
}

.save-recipe-button:hover {
  background-color: #596639; 
}

</style>