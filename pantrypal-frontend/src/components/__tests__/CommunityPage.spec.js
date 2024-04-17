import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CommunityPage from '@/views/CommunityPage.vue';
import RecipeCard from '@/components/RecipeCard.vue'; 

describe('CommunityPage.vue', () => {
  let wrapper;

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


  beforeEach(() => {
    const dummyRecipe = {
      recipe_id: 1,
      recipe_name: 'Test Recipe',
      categories: ['Category 1', 'Category 2'],
    };

    wrapper = mount(CommunityPage, {
      data() {
        return {
          recipes: [dummyRecipe],
        };
      },
    });
  });

  it('renders recipe cards on the page', () => {
    expect(wrapper.find('.recipe-card').exists()).toBe(true);
  });
});

