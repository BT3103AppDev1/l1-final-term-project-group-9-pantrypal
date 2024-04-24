<template>
  <aside class="sidebar">
    <div class="profile-container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div class="profile-pic">
        <ProfileImage
          :path="profilePicUrl || userData.profile_img_url"
          alt="profile pic"
          class="profile"
        />
        <input type="file" @change="onFileSelected" hidden ref="fileInput" />
        <div v-if="selected === 'settings'">
          <button @click="triggerFileInput">
            <img class="plus-icon" src="../assets/profile-plus-icon.png" height="10px" />
          </button>
        </div>
      </div>
      <div class="personal-details">
        <h4 class="user-name">@{{ userData.username }}</h4>
        <h4 class="created-number">
          Created {{ userData.my_cookbook?.length || 0 }} recipes
        </h4>
      </div>
      <div class="profile-options">
        <div
          class="header"
          :class="{ selected: selected === 'settings' }"
          @click="selectedSettings()"
        >
          <h3>Settings</h3>
        </div>
        <div
          class="header"
          :class="{ selected: selected === 'likedRecipes' }"
          @click="selectedLikedRecipes()"
        >
          <h3>Liked Recipes</h3>
        </div>
        <div
          class="header"
          :class="{ selected: selected === 'myCookbook' }"
          @click="selectedMyCookbook()"
        >
          <h3>My Cookbook</h3>
        </div>
        <div
          class="header"
          :class="{ selected: selected === 'stats' }"
          @click="selectedStats()"
        >
          <h3>User Stats</h3>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { db, storage, auth } from "../firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import ProfileImage from "./ProfileImage.vue";

export default {
  name: "Profile Sidebar",

  data() {
    return {
      profilePicUrl: "",
    };
  },
  props: {
    selected: "",
    userData: {},
  },
  components: {
    ProfileImage,
  },
  emits: ["selected"],
  watch: {
    profilePicUrl(newVal) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...this.userData, profile_img_url: newVal })
      );
    },
  },
  methods: {
    selectedSettings() {
      this.$emit("selected", "settings");
    },
    selectedLikedRecipes() {
      this.$emit("selected", "likedRecipes");
    },
    selectedMyCookbook() {
      this.$emit("selected", "myCookbook");
    },
    selectedStats() {
      this.$emit("selected", "stats");
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    onFileSelected(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      this.uploadImageToFirebase(file);
    },

    async uploadImageToFirebase(file) {
      const storageRef = ref(storage, `profileImg/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error("Upload failed", error);
        },
        () => {
          console.log("HI");
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              this.profilePicUrl = downloadURL;
              this.$emit("refreshProfilePic", downloadURL);
              this.updateUserProfilePic(downloadURL);
            })
            .catch((error) => {
              console.error("Failed to get download URL", error);
            });
        }
      );
    },

    async updateUserProfilePic(url) {
      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        profile_img_url: url,
      });
      return;
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #3c1f11;
  min-width: 12rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  text-align: center;
  position: sticky;
  height: 95.9vh;
  top: 0;
  overflow-y: hidden;
}

.profile-container {
  padding-top: 2rem;
  height: fit-content;
}

.profile-pic {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
}

.profile-pic img {
  width: 120px;
  height: 120px;
}

.user-name {
  color: #a7bf6a;
}

.created-number {
  color: white;
}

.personal-details {
  margin-bottom: 3rem;
}

.header {
  cursor: pointer;
  padding: 8px 0px;
  margin: 2rem 0px;
  color: white;
}

h3 {
  color: white;
  margin: 0 auto;
}

.selected {
  background-color: #a7bf6a;
  width: 100%;
  border-radius: 16px;
  color: #3c1f11;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 30px;
  padding: 0;
  position: relative;
  top: -40px;
  left: 40px;
}

.profile-pic button .plus-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
}
</style>
