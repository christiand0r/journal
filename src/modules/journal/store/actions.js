import journalApi from "@/api/journalAPI";

// :Reference
// const myAction = async ({ commit }) => {}

export const getEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");

  // If data not exist return an empty array
  if (!data) return commit("setEntries", []);

  const entries = Object.keys(data).map((id) => ({ id, ...data[id] }));

  // Re-order the entries by the last modification
  entries.sort((a, b) => b.modified - a.modified);

  commit("setEntries", entries);
};

export const updateEntry = async ({ commit }, payload) => {
  // Extract id to not record as a property
  const { id, ...restEntry } = payload;

  // Add the modified property with the today date
  const data = {
    ...restEntry,
    modified: Date.now(),
  };

  // Send data to database
  await journalApi.put(`/entries/${id}.json`, data);

  // Break the reference and make the commit
  commit("updateEntry", { ...payload, modified: Date.now() });
};

export const createEntry = async ({ commit }, payload) => {
  // Send data to database
  const { data } = await journalApi.post(`/entries.json`, payload);

  payload.id = data.name;

  commit("addEntry", payload);

  return data.name;
};

export const deleteEntry = async ({ commit }, payload) => {
  await journalApi.delete(`/entries/${payload}.json`);

  commit("deleteEntry", { id: payload });
};
