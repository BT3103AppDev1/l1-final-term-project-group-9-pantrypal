<template>
  <div class="settings">
    <TopBar />
    <div class="content-container">
      <UserProfileSidebar :selected="selected" @selected="changeSelected($event)" :userData="userData" />
      <UserProfileEdit v-if="selected === 'settings' && Object.keys(userData).length !== 0" :userData="userData"
        @userData="handleUserDataUpdate" />
      <UserProfileLikedRecipes v-if="selected === 'likedRecipes'" :userData="userData" />
      <UserProfileMyCookbook v-if="selected === 'myCookbook'" :userData="userData" />
    </div>


  </div>
</template>

<script>
import UserProfileSidebar from '../components/UserProfileSidebar.vue';
import TopBar from '../components/TopBar.vue'
import UserProfileEdit from '../components/UserProfileEdit.vue'
import UserProfileLikedRecipes from '../components/UserProfileLikedRecipes.vue'
import UserProfileMyCookbook from '../components/UserProfileMyCookbook.vue';
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "ProfileSettings",
  components: {
    TopBar,
    UserProfileSidebar,
    UserProfileEdit,
    UserProfileLikedRecipes,
    UserProfileMyCookbook
  },
  data() {
    return {
      selected: "settings",
      userData: {}
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.content-container {
  display: flex;
}
</style>