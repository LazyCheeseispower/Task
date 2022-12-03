<template>
  <div class="top" :style="{ height: height + 'px' }">
    <a href="https://www.bilibili.com/" target="_blank" class="banner-link"
      ><img class="top-image" :src="top" alt="" loading="eager" onload=""
    /></a>
  </div>
</template>

<script>
export default {
  name: "Top",
  props: ["top"],
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      midheight: 0,
    };
  },
  computed: {
    height() {
      this.midheight = (this.screenWidth / 1688) * 160;
      this.midheight = this.midheight > 155 ? this.midheight : 155;
      return this.midheight.toFixed(3);
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.screenWidth = document.body.offsetWidth;
    });
  },
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  position: relative;

  z-index: -1;
  overflow: hidden;
  min-height: 155px;
  min-width: 1118px;

  .banner-link {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .top-image {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>