import { shallowMount } from "@vue/test-utils";

import Fab from "@/modules/journal/components/Fab.vue";
import { expect } from "vitest";

describe("Test in Fab Components", () => {
  test("Should show the default icon if not pass the property", () => {
    const wrapper = shallowMount(Fab);

    const icon = wrapper.find("i");

    expect(icon.classes("fa-save")).toBeTruthy();
  });

  test("If prop icon is send must be show that icon", () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: "fa-plus",
      },
    });

    const icon = wrapper.find("i");

    expect(icon.classes("fa-plus")).toBeTruthy();
  });

  test('Custom event "onClick" should be emitted on click', () => {
    const wrapper = shallowMount(Fab);

    wrapper.find("button").trigger("click");

    expect(wrapper.emitted("onClick")).toHaveLength(1);
  });
});
