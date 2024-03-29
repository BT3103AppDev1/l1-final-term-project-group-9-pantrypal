<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal">
        <h2>Confirm Current Password</h2>
        <form @submit.prevent="confirmPassword">
          <input type="password" v-model="currentPassword" placeholder="Enter current password" class="input-field" />
          <div class="buttons">
            <button type="submit">Confirm</button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PasswordConfirmationModal',
    props: {
      isVisible: Boolean,
    },
    data() {
      return {
        currentPassword: '',
      };
    },
    watch: {
        isVisible(newVal) {
        if (!newVal) {
            this.currentPassword = '';
        }
        }
    },
    methods: {
      closeModal() {
        this.$emit('update:isVisible', false);
      },
      confirmPassword() {
        this.$emit('confirm', this.currentPassword);
        this.closeModal();
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
    justify-content: space-between;
    margin-top: 10px;
  }
  
  button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 16px;
}
  </style>
  