<template>
  <div class="detail">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar" @navBarClick="navBarClick" ref="navbar" />
    <scroll class="wrapper" ref="scroll" @scroll="scrolling" :probe-type="3">
      <!-- 轮播图 -->
      <detail-swiper :swiper-img="swiperImg" />
      <!-- 商品信息 -->
      <detail-base-info :goods="goods" />
      <!-- 店铺信息 -->
      <shop-info :shopInfo="shopInfo" />
      <!-- 商品详细图片介绍 -->
      <goods-img-intro :detailInfo="goodsImgIntro" @imgLoad="imgLoad" />
      <!-- 商品具体参数介绍 -->
      <detail-param-info :param-info="paramInfo" ref="param" />
      <!-- 商品评论信息 -->
      <comments-info :commentInfo="commentsInfo" ref="comment" />
      <!-- 推荐商品模块 -->
      <goods-list :goodsList="recommendGoods" ref="recommend" />
    </scroll>
  </div>
</template>

<script>
import NavBar from "./chidrenComps/DetailNavBar";
import DetailSwiper from "./chidrenComps/DetailSwiper";
import DetailBaseInfo from "./chidrenComps/DetailBaseInfo";
import ShopInfo from "./chidrenComps/ShopInfo";
import Scroll from "components/common/scroll/Scroll";
import goodsImgIntro from "./chidrenComps/GoodsImgIntro";
import DetailParamInfo from "./chidrenComps/DetailParamInfo";
import CommentsInfo from "./chidrenComps/CommentsInfo";
import GoodsList from "components/content/homeGoods/GoodsList";
import { debounce } from "components/common/utils/debounce";

import {
  getDetailData,
  getRecommendData,
  Goods,
  Shop,
  GoodsParams
} from "network/detail";

export default {
  name: "Detail",
  components: {
    NavBar,
    getDetailData,
    DetailSwiper,
    DetailBaseInfo,
    ShopInfo,
    Scroll,
    goodsImgIntro,
    DetailParamInfo,
    CommentsInfo,
    GoodsList
  },
  data() {
    return {
      iid: null,
      swiperImg: null,
      goods: {},
      shopInfo: {},
      goodsImgIntro: {},
      paramInfo: {},
      commentsInfo: {},
      recommendGoods: [],
      // 与detailImgLoad事件绑定的函数
      handleImgLoad: null,
      // 每个title距离顶部的位置
      titlesOffsetTop: [],
      // 记录目前的title
      currentTitle: 0
    };
  },
  created() {
    // 获取商品id
    this.iid = this.$route.params.iid;
    // 获取详情页数据
    getDetailData(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      // 获取详情页轮播图图片数据
      this.swiperImg = res.result.itemInfo.topImages;
      // 获取商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺数据
      this.shopInfo = new Shop(data.shopInfo);
      // 商品详情照片数据
      this.goodsImgIntro = data.detailInfo;
      // 商品具体参数信息
      this.paramInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 商品评论信息
      if (data.rate.cRate != 0) {
        this.commentsInfo = data.rate.list[0];
      }
    });
    // 获取详情页推荐商品数据
    getRecommendData().then(res => {
      this.recommendGoods = res.data.list;
    });
  },
  mounted() {
    // 监听事件总线中 图片加载完的事件
    const refresh = debounce(this.$refs.scroll.refreshContent, 100);
    this.handleImgLoad = () => {
      // 调用 scroll 刷新 content 高度
      refresh();
      // console.log("home execute handelImgLoad");
    };
    this.$bus.$on("detailImgLoad", this.handleImgLoad);
  },
  methods: {
    // 监听图片加载完成的事件
    imgLoad() {
      this.$refs.scroll.refreshContent();
      // 获取每个title的offsetTop值
      this.titlesOffsetTop = [];
      this.titlesOffsetTop.push(0);
      this.titlesOffsetTop.push(-this.$refs.param.$el.offsetTop + 44);
      this.titlesOffsetTop.push(-this.$refs.comment.$el.offsetTop + 44);
      this.titlesOffsetTop.push(-this.$refs.recommend.$el.offsetTop + 44);
      console.log(this.titlesOffsetTop);
    },
    // 监听navbar的点击事件
    navBarClick(index) {
      this.$refs.scroll.scrollTo(0, this.titlesOffsetTop[index], 300);
    },
    // 监听滑动事件
    scrolling(position) {
      // console.log(position);
      if (position.y > this.titlesOffsetTop[1]) {
        // 商品
        this.currentTitle = 0;
      } else if (position.y > this.titlesOffsetTop[2]) {
        // 参数
        this.currentTitle = 1;
      } else if (position.y > this.titlesOffsetTop[3]) {
        // 评论
        this.currentTitle = 2;
      } else {
        // 推荐
        this.currentTitle = 3;
      }
      // console.log(this.currentTitle);
      this.$refs.navbar.currentIndex = this.currentTitle;
    }
  }
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 20;
  background-color: #fff;
  height: 100vh;
}
.wrapper {
  height: calc(100%-49px);
  height: 630px;
}
.nav-bar {
  position: relative;
  z-index: 12;
  background: #fff;
}
</style>