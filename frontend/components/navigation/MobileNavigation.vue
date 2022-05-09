<template>
  <div
    class="mobile-menu bg-theme-color fixed top-0 left-0 right-0 bottom-0 lg:py-3"
  >
    <div
      @click="toggleMobileNav"
      class="flex items-end justify-end w-full pt-3 page-container"
    >
      <span
        class="w-20 cursor-pointer text-center rounded-full text-theme-background border border-theme-background pill"
      >
        Close
      </span>
    </div>
    <div
      class="heading-3xl text-theme-background h-full flex flex-col justify-between"
    >
      <div class="flex items-center h-full">
        <div
          @click="toggleMobileNav"
          class="page-container flex flex-start nav-link"
        >
          <NuxtLink to="/"> Gallery </NuxtLink>
          <span class="text-theme-grey text-sm md:text-2xl">(01)</span>
        </div>
      </div>
      <div class="line"></div>
      <div
        @click="toggleMobileNav"
        class="page-container flex items-center h-full"
      >
        <div class="flex flex-start nav-link">
          <NuxtLink to="/info">Info</NuxtLink>
          <span class="text-theme-grey text-sm md:text-2xl">(02)</span>
        </div>
      </div>

      <div class="line"></div>
      <div class="flex items-center h-full">
        <div
          @click="toggleMobileNav"
          class="page-container flex flex-start nav-link"
        >
          <p @click="toggleWishlist">
            Wishlist
            <span v-if="wishlistLength">({{ wishlistLength }})</span>
          </p>
          <span class="text-theme-grey text-sm md:text-2xl">(03)</span>
        </div>
      </div>
    </div>
  </div>
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
  watch: {
    isMobileNavigation() {
      if (this.isMobileNavigation) {
        this.tl.play().timeScale(1.5);
      }
      if (!this.isMobileNavigation) {
        this.tl.timeScale(2);
        this.tl.reverse();
      }
    },
  },
  computed: {
    ...mapState(["wishlist", "isWishlist", "isMobileNavigation"]),
    ...mapGetters(["wishlistLength"]),
  },
  methods: {
    ...mapActions(["toggleWishlist", "toggleMobileNav"]),
  },
  async mounted() {
    await this.$nextTick();
    this.tl = gsap.timeline({ paused: true });
    this.tl.to(".mobile-menu", {
      transform: "translateY(0%)",
      duration: 1,
    });
    this.tl.to(
      ".nav-link",
      {
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        marginTop: 0,
      },
      ">-0.5"
    );
    this.tl.to(
      ".line",
      {
        opacity: 1,
        width: "100%",
        duration: 0.7,
        stagger: 0.3,
      },
      ">-0.5"
    );
  },
};
</script>

<style lang="scss">
.mobile-menu {
  transform: translateY(-200%);
  z-index: 100;

  .nav-link {
    transition: all 0.2 ease-in-out;
    opacity: 0;
    margin-top: -20px;
    &:hover {
      @apply text-theme-grey;
    }
  }
  .line {
    transition: all 0.2 ease-in-out;
    opacity: 0;
    background-color: var(--themeBackground);
    width: 0;
    height: 1px;
  }
}
</style>
