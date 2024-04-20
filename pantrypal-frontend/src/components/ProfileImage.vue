<template>
  <img class="" :src="renderedUrl" alt="" />
</template>

<script>
export default {
  data() {
    return {
      defaultProfileUrl: "@/assets/profile.svg",
      profileKey: 0,
    };
  },
  props: {
    path: String,
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
  watch: {
    path(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.profileKey++;
      }
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
