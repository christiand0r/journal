import { createStore } from "vuex";

import journal from "../modules/journal/store";

const store = createStore({
  modules: {
    journal,
  },
});

export default store;
