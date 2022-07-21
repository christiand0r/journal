// :Reference
// const myMutation = (state, payload) => {}

export const setEntries = (state, payload) => {
  state.entries = [...state.entries, ...payload];
  state.loading = false;
};

export const updateEntry = (state, payload) => {
  state.loading = true;

  const entries = state.entries.filter((entry) => entry.id !== payload.id);
  state.entries = [payload, ...entries];

  state.loading = false;
};

export const addEntry = (state, payload) => {
  state.loading = true;

  state.entries = [payload, ...state.entries];

  state.loading = false;
};

export const deleteEntry = (state, payload) => {
  state.loading = true;

  const entries = state.entries.filter((entry) => entry.id !== payload.id);
  state.entries = [...entries];

  state.loading = false;
};

export const clearEntries = (state) => (state.entries = []);
