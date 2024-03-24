<template>
    <div id="app">
      <div class="top-bar">
        <img src="../assets/logo.jpg" alt="PantryPal Logo" class="logo">
      </div>
      <div class="separator"></div>
      <div class="gallery-container">
        <header>
            <h1>404 Error: Page Not Found</h1>
        </header>
        <div>
            <p>The above link does not exist, click below to go back to landing page.</p>
            <button class="btn-login" @click="goToLanding">Landing Page</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundPage',
    methods: {
        goToLanding() {
        this.$router.push('/');
        },
    }
};
  </script>
  
  <style scoped>
  @import "@/styles/landing-page.css";
  </style>
  