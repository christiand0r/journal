import rootStore from "@/store";

const isAuthGuard = async (to, from, next) => {
  const { ok } = await rootStore.dispatch("auth/checkAuthentication");

  ok ? next() : next({ name: "login" });
};

export default isAuthGuard;
