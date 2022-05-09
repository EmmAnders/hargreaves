<template>
  <svg
    class="plus"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path class="vertical-line" d="M16 8V24" stroke="currentColor" />
    <path class="horizontal-line" d="M24 16L8 16" stroke="currentColor" />
  </svg>
</template>
<script>
export default {
  name: "PlusMinusIcon",
};
</script>

<style lang="scss">
.plus {
  height: 50px;
  width: 30px;
}
.plus path {
  transition: all 0.3s;
  transform: scaleY(1);
  transform-origin: 50% 50%;
  stroke: var(--themeColor);
}
.plus.minus .vertical-line {
  transform: scaleY(0);
}
</style>
