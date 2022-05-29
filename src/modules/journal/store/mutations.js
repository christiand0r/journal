// :Reference
// const myMutation = (state, payload) => {}

export const setEntries = (state, payload) => {
  state.entries = [...state.entries, ...payload];
  state.loading = false;
};
