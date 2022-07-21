// :Reference
// const myMutation = (state, payload) => {}

export const loginUser = (state, { user, token, refreshToken }) => {
  if (token) {
    state.token = token;
    localStorage.setItem("token", token);
  }

  if (refreshToken) {
    state.refreshToken = token;
    localStorage.setItem("refreshToken", refreshToken);
  }

  state.user = user;
  state.status = "authenticated";
};

export const logoutUser = (state) => {
  state.user = null;
  state.token = null;
  state.refreshToken = null;
  state.status = "not-authenticated";

  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};
