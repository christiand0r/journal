<template>
  <template v-if="entry">
    <div class="flex items-center justify-between">
      <h1 class="flex items-center gap-1" v-html="getDate"></h1>

      <div class="flex items-center gap-4">
        <button class="rounded-lg px-4 py-2 bg-red-700 text-white">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button
          @click="goToEntries"
          class="rounded-lg px-4 py-2 bg-zinc-900 text-white"
        >
          Volver
        </button>
      </div>
    </div>

    <textarea
      cols="30"
      rows="10"
      v-model="entry.text"
      placeholder="Comienza a escribir..."
      class="textarea-screen custom-scroll resize-none outline-none mt-4 w-full"
    ></textarea>

    <Thumbanil :show="isVisible" />

    <Fab @onClick="saveEntry" class="bottom-4 right-4" />
    <Fab @onClick="showImage" icon="fa-image" class="bottom-4 right-20" />
  </template>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";

import Fab from "../components/Fab.vue";

// HELPERS
import transformDate from "../helpers/transformDate.js";

export default {
  name: "NoEntryView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      entry: null,
      isVisible: false,
    };
  },

  methods: {
    loadEntry() {
      const entry = this.getEntryById(this.id);

      if (!entry) {
        return this.$router.push({
          name: "noEntry",
          params: { text: "Ups.. parece que la entrada no existe" },
        });
      }

      this.entry = entry;
    },

    async saveEntry() {
      console.log("Guardando entrada...");
    },

    showImage() {
      this.isVisible = !this.isVisible;
    },

    goToEntries() {
      this.$router.push({
        name: "noEntry",
      });
    },
  },

  computed: {
    getDate() {
      const { day, month, number, year } = transformDate(this.entry.date);

      return `
      <span class="font-bold text-4xl text-green-800">${number}</span>
      <span>de ${month} ${year},</span>
      <span>${day}</span>`;
    },
    ...mapGetters("journal", ["getEntryById"]),
  },

  watch: {
    id() {
      this.loadEntry();
    },
  },

  created() {
    this.loadEntry();
  },

  components: {
    Fab,
    Thumbanil: defineAsyncComponent(() =>
      import("../components/Thumbnail.vue")
    ),
  },
};
</script>

<style scoped>
.textarea-screen {
  /* 40px of firts div + 16px of textarea margin 
  + 56px of FAB + 16px for set a separation = 128px */
  height: calc(100% - 128px);
}
</style>
