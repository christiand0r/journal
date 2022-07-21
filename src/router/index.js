import { createRouter, createWebHashHistory } from "vue-router";

import isAuthGuard from "../modules/auth/guards/authGuard";

import journalPath from "../modules/journal/router";
import authPath from "../modules/auth/router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/journal",
    beforeEnter: [isAuthGuard],
    ...journalPath,
  },
  {
    path: "/auth",
    ...authPath,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
