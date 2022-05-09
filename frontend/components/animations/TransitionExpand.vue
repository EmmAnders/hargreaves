<template>
  <transition
    name="expand"
    @enter="transitionStart"
    @after-enter="transitionEnd"
    @before-leave="transitionStart"
    @after-leave="transitionEnd"
  >
    <slot></slot>
  </transition>
</template>
<script>
export default {
  name: "TransitionExpand",
  methods: {
    transitionStart(el) {
      el.style.height = el.scrollHeight + "px";
    },
    transitionEnd(el) {
      el.style.height = "";
    },
  },
};
</script>

<style lang="scss">
.expand-enter-active,
.expand-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}
.expand-enter,
.expand-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
