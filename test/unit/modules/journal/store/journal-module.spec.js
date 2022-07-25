import { expect, beforeAll } from "vitest";

import { createStore } from "vuex";

import authApi from "@/api/authAPI";

import journal from "@/modules/journal/store";

import { journalState } from "../../../mocks/data/journal-state";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe("Vuex - Test in Journal Store", () => {
  beforeAll(async () => {
    const { data } = await authApi.post(":signInWithPassword", {
      email: "test@test.com",
      password: "123456",
      returnSecureToken: true,
    });

    localStorage.setItem("token", data.idToken);
  });

  test("Must be have this initial State", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeTruthy();
    expect(entries).toHaveLength(0);
  });

  test("Must be have this state", () => {
    const store = createVuexStore(journalState);

    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // @Mutations
  test("Mutation: setEntries", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    store.commit("journal/setEntries", journalState.entries);

    expect(store.state.journal.entries).toHaveLength(2);
  });

  test("Mutation: updateEntry", () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: "-N4sGjAj9kqQj1LnfAVr",
      date: 1655580291002,
      modified: 1655580291002,
      text: "Entrada actualizada",
    };

    store.commit("journal/updateEntry", updatedEntry);

    const entries = store.state.journal.entries;

    expect(entries).toHaveLength(2);

    expect(entries.find((entry) => entry.id === updatedEntry.id).text).toBe(
      "Entrada actualizada"
    );
  });

  test("Mutation: addEntry", () => {
    const store = createVuexStore(journalState);

    const entry = {
      id: "abc123",
      date: 1653891439812,
      modified: 1653893179216,
      text: "Probando addEntry",
    };

    store.commit("journal/addEntry", entry);

    const entries = store.state.journal.entries;

    expect(entries).toHaveLength(3);

    // Search the entry added and verify is really exist
    expect(entries.find((e) => e.id === entry.id).id).toBe("abc123");
  });

  test("Mutation: deleteEntry", () => {
    const store = createVuexStore(journalState);

    store.commit("journal/deleteEntry", journalState.entries[0]);

    const entries = store.state.journal.entries;

    expect(entries).toHaveLength(1);
  });

  // @Getters
  test("Getter: getEntriesByTerm", () => {
    const store = createVuexStore(journalState);

    expect(store.getters["journal/getEntriesByTerm"]("")).toHaveLength(2);

    // Use unique term for obtain one entry
    expect(store.getters["journal/getEntriesByTerm"]("Segunda")).toHaveLength(
      1
    );
  });

  test("Getter: getEntryById", () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    expect(
      store.getters["journal/getEntryById"]("-N3IbEuR_IEtIJDy4osY")
    ).toEqual(entry1);
  });

  // @Actions

  test("Actions: getEntries", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    await store.dispatch("journal/getEntries");

    const entries = store.state.journal.entries;

    expect(entries).toHaveLength(2);
  });

  test("Actions: updateEntry", async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: "-N3IbEuR_IEtIJDy4osY",
      date: 1653891439812,
      modified: 1653893179216,
      text: "Entrada editada desde testing",
      other: "Este campo no debería grabarse",
    };

    await store.dispatch("journal/updateEntry", updatedEntry);

    const entries = store.state.journal.entries;

    expect(entries).toHaveLength(2);

    expect(entries.find((entry) => entry.id === updatedEntry.id)).not.toEqual({
      id: "-N3IbEuR_IEtIJDy4osY",
      date: 1653891439812,
      modified: 1653893179216,
      text: "Entrada editada desde testing",
    });
  });

  test("Actions: createEntry and deleteEntry", async () => {
    const store = createVuexStore(journalState);

    const now = Date.now();

    const newEntry = {
      date: now,
      modified: now,
      text: "Entrada creada desde testing",
    };

    const newEntryId = await store.dispatch("journal/createEntry", newEntry);

    const entries = store.state.journal.entries;

    expect(newEntryId).toBeTypeOf("string");

    expect(entries.length).toBeGreaterThan(2);

    expect(entries.find((entry) => entry.id === newEntryId)).toEqual(newEntry);

    await store.dispatch("journal/deleteEntry", newEntryId);

    expect(store.state.journal.entries).toHaveLength(2);

    expect(
      store.state.journal.entries.find((entry) => entry.id === newEntryId)
    ).toBeFalsy();
  });
});
