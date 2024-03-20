import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import SignUp from '@/views/SignUp.vue'
import Login from '@/views/Login.vue'
import RecipeGenerator from '@/views/RecipeGenerator.vue'
import CommunityPage from '@/views/CommunityPage.vue'


const routes = [
    {
        path: '/',
        name: 'Landing',
        component: LandingPage
    },
    {
        path: '/signup',
        name: 'Sign Up',
        component: SignUp
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/recipe-generator',
        name: 'Recipe Generator',
        component: RecipeGenerator
    },
    {
        path: '/community-page',
        name: 'Community Page',
        component: CommunityPage
    },

    
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router