import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import SignUp from '@/views/SignUp.vue';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { nextTick } from 'vue';

vi.mock('@/firebase.js', () => {
  const authMock = {
    currentUser: { uid: '123' }
  };
  const dbMock = {};
  return { auth: authMock, db: dbMock };
});

vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn()
}));

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(),
  setDoc: vi.fn()
}));

let wrapper;
beforeEach(() => {
  wrapper = mount(SignUp, {
    global: {
      mocks: {
        $router: {
          push: vi.fn()
        }
      }
    }
  });
});

describe("SignUp.vue", () => {
    it('renders the sign-up form', () => {
        expect(wrapper.find('.signup-form-container').exists()).toBe(true);
        expect(wrapper.find('input#email').exists()).toBe(true);
        expect(wrapper.find('button.btn-signup').text()).toBe('Sign Up');
      })

      it('registers a new user and navigates to community page on success', async () => {
        const pushMock = vi.fn();
        wrapper.vm.$router.push = pushMock;
        createUserWithEmailAndPassword.mockImplementation(() => Promise.resolve());
      
        await wrapper.find('input#email').setValue('test@example.com');
        await wrapper.find('input#username').setValue('testuser');
        await wrapper.find('input#password').setValue('password123');
        await wrapper.find('input#confirm-password').setValue('password123');
        await wrapper.find('.signup-form').trigger('submit.prevent');
        await flushPromises();
      
        expect(createUserWithEmailAndPassword).toHaveBeenCalled();
        expect(pushMock).toHaveBeenCalledWith('/community-page');
      })

      it('displays an error if passwords do not match', async () => {
        await wrapper.find('input#password').setValue('password123');
        await wrapper.find('input#confirm-password').setValue('password1234');
        await wrapper.find('.signup-form').trigger('submit.prevent');
        await nextTick();
      
        expect(wrapper.vm.error).toBe('Passwords do not match.');
      });
           
      it('handles "email already in use" error', async () => {
        createUserWithEmailAndPassword.mockImplementation(() => Promise.reject({
          code: 'auth/email-already-in-use'
        }));
      
        await wrapper.find('input#email').setValue('test@example.com');
        await wrapper.find('input#password').setValue('password123');
        await wrapper.find('input#confirm-password').setValue('password123');
        await wrapper.find('.signup-form').trigger('submit.prevent');
        await flushPromises();
      
        expect(wrapper.text()).toContain('This email is already in use. Please use a different email.');
      });      
})
