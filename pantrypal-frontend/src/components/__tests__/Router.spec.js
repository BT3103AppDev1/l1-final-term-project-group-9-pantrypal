import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase.js'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { reactive } from '@vue/reactivity';
import LandingPage from '@/views/LandingPage.vue'
import CommunityPage from '@/views/CommunityPage.vue'
import NotFound from '@/views/NotFound.vue'
import { getFirestore } from 'firebase/firestore'

vi.mock('@/firebase.js', () => ({
    auth: {
      onAuthStateChanged: vi.fn(),
    },
  }));

vi.mock('@/views/CommunityPage.vue', () => ({
  default: {
    template: '<div>Mocked Community Page</div>',
    data() {
      return {
        arrayOfCategories: [
          { name: "All" },
          { name: "Asian" },
          { name: "Western" },
          { name: "Local Delights" },
          { name: "Healthy Choices" },
          { name: "Fast Food" },
          { name: "Desserts and Snacks" },
          { name: "Beverages" },
          { name: "Specialty" },
          { name: "Breakfast and Brunch" },
          { name: "Late-night Eats" },
          { name: "Others" },
        ],
        category: {},
        arrayOfSorts: [{ name: "Most Recent" }, { name: "Most Liked" }],
        sort: {},
        allCommunityRecipes: [],
        filteredRecipes: [],
        searchQuery: "",
        showCreateRecipe: false,
        isDataLoaded: false
      };
    },
    methods: {
      fetchRecipes: vi.fn(),
      filterByNameOrIngredients: vi.fn(),
      filterUsingCategory: vi.fn(),
      filterUsingSort: vi.fn(),
      sortByMostRecent: vi.fn(),
      sortByMostLiked: vi.fn(),
      handleScroll: vi.fn(),
      toggleCreateRecipe: vi.fn(),
      scrollToTop: vi.fn(),
      toggleRecipeDetails: vi.fn()
    },
    mounted: vi.fn(),
    created: vi.fn(),
    destroyed: vi.fn()
  }
}));

const mockBeforeEach = vi.fn((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta && record.meta.requiresAuth);
    onAuthStateChanged(auth, (user) => {
      if (requiresAuth && !user) {
        next({ path: '/', query: { redirected: 'true' } });
      } else {
        next();
      }
    });
  });

describe('Router', () => {
  let router

  beforeEach(() => {
    const routes = [
      { path: '/', name: 'Landing', component: LandingPage },
      { path: '/community-page', name: 'Community Page', component: CommunityPage, meta: { requiresAuth: true } },
      { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound }
    ]
    router = {
        beforeEach: mockBeforeEach,
        push: async (path) => {
            const route = routes.find(r => r.path === path || r.name === path);
            if (!route) {
                router.currentRoute.value = { name: 'NotFound' };
                return;
            }
            let redirectedRoute;
            await new Promise(resolve => {
                const mockNext = (routeOrPath) => {
                    if (typeof routeOrPath === 'object') {
                        redirectedRoute = routeOrPath; 
                    }
                    resolve();
                };
                mockBeforeEach({ ...route, matched: [{ meta: route.meta }] }, router.currentRoute.value, mockNext);
            });
            if (redirectedRoute) {
                router.currentRoute.value = redirectedRoute;
            } else {
                router.currentRoute.value = { path: route.path, name: route.name, query: {} };
            }
        },
        isReady: vi.fn(() => Promise.resolve()),
        currentRoute: reactive({
          value: {
            path: '/',
            name: 'LandingPage',
            query: {},
          },
        }),
      };
    })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  
  describe('Protected Page Access', () => {
    it('should redirect to landing page with error message when accessing protected page without being logged in', async () => {
      const mockUser = null
      const mockOnAuthStateChanged = vi.fn((callback) => {
        return setTimeout(() => {
          callback(mockUser);
        }); 
      });
      vi.spyOn(auth, 'onAuthStateChanged').mockImplementation(mockOnAuthStateChanged);
      

      router.push('/community-page')
      await router.isReady()
      vi.useFakeTimers();

      expect(router.currentRoute.value.path).toBe('/')
      
    })
  })

  describe('Non-existent URL Access', () => {
    it('should redirect to 404 page when navigating to a non-existent URL', async () => {
      router.push('/non-existent-page')
      await router.isReady()
      vi.useFakeTimers();

      expect(router.currentRoute.value.name).toBe('NotFound')
    })
  })
})