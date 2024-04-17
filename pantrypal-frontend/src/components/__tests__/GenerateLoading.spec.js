import { describe, it, expect, vi, beforeEach, nextTick } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import GenerateLoading from '@/components/GenerateLoading.vue';
import { nextTick } from 'vue';

vi.mock('axios', () => ({
    default: {
      post: vi.fn(() => Promise.resolve({
        status: 200,
        data: { content: 'Sample recipe' }
      }))
    }
}));

  
describe('Generate Loading', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(GenerateLoading, {
      propsData: {
        ingredients: [
          { name: 'Chicken', quantity: '100 grams' },
          { name: 'Carrots', quantity: '3 cups' },
        ],
        categories: ['Asian'],
        dietaryRestrictions: 'none',
        prev_recipe_name: null,
      },
    });
  });

    it('should render the loading state', () => {
        expect(wrapper.findAll('h1').at(0).text()).toBe('We are cooking up your recipe!');
        expect(wrapper.findAll('h1').at(1).text()).toBe('Give us a few seconds...');
        expect(wrapper.findAll('.ingredient-container').length).toBe(2);
        expect(wrapper.find('img').exists()).toBe(true);
    });

    it('should fetch the recipe and emit the "recipeGenerated" event', async () => {
        axios.post.mockResolvedValue({
        status: 200,
        data: { content: 'Sample recipe' }
        });
        await wrapper.vm.fetchRecipe();

        expect(axios.post).toHaveBeenCalledWith(
        'https://us-central1-pantrypal-e1225.cloudfunctions.net/api/initial-recipe',
        {
            ingredients: [
            { name: 'Chicken', quantity: '100 grams' },
            { name: 'Carrots', quantity: '3 cups' }
            ],
            categories: ['Asian'],
            dietaryRestrictions: 'none',
            first: true,
        }
        );
        expect(wrapper.emitted('recipeGenerated')).toBeTruthy();
        expect(wrapper.emitted('recipeGenerated')[0][0]).toEqual({ generatedRecipe: 'Sample recipe' });
    });

    it('should show the error modal on failed recipe fetch', async () => {
        axios.post.mockRejectedValue(new Error('Network error'));
      
        await wrapper.vm.fetchRecipe();
        await nextTick();
      
        expect(wrapper.vm.showErrorModal).toBe(true);
      });

    it('should close the error modal and emit the "back" event', () => {
        wrapper.vm.showErrorModal = true;
        wrapper.vm.handleModalClose();
        expect(wrapper.vm.showErrorModal).toBe(false);
        expect(wrapper.emitted('back')).toHaveLength(1);
    });
});