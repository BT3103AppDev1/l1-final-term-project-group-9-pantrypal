<template>
  <div class="user-profile-stats">
    <div class="favourite-category">
      <h2>Favourite Categories</h2>
      <p>(Liked Recipes)</p>
      <div v-if="Object.keys(categoryList).length > 0" class="category-charts">
        <div class="category-liked">
          <pie-chart
            class="pie-category-liked"
            :data="categoryList"
            :colors="[
              '#596639',
              '#CBDF99',
              '#8AB3A5',
              '#BAD7BC',
              '#DCAA83',
              '#BD6B16',
              '#406344',
              '#2F4858',
            ]"
          ></pie-chart>
        </div>
      </div>
      <div v-else>
        <p>No recipes liked</p>
      </div>
    </div>

    <div class="favourite-category">
      <h2>Favourite Categories</h2>
      <p>(My Cookbook)</p>
      <div v-if="Object.keys(myCookbookCategoryList).length > 0" class="category-charts">
        <div class="category-liked">
          <pie-chart
            class="pie-category-liked"
            :data="myCookbookCategoryList"
            :colors="[
              '#596639',
              '#CBDF99',
              '#8AB3A5',
              '#BAD7BC',
              '#DCAA83',
              '#BD6B16',
              '#406344',
              '#2F4858',
            ]"
          ></pie-chart>
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
          :colors="['#BD6B16']"
        ></column-chart>
      </div>
    </div>

    <div class="pastMonthLeftovers">
      <h2>Leftovers for the Past Month</h2>
      <div class="category-liked">
        <bar-chart
          :data="leftoverPastMonth"
          xtitle="Counts"
          ytitle="Leftovers"
          :colors="['#596639']"
          loading="Loading..."
          xstep="1"
        ></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import "chart.js";
import "chartkick/chart.js";
import Fuse from "fuse.js";

export default {
  name: "UserProfileStats",
  props: {
    lastStatsUpdate: Number,
  },
  data() {
    return {
      likedRecipes: {},
      categoryList: {},
      myCookbookCategoryList: {},
      userData: {},
      myCookbookRecipes: [],
      recipesCreatedData: null,
      leftoverPastMonth: null,
    };
  },
  mounted() {
    this.fetchLikedRecipesData();
    this.fetchMyCookbookData();
  },
  methods: {
    async fetchRecipeFromFirebase(recipeId) {
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
    async fetchMyCookbookData() {
      if (auth.currentUser) {
        const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
        this.userData = userDocSnapshot.data();
        this.fetchRecipesFromCookbook();
      }
      let myCookbookCategoryList = {
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

      this.my_cookbook = this.userData.my_cookbook;
      if (this.userData.my_cookbook && this.userData.my_cookbook.length > 0) {
        const fetchPromises = this.my_cookbook.map((recipeId) => {
          return this.fetchRecipeFromFirebase(recipeId)
            .then((recipeDoc) => {
              if (recipeDoc && recipeDoc.categories) {
                recipeDoc.categories.forEach((category) => {
                  if (category in myCookbookCategoryList) {
                    myCookbookCategoryList[category]++;
                  }
                });
              }
            })
            .catch((error) => {
              console.error("Error fetching recipe from Firebase:", error);
            });
        });

        Promise.all(fetchPromises).then(() => {
          let sortedMyCookbookCategories = Object.entries(myCookbookCategoryList)
            .filter(([key, value]) => value > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

          let topCategories = {};
          sortedMyCookbookCategories.forEach(([key, value]) => {
            topCategories[key] = value;
          });

          this.myCookbookCategoryList = topCategories;
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
      this.fetchLeftoverPastMonth();
    },
    async fetchRecipeCreationData() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const monthLabels = [];
      const recipeCounts = {};

      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentYear, currentMonth - i, 1);
        const month = date.toLocaleString("default", { month: "short" });
        monthLabels.push(month);
        recipeCounts[month] = 0;
      }

      for (const recipe of this.myCookbookRecipes) {
        if (recipe && recipe.created_date) {
          const creationDate = new Date(recipe.created_date.seconds * 1000);
          const creationYear = creationDate.getFullYear();
          const creationMonth = creationDate.getMonth();

          if (
            creationYear === currentYear &&
            creationMonth >= currentMonth - 5 &&
            creationMonth <= currentMonth
          ) {
            const month = creationDate.toLocaleString("default", {
              month: "short",
            });
            recipeCounts[month]++;
          }
        }
      }

      const recipeData = monthLabels.map((month) => [month, recipeCounts[month]]);
      this.recipesCreatedData = recipeData;
    },
    async fetchLeftoverPastMonth() {
      const currentDate = new Date();
      const lastMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
      const lastMonthMidnight = new Date(
        lastMonthDate.getFullYear(),
        lastMonthDate.getMonth(),
        lastMonthDate.getDate()
      );

      const leftoversPastMonth = this.myCookbookRecipes
        .filter((recipe) => {
          const creationDate = new Date(recipe.created_date.seconds * 1000);
          return creationDate >= lastMonthMidnight;
        })
        .filter((recipe) => recipe.leftovers)
        .map((recipe) => recipe.leftovers);

      const allLeftovers = leftoversPastMonth.flat();

      const distinctLeftovers = allLeftovers.filter(
        (value, index, self) => self.indexOf(value) === index
      );

      const fuse = new Fuse(distinctLeftovers, { threshold: 0.1 });

      const leftoverCounts = {};
      allLeftovers.forEach((leftover) => {
        const matches = fuse.search(leftover);

        if (matches.length > 0) {
          matches.sort((a, b) => a.score - b.score);

          const topMatch = matches[0];
          const matchedValue = topMatch.item;

          if (matchedValue in leftoverCounts) {
            leftoverCounts[matchedValue]++;
          } else {
            leftoverCounts[matchedValue] = 1;
          }
        } else {
          if (leftover in leftoverCounts) {
            leftoverCounts[leftover]++;
          } else {
            leftoverCounts[leftover] = 1;
          }
        }
      });

      const sortedLeftoverCounts = Object.entries(leftoverCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      this.leftoverPastMonth = sortedLeftoverCounts;
    },
  },
};
</script>

<style scoped>
.user-profile-stats {
  display: grid;
  grid-gap: 3rem 8rem;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;
  padding: 80px 50px;
  text-align: center;
  width: 80%;
}

@media (max-width: 1024px) {
  .user-profile-stats {
    display: block;
    width: min-content;
  }
}

.stats {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
