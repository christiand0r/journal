<template>
  <div class="flex flex-col items-center justify-center w-full z-10">
    <h1 class="text-center text-3xl font-bold mb-6 uppercase text-white">
      Registro
    </h1>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col items-center justify-center rounded-xl w-full max-w-md bg-white"
    >
      <div
        class="flex items-center justify-center gap-4 p-6 border-b w-full border-gray-300 text-gray-300 focus-within:border-green-600 focus-within:text-green-600"
      >
        <i class="fas fa-user"></i>
        <input
          v-model="userForm.name"
          type="text"
          placeholder="Usuario"
          required
          class="outline-none w-2/3 transition-width duration-300 text-zinc-800 focus:w-full"
        />
      </div>

      <div
        class="flex items-center justify-center gap-4 p-6 border-b w-full border-gray-300 text-gray-300 focus-within:border-green-600 focus-within:text-green-600"
      >
        <i class="fas fa-at"></i>
        <input
          v-model="userForm.email"
          type="email"
          placeholder="Correo"
          required
          class="outline-none w-2/3 transition-width duration-300 text-zinc-800 focus:w-full"
        />
      </div>

      <div
        class="flex items-center justify-center gap-4 p-6 border-b w-full border-gray-300 text-gray-300 focus-within:border-green-600 focus-within:text-green-600"
      >
        <i class="fas fa-lock"></i>
        <input
          v-model="userForm.password"
          type="password"
          placeholder="Contraseña"
          required
          class="outline-none w-2/3 transition-width duration-300 text-zinc-800 focus:w-full"
        />
      </div>

      <button
        type="submit"
        class="font-semibold rounded-full px-12 py-2 my-8 text-white bg-green-700 hover:bg-green-800"
      >
        Registrarse
      </button>

      <router-link :to="{ name: 'login' }" class="mb-8"
        >¿Ya tienes cuenta?</router-link
      >
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import notie from "notie";

import useAuth from "../composables/useAuth.js";

// Composables
const router = useRouter();
const { createUser } = useAuth();

// State
const userForm = ref({
  name: "",
  email: "",
  password: "",
});

// Methods
const handleSubmit = async () => {
  const { ok, message } = await createUser(userForm.value);

  if (!ok)
    return notie.alert({
      type: "error",
      text: message,
    });

  notie.alert({
    type: "success",
    text: "Redireccionando...",
  });

  router.push({ name: "noEntry" });
};
</script>

<style></style>
