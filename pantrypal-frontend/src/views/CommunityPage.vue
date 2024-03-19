<template>
  <div class="community-page">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search name or ingredients..."
    />
    <h1>Community Recipes</h1>
    <div class="recipe-list">
      <div v-for="recipe in filteredRecipes" :key="recipe.recipe_id" class="recipe-card">
        <div class="info">
          <span>By {{ recipe.user_id }}</span>
          <span>{{ recipe.categories.join(", ") }}</span>
        </div>
        <h2>{{ recipe.recipe_name }}</h2>
        <img :src="recipe.recipe_img_url" :alt="recipe.recipe_name" />
        <p>{{ recipe.description }}</p>
        <button @click="viewRecipe(recipe)">View Recipe</button>
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
    viewRecipe(recipe) {
      console.log("Viewing recipe:", recipe.recipe_name);
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
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.recipe-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
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
</style>
