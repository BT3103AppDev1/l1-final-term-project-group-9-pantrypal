<template>
    <div class="recipe-card">
        <div class="recipe-image">
        </div>
        <div class="recipe-details">
            <div class="recipe-name-container">

            </div>
            <div class="info">

            </div>
            <div class="bottomRow">

            </div>
        </div>
    </div>
</template>

<script>

import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
    components: {

    },


};
</script>

<style scoped>
.recipe-card {
    /* width: 300px; */
    height: 350px;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin: 20px;
    overflow: hidden;
    filter: blur(4px);
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
    flex: 0.8
}

.like {
    align-items: center;
    border: none;
    cursor: pointer;
    background-color: #cbdf99;
    flex: 0.1
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