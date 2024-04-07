<template>
  <button class="save-recipe-button" @click="submitRecipe" :disabled="disabled">
    Save Recipe
  </button>
</template>

<script>
export default {
  name: "SaveRecipeButton",
  props: {
    disabled: Boolean,
  },
  methods: {
    submitRecipe() {
      this.$emit("save-recipe");
    },
  },
};
</script>

<style scoped>
.save-recipe-button {
  background-color: #a7bf6a;
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 15px;
  width: auto;
  height: auto;
  margin: 0 20px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.save-recipe-button:not([disabled]):hover {
  background-color: #596639;
}

.save-recipe-button[disabled] {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
