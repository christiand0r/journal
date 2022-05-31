<template>
  <Loader v-if="loading" />

  <Header />
  <div class="grid grid-cols-5 xxl:grid-cols-6">
    <Entries />
    <main class="col-span-full order-1 p-4 md:col-span-3 xxl:col-span-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Loader from "../components/Loader.vue";
import Header from "../components/Header.vue";
import Entries from "../components/Entries.vue";

export default {
  name: "Journal",

  methods: {
    ...mapActions("journal", ["getEntries"]),
  },
  computed: {
    ...mapState("journal", ["loading"]),
  },

  async created() {
    await this.getEntries();
  },

  components: {
    Loader,
    Header,
    Entries,
  },
};
</script>

<style></style>
