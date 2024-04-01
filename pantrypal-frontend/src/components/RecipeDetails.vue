<template>
    <div class="horizontalRow">
        <div class="first">
            <RecipeImage :path="selectedRecipe.recipe_img_url" :ifCard="false" />
        </div>
        <div class="second">
            <div class="title-row">
                <h1>{{ selectedRecipe.recipe_name }}</h1>
                <LikeButton v-if="likeExists" :recipe="selectedRecipe" />
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
                new Date(selectedRecipe.created_date).toLocaleDateString(
                    "en-GB",
                    {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }
                )
            }}
                </i>
            </p>

            <p>{{ selectedRecipe.description }}</p>
            <p>
                <b>SERVING SIZE:</b> {{ selectedRecipe.serving_size }} | <b>COOK TIME:</b>
                {{ cookingTimeInHrAndMin }}
            </p>
            <span class="allergens-container">
                <p><b>CONTAINS:</b></p>
                <template v-for="(allergen, index) in selectedRecipe.allergens" :key="index">
                    <span>{{ allergen }}</span>
                    <p v-if="index < selectedRecipe.allergens.length - 1">,</p>
                </template>
            </span>
            <span v-for="(category, index) in selectedRecipe.categories" :key="index" class="category-bubble">{{
                category }}</span>
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
                        <input v-if="!likeExists" type="checkbox" :id="'ingredient' + index"
                            v-model="selectedIngredients[index]" />
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
            cookingTimeInHrAndMin: ""
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
        }
    },
    mounted() {
        this.fetchRecipeUsernameAndCookingTime()

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
            let result = '';
            if (hours > 0) {
                result += `${hours}h`;
            }
            if (remainingMinutes > 0) {
                result += `${remainingMinutes}mins`;
            }
            this.cookingTimeInHrAndMin = result || '0mins';
        }
    }
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
</style>