<template>
  <div
    @click="selectEntry"
    class="flex flex-col justify-center gap-4 rounded-lg cursor-pointer px-4 py-6 bg-white"
  >
    <h3
      v-html="creationDay"
      class="flex items-center gap-1 font-semibold text-xl"
    ></h3>
    <p>
      {{ textOverflow }}
    </p>

    <small class="text-gray-500">
      Última modificación: <span>{{ modifyDay }}</span>
    </small>
  </div>
</template>

<script>
// HELPERS
import transformDate from "../helpers/transformDate.js";

export default {
  name: "CardEntry",
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },

  methods: {
    selectEntry() {
      this.$router.push({ name: "entry", params: { id: this.entry.id } });
    },
  },

  computed: {
    textOverflow() {
      const { text } = this.entry;

      return text.length >= 120 ? text.slice(0, 120) + "..." : text;
    },

    creationDay() {
      const { day, month, number, year } = transformDate(this.entry.date);

      return `
      <span class="font-bold text-4xl text-green-800">${number}</span>
      <span>de ${month} ${year},</span>
      <span>${day}</span>`;
    },

    modifyDay() {
      const { day, monthNumber, number, year } = transformDate(
        this.entry.modified
      );

      return `${number}/${monthNumber}/${year}, ${day}`;
    },
  },
};
</script>

<style></style>
