<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="homeSwiperImgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    // 轮播图中的任一图片加载完成
    homeSwiperImgLoad() {
      if (!this.isLoad) {
        this.$emit("homeSwiperImgLoad");
        this.isLoad = true;
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
</style>