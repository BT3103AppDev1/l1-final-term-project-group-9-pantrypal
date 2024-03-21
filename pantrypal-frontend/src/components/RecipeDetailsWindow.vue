<template>

  <div v-if="selectedRecipe" class="popout-recipe">

    <div class="popout-recipe-content">
      <span class="close" @click="closeModal">&times;</span>


      <div class="horizontalRow">
        <div class="first">
          <RecipeImage :path="selectedRecipe.recipe_img_url" :ifCard=false />
        </div>
        <div class="second">
          <h1>{{ selectedRecipe.recipe_name }}</h1>
          <h4>By: {{ selectedRecipe.user_id }} </h4>

          <p>Serving size: {{ selectedRecipe.serving_size }}</p>
          <p>Description: {{ selectedRecipe.description }}</p>
        </div>
      </div>

      <div class="horizontalRow">
        <div class="first">
          <!-- Ingredients -->
          <div class="recipe-section">
            <h3>Ingredients:</h3>
            <ul class="checkbox-list">
              <li v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index">
                <input type="checkbox" :id="'ingredient' + index" v-model="selectedIngredients[index]" />
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
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeImage from './RecipeImage.vue';
import { getUserInfoFromID } from "../firebase.js";;
export default {
  components: {
    RecipeImage,
  },
  data() {
    return {
      username: "NA"
    }
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
    closeModal: {
      type: Function,
      required: true,
    },
  },

};

</script>

<style scoped>
/* Styles for the popout recipe window */
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
}

.second {
  flex: 0.7
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
</style>
