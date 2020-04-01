<template>
    <div>
        <!-- <router-view></router-view> -->
        <tab-bar>
            <tab-bar-item path="/home" activeColor="#1296db">
                <img slot="item-icon" src="~assets/img/tabbar/homeicon.png" alt="">
                <img slot="item-icon-active" src="~assets/img/tabbar/homeiconactive.png" alt="">
                <div slot="item-text">首页</div>
            </tab-bar-item>
            <tab-bar-item path="/category">
                <img slot="item-icon" src="~assets/img/tabbar/category.png" alt="">
                <img slot="item-icon-active" src="~assets/img/tabbar/categoryactive.png" alt="">
                <div slot="item-text">分类</div>
            </tab-bar-item>
            <tab-bar-item path="/cart">
                <img slot="item-icon" src="~assets/img/tabbar/shoppingcart.png" alt="">
                <img slot="item-icon-active" src="~assets/img/tabbar/shoppingcartactive.png" alt="">
                <div slot="item-text">购物车</div>
            </tab-bar-item>
            <tab-bar-item path="/profile">
                <img slot="item-icon" src="~assets/img/tabbar/profile.png" alt="">
                <img slot="item-icon-active" src="~assets/img/tabbar/profileactive.png" alt="">
                <div slot="item-text">我的</div>
            </tab-bar-item>
        </tab-bar>
    </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
    name: "MainTabBar",
    components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style>
</style>