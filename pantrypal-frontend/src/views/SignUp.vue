<template>
  <div class="signup-container">
    <div class="signup-image-container"></div>
    <div class="signup-form-container">
      <img src="../assets/logo.jpg" alt="PantryPal Logo" class="logo" />
      <h1>Create New Account</h1>
      <form class="signup-form" @submit.prevent="register">
        <div class="input-group">
          <label for="email">EMAIL</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div class="input-group">
          <label for="username">USERNAME</label>
          <input type="text" id="username" v-model="user.username" required />
        </div>
        <div class="input-group">
          <label for="password">PASSWORD</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
        <div class="input-group">
          <label for="confirm-password">CONFIRM PASSWORD</label>
          <input
            type="password"
            id="confirm-password"
            v-model="user.confirmPassword"
            required
          />
        </div>
        <div class="login-link">Already Registered? <a href="/login">Login</a></div>
        <button type="submit" class="btn-signup">Sign Up</button>
      </form>
      <div
        class="error-message"
        v-if="error"
        style="color: red; text-align: center; margin-top: 20px"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "SignUp",
  data() {
    return {
      user: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      error: "",
    };
  },
  methods: {
    register() {
      if (this.user.password !== this.user.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }

      createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then(() => {
          try {
            console.log(auth.currentUser.uid);
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            setDoc(userDocRef, {
              email: this.user.email,
              liked_recipes: [],
              my_cookbook: [],
              profile_img_url: "",
              user_id: auth.currentUser.uid,
              username: this.user.username,
            });
          } catch (error) {
            console.log(error);
          }

          this.$router.push("/community-page");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            this.error = "This email is already in use. Please use a different email.";
          } else {
            this.error = error.message;
          }
          console.error("Registration error:", error);
        });
    },
  },
};
</script>

<style scoped>
@import "@/styles/signup-page.css";
</style>
