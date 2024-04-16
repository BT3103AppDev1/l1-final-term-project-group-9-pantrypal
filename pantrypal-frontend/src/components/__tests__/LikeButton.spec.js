import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LikeButton from '@/components/LikeButton.vue';

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
    const setDoc = vi.fn(() => {});

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

  it('renders properly', () => {
    expect(wrapper.find('.like-button').exists()).toBe(true);
  });

  it('changes colour when clicked', async () => {
    await wrapper.find('.like-button').trigger('click');
    expect(wrapper.find('.fa').classes()).toContain('liked');
  });

  it('increases the like count when clicked if not in liked recipes', async () => {
    await wrapper.find('.like-button').trigger('click');
    expect(wrapper.find('span').text()).toBe('6');
  });
});
