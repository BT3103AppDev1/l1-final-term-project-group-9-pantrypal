<template>
  <aside class="sidebar">
    <div class="profile-container">
      <div class="profile-pic">
        <ProfileImage
          :path="userData.profile_img_url"
          :ifCard="true"
          alt="profile pic"
          class="profile"
        />
        <input type="file" @change="onFileSelected" hidden ref="fileInput" />
        <button @click="triggerFileInput">Change Picture</button>
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
    // string: settings, likedRecipes, myCookbook
    selected: "",
    userData: {},
  },
  components: {
    ProfileImage,
  },
  emits: ["selected"],
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
          // Handle unsuccessful uploads
          console.error("Upload failed", error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              this.profilePicUrl = downloadURL;
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
  height: 100vh;
  top: 0;
  overflow-y: hidden;
}

.profile-container {
  padding-top: 2rem;
  height: fit-content;
}

.profile-pic img {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 2rem;
}

.personal-details {
  margin-bottom: 3rem;
}

.header {
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background-color 0.3s, color 0.3s;
}

.header:hover {
  background-color: #a7bf6a;
  border-radius: 16px;
  color: #3c1f11;
}

h3 {
  color: white;
  margin: 0 auto;
  padding: 5px 0px;
}

.user-name {
  color: #a7bf6a;
}

.created-number {
  color: white;
}

.selected {
  background-color: #a7bf6a;
  width: 100%;
  padding: 5px 5px;
  border-radius: 16px;
  color: #3c1f11;
}
</style>
