<template>
  <nav-bar>
    <div class="back" slot="left" @click="back">
      <img src="~assets/img/common/back.svg" />
    </div>
    <div slot="center" class="titles">
      <span
        v-for="(title, index) in titles"
        :key="index"
        class="title"
        :class="{active: currentIndex == index}"
        @click="titleClick(index)"
      >{{title}}</span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("navBarClick", index);
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.titles {
  display: flex;
}
.title {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 10px;
}
</style>