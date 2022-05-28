<template>
  <div :class="toggleImage">
    <div class="relative">
      <img
        src="https://placeimg.com/1080/720/any"
        alt="Thumbnail Image"
        class="max-w-full"
      />

      <button
        class="absolute bottom-0 p-1 w-full opacity-0 group-hover:opacity-100 bg-zinc-900 bg-opacity-30 text-white transition-opacity"
      >
        Cambiar imagen
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Thumbnail Image",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    toggleImage() {
      return this.show
        ? "group fixed -right-64 bottom-24 border rounded-lg p-2 w-60 border-gray-100 transition-all"
        : "group fixed right-4 bottom-24 border rounded-lg p-2 w-60 border-gray-100 transition-all";
    },
  },
};
</script>

<style></style>
