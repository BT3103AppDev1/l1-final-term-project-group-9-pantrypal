import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ProfileImage from '@/components/ProfileImage.vue';

describe('ProfileImage Component', () => {
  let wrapper;

  beforeEach(() => {
    const path = 'https://example.com/profile.jpg';
    const ifCard = true;

    wrapper = mount(ProfileImage, {
      props: {
        path,
        ifCard,
      },
    });
  });

  it('renders properly', () => {
    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('renders with the correct src when path is provided', () => {
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/profile.jpg');
  });

  it('renders with the default profile image when path is not provided', async () => {
    await wrapper.setProps({ path: '' });
    expect(wrapper.find('img').attributes('src')).toBe("@/assets/profile.svg");
  });
  
});
