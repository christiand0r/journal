<template>
  <div :class="toggleImage">
    <div class="relative">
      <img :src="switchImage" alt="Thumbnail Image" class="max-w-full" />
      <LoaderImage v-if="loading" />
      <button
        @click="openImageManager"
        class="absolute bottom-0 left-0 p-1 w-full opacity-0 group-hover:opacity-100 bg-zinc-900 bg-opacity-30 text-white transition-opacity"
      >
        Cambiar imagen
      </button>
    </div>
  </div>

  <input
    type="file"
    v-show="false"
    @change="blobImage"
    ref="inputFile"
    accept="image/png, image/jpeg, image/jpg"
  />
</template>

<script>
import LoaderImage from "./LoaderImage.vue";
export default {
  name: "ThumbnailImage",
  props: {
    image: {
      type: String,
      default: null,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      imageThumbnail: this.image,
      loading: false,
    };
  },

  methods: {
    openImageManager() {
      // Destructure the reference for manipulate the DOM
      const { inputFile } = this.$refs;

      // Simulate the click
      inputFile.click();
    },

    blobImage($event) {
      const file = $event.target.files[0];

      // If user press cancel in the manager set image to null
      // And send that value as a param for custom event to parent
      if (!file) {
        this.imageThumbnail = null;
        return this.$emit("onUpload", file);
      }

      // Create a file reader to manipulate the load of image
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // Set listener to check the progress and show a loader for user
      reader.addEventListener("progress", ({ loaded, total }) => {
        const percent = parseInt(loaded * 100) / total;

        percent >= 100 ? (this.loading = false) : (this.loading = true);
      });

      // Set listener for when load finish and update the image
      // Also send the image as a param for custom event to parent
      reader.addEventListener("loadend", (e) => {
        this.imageThumbnail = e.target.result;
      });

      this.$emit("onUpload", file);
    },
  },

  computed: {
    switchImage() {
      return this.imageThumbnail ?? "https://placeimg.com/1080/720/any";
    },
    toggleImage() {
      return this.show
        ? "group fixed right-4 bottom-24 border rounded-lg p-2 w-60 border-gray-100 bg-white transition-all"
        : "group fixed -right-64 bottom-24 border rounded-lg p-2 w-60 border-gray-100 bg-white transition-all";
    },
  },

  watch: {
    image() {
      // Like the component is not unmounted watch the property image
      // for assing the value each time to change to other entry
      return this.image
        ? (this.imageThumbnail = this.image)
        : (this.imageThumbnail = null);
    },
  },

  emits: {
    onUpload: (file) => {
      return file ? file : null;
    },
  },

  components: {
    LoaderImage,
  },
};
</script>

<style></style>
