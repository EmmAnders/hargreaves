<template>
  <div>{{ about }}</div>
</template>

<script>
export default {
  name: "IndexPage",

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
};
</script>
