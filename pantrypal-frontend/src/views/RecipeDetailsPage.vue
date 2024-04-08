<template>
  <div class="main-recipe-details">
    <TopBar whichPage="feed" />
    <div class="recipe-content">
      <br />
      <br />
      <br />
      <br />
      <br />
      <RecipeDetails
        v-if="selectedRecipe"
        :selectedRecipe="selectedRecipe"
        :selectedIngredients="selectedIngredients"
        :likeExists="true"
      />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import RecipeDetails from "@/components/RecipeDetails.vue";
import { db } from "../firebase.js";
import { getDoc, doc } from "firebase/firestore";

export default {
  components: {
    TopBar,
    RecipeDetails,
  },
  props: {
    id: String,
  },
  data() {
    return {
      selectedRecipe: null,
      selectedIngredients: [],
    };
  },
  created() {
    this.fetchRecipeDetails();
  },
  methods: {
    async fetchRecipeDetails() {
      const recipeDocSnapshot = await getDoc(doc(db, "all_recipes", this.id));
      this.selectedRecipe = recipeDocSnapshot.data();
    },
  },
};
</script>
<style>
.main-recipe-details {
  background-color: white;
}
.recipe-content {
  background-color: white;
  /* padding: 20px; */
  border-radius: 8px;
  height: 90%;
  /* margin: 30px; */
  margin-left: 70px;
  margin-right: 70px;
  /* margin-top: 90px; */
}
</style>
