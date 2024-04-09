<template>
  <div class="user-profile-stats">
    <div class="stats">
      <div class="favourite-category">
        <h2>Favourite Categories</h2>
        <div v-if="Object.keys(categoryList).length > 0" class="category-charts">
          <div class="category-liked">
            <pie-chart class="pie-category-liked" :data="categoryList"></pie-chart>
          </div>
        </div>
        <div v-else>
          <p>No recipes liked</p>
        </div>
      </div>
      <div class="numberOfRecipesCreated">
        <h2>Number of recipes created</h2>
        <div class="category-liked">
          <column-chart
            :data="recipesCreatedData"
            xtitle="Month"
            ytitle="Number of Recipes Created"
          ></column-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import "chart.js";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

export default {
  name: "UserProfileStats",
  components: {
    VueChartkick,
  },
  props: {
    lastStatsUpdate: Number,
  },
  data() {
    return {
      likedRecipes: {},
      categoryList: {},
      userData: {},
      myCookbookRecipes: [],
      recipesCreatedData: {},
    };
  },
  mounted() {
    this.fetchLikedRecipesData();
  },
  methods: {
    fetchRecipeFromFirebase(recipeId) {
      return getDoc(doc(db, "all_recipes", recipeId))
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            return docSnapshot.data();
          } else {
            console.error("No such document");
          }
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
          throw error;
        });
    },
    handleLastStatsUpdate() {
      console.log("nice");
      this.fetchLikedRecipesData();
    },
    async fetchLikedRecipesData() {
      if (auth.currentUser) {
        const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
        this.userData = userDocSnapshot.data();
        this.fetchRecipesFromCookbook();
      }
      let categoryList = {
        Asian: 0,
        Beverages: 0,
        "Breakfast and Brunch": 0,
        "Desserts and Snacks": 0,
        "Fast Food": 0,
        "Healthy Choices": 0,
        "Late-night Eats": 0,
        "Local Delights": 0,
        Others: 0,
        Specialty: 0,
        Western: 0,
      };

      this.likedRecipes = this.userData.liked_recipes;
      if (this.userData.liked_recipes && this.userData.liked_recipes.length > 0) {
        const fetchPromises = this.likedRecipes.map((recipeId) => {
          return this.fetchRecipeFromFirebase(recipeId)
            .then((recipeDoc) => {
              if (recipeDoc && recipeDoc.categories) {
                recipeDoc.categories.forEach((category) => {
                  if (category in categoryList) {
                    categoryList[category]++;
                  }
                });
              }
            })
            .catch((error) => {
              console.error("Error fetching recipe from Firebase:", error);
            });
        });

        Promise.all(fetchPromises).then(() => {
          let sortedCategories = Object.entries(categoryList)
            .filter(([key, value]) => value > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

          let topCategories = {};
          sortedCategories.forEach(([key, value]) => {
            topCategories[key] = value;
          });

          this.categoryList = topCategories;
        });
      } else {
        this.categoryList = {};
      }
    },
    async fetchRecipesFromCookbook() {
      const recipes = [];
      for (const recipeId of this.userData.my_cookbook) {
        try {
          const recipeDocSnapshot = await getDoc(doc(db, "all_recipes", recipeId));
          if (recipeDocSnapshot.exists()) {
            const recipeData = recipeDocSnapshot.data();
            recipes.push(recipeData);
          }
        } catch (error) {
          console.error("Error fetching recipe from Firebase:", error);
        }
      }
      this.myCookbookRecipes = recipes;
      this.fetchRecipeCreationData();
      // can add other functions here for common leftovers Barchart and fav category
      // that need cookbook recipes data
      //
      //
    },
    async fetchRecipeCreationData() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // Month is zero-based

      const monthLabels = [];
      const recipeCounts = {};

      // Generate month labels for the last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentYear, currentMonth - i, 1);
        const month = date.toLocaleString("default", { month: "short" });
        monthLabels.push(month);
        recipeCounts[month] = 0;
      }

      // Count recipes created by month from myCookbookRecipes
      for (const recipe of this.myCookbookRecipes) {
        if (recipe && recipe.created_date) {
          const creationDate = new Date(recipe.created_date.seconds * 1000);
          const creationYear = creationDate.getFullYear();
          const creationMonth = creationDate.getMonth();

          // Check if the recipe was created in the last 6 months
          if (
            creationYear === currentYear &&
            creationMonth >= currentMonth - 5 && // Adjusted to cover only the past 6 months
            creationMonth <= currentMonth // Ensure it doesn't count future months
          ) {
            const month = creationDate.toLocaleString("default", { month: "short" });
            recipeCounts[month]++;
          }
        }
      }

      const recipeData = monthLabels.map((month) => [month, recipeCounts[month]]);
      this.recipesCreatedData = recipeData;
    },
  },
};
</script>

<style scoped>
.user-profile-stats {
  display: flex;
  justify-content: center;
  padding: 90px 100px;
}

.stats {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
