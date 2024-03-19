<template>
    <p>test</p>
    <p>{{ id }}</p>



</template>
<script>

export default {
    name: 'Recipe Page',

    props: {
        id: {
            type: String,
            required: true
        }
    }
}

</script>