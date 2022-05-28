<template>
  <button
    class="flex items-center justify-center fixed rounded-lg w-14 h-14 bg-green-700 text-white"
  >
    <i :class="`fas fa-2xl ${icon}`"></i>
  </button>
</template>

<script>
export default {
  name: "Fab",
  props: {
    icon: {
      type: String,
      default: "fa-save",
    },
  },
};
</script>

<style></style>
