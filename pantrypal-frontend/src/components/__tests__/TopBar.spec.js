import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TopBar from "@/components/TopBar.vue";
import { useRouter } from "vue-router";

describe("TopBar.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(TopBar, {
      propsData: {
        whichPage: "feed",
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  let $routerMock = {
    push: vi.fn(),
  };
  beforeEach(() => {
    $routerMock.push.mockReset(); // reset the mock between test cases
  });
  //### logo routing
  it("redirects to community page when PantryPal Logo button is clicked ", async () => {
    const wrapper = mount(TopBar, {
      propsData: {
        whichPage: "feed",
      },
      global: {
        mocks: {
          $router: $routerMock,
        },
      },
    });
    await wrapper.find(".firstContainer").trigger("click");
    expect($routerMock.push).toHaveBeenCalledWith("/community-page");
  });

  //### MyFeed and Smart LeftOvers
  it('redirects to community page when "My Feed" button is clicked when page is in feed', async () => {
    const wrapper = mount(TopBar, {
      propsData: {
        whichPage: "feed",
      },
      global: {
        mocks: {
          $router: $routerMock,
        },
      },
    });
    await wrapper
      .find(".secondContainer .custom-button:first-of-type")
      .trigger("click");
    expect($routerMock.push).toHaveBeenCalledWith("/community-page");
  });
  it('redirects to community page when "My Feed" button is clicked when page is in generator', async () => {
    const wrapper = mount(TopBar, {
      propsData: {
        whichPage: "generator",
      },
      global: {
        mocks: {
          $router: $routerMock,
        },
      },
    });
    await wrapper
      .find(".secondContainer .custom-button:first-of-type")
      .trigger("click");
    expect($routerMock.push).toHaveBeenCalledWith("/community-page");
  });
  it('redirects to generator page when "Smart Leftovers" button is clicked when page is in feed', async () => {
    const wrapper = mount(TopBar, {
      propsData: {
        whichPage: "feed",
      },
      global: {
        mocks: {
          $router: $routerMock,
        },
      },
    });
    await wrapper
      .find(".secondContainer .custom-button:nth-of-type(2)")
      .trigger("click");
    expect($routerMock.push).toHaveBeenCalledWith("/recipe-generator");
  });
  it('redirects to generator page when "Smart Leftovers" button is clicked when page is in generator', async () => {
    const wrapper = mount(TopBar, {
      propsData: {
        whichPage: "generator",
      },
      global: {
        mocks: {
          $router: $routerMock,
        },
      },
    });
    await wrapper
      .find(".secondContainer .custom-button:nth-of-type(2)")
      .trigger("click");

    expect($routerMock.push).toHaveBeenCalledWith("/recipe-generator");
  });

  //profilePic
  it('redirects to profile page when "Profile" button is clicked', async () => {
    const wrapper = mount(TopBar, {
      propsData: {
        whichPage: "feed",
      },
      global: {
        mocks: {
          $router: $routerMock,
        },
      },
    });
    await wrapper.find(".profileButton").trigger("click");
    expect($routerMock.push).toHaveBeenCalledWith("/profile");
  });
  //test Visibility
  it("hides/shows navigation bar based on scrolling behavior", async () => {
    const wrapper = mount(TopBar, {
      propsData: {
        whichPage: "feed",
      },
    });

    // Simulate scrolling down
    expect(wrapper.classes()).not.toContain("topBar--hidden");
    window.scrollY = 150; // Set the scroll position
    window.dispatchEvent(new Event("scroll"));
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).toContain("topBar--hidden");

    // Simulate scrolling up
    window.scrollY = 100; // Set the scroll position
    window.dispatchEvent(new Event("scroll"));
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).not.toContain("topBar--hidden");
  });
});
