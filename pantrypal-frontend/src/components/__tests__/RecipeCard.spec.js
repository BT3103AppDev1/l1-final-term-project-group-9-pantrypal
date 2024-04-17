import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';

import RecipeCard from '@/components/RecipeCard.vue'; 

describe('RecipeCard.vue', () => {
    let router;

    beforeEach(() => {
      router = createRouter({
        history: createMemoryHistory(),
        routes: [
          {
            path: '/recipe/:id',
            name: 'RecipeDetailsPage',
            component: {
              template: '<div>Recipe Details Page</div>',
            },
          },
        ],
      });
    });
    
  it('displays recipe information correctly', () => {
    const recipe = {
      recipe_id: 1,
      recipe_name: 'Test Recipe',
      categories: ['Category 1', 'Category 2'],
      recipe_img_url: 'path/to/recipe/image.jpg',
      user_id: 123,
    };

    const wrapper = mount(RecipeCard, {
      propsData: {
        recipe: recipe,
      },
    });

    const recipeName = wrapper.find('.recipe-name');
    const categories = wrapper.findAll('.category-bubble');
    const recipeImage = wrapper.find('.recipe-image img');
    const likeButton = wrapper.find('.like-button');

    expect(recipeName.exists()).toBeTruthy();
    expect(recipeName.text()).toBe(recipe.recipe_name);
    expect(categories.length).toBe(recipe.categories.length);
    recipe.categories.forEach((category, index) => {
      expect(categories.at(index).text()).toBe(category);
    });
    expect(recipeImage.exists()).toBeTruthy();
    expect(recipeImage.attributes('src')).toBe(recipe.recipe_img_url);
    expect(likeButton.exists()).toBeTruthy();
  });
  
  it('redirects to individual recipe page on click', async () => {
    const recipe = {
      recipe_id: 1,
      recipe_name: 'Test Recipe',
    };

    const wrapper = mount(RecipeCard, {
      global: {
        plugins: [router],
      },
      props: {
        recipe: recipe,
      },
    });
    const pushSpy = vi.spyOn(router, 'push');
    await wrapper.trigger('click');
    expect(pushSpy).toHaveBeenCalledWith({ name: 'RecipeDetailsPage', params: { id: recipe.recipe_id } });
  });

});
