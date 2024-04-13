import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TopBar from '@/components/TopBar.vue'; 
import flushPromises from 'flush-promises';
import { useRouter } from 'vue-router';

vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  }));

  global.localStorage = {
    getItem: vi.fn(),
    clear: vi.fn(),
  };


describe('TopBar Component', () => {
  it('calls logout on logout button click', async () => {
    const signOut = vi.fn(() => Promise.resolve());

    const firestore = {
        collection: vi.fn(() => ({
          path: 'mockPath',
          doc: vi.fn(() => ({
            id: 'mockDocId',
            collection: vi.fn(),
          })),
        })),
        signOut
      };

      const router = useRouter();
  
    const wrapper = mount(TopBar, {
      global: {
        mocks: {
          $router: router,
          $firestore: firestore,
        },
        stubs: ['ProfileImage'] 
      }
    });

    // Spy on logout method
    const logoutSpy = vi.spyOn(wrapper.vm, 'logout');
    
    // Trigger the logout button click
    await wrapper.find('.logOutButton').trigger('click');

    // Assert logout method was called
    expect(logoutSpy).toHaveBeenCalled();
    await flushPromises()

    expect(router.push).toHaveBeenCalledWith('/');
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
