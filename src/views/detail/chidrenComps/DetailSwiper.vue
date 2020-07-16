<template>
  <swiper class="detailswiper">
    <swiper-item v-for="(img, index) in swiperImg" :key="index">
      <img :src="img" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    swiperImg: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.detailswiper {
  height: 300px;
}
</style>