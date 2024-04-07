<template>
    <div class="user-profile-stats">
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
    </div>
</template>

<script>
import { auth, db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export default {
  name: 'UserProfileStats',
  props: {
    lastStatsUpdate: Number,
  },
  data() {
    return {
        likedRecipes: {},
        categoryList:{},
        userData:{}
    }
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
                    console.error("No such document")
                }
            })
            .catch((error) => {
                console.error("Error fetching recipe:", error)
                throw error
            });
    },
    handleLastStatsUpdate() {
        console.log("nice")
        this.fetchLikedRecipesData();
    },
    async fetchLikedRecipesData() {
        if (auth.currentUser) {
            const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
            this.userData = userDocSnapshot.data();
        }
        let categoryList = {"Asian": 0, "Beverages": 0, "Breakfast and Brunch": 0, "Desserts and Snacks": 0, "Fast Food": 0, "Healthy Choices": 0,
            "Late-night Eats": 0, "Local Delights": 0, "Others": 0, "Specialty": 0, "Western": 0}

        this.likedRecipes = this.userData.liked_recipes;
        if (this.userData.liked_recipes && this.userData.liked_recipes.length > 0) {
            const fetchPromises = this.likedRecipes.map(recipeId => {
                return this.fetchRecipeFromFirebase(recipeId).then(recipeDoc => {
                if (recipeDoc && recipeDoc.categories) {
                    recipeDoc.categories.forEach(category => {
                    if (category in categoryList) {
                        categoryList[category]++;
                    }
                    });
                }
                }).catch(error => {
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
  }
}
</script>