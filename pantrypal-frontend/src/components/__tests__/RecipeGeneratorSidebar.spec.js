import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RecipeGeneratorSidebar from '@/components/RecipeGeneratorSidebar.vue';

describe('RecipeGeneratorSidebar', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(RecipeGeneratorSidebar, {
        propsData: {
            selected: 'input'
        }
        });
    });

    it('renders the sidebar', () => {
        expect(wrapper.find('.sidebar')).toBeTruthy();
    });

    it('displays the "Input Leftovers" header when the "input" prop is selected', () => {
        expect(wrapper.find('.header.selected h3').text()).toBe('Input Leftovers');
    });

    it('displays the "Generate Recipe" header when the "generate" prop is selected', async () => {
        await wrapper.setProps({ selected: 'generate' });
        expect(wrapper.find('.header.selected h3').text()).toBe('Generate Recipe');
    });

    it('displays the "Save Recipe" header when the "save" prop is selected', async () => {
        await wrapper.setProps({ selected: 'save' });
        expect(wrapper.find('.header.selected h3').text()).toBe('Save Recipe');
    });
});