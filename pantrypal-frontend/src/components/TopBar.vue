<template>
  <div class="topBar" :class="{ 'topBar--hidden': !showNavbar }">
    <button class="firstContainer" @click="goToCommunityPage()">
      <img src="../assets/logo.jpg" alt="PantryPal Logo" class="logo" />
    </button>
    <div v-if="whichPage === 'feed'" class="secondContainer">
      <button class="custom-button" @click="goToCommunityPage()">
        <p class="button-text-selected">My Feed</p>
      </button>
      <button class="custom-button" @click="goToRecipeGenerator()">
        <p class="button-text">Smart Leftovers</p>
      </button>
    </div>
    <div v-else-if="whichPage === 'generator'" class="secondContainer">
      <button class="custom-button" @click="goToCommunityPage()">
        <p class="button-text">My Feed</p>
      </button>
      <button class="custom-button" @click="goToRecipeGenerator()">
        <p class="button-text-selected">Smart Leftovers</p>
      </button>
    </div>
    <div v-else class="secondContainer">
      <button class="custom-button" @click="goToCommunityPage()">
        <p class="button-text">My Feed</p>
      </button>
      <button class="custom-button" @click="goToRecipeGenerator()">
        <p class="button-text">Smart Leftovers</p>
      </button>
    </div>
    <div class="thirdContainer">
      <button class="logOutButton" @click="logout">
        <p class="logOutButton-text">Log Out</p>
      </button>
      <button type="button" class="profileButton" @click="goToProfile()">
        <ProfileImage
          :path="profilePicUrl || userData.profile_img_url"
          alt="profile pic"
          class="profile"
          @click="goToProfile()"
        />
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
import { db, auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import ProfileImage from "./ProfileImage.vue";

export default {
  props: {
    whichPage: {
      type: String,
      required: true,
    },
  },
  components: {
    ProfileImage,
  },
  data() {
    return {
      userData: {},
      showNavbar: true,
      lastScrollPosition: 0,
    };
  },
  mounted() {
    let localUserData = localStorage.getItem("userData");
    console.log(localUserData);
    if (localUserData && localUserData !== "" && localUserData !== "undefined") {
      this.userData = JSON.parse(localUserData);
    } else {
      this.fetchUserData();
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    goToCommunityPage() {
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
          localStorage.clear();
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
    handleScroll() {
      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 20) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },
};
</script>
<style>
.topBar {
  /* margin: 15px 0px; */
  padding: 0 5rem;
  background-color: #fff;
  height: 90px;
  transition: top 0.3s;
  z-index: 1000;
  position: fixed;
  width: 90%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0px;
  transition: top 0.2s ease-in-out;
}

.topBar--hidden {
  top: -90px;
}

.logo {
  height: 90px;
}

.custom-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0px 20px;
  font-size: 20px;
  font-weight: 800;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0px;
}

.button-text {
  color: rgb(126, 216, 108);
  margin: 0;
}

.button-text-selected {
  color: darkgreen;
  margin: 0;
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
  /* width: 20%; */
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
  /* margin-bottom: 75px; */
  /* margin-right: 150px; */
}

.profile {
  margin: 0;
  padding: 0;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  border: none;
}

hr {
  margin: 0;
  border: 0;
  border-top: 1.4px solid black;
  /* #dddddd; */
}
</style>
