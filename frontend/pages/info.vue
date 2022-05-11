<template>
  <article class="info grid grid-cols-12">
    <!-- Column left  -->
    <section
      class="col-span-12 lg:col-span-6 flex justify-center items-center h-full border-r border-theme-color"
    >
      <div
        class="page-container flex w-full lg:justify-between flex-col lg:w-1/2"
      >
        <div>
          <!-- images -->
          <img
            v-if="images"
            class="reveal-info w-full h-auto object-cover aspect-auto"
            :src="images[0]"
          />
        </div>
      </div>
    </section>

    <!-- Column right  -->
    <section
      class="section-wrapper col-span-12 lg:col-span-6 overflow-y-scroll flex flex-col"
    >
      <!-- Section 1  -->
      <div class="section">
        <div class="about flex flex-col justify-between pb-6">
          <div class="page-container">
            <h1 class="reveal-info heading-3xl">Info</h1>
          </div>
          <div class="page-container reveal-info">
            <p class="whitespace-normal break-words">{{ about.bio }}</p>
          </div>
        </div>
      </div>

      <!-- Section 2 -->
      <div class="section">
        <div class="flex flex-col justify-between">
          <div class="py-6 page-container">
            <h2 class="reveal-info heading-xxl">Exhibitions</h2>
          </div>

          <ul v-if="exhibitions" class="group exhibitions reveal-info">
            <li
              class="list grid grid-cols-12 items-center border-t border-theme-color p-1 hover:bg-theme-hover hover:text-white cursor-pointer"
              v-for="(exhibition, index) in exhibitions"
              :key="index"
            >
              <div
                class="col-span-4 lg:col-span-3 flex items-center page-container"
              >
                <div
                  class="circle w-2 h-2 lg:w-4 lg:h-4 mr-3 bg-theme-color rounded-full"
                ></div>
                <p class="">
                  {{ exhibition.attributes.name }}
                </p>
              </div>
              <div class="col-span-3 text-center lg:col-span-4 page-container">
                {{ exhibition.attributes.city }}
              </div>
              <div class="col-span-3 lg:col-span-4 text-center page-container">
                {{ exhibition.attributes.date }}
              </div>
              <div
                class="flex justify-end col-span-2 lg:col-span-1 page-container"
              >
                <ArrowUpRight class="arrow" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Section 3 -->
      <div class="section reveal-info page-container pb-8">
        <div class="flex flex-col justify-between pb-6">
          <div class="py-6">
            <h2 class="heading-xxl">Contact</h2>
          </div>

          <div class="text-big">
            <div class="flex items-center mr-3">
              {{ about.email }}<ArrowUpRight />
            </div>
            <a class="flex items-center" :href="about.instagram"
              >Instagram <ArrowUpRight
            /></a>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { gsap } from "gsap";

export default {
  async asyncData({ $axios }) {
    try {
      const [aboutRes, exhibitionsRes] = await Promise.all([
        $axios.$get(`/about?populate=*`),
        $axios.$get(`/exhibitions`),
      ]);

      return {
        about: aboutRes.data.attributes,
        exhibitions: exhibitionsRes.data,
      };
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    images() {
      if (this.about.images.length) {
        return this.about.images.data.map((item) => {
          return item.attributes.formats.medium.url;
        });
      } else {
        return [];
      }
    },
  },

  async mounted() {
    await this.$nextTick();
    const reveal = document.querySelectorAll(".reveal-info");
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
.info {
  @screen lg {
    overflow: hidden;
    height: 100vh;
  }

  .exhibitions {
    li {
      padding: 0.5rem 0rem;
    }
  }
  @screen lg {
    .section-wrapper {
      height: 100%;
      .section {
        border-bottom: 1px solid black;
        .about {
          height: 94vh;
        }
      }
    }
  }

  .list:hover {
    .circle {
      @apply bg-theme-background;
    }
    .arrow {
      transform: rotate(45deg);
    }
  }
}
</style>
