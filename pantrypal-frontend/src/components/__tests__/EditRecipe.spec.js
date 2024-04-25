import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import EditRecipePage from '@/views/EditRecipePage.vue'; 
import TopBar from '@/components/TopBar.vue';
import CircleButton from '@/components/CircleButton.vue';
import SaveRecipeButton from '@/components/SaveRecipeButton.vue';
import Multiselect from 'vue-multiselect';
import { nextTick } from 'vue';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  updateDoc,
  arrayUnion,
  getDocs
} from "firebase/firestore";
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';


// Mock Firebase services and utilities
vi.mock('@/firebase', () => ({
  auth: {
    currentUser: { uid: '123' }
  },
  app: {},
  db: {},
  storage: {},
  fetchCategories: vi.fn(() => Promise.resolve(['Dessert', 'Main'])),
  ref: vi.fn(),
}));

vi.mock('firebase/storage', () => {
  const getDownloadURL = vi.fn(() => Promise.resolve('https://example.com/photo.jpg'));
  const uploadBytesResumable = vi.fn((storageRef, file) => {
    const mockSnapshot = { ref: { getDownloadURL } };
    return {
      snapshot: mockSnapshot,
      on: (event, progress, error, complete) => {
        progress({ bytesTransferred: file.size, totalBytes: file.size }); // simulate progress
        complete(); // simulate completion
      }
    };
  });

  return { ref: vi.fn(), uploadBytesResumable, getDownloadURL };
});

vi.mock("firebase/firestore", () => {
  // Create a mock for the document snapshot
  const docSnapshotMock = {
    exists: () => true,
    data: vi.fn(() => ({
        recipe_img_url: "https://example.com/old-photo.jpg",
        community: true,
        recipe_name: "Old Recipe",
        description: "Old description",
        allergens: ["Nuts", "Dairy"],
        cook_time: 120,
        categories: ["Dessert"],
        ingredients: ["1 cup sugar", "2 cups flour"],
        directions: ["Mix ingredients", "Bake"],
        serving_size: 2
    })),
    id: 'doc1',
  };

  // Mock for document references that can be used to chain further Firestore methods
  const docRefMock = {
    set: vi.fn(() => Promise.resolve()),
    update: vi.fn(() => Promise.resolve()),
    get: vi.fn(() => Promise.resolve(docSnapshotMock)), // Simulate getting a document snapshot
  };

  // Mock for getDoc function
  const getDocMock = vi.fn((docRef) => Promise.resolve(docSnapshotMock));

  // Mock for arrayUnion
  const arrayUnionMock = vi.fn((...items) => ({ arrayUnionOp: items }));

  // Mock for collections that returns a document reference mock
  const collectionMock = vi.fn(() => ({
    doc: vi.fn(() => docRefMock)
  }));

  // Mock the getFirestore function to return an object that mimics Firestore's methods
  const getFirestoreMock = vi.fn(() => ({
    collection: collectionMock,
    doc: vi.fn(() => docRefMock),
  }));

  // Return all mocked functions and objects
  return {
    getFirestore: getFirestoreMock,
    doc: vi.fn(() => docRefMock),
    setDoc: vi.fn((docRef, data) => Promise.resolve()),
    collection: collectionMock,
    updateDoc: vi.fn((docRef, data) => Promise.resolve()),
    getDoc: getDocMock,
    arrayUnion: arrayUnionMock,
    getDocs: vi.fn(() => Promise.resolve([])),
  };
});

vi.mock('vue-toastification', () => ({
  useToast: vi.fn(() => ({
    error: vi.fn(),
    success: vi.fn(),
  })),
}));

vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  }));

// Mocking global components that might not be directly tested or are irrelevant for specific tests
const globalComponents = {
  components: {
    Multiselect,
    TopBar,
    CircleButton,
    SaveRecipeButton
  },
  mocks: {
    $router: useRouter(),
  }
};

