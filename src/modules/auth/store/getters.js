// :Reference
// const myGetter = (state) => {}

export const currentStateAuth = (state) => {
  return state.status;
};

export const currentUser = (state) => {
  return state.user?.name || "";
};
