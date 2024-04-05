<template>
  <div class="topBar">
    <button class="firstContainer" @click="goToCommunityPage()">
      <img src="../assets/logo.jpg" alt="PantryPal Logo" class="logo" />
    </button>
    <div v-if="ifFeed" class="secondContainer">
      <button class="custom-button" @click="goToCommunityPage()">
        <p class="button-text-selected">My Feed</p>
      </button>
      <button class="custom-button" @click="goToRecipeGenerator()">
        <p class="button-text">Smart Leftovers</p>
      </button>
    </div>
    <div v-else class="secondContainer">
      <button class="custom-button" @click="goToCommunityPage()">
        <p class="button-text">My Feed</p>
      </button>
      <button class="custom-button" @click="goToRecipeGenerator()">
        <p class="button-text-selected">Smart Leftovers</p>
      </button>
    </div>
    <div class="thirdContainer">
      <button class="logOutButton" @click="logout">
        <p class="logOutButton-text">Log out</p>
      </button>
      <button type="button" class="profileButton" @click="goToProfile()">
        <ProfileImage :path="userData.profile_img_url" :ifCard="true" alt="profile pic" class="profile"
          @click="goToProfile()" />
      </button>
    </div>
  </div>
  <hr />
</template>

<script>
import { db, auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import ProfileImage from "./ProfileImage.vue";

export default {
  props: {
    ifFeed: Boolean,
  },
  components: {
    ProfileImage,
  },
  data() {
    return {
      userData: {},
    };
  },
  mounted() {
    let localUserData = localStorage.getItem("userData");
    if (localUserData) {
      this.userData = JSON.parse(localUserData);
    } else {
      this.fetchUserData();
    }
  },
  methods: {
    goToCommunityPage() {
      console.log("test");
      this.$router.push("/community-page");
    },
    goToRecipeGenerator() {
      this.$router.push("/recipe-generator");
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    logout() {
      signOut(auth)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Logout Error:", error);
        });
    },
    async fetchUserData() {
      if (auth.currentUser) {
        const userDocSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
        this.userData = userDocSnapshot.data();
        localStorage.setItem("userData", JSON.stringify(this.userData));
      }
    },
  },
};
</script>
<style>
.topBar {

  margin: 15px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 5rem;
  background-color: #fff;
  height: 60px;
}

.logo {
  height: 90px;
}

.custom-button {
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.button-text {
  padding: 0px 20px;
  font-size: 20px;
  font-weight: 800;
  color: rgb(126, 216, 108);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px 0px;
}

.button-text-selected {
  padding: 0px 20px;
  font-size: 20px;
  font-weight: 800;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: darkgreen;
  margin: 5px 0px;
}

.button-text:hover {
  color: darkgreen;
}

.firstContainer {
  flex: 0.3;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  text-align: left;
}

.secondContainer {
  flex: 0.4;
  text-align: center;
}

.thirdContainer {
  flex: 0.3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.logOutButton {
  background-color: #a7bf6a;
  border: none;
  text-decoration: none;
  padding: 0;
  cursor: pointer;
  border-radius: 10px;
  width: 90px;
  height: 32px;
  margin: 0 20px;
}

.logOutButton-text {
  font-size: 16px;
  color: white;
  margin: 0;
  padding: 0;
}

.profileButton {
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: none;
}

.profile {
  border-radius: 50%;
  height: 60px;
  width: 60px;
  border: none;
}

hr {
  margin: 0;
  border: 0;
  border-top: 1.4px solid #dddddd;
}
</style>
