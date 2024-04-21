import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import UserProfileStats from '@/components/UserProfileStats.vue';

describe('UserProfileStats', () => {
  it('renders a pie chart for favourite categories of liked recipes', () => {
    const wrapper = mount(UserProfileStats, {
      data() {
        return {
          categoryList: {
            Asian: 10,
            Western: 8,
            Desserts: 5,
            Beverages: 3,
          },
        };
      },
    });

    const pieChart = wrapper.find('.pie-category-liked');
    expect(pieChart.exists()).toBe(true);
  });

  it('renders a column chart for the number of recipes created', async () => {
    const wrapper = mount(UserProfileStats, {
      data() {
        return {
          recipesCreatedData: [['Jan', 5], ['Feb', 8], ['Mar', 12]],
        };
      },
    });

    await nextTick();
    const columnChart = wrapper.find('column-chart');
    expect(columnChart.exists()).toBe(true);
  });

  it('renders a bar chart for leftovers for the past month', () => {
    const wrapper = mount(UserProfileStats, {
      data() {
        return {
          leftoverPastMonth: {
            Chicken: 10,
            Pasta: 8,
            Salad: 5,
            Soup: 3,
          },
        };
      },
    });

    const barChart = wrapper.find('bar-chart');
    expect(barChart.exists()).toBe(true);
  });
});
