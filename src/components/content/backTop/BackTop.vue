<template>
  <div class="back">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: "BackTop"
};
</script>

<style scoped>
.back {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
.back img {
  width: 45px;
  height: 45px;
}
</style>