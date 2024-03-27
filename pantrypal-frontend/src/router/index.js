import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

import LandingPage from '@/views/LandingPage.vue'
import SignUp from '@/views/SignUp.vue'
import Login from '@/views/Login.vue'
import RecipeGenerator from '@/views/RecipeGenerator.vue'
import CommunityPage from '@/views/CommunityPage.vue'
import NotFound from '@/views/NotFound.vue';
import Profile from '@/views/Profile.vue';



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
        component: RecipeGenerator,
        meta: { requiresAuth: true}
    },
    {
        path: '/community-page',
        name: 'Community Page',
        component: CommunityPage,
        meta: { requiresAuth: true}
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true}
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (requiresAuth && !user) {
            next({ path: '/', query: { redirected:'true' } });
        } else {
            next();
        }
    });
});

export default router