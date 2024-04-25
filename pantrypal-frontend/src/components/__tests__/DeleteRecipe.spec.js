import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeDetails from '@/components/RecipeDetails.vue'; 
import ConfirmToast from "@/components/ConfirmToast.vue";
import { useToast } from 'vue-toastification';
import {
    getFirestore,
    doc,
    setDoc,
    addDoc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    arrayUnion,
    arrayRemove,
    deleteDoc,
    where,
    query,
  } from "firebase/firestore";
import { createStore } from 'vuex';

const store = createStore({
  state () {
    return {
      RecipeFromPage: '',
      selected: '',
    }
  },
  mutations: {
    communitypage (state) {
      state.RecipeFromPage = 'Community Page'
    },
    likedrecipes (state) {
      state.RecipeFromPage = 'Profile'
      state.selected = 'likedRecipes'
    },
    mycookbook (state) {
      state.RecipeFromPage = 'Profile'
      state.selected = 'myCookbook'
    }
  }
});

vi.mock('@/firebase', () => ({
  auth: {
    currentUser: { uid: '456' }
  },
  app: {},
  db: {},
  storage: {},
}));

vi.mock('firebase/firestore', () => {
  const getDocs = vi.fn(() => Promise.resolve({
    docs: [{
      data: () => ({
        liked_recipes: ['recipe1', 'recipe2'],
        otherUserData: 'value'
      }),
      exists: () => true
    }]
  }));

  return {
    getFirestore: vi.fn(),
    doc: vi.fn(() => ({})),
    getDoc: vi.fn(() => Promise.resolve({
      data: () => ({
        liked_recipes: ['recipe1', 'recipe2'],
        otherUserData: 'value'
      }),
      exists: () => true
    })),
    deleteDoc: vi.fn(() => Promise.resolve()),
    updateDoc: vi.fn(() => Promise.resolve()),
    getDocs,
    collection: vi.fn(() => ({})),
    setDoc: vi.fn(() => Promise.resolve()),
    addDoc: vi.fn(() => Promise.resolve({ id: 'newDocId' })),
    arrayUnion: vi.fn(),
    arrayRemove: vi.fn(),
    where: vi.fn(),
    query: vi.fn(),
  };
});


vi.mock('vue-toastification', () => ({
  useToast: vi.fn(() => ({
    warning: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    clear: vi.fn(),
  })),
}));

describe('RecipeDetails Component', () => {
  let wrapper;
  let toast;

  beforeEach(() => {
    const selectedRecipe = {
      recipe_id: '123',
      recipe_name: 'Test Recipe',
      description: 'Test description',
      serving_size: '2',
      cook_time: 45,
      allergens: ['Nuts', 'Gluten'],
      categories: ['Category 1', 'Category 2'],
      directions: ['Step 1', 'Step 2'],
      user_id: '456',
      created_date: new Date(),
      AIgenerated: true,
      editted: true,
      recipe_img_url: 'https://example.com/recipe.jpg', 
    };

    const computed = {
      username: 'TestUser',
      cookingTimeInHrAndMin: '45mins',
    };

    const auth = {
      currentUser: {
        uid: '456',
        user_id: '456',
        username: 'test',
      },
    };

    wrapper = mount(RecipeDetails, {
      props: {
        selectedRecipe,
        selectedIngredients: [],
        likeExists: true,
        disabled: false,
      },
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
          $store: store,
          auth,
        },
        plugins: [useToast],
        plugins: [store],
        computed,
      },
      data() {
        return {
          user: auth.currentUser, 
          username: 'TestUser',
          cookingTimeInHrAndMin: '45mins',
        };
      },
    });
    toast = wrapper.vm.toast;
  });

  it('should display a warning toast with confirmation and cancellation actions when the delete button is clicked', async () => {
    await wrapper.vm.$nextTick();
    const confirmDeleteSpy = vi.spyOn(wrapper.vm, 'confirmDelete');
    await wrapper.find('.delete-recipe-button').trigger('click');
    expect(confirmDeleteSpy).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(toast.warning).toHaveBeenCalledWith({
        component: ConfirmToast,
        props: {
            onConfirm: expect.any(Function),
            onCancel: expect.any(Function),
        },
        position: "top-center",
        timeout: false,
        hideProgressBar: true,
        closeButton: false,
    });
    confirmDeleteSpy.mockRestore();
  });

  it('should call deleteRecipe when onConfirm is called', async () => {
    const deleteRecipeSpy = vi.spyOn(wrapper.vm, 'deleteRecipe');
    wrapper.vm.confirmDelete();
    await wrapper.vm.$nextTick();
    const warningCall = wrapper.vm.toast.warning.mock.calls[0][0];
    warningCall.props.onConfirm();
    expect(deleteRecipeSpy).toHaveBeenCalled();
    deleteRecipeSpy.mockRestore();
  });

  it('should call toast.clear() when onCancel is called', async () => {
    const toastClearSpy = vi.spyOn(wrapper.vm.toast, 'clear');
    wrapper.vm.confirmDelete();
    await wrapper.vm.$nextTick();
    const warningCall = wrapper.vm.toast.warning.mock.calls[0][0];
    warningCall.props.onCancel();
    expect(toastClearSpy).toHaveBeenCalled();
    toastClearSpy.mockRestore();
  });

  it('deleteRecipe should handle errors correctly', async () => {
    deleteDoc.mockRejectedValue(new Error("Failed to delete recipe"));
    await wrapper.vm.deleteRecipe();
    expect(deleteDoc).toHaveBeenCalledWith({});
    expect(toast.error).toHaveBeenCalledWith("Failed to delete recipe: Failed to delete recipe", {
      position: "top-center",
      hideProgressBar: true,
    });
  });

  it('deleteRecipe should handle successful deletion correctly', async () => {
    deleteDoc.mockResolvedValue();
    updateDoc.mockResolvedValue();
    getDocs
      .mockResolvedValueOnce({
        forEach: (callback) => {
          callback({ ref: {}, data: () => ({ category_name: 'Category 1', recipes: ['123'] }) });
        }
      })
      .mockResolvedValueOnce({
        forEach: (callback) => {
          callback({ ref: {}, data: () => ({ liked_recipes: ['123'] }) });
        }
      });
    await wrapper.vm.deleteRecipe();
    expect(deleteDoc).toHaveBeenCalled();
    expect(getDocs).toHaveBeenCalled;
    expect(updateDoc).toHaveBeenCalled;
    expect(toast.success).toHaveBeenCalledWith("Recipe deleted successfully!", {
      timeout: 2000,
      position: "top-center",
      hideProgressBar: true,
    });
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/community-page");
  });
});
