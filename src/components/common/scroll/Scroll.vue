<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpload: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll.finishPullUp();
    }
  },
  mounted() {
    // ?? better-scroll ??
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpload,
      click: true
    });
    // ??????
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
    // ????
    this.scroll.on("pullingUp", () => {
      // console.log("aaaaaa");
      this.$emit("pullingUp");
    });
  }
};
</script>

<style scoped>
</style>