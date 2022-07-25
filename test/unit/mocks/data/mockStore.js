import { createStore } from "vuex";

import auth from "@/modules/auth/store";
import journal from "@/modules/journal/store";

import { journalState } from "./journal-state";

const createVuexStore = (authInitState, journalInitState = journalState) =>
  createStore({
    modules: {
      auth: {
        ...auth,
        state: { ...authInitState },
      },
      journal: {
        ...journal,
        state: { ...journalInitState },
      },
    },
  });

export default createVuexStore;
