import { createRouter, createWebHashHistory } from "vue-router";

import journalPath from "../modules/journal/router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/journal",
    ...journalPath,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
