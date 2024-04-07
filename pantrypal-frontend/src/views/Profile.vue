<template>
  <div class="settings">
    <TopBar whichPage="none" :key="refreshKey" />
    <div class="content-container">
      <UserProfileSidebar :selected="selected" @selected="changeSelected($event)" :userData="userData"
        @refreshProfilePic="refreshProfilePic" />
      <UserProfileEdit v-if="selected === 'settings' && Object.keys(userData).length !== 0" :userData="userData"
        @userData="handleUserDataUpdate" />
      <UserProfileLikedRecipes v-if="selected === 'likedRecipes'" :userData="userData" @updateLiked="fetchUserStats" />
      <UserProfileMyCookbook v-if="selected === 'myCookbook'" :userData="userData" />
      <UserProfileStats v-if="selected === 'stats'" :userData="userData" :lastStatsUpdate="lastStatsUpdate" :key="refreshKey"/>
    </div>
  </div>
</template>

<script>
import UserProfileSidebar from '../components/UserProfileSidebar.vue';
import TopBar from '../components/TopBar.vue'
import UserProfileEdit from '../components/UserProfileEdit.vue'
import UserProfileLikedRecipes from '../components/UserProfileLikedRecipes.vue'
import UserProfileMyCookbook from '../components/UserProfileMyCookbook.vue';
import UserProfileStats from '../components/UserProfileStats.vue'
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "ProfileSettings",
  components: {
    TopBar,
    UserProfileSidebar,
    UserProfileEdit,
    UserProfileLikedRecipes,
    UserProfileMyCookbook,
    UserProfileStats
  },
  data() {
    return {
      selected: "settings",
      userData: {},
      lastStatsUpdate: Date.now(),
      refreshKey:0
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    fetchUserStats() {
      this.lastStatsUpdate = Date.now();  
      this.refreshKey++;
    },
    changeSelected(x) {
      this.selected = x
    },
    async fetchUserData() {
      if (auth.currentUser) {
        const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
        this.userData = userDocSnapshot.data();
      }
    },
    handleUserDataUpdate(updatedUserData) {
      this.userData = { ...this.userData, username: updatedUserData.username };
    },
    refreshProfilePic(props) {
      this.userData = { ...this.userData, profile_img_url: props };
      this.refreshKey++;
    }
  }
}
</script>

<style scoped>
.content-container {
  display: flex;
}
</style>