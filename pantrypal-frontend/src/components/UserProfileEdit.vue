<template>
  <div class="user-profile-edit">
    <PasswordConfirmationModal :isVisible="showPasswordModal" @update:isVisible="showPasswordModal = $event" @confirm="handlePasswordConfirm" />
    <h2>Edit User Details</h2>
    <form @submit.prevent="saveChangesDetails" class="user-form">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" v-model="email" disabled class="input-field non-editable" />
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" class="input-field" />
      </div>

      <div class="save-changes-btn-container">
        <button type="submit" class="save-changes-btn">Save Changes</button>
      </div>
    </form>
    <h2>Change Password</h2>
    <form @submit.prevent="saveChangesPassword" class="user-form">
      <div class="form-group">
        <label for="newPassword">New Password</label>
        <input type="password" id="newPassword" v-model="newPassword" class="input-field" />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm New Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="input-field" />
      </div>
      <div class="save-changes-btn-container">
        <button type="submit" class="save-changes-btn">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from "../firebase";
import PasswordConfirmationModal from './PasswordConfirmationModal.vue';
import { useToast } from 'vue-toastification';
import "vue-toastification/dist/index.css";

export default {
  name: 'UserProfileEdit',
  props: {
    userData: { type: Object, required: true }
  },
  components: {
    PasswordConfirmationModal,
  },
  data() {
    return {
      email: '',
      username: '',
      newPassword: '',
      confirmPassword: '',
      user: null,
      showPasswordModal: false,
      passwordUpdateComplete: true,
    }
  },
  setup() {
        const toast = useToast();
        return { toast };
  },
  created() {
    this.email = this.userData.email;
    this.username = this.userData.username;
  },
  methods: {
    async saveChangesDetails() {
      try {
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            username: this.username,
          });
          this.triggerToastUserComplete();
          this.$emit('userData', { ...this.userData, username: this.username })

        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert(error.message);
      }
    },
    async saveChangesPassword() {
      try {
        const user = auth.currentUser;
        if (this.newPassword) {
          await this.changePassword(this.newPassword);
        }

        if (this.newPassword && !this.passwordUpdateComplete) {
            this.triggerToastPasswordComplete();
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                username: this.username,
            });
            return;
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert(error.message);
      }
    },
    async changePassword() {
        if (this.newPassword !== this.confirmPassword) {
            this.triggerToastPasswordNoMatch();
            return;
        }
        if (!this.newPassword || !this.confirmPassword) {
            this.triggerToastPasswordTooShort();
            return;
        }
        this.showPasswordModal = true;
        this.passwordUpdateComplete = false;
    },
    async handlePasswordConfirm(currentPassword) {
        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, this.newPassword);
            this.passwordUpdateComplete = true;
            this.triggerToastPasswordSuccess();
            this.newPassword = '';
            this.confirmPassword = '';
        } catch (error) {
            console.error("Error updating password:", error);
            this.triggerToastPasswordFailed()
            this.passwordUpdateComplete = true;
        }
    },
    triggerToastUserComplete() {
        this.toast("Profile updated successfully.", {
            timeout: 2000,
            position: 'top-center',
            hideProgressBar: true,
        });
    },
    triggerToastPasswordNoMatch() {
        this.toast.error("Passwords do not match.", {
            timeout: 2000,
            position: 'top-center',
            hideProgressBar: true,
        });
    },
    triggerToastPasswordTooShort() {
        this.toast.error("Password fields cannot be empty", {
            timeout: 2000,
            position: 'top-center',
            hideProgressBar: true,
        });
    },
    triggerToastPasswordComplete() {
        this.toast("Please complete the password update process first.", {
            timeout: 2000,
            position: 'top-center',
            hideProgressBar: true,
        });
    },
    triggerToastPasswordSuccess() {
        this.toast("Password updated successfully.", {
            timeout: 2000,
            position: 'top-center',
            hideProgressBar: true,
        });
    },
    triggerToastPasswordFailed() {
        this.toast.error("Invalid Credentials", {
            timeout: 2000,
            position: 'top-center',
            hideProgressBar: true,
        });
    },
  }
}
</script>

<style scoped>
.user-profile-edit {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  width: 100%;
  margin-bottom: 90px;
  padding-top: 110px;
}

.user-form {
  display: flex; 
  flex-wrap: wrap; 
  justify-content: center; 
  max-width: 600px;
  margin: 10px auto;
  padding-bottom: 30px;
}

.user-profile-edit .form-group {
  margin-bottom: 1rem;
  flex: 0 0 48%; 
  display: flex; 
  flex-direction: column; 
  margin-right: 10px;
}

.user-profile-edit .input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 0.5rem;
  font-size: 16px;
}

.user-profile-edit .non-editable {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.user-profile-edit .save-changes-btn {
  background-color: #A7BF6A;
  color: #3C1F11;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-profile-edit .save-changes-btn:hover {
  background-color: #8ea355;
}

.save-changes-btn-container {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .user-profile-edit {
    flex-direction: column;
  }
}
</style>