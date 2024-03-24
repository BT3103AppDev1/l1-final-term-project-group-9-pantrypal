<template>
    <div class="settings">
        <TopBar/>
        <div class="content-container">
            <ProfileSidebar/>
        </div>
    </div>
</template>

<script>
import ProfileSidebar from '../components/ProfileSidebar.vue';
import TopBar from '../components/TopBar.vue'

export default {
  name: "Settings",
  components: {
    TopBar,
    ProfileSidebar
  }
}
</script>

<style scoped>
.content-container {
    display: flex;
}
</style>