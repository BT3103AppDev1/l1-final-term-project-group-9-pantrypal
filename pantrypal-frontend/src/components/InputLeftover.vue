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
        <div class="column2">
            <div class="ingredient-container" v-for="(ingredient, index) in ingredients">
                <div class="one-ingredient-container">
                    <label>Name of leftover #{{index + 1}}</label>
                    <input
                        v-model="ingredients[index].name"
                        type="text"
                        placeholder="e.g. Apple"/></div>
                <div>
                <label>Quantity</label>
                <input
                    v-model="ingredients[index].quantity"
                    type="text"
                    placeholder="e.g. 10g"/></div>
                </div>
                <div class="button-container">
                    <button
                    type="submit"
                    class="add-button"
                    @click="addIngredient"
                    >+ Add more</button>
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

export default {
    components: {
        Multiselect,
    },
    name: 'InputLeftover',
    data() {
        return {
            options: ['Chinese', 'Western'],
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
    methods: {
        addIngredient() {
            this.ingredients.push({
                name: '',
                quantity: '',
            });
        },
        generateRecipe() {
            console.log('Generating recipe...');
            console.log(this.value);
            this.$emit('generate-recipe', {
                categories: this.value,
                dietaryRestrictions: this.dietaryRestrictions,
                ingredients: this.ingredients,
            })
        },
    },
};
</script> 

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
    padding: 4rem;
    width: 100%;
    box-sizing: border-box;
}
.dropdown-container {
    margin-bottom: 20px;
}

.ingredient-container {
    display: flex;
    justify-content: space-around;
    gap: 4rem;
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

</style>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>