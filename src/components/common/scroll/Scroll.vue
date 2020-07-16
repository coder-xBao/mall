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
    // 在 time 时间滚到 x, y
    scrollTo(x, y, time = 500) {
      // this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
      this.scroll.scrollTo(x, y, time);
      console.log("scrroll");
    },
    // 下拉到底重新刷新
    refresh() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 刷新content高度
    refreshContent() {
      this.scroll.refresh();
    },
    // 获得y高度
    getScrollHeight() {
      return this.scroll ? this.scroll.y : 0;
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
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }
    // ??????
    if (this.pullUpload) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  }
};
</script>

<style scoped>
</style>