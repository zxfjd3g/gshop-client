import { reqDetailInfo, reqDiscountList } from '@/api'

const state = {
  detailInfo:{}, // 商品详情信息
  couponInfoList: [], // 优惠券列表
  activityRuleList: [], // 优惠活动列表
}

const mutations = {
  /*
  接收商品详情信息
  */
  RECEIVE_DETAIL_INFO (state,detailInfo){
    state.detailInfo = detailInfo
  },

  /*
  接收商品详情信息
  */
  RECEIVE_DISCOUNT_LIST (state,{couponInfoList, activityRuleList}){
    state.couponInfoList = couponInfoList
    state.activityRuleList = activityRuleList
  }
}

const actions = {
  /*
  获取指定skuid的商品信息的异步action
  */
  async getDetailInfo({commit},skuId){
    const result=await reqDetailInfo(skuId)
    if(result.code===200){
      const detailInfo = result.data
      commit('RECEIVE_DETAIL_INFO', detailInfo)
    }
  },

  /* 
  获取优惠列表
  */
  async getDiscountList ({commit}, skuId) {
    const result = await reqDiscountList(skuId)
    if(result.code===200){
      const {couponInfoList, activityRuleList} = result.data
      commit('RECEIVE_DISCOUNT_LIST', {couponInfoList, activityRuleList})
    }
  }
}

const getters = {
  /*
  返回三级分类名称数据的对象
  */
  categoryView (state) {
    return state.detailInfo.categoryView || {}
  },

  /*
  返回商品sku相关信息对象
  */
  skuInfo(state){
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo : {}
  },

  /*
  返回商品的轮播的图片数组
  */
  skuImageList(state){
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo.skuImageList : []
    // return state.detailInfo.skuInfo.skuImageList || []  // 不可用
  },

  valuesSkuJson(state){
    const valuesSkuJson = state.detailInfo.valuesSkuJson
    return valuesSkuJson ? valuesSkuJson : []
  },
  
  /*
  返回商品SPU销售属性列表
  */
  spuSaleAttrList(state){
    return state.detailInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
