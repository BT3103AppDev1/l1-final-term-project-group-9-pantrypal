<template>
    <div id="app">
      <div class="top-bar">
        <img src="../assets/logo.jpg" alt="PantryPal Logo" class="logo">
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
    methods: {
        goToSignUp() {
        this.$router.push('/signup');
        },
        goToLogin() {
        this.$router.push('/login');
        },
    }
};
  </script>
  
  <style scoped>
  @import "@/styles/landing-page.css";
  </style>
  