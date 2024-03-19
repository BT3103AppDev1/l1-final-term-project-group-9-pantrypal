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
        <p>{{ selectedRecipe.description }}</p>
        <p>{{ selectedRecipe.ingredients }}</p>
        <p>{{ selectedRecipe.directions }}</p>
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
</style>
