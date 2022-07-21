const children = [
  {
    path: "",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
];

export default {
  name: "auth",
  component: () => import("../layouts/AuthLayout.vue"),
  children,
};
