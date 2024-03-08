<template>
    <div class="signup-container">
      <div class="signup-form-container">
        <h1>Create New Account</h1>
        <form class="signup-form" @submit.prevent="register">
          <div class="input-group">
            <label for="email">EMAIL</label>
            <input type="email" id="email" v-model="user.email" required>
          </div>
          <div class="input-group">
            <label for="username">USERNAME</label>
            <input type="text" id="username" v-model="user.username" required>
          </div>
          <div class="input-group">
            <label for="password">PASSWORD</label>
            <input type="password" id="password" v-model="user.password" required>
          </div>
          <div class="input-group">
            <label for="confirm-password">CONFIRM PASSWORD</label>
            <input type="password" id="confirm-password" v-model="user.confirmPassword" required>
          </div>
          <div class="login-link">
            Already Registered? <a href="/login">Login</a>
          </div>
          <button type="submit" class="btn-signup">sign up</button>
        </form>
      </div>
      <div class="signup-image-container">
        <!-- The background image will be set via CSS -->
      </div>
    </div>
  </template>

<script>
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  name: 'SignUp',
  data() {
    return {
      user: {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      },
      error: '',
    };
  },
  methods: {
    register() {
      if (this.user.password !== this.user.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }

      createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then(response => {
          console.log('User created:', response.user);
          alert('User created:', response.user);
        })
        .catch(error => {
          this.error = error.message;
          console.error('Registration error:', error);
        });
    },
  },
};
</script>

<style scoped>
@import "@/styles/signup-page.css";
</style>
