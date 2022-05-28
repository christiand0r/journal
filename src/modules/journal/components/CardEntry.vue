<template>
  <div
    @click="selectEntry"
    class="flex flex-col justify-center gap-4 rounded-lg cursor-pointer px-4 py-6 bg-white"
  >
    <h3 class="flex items-center gap-1 font-semibold text-xl">
      <span class="font-bold text-4xl text-green-800">27</span>
      <span>de mayo 2022,</span>
      <span>viernes</span>
    </h3>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, ipsum
      corrupti. Iure ipsum fugit molestiae, provident, magni suscipit placeat
      voluptates voluptate repellendus, aspernatur consectetur enim rerum!
      Quibusdam suscipit nam eligendi.
    </p>
  </div>
</template>

<script>
export default {
  name: "CardEntry",
};
</script>

<style></style>
