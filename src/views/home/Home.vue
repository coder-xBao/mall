<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">买买买</div></nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import {getHomeMultidata} from 'network/home'

    export default {
        name: 'home',
        components: {
            NavBar
        },
        data() {
            return {
                banners: [],
                recommends: []
            }
        },
        created() {
            // 1.请求多个数据
            getHomeMultidata().then(res => {
                // console.log(res);
                // this.result = res;
                this.banners = res.data.banner;
                this.recommends = res.data.recommend;
            })
        }
    }
</script>

<style>
    .home-nav {
        background-color: var(--color-tint);
        color: #fff
    }
</style>