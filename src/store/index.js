import { createStore } from "vuex";

import auth from "../modules/auth/store";
import journal from "../modules/journal/store";

const store = createStore({
  modules: {
    auth,
    journal,
  },
});

export default store;
