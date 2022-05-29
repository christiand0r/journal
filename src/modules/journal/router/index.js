const children = [
  {
    path: "",
    name: "noEntry",
    component: () => import("../views/NoEntryView.vue"),
    props: (route) => {
      return {
        text: route.params.text,
      };
    },
  },
  {
    path: ":id",
    name: "entry",
    component: () => import("../views/EntryView.vue"),
    props: (route) => {
      return {
        id: route.params.id,
      };
    },
  },
];

export default {
  name: "journal",
  component: () => import("../layouts/Journal.vue"),
  children,
};
