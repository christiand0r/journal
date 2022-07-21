<template>
  <header class="flex items-center justify-between px-4 py-2 bg-zinc-900">
    <router-link :to="{ name: 'journal' }" class="w-32">
      <img src="@/assets/logo_white.png" alt="Journal" />
    </router-link>

    <div class="flex items-center justify-between gap-6 text-white">
      <h3 class="font-medium text-xl">Hola, {{ username }}</h3>
      <button
        @click="onLogout"
        class="border-2 cursor-pointer rounded-lg px-4 py-2 border-white text-white"
      >
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import useAuth from "@/modules/auth/composables/useAuth.js";

const router = useRouter();

const { username, logoutUser } = useAuth();

const onLogout = () => {
  router.push({ name: "Home" });

  logoutUser();
};
</script>

<style></style>
