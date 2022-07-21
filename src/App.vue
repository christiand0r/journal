<template>
  <router-view />
</template>

<script setup>
import useAuth from "./modules/auth/composables/useAuth";

const { checkAuthStatus } = useAuth();

checkAuthStatus();
</script>
