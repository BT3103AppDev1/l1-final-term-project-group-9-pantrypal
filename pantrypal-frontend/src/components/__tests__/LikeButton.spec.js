import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { mount } from '@vue/test-utils';
import LikeButton from '@/components/LikeButton.vue';
import { setDoc } from 'firebase/firestore';

describe('LikeButton Component', () => {
  let wrapper;

  beforeEach(() => {
    const recipe = {
      recipe_id: '123',
      like_count: 5,
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
    const setDoc = vi.fn(async (docRef, data) => {
      if (data.liked_recipes) {
        await docRef.update({ liked_recipes: data.liked_recipes });
      } else {
        await docRef.set({ ...data, liked_recipes: [data.recipe_id] });
      }
    });
    
    wrapper = mount(LikeButton, {
      props: {
        recipe,
      },
      global: {
        mocks: {
          $firestore: {
            auth,
            getDoc,
            setDoc,
          },
        },
      },
    });
  });

  it('clicking the like button should fill the button with a colour', async () => {
    expect(wrapper.find('.like-button').exists()).toBe(true);

    // changes colour when clicked
    await wrapper.find('.like-button').trigger('click');
    expect(wrapper.find('.fa').classes()).toContain('liked');

    // increases the like count when clicked if not in liked recipes
    expect(wrapper.find('span').text()).toBe('6');
  });

  it('should add the liked recipe to the user profile page or data upon clicking the like button', async () => {
    const setDocSpy = vi.spyOn(wrapper.vm, 'toggleLikeRecipe');
    await wrapper.find('.like-button').trigger('click');
    expect(setDocSpy).toHaveBeenCalled();
  });

  it('clicking a filled like button should allow the user to unlike the recipe and remove it from the liked collection', async () => {
    await wrapper.find('.like-button').trigger('click');
    expect(wrapper.find('.fa').classes()).toContain('liked');

    const toggleLikeRecipeSpy = vi.spyOn(wrapper.vm, 'toggleLikeRecipe');

    await wrapper.find('.like-button').trigger('click');
    expect(toggleLikeRecipeSpy).toHaveBeenCalled();
    // expect(wrapper.find('.fa').classes()).not.toContain('liked');
    expect(wrapper.find('span').text()).toBe('5');
  });

});
