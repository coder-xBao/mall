<template>
  <div class="bottomBar">
    <div class="service">
      <i class="icon servicei"></i>
      <span>客服</span>
    </div>
    <div class="shop">
      <i class="icon shopi"></i>
      <span>店铺</span>
    </div>
    <div class="collect">
      <i class="icon collecti"></i>
      <span>收藏</span>
    </div>
    <div class="cart" @click="addToCart">加入购物车</div>
    <div class="buy">购买</div>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
  methods: {
    addToCart() {
      this.$emit("addToCart");
    }
  }
};
</script>

<style scoped>
.bottomBar {
  background-color: #fff;
  position: relative;
  height: 49px;
  width: 100%;
  display: flex;
  z-index: 21;
}
.bottomBar div {
  display: inline-block;
}
.service,
.shop,
.collect {
  width: 17%;
  text-align: center;
}
.service,
.shop,
.collect span {
  display: inline-block;
  line-height: 22px;
  height: 22px;
}
.icon {
  display: block;
  width: 22px;
  height: 22px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  margin-left: 20px;
  margin-top: 5px;
}
.servicei {
  background-position: 0 -53px;
}
.shopi {
  background-position: 0 -97px;
}
.collecti {
  background-position: 0 0;
}
.cart {
  width: 30%;
  background-color: #ffe817;
  font-size: 18px;
  text-align: center;
  line-height: 49px;
}
.buy {
  width: 19%;
  background-color: #f69;
  font-size: 18px;
  text-align: center;
  line-height: 49px;
}
</style>