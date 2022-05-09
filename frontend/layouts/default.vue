<template>
  <div class="bg-theme-background text-theme-color h-full">
    <Navigation class="z-50" />
    <Nuxt class="h-full flex flex-col" />
    <Wishlist />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  transition: "default",
  data() {
    return {
      selected: false,
    };
  },
  computed: {
    ...mapState(["artPieces"]),
  },
  methods: {
    ...mapActions(["fetchWishlist"]),
  },
  async mounted() {
    this.$nextTick();
    this.fetchWishlist();
  },
};
</script>
<style lang="scss">
div#__nuxt,
#__layout,
#__layout > div,
#app {
  min-height: 100vh;
}
</style>
