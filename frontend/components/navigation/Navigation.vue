<template>
  <header class="header w-full">
    <div class="border-b border-theme-color">
      <div class="page-container py-2 flex justify-between items-center">
        <div class="heading-xl">
          <NuxtLink to="/"> Hargreaves</NuxtLink>
        </div>
        <div class="hidden lg:flex">
          <div class="heading-xl pr-4">
            <NuxtLink to="/"> Gallery</NuxtLink>
          </div>
          <div class="heading-xl pr-4">
            <NuxtLink to="/info"> Info</NuxtLink>
          </div>
          <div @click="toggleWishlist" class="heading-xl">
            Wishlist
            <span v-if="wishlistLength">({{ wishlistLength }})</span>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div @click="toggleMobileNav" class="lg:hidden heading-xl">Menu</div>
        <MobileNavigation />
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import { gsap } from "gsap";
export default {
  data() {
    return {
      tl: null,
    };
  },
  computed: {
    ...mapState(["wishlist", "isWishlist"]),
    ...mapGetters(["wishlistLength"]),
  },
  methods: {
    ...mapActions(["toggleWishlist", "toggleMobileNav"]),
  },
  async mounted() {
    await this.$nextTick();
  },
};
</script>
