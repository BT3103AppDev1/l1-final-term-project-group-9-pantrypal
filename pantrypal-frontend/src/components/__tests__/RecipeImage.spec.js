import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeImage from '@/components/RecipeImage.vue';

describe('RecipeImage', () => {
    it('renders card image when ifCard is true', async () => {
        // Mount the component with ifCard set to true
        const wrapper = mount(RecipeImage, {
            props: {
                path: 'path/to/image.jpg',
                ifCard: true,
            },
        });

        // Ensure that the card image is rendered
        expect(wrapper.find('.card').exists()).toBe(true);
        expect(wrapper.find('.window').exists()).toBe(false);
    });

    it('renders window image when ifCard is false', async () => {
        // Mount the component with ifCard set to false
        const wrapper = mount(RecipeImage, {
            props: {
                path: 'path/to/image.jpg',
                ifCard: false,
            },
        });

        // Ensure that the window image is rendered
        expect(wrapper.find('.card').exists()).toBe(false);
        expect(wrapper.find('.window').exists()).toBe(true);
    });
});