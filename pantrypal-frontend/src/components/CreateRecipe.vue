<template>
    <div class="create-recipe-modal">
      <div class="recipe-form">
        <div class="recipe-form-content">
  
          <div class="horizontalRow">
            <div class="first-first">
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
            <div class="second">
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
                    <input type="number" id="cookTimeHours" v-model="recipeData.cook_time_hours" />
                    <span>hours</span>
                    <input type="number" id="cookTimeMins" v-model="recipeData.cook_time_minutes" />
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
                  <input type="number" id="servingSize" v-model="recipeData.serving_size" />
                </div>
              </div>
            </div>
          </div>
  
          <div class="horizontalRow">
            <div class="first">
              <!-- Ingredients -->
              <div class="recipe-section">
                <label for="ingredients">Ingredients:</label>
                <div class="ingredients-container">
                <div v-for="(ingredient, index) in recipeData.ingredients" :key="index" class="ingredient-input">
                  <input type="text" v-model="recipeData.ingredients[index]" placeholder="e.g. 10g Apple"/>
                  <!-- <button @click="removeIngredient(index)">Remove</button> -->
                </div>
                <button class="add-more-button" @click="addIngredient">+ ADD MORE</button>
              </div>
            </div>
            </div>
  
            <!-- Directions -->
            <div class="second">
            <div class="recipe-section">
                <label for="directions">Directions:</label>
                <div class="directions-container">
                <div v-for="(direction, index) in recipeData.directions" :key="index" class="direction-step">
                    <label :for="'direction' + direction.stepNumber">Step {{ direction.stepNumber }}</label>
                    <textarea :id="'direction' + direction.stepNumber" v-model="direction.text"></textarea>
                </div>
                <button class="add-more-button" @click="addDirection">+ ADD MORE</button>
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
        submitRecipe() {
          // Handle recipe submission
        },
        close() {
          this.$emit('close');
        },
      },
    };
  </script>

<style>
.upload-image {
  width: 100%;
}

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

.horizontalRow {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.first {
  flex: 0.3;
  margin-right: 50px; 
}

.first-first {
  flex: 0.3;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.first input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 10px;
}

.second {
  flex: 0.7;
  flex-direction: column;
}

.horizontalRow {
    margin-bottom: 20px;
}

.second label {
  margin-bottom: 5px;
}

.second input,
.second textarea {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 10px;
}

.close {
  /* Styling for your close button */
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 50px;
  font-weight: bold;
  cursor: pointer;
  color: red;
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

.additional-info {
  display: flex;
  justify-content: space-between;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-right: 10px; /* Adjust as needed */
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
  margin-bottom: 10px;
}

input[type="text"],
input[type="number"],
textarea,
select {
  background-color: #ececec;
  resize: vertical;
}

input[type="number"] {
    width: 65px;
}

#cookTimeMins {
  margin-left: 10px; /* Add margin-right to create a gap */
}

.save-recipe-button {
  background-color: #A7BF6A;
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 15px;
  width: auto; /* Remove the fixed width to allow padding */
  height: auto; /* Remove the fixed height to allow padding */
  margin: 0 20px;
  font-size: 14px; /* Adjust font size as needed */
  box-shadow: 0 2px 4px rgba(0,0,0,0.2); /* Optional: Adds a subtle shadow */
}

.save-recipe-button:hover {
  background-color: #596639; /* Slightly darker green on hover */
}

/* Additional styles for close button if needed */

.recipe-form label {
  margin-bottom: 5px;
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

.switch-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Add some margin for spacing */
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
  width: 40px; /* Increased width */
  height: 20px; /* Reduced height */
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.switch-container .slider:before {
  position: absolute;
  content: "";
  height: 16px; /* Increased size */
  width: 16px; /* Increased size */
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
  transform: translateX(20px); /* Adjust according to circle size */
}

.add-more-button {
    background-color: transparent; /* Remove the button background */
    border: none; /* Remove any border */
    color: #8F8E8E; 
    padding: 0;
    cursor: pointer;
    text-decoration: underline; /* Underline the text */
    font-size: 14px; /* Match the font size to your design */
    margin: 10px 0; /* Add some margin at the top and bottom */
}

.add-more-button:hover {
    color: #6B6969;
}

.ingredients-container {
  display: flex;
  flex-direction: column;
}

.ingredients-container .add-more-button {
  margin: 0 auto; /* Center the button horizontally */
}

.directions-container {
  display: flex;
  flex-direction: column;
}

.directions-container .add-more-button {
  margin: 0 auto; /* Center the button horizontally */
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

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  align-items: center;
}

.save-recipe-button {
  position: absolute;
  right: 20px;
}

.direction-step label {
  display: block; /* Make sure the label is on its own line */
  font-weight: bold; /* Optional: if you want the "Step" label to be bold */
  margin-top: 20px; /* Add margin above the step labels */
  margin-bottom: 5px; /* Space between label and textarea */
}

.horizontalRow {
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-bottom: 0; /* Remove margin-bottom from .horizontalRow if necessary */
}


</style>