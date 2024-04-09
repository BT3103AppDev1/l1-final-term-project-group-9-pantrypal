<template>
  <div class="recipe-card" @click="toggleRecipeDetails">
    <div class="recipe-image">
      <RecipeImage :path="recipe.recipe_img_url" :ifCard="true" />
    </div>
    <div class="recipe-details">
      <div class="recipe-name-container">
        <text class="recipe-name">{{ recipe.recipe_name }}</text>
      </div>
      <div class="info">
        <span
          v-for="(category, index) in recipe.categories"
          :key="index"
          class="category-bubble"
          >{{ category }}</span
        >
      </div>
      <div class="bottomRow">
        <div class="user-id">
          <p>@{{ userName }}</p>
        </div>

        <div class="like">
          <LikeButton :recipe="recipe" @updateLiked="updateLiked" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeImage from "./RecipeImage.vue";
import LikeButton from "./LikeButton.vue";

import { db, auth } from "../firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
  components: {
    RecipeImage,
    LikeButton,
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      recipeIsLiked: false,
      userName: "",
    };
  },
  async created() {
    if (auth.currentUser) {
      const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
      const userData = userDocSnapshot.data();
      this.recipeIsLiked = userData.liked_recipes.includes(this.recipe.recipe_id);
      const userQuery = query(
        collection(db, "users"),
        where("user_id", "==", this.recipe.user_id)
      );
      const userQuerySnapshot = await getDocs(userQuery);
      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        this.userName = userData.username;
      }
    }
  },
  methods: {
    toggleRecipeDetails() {
      this.$router.push({
        name: "RecipeDetailsPage",
        params: { id: this.recipe.recipe_id },
      });
    },
    updateLiked() {
      this.$emit("updateLiked");
    },
  },
};
</script>

<style scoped>
.recipe-card {
  /* max-width: 400px; */
  height: 350px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 20px;
  overflow: hidden;
}

.recipe-card:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.recipe-image {
  flex: 0.6;
  overflow: hidden;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-details {
  padding-left: 15px;
  padding-right: 15px;
  background-color: #cbdf99;
  flex: 0.4;
  display: flex;
  flex-direction: column;
}

.recipe-name-container {
  flex: 0.55;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
}

.info {
  flex: 0.43;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-start;
}

.category-bubble {
  height: 13px;
  background-color: #fffce2;
  color: #333;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 5px;
  font-size: 0.75rem;
}

.bottomRow {
  height: 30px;
  display: flex;
  flex-direction: row;
  flex: 0.02;
  align-items: center;
}

.user-id {
  font-style: italic;
  font-size: 0.75rem;
  flex: 0.8;
}

.like {
  align-items: center;
  border: none;
  cursor: pointer;
  background-color: #cbdf99;
  flex: 0.1;
}

.like-button {
  display: inline-flex;
  align-items: center;
  border: none;
  cursor: pointer;
  background-color: #cbdf99;
}

.like-button .fa {
  font-size: 1rem;
  margin-right: 5px;
  transition: color 0.3s;
  background: none;
  border: none;
}

.like-button .fa.liked {
  color: grey;
  background: none;
  border: none;
}

.like-button span {
  font-size: 1rem;
  background: none;
  border: none;
}
</style>
