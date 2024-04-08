<template>
  <img v-if="ifCard" class="topBar" :src="renderedUrl" alt="" />
  <img v-else class="topBar" :src="renderedUrl" alt="" />
</template>

<script>
export default {
  data() {
    return {
      defaultProfileUrl: null,
    };
  },
  props: {
    path: String,
    ifCard: Boolean,
  },
  async created() {
    try {
      this.defaultProfileUrl = (await import("@/assets/profile.svg")).default;
    } catch (error) {
      console.error("Error loading default profile picture:", error);
    }
  },
  computed: {
    renderedUrl() {
      console.log(this.path);
      return this.path && this.path.trim() !== "" ? this.path : this.defaultProfileUrl;
    },
  },
};
</script>

<style scoped>
.topBar {
  cursor: pointer;
  padding: 0;
  background-color: white;
  border: none;
  border-radius: 50%;
  height: 60px;
  width: 60px;
}
</style>
