<template>
  <template v-if="entry">
    <div class="flex items-center justify-between">
      <h1 class="flex items-center gap-1" v-html="getDate"></h1>

      <div class="flex items-center gap-4">
        <button
          v-if="entry.id"
          @click="onDeleteEntry"
          class="rounded-lg px-4 py-2 bg-red-700 text-white"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <button
          @click="goToEntries"
          class="rounded-lg px-4 py-2 bg-zinc-900 text-white"
        >
          Volver
        </button>
      </div>
    </div>

    <textarea
      cols="30"
      rows="10"
      v-model="entry.text"
      placeholder="Comienza a escribir..."
      class="textarea-screen custom-scroll resize-none outline-none mt-4 w-full"
    ></textarea>

    <Thumbanil :show="isVisible" :image="entry.picture" @onUpload="setImage" />

    <Fab @onClick="saveEntry" class="bottom-4 right-4" />
    <Fab @onClick="showImage" icon="fa-image" class="bottom-4 right-20" />
  </template>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapActions, mapGetters } from "vuex";

import notie from "notie";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

// HELPERS
import transformDate from "../helpers/transformDate.js";
import uploadImage from "../helpers/uploadImage.js";

import Fab from "../components/Fab.vue";

export default {
  name: "EntryView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      entry: null,
      fileImage: null,
      isVisible: true,
    };
  },

  methods: {
    loadEntry() {
      let entry = null;

      if (this.id === "new") {
        entry = {
          date: Date.now(),
          modified: Date.now(),
          picture: null,
          text: "",
        };
      } else {
        entry = this.getEntryById(this.id);

        // If not exits return and show custom message
        if (!entry) {
          return this.$router.push({
            name: "noEntry",
            params: { text: "Ups.. parece que la entrada no existe" },
          });
        }
      }

      this.entry = entry;
    },

    async saveEntry() {
      // The user can't save if the entry text is empty
      if (this.entry.text.length === 0)
        return notie.alert({
          type: "warning",
          text: "No puede guardar una entrada vacía",
        });

      // Set a loader waiting for the finish uploaded
      new Swal({
        title: "Guardando",
        text: "por favor espere...",
      });
      Swal.showLoading();

      // Upload the image and set the property picture in the entry
      const picture = await uploadImage(this.fileImage);
      this.entry.picture = picture;

      // Determinate is a new entry or a update entry
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        // Await for the id and then navigate
        // to the entry created
        const id = await this.createEntry(this.entry);
        this.$router.push({
          name: "entry",
          params: { id },
        });
      }

      // Clear the file image
      this.fileImage = null;

      // Notify that the entry was saved
      Swal.fire({
        title: "Entrada guardada",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    onDeleteEntry() {
      notie.confirm({
        text: "¿Está seguro de eliminar está entrada?",
        cancelCallback: () => {
          notie.alert({
            type: "neutral",
            text: "Eliminación cancelada",
            time: 2,
          });
        },
        submitCallback: async () => {
          await this.deleteEntry(this.entry.id);

          notie.alert({
            type: "success",
            text: "Entrada eliminada exitosamente",
            time: 2,
          });

          setTimeout(() => this.$router.push({ name: "noEntry" }), 2000);
        },
      });
    },

    showImage() {
      this.isVisible = !this.isVisible;
    },

    goToEntries() {
      this.$router.push({
        name: "noEntry",
      });
    },

    setImage(file) {
      this.fileImage = file;
    },

    ...mapActions("journal", ["createEntry", "updateEntry", "deleteEntry"]),
  },

  computed: {
    getDate() {
      const { day, month, number, year } = transformDate(this.entry.date);

      return `
      <span class="font-bold text-4xl text-green-800">${number}</span>
      <span>de ${month} ${year},</span>
      <span>${day}</span>`;
    },
    ...mapGetters("journal", ["getEntryById"]),
  },

  watch: {
    id() {
      this.loadEntry();
    },
  },

  created() {
    this.loadEntry();
  },

  components: {
    Fab,
    Thumbanil: defineAsyncComponent(() =>
      import("../components/Thumbnail.vue")
    ),
  },
};
</script>

<style scoped>
.textarea-screen {
  /* 40px of firts div + 16px of textarea margin 
  + 56px of FAB + 16px for set a separation = 128px */
  height: calc(100% - 128px);
}
</style>
