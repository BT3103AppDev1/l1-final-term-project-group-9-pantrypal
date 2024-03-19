<template>
    <img :src="url" alt="" />
</template>

<script>
import { storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";

export default {


    data() {
        return {
            url: "https://via.placeholder.com/140x100"
        }
    },
    props: {
        path: String,
    },
    mounted() {
        getDownloadURL(ref(storage, this.path)).then((url) => this.url = url)
    }
}
</script>

<style scoped>
img {
    object-fit: cover;
    width: 250px;
    height: 250px;
}
</style>