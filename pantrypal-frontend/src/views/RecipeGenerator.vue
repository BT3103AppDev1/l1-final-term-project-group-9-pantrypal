<template>
  <div class="recipeGenerator">
    <TopBar :ifFeed=false />
    <div class="content-container">
      <RecipeGeneratorSidebar :selected="selected" />
      <div class="view-container">
        <InputLeftover v-if="selected === 'input'" @generateRecipe="generateRecipe" />
        <GenerateLoading v-if="selected === 'generate'" :ingredients="ingredients" :categories="categories"
          :dietaryRestrictions="dietaryRestrictions" @recipeGenerated="recipeGenerated" />
        <div v-show="selected === 'save'">
          <RecipeDetailsWindow :selectedRecipe="recipe" :selectedIngredients="selectedIngredients" />
          <CircleButton logo="src/assets/chefbot-button.png" @click="toggleChefBot" />
          <ChefBot v-show="showChefBot" @close="showChefBot = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChefBot from "@/components/ChefBot.vue";
import CircleButton from "@/components/CircleButton.vue";
import InputLeftover from "@/components/InputLeftover.vue";
import TopBar from "@/components/TopBar.vue";
import RecipeGeneratorSidebar from "@/components/RecipeGeneratorSidebar.vue";
import GenerateLoading from "@/components/GenerateLoading.vue";
import RecipeDetailsWindow from "@/components/RecipeDetailsWindow.vue";

export default {
  name: "Recipe Generator",
  components: {
    ChefBot,
    CircleButton,
    InputLeftover,
    TopBar,
    RecipeGeneratorSidebar,
    GenerateLoading,
    RecipeDetailsWindow,
  },
  data() {
    return {
      showChefBot: false,
      selected: "input",
      categories: null,
      dietaryRestrictions: '',
      ingredients: [],
      recipe: null,
      selectedIngredients: [],
    };
  },
  methods: {
    toggleChefBot() {
      this.showChefBot = !this.showChefBot;
    },
    generateRecipe(props) {
      this.categories = props.categories;
      this.dietaryRestrictions = props.dietaryRestrictions;
      this.ingredients = props.ingredients;
      this.selected = "generate";
      console.log(this.categories);
      console.log(this.dietaryRestrictions);
    },
    recipeGenerated(props) {
      console.log("recipegenerated :)");
      console.log(props.generatedRecipe);

      try {
        this.recipe = props.generatedRecipe;
        let user_id = 'chefbot';
        this.recipe.user_id = user_id;
        this.recipe.created_date = new Date();
        this.selectedIngredients = this.recipe.ingredients;
        this.selected = "save";
        console.log(this.recipe);
        console.log(typeof this.recipe);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    },
  },
};
</script>

<style scoped>
.content-container {
  display: flex;
}

.view-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
</style>