<template>
  <div class="login-container">
    <div class="login-form-container">
      <img src="../assets/logo.jpg" alt="PantryPal Logo" class="logo">
      <h1>Welcome Back</h1>
      <form class="login-form" @submit.prevent="login">
        <div class="input-group">
          <label for="email">EMAIL</label>
          <input type="email" id="email" v-model="user.email" required>
        </div>
        <div class="input-group">
          <label for="password">PASSWORD</label>
          <input type="password" id="password" v-model="user.password" required>
        </div>
        <div class="register-link">
          New Here? <a href="/signup">Register</a>
        </div>
        <button type="submit" class="btn-login">Log In</button>
      </form>
      <div class="error-message" v-if="error" style="color: red;">{{ error }}</div>
    </div>
    <div class="login-image-container">
    </div>
  </div>
</template>

<script>
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then(() => {
          this.$router.push('/community-page');
        })
        .catch(error => {
          this.error = 'Invalid login credentials. Please try again.';
          console.error('Login error:', error);
        });
    },
  },
};
</script>

<style scoped>
@import "@/styles/login-page.css";
</style>