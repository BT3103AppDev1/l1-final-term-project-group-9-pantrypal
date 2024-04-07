<template>
  <div class="horizontalRow">
    <div class="first">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <RecipeImage :path="selectedRecipe.recipe_img_url" :ifCard="false" />
      <div v-if="!likeExists" class="switch-container">
        <label class="switch">
          <input
            type="checkbox"
            id="publishToCommunity"
            v-model="selectedRecipe.community"
            @change="togglePublishToCommunity"
          />
          <span class="slider"></span>
        </label>
        <label for="publishToCommunity">Publish to Community</label>
      </div>
    </div>
    <div class="second">
      <div class="title-row">
        <h1>{{ selectedRecipe.recipe_name }}</h1>
        <LikeButton v-if="likeExists" :recipe="selectedRecipe" />
      </div>
      <div class="warning" v-if="selectedRecipe.AIgenerated">
        <img clas="warning-logo" src="../assets/warning-icon.png" height="16px" />
        <span
          >This recipe is AI-generated and PantryPal has not verified it for accuracy and
          safety.</span
        >
      </div>
      <p>
        <i v-if="likeExists">
          By @{{ username }},
          {{
            new Date(selectedRecipe.created_date.seconds * 1000).toLocaleDateString(
              "en-GB",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )
          }}
        </i>
        <i v-else>
          By @{{ username }},
          {{
            new Date(selectedRecipe.created_date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </i>
      </p>

      <p>{{ selectedRecipe.description }}</p>
      <p>
        <b>SERVING SIZE:</b> {{ selectedRecipe.serving_size }} |
        <b>COOK TIME:</b>
        {{ cookingTimeInHrAndMin }}
      </p>
      <span class="allergens-container">
        <p><b>CONTAINS:</b></p>
        <template v-for="(allergen, index) in selectedRecipe.allergens" :key="index">
          <span>{{ allergen }}</span>
          <p v-if="index < selectedRecipe.allergens.length - 1">,</p>
        </template>
      </span>
      <span
        v-for="(category, index) in selectedRecipe.categories"
        :key="index"
        class="category-bubble"
        >{{ category }}</span
      >
    </div>
  </div>

  <div class="horizontalRow">
    <div class="first">
      <!-- Ingredients -->
      <div class="recipe-section">
        <h3>Ingredients:</h3>
        <ul class="checkbox-list">
          <li v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index">
            <!--using likeExists to remove checkbox-->
            <input
              v-if="!likeExists"
              type="checkbox"
              :id="'ingredient' + index"
              v-model="selectedIngredients[index]"
            />
            <label :for="'ingredient' + index">{{ ingredient }}</label>
          </li>
        </ul>
      </div>
    </div>

    <!-- Directions -->
    <div class="second">
      <div class="recipe-section">
        <h3>Directions:</h3>
        <ol>
          <li v-for="(step, index) in selectedRecipe.directions" :key="index">
            {{ index + 1 }}. {{ step }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeImage from "./RecipeImage.vue";
import LikeButton from "./LikeButton.vue";

import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
export default {
  components: {
    RecipeImage,
    LikeButton,
  },
  data() {
    return {
      username: "",
      cookingTimeInHrAndMin: "",
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
    likeExists: {
      type: Boolean,
    },
  },
  mounted() {
    this.fetchRecipeUsernameAndCookingTime();
  },
  methods: {
    async fetchRecipeUsernameAndCookingTime() {
      const userQuery = query(
        collection(db, "users"),
        where("user_id", "==", this.selectedRecipe.user_id)
      );
      const userQuerySnapshot = await getDocs(userQuery);
      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        this.username = userData.username;
      }
      this.calculateCookingTime();
    },

    calculateCookingTime() {
      const minutes = this.selectedRecipe.cook_time;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      let result = "";
      if (hours > 0) {
        result += `${hours}h`;
      }
      if (remainingMinutes > 0) {
        result += `${remainingMinutes}mins`;
      }
      this.cookingTimeInHrAndMin = result || "0mins";
    },
    togglePublishToCommunity() {
      this.$emit("togglePublishToCommunity", this.selectedRecipe.community);
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
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
  padding-right: 10px;
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

.switch-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.switch-container .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  vertical-align: middle;
}

.switch-container .switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-container .slider {
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 20px;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.switch-container .slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.switch-container input:checked + .slider {
  background-color: black;
}

.switch-container input:checked + .slider:before {
  transform: translateX(20px);
}

.warning {
  background-color: #fff7d7;
  padding: 10px 10px;
  border-radius: 8px;
  margin: 5px 10px 5px 0px;
  font-size: 12px;
  vertical-align: middle;
  align-items: center;
  display: flex;
  width: fit-content;
}

img {
  margin-right: 8px;
}

h1 {
  margin: 0px 0px;
}

.back-button {
  margin-bottom: 10px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: black;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.back-button:hover {
  text-decoration: underline;
}

.back-button i {
  margin-right: 5px;
}
</style>
