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
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.recipe_id"
        :recipe="recipe"
        @toggle="toggleRecipeDetails"
      />
    </div>

    <RecipeDetailsWindow
      v-if="selectedRecipe"
      :selectedRecipe="selectedRecipe"
      :selectedIngredients="selectedIngredients"
      :closeModal="closeModal"
    />
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import RecipeDetailsWindow from "../components/RecipeDetailsWindow.vue";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

export default {
  components: {
    RecipeCard,
    RecipeDetailsWindow,
  },
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
