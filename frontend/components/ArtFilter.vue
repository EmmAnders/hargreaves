<template>
  <div
    :class="isOpen !== null ? 'mb-24' : ''"
    class="relative filter grid grid-cols-12 border-t border-theme-color w-full"
  >
    <div class="grid-item col-span-4 lg:col-span-2 px-3 pt-1">
      <span v-if="selectedFilterLength < 1"> Filter by</span>
      <div
        class="cursor-pointer flex items-center justify-between"
        @click="handleClearFilter"
        v-if="selectedFilterLength > 0"
      >
        Reset ({{ selectedFilterLength }})
        <span><CloseIcon /></span>
      </div>
    </div>

    <div
      class="grid-item col-span-4 lg:col-span-5 flex justify-between items-center px-3 pt-1 cursor-pointer"
      v-for="(item, index) in filters"
      :key="index"
    >
      <span class="w-full" @click="toggleFilter(index)">{{ item.title }}</span>

      <Chevron
        :class="isOpen == index ? 'chevron rotate' : 'chevron'"
        @click="toggleFilter(index)"
      />

      <TransitionExpand>
        <div
          class="filter-option flex flex-wrap items-center pt-4 bg-theme-background"
          v-show="isOpen === index"
        >
          <div
            v-for="(option, index) in item.options"
            :key="option"
            class="text-xl lg:heading-xl py-1 pr-2 lg:pr-4 cursor-pointer"
            :class="
              selectedFilter.includes(option)
                ? 'text-theme-color'
                : 'text-theme-grey'
            "
            @click="handleAddFilter(option.trim().toLowerCase())"
          >
            {{ option }}<span v-if="index + 1 < item.options.length">,</span>
          </div>
        </div>
      </TransitionExpand>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  props: ["items"],
  data() {
    return {
      isOpen: null,
    };
  },
  computed: {
    ...mapState(["selectedFilter"]),
    ...mapGetters(["selectedFilterLength"]),
    filters() {
      let types = [];
      let sizes = [];
      if (this.items) {
        this.items.map((el) => {
          sizes.push(el.attributes.size.toLowerCase().trim());
          types.push(el.attributes.type.toLowerCase().trim());
          return;
        });
      }
      let categories = [
        {
          title: "Sizes",
          options: [...new Set(sizes.sort())],
        },
        {
          title: "Types",
          options: [...new Set(types.sort())],
        },
      ];
      return categories;
    },
  },
  methods: {
    toggleFilter(index) {
      if (this.isOpen === index) {
        this.isOpen = null;
      } else {
        this.isOpen = index;
      }
    },
    handleAddFilter(selected) {
      this.$store.commit("SET_SELECTEDFILTER", selected);
    },
    handleClearFilter() {
      this.$store.commit("CLEAR_FILTER");
    },
  },
};
</script>

<style lang="scss">
.filter {
  .grid-item:nth-child(2) {
    @apply border-l border-r border-theme-color;
  }
  .filter-option {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
  }
}
</style>
