<template>
  <div class="cartList">
    <scroll class="scroll" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(["cartList"])
    // ...mapGetters({
    //   length: "cartLength"
    // })
  },
  activated() {
    // console.log("cartlist active");
    this.$refs.scroll.refreshContent();
  }
};
</script>

<style scoped>
.scroll {
  height: 100%;
  margin-top: 0 !important;
}
.cartList {
  height: calc(100% - 123px);
}
</style>