<template>
  <div
    class="wishlist bg-theme-color text-theme-background fixed right-0 left-0 top-0 h-auto border-l border-theme-background"
  >
    <div
      class="flex justify-between items-center w-full py-2 px-3 border-b border-theme-background"
    >
      <h1 class="heading-xl text-theme-background pr-4">
        Wishlist <span>({{ wishlist.length }})</span>
      </h1>
      <p
        @click="toggleWishlist"
        class="pill text-theme-background border border-theme-background"
      >
        Close
      </p>
    </div>

    <div class="wishlist-container w-full h-full">
      <div
        v-for="(item, index) in wishlist"
        :key="index"
        class="wishlist-item grid grid-cols-12 items-center py-3 border-b border-theme-background"
      >
        <nuxt-link class="ml-3 col-span-8" :to="`/${item.attributes.slug}`">
          <h3 class="text-theme-background text-big">
            {{ item.attributes.name }}
          </h3>
        </nuxt-link>
        <div
          @click="removeWishlistItem(item)"
          class="mr-3 cursor-pointer col-start-13 col-end-13 w-10 h-10 flex items-center justify-center rounded-full text-center bg-theme-background text-theme-color"
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { gsap } from "gsap";
export default {
  data() {
    return {
      tl: null,
      activeIndex: null,
    };
  },
  computed: {
    ...mapState(["wishlist", "isWishlist", "url"]),
    coverImageUrl() {
      return this.$store.state.url;
    },
  },
  watch: {
    isWishlist() {
      if (this.isWishlist) {
        this.tl.play().timeScale(1.5).delay(1.2);
      }
      if (!this.isWishlist) {
        this.tl.timeScale(2.5);
        this.tl.reverse();
      }
    },
  },
  methods: {
    ...mapActions(["toggleWishlist", "removeWishlistItem"]),
    selectIndex(index) {
      this.activeIndex = index;
    },
  },
  async mounted() {
    await this.$nextTick();
    this.tl = gsap.timeline({ paused: true });
    this.tl.to(".wishlist", {
      transform: "translateY(0%)",
      duration: 1,
    });
  },
};
</script>

<style lang="scss">
.wishlist {
  transform: translateY(-200%);
}
</style>