describe('EditRecipePage', () => {
  let wrapper;
  let toast;
  let originalAddEventListener;
  let originalRemoveEventListener;
  let originalHistory;

  beforeEach( async () => {
    wrapper = mount(EditRecipePage, { global: globalComponents });
    toast = wrapper.vm.toast;
    originalAddEventListener = window.addEventListener;
    originalRemoveEventListener = window.removeEventListener;
    originalHistory = window.history;

    // Stub only specific properties
    window.addEventListener = vi.fn();
    window.removeEventListener = vi.fn();
    window.history = { 
      length: 1,  // Default to 1, adjust as needed per test
      go: vi.fn(),  // Add stub for history.go method
      pushState: vi.fn(),  // If needed by other parts of your component or application
      replaceState: vi.fn()  // If needed by other parts of your component or application
  };
  vi.spyOn(wrapper.vm, 'fetchRecipeDetails');
  vi.spyOn(wrapper.vm, 'submitRecipe');
  await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
    window.history = originalHistory;
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.create-recipe-modal').exists()).toBe(true);
  });

  it('calls fetchRecipeDetails on component creation', async () => {
    await wrapper.vm.$nextTick();
    // Check if fetchRecipeDetails was called during component creation
    expect(wrapper.vm.fetchRecipeDetails).toHaveBeenCalled();
  });

  it('fetches recipe details and updates recipeData correctly', async () => {
    await wrapper.vm.fetchRecipeDetails();

    expect(wrapper.vm.recipeData).toEqual({
      imageSrc: "https://example.com/old-photo.jpg",
      publish_to_community: true,
      recipe_name: "Old Recipe",
      serving_size: 2,
      description: "Old description",
      allergen_info: "Nuts, Dairy",
      allergens: [],
      cook_time_hours: 2,
      cook_time_minutes: 0,
      categories: ["Dessert", "Main"],
      category: ["Dessert"],
      ingredients: ["1 cup sugar", "2 cups flour"],
      directions: [{ stepNumber: 1, text: "Mix ingredients" }, { stepNumber: 2, text: "Bake" }],
    });
  });


  it('uploads an image and sets imageSrc correctly', async () => {
    const wrapper = mount(EditRecipePage);
    const file = new File(['image content'], 'test-image.png', { type: 'image/png' });

    await wrapper.vm.handleImageUpload({ target: { files: [file] } });
    await wrapper.vm.$nextTick();

    expect(uploadBytesResumable).toHaveBeenCalled();
    expect(getDownloadURL).toHaveBeenCalled();
    expect(wrapper.vm.recipeData.imageSrc).toBe('https://example.com/photo.jpg');
  });

  it('adds an ingredient when add more button is clicked', async () => {
    await wrapper.find('.add-more-button').trigger('click');
    expect(wrapper.vm.recipeData.ingredients.length).toBe(3);
  });

  it('removes an ingredient when remove button is clicked', async () => {
    await wrapper.vm.addIngredient(); // Add a second ingredient to test removal
    expect(wrapper.vm.recipeData.ingredients.length).toBe(3); // Confirm addition
    await wrapper.find('.ingredient-input .remove-button').trigger('click');
    expect(wrapper.vm.recipeData.ingredients.length).toBe(2); // Confirm removal
  });

  it('adds a direction when add more button is clicked', async () => {
    await wrapper.find('.second2 .add-more-button').trigger('click');
    expect(wrapper.vm.recipeData.directions.length).toBe(3);
  });

  it('removes a direction when remove button is clicked', async () => {
    await wrapper.vm.addDirection(); // Add a second direction to test removal
    expect(wrapper.vm.recipeData.directions.length).toBe(3); // Confirm addition
    await wrapper.findAll('.direction-step .remove-button').at(0).trigger('click');
    expect(wrapper.vm.recipeData.directions.length).toBe(2); // Confirm removal
  });

  it('allows only numeric input in cook time fields', async () => {
    const cookTimeHoursInput = wrapper.find('#cookTimeHours');
    const cookTimeMinsInput = wrapper.find('#cookTimeMins');

    await cookTimeHoursInput.setValue('');
    await cookTimeMinsInput.setValue('');

    // Simulate key press for a non-numeric value
    await cookTimeHoursInput.setValue('e');
    await cookTimeMinsInput.setValue('e');

    // Check if the input is rejected (field should be empty or unchanged if starting value is empty)
    expect(cookTimeHoursInput.element.value).toBe('');
    expect(cookTimeMinsInput.element.value).toBe('');

    // Simulate key press for a numeric value
    await cookTimeHoursInput.setValue('2');
    await cookTimeMinsInput.setValue('30');

    // Check if the input is accepted
    expect(cookTimeHoursInput.element.value).toBe('2');
    expect(cookTimeMinsInput.element.value).toBe('30');
  });

  it('shows error toast when the image file is not valid', async () => {
    // Simulate image upload with an invalid file type
    const file = new File([''], 'test-image.gif', { type: 'image/gif' }); // Unsupported format
    const event = { target: { files: [file] } };
    await wrapper.vm.handleImageUpload(event);

    // Check that error toast was called
    expect(toast.error).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Please select a JPG or PNG image file.", expect.anything());
  });

  it('shows error toast when mandatory fields are missing before submitting', async () => {
    // Prepare form without required fields filled
    wrapper.vm.recipeData.recipe_name = ''; // Assume recipe name is required and it's empty
    await wrapper.vm.submitRecipe();

    // Check if the error toast for missing fields is called
    expect(toast.error).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Please fill in the following fields"), expect.anything());
  });

  it('shows error toast when recipe cannot be saved due to an error', async () => {
    // Mock the submitRecipe method to simulate a failure
    vi.spyOn(wrapper.vm, 'submitRecipe').mockImplementation(() => {
      wrapper.vm.cannotSaveRecipe(); // Simulate calling the error toast
      return Promise.reject(new Error("Failed to save"));
    });

    // Attempt to submit the recipe
    try {
      await wrapper.vm.submitRecipe();
    } catch {}

    // Verify that the error toast was displayed
    expect(toast.error).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Recipe could not be saved.", expect.anything());
  });

  it('shows success toast when recipe is saved successfully', async () => {
    // Mock the submitRecipe method to simulate a success
    vi.spyOn(wrapper.vm, 'submitRecipe').mockImplementation(() => {
      wrapper.vm.recipeSavedSuccess(); // Trigger the success toast
      return Promise.resolve();
    });

    // Execute the submission process
    await wrapper.vm.submitRecipe();

    // Verify that the success toast was displayed
    expect(toast.success).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Changes were successfully saved!", expect.anything());
  });

  it('should navigate to the RecipeDetailsPage when close is called', async () => {
    // Assume there's a selected recipe for navigation purpose
    wrapper.vm.selectedRecipe = { recipe_id: '123' };

    await wrapper.find('.cancel-button').trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: "RecipeDetailsPage",
      params: { id: '123' }
    });
  });

  it('submits a recipe with valid data', async () => {
    // Prepare form inputs
    wrapper.vm.recipeData.recipe_name = 'Chocolate Cake';
    wrapper.vm.recipeData.description = 'Delicious chocolate cake';
    wrapper.vm.recipeData.ingredients[0] = '1 cup flour';
    wrapper.vm.recipeData.directions[0].text = 'Mix ingredients';
    wrapper.vm.recipeData.serving_size = '4';
    wrapper.vm.recipeData.cook_time_hours = '1';
    wrapper.vm.recipeData.cook_time_minutes = '30';
    wrapper.vm.recipeData.category = ['Dessert'];

    // Mock method to simulate successful submission
    await wrapper.vm.submitRecipe();
    expect(wrapper.vm.submitRecipe).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Recipe was successfully created!", expect.anything());
  });

});
