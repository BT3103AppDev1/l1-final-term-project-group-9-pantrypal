<template>
  <div class="recipe-card" @click="toggleRecipeDetails">
    <div class="recipe-image">
      <RecipeImage :path="recipe.recipe_img_url" :ifCard="true" />
    </div>
    <div class="recipe-details">
      <h2>{{ recipe.recipe_name }}</h2>
      <div class="info">
        <span
          v-for="(category, index) in recipe.categories"
          :key="index"
          class="category-bubble"
          >{{ category }}</span
        >
      </div>
      <div class="user-id">
        <p>@{{ recipe.user_id }}</p>
      </div>
    </div>
    <div class="like-button">
      <button @click.stop="likeRecipe">Like</button>
      <span>{{ recipe.like_count }}</span>
    </div>
  </div>
</template>

<script>
import RecipeImage from "./RecipeImage.vue";
import { db, auth, getUserInfoFromID } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default {
  components: {
    RecipeImage,
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
    async likeRecipe() {
      if (!auth.currentUser) {
        this.$router.push("/login");
        return;
      }

      this.recipe.like_count++;

      try {
        const user = auth.currentUser;
        const recipeDocRef = doc(db, "all_recipes", this.recipe.recipe_id);
        await setDoc(recipeDocRef, {
          recipe_id: this.recipe.recipe_id,
          recipe_name: this.recipe.recipe_name,
          description: this.recipe.description,
          ingredients: this.recipe.ingredients,
          allergens: this.recipe.allergens,
          directions: this.recipe.directions,
          cook_time: this.recipe.cook_time,
          serving_size: this.recipe.serving_size,
          like_count: this.recipe.like_count,
          user_id: this.recipe.user_id,
          categories: this.recipe.categories,
          created_date: this.recipe.created_date,
          recipe_img_url: this.recipe.recipe_img_url,
          community: this.recipe.community,
        });

        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
        const userData = userDocSnapshot.data();

        console.log(userData);

        await setDoc(userDocRef, {
          email: userData.email,
          liked_recipes: Array.isArray(userData.liked_recipes)
            ? [...userData.liked_recipes, this.recipe.recipe_id]
            : [this.recipe.recipe_id],
          my_cookbook: Array.isArray(userData.my_cookbook) ? userData.my_cookbook : [],
          profile_img_url: userData.profile_img_url,
          user_id: userData.user_id,
          username: userData.username,
        });

        // await setDoc(userDocRef, {
        //   email: "test@test.com",
        //   liked_recipes: [this.recipe.recipe_id],
        //   my_cookbook: [],
        //   profile_img_url: "",
        //   user_id: auth.currentUser.uid,
        //   username: "test",
        // });
      } catch (error) {
        console.error("Error liking recipe:", error);
        this.recipe.like_count--;
      }
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
