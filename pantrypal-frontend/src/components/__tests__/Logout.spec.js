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
            stubs: ['ProfileImage']  
        }
    });
});

describe('TopBar Component', () => {

    it('renders the logout button', () => {
        const logoutButton = wrapper.find('.logOutButton');
        expect(logoutButton.exists()).toBe(true);  
    });

    it('calls logout on logout button click', async () => {
        const logoutSpy = vi.spyOn(wrapper.vm, 'logout');
        
        await wrapper.find('.logOutButton').trigger('click');

        expect(logoutSpy).toHaveBeenCalled();
        await flushPromises();

        expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/');
        expect(localStorage.clear).toHaveBeenCalled();
    });
});
