import Vue from 'vue'
import Vuex from 'vuex'

// 安装vuex插件
Vue.use(Vuex);

import mutations from './mutatios'
import actions from './actions'
import getters from './getters'

const state = {
  // 购物车商品列表
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store;

