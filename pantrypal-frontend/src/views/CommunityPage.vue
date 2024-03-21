<template>

  <div class="community-page">
    <TopBar :ifFeed=true />
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
            :closeOnOutsideClick="true" v-on:updateOption="filterUsingCategory">
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
      <RecipeCard v-for="recipe in filteredRecipes" :key="recipe.recipe_id" :recipe="recipe"
        @toggle="toggleRecipeDetails" />
    </div>

    <RecipeDetailsWindow v-if="selectedRecipe" :selectedRecipe="selectedRecipe"
      :selectedIngredients="selectedIngredients" :closeModal="closeModal" />
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import RecipeDetailsWindow from "../components/RecipeDetailsWindow.vue";
import { db } from "../firebase.js";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import TopBar from '@/components/TopBar.vue';
import dropdown from 'vue-dropdowns';
import RecipeImage from "@/components/RecipeImage.vue";

export default {
  components: {
    RecipeCard,
    RecipeDetailsWindow,
    TopBar,
    dropdown,
    RecipeImage
  },
  data() {
    return {
      arrayOfCategories: [{ name: 'All', id: '0' }, { name: 'pasta', id: "7tn1kUcL0nScw1y5xI0b" }, { name: "others", id: 'T0i47UNmqh1hj93UppUi' },],
      category: {
      },
      arrayOfSorts: [{ name: 'Most Recent' }, { name: 'Most Liked' }],
      sort: {
      },

      filteredRecipes: [],
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
        this.filteredRecipes.push(doc.data());
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
    async filterUsingCategory(payload) {
      this.category = payload;
      if (this.category.name == 'All') {
        this.filteredRecipes = this.recipes;
      } else {
        this.filteredRecipes = []
        const docSnap = await getDoc(doc(db, "categories", payload.id));
        const recipesIDlist = docSnap.data().recipes
        if (recipesIDlist.length != 0) {
          for (let x in recipesIDlist) {
            const docSnap = await getDoc(doc(db, "all_recipes", recipesIDlist[x]))
            this.filteredRecipes.push(docSnap.data());
          }
        }
      }
    }

  }
}

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
  margin: 60px;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
  flex-direction: row;

}
</style>