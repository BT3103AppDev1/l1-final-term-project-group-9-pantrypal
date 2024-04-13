import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import UserProfileEdit from '@/components/UserProfileEdit.vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import flushPromises from 'flush-promises';
import { db, auth } from '@/firebase.js'
import { doc, updateDoc, setDoc } from 'firebase/firestore';

vi.mock('@/firebase.js', () => {
    const updateDoc = vi.fn(() => Promise.resolve());
    const doc = vi.fn(() => ({ updateDoc }));
    const db = {
        doc: vi.fn(() => doc()),
      };
    const updatePassword = vi.fn(() => Promise.resolve());
    const reauthenticateWithCredential = vi.fn(() => Promise.resolve());
    const EmailAuthProvider = { credential: vi.fn() };
    const auth = {
        currentUser: {
          uid: '123',
          email: 'test@example.com'
        },
        updatePassword,
          reauthenticateWithCredential,
        EmailAuthProvider,
      };
    return {
        auth,
        db,
    };
  });

  vi.mock("firebase/firestore", () => ({
    doc: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn()
  }));
  
  vi.mock('vue-toastification', () => ({
    useToast: vi.fn(() => ({
      error: vi.fn(),
      success: vi.fn(),
    })),
  }));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('UserProfileEdit Component', () => {
  let wrapper;
  let toast;

  beforeEach(() => {
    toast = {
        success: vi.fn(),
        error: vi.fn()
      };
    wrapper = mount(UserProfileEdit, {
      props: {
        userData: {
          email: 'test@example.com',
          username: 'testuser',
        },
      },
      global: {
        mocks: {
          $router: useRouter(),
          $toast: toast,
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
        stubs: ['PasswordConfirmationModal']  
      }
    });
  });

  it('renders the component with initial data', () => {
    expect(wrapper.find('#email').element.value).toBe('test@example.com');
    expect(wrapper.find('#username').element.value).toBe('testuser');
  });

  it('updates username on form submission', async () => {
    const newUsername = 'newTestUser';
    await wrapper.find('#username').setValue(newUsername);
    await wrapper.find('.first-form').trigger('submit.prevent');
    
    await flushPromises();
    expect(doc).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalled();
  });

  it('handles password change with confirmation', async () => {
    await wrapper.setData({ newPassword: 'newpassword123', confirmPassword: 'newpassword123' });
    await wrapper.find('.second-form').trigger('submit.prevent');
    expect(wrapper.vm.showPasswordModal).toBe(true);
  });

  it('displays error toast when passwords do not match', async () => {
    await wrapper.setData({ newPassword: 'newpassword123', confirmPassword: 'newpassword124' });
    const NoMatchSpy = vi.spyOn(wrapper.vm, 'triggerToastPasswordNoMatch');
    await wrapper.find('.second-form').trigger('submit.prevent');
    await flushPromises();
    expect(NoMatchSpy).toHaveBeenCalled();
  });

  it('displays error toast when password fields are empty', async () => {
    await wrapper.setData({ newPassword: '', confirmPassword: '' });
    const EmptySpy = vi.spyOn(wrapper.vm, 'triggerToastPasswordTooShort');
    await wrapper.find('.second-form').trigger('submit.prevent');
    await flushPromises();
    expect(EmptySpy).toHaveBeenCalled();
  });
});
