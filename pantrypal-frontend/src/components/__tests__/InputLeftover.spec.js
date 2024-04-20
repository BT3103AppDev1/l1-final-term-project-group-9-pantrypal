import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Multiselect from 'vue-multiselect';
import InputLeftover from '@/components/InputLeftover.vue';
import { createToastInterface } from 'vue-toastification';
import * as firebaseModule from '@/firebase.js';

vi.mock('@/firebase.js', () => ({
  fetchCategories: vi.fn(() => Promise.resolve(['category1', 'category2', 'category3']))
}));

vi.mock('vue-toastification', () => ({
    useToast: vi.fn(() => ({
      error: vi.fn(),
      success: vi.fn(),
    })),
  }));

describe('InputLeftover', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(InputLeftover, {
      global: {
        components: {
          Multiselect,
        },
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('adds an ingredient when the "Add More" button is clicked', async () => {
    const initialIngredients = wrapper.vm.ingredients.length;
    await wrapper.find('.add-button').trigger('click');
    expect(wrapper.vm.ingredients.length).toBe(initialIngredients + 1);
  });

  it('removes an ingredient when the "x" button is clicked', async () => {
    const initialIngredients = wrapper.vm.ingredients.length;
    await wrapper.findAll('.remove-button').at(0).trigger('click');
    expect(wrapper.vm.ingredients.length).toBe(initialIngredients - 1);
  });

  it('validates the ingredient fields', () => {
    // Set some invalid ingredients
    wrapper.vm.ingredients = [
      { name: '', quantity: '' },
      { name: 'Chicken', quantity: '' },
    ];

    expect(wrapper.vm.validateIngredients()).toBe(false);
  });

  it('generates a recipe when the "Generate Recipe" button is clicked', async () => {
    // Set some valid ingredients
    wrapper.vm.ingredients = [
      { name: 'Chicken', quantity: '100g' },
      { name: 'Carrots', quantity: '50g' },
    ];

    await wrapper.find('.generate-button').trigger('click');
    expect(wrapper.emitted('generate-recipe')).toBeTruthy();
  });

  it('shows a toast error when the ingredient fields are invalid', async () => {
    // Set some invalid ingredients
    wrapper.vm.ingredients = [
      { name: '', quantity: '' },
      { name: 'Chicken', quantity: '' },
    ];

    await wrapper.find('.generate-button').trigger('click');
    expect(wrapper.vm.toast.error).toHaveBeenCalled();
  });
});