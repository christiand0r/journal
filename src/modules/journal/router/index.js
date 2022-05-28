const children = [
  {
    path: "",
    name: "noEntry",
    component: () => import("../views/NoEntryView.vue"),
  },
  {
    path: ":id",
    name: "entry",
    component: () => import("../views/EntryView.vue"),
  },
];

export default {
  name: "journal",
  component: () => import("../layouts/Journal.vue"),
  children,
};
