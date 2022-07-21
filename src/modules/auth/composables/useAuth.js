import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
  const store = useStore();

  const createUser = async (user) =>
    await store.dispatch("auth/createUser", user);

  const loginUser = async (user) =>
    await store.dispatch("auth/singInUser", user);

  const checkAuthStatus = async () =>
    await store.dispatch("auth/checkAuthentication");

  const logoutUser = () => {
    store.commit("auth/logoutUser");
    store.commit("journal/clearEntries");
  };

  return {
    checkAuthStatus,
    createUser,
    loginUser,
    logoutUser,

    authStatus: computed(() => store.getters["auth/currentStateAuth"]),
    username: computed(() => store.getters["auth/currentUser"]),
  };
};

export default useAuth;
