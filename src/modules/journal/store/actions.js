import journalApi from "@/api/journalAPI";

// :Reference
// const myAction = async ({ commit }) => {}

export const getEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");

  const entries = Object.keys(data).map((key) => data[key]);

  commit("setEntries", entries);
};
