import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import UserProfileEdit from '@/components/UserProfileEdit.vue';
import UserProfileSidebar from '@/components/UserProfileSidebar.vue';
import { useRouter } from 'vue-router';
import flushPromises from 'flush-promises';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';


vi.mock('@/firebase.js', () => {
    const updateDoc = vi.fn(() => Promise.resolve());
    const doc = vi.fn(() => ({ updateDoc }));
    const storage = {
      ref: vi.fn(() => mockStorageRef)
    };
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
        storage
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

vi.mock('firebase/storage', () => {
  const getDownloadURL = vi.fn(() => Promise.resolve('https://example.com/photo.jpg'));

  const uploadBytesResumable = vi.fn((storageRef, file) => {
    const mockSnapshot = { ref: { getDownloadURL } };
    return {
      snapshot: mockSnapshot,
      on: (event, progress, error, complete) => {
        if (event === 'state_changed') {
          progress({ bytesTransferred: file.size, totalBytes: file.size });
        }
        complete();
      }
    };
  });

  return { ref: vi.fn(), uploadBytesResumable, getDownloadURL };
});





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

describe('UserProfileSidebar Component', () => {
  let wrapper;
  let toast;
  let storage;

  beforeEach(() => {
    toast = {
      success: vi.fn(),
      error: vi.fn()
    };
    storage = {
      ref: vi.fn(() => mockStorageRef)
    };
    wrapper = mount(UserProfileSidebar, {
      props: {
        selected: 'settings',
        userData: {
          username: 'testuser',
          profile_img_url: 'https://example.com/oldphoto.jpg'
        },
      },
      global: {
        mocks: {
          $router: useRouter(),
          $toast: toast,
          $storage: storage,
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

  it('uploads a new profile picture and updates the user data', async () => {
    const file = new File(['content'], 'photo.jpg', { type: 'image/jpeg' });
    const fileInput = wrapper.find('input[type="file"]');
  
    // Trigger file input selection
    await wrapper.vm.onFileSelected({ target: { files: [file] } });
  
    // Wait for async operations to complete, including our simulated upload delay
    await flushPromises();
  
    // Assertions
    expect(uploadBytesResumable).toHaveBeenCalled();
    expect(getDownloadURL).toHaveBeenCalled();
    expect(wrapper.vm.profilePicUrl).toBe('https://example.com/photo.jpg');
  });
});