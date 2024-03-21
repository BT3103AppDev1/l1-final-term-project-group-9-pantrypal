<template>
  <div class="recipe-card" @click="toggleRecipeDetails">
    <div class="recipe-image">
      <RecipeImage :path="recipe.recipe_img_url" :ifCard=true />

    </div>
    <div class="recipe-details">
      <h2>{{ recipe.recipe_name }}</h2>
      <div class="info">
        <span v-for="(category, index) in recipe.categories" :key="index" class="category-bubble">{{ category }}</span>
      </div>
      <div class="user-id">
        <p>@{{ recipe.user_id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeImage from './RecipeImage.vue';
export default {
  components: {
    RecipeImage
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleRecipeDetails() {
      this.$emit("toggle", this.recipe);
    },
  },
};
</script>

<style scoped>
.recipe-card {
  width: calc(33.33% - 20px);
  height: 40vh;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  line-height: 1;
  display: flex;
  flex-direction: column;
}

.recipe-card:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

.recipe-image {
  flex: 1;
  overflow: hidden;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-details {
  padding: 15px;
  background-color: #cbdf99;
  flex: 0.5;
}

.recipe-details h2,
.recipe-details .info,
.recipe-details p {
  margin-bottom: 5px;
}

.info {
  display: flex;
  justify-content: space-between;
}

.category-bubble {
  display: inline-block;
  background-color: #fffce2;
  color: #333;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 5px;
  font-size: 0.75rem;
}

.user-id {
  font-style: italic;
  font-size: 0.75rem;
}
</style>
