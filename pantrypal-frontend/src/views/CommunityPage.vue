<template>

    <TopBar />
    <div class="filterBar">
        <div class="search-bar">
            <input type="text" class="search-input" placeholder="Search name or ingredients...">
            <button type="button" class="search-button">
                <img src="../assets/search-icon.svg" alt="Search Icon">
            </button>
        </div>
        <div class="category-bar-text">
            <p>Category: </p>
        </div>
        <div class="category-bar-dropdown">

            <div class="dropdown-container">
                <dropdown class="my-dropdown-toggle" :options="arrayOfCategories" :selected="category"
                    :placeholder="'All'" :closeOnOutsideClick="true">
                </dropdown>

            </div>

        </div>
        <div class="sortby-bar-text">
            <p>Sort By: </p>
        </div>
        <div class="category-bar-dropdown">
            <div class="dropdown-container">

                <dropdown class="my-dropdown-toggle" :options="arrayOfSorts" :selected="sort"
                    :placeholder="'Most Recent'" :closeOnOutsideClick="true">
                </dropdown>

            </div>

        </div>
    </div>
    <div>
        <button type="button" @click="goToRecipePage">recipe card</button>
    </div>


</template>

<script>
import TopBar from '@/components/TopBar.vue';
import dropdown from 'vue-dropdowns';


export default {
    components: {
        TopBar,
        dropdown

    },
    data() {
        return {
            arrayOfCategories: [{ name: 'All' }, { name: 'chinese' }, { name: 'western' },],
            category: {
            },
            arrayOfSorts: [{ name: 'Most Recent' }, { name: 'Most Liked' }],
            sort: {
            },

        }
    },
    methods: {
        goToRecipePage() {
            this.$router.push({
                name: "Recipe Page", props: { id: 'testing' }
            }
            )
        }
    }
}

</script>

<style>
.filterBar {
    display: flex;
    padding: 0 4rem;
    margin: 2rem 0;
}

.search-bar {
    display: flex;
    flex: 0.5;
    align-items: center;
    width: 100%;
    background-color: #f5f5f5;
    height: 40px;
    border-radius: 30px;
    padding: 0 10px;
}

.search-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 16px;
    background-color: inherit
}

.search-button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
}

.search-button img {
    width: 20px;
    height: 20px;
}

.category-bar-text {
    display: flex;
    flex: 0.125;
    height: 40px;
    justify-content: flex-end;
    align-items: center;
}

.sortby-bar-text {
    display: flex;
    flex: 0.1;
    height: 40px;
    justify-content: flex-end;
    align-items: center;
}

.category-bar-dropdown {
    display: flex;
    flex: 0.125;
    height: 40px;
    justify-content: flex-start;
    align-items: center;
}

.my-dropdown-toggle {
    border-radius: 20px;
}

.my-dropdown-toggle .dropdown-toggle {
    border-color: black;
    font-weight: 800;
    border-radius: 50px;
    text-align: center;
    min-width: 120px;
    border: 10;
    border-width: 10px;
}

.my-dropdown-toggle .dropdown-toggle-placeholder {
    color: #c4c4c4;

}

.dropdown-menu {
    width: 150px;
    text-align: center;

}
</style>