<template>
  <article class="pdp-page page-container py-16 grid grid-cols-12">
    <div class="reveal col-span-12 md:flex md:pb-0">
      <h1 class="heading-3xl pr-2">
        {{ artPiece.attributes.name }}
      </h1>

      <div
        @click="handleWishlistItem(artPiece)"
        class="pill w-1/2 md:w-3/12 lg:w-2/12 mt-4 md:mt-0 border border-theme-color text-theme-color flex items-center"
      >
        <span class="pr-2"> Wishlist</span>
        <PlusMinus
          class="text-theme-color"
          :class="[inWishlist ? 'minus ' : '']"
        />
      </div>
    </div>

    <div
      class="reveal order-2 col-span-12 lg:col-start-1 lg:col-end-7 lg:order-none flex flex-col justify-end"
    >
      <div class="heading-xl py-2">Details</div>

      <div>
        <p class="border-b border-t border-theme-color py-2">
          {{ artPiece.attributes.description }}
        </p>
        <p
          class="border-b border-theme-color py-2"
          v-if="artPiece.attributes.type"
        >
          {{ artPiece.attributes.type }}
        </p>
        <p
          class="border-b border-theme-color py-2"
          v-if="artPiece.attributes.size"
        >
          {{ artPiece.attributes.size }}
        </p>
        <p
          class="border-b border-theme-color py-2"
          v-if="artPiece.attributes.price"
        >
          {{ artPiece.attributes.price }} NOK
        </p>
        <p
          class="border-b border-theme-color py-2"
          v-if="artPiece.attributes.price < 1"
        >
          No price available
        </p>
      </div>
    </div>

    <div
      class="reveal lg:col-start-7 col-start-1 col-end-13 pb-12 lg:pb-0 flex flex-col justify-end"
    >
      <div v-if="coverImageUrl" class="relative">
        <img :src="coverImageUrl" alt="" class="h-full w-full" />
        <div
          v-if="!artPiece.attributes.inStock"
          class="absolute top-0 right-0 w-16 h-16 lg:w-24 lg:h-24 bg-theme-color rounded-full mt-4 mr-2 lg:mt-8 lg:mr-6"
        >
          <div class="text-theme-background sold text">Sold</div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { gsap } from "gsap";
export default {
  async asyncData({ params, $axios }) {
    try {
      const { data } = await $axios.$get(
        `/images?filters[slug][$eq]=${params.slug}&populate=*`
      );
      return { artPiece: data[0] };
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    ...mapState(["wishlist"]),
    coverImageUrl() {
      return this.artPiece.attributes.image.data.attributes.formats.medium.url;
    },
    inWishlist() {
      return this.wishlist.some(
        (el) => el.attributes.name === this.artPiece.attributes.name
      );
    },
  },
  methods: {
    ...mapActions(["addWishlistItem", "removeWishlistItem"]),
    handleWishlistItem(item) {
      this.inWishlist
        ? this.removeWishlistItem(item)
        : this.addWishlistItem(item);
    },
  },
  async mounted() {
    await this.$nextTick();
    const reveal = document.querySelectorAll(".reveal");
    gsap.from(reveal, 0.8, {
      delay: 0.8,
      ease: "power3.out",
      y: 150,
      opacity: 0,
      stagger: {
        amount: 0.5,
      },
    });
  },
};
</script>

<style lang="scss">
.pdp-page {
  height: 100vh;
  width: 100vw;
  img {
    max-height: 70vh;
  }

  .sold {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%);
  }
}
</style>
