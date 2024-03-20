<template>
  <div class="recipeGenerator">
    <h1>Recipe Generator</h1>
    <CircleButton logo="src/assets/chefbot-button.png" @click="toggleChefBot" />
    <ChefBot v-show="showChefBot" @close="showChefBot = false" />
  </div>
</template>

<script>
import ChefBot from "@/components/ChefBot.vue";
import CircleButton from "@/components/CircleButton.vue";

export default {
  name: "Recipe Generator",
  components: {
    ChefBot,
    CircleButton,
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
