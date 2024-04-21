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
    <div class="recipe-container">
      <div class="recipe-list" v-if="!isDataLoaded">
        <RecipeCardPlaceholder v-for="i in 15" :key="i" />
      </div>
      <div class="recipe-list">
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.recipe_id"
          :recipe="recipe"
          @updateLiked="updateLiked"
        />
      </div>
    </div>
    <div class="NoSearchResultsContainer">
      <text v-if="this.filteredRecipes.length == 0 && isDataLoaded"
        >No Search Results Found</text
      >
    </div>
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import { mapState } from "vuex";
import store from "@/store";
import { db, auth } from "../firebase.js";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import dropdown from "vue-dropdowns";
import RecipeImage from "@/components/RecipeImage.vue";
import RecipeCardPlaceholder from "./RecipeCardPlaceholder.vue";

export default {
  components: {
    RecipeCard,
    dropdown,
    RecipeImage,
    RecipeCardPlaceholder,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["RecipeFromPage", "selected"]),
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
      filteredRecipesByName: [],
      allRecipes: [],
      searchQuery: "",
      selectedRecipe: null,
      selectedIngredients: [],
      showCreateRecipe: false,
      isDataLoaded: false,
    };
  },
  watch: {
    searchQuery(value) {
      this.filterByNameOrIngredients();
    },
  },
  created() {
    this.fetchRecipes();
    store.commit("likedrecipes");
    // Set up real-time listener for liked recipes
    if (this.userData && this.userData.uid) {
      const userDocRef = doc(db, "users", this.userData.uid);
      onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const likedRecipes = doc.data().liked_recipes || [];
          this.updateLikedRecipes(likedRecipes);
        }
      });
    }
  },

  methods: {
    updateLiked() {
      this.$emit("updateLiked");
    },
    async fetchRecipes() {
      if (auth.currentUser) {
        const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
        const likedRecipes = userDocSnapshot.data().liked_recipes || [];
        this.updateLikedRecipes(likedRecipes);
      } else {
        const likedRecipes = this.userData.liked_recipes || [];
        this.updateLikedRecipes(likedRecipes);
      }
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
        const categoryMatch =
          this.category.name === "All" ||
          Object.keys(this.category).length === 0 ||
          recipe.categories.includes(this.category.name);
        return (nameMatch || ingredientsMatch) && categoryMatch;
      });
      this.filteredRecipesByName = this.filteredRecipes;
    },
    async filterUsingCategory(payload) {
      this.category = payload;
      if (this.category.name == "All" && this.searchQuery == "") {
        this.filteredRecipes = this.allLikedRecipes;
        this.filteredRecipesByName = this.allLikedRecipes;
        this.filteredRecipes = this.filteredRecipesByName;
      } else if (this.category.name == "All") {
        this.filteredRecipes = this.filteredRecipesByName;
      } else {
        const docSnap = await getDoc(doc(db, "categories", payload.name));
        const recipesIDlist = docSnap.data().recipes;

        this.filteredRecipes = this.filteredRecipesByName;
        this.filteredRecipes = this.filteredRecipesByName.filter((recipe) =>
          recipesIDlist.includes(recipe.recipe_id)
        );
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
    async updateLikedRecipes(likedRecipes) {
      try {
        this.filteredRecipes = [];
        this.allLikedRecipes = [];
        const promises = likedRecipes.map(async (recipeId) => {
          const recipeDocSnapshot = await getDoc(doc(db, "all_recipes", recipeId));
          if (recipeDocSnapshot.exists()) {
            const recipeData = recipeDocSnapshot.data();
            if (
              !this.allLikedRecipes.some(
                (recipe) => recipe.recipe_id === recipeData.recipe_id
              )
            ) {
              this.allLikedRecipes.push(recipeData);
            }
            if (
              !this.filteredRecipes.some(
                (recipe) => recipe.recipe_id === recipeData.recipe_id
              )
            ) {
              this.filteredRecipes.push(recipeData);
              this.filteredRecipesByName = this.filteredRecipes;
            }
          } else {
            console.error(`Recipe with ID ${recipeId} does not exist.`);
          }
        });
        await Promise.all(promises);
        this.isDataLoaded = true;
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
  },
};
</script>

<style scoped>
.liked-recipes-page {
  width: calc(100% - 224px);
  margin: auto;
  margin-top: 100px;
}

.filterBar {
  display: flex;
  padding: 0 4rem;
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

.recipe-container {
  /* display: flex;
    justify-content: center; */
  margin: 0 80px;
}

.recipe-list {
  margin: 10px 0px;
  /* flex: 0.9; */
  /* width: 1030px;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start; */
  /* flex-direction: row; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* @media screen and (max-width: 1330px) {
  .recipe-list {
    margin: 10px auto 0;
    display: flex;
    flex-wrap: wrap;
    width: 690px;
  }
}

@media screen and (max-width: 990px) {
  .recipe-list {
    margin: 10px auto 0;
    display: flex;
    flex-wrap: wrap;
    width: 340px;
  }
} */

.NoSearchResultsContainer {
  display: flex;
  justify-content: center;
}
</style>
