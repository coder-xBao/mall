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
    // ? time ????? x, y
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    // ????????
    refresh() {
      this.scroll && this.scroll.finishPullUp();
    },
    // ??????????content??
    refreshContent() {
      this.scroll.refresh();
      console.log("------");
    }
  },
  created() {
    console.log("scroll created");
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
  },
  destroyed() {
    console.log("scroll destroyed");
  }
};
</script>

<style scoped>
</style>