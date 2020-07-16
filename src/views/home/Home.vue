<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">买买买</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tabControl1"
      v-show="isFixed"
    ></tab-control>
    <scroll
      class="scroll"
      ref="scroll"
      :probe-type="3"
      :pull-upload="true"
      @scroll="scroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @homeSwiperImgLoad="homeSwiperImgLoad"></home-swiper>
      <!-- 推荐模块 -->
      <recommend-view :recommends="recommends.list"></recommend-view>
      <!-- 特性模块 -->
      <feature-view></feature-view>
      <!-- 分类控制栏模块 -->
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        :class="{fixed: isFixed}"
      ></tab-control>
      <!-- 主要商品模块 -->
      <goods-list :goodsList="currentList"></goods-list>
    </scroll>
    <!-- 返回顶部按钮 -->
    <back-top @click.native="toTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 公共模块
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/homeGoods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import { debounce } from "components/common/utils/debounce";
// 独立模块
import HomeSwiper from "./childrenComps/HomeSwiper";
import RecommendView from "./childrenComps/RecommendView";
import FeatureView from "./childrenComps/FeatureView";
// 通信方法模块
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      // 推荐模块数据
      recommends: [],
      // 商品列表数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      // 当前显示类型
      currentType: "pop",
      // 是否显示 回到顶部 按钮
      isShowBackTop: false,
      // tabControl 的 offsetTop
      tabControlOffsetTop: 0,
      // 是否将tab-control设置为fixed
      isFixed: false,
      // 离开 home 时保存scroll位置
      scrollPosition: 0,
      // bus 中的imgLoad事件绑定的函数
      handleImgLoad: null
    };
  },
  computed: {
    currentList() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听事件总线中 图片加载完的事件
    const refresh = debounce(this.$refs.scroll.refreshContent, 10);
    this.handleImgLoad = () => {
      // 调用 scroll 刷新 content 高度
      refresh();
      // console.log("home execute handelImgLoad");
    };
    this.$bus.$on("homeImgLoad", this.handleImgLoad);
    console.log("home mounted");
  },
  activated() {
    // console.log("active");
    // console.log(this.scrollPosition);
    this.$refs.scroll.refreshContent();
    this.$refs.scroll.scrollTo(0, this.scrollPosition, 0);
    // 重新监听imgLoad事件
    // this.$bus.$on("imgLoad", this.handleImgLoad);
  },
  deactivated() {
    // console.log("deactive");
    // console.log(this.$refs.scroll.getScrollHeight());
    this.scrollPosition = this.$refs.scroll.getScrollHeight();
    // 取消监听imgLoad事件
    // this.$bus.$off("imgLoad", this.handleImgLoad);
  },
  methods: {
    // 事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    toTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    scroll(position) {
      // 判断是否显示 返回顶部 按钮
      this.isShowBackTop = -position.y > 1000;
      this.isFixed = -position.y > this.tabControlOffsetTop;
    },
    // 轮播图中任一图片加载完成
    homeSwiperImgLoad() {
      // 获得 tabControl 距离顶部偏移量
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop - 44;
    },
    // 加载更多商品数据
    loadMore() {
      // console.log("loadmore");
      this.getHomeGoods(this.currentType);
      // 重新刷新下拉到底事件
      this.$refs.scroll.refresh();
    },
    // 网络请求相关
    getHomeMultidata() {
      // 1.请求多个数据
      getHomeMultidata().then(res => {
        // console.log(res);
        // 获取首页数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend;
      });
    },
    getHomeGoods(type) {
      // 每次请求回一页数据后页码加一
      const page = this.goods[type].page + 1;
      // 请求数据
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    }
  }
};
</script>

<style>
#home {
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
}

.scroll {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
}
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
.tabControl1 {
  position: relative;
  /* left: 0;
  right: 0; */
  top: 44px;
  z-index: 10;
}
</style>