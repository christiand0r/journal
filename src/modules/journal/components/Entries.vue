<template>
  <aside
    class="col-span-full order-2 p-2 md:col-span-2 xxl:col-span-1 md:order-1 bg-zinc-100"
  >
    <div class="flex flex-col gap-x-4 gap-y-2 mb-4 xl:flex-row">
      <input
        type="text"
        v-model="term"
        placeholder="Buscar una entrada"
        class="rounded-lg p-2 w-full outline-none focus:shadow-around"
      />

      <button
        @click="newEntry"
        v-if="entrySelected"
        class="font-semibold flex items-center justify-center gap-2 rounded-lg px-4 py-2 w-full xl:w-2/3 bg-green-700 text-white hover:bg-green-800"
      >
        <i class="fas fa-plus-circle"></i>
        Nueva entrada
      </button>
    </div>
    <div class="scrollable-area flex flex-col gap-4 custom-scroll">
      <CardEntry
        v-for="entry of entriesByTerm"
        :key="entry.id"
        :entry="entry"
      />
    </div>
  </aside>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";

export default {
  name: "AsideEntries",

  data() {
    return {
      term: "",
    };
  },

  methods: {
    newEntry() {
      this.$router.push({ name: "entry", params: { id: "new" } });
    },
  },

  computed: {
    entrySelected() {
      // If not exist id param don't show button next to of input
      if (!this.$route.params?.id) return false;

      return this.$route.params.id && true;
    },

    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
    ...mapGetters("journal", ["getEntriesByTerm"]),
  },

  components: {
    CardEntry: defineAsyncComponent(() =>
      import("../components/CardEntry.vue")
    ),
  },
};
</script>

<style scoped>
aside {
  height: calc(100vh - 75px); /* 75px of Header */
}

.scrollable-area {
  height: calc(100% - 96px); /* 88px of Input and Button + 8px of Padding */
  overflow-y: auto;
}

@media (min-width: 1280px) {
  .scrollable-area {
    height: calc(100% - 48px); /* The same calculation as above */
  }
}
</style>
