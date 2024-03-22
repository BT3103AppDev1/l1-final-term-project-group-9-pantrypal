<template>
  <div class="recipeGenerator">
    <TopBar :ifFeed=false />
    <div class="content-container">
        <RecipeGeneratorSidebar :selected="selected"/>
        <div class="view-container">
            <InputLeftover v-if="selected === 'input'" @generateRecipe="generateRecipe"/>
            <GenerateLoading v-if="selected === 'generate'" :ingredients="ingredients"/>
            <div v-show="selected === 'save'">
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