<template>
  <div class="liked-recipes-page">
    <div class="filterBar">
      <div class="search-bar">
        <input
          type="text"
          class="search-input"
          placeholder="Search name or ingredients..."
          v-model="searchQuery"
        />
        <img class="search-button" src="../assets/search-icon.svg" alt="Search Icon" />
      </div>
      <div class="category-bar-text">
        <p>Category:</p>
      </div>
      <div class="category-bar-dropdown">
        <div class="dropdown-container">
          <dropdown
            class="my-dropdown-toggle"
            :options="arrayOfCategories"
            :selected="category"
            :placeholder="'All'"
            :closeOnOutsideClick="true"
            v-on:updateOption="filterUsingCategory"
          >
          </dropdown>
        </div>
      </div>
      <div class="sortby-bar-text">
        <p>Sort By:</p>
      </div>
      <div class="category-bar-dropdown">
        <div class="dropdown-container">
          <dropdown
            class="my-dropdown-toggle"
            :options="arrayOfSorts"
            :selected="sort"
            :placeholder="'Most Recent'"
            :closeOnOutsideClick="true"
            v-on:updateOption="filterUsingSort"
          >
          </dropdown>
        </div>
      </div>
    </div>

    <!-- RecipeCards######### -->

    <!-- recipe card list -->
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.recipe_id"
        :recipe="recipe"
        @toggle="toggleRecipeDetails"
      />
    </div>
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import RecipeDetailsWindow from "../components/RecipeDetailsWindow.vue";
import { db, auth } from "../firebase.js";
import { collection, getDocs, getDoc, doc, onSnapshot } from "firebase/firestore";
import dropdown from "vue-dropdowns";
import RecipeImage from "@/components/RecipeImage.vue";

export default {
  components: {
    RecipeCard,
    RecipeDetailsWindow,
    dropdown,
    RecipeImage,
  },
  data() {
    return {
      arrayOfCategories: [
        { name: "All", id: "00" },
        { name: "Asian", id: "01" },
        { name: "Western", id: "02" },
        { name: "Local Delights", id: "03" },
        { name: "Healthy Choices", id: "04" },
        { name: "Fast Food", id: "05" },
        { name: "Desserts and Snacks", id: "06" },
        { name: "Beverages", id: "07" },
        { name: "Specialty", id: "08" },
        { name: "Breakfast and Brunch", id: "09" },
        { name: "Late-night Eats", id: "10" },
        { name: "Others", id: "11" },
      ],
      category: {},
      arrayOfSorts: [{ name: "Most Recent" }, { name: "Most Liked" }],
      sort: {},
      allLikedRecipes: [],
      filteredRecipes: [],
      allRecipes: [],
      searchQuery: "",
      selectedRecipe: null,
      selectedIngredients: [],
      showCreateRecipe: false,
    };
  },
  watch: {
    searchQuery(value) {
      this.filterByNameOrIngredients();
    },
  },
  created() {
    this.fetchRecipes();
    this.sortAllByMostRecent();

    // Set up real-time listener for liked recipes
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const likedRecipes = doc.data().liked_recipes || [];
        this.updateLikedRecipes(likedRecipes);
      }
    });
  },

  methods: {
    async fetchRecipes() {
      const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
      const likedRecipes = userDocSnapshot.data().liked_recipes || [];
      this.updateLikedRecipes(likedRecipes);
      this.sortByMostRecent();
      this.sortAllByMostRecent();
    },
    toggleCreateRecipe() {
      this.showCreateRecipe = !this.showCreateRecipe;
    },

    toggleRecipeDetails(recipe) {
      recipe.showDetails = !recipe.showDetails;
      this.selectedRecipe = recipe;
    },
    closeModal() {
      this.selectedRecipe = null;
      this.selectedIngredients = [];
    },

    filterByNameOrIngredients() {
      this.filteredRecipes = this.allLikedRecipes.filter((recipe) => {
        const nameMatch = recipe.recipe_name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        let ingredientsMatch = false;
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.toLowerCase().includes(this.searchQuery.toLowerCase())) {
            ingredientsMatch = true;
          }
        });
        return nameMatch || ingredientsMatch;
      });
    },

    async filterUsingCategory(payload) {
      this.category = payload;
      if (this.category.name == "All") {
        this.filteredRecipes = this.allLikedRecipes;
      } else {
        this.filteredRecipes = [];
        const docSnap = await getDoc(doc(db, "categories", payload.id));
        const recipesIDlist = docSnap.data().recipes;
        if (recipesIDlist.length != 0) {
          for (let x in recipesIDlist) {
            const docSnap = await getDoc(doc(db, "all_recipes", recipesIDlist[x]));
            this.filteredRecipes.push(docSnap.data());
          }
        }
      }
    },
    filterUsingSort(payload) {
      this.sort = payload;
      if (payload.name == "Most Recent") {
        this.sortByMostRecent();
      } else {
        this.sortByMostLiked();
      }
    },
    sortAllByMostRecent() {
      this.allLikedRecipes = this.allLikedRecipes.sort((a, b) => {
        return b.created_date.toDate() - a.created_date.toDate();
      });
    },
    sortByMostRecent() {
      this.filteredRecipes = this.filteredRecipes.sort((a, b) => {
        return b.created_date.toDate() - a.created_date.toDate();
      });
    },
    sortByMostLiked() {
      this.filteredRecipes = this.filteredRecipes.sort((a, b) => {
        return b.like_count - a.like_count;
      });
    },
    updateLikedRecipes(likedRecipes) {
      this.filteredRecipes = [];
      this.allLikedRecipes = [];
      likedRecipes.forEach(async (recipeId) => {
        const recipeDocSnapshot = await getDoc(doc(db, "all_recipes", recipeId));
        const recipeData = recipeDocSnapshot.data();
        if (!this.allLikedRecipes.some(recipe => recipe.recipe_id === recipeData.recipe_id)) {
            this.allLikedRecipes.push(recipeData);
        }
        if (!this.filteredRecipes.some(recipe => recipe.recipe_id === recipeData.recipe_id)) {
            this.filteredRecipes.push(recipeData);
        }
      });
    },
  },
};
</script>

<style scoped>
.liked-recipes-page {
  width: 100%;
}

.filterBar {
  display: flex;
  padding: 0 2rem;
  margin: 1rem 0;
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
  background-color: inherit;
}

.search-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
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
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
  flex-direction: row;
}
</style>
