import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import UserProfileMyCookbook from '@/components/UserProfileMyCookbook.vue';
import flushPromises from 'flush-promises';

describe('UserProfileMyCookbook Component', () => {
    let wrapper;
    let toast;
    let firestore;
  
    beforeEach(() => {
      toast = {
        success: vi.fn(),
        error: vi.fn(),
      };
      firestore = {
        collection: vi.fn().mockReturnValue({
          doc: vi.fn(() => ({
            onSnapshot: vi.fn(),
          })),
        }),
      };
  
      wrapper = mount(UserProfileMyCookbook, {
        props: {
          userData: {
            uid: '123',
          },
        },
        mocks: {
          $toast: toast,
          db: firestore,
        },
        global: {
          stubs: ['RecipeCard', 'dropdown', 'RecipeImage', 'RecipeCardPlaceholder'],
        },
      });
    });
  
    it('renders the component and fetches my cookbook', async () => {
        const userDocRef = firestore.collection('users').doc('123');
        vi.mocked(userDocRef.onSnapshot).mockImplementation((callback) => {
          callback({ data: () => ({ liked_recipes: likedRecipes }) });
        });
      
        await flushPromises();
      
        expect(wrapper.find('.myCookbook-page').exists()).toBe(true);
        expect(firestore.collection).toHaveBeenCalledWith('users'); 
        expect(firestore.collection('users').doc).toHaveBeenCalledWith('123');
      });  

      it('renders only My Cookbook recipes in RecipeCard components', async () => {
        const userDocRef = firestore.collection('users').doc('123');
        const allRecipes = [
          { recipe_id: 'recipeId1', name: 'Recipe 1' }, 
          { recipe_id: 'recipeId2', name: 'Recipe 2' },
          { recipe_id: 'recipeId3', name: 'Recipe 3' },
        ];
        const myCookbook = ['recipeId1', 'recipeId3'];
        vi.mocked(userDocRef.onSnapshot).mockImplementation((callback) => {
          callback({ data: () => ({ myCookbook: myCookbook, all_recipes: allRecipes }) });
        });
      
        await wrapper.vm.$nextTick();
      
        const recipeCards = wrapper.findAllComponents('RecipeCard');
      
        recipeCards.forEach((recipeCard, index) => {
          const recipeId = recipeCard.props('recipe').recipe_id;
          expect(likedRecipes).toContain(recipeId);
        });
      });          
});
      
