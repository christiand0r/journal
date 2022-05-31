<template>
  <div class="flex flex-col items-center justify-center gap-8 h-full">
    <h1 class="font-semibold text-center text-4xl">
      {{ siwtchMessage }}
    </h1>
    <div class="w-1/2">
      <img
        src="@/assets/illustrations/typewriter.svg"
        alt="Escritores"
        class="max-w-full"
      />
    </div>
  </div>

  <Fab @onClick="newEntry" icon="fa-plus" class="bottom-4 right-4" />
</template>

<script>
import { mapState } from "vuex";
import Fab from "../components/Fab.vue";

export default {
  name: "NoEntryView",

  props: {
    text: {
      type: String,
      default: "Escoge o crea una entrada para comenzar",
    },
  },

  methods: {
    newEntry() {
      this.$router.push({ name: "entry", params: { id: "new" } });
    },
  },

  computed: {
    siwtchMessage() {
      return this.entries.length > 0
        ? this.text
        : "Crea tu primera entrada para comenzar";
    },
    ...mapState("journal", ["entries"]),
  },

  components: {
    Fab,
  },
};
</script>

<style></style>
