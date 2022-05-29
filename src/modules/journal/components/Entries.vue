<template>
  <aside
    class="col-span-full order-2 p-2 md:col-span-2 xxl:col-span-1 md:order-1 bg-zinc-100"
  >
    <input
      type="text"
      v-model="term"
      placeholder="Buscar una entrada"
      class="rounded-lg mb-4 p-2 w-full outline-none focus:shadow-around"
    />
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

  computed: {
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
  height: calc(100% - 48px); /* 45px of Input + 8px of Padding*/
  overflow-y: auto;
}
</style>
