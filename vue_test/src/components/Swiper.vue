<template>
  <div
    class="swiper"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    :style="{ height: swiperHeight + 'px', width: swiperWidth + 'px' }"
  >
    <div class="swiper-picture">
      <ul class="swiper-ul" ref="swiperUl" :style="{ width: swiperUlWidth }">
        <li class="swiper-ul-li" :style="{ width: swiperWidth + 'px' }">
          <img :src="swiperList[swiperList.length - 1].url" />
        </li>
        <li
          class="swiper-ul-li"
          :style="{ width: swiperWidth + 'px' }"
          v-for="(picture, index) in swiperList"
          :key="index"
        >
          <img :src="picture.url" />
        </li>
        <li class="swiper-ul-li" :style="{ width: swiperWidth + 'px' }">
          <img :src="swiperList[0].url" />
        </li>
      </ul>
    </div>
    <div class="swiper-buttom">
      <ol class="swiper-ol">
        <li
          :class="['swiper-ol-li', { active: index === currentIndex }]"
          v-for="(picture, index) in swiperList"
          :key="index"
          @click="currentClick(index)"
        ></li>
      </ol>
      <div class="swiper-button">
        <button>
          <a href="javascript:;" class="arrowLeft" @click="arrowLeft"> &lt; </a>
        </button>
        <button>
          <a href="javascript:;" class="arrowRight" @click="arrowRight">
            &gt;
          </a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  data() {
    return {
      activeIndex: 1,
      currentIndex: 0,
      step: 0,
      flag: true,
    };
  },
  props: ["swiperList", "swiperHeight", "swiperWidth"],
  computed: {
    swiperUlWidth() {
      return this.swiperWidth * (this.swiperList.length + 2) + "px";
    },
  },
  methods: {
    position() {
      this.$refs.swiperUl.style.left = -this.swiperWidth + "px";
    },
    mouseEnter() {
      clearInterval(this.timer);
    },
    mouseLeave() {
      this.run();
    },
    arrowRight() {
      if (this.flag) {
        this.flag = false;
        if (this.activeIndex == this.swiperList.length) {
          this.$refs.swiperUl.style.left = 0 + "px";
          this.activeIndex = 0;
        }
        this.activeIndex++;
        this.currentIndex++;
        if (this.currentIndex == this.swiperList.length) {
          this.currentIndex = 0;
        }
        this.animate(
          this.$refs.swiperUl,
          -this.$refs.swiperUl.children[this.activeIndex].offsetLeft,
          () => {
            this.flag = true;
          }
        );
      }
    },
    arrowLeft() {
      if (this.flag) {
        this.flag = false;
        if (this.activeIndex == 0) {
          this.activeIndex = this.swiperList.length;
          this.$refs.swiperUl.style.left =
            -this.swiperList.length * this.swiperWidth + "px";
        }
        this.activeIndex--;
        this.currentIndex--;
        if (this.currentIndex == -1) {
          this.currentIndex = this.swiperList.length - 1;
        }
        this.animate(
          this.$refs.swiperUl,
          -this.$refs.swiperUl.children[this.activeIndex].offsetLeft,
          () => {
            this.flag = true;
          }
        );
      }
    },
    currentClick(index) {
      if (this.flag) {
        this.flag = false;
        this.activeIndex = index + 1;
        this.currentIndex = index;
        this.animate(
          this.$refs.swiperUl,
          -this.$refs.swiperUl.children[this.activeIndex].offsetLeft,
          () => {
            this.flag = true;
          }
        );
      }
    },
    run() {
      this.timer = setInterval(() => {
        this.arrowRight();
      }, 2000);
    },
    animate(obj, target, callback) {
      obj.timer = setInterval(() => {
        this.step = (target - obj.offsetLeft) / 10;
        this.step =
          this.step > 0 ? Math.ceil(this.step) : Math.floor(this.step);
        if (obj.offsetLeft == target) {
          clearInterval(obj.timer);
          callback && callback();
        }
        obj.style.left = obj.offsetLeft + this.step + "px";
      }, 20);
    },
  },
  mounted() {
    this.run();
    this.position();
  },
};
</script>

<style lang="less" scoped>
.swiper {
  border-radius: 6px;
  background-color: aqua;
  .swiper-picture {
    width: 100%;
    height: calc((100%) * 0.8);
    background-color: pink;
    overflow: hidden;
     border-top-left-radius: 6px;
     border-top-right-radius: 6px;
    .swiper-ul {
      height: 100%;
      display: flex;
      position: relative;
      .swiper-ul-li {
        height: 100%;
        background-color: aqua;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .swiper-buttom {
    width: 100%;
    height: calc((100%) * 0.2);
    background-color: black;
    position: relative;
     border-bottom-left-radius: 6px;
     border-bottom-right-radius: 6px;
    .swiper-ol {
      position: absolute;
      bottom: 22px;
      left: 15px;
      display: flex;
      align-items: center;
      .swiper-ol-li {
        width: 8px;
        height: 8px;
        background-color: rgb(227, 229, 231);
        margin: 0 3.5px;
        border-radius: 50%;
      }
      .active {
        width: 12px;
        height: 12px;
      }
    }

    .swiper-button {
      width: 68px;
      height: 28px;
      position: absolute;
      top: 16.2px;
      right: 15px;
      background-color: rgba(0, 0, 0, 0);
      display: flex;

      button {
        width: 28px;
        height: 28px;
        background-color: rgba(227, 229, 231, 0.25);
        border-radius: 8px;
        border: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:first-child {
          margin-right: 12px;
        }
        a {
          display: block;
          width: 12px;
          height: 12px;
          line-height: 12px;
        }
      }
    }
  }
}
</style>>

