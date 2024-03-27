<template>
  <div v-if="selectedRecipe" class="popout-recipe">
    <div class="popout-recipe-content">
      <span class="close" @click="closeModal">&times;</span>
      <RecipeDetails :selectedRecipe="selectedRecipe" :selectedIngredients="selectedIngredients" />
    </div>
  </div>
</template>

<script>
import RecipeImage from "./RecipeImage.vue";
import LikeButton from "./LikeButton.vue";
import RecipeDetails from "./RecipeDetails.vue"
export default {
  components: {
    RecipeImage,
    LikeButton,
    RecipeDetails
  },
  data() {
    return {
      username: "NA",
    };
  },
  props: {
    selectedRecipe: {
      type: Object,
      required: true,
    },
    selectedIngredients: {
      type: Array,
      required: true,
    },
    closeModal: {
      type: Function,
    },
  },
};
</script>

<style scoped>
.popout-recipe {
  position: fixed;
  top: 100px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popout-recipe-content {
  background-color: white;
  /* padding: 20px; */
  border-radius: 8px;
  width: 80%;
  height: 90%;
  overflow-y: auto;
}

.horizontalRow {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.first {
  flex: 0.3;
}

.second {
  flex: 0.7;
}

.checkbox-list {
  list-style-type: none;
  padding: 0;
}

.checkbox-list li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.checkbox-list li input[type="checkbox"] {
  margin-right: 10px;
}

.recipe-section ol {
  padding-left: 20px;
}

.recipe-section ol li {
  position: relative;
  padding-left: 10px;
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

.allergens-container {
  display: flex;
  align-items: baseline;
}

.allergens-container p {
  margin-right: 5px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
