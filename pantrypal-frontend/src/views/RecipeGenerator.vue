<template>
  <div class="recipeGenerator">
    <TopBar :ifFeed=false />
    <div class="content-container">
      <RecipeGeneratorSidebar :selected="selected" />
      <div class="view-container">
        <InputLeftover v-if="selected === 'input'" @generateRecipe="generateRecipe" />
        <GenerateLoading v-if="selected === 'generate'" :ingredients="ingredients" :categories="categories"
          :dietaryRestrictions="dietaryRestrictions" :prev_recipe_name="prev_recipe_name" @recipeGenerated="recipeGenerated" @back="handleBack" />
        <div class="recipe-details-container" v-show="selected === 'save'">
          <RecipeDetails :selectedRecipe="recipe" :selectedIngredients="selectedIngredients" :likeExists="false"/>
          <CircleButton logo="src/assets/chefbot-button.png" class="chefBotIcon" @click="toggleChefBot" />
          <ChefBot :key="componentKey" :selectedRecipe="recipe" v-if="recipe && showChefBot" @close="showChefBot = false" />
          <button @click="regenerateRecipe" class="reloadButton">Regenerate</button>
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
import RecipeDetails from "@/components/RecipeDetails.vue";

export default {
  name: "Recipe Generator",
  components: {
    ChefBot,
    CircleButton,
    InputLeftover,
    TopBar,
    RecipeGeneratorSidebar,
    GenerateLoading,
    RecipeDetails,
  },
  data() {
    return {
      showChefBot: false,
      selected: "input",
      categories: null,
      dietaryRestrictions: '',
      ingredients: [],
      recipe: {},
      selectedIngredients: [],
      prev_recipe_name: null,
    };
  },
  methods: {
    toggleChefBot() {
      this.showChefBot = !this.showChefBot;
    },
    regenerateRecipe() {
      this.selected = 'generate';
    },
    handleBack() {
      this.selected = "input";
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
        this.componentKey++;
        let user_id = 'chefbot';
        this.recipe.user_id = user_id;
        this.recipe.created_date = new Date();
        this.prev_recipe_name = this.recipe.recipe_name;

        this.selectedIngredients = this.recipe.ingredients.map(() => false);

        // Check each ingredient in the recipe if it's present in this.ingredients
        this.recipe.ingredients.forEach((recipeIngredient, recipeIndex) => {
        // Iterate over this.ingredients to find a match
        for (let i = 0; i < this.ingredients.length; i++) {
            const ingredient = this.ingredients[i].name;
            console.log("oneingredeint");
            console.log(ingredient);
            // Check if the recipeIngredient contains ingredient
            if (recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())) {
                this.selectedIngredients[recipeIndex] = true; // Mark checkbox as checked if ingredient is in this.ingredients
                break; // Exit the loop once a match is found
            }
        }
        });
        
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

.recipe-details-container {
    padding: 2rem;
}

.recipe-details-container {
  position: relative;
  padding: 2rem;
  min-height:400px;
}

.reloadButton {
  background-color: #a7bf6a;
  border: none;
  text-decoration: none;
  padding: 0;
  cursor: pointer;
  border-radius: 10px;
  width: 90px;
  height: 32px;
  position: absolute;
  bottom: 0px;
  right: 20px;
  z-index: 10;
}

.reloadButton {
  font-size: 15px;
  color: white;
  text-align: center;
  line-height: 32px; 
}

.chefBotIcon {
  z-index: 100;
}

</style>