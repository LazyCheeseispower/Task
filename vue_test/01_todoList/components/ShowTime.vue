<template>
  <h2>现在的时间是{{ fmtTime }}</h2>
</template>

<script>
export default {
  data() {
    return {
      nowTime: Date.now(),
    };
  },
  computed: {
    fmtTime() {
      return this.$dayjs(this.nowTime).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.nowTime = Date.now();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style>
</style>