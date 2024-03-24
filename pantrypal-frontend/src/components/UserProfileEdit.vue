<template>
    <div class="user-profile-edit">
      <form @submit.prevent="saveChanges" class="user-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" disabled class="input-field non-editable" />
        </div>
  
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" class="input-field" />
        </div>

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
  import { getAuth, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
  import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
  
  export default {
    name: 'UserProfileEdit',
    data() {
      return {
        email: '',
        username: '',
        newPassword: '',
        confirmPassword:'',
        user: null
      }
    },
    mounted() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const db = getFirestore();
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                this.user = user;
                this.email = user.email;
                this.username = userSnap.data().username; 
            }
          }
        });
      },
    async saveChanges() {
        try {
        const db = getFirestore();
        const user = getAuth().currentUser;

        if (this.newPassword) {
            if (this.newPassword !== this.confirmPassword) {
                alert("The new passwords do not match.");
                return;
            }
            await this.changePassword(this.newPassword);
        }

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                username: this.username,
            });

            alert('Profile updated successfully.');
        }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(error.message);
        }
    },
      async changePassword() {
        if (this.newPassword !== this.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        if (!this.newPassword) {
            alert("New password must not be empty.");
            return;
        }
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const currentPassword = prompt("Please enter your current password:");
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, this.newPassword);
                alert('Details updated successfully.');
                this.newPassword = '';
                this.confirmPassword = '';
            }
        } catch (error) {
            console.error("Error updating password:", error);
            alert(error.message);
            }
        }
    }
  }
  </script>
  
  <style scoped>
.user-profile-edit {
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    margin-bottom: 90px;
}

.user-form {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    grid-gap: 1rem; 
    max-width: 600px; 
    margin: auto; 
}

.user-profile-edit .form-group {
  margin-bottom: 1rem;
}

.user-profile-edit .input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
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
    grid-template-columns: 1fr; 
  }
}
</style>