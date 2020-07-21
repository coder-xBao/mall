<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  /* border-radius: 10px; */

  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>