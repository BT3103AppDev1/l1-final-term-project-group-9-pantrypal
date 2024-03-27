<template>
    <aside class="sidebar">
        <div class="profile-container">
            <div class="profile-pic">
                <img src="../assets/profile.svg" alt="profile pic" class="profile" />
            </div>
            <div class="personal-details">
                <h4 class="user-name">@{{ userData.username }}</h4>
                <h4 class="created-number">Created {{ userData.my_cookbook?.length || 0 }} recipes</h4>
            </div>
            <div class="profile-options">
                <div class="header " :class="{ 'selected': selected === 'settings' }" @click="selectedSettings()">
                    <h3>Settings</h3>
                </div>
                <div class="header" :class="{ 'selected': selected === 'likedRecipes' }"
                    @click="selectedLikedRecipes()">
                    <h3>Liked Recipes</h3>
                </div>
                <div class="header" :class="{ 'selected': selected === 'myCookbook' }" @click="selectedMyCookbook()">
                    <h3>My Cookbook</h3>
                </div>
            </div>
        </div>
    </aside>
</template>
<script>


export default {
    name: 'Profile Sidebar',

    data() {
        return {
        }
    },
    props: {
        // string: settings, likedRecipes, myCookbook
        selected: "",
        userData: {}
    },

    emits: ["selected"],
    methods: {
        selectedSettings() {
            this.$emit('selected', "settings")
        },
        selectedLikedRecipes() {
            this.$emit('selected', "likedRecipes")
        },
        selectedMyCookbook() {
            this.$emit('selected', "myCookbook")
        }
    },

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


.selected {
    background-color: #A7BF6A;
    width: 100%;
    padding: 5px 5px;
    border-radius: 16px;
    color: #3C1F11;
}
</style>