<template>
  <div class="recipeGenerator">
    <TopBar :ifFeed=false />
    <div class="view-container">
        <RecipeGeneratorSidebar :selected="selected"/>
        <div class="main-view-container">
        <div class="main-view">
            <div v-show="selected === 'input'">
                <InputLeftover @generateRecipe="generateRecipe"/>
            </div>
            <div v-show="selected === 'generate'">
                <GenerateLoading :ingredients="ingredients"/>
            </div>
            <div v-show="selected === 'save'">
                <CircleButton logo="src/assets/chefbot-button.png" @click="toggleChefBot" />
                <ChefBot v-show="showChefBot" @close="showChefBot = false" />
            </div>
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

export default {
  name: "Recipe Generator",
  components: {
    ChefBot,
    CircleButton,
    InputLeftover,
    TopBar,
    RecipeGeneratorSidebar,
    GenerateLoading,
  },
  data() {
    return {
        showChefBot: false,
        selected: "input",
        value: null,
        dietaryRestrictions: '',
        ingredients: [],
    };
  },
  methods: {
    toggleChefBot() {
      this.showChefBot = !this.showChefBot;
    },
    generateRecipe(props) {
        this.value = props.value;
        this.dietaryRestrictions = props.dietaryRestrictions;
        this.ingredients = props.ingredients;
        this.selected = "generate";
    },
  },
};
</script>

<style scoped>
.main-view-container {
    display: flex;
    justify-content: center;
    width: 100%;
}
.view-container {
    display: flex;
    height: 100vh;
}
</style>