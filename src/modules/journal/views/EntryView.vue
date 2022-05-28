<template>
  <div class="flex items-center justify-between">
    <h1 class="flex items-center gap-1">
      <span class="font-bold text-4xl text-green-800">27</span>
      <span>de mayo 2022,</span>
      <span>viernes</span>
    </h1>

    <div class="flex">
      <button class="rounded-lg px-4 py-2 bg-red-700 text-white">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>

  <textarea
    cols="30"
    rows="10"
    placeholder="Comienza a escribir..."
    class="textarea-screen custom-scroll resize-none outline-none mt-4 w-full"
  ></textarea>

  <Thumbanil :show="isVisible" />

  <Fab class="bottom-4 right-4" />
  <Fab icon="fa-image" class="bottom-4 right-20" @click="showImage" />
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

import Fab from "../components/Fab.vue";

export default {
  name: "NoEntryView",
  components: {
    Fab,
    Thumbanil: defineAsyncComponent(() =>
      import("../components/Thumbnail.vue")
    ),
  },

  data() {
    return {
      isVisible: false,
    };
  },

  methods: {
    showImage() {
      this.isVisible = !this.isVisible;
    },
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
