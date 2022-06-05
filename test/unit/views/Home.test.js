import { shallowMount } from "@vue/test-utils";

// Components
import Home from "@/views/Home.vue";
import { expect } from "vitest";

describe("Test in the Home View", () => {
  test("Make a snapshot to Home", () => {
    const wrapper = shallowMount(Home);

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Click on button enter should redirect to "no-entry"', () => {
    const mockRouter = {
      push: vi.fn(),
    };

    const wrapper = shallowMount(Home, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.find("button").trigger("click");

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "noEntry" });
  });
});
