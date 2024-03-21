<template>
  <div class="recipeGenerator">
    <h1>Recipe Generator</h1>
    <InputLeftover />
    <CircleButton logo="src/assets/chefbot-button.png" @click="toggleChefBot" />
    <ChefBot v-show="showChefBot" @close="showChefBot = false" />
  </div>
</template>

<script>
import ChefBot from "@/components/ChefBot.vue";
import CircleButton from "@/components/CircleButton.vue";
import InputLeftover from "@/components/InputLeftover.vue";

export default {
  name: "Recipe Generator",
  components: {
    ChefBot,
    CircleButton,
    InputLeftover,
  },
  data() {
    return {
      showChefBot: false,
    };
  },
  methods: {
    toggleChefBot() {
      this.showChefBot = !this.showChefBot;
    },
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>