<template>
  <div class="item">
    <img :src="item.show.img" @load="imgLoad" />
    <div class="info">
      <p>{{item.title}}</p>
      <span class="price">{{item.price}}</span>
      <span class="cfav">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      // console.log("imgLoad");
      this.$bus.$emit("imgLoad");
    }
  }
};
</script>

<style scoped>
.item {
  width: 48%;
  margin-bottom: 5px;
}
.item img {
  width: 100%;
  border-radius: 5px;
}
.info {
  text-align: center;
}
.item p {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 7px 0 0 0;
}
.price {
  color: var(--color-high-text);
  margin-right: 25px;
}
.cfav {
  position: relative;
}
.cfav::before {
  content: "";
  position: absolute;
  left: -13px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>