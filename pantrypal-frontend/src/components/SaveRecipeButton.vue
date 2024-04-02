<template>
  <button class="save-recipe-button" @click="submitRecipe">Save Recipe</button>
</template>

<script>
export default {
  methods: {
    submitRecipe() {
      this.$emit("save-recipe");
    },
  },
};
</script>

<style scoped>
.save-recipe-button {
  background-color: #60ce64;
  border: none;
  text-decoration: none;
  color: white;
  padding: 0;
  cursor: pointer;
  border-radius: 15px;
  width: 90px;
  height: 32px;
  margin: 0 20px;
}

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

.save-recipe-button:hover {
  background-color: #596639;
}
</style>
