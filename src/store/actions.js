import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let prod = context.state.cartList.find(item => payload.iid == item.iid);
      if (prod) {
        context.commit(ADD_COUNTER, prod);
        resolve('商品数量加一!')
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve('加入购物车成功！')
      }
    })
  }
}