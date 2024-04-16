import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeCard from '@/components/RecipeCard.vue';

describe('RecipeCard Component', () => {
  let wrapper;

  beforeEach(() => {
    const recipe = {
      recipe_id: '123',
      recipe_name: 'Test Recipe',
      categories: ['Category 1', 'Category 2'],
      recipe_img_url: 'https://example.com/recipe.jpg',
      user_id: '456',
    };

    const auth = {
      currentUser: {
        uid: '789',
      },
    };

    const getDoc = vi.fn(() => ({
      exists: vi.fn(() => true),
      data: vi.fn(() => ({ liked_recipes: ['123'] })),
    }));
    const query = vi.fn(() => ({
      where: vi.fn(() => ({
        get: vi.fn(() => ({
          empty: false,
          docs: [{ data: vi.fn(() => ({ username: '' })) }],
        })),
      })),
    }));

    wrapper = mount(RecipeCard, {
      props: {
        recipe,
      },
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
          $firestore: {
            auth,
            getDoc,
            query,
          },
        },
      },
    });
  });

  it('loads the recipe image', () => {
    expect(wrapper.find('.recipe-image img').attributes('src')).toBe('https://example.com/recipe.jpg');
  });

  it('displays the recipe name correctly', () => {
    expect(wrapper.find('.recipe-name').text()).toBe('Test Recipe');
  });

  it('displays the recipe categories correctly', () => {
    const categories = wrapper.findAll('.category-bubble');
    expect(categories.length).toBe(2);
    expect(categories[0].text()).toBe('Category 1');
    expect(categories[1].text()).toBe('Category 2');
  });

  it('displays the username correctly', () => {
    expect(wrapper.find('.user-id p').text()).toBe('@');
  });

  it('displays the like button', () => {
    expect(wrapper.findComponent({ name: 'LikeButton' }).exists()).toBe(true);
  });
});
