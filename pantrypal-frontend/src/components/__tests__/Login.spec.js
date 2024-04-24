import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import { auth } from "@/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

vi.mock('@/firebase.js', () => ({
  auth: { signInWithEmailAndPassword: vi.fn() }
}));

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn()
}));

let wrapper;
beforeEach(() => {
  wrapper = mount(Login, {
    global: {
      mocks: {
        $router: {
          push: vi.fn()
        }
      }
    }
  });
});

describe('Login.vue', () => {
    it('renders the login form', () => {
        expect(wrapper.find('.login-form-container').exists()).toBe(true);
        expect(wrapper.find('input#email').exists()).toBe(true);
        expect(wrapper.find('button.btn-login').text()).toBe('Log In');
      });

      it('logs in the user and navigates to the community page on successful login', async () => {
        const pushMock = vi.fn();
        wrapper.vm.$router.push = pushMock;
        signInWithEmailAndPassword.mockResolvedValue();
      
        await wrapper.find('input#email').setValue('user@example.com');
        await wrapper.find('input#password').setValue('password123');
        await wrapper.find('.login-form').trigger('submit.prevent');
        await flushPromises();
      
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'user@example.com', 'password123');
        expect(pushMock).toHaveBeenCalledWith('/community-page');
      });
      
      it('displays an error message when login credentials are invalid', async () => {
        signInWithEmailAndPassword.mockRejectedValue(new Error('Invalid login credentials'));
        
        await wrapper.find('input#email').setValue('wrong@example.com');
        await wrapper.find('input#password').setValue('wrongpassword');
        await wrapper.find('.login-form').trigger('submit.prevent');
        await flushPromises();
      
        expect(wrapper.text()).toContain('Invalid login credentials. Please try again.');
      });
      
})