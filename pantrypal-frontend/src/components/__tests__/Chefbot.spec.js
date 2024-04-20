import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import ChefBot from '@/components/ChefBot.vue';

vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { data: 'Mock response' } })),
  },
}));

describe('ChefBot', () => {
    let wrapper;
  
    beforeEach(() => {
        Element.prototype.scrollTo = () => {} 

        wrapper = mount(ChefBot, {
            propsData: {
            selectedRecipe: {
                recipe_name: 'Test Recipe',
            },
            },
        });
      
    });

    it('does not send an empty message', async () => {
        await wrapper.find('form').trigger('submit.prevent');
        expect(wrapper.vm.messages.length).toBe(1);
    });

    it('should display the initial message', () => {
        const initialMessage = `Welcome to ChefBot! Let's get cooking with your selected recipe: Test Recipe. Do you have any questions?`;
        expect(wrapper.text()).toContain(initialMessage);
    });

    it('should send a message and receive a response', async () => {
        const userMessage = 'How do I make this recipe?';
        wrapper.find('.messageInput').setValue(userMessage);
        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.text()).toContain(userMessage);
        
        expect(axios.post).toHaveBeenCalledWith(
            'https://us-central1-pantrypal-e1225.cloudfunctions.net/api/chatbot',
            {
            message: userMessage,
            conversationHistory: [
                { role: 'assistant', content: 'Welcome to ChefBot! Let\'s get cooking with your selected recipe: Test Recipe. Do you have any questions?'},
                { role: 'user', content: userMessage },
                // { role: 'assistant', content: 'Mock response' },
            ],
            selectedRecipe: { recipe_name: 'Test Recipe' },
            }
        );
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('Mock response');
    });

    it('should scroll to the bottom of the message box', async () => {
        const userMessage = 'How do I make this recipe?';
        wrapper.find('.messageInput').setValue(userMessage);
        await wrapper.find('form').trigger('submit.prevent');

        const messageBox = wrapper.find('.messageBox').element;
        expect(messageBox.scrollHeight - messageBox.scrollTop).toBeLessThanOrEqual(messageBox.clientHeight);
    });

    it('should display the typing indicator', async () => {
        const userMessage = 'How do I make this recipe?';
        wrapper.find('.messageInput').setValue(userMessage);
        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.find('.typing-indicator').exists()).toBe(true);
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.typing-indicator').exists()).toBe(false);
    });
});