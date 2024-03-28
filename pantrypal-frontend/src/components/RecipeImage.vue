<template>
  <img v-if="ifCard" class="card" :src="url" alt="" />
  <img v-else class="window" :src="url" alt="" />
</template>

<script>
import { storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";

export default {
  data() {
    return {
      url: "https://via.placeholder.com/140x100",
    };
  },
  props: {
    path: String,
    ifCard: Boolean,
  },
  created() {
    try {
      getDownloadURL(ref(storage, this.path)).then((url) => (this.url = url));
    } catch {
      this.url = this.path;
    }
  },
};
</script>

<style scoped>
.card {
  object-fit: cover;
  width: 250px;
  height: 250px;
}

.window {
  object-fit: cover;
  width: 300px;
  height: 300px;
  border-radius: 20px;
}
</style>
