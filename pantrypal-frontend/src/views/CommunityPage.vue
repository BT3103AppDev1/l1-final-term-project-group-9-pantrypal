<template>

  <div class="community-page">
    <TopBar />


    <div class="filterBar">
      <div class="search-bar">
        <input type="text" class="search-input" placeholder="Search name or ingredients...">
        <button type="button" class="search-button">
          <img src="../assets/search-icon.svg" alt="Search Icon">
        </button>
      </div>
      <div class="category-bar-text">
        <p>Category: </p>
      </div>
      <div class="category-bar-dropdown">

        <div class="dropdown-container">
          <dropdown class="my-dropdown-toggle" :options="arrayOfCategories" :selected="category" :placeholder="'All'"
            :closeOnOutsideClick="true">
          </dropdown>
        </div>
      </div>
      <div class="sortby-bar-text">
        <p>Sort By: </p>
      </div>
      <div class="category-bar-dropdown">
        <div class="dropdown-container">
          <dropdown class="my-dropdown-toggle" :options="arrayOfSorts" :selected="sort" :placeholder="'Most Recent'"
            :closeOnOutsideClick="true">
          </dropdown>
        </div>
      </div>
    </div>


    <!-- RecipeCards######### -->

    <!-- recipe card list -->
    <div class="recipe-list">
      <div v-for="recipe in filteredRecipes" :key="recipe.recipe_id" class="recipe-card"
        @click="toggleRecipeDetails(recipe)">
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
              <input type="checkbox" :id="'ingredient' + index" v-model="selectedIngredients[index]" />
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
import TopBar from '@/components/TopBar.vue';
import dropdown from 'vue-dropdowns';

export default {
  components: {
    TopBar,
    dropdown
  },
  data() {
    return {
      arrayOfCategories: [{ name: 'All' }, { name: 'chinese' }, { name: 'western' },],
      category: {
      },
      arrayOfSorts: [{ name: 'Most Recent' }, { name: 'Most Liked' }],
      sort: {
      },


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
  margin: 0 auto;
}

.filterBar {
  display: flex;
  padding: 0 4rem;
  margin: 2rem 0;
}

.search-bar {
  display: flex;
  flex: 0.5;
  align-items: center;
  width: 100%;
  background-color: #f5f5f5;
  height: 40px;
  border-radius: 30px;
  padding: 0 10px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  background-color: inherit
}

.search-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}

.search-button img {
  width: 20px;
  height: 20px;
}

.category-bar-text {
  display: flex;
  flex: 0.125;
  height: 40px;
  justify-content: flex-end;
  align-items: center;
}

.sortby-bar-text {
  display: flex;
  flex: 0.1;
  height: 40px;
  justify-content: flex-end;
  align-items: center;
}

.category-bar-dropdown {
  display: flex;
  flex: 0.125;
  height: 40px;
  justify-content: flex-start;
  align-items: center;
}

.my-dropdown-toggle {
  border-radius: 20px;
}

.my-dropdown-toggle .dropdown-toggle {
  border-color: black;
  font-weight: 800;
  border-radius: 50px;
  text-align: center;
  min-width: 120px;
  border: 10;
  border-width: 10px;
}

.my-dropdown-toggle .dropdown-toggle-placeholder {
  color: #c4c4c4;
}

.dropdown-menu {
  width: 150px;
  text-align: center;
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
