<template>
    <p>{{ userData.username }}</p>
    <p>{{ userData.liked_recipes[0] }}</p>
</template>
<script>
export default {


    data() {
        return {

        };
    },
    props: {
        userData: {}
    },

}
</script>