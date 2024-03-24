<template>
    <div id="app">
      <div class="top-bar">
        <img src="../assets/logo.jpg" alt="PantryPal Logo" class="logo">
        <transition name="fade">
          <div v-if="showPopup" class="popup-notification">
              You need to be logged in to access that page.
          </div>
        </transition>
        <div class="menu">
          <button class="btn-login" @click="goToLogin">Login</button>
          <button class="btn-signup" @click="goToSignUp">Sign Up</button>
        </div>
      </div>
      <div class="separator"></div>
      <div class="gallery-container">
        <header>
            <h1>Transform leftovers into culinary treasures!</h1>
        </header>
        <section class="gallery">
            <div>
                <img class="gallery-item" src= "../assets/landingfood.png" alt="food">
            </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
    data() {
      return {
        showPopup: false,
      };
    },
    methods: {
        goToSignUp() {
        this.$router.push('/signup');
        },
        goToLogin() {
        this.$router.push('/login');
        },
    },
    created() {
      if (this.$route.query.redirected) {
        this.showPopup = true;
        setTimeout(() => this.showPopup = false, 4000);
      }
    }
};
  </script>
  
  <style scoped>
  @import "@/styles/landing-page.css";
  </style>
  