<template>
  <div class="like">
    <button class="like-button" @click.stop="toggleLikeRecipe">
      <i
        class="fa"
        :class="['fa-thumbs-up', { liked: !recipeIsLiked }]"
        aria-hidden="true"
      ></i>
    </button>
    <span>{{ recipe.like_count }}</span>
  </div>
</template>

<script>
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      recipeIsLiked: false,
    };
  },
  async created() {
    console.log("like button started");
    if (auth.currentUser) {
      const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
      const userData = userDocSnapshot.data();
      this.recipeIsLiked = userData.liked_recipes.includes(this.recipe.recipe_id);
    }
  },
  methods: {
    async toggleLikeRecipe() {
      if (!auth.currentUser) {
        this.$router.push("/login");
        return;
      }

      const user = auth.currentUser;
      const recipeDocRef = doc(db, "all_recipes", this.recipe.recipe_id);

      try {
        if (this.recipeIsLiked) {
          this.recipe.like_count--;
          await setDoc(recipeDocRef, {
            ...this.recipe,
            like_count: this.recipe.like_count,
          });

          const userDocRef = doc(db, "users", auth.currentUser.uid);
          const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
          const userData = userDocSnapshot.data();

          await setDoc(userDocRef, {
            ...userData,
            liked_recipes: userData.liked_recipes.filter(
              (id) => id !== this.recipe.recipe_id
            ),
          });
        } else {
          this.recipe.like_count++;
          await setDoc(recipeDocRef, {
            ...this.recipe,
            like_count: this.recipe.like_count,
          });

          const userDocRef = doc(db, "users", auth.currentUser.uid);
          const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
          const userData = userDocSnapshot.data();

          await setDoc(userDocRef, {
            ...userData,
            liked_recipes: [...userData.liked_recipes, this.recipe.recipe_id],
          });
        }

        this.recipeIsLiked = !this.recipeIsLiked;
      } catch (error) {
        console.error("Error toggling recipe like:", error);
      }
    },
  },
};
</script>

<style scoped>
.like {
  padding-left: 15px;
  padding-bottom: 10px;
  display: inline-flex;
  align-items: center;
  border: none;
  cursor: pointer;
  background: none;
  /* background-color: #cbdf99; */
}

.like-button {
  display: inline-flex;
  align-items: center;
  border: none;
  cursor: pointer;
  background: none;
  /* background-color: #cbdf99; */
}

.like-button span {
  font-size: 1rem;
  background: none;
  border: none;
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
</style>
