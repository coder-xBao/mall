import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  // 将购物车原有商品数量加1
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  // 添加商品到购物车
  [ADD_TO_CART](state, payload) {
    payload.checked = false;
    state.cartList.push(payload);
  }
}