import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CreateRecipePage from '@/views/CreateRecipePage.vue'; 
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
import VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

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
        progress({ bytesTransferred: file.size, totalBytes: file.size });
        complete(); 
      }
    };
  });

  return { ref: vi.fn(), uploadBytesResumable, getDownloadURL };
});

vi.mock("firebase/firestore", () => {
  const docSnapshotMock = {
    exists: () => true,
    data: vi.fn(() => ({ field1: 'value1', field2: 'value2' })),
    id: 'doc1',
  };

  const docRefMock = {
    set: vi.fn(() => Promise.resolve()),
    update: vi.fn(() => Promise.resolve()),
    get: vi.fn(() => Promise.resolve(docSnapshotMock)), 
  };

  const getDocMock = vi.fn((docRef) => Promise.resolve(docSnapshotMock));

  const arrayUnionMock = vi.fn((...items) => ({ arrayUnionOp: items }));

  const collectionMock = vi.fn(() => ({
    doc: vi.fn(() => docRefMock)
  }));

  const getFirestoreMock = vi.fn(() => ({
    collection: collectionMock,
    doc: vi.fn(() => docRefMock),
  }));

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

const routes = [{ path: '/', name: 'home' },
{ path: '/community-page', name: 'community-page' },];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const globalComponents = {
  components: {
    Multiselect,
    TopBar,
    CircleButton,
    SaveRecipeButton
  },
  plugins: [router],
};

describe('CreateRecipePage', () => {
  let wrapper;
  let toast;
  let originalAddEventListener;
  let originalRemoveEventListener;
  let originalHistory;

  beforeEach(async () => {
    wrapper = mount(CreateRecipePage, { global: globalComponents });
    await router.isReady();
    toast = wrapper.vm.toast;
    originalAddEventListener = window.addEventListener;
    originalRemoveEventListener = window.removeEventListener;
    originalHistory = window.history;

    window.addEventListener = vi.fn();
    window.removeEventListener = vi.fn();
    window.history = { 
      length: 1,  
      go: vi.fn(),  
      pushState: vi.fn(),  
      replaceState: vi.fn()  
  };
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

  it('initializes with the correct default data', () => {
    const defaultData = {
      imageSrc: "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1",
      publish_to_community: false,
      recipe_name: "",
      serving_size: "",
      description: "",
      allergen_info: "",
      allergens: [],
      cook_time_hours: "",
      cook_time_minutes: "",
      categories: ['Dessert', 'Main'], 
      category: [],
      ingredients: [""],
      directions: [{ stepNumber: 1, text: "" }],
    };
    expect(wrapper.vm.recipeData).toEqual(expect.objectContaining(defaultData));
    expect(wrapper.vm.recipeData.publish_to_community).toBe(false);
    expect(wrapper.vm.recipeData.recipe_name).toBe('');
    expect(wrapper.vm.recipeData.ingredients).toEqual(['']);
    expect(wrapper.vm.recipeData.directions).toEqual([{ stepNumber: 1, text: '' }]);
  });


  it('uploads an image and sets imageSrc correctly', async () => {
    const wrapper = mount(CreateRecipePage);
    const file = new File(['image content'], 'test-image.png', { type: 'image/png' });

    await wrapper.vm.handleImageUpload({ target: { files: [file] } });
    await wrapper.vm.$nextTick();

    expect(uploadBytesResumable).toHaveBeenCalled();
    expect(getDownloadURL).toHaveBeenCalled();
    expect(wrapper.vm.recipeData.imageSrc).toBe('https://example.com/photo.jpg');
  });

  it('adds an ingredient when add more button is clicked', async () => {
    await wrapper.find('.add-more-button').trigger('click');
    expect(wrapper.vm.recipeData.ingredients.length).toBe(2);
  });

  it('removes an ingredient when remove button is clicked', async () => {
    await wrapper.vm.addIngredient(); 
    expect(wrapper.vm.recipeData.ingredients.length).toBe(2); 
    await wrapper.find('.ingredient-input .remove-button').trigger('click');
    expect(wrapper.vm.recipeData.ingredients.length).toBe(1);
  });

  it('adds a direction when add more button is clicked', async () => {
    await wrapper.find('.second2 .add-more-button').trigger('click');
    expect(wrapper.vm.recipeData.directions.length).toBe(2);
  });

  it('removes a direction when remove button is clicked', async () => {
    await wrapper.vm.addDirection(); 
    expect(wrapper.vm.recipeData.directions.length).toBe(2); 
    await wrapper.findAll('.direction-step .remove-button').at(0).trigger('click');
    expect(wrapper.vm.recipeData.directions.length).toBe(1); 
  });

  it('allows only numeric input in cook time fields', async () => {
    const cookTimeHoursInput = wrapper.find('#cookTimeHours');
    const cookTimeMinsInput = wrapper.find('#cookTimeMins');

    await cookTimeHoursInput.setValue('e');
    await cookTimeMinsInput.setValue('e');

    expect(cookTimeHoursInput.element.value).toBe('');
    expect(cookTimeMinsInput.element.value).toBe('');

    await cookTimeHoursInput.setValue('2');
    await cookTimeMinsInput.setValue('30');

    expect(cookTimeHoursInput.element.value).toBe('2');
    expect(cookTimeMinsInput.element.value).toBe('30');
  });

  it('shows error toast when the image file is not valid', async () => {
    const file = new File([''], 'test-image.gif', { type: 'image/gif' }); 
    const event = { target: { files: [file] } };
    await wrapper.vm.handleImageUpload(event);

    expect(toast.error).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Please select a JPG or PNG image file.", expect.anything());
  });

  it('shows error toast when mandatory fields are missing before submitting', async () => {
    wrapper.vm.recipeData.recipe_name = ''; 
    await wrapper.vm.submitRecipe();

    expect(toast.error).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Please fill in the following fields"), expect.anything());
  });

  it('shows error toast when recipe cannot be saved due to an error', async () => {
    vi.spyOn(wrapper.vm, 'submitRecipe').mockImplementation(() => {
      wrapper.vm.cannotSaveRecipe();
      return Promise.reject(new Error("Failed to save"));
    });
    try {
      await wrapper.vm.submitRecipe();
    } catch {}
    expect(toast.error).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Recipe could not be saved.", expect.anything());
  });

  it('shows success toast when recipe is saved successfully', async () => {
    vi.spyOn(wrapper.vm, 'submitRecipe').mockImplementation(() => {
      wrapper.vm.recipeSavedSuccess(); 
      return Promise.resolve();
    });
    await wrapper.vm.submitRecipe();
    expect(toast.success).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Recipe was successfully created!", expect.anything());
  });

  it('routes to the home page on cancel', async () => {
    await wrapper.find('.cancel-button').trigger('click');
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('routes to the previous page on cancel when history length is more than 1', async () => {
    window.history.length = 2; 
    const spy = vi.spyOn(router, 'go');
    await wrapper.find('.cancel-button').trigger('click');
    expect(spy).toHaveBeenCalledWith(-1);
    spy.mockRestore();
  });

  it('routes to the home page on cancel when history length is 1 or less', async () => {
    window.history.length = 1;  

    const spy = vi.spyOn(router, 'push');

    await wrapper.find('.cancel-button').trigger('click');
    expect(spy).toHaveBeenCalledWith('/');
    spy.mockRestore();
  });

  it('submits a recipe with valid data', async () => {
    wrapper.vm.recipeData.recipe_name = 'Chocolate Cake';
    wrapper.vm.recipeData.description = 'Delicious chocolate cake';
    wrapper.vm.recipeData.ingredients[0] = '1 cup flour';
    wrapper.vm.recipeData.directions[0].text = 'Mix ingredients';
    wrapper.vm.recipeData.serving_size = '4';
    wrapper.vm.recipeData.cook_time_hours = '1';
    wrapper.vm.recipeData.cook_time_minutes = '30';
    wrapper.vm.recipeData.category = ['Dessert'];

    const pushSpy = vi.spyOn(router, 'push');
    await wrapper.vm.submitRecipe();
    expect(wrapper.vm.submitRecipe).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledWith('/community-page');
    expect(pushSpy).toHaveBeenCalledTimes(1);
    pushSpy.mockRestore();
    expect(toast.success).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Recipe was successfully created!", expect.anything());
  });

});
