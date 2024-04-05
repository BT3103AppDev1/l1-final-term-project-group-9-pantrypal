<template>
  <div class="community-page">
    <TopBar :ifFeed="true" />
    <div class="filterBar">
      <div class="search-bar">
        <input type="text" class="search-input" placeholder="Search name or ingredients..." v-model="searchQuery" />
        <img class="search-button" src="../assets/search-icon.svg" alt="Search Icon" />
      </div>
      <div class="category-bar-text">
        <p>Category:</p>
      </div>
      <div class="category-bar-dropdown">
        <div class="dropdown-container">
          <dropdown class="my-dropdown-toggle" :options="arrayOfCategories" :selected="category" :placeholder="'All'"
            :closeOnOutsideClick="true" v-on:updateOption="filterUsingCategory">
          </dropdown>
        </div>
      </div>
      <div class="sortby-bar-text">
        <p>Sort By:</p>
      </div>
      <div class="category-bar-dropdown">
        <div class="dropdown-container">
          <dropdown class="my-dropdown-toggle" :options="arrayOfSorts" :selected="sort" :placeholder="'Most Recent'"
            :closeOnOutsideClick="true" v-on:updateOption="filterUsingSort">
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

    <!-- Back to Top button 
    <button class="back-to-top" @click="scrollToTop" v-show="showBackToTop">
      <img src="../assets/BackToTop.svg" alt="Back To Top" />
      <text>Back To Top</text>
    </button>
    -->

    <CircleButton logo="src/assets/plus-icon.png" @click="toggleCreateRecipe" />


  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import RecipeDetailsWindow from "../components/RecipeDetailsWindow.vue";
import { db } from "../firebase.js";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import TopBar from "@/components/TopBar.vue";
import dropdown from "vue-dropdowns";
import RecipeImage from "@/components/RecipeImage.vue";
import CreateRecipe from "@/components/CreateRecipe.vue";
import CircleButton from "@/components/CircleButton.vue";
import router from "../router/index.js";

export default {
  components: {
    RecipeCard,
    RecipeDetailsWindow,
    TopBar,
    dropdown,
    RecipeImage,
    CreateRecipe,
    CircleButton,
  },
  data() {
    return {
      arrayOfCategories: [
        { name: "All" },
        { name: "Asian" },
        { name: "Western" },
        { name: "Local Delights" },
        { name: "Healthy Choices" },
        { name: "Fast Food" },
        { name: "Desserts and Snacks" },
        { name: "Beverages" },
        { name: "Specialty" },
        { name: "Breakfast and Brunch" },
        { name: "Late-night Eats" },
        { name: "Others" },
      ],
      category: {},
      arrayOfSorts: [{ name: "Most Recent" }, { name: "Most Liked" }],
      sort: {},
      allCommunityRecipes: [],
      filteredRecipes: [],
      allRecipes: [],
      searchQuery: "",
      selectedRecipe: null,
      selectedIngredients: [],
      showCreateRecipe: false,
      showBackToTop: false
    };
  },
  watch: {
    searchQuery(value) {
      this.filterByNameOrIngredients();
    },
  },
  created() {
    this.fetchRecipes();
    this.router = router;
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    // Remove the scroll event listener when component is destroyed
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    async fetchRecipes() {
      const querySnapshot = await getDocs(collection(db, "all_recipes"));
      querySnapshot.forEach((doc) => {
        this.allRecipes.push(doc.data());
        if (doc.data().community && doc.data().community === true) {
          this.allCommunityRecipes.push(doc.data());
          this.filteredRecipes.push(doc.data());
        }
      });
      this.sortByMostRecent();
      this.sortAllByMostRecent();
    },
    toggleCreateRecipe() {
      this.showCreateRecipe = !this.showCreateRecipe;
      if (this.showCreateRecipe) {
        this.router.push("/create-recipe");
      }
    },

    toggleRecipeDetails(recipe) {
      recipe.showDetails = !recipe.showDetails;
      this.selectedRecipe = recipe;
    },
    closeModal() {
      this.selectedRecipe = null;
      this.selectedIngredients = [];
    },

    handleRecipeSubmitted() {
      this.$router.push("/community-page");
    },

    filterByNameOrIngredients() {
      this.filteredRecipes = this.allCommunityRecipes.filter((recipe) => {
        const nameMatch = recipe.recipe_name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        let ingredientsMatch = false;
        recipe.ingredients.forEach((ingredient) => {
          if (
            ingredient.toLowerCase().includes(this.searchQuery.toLowerCase())
          ) {
            ingredientsMatch = true;
          }
        });
        return nameMatch || ingredientsMatch;
      });
    },

    async filterUsingCategory(payload) {
      this.category = payload;
      if (this.category.name == "All") {
        this.filteredRecipes = this.allCommunityRecipes;
      } else {
        this.filteredRecipes = [];
        const docSnap = await getDoc(doc(db, "categories", payload.name));
        const recipesIDlist = docSnap.data().recipes;
        if (recipesIDlist.length != 0) {
          this.filteredRecipes = this.allCommunityRecipes.filter(recipe => recipesIDlist.includes(recipe.recipe_id));
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
      this.allCommunityRecipes = this.allCommunityRecipes.sort((a, b) => {
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
    handleScroll() {
      // Show the button when user scrolls down beyond 300px
      this.showBackToTop = window.scrollY > 250;

    },
    // Method to scroll to the top of the page
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
      });

    }
  }
};
</script>


<style scoped>
.community-page {
  margin: 0 auto;
  min-height: 1000px;
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
  margin: 60px;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
  flex-direction: row;
}

.plus-icon-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.plus-icon-container img {
  width: 30px;
  height: 30px;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: column
}

/* Show the button when scrolling down */
.back-to-top.show {
  display: block;
}

.back-to-top img {
  width: 60px;
  height: 60px;
}
</style>
