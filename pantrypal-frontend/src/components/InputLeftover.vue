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
                class="addButton"
                @click="addIngredient"
                >Add</button>
            </div>
        </div>
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
    },
};
</script> 

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5rem;
    margin-bottom: 20px;
    padding: 5rem;
}
.dropdown-container {
    margin-bottom: 20px;
}

.ingredient-container {
    display: flex;
    gap: 2vw;
}

.one-ingredient-container {
    margin-bottom: 25px;
}

.button-container {
    width: 46vw;
    display: flex;
    justify-content: center;
}

label {
    display: block;
}

input {
    width: 20vw;
    padding: 8px 10px;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
}

textarea {
    width: 95%;
    padding: 5px 10px;
    font-family: inherit;
}
</style>