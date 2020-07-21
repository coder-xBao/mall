<template>
  <div class="bottom-bar">
    <div class="left">
      <check-button class="button" @checkBtnClick="btnClick" v-model="isAll" />
      <span class="selectAll">全选</span>
      <span class="total">合计：￥{{total}}</span>
    </div>
    <div class="right">去计算({{checked}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList", "cartLength"]),
    total() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return (preValue += item.price * item.count);
        }, 0);
    },
    checked() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isAll() {
      if (!this.cartLength) return false;
      return !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    btnClick() {
      if (this.isAll) {
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 30px;
}
.button {
  display: inline-block;
  margin-left: 4px;
  margin-top: 4px;
  margin-right: 4px;
}
.total {
  margin-left: 40px;
}
.left {
  float: left;
  width: 70%;
  height: 30px;
  background-color: rgb(156, 154, 154);
}
.right {
  float: right;
  width: 30%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: rgb(252, 45, 45);
}
</style>