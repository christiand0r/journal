import journalRouter from "@/modules/journal/router";

describe("Test in router module Journal", () => {
  test("The router must be this configuration", async () => {
    expect(journalRouter).toMatchObject({
      name: "journal",
      component: expect.any(Function),
      children: [
        {
          path: "",
          name: "noEntry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });

    // expect((await journalRouter.children[0].component()).default.name).toBe(
    //   "NoEntryView"
    // );

    // expect((await journalRouter.children[1].component()).default.name).toBe(
    //   "EntryView"
    // );

    const asyncComponents = journalRouter.children.map((el) => el.component());

    const routes = (await Promise.all(asyncComponents)).map(
      (el) => el.default.name
    );

    expect(routes).toContain("EntryView");
    expect(routes).toContain("NoEntryView");
  });

  test("Should be return id route", () => {
    const route = {
      params: {
        id: "ABC",
      },
    };

    const entryRoute = journalRouter.children.find((el) => el.name === "entry");

    expect(entryRoute.props(route)).toEqual({ id: "ABC" });
  });

  test("Should be return custom text", () => {
    const route = {
      params: {
        text: "Texto por propiedad",
      },
    };

    const entryRoute = journalRouter.children.find(
      (el) => el.name === "noEntry"
    );

    expect(entryRoute.props(route)).toEqual({ text: "Texto por propiedad" });
  });
});
