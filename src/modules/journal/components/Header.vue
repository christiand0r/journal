<template>
  <header class="flex items-center justify-between px-4 py-2 bg-zinc-900">
    <router-link :to="{ name: 'journal' }" class="w-32">
      <img src="@/assets/logo_white.png" alt="Journal" />
    </router-link>

    <button
      class="border-2 cursor-pointer rounded-lg px-4 py-2 border-white text-white"
    >
      <i class="fas fa-sign-out-alt"></i>
    </button>
  </header>
</template>

<script>
export default {
  name: "JournalHeader",
};
</script>

<style></style>
