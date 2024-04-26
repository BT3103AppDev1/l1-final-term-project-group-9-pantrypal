import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import UserProfileLikedRecipes from '@/components/UserProfileLikedRecipes.vue';
import flushPromises from 'flush-promises';

describe('UserProfileLikedRecipes Component', () => {
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

      const auth = {
        currentUser: {
          uid: '456',
          user_id: '456',
          username: 'test',
        },
      };
    
  
      wrapper = mount(UserProfileLikedRecipes, {
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
  
    it('renders the component and fetches liked recipes', async () => {
        const userDocRef = firestore.collection('users').doc('123');
        const likedRecipes = ['recipeId1', 'recipeId2'];
        vi.mocked(userDocRef.onSnapshot).mockImplementation((callback) => {
          callback({ data: () => ({ liked_recipes: likedRecipes }) });
        });
      
        await flushPromises();
      
        expect(wrapper.find('.liked-recipes-page').exists()).toBe(true);
        expect(firestore.collection).toHaveBeenCalledWith('users'); 
        expect(firestore.collection('users').doc).toHaveBeenCalledWith('123');
      });  
});
      
