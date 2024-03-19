<template>
  <div class="recipe-card">
    <h2>{{ recipe.title }}</h2>
    <img :src="recipe.image" :alt="recipe.title" />
    <p>{{ recipe.description }}</p>
    <button @click="viewRecipe">View Recipe</button>
  </div>
</template>

<script>
export default {
  props: {
    recipe: Object,
  },
  methods: {
    viewRecipe() {
      // Add your logic to navigate to the recipe details page
      console.log("Viewing recipe:", this.recipe.title);
    },
  },
};
</script>

<style scoped>
.recipe-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
}

.recipe-card img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}
</style>
