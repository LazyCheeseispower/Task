<template>
  <div>
    <Shortcut />
    <Top :top="top" />
    <!-- <Swiper
      :swiperList="swiperList"
      :swiperHeight="swiperHeight"
      :swiperWidth="swiperWidth"
    /> -->
  </div>
</template>

<script>
import Swiper from "./components/Swiper.vue";
import Top from "./components/Top.vue";
import Shortcut from "./components/Shortcut.vue";
export default {
  name: "App",
  components: { Swiper, Top, Shortcut },
  data() {
    return {
      swiperList: [
        {
          url: "https://i0.hdslb.com/bfs/banner/babaa2d26cde087aa732b275b72368aa84e24a15.png@976w_550h_1c.webp",
        },
        {
          url: "https://i0.hdslb.com/bfs/banner/68ddfec857279e062664b8d9029525296c9a31fe.jpg@976w_550h_1c.webp",
        },
        {
          url: "https://i0.hdslb.com/bfs/banner/968c635ce7d0ffe8836bc401d53acb7b3aabad11.png@976w_550h_1c.webp",
        },
        {
          url: "https://i0.hdslb.com/bfs/banner/317606fcc8dfcc25e19faba47e87c2a011cdad53.jpg@976w_550h_1c.webp",
        },
        {
          url: "https://i0.hdslb.com/bfs/banner/959db2e9d682eaa41809b110265ec17d1eb5c29e.jpg@976w_550h_1c.webp",
        },
        {
          url: "https://i0.hdslb.com/bfs/banner/b24110d275163456f4c5586793ee343dee96ee6c.jpg@976w_550h_1c.webp",
        },
        {
          url: "https://i0.hdslb.com/bfs/banner/719516ee5a1485e2318ec4db675114c473d4f6cb.png@976w_550h_1c.webp",
        },
        {
          url: "https://i0.hdslb.com/bfs/sycp/creative_img/202207/8c0f6ca1522358fb6198f4e9e0911952.jpg@976w_550h_1c.webp",
        },
        {
          url: "https://i0.hdslb.com/bfs/banner/2433182d3292d6b9d88c44748c6de7cad082cf5c.png@976w_550h_1c.webp",
        },
      ],
      swiperHeight: 450,
      swiperWidth: 700,
      top: "https://i0.hdslb.com/bfs/archive/956de2627e2cc1a9da53ea1d8762cea33e8ea6e5.png@3840w_360h_1c_90q.webp",
      middle: {
        middleLeft: [
          {
            id: "1",
            title: "开学前一小时补40篇日记",
            isNew: true,
            isHot: false,
          },
          {
            id: "2",
            title: "刘畊宏回应卖假货",
            isNew: false,
            isHot: false,
          },
          {
            id: "3",
            title: "肖秀荣1000题1小时速成",
            isNew: true,
            isHot: false,
          },
          {
            id: "4",
            title: "江西上空现不明飞行物",
            isNew: false,
            isHot: true,
          },
          {
            id: "5",
            title: "中俄将在日本海联合演习",
            isNew: false,
            isHot: false,
          },
        ],
        middleRight: [
          {
            id: "6",
            title: "边角料零食是智商税吗",
            isNew: true,
            isHot: false,
          },
          {
            id: "7",
            title: "初音未来15周年",
            isNew: false,
            isHot: false,
          },
          {
            id: "8",
            title: "必胜客优菈服务员",
            isNew: false,
            isHot: false,
          },
          {
            id: "9",
            title: "妻子车祸男子悲痛到抽搐",
            isNew: false,
            isHot: false,
          },
          {
            id: "10",
            title: "LV乒乓球拍售价1.8万",
            isNew: false,
            isHot: false,
          },
        ],
      },
    };
  },
  methods: {
    sendInfoTrewndingItems() {
      this.$bus.$emit("hello", this.middle);
    },
  },
  mounted() {
    this.sendInfoTrewndingItems();
  },
};
</script>
