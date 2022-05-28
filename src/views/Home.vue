<template>
  <div
    class="flex flex-col items-center justify-center gap-4 h-screen bg-zinc-900 text-white"
  >
    <h1 class="font-black text-4xl">Bienvido a Journal</h1>
    <div class="flex items-center justify-center gap-4">
      <button
        @click="enterJournal"
        class="font-semibold rounded-lg px-6 py-2 bg-green-700 hover:bg-green-800"
      >
        Entrar
      </button>
      <a href="#TODOAgregarGithubXD" class="font-semibold">Github</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  methods: {
    enterJournal() {
      this.$router.push({ name: "noEntry" });
    },
  },
};
</script>

<style></style>
