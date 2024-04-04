<template>
    <div class="grid-container">
        <div class="column">
            <label>Preferred Cuisines</label>
            <div class="dropdown-container">
                <multiselect 
                    v-model="value" 
                    :options="options"
                    :multiple="true"
                    :close-on-select="false">
                </multiselect>       
            </div>
            <label>Dietary Restrictions</label>
            <textarea 
                v-model="dietaryRestrictions"
                type="text"
                placeholder="e.g. dairy, nuts"
                rows ="5"
            />
        </div>
        <div class="column">
            <div class="ingredient-container" v-for="(ingredient, index) in ingredients">
                <div class="one-ingredient-container">
                    <label>Name of leftover #{{index + 1}}</label>
                    <input
                        v-model="ingredients[index].name"
                        type="text"
                        placeholder="e.g. Chicken"
                        required    
                    />
                </div>
                <div>
                    <label>Quantity</label>
                    <input
                        v-model="ingredients[index].quantity"
                        type="text"
                        placeholder="e.g. 100g"
                        required
                    />
                </div>
                <button type="button" class="remove-button" @click="removeIngredient(index)">
                        x
                </button>
            </div>
            <div class="button-container">
                <button
                type="submit"
                class="add-button"
                @click="addIngredient"
                >+ ADD MORE</button>
            </div>
        </div>
    </div>
    <div class="button-container">
        <button
        type="submit"
        class="generate-button"
        @click="generateRecipe">
            Generate Recipe
        </button>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import { fetchCategories } from '@/firebase.js';

export default {
    components: {
        Multiselect,
    },
    name: 'InputLeftover',
    data() {
        return {
            options: [],
            value: null,
            dietaryRestrictions: '',
            ingredients: [
                {
                    name: '',
                    quantity: ''
                },
                {
                    name: '',
                    quantity: ''
                }
            ],
        };
    },
    async mounted() {
        this.options = await fetchCategories();
    },
    methods: {
        addIngredient() {
            this.ingredients.push({
                name: '',
                quantity: '',
            });
        },
        validateIngredients() {
            return this.ingredients.every(ingredient => ingredient.name.trim() && ingredient.quantity.trim());
        },
        removeIngredient(index) {
            this.ingredients.splice(index, 1);
        },
        generateRecipe() {
            console.log('Generating recipe...');
            console.log(this.value);

            if (this.validateIngredients() === false) {
                // Show alert if any ingredient fields are empty
                alert('Please fill in all leftover names and quantities.');
            } else {
                this.$emit('generate-recipe', {
                    categories: this.value,
                    dietaryRestrictions: this.dietaryRestrictions,
                    ingredients: this.ingredients,
                })
            }
        },
    },
};
</script> 

<style scoped>
.grid-container {
    display: block;
    padding: 4rem;
    width: 100%;
    box-sizing: border-box;
}

@media (min-width: 1024px) {
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 3rem;
        padding: 4rem;
        width: 100%;
        box-sizing: border-box;
    }
}

.dropdown-container {
    margin-bottom: 20px;
}

.ingredient-container {
    display: flex;
    justify-content: space-around;
    gap: 2rem;
}

.one-ingredient-container {
    margin-bottom: 25px;
    width: 100%;
}

.button-container {
    /* width: 46vw; */
    display: flex;
    justify-content: center;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding-left: 10px;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    height: 40px;
}

textarea {
    width: 95%;
    padding: 5px 10px;
    font-family: inherit;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
}

.add-button {
    background-color: white;
    text-decoration: underline;
    border: none;
    padding: 8px 20px;
    cursor: pointer;
}

.remove-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.generate-button {
    background-color: #3C1F11;
    color: #CBDF99;
    font-weight: bold;
    font-size: large;
    border: none;
    border-radius: 15px;
    padding: 8px 20px;
    cursor: pointer;
}

.input-required {
    border: 2px solid red;
}

</style>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>