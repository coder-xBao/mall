<template>
  <!-- <h2>购物车{{cartLength}}</h2> -->
  <div class="cart">
    <!-- 购物车头部 -->
    <nav-bar class="navbar">
      <div slot="center" class="title">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 购物车内容 -->
    <cart-list />

    <!-- 购物车底部 -->
    <bottom-bar class="bottom-bar"></bottom-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "components/common/navbar/NavBar";
import CartList from "./chidrenComps/CartList";
import BottomBar from "./chidrenComps/BottomBar";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters(["cartLength"])
    // ...mapGetters({
    //   length: "cartLength"
    // })
  }
};
</script>

<style scoped>
.cart {
  position: relative;
  height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
}
.title {
  font-size: 20px;
  color: #fff;
}
.bottom-bar {
  position: absolute;
  bottom: 49px;
}
</style>