<template>
  <div class="item" @click="itemClick">
    <img :src="getImg" @load="imgLoad" />
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
  computed: {
    getImg() {
      return this.item.image || this.item.show.img;
    }
  },
  methods: {
    imgLoad() {
      if (!this.$route.path.indexOf("/home")) {
        console.log("home emit");
        this.$bus.$emit("homeImgLoad");
      } else if (!this.$route.path.indexOf("/detail")) {
        console.log("detail emit");
        this.$bus.$emit("detailImgLoad");
      }
    },
    itemClick() {
      // 通过params传递参数
      this.$router.push("/detail/" + this.item.iid);
      // 通过query传递参数
      // this.$router.push({
      //   path: "/detail",
      //   query: {
      //     iid: this.item.iid
      //   }
      // });
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