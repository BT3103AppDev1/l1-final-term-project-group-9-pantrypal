<template>
<div class="generate-container">
    <h1>We are cooking up your recipe!</h1>
    <h1>Give us a few seconds...</h1>
    <div v-for="(ingredient, index) in ingredients">
        <div class="ingredient-container">
            <span>
                {{ingredients[index].name}}
            </span>
            <span>
                {{ingredients[index].quantity}}
            </span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Generator Loading',
    props: {
        ingredients: [],
    },
};
</script>

<style scoped>
    h1 {
        margin: 0;
    }

    .generate-container {
        padding: 3rem 0rem;
        text-align: center;
        width: 600px;
    }

    .ingredient-container {
        display: flex;
        justify-content: space-between;
        margin: 1rem;
    }

    .ingredient-container {
        background-color: #ECECEC;
        padding: 1rem 2rem;
        border-radius: 10px;
    }
</style>