import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeDetails from '@/components/RecipeDetails.vue'; // Assuming your component is named RecipeDetails

describe('RecipeDetails Component', () => {
  let wrapper;

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
          $toast: {
            warning: vi.fn(),
            success: vi.fn(),
            error: vi.fn(),
          },
          auth,
        },
        computed,
      },
    });
  });

  it('renders recipe details correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Test Recipe');
    expect(wrapper.find('p').text()).toContain('By @, Invalid Date');
    expect(wrapper.find('.description').text()).toContain('Test description');
    expect(wrapper.find('.serving-size-cooking-time').text()).toContain('2');
    const categories = wrapper.findAll('.category-bubble')
    expect(categories.length).toBe(2);
    expect(wrapper.findAll('li').length).toBe(2);
  });

  it('displays AI-generated warning when AIgenerated is true', () => {
    expect(wrapper.find('.warning').exists()).toBe(true);
  });

  it('displays edited warning when editted is true', () => {
    expect(wrapper.find('.warning').exists()).toBe(true);
  });

  it('displays like button', () => {
    expect(wrapper.findComponent({ name: 'LikeButton' }).exists()).toBe(true);
  });

  it('does not display edit and delete buttons if the user is not the creator', async () => {
    wrapper.setProps({
      auth: {
        currentUser: {
          uid: '789',
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.edit-recipe-button').exists()).toBe(false);
    expect(wrapper.find('.delete-recipe-button').exists()).toBe(false);
  });
});
