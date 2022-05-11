<template>
  <div class="gallery-page h-full w-full page-container">
    <div class="pt-32 pb-16">
      <h1 class="reveal heading-3xl">
        Gallery
        <span class="text-theme-grey">({{ filteredPieces.length }})</span>
      </h1>
    </div>
    <ArtFilter class="reveal lg:mb-32" :items="artPieces" />

    <div ref="gallery" class="reveal gallery mt-16 col-span-12">
      <div
        class="gallery-item"
        v-for="piece in filteredPieces"
        :key="piece.id"
        ref="gallerylItem"
      >
        <nuxt-link class="card-link item" :to="`/${piece.attributes.slug}`">
          <img
            :src="`${piece.attributes.image.data.attributes.formats.medium.url}`"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export default {
  data() {
    return {
      selected: false,
    };
  },
  computed: {
    ...mapState(["artPieces", "selectedFilter"]),
    ...mapGetters(["selectedFilterLength"]),

    coverImageUrl() {
      return this.$store.state.imageUrl;
    },

    filteredPieces() {
      if (this.selectedFilter == 0) {
        return this.artPieces;
      } else {
        return this.artPieces.filter(
          (p) =>
            this.selectedFilter.includes(
              p.attributes.type.toLowerCase().trim()
            ) || this.selectedFilter.includes(p.attributes.size)
        );
      }
    },
  },
  watch: {
    async filteredPieces() {
      await new Promise((resolve) => setTimeout(resolve, 200));
      this.staggerAnimation();
    },
  },
  methods: {
    ...mapActions(["getAllPieces", "toggleFilter"]),

    handleClearFilter() {
      this.$store.commit("CLEAR_FILTER");
    },
    staggerAnimation() {
      const { galleryItem } = this.$refs;

      let items = document.querySelectorAll(".gallery-item");
      gsap.set(items, {
        autoAlpha: 0,
        y: 150,
      });

      ScrollTrigger.batch(items, {
        onEnter: (batch) =>
          batch.forEach((item, index) =>
            gsap.to(item, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.5,
              overwrite: "auto",
              delay: 0.25,
            })
          ),

        onLeaveBack: (batch) =>
          batch.forEach((item, index) =>
            gsap.to(item, {
              opacity: 0,
              y: 150,
              overwrite: "auto",
            })
          ),
      });
    },
  },
  created() {
    this.getAllPieces();
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
    await new Promise((resolve) => setTimeout(resolve, 400));
    this.staggerAnimation();
  },
};
</script>

<style lang="scss">
.gallery-page {
  img {
    width: 100%;
    height: auto;
  }
  .gallery {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    &-item {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      @apply col-span-12;
    }
    &-item:nth-child(even) {
      .item {
        @apply col-start-1 col-end-6;
      }
    }
    &-item:nth-child(odd) {
      .item {
        @apply col-start-8 col-end-13;
        @screen lg {
          @apply col-start-10 col-end-13;
        }
      }
    }
  }
}
</style>
