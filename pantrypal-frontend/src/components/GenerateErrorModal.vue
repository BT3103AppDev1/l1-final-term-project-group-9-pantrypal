<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal">
        <h2>Error</h2>
        <p>An error occurred while generating the recipe due to inappropriate ingredients. Please try again with edible leftovers.</p>
        <div class="buttons">
          <button type="button" @click="handleBack">Go Back</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GenerateErrorModal',
    props: {
      isVisible: Boolean,
    },
    methods: {
      handleBack() {
        this.$emit('back');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #a7bf6a;
    color: white;
    font-weight: bold;
  }
  
  button:not(:last-child) {
    margin-right: 10px;
  }
  </style>
  