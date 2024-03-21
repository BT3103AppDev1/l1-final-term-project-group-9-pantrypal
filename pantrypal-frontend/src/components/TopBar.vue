<template>
    <div class="topBar">
        <div class="firstContainer">
            <img src="../assets/logo.jpg" alt="PantryPal Logo" class="logo" />
        </div>
        <div v-if="ifFeed" class="secondContainer">
            <button class="custom-button" @click="goToCommunityPage()">
                <p class="button-text-selected">My Feed</p>
            </button>
            <button class="custom-button" @click="goToRecipeGenerator()">
                <p class="button-text">Smart Leftovers</p>
            </button>
        </div>
        <div v-else class="secondContainer">
            <button class="custom-button" @click="goToCommunityPage()">
                <p class="button-text">My Feed</p>
            </button>
            <button class="custom-button" @click="goToRecipeGenerator()">
                <p class="button-text-selected">Smart Leftovers</p>
            </button>
        </div>
        <div class="thirdContainer">
            <button class="logOutButton" @click="logout">
                <p class="logOutButton-text">Log out</p>
            </button>
            <button type="button" class="profileButton">
                <img src="../assets/profile.svg" alt="profile pic" class="profile" />
            </button>
        </div>
    </div>
</template>

<script>
import { auth } from '../firebase.js';
import { signOut } from 'firebase/auth';

export default {
    props: {
        ifFeed: Boolean
    },
    methods: {
        goToCommunityPage() {
            console.log("test")
            this.$router.push('/community-page');
        },
        goToRecipeGenerator() {
            this.$router.push('/recipe-generator');
        },
        logout() {
            signOut(auth).then(() => {
                this.$router.push('/');
            }).catch((error) => {
                console.error("Logout Error:", error);
            });
        }
    },
};
</script>
<style>
.topBar {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 5rem;
    background-color: #fff;
    height: 80px;
}

.logo {
    height: 80px;
}

.custom-button {
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
}


.button-text {
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 800;
    color: rgb(126, 216, 108);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button-text-selected {
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 800;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: darkgreen;
}

.button-text:hover {
    color: darkgreen;
}

.firstContainer {
    flex: 0.3;
}

.secondContainer {
    flex: 0.4;
    text-align: center;
}

.thirdContainer {
    flex: 0.3;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.logOutButton {
    background-color: #60ce64;
    border: none;
    text-decoration: none;
    padding: 0;
    cursor: pointer;
    border-radius: 15px;
    width: 90px;
    height: 32px;
    margin: 0 20px;
}

.logOutButton-text {
    font-size: 16px;
    color: white;
    margin: 0;
    padding: 0;
}

.profileButton {
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    border: none;
}

.profile {
    border-radius: 50%;
    height: 50px;
}
</style>
