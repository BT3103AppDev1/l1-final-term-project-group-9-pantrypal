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

  vi.mock('@/firebase', () => ({
    auth: {
      currentUser: { uid: '456' }
    },
    app: {},
    db: {},
    storage: {},
  }));

  // Mock the Firestore imports
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
    // Mocking props for the recipe details
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
      recipe_img_url: 'https://example.com/recipe.jpg', // Mocking image URL
    };

    // Mocking computed properties
    const computed = {
      username: 'TestUser',
      cookingTimeInHrAndMin: '45mins',
    };

    // Mocking user authentication
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
          auth,
        },
        plugins: [useToast],
        computed,
      },
      data() {
        return {
          user: auth.currentUser, // Here we add the user to the data object
          username: 'TestUser',
          cookingTimeInHrAndMin: '45mins',
        };
      },
    });
    toast = wrapper.vm.toast;
  });

  it('should display a warning toast with confirmation and cancellation actions when the delete button is clicked', async () => {
    await wrapper.vm.$nextTick();
    // Spy on the confirmDelete method
    const confirmDeleteSpy = vi.spyOn(wrapper.vm, 'confirmDelete');
    
    // Find and click the delete button
    await wrapper.find('.delete-recipe-button').trigger('click');
    
    // Assert the confirmDelete method has been called
    expect(confirmDeleteSpy).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    
    // Assert the toast.warning method was called with the specific configuration
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

    // Clean up the spy
    confirmDeleteSpy.mockRestore();
  });

  it('should call deleteRecipe when onConfirm is called', async () => {
    // Create spies for deleteRecipe and toast.clear
    const deleteRecipeSpy = vi.spyOn(wrapper.vm, 'deleteRecipe');
  
    // You need to trigger the confirmDelete method which sets up the toast
    wrapper.vm.confirmDelete();
    await wrapper.vm.$nextTick();
  
    // Assume that toast.warning is called and we manually trigger the callbacks
    const warningCall = wrapper.vm.toast.warning.mock.calls[0][0];
    warningCall.props.onConfirm();
  
    // Check if deleteRecipe and toast.clear have been called
    expect(deleteRecipeSpy).toHaveBeenCalled();
  
    // Clean up the spies
    deleteRecipeSpy.mockRestore();
  });

  it('should call toast.clear() when onCancel is called', async () => {
    // Create spies for deleteRecipe and toast.clear
    const toastClearSpy = vi.spyOn(wrapper.vm.toast, 'clear');
  
    // You need to trigger the confirmDelete method which sets up the toast
    wrapper.vm.confirmDelete();
    await wrapper.vm.$nextTick();
  
    // Assume that toast.warning is called and we manually trigger the callbacks
    const warningCall = wrapper.vm.toast.warning.mock.calls[0][0];
    warningCall.props.onCancel();
  
    // Check if deleteRecipe and toast.clear have been called
    expect(toastClearSpy).toHaveBeenCalled();
  
    // Clean up the spies
    toastClearSpy.mockRestore();
  });


  it('deleteRecipe should handle errors correctly', async () => {
    // Setup error scenario for deleteDoc
    deleteDoc.mockRejectedValue(new Error("Failed to delete recipe"));

    await wrapper.vm.deleteRecipe();

    expect(deleteDoc).toHaveBeenCalledWith({}); // Check the correct document reference
    expect(toast.error).toHaveBeenCalledWith("Failed to delete recipe: Failed to delete recipe", {
      position: "top-center",
      hideProgressBar: true,
    });
  });

  it('deleteRecipe should handle successful deletion correctly', async () => {
    // Assume the Firestore deleteDoc and updateDoc operations succeed
    deleteDoc.mockResolvedValue();
    updateDoc.mockResolvedValue();
  
    // Handle multiple getDocs calls more precisely
    getDocs
      .mockResolvedValueOnce({
        forEach: (callback) => {
          callback({ ref: {}, data: () => ({ category_name: 'Category 1', recipes: ['123'] }) }); // Simulating the categories collection documents
        }
      })
      .mockResolvedValueOnce({
        forEach: (callback) => {
          callback({ ref: {}, data: () => ({ liked_recipes: ['123'] }) }); // Simulating the user collection documents
        }
      });
  
    // Call the deleteRecipe method
    await wrapper.vm.deleteRecipe();
  
    // Verify that all expected Firestore functions were called correctly
    expect(deleteDoc).toHaveBeenCalled();
    expect(getDocs).toHaveBeenCalled; // Adjust the number of times based on actual implementation details
    expect(updateDoc).toHaveBeenCalled; // Assuming updates for categories and user cookbook
  
    // Check if success toast is displayed correctly
    expect(toast.success).toHaveBeenCalledWith("Recipe deleted successfully!", {
      timeout: 2000,
      position: "top-center",
      hideProgressBar: true,
    });
  
    // Verify that the user is redirected to the community page
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/community-page");
  });
    

});
