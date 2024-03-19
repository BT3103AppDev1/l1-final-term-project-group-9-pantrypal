<template>
  <div class="community-page">
    <!-- search bar -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search name or ingredients..."
    />
    <!-- title to be removed when navbar is finished -->
    <h1>Community Recipes</h1>

    <!-- recipe card list -->
    <div class="recipe-list">
      <div
        v-for="recipe in filteredRecipes"
        :key="recipe.recipe_id"
        class="recipe-card"
        @click="toggleRecipeDetails(recipe)"
      >
        <img :src="recipe.recipe_img_url" :alt="recipe.recipe_name" />
        <h2>{{ recipe.recipe_name }}</h2>
        <div class="info">
          <span>{{ recipe.categories.join(", ") }}</span>
        </div>
        <p>@{{ recipe.user_id }}</p>
      </div>
    </div>

    <!-- popout recipe window -->
    <div v-if="selectedRecipe" class="popout-recipe">
      <div class="popout-recipe-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ selectedRecipe.recipe_name }}</h2>
        <p>Serving size: {{ selectedRecipe.serving_size }}</p>
        <p>Description: {{ selectedRecipe.description }}</p>
        <!-- <p>{{ selectedRecipe.ingredients }}</p>
        <p>{{ selectedRecipe.directions }}</p> -->
        <!-- Ingredients -->
        <div class="recipe-section">
          <h3>Ingredients:</h3>
          <ul class="checkbox-list">
            <!-- Add a class to the ul for styling -->
            <li v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index">
              <input
                type="checkbox"
                :id="'ingredient' + index"
                v-model="selectedIngredients[index]"
              />
              <label :for="'ingredient' + index">{{ ingredient }}</label>
            </li>
          </ul>
        </div>

        <!-- Directions -->
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
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      recipes: [],
      searchQuery: "",
      selectedRecipe: null,
      selectedIngredients: [],
    };
  },
  created() {
    this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      const querySnapshot = await getDocs(collection(db, "all_recipes"));
      querySnapshot.forEach((doc) => {
        this.recipes.push(doc.data());
      });
    },
    toggleRecipeDetails(recipe) {
      recipe.showDetails = !recipe.showDetails;
      this.selectedRecipe = recipe;
    },
    viewRecipe(recipe) {
      this.selectedRecipe = recipe;
    },
    closeModal() {
      this.selectedRecipe = null;
      this.selectedIngredients = [];
    },
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter((recipe) => {
        const nameMatch = recipe.recipe_name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        return nameMatch;
      });
    },
  },
};
</script>

<style scoped>
.community-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  width: 150%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.recipe-card {
  width: calc(33.33% - 20px);
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.recipe-card:hover {
  transform: scale(1.03);
  transition: transform 0.3s ease;
}

.recipe-card img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

.recipe-card .info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.user-id {
  font-style: italic;
}

.popout-recipe {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popout-recipe-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
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
