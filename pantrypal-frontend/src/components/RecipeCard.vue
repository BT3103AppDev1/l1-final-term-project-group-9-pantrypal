<template>
  <div class="recipe-card" @click="toggleRecipeDetails">
    <div class="recipe-image">
      <RecipeImage :path="recipe.recipe_img_url" :ifCard="true" />
    </div>
    <div class="recipe-details">
      <h2>{{ recipe.recipe_name }}</h2>
      <div class="info">
        <span v-for="(category, index) in recipe.categories" :key="index" class="category-bubble">{{ category }}</span>
      </div>
      <div class="user-id">
        <p>@{{ userName }}</p>
      </div>
    </div>
    <div class="like">
      <LikeButton :recipe="recipe" />
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
      this.$router.push({ name: "RecipeDetailsPage", params: { id: this.recipe.recipe_id }, props: { profile: "test" } });
    },
  },
};
</script>

<style scoped>
.recipe-card {
  width: 350px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  line-height: 1;
  display: flex;
  flex-direction: column;
  margin: 20px;
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
  padding-left: 20px;
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

.like {
  padding-bottom: 10px;
  display: inline-flex;
  align-items: center;
  border: none;
  cursor: pointer;
  background-color: #cbdf99;
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
