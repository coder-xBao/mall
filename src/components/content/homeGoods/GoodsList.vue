<template>
  <div class="list">
    <goods-item class="item" :item="item" v-for="(item, index) in goodsList" :key="index">1</goods-item>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  name: "GoodsList",
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsItem
  }
};
</script>

<style scoped>
.list {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-bottom: 2px;
}
</style>