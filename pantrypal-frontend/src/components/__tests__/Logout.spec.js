import { describe, it, expect, vi, beforeEach } from 'vitest';
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

let wrapper;
beforeEach(() => {
    wrapper = mount(TopBar, {
        global: {
            mocks: {
                $router: useRouter(),
                $firestore: {
                    collection: vi.fn(() => ({
                        path: 'mockPath',
                        doc: vi.fn(() => ({
                            id: 'mockDocId',
                            collection: vi.fn(),
                        })),
                    })),
                },
            },
            stubs: ['ProfileImage']  // Stub any child components
        }
    });
});

describe('TopBar Component', () => {

    it('renders the logout button', () => {
        const logoutButton = wrapper.find('.logOutButton');
        expect(logoutButton.exists()).toBe(true);  // Assert the button is present
    });

    it('calls logout on logout button click', async () => {
        // Spy on logout method
        const logoutSpy = vi.spyOn(wrapper.vm, 'logout');
        
        // Trigger the logout button click
        await wrapper.find('.logOutButton').trigger('click');

        // Assert logout method was called
        expect(logoutSpy).toHaveBeenCalled();
        await flushPromises();

        // Assert that router and localStorage actions were called as expected
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/');
        expect(localStorage.clear).toHaveBeenCalled();
    });
});
