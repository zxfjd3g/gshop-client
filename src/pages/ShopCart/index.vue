<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-if="cartList.length">
        <!--
          cartPrice: 3400
          id: 4683
          imgUrl: "http://182.92.128.115:8080/group1/M00/00/0D/rBFUDF7G-SCAAq31AAFdgoifvoA470.jpg"
          isChecked: 1
          skuId: 120
          skuName: "小米10--22"
          skuNum: 1
          skuPrice: 3400
          userId: "8998b27d-f291-4de7-b586-617c95f6c27f"
        -->
        <ul class="cart-list" v-for="(cartItem,index) in cartList" :key="cartItem.createTime">
          <li v-for="(item, index) in cartItem.cartInfoList" :key="item.id">
            <ul class="shopInfo">
              <li class="cart-list-con1">
                <input type="checkbox" name="chk_list" :checked="item.isChecked===1"
                       @change="checkCartItem(item)">
              </li>
              <li class="cart-list-con2">
                <img :src="item.imgUrl">
                <a href="javascript:" class="item-msg" @click="$router.push(`/detail/${item.skuId}`)">{{item.skuName}}</a>
              </li>
              <li class="cart-list-con4">
                <span class="price">{{item.skuPrice}}</span>

                <!-- 促销区域 -->
                <div v-if="cartItem.activityRuleList !== null  && cartItem.activityRuleList.length > 0">
                  <!--<a class="sales-promotion" href="javascript:;" @click="activityIndex=index">促销<b></b></a>-->
                  <a class="sales-promotion" href="javascript:;" @click="activityIndex=item.id">促销<b></b></a>
                  <div class="promotion-tips" v-if="activityIndex===item.id">
                    <div class="promotion-tit" style="width: 43px;">促销<b></b></div>
                    <div class="promotion-cont">
                      <ul>
                        <template  v-for="(activityRule, index) in cartItem.activityRuleList">

                          <!--@todo 打折选项怎么办 初始化选中的哪个折扣？-->
                          <!-- 满减 -->
                          <li :key="activityRule.id" v-if="activityRule.activityType == 'FULL_REDUCTION'">
                            <input type="radio" :name="activityRule.skuId" :value="index" v-model="item.isChecked">
                            满{{ activityRule.conditionAmount }}减{{ activityRule.benefitAmount }}元
                          </li>
                          <!-- 满减 -->
                          <li :key="activityRule.id" v-else-if="activityRule.activityType == 'FULL_DISCOUNT'">
                            <input type="radio" :name="activityRule.skuId" :value="index" v-model="item.isChecked"/>
                            满{{ activityRule.conditionNum}}件打{{ activityRule.benefitDiscount }}折
                          </li>
                        </template>
                      </ul>
                      <div class="op-btns ac mt20">
                        <a href="#none" class="btn-1 select-promotion" @click="activityIndex=null">确定</a>
                        <a href="#none" class="btn-9 ml10 del cancel-promotion" @click="activityIndex=null">取消</a>
                      </div>
                      <div class="clr"></div>
                    </div>
                  </div>
                </div>
                <!-- 优惠券区域 -->
                <div v-if="item.couponInfoList !== null && item.couponInfoList.length > 0">
                  <a class="sales-promotion" href="javascript:;" @click="couponIndex=item.id">优惠券<b></b></a>
                  <div class="promotion-tips" style="width: 315px;" v-if="couponIndex===item.id">
                    <div class="promotion-tit">优惠券<b></b></div>
                    <div class="promotion-cont" style="width:auto;">

                      <div class="p-coupon-item p-coupon-item-gray" v-for="couponInfo in item.couponInfoList" :key="couponInfo.id">
                        <div class="coupon-price" style="border-color:#e74649;">
                          <span class="txt" v-if="couponInfo.couponType == 'CASH'" style="color: #e74649;">{{ couponInfo.benefitAmount }}元</span>
                          <span class="txt" v-if="couponInfo.couponType == 'DISCOUNT'" style="color: #e74649;">{{ couponInfo.benefitDiscount }}折</span>
                          <span class="txt" v-if="couponInfo.couponType == 'FULL_REDUCTION'" style="color: #e74649;">{{ couponInfo.benefitAmount }}元</span>
                          <span class="txt" v-if="couponInfo.couponType == 'FULL_DISCOUNT'" style="color: #e74649;">{{ couponInfo.benefitDiscount }}折</span>
                        </div>
                        <div class="coupon-msg">
                          <div>
                            <span class="ctype" v-if="couponInfo.couponType == 'CASH'">现金券</span>
                            <span class="ctype" v-if="couponInfo.couponType == 'DISCOUNT'">折扣券</span>
                            <span class="ctype" v-if="couponInfo.couponType == 'FULL_REDUCTION'">满减卷</span>
                            <span class="ctype" v-if="couponInfo.couponType == 'FULL_DISCOUNT'">满件打折卷</span>

                            <span class="cinfo" v-if="couponInfo.couponType == 'CASH'">现金券{{ couponInfo.benefitAmount }}元</span>
                            <span class="cinfo" v-if="couponInfo.couponType == 'DISCOUNT'">折扣券{{ couponInfo.benefitDiscount }}折</span>
                            <span class="cinfo" v-if="couponInfo.couponType == 'FULL_REDUCTION'">满{{ couponInfo.conditionAmount }}减{{ couponInfo.benefitAmount }}元</span>
                            <span class="cinfo" v-if="couponInfo.couponType == 'FULL_DISCOUNT'">满{{ couponInfo.conditionNum }}件打{{ couponInfo.benefitDiscount }}折</span>

                          </div>
                          <div class="clearfix">
                            <div class="ftx-03 J_cpitems">{{ couponInfo.rangeDesc }}</div>
                            <i class="zyc-ico"></i>
                          </div>
                        </div>
                        <div class="coupon-opbtns">
                          <span class="ftx-03" v-if="couponInfo.isGet > 0 && couponInfo.couponStatus == 'NOT_USED'">已领取</span>
                          <span class="ftx-03" v-if="couponInfo.isGet > 0 && couponInfo.couponStatus == 'USED'">已使用</span>
                          <span class="btn-1 coupon-btn" v-if="couponInfo.isGet == 0" 
                            @click="getCouponInfo(couponInfo.id)">领取</span>
                        </div>
                      </div>

                      <div class="op-btns ac mt20">
                        <a href="javascript:" class="btn-9 ml10 del cancel-promotion" @click="couponIndex=null">取消</a>
                      </div>
                    </div>
                    <div class="clr"></div>
                  </div>
                </div>
              </li>
              <li class="cart-list-con5">
                <a href="javascript:void(0)" class="mins" @click="updateSkuNum(item, -1)">-</a>
                <input autocomplete="off" type="text" class="itxt"
                       :value="item.skuNum" @change="updateSkuNum(item, $event.target.value-item.skuNum, $event)"
                       @input="validInput">
                <a href="javascript:void(0)" class="plus" @click="updateSkuNum(item, 1)">+</a>
              </li>
              <li class="cart-list-con6" @click='test(1)'>
                <span class="sum">{{item.skuPrice * item.skuNum}}</span>
              </li>
              <li class="cart-list-con7">
                <a href="#none" class="sindelet" @click="deleteCartItem(item.skuId)">删除</a>
                <br>
                <a href="#none">移到收藏</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="allCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:" @click="deleteCheckedCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import debounce from 'lodash/debounce'
  export default {
    name: 'ShopCart',
    data(){
      return {
        activityIndex:null,
        couponIndex:null
      }
    },

    computed: {
      cartList () {
        return this.$store.state.shopCart.cartList
      },

      allCheck: {
        get () {
          return this.isAllCheck
        },

        async set (value) { // 点击改变了全选状态
          this.$store.dispatch('checkAllCartItems', value)
        }
      },

      ...mapGetters(['totalCount', 'totalPrice', 'isAllCheck'])
    },

    mounted () {
      this.$store.dispatch('getCartList')
    },

    methods: {

      /*
      检查输入的合法性, 并及时自动处理
      */
      // 目标: 将输入框中的开头的n个0或者n个非数字替换为空串
      // 正则: /^0+|\D+0*/g : 匹配 开头的1+个0 或者 任意位置的1+个非数字及后面0+个0
      // 	\D 代表非数字   \d 代表数字
      // 	+ 代表个数>=1
      // 	* 代表个数>=0
      // 	| 或者
      // 	g 找出所有匹配的
      // 测试文本: -0a011a0110  替换后变为 11110
      validInput (event) {
        const value = event.target.value
        event.target.value = value.replace(/^0+|\D+0*/g, '')
      },

      /*
      更新购物项商品的数量
      changeNum: 改变的数量
      */
      updateSkuNum:  debounce(async function (item, changeNum, event) {

        const {skuId, skuNum} = item

        // 只有当目标数量大于0时, 才处理, 否则不处理
        const targetNum = skuNum + changeNum
        if (targetNum>0) {
          this.$store.commit('CHANGE_SKU_NUM', {item, changeNum})
          try {
            // 分发一个异步action
            await this.$store.dispatch('addToCart', {skuId, skuNum: changeNum, isGetCart: true})
          } catch (error) { // 异步请求操作失败了
            this.$store.commit('CHANGE_SKU_NUM', {item, changeNum: -changeNum})
          }
        } else {
          if (event) {
            // 将输入更新为原本的值
            event.target.value = item.skuNum
          }
        }
      }, 500),

      /*
      删除所有选中的购物项
      */
      async deleteCheckedCartItems () {
        if (window.confirm(`确定删除吗?`)) {
          this.$store.dispatch('deleteCheckedCartItems')
        }
      },

      /*
      删除指定购物项
      */
      deleteCartItem (skuId) {
        if(confirm('确认删除该商品吗')){
          // 分发给action发送请求
          this.$store.dispatch('deleteCartItem', skuId)
        }
      },

      /* 
      修改商品是否选中的状态
      */
      checkCartItem (item) {
        // 准备数据
        const skuId = item.skuId
        const isChecked = item.isChecked === 1 ? 0 : 1
        this.$store.dispatch('checkCartItem', {skuId, isChecked})
      },
      
      /* 
      领取优惠券
      */
      async getCouponInfo(couponId){

        await this.$API.reqCouponInfo(couponId)

        this.$store.dispatch('getCartList')
      },
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 5%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 35%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 15%;

        }
      }

      .cart-body {
        margin: 15px 0;

        .cart-list {
          border-bottom: 1px solid #ddd;
          border-right: 1px solid #ddd;
          border-left: 1px solid #ddd;
          width:1178px;
          margin-bottom: 30px;
          /*height:82px;*/ /*不能设置高度，如果描述内容过多会溢出，应该由内容撑开*/
          /*overflow: hidden;*/
          &:after {
            content: '';
            display: block;
            clear: both;
          }
          &>li {
            float: left;
            width: 100%;
            border-top: 1px solid #ddd;
            padding: 20px ;
            box-sizing: border-box;

            .shopInfo{
              width: 100%;
              /*overflow: hidden;*/
              &>li {
                float: left;
              }
              .cart-list-con1 {
                width: 5%;
              }

              .cart-list-con2 {
                width: 35%;

                img {
                  width: 82px;
                  height: 82px;
                  float: left;
                }

                .item-msg {
                  float: left;
                  width: 150px;
                  margin: 0 10px;
                  line-height: 18px;
                }
              }

              .cart-list-con4 {
                width: 15%;
                div{
                  position: relative;
                  .sales-promotion{
                    color: #E2231A;
                    display: inline-block;
                    width: 56px;
                    border: 1px solid #f9d2d3;
                    text-align: left;
                    line-height: 20px;
                    padding: 0 5px 0 5px;
                    cursor: pointer;
                    background: #fff;
                    text-decoration: none;
                    overflow: hidden;
                    position: relative;
                    b{
                      position: absolute;
                      right: 8px;
                      top: 8px;
                      width: 7px;
                      height: 4px;
                      overflow: hidden;
                      font-weight: bolder;
                      background: url(https://misc.360buyimg.com/user/cart/css/i/cart-icons-202004.png) -82px -3px;
                    }
                    &:hover {
                      color: #E2231A!important;
                    }
                  }
                  .promotion-tips{
                    position: absolute;
                    padding: 10px 14px 10px 10px;
                    width: 276px;
                    top:19px;
                    box-shadow: 0 0 2px 2px #eee;
                    border: 1px solid #e4393c;
                    background: none repeat scroll 0 0 #fff;
                    text-align: left;
                    z-index:99;
                    .promotion-tit{
                      position: absolute;
                      height: 19px;
                      line-height: 17px;
                      border: 1px solid #e4393c;
                      border-bottom: 0;
                      top: -20px;
                      left: -1px;
                      background: #fff;
                      color: #E2231A;
                      padding: 0 15px 0 8px;
                      cursor: pointer;
                      width: 43px;
                    }
                    .promotion-cont{
                      position: relative;
                      z-index: 99;
                      line-height: 23px;
                      width: 280px;
                      ul{
                        display: block;
                        li{
                          display: block!important;
                          padding: 2px 5px;
                          .input{
                            border: 1px solid #ddd;
                            cursor: pointer;
                            box-sizing: border-box;
                            padding: 0;
                          }
                        }
                      }
                      .op-btns{
                        margin-top: 20px;
                        text-align: center;
                        .select-promotion{
                          font-family: arial,Microsoft YaHei;
                          display: inline-block;
                          height: 25px;
                          line-height: 25px;
                          background-color: #e74649;
                          background-image: linear-gradient(0deg,#e74649 0,#df3134);
                          border-radius: 3px;
                          color: #fff;
                          font-size: 12px;
                          font-weight: 400;
                          padding: 0 10px;
                          vertical-align: middle;
                          cursor: pointer;
                          border: 0;
                          float: none;
                          transition: all .2s ease-out;
                        }
                        .cancel-promotion{
                          margin-left: 10px;
                          transition: all .2s ease-out;
                          display: inline-block;
                          height: 23px;
                          line-height: 23px;
                          background-color: #f2f2f2;
                          background-image: linear-gradient(0deg,#f2f2f2 0,#f7f7f7);
                          border-radius: 3px;
                          color: #323333;
                          font-size: 12px;
                          font-weight: 400;
                          padding: 0 9px;
                          vertical-align: middle;
                          cursor: pointer;
                          float: none;
                          border: 1px solid #e1e1e1;
                        }
                      }
                      .p-coupon-item{
                        display: block;
                        margin: 10px 0;
                        overflow:hidden;
                        .coupon-price{
                          border-color: rgb(231, 70, 73);
                          position: relative;
                          height: 29px;
                          line-height: 29px;
                          width: 54px;
                          float: left;
                          font-size: 0;
                          margin: 2px 10px 0 0;
                          border: 1px solid #f9d2d3;
                          text-align: center;
                          padding: 0 2px;
                          .txt{
                            font-size: 12px;
                            color: rgb(231, 70, 73);
                            font-weight: 700;
                          }
                        }
                        .coupon-msg{
                          float: left;
                          width: 200px;
                          line-height: 18px;
                          font-weight: 400;
                        }
                        .coupon-opbtns{
                          float: left;
                          .coupon-btn {
                            display: inline-block;
                            height: 25px;
                            line-height: 25px;
                            background-color: #e74649;
                            border-radius: 3px;
                            color: #fff;
                            font-size: 12px;
                            font-weight: 400;
                            padding: 0 10px;
                            vertical-align: middle;
                            cursor: pointer;
                            border: 0;
                            float: none;
                          }
                        }
                      }
                    }
                  }
                }
              }

              .cart-list-con5 {
                width: 15%;

                .mins {
                  border: 1px solid #ddd;
                  border-right: 0;
                  float: left;
                  color: #666;
                  width: 6px;
                  text-align: center;
                  padding: 8px;
                }

                input {
                  border: 1px solid #ddd;
                  width: 40px;
                  height: 33px;
                  float: left;
                  text-align: center;
                  font-size: 14px;
                }

                .plus {
                  border: 1px solid #ddd;
                  border-left: 0;
                  float: left;
                  color: #666;
                  width: 6px;
                  text-align: center;
                  padding: 8px;
                }
              }

              .cart-list-con6 {
                width: 15%;

                .sum {
                  font-size: 16px;
                }
              }

              .cart-list-con7 {
                width: 15%;

                a {
                  color: #666;
                }
              }
            }
          }


        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
