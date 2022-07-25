import {
  reqAddToCart,
  reqCartList,
  reqCheckCartItem,
  reqCheckCartItems,
  reqDeleteCartItem,
  reqDeleteCartItems
 } from '@/api'

const state = {
  cartList: []
}

const mutations = {
  /*
  接收商品详情信息
  */
  RECEIVE_CART_LIST (state, cartList){
    state.cartList = cartList
  },

  CHANGE_SKU_NUM (state, {item, changeNum}) {
    item.skuNum += changeNum
  }
}

const actions = {

  /*
  删除所有勾选的购物项的异步action
  */
  async deleteCheckedCartItems ({state, dispatch}) {

    // 得到所有选中购物项的skuId的数组
    const skuIdList = []
    state.cartList.forEach(item => {
      item.cartInfoList.forEach(cItem => {
        if (cItem.isChecked ===1) {
          skuIdList.push(cItem.skuId)
        }
      })
    })

    // 请求批量删除购物项
    const result = await reqDeleteCartItems(skuIdList)
    if (result.code!==200) {
      throw new Error('批量删除购物项失败')
    } else {
      dispatch('getCartList')
    }
  },

  /*
  删除指定购物项
  */
  async deleteCartItem ({dispatch}, skuId) {
    const result = await reqDeleteCartItem(skuId)
    if (result.code!==200) {
      throw new Error('删除购物项状态失败')
    } else {
      dispatch('getCartList')
    }
  },

  /*
  
  在一个action可以触发另一个action调用
  isCheck: true/false
  */
  async checkAllCartItems ({state, dispatch}, isCheck) {
    // 确定最新的状态值
    const isChecked = isCheck ? 1 : 0

    // 得到所有选中购物项的skuId的数组
    const skuIdList = []
    state.cartList.forEach(item => {
      item.cartInfoList.forEach(cItem => {
        if (isChecked != cItem.isChecked) {
          skuIdList.push(cItem.skuId)
        }
      })
    })

    console.log('skuIdList', skuIdList)
    // 请求批量删除购物项
    const result = await reqCheckCartItems(skuIdList, isChecked)
    if (result.code!==200) {
      throw new Error('批量选中购物项状态失败')
    } else {
      dispatch('getCartList')
    }
  },

  /*
  切换选中状态
  skuId: 商品id
  isChecked: 0: 不选中, 1: 选中
  */
  async checkCartItem ({dispatch}, {skuId, isChecked}) {
    const result = await reqCheckCartItem(skuId, isChecked)
    if (result.code!==200) {
      throw new Error('切换购物项状态失败')
    } else {
      dispatch('getCartList')
    }
  },

  /*
  获取指定skuid的商品信息的异步action
  */
  async getCartList({commit}){
    const result=await reqCartList()
    if(result.code===200){
      const cartList = result.data
      commit('RECEIVE_CART_LIST', cartList)
    }
  },

  /*
  添加到购物的异步action
  skuId: 商品id
  skuNum: 商品改变的数量
  */
  async addToCart ({dispatch}, {skuId, skuNum, isGetCart}) {
    const result = await reqAddToCart(skuId, skuNum)
    if (result.code!==200) {
      throw new Error('添加购物车失败')
    } else if (isGetCart) {
      dispatch('getCartList')
    }
  },
}

const getters = {

  /*
  所有选中的数量
  */
  totalCount (state) {
    // 根据最新的数据结构重新进行计算
    return state.cartList.reduce((preTotal, cartItem) => {
      return preTotal += cartItem.cartInfoList.reduce((pre, item) => pre += (item.isChecked===1 ? item.skuNum : 0), 0)
    }, 0)
  },

  /*
  所有选中的总价格
  */
  totalPrice (state) {
    // 根据最新的数据结构重新进行计算
    return state.cartList.reduce((preTotal, cartItem) => {
      return preTotal += cartItem.cartInfoList.reduce((pre, item) => pre += (item.isChecked===1 ? item.skuNum*item.skuPrice : 0), 0)
    }, 0)
  },

  /*
  是否都选中
  */
  isAllCheck (state, getters) {
    // 根据最新的数据结构重新进行计算
    return state.cartList.every(cartItem => cartItem.cartInfoList.every(item => item.isChecked === 1)) && getters.totalCount>0
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
