<template>
  <Header />
  <div class="grid grid-cols-5">
    <Entries />
    <main class="col-span-full order-1 p-4 md:col-span-3 xxl:col-span-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Entries from "../components/Entries.vue";

export default {
  name: "Journal",

  components: {
    Header,
    Entries,
  },
};
</script>

<style></style>
