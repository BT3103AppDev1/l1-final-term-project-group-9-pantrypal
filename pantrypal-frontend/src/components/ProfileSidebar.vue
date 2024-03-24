<template>
    <aside class="sidebar">
        <div class="profile-container">
            <div class="profile-pic">
                <img src="../assets/profile.svg" alt="profile pic" class="profile" />
            </div>
            <div class="personal-details">
                <h4 class="user-name">@{{ username }}</h4>
                <h4 class="created-number">Created {{ created_count }} recipes</h4>
            </div>
            <div class="profile-options">
                <div class="header setting">
                    <h3>Settings</h3>
                </div>
                <div class="header" @click="goToLikedPage()">
                    <h3>Liked Recipes</h3>
                </div>
                <div class="header" @click="goToCookbookPage()">
                    <h3>My Cookbook</h3>
                </div>
            </div>
        </div>
    </aside>
</template>
<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default {
    name: 'Profile Sidebar',
    mounted() {
        this.fetchUserData();
    },
    data() {
        return {
            username:'',
            created_count:0
        }
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
                        this.username = userSnap.data().username;
                        this.created_count = userSnap.data().my_cookbook.length;
                    }
                } else {
                    console.log('No such user document');
                }
            });
        }
    }
};
</script>

<style scoped>
.sidebar {
    background-color: #3C1F11;
    min-width: 12rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    text-align: center;
    position: sticky;
    height: 100vh;
    top: 0;
    overflow-y: hidden;
}

.profile-container {
    padding-top: 2rem; 
    height: fit-content;
}

.profile-pic img {
    width: 120px; 
    height: 120px; 
    border-radius: 60px; 
    margin-bottom: 2rem; 
}

.personal-details {
    margin-bottom: 3rem; 
}

.header {
    cursor: pointer; 
    margin-bottom: 2rem; 
    transition: background-color 0.3s, color 0.3s; 
}

.header:hover {
    background-color: #A7BF6A; 
    border-radius: 16px; 
    color: #3C1F11;
}

h3 {
    color: white;
    margin: 0 auto;
    padding: 5px 0px;
}

.user-name {
    color: #A7BF6A
}

.created-number {
    color: white
}

.selected h3, .setting {
    background-color: #A7BF6A; 
    width: 100%;
    padding: 5px 5px;
    border-radius: 16px;
    color: #3C1F11;
}
</style>