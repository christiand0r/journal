import authApi from "@/api/authAPI";

// :Reference
// const myAction = async ({ commit }) => {}

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;

  try {
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken: token, refreshToken } = data;

    await authApi.post(":update", {
      idToken: token,
      displayName: name,
    });

    delete user.password;

    commit("loginUser", { user, token, refreshToken });

    return { ok: true };
  } catch (error) {
    const { code, message } = error.response.data.error;

    return {
      code,
      message,
      ok: false,
    };
  }
};

export const singInUser = async ({ commit }, user) => {
  const { email, password } = user;

  try {
    const { data } = await authApi.post(":signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken: token, refreshToken, displayName } = data;

    user.name = displayName;
    delete user.password;

    commit("loginUser", { user, token, refreshToken });

    return { ok: true };
  } catch (error) {
    console.error(error);

    const { code, message } = error.response.data.error;

    return {
      code,
      message,
      ok: false,
    };
  }
};

export const checkAuthentication = async ({ commit }) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!token) {
    commit("logoutUser");

    return { ok: false, message: "Token no encontrado" };
  }

  try {
    const { data } = await authApi.post(":lookup", { idToken: token });

    const [{ displayName, email }] = data.users;

    const user = {
      email,
      name: displayName,
    };

    commit("loginUser", { user, token, refreshToken });

    return { ok: true };
  } catch (error) {
    console.error(error);

    const { message } = error.response.data.error;

    commit("logoutUser");

    return { ok: false };
  }
};
