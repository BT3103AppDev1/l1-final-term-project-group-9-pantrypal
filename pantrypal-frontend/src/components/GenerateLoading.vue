<template>
  <div class="generate-container">
    <GenerateErrorModal
      :isVisible="showErrorModal"
      @update:isVisible="showErrorModal = $event"
      @back="handleModalClose"
    />
    <h1>We are cooking up your recipe!</h1>
    <h1>Give us a few seconds...</h1>
    <div v-for="(ingredient, index) in ingredients">
      <div class="ingredient-container">
        <span>
          {{ ingredients[index].name }}
        </span>
        <span>
          {{ ingredients[index].quantity }}
        </span>
      </div>
    </div>
    <img src="@/assets/loading.gif" height="40px" />
  </div>
</template>

<script>
import axios from "axios";
import GenerateErrorModal from "./GenerateErrorModal.vue";

export default {
  name: "Generator Loading",
  components: {
    GenerateErrorModal,
  },
  data() {
    return {
      showErrorModal: false,
    };
  },
  props: {
    ingredients: Array,
    categories: Array,
    dietaryRestrictions: String,
    prev_recipe_name: {
      type: String,
      default: () => null,
    },
  },
  async mounted() {
    await this.fetchRecipe();
  },
  methods: {
    async fetchRecipe() {
      const payload = {
        ingredients: this.ingredients,
        categories: this.categories,
        dietaryRestrictions: this.dietaryRestrictions,
      };
      if (this.prev_recipe_name !== null) {
        payload.prev_recipe_name = this.prev_recipe_name;
        payload.first = false;
      } else {
        payload.first = true;
      }

      try {
        const response = await axios.post("https://us-central1-pantrypal-e1225.cloudfunctions.net/api/initial-recipe", payload);
        if (response.status === 400) {
        	this.showErrorModal = true;
        } else {
        	this.$emit("recipeGenerated", { generatedRecipe: response.data.content });
        }
			} catch (error) {
					this.showErrorModal = true;
					console.error("Error fetching recipe:", error);
			}
    },
    handleModalClose() {
      this.showErrorModal = false;
      this.$emit("back");
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 0;
}

.generate-container {
  padding: 8rem 0rem;
  text-align: center;
  width: 600px;
}

.ingredient-container {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
}

.ingredient-container {
  background-color: #ececec;
  padding: 1rem 2rem;
  border-radius: 10px;
}

img {
  padding: 2rem;
}
</style>
