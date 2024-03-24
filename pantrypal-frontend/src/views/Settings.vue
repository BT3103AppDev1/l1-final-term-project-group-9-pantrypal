<template>
    <div class="settings">
        <TopBar/>
        <div class="content-container">
            <ProfileSidebar/>
            <UserProfileEdit/>
        </div>
    </div>
</template>

<script>
import ProfileSidebar from '../components/ProfileSidebar.vue';
import TopBar from '../components/TopBar.vue'
import UserProfileEdit from '../components/UserProfileEdit.vue'

export default {
  name: "Settings",
  components: {
    TopBar,
    ProfileSidebar,
    UserProfileEdit
  }
}
</script>

<style scoped>
.content-container {
    display: flex;
}
</style>