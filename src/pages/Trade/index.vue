<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">
        收件人信息
        <a href="javascript:;" @click="addAddressShow()">新增收货地址</a>
      </h5>
      <div class="address clearFix" v-for="(address,index) in userAddressList" :key="address.id">
        <!-- selected  -->
        <span class="username" :class="{selected: addressIndex===index}" @click="addressIndex=index">{{address.consignee}}</span>
        <p @click="selectedAddress=address"> 
          <span class="s1">{{address.userAddress}}</span>
          <span class="s2">{{address.phoneNum}}</span>
          <span class="s3" v-if="address.isDefault==='1'">默认地址</span>
        </p>
        <span class="place" style="float: right;">
          <a href="javascript:;" style="margin-left: 150px;" @click="updateUserAddress(index)">修改</a>
          <a href="javascript:;" @click="removeUserAddress(address.id)">删除</a>
        </span>
      </div>
      
      
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="item in tradeInfo.detailArrayList" :key="item.skuId">
          <li>
            <img :src="item.imgUrl" alt="" style="width: 100px;height:100px">
          </li>
          <li class="activity">
            <div class="goods-suit-tit" v-if="item.activityRule!=null">

              <template v-if="item.activityRule.activityType == 'FULL_REDUCTION'">
                <strong>满{{item.activityRule.conditionAmount}}元,减{{item.activityRule.benefitAmount}}元</strong>
                <span class="ml20">
                  &nbsp;返现：
                  <em>{{item.activityRule.benefitAmount}}元</em>
                </span>
              </template>

              <template v-else-if="item.activityRule.activityType == 'FULL_DISCOUNT'">
                <strong>满{{item.activityRule.conditionNum}}件打{{item.activityRule.benefitDiscount}}折</strong>
                <span class="ml20">
                  &nbsp;打折：
                  <em>{{item.activityRule.benefitDiscount}}折</em>
                </span>
              </template>

            
              <!-- <strong th:if="${detail.activityRule.activityType == 'FULL_REDUCTION'}" th:text="'满'+${detail.activityRule.conditionAmount}+'减'+${detail.activityRule.benefitAmount}+'元  '">活动商品已购满800.00元，已减80.00元现金    </strong>
              <span th:if="${detail.activityRule.activityType == 'FULL_REDUCTION'}" class="ml20" style="display: inline-block;border: 1px solid #7abd54;color: #7abd54;padding: 2px 5px;">&nbsp;返现：<em th:text="'￥' + ${detail.activityRule.benefitAmount}">￥80.00</em></span>

              <strong th:if="${detail.activityRule.activityType == 'FULL_DISCOUNT'}" th:text="'满'+${detail.activityRule.conditionNum}+'件打'+${detail.activityRule.benefitDiscount}+'折  '">活动商品已购满800.00元，已减80.00元现金    </strong>
              <span th:if="${detail.activityRule.activityType == 'FULL_DISCOUNT'}" class="ml20" style="display: inline-block;border: 1px solid #7abd54;color: #7abd54;padding: 2px 5px;">&nbsp;打折：<em th:text="${detail.activityRule.benefitDiscount} + '折'">￥80.00</em></span> -->
            </div>
            <p>{{item.skuName}}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{item.orderPrice}}</h3>
          </li>
          <li>X{{item.skuNum}}</li>
          <li>有货</li>
        </ul>
        
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="orderComment"></textarea>

      </div>
      <div class="line"></div>

      <!-- 发票信息区域 -->
      <div class="linkInfo">
        <div class="step-tit">
          <h5>发票信息</h5>
        </div>
        <div class="step-cont">
          <span>普通发票（电子）</span>
          <span>个人</span>
          <span>明细</span>
        </div>
      </div>

      <!-- 优惠券选择区域 -->
      <div class="cardInfo">
        <div class="step-tit">
          <h5>使用优惠/抵用</h5>
          <div class="coupon-enable">
            <div class="c-detail" :class="couponIndex===index ? 'item-selected' : ''" @click="checkCoupon(index,couponInfo.reduceAmount)" v-for="(couponInfo,index) in tradeInfo.couponInfoList" :key="couponInfo.id">
              <div class="c-msg c-dong c-nopointer">
                <div class="c-top-dong"></div>
                <div class="c-price">
                  <em v-if="couponInfo.couponType == 'CASH'">{{ couponInfo.benefitAmount }}元</em>
                  <em v-else-if="couponInfo.couponType == 'DISCOUNT'">{{ couponInfo.benefitDiscount }}折</em>
                  <em v-else-if="couponInfo.couponType == 'FULL_REDUCTION'">{{ couponInfo.benefitAmount }}元</em>
                  <em v-else-if="couponInfo.couponType == 'FULL_DISCOUNT'">{{ couponInfo.benefitDiscount }}折</em>
                </div>
                <div class="c-limit">
                  <span v-if="couponInfo.couponType == 'CASH'"> 现金券</span>
                  <span v-else-if="couponInfo.couponType == 'DISCOUNT'"> 折扣券</span>
                  <span v-else-if="couponInfo.couponType == 'FULL_REDUCTION'"> {{ couponInfo.conditionAmount }}元</span>
                  <span v-else-if="couponInfo.couponType == 'FULL_DISCOUNT'"> {{ couponInfo.conditionNum }}件</span>
                </div>
                <div class="c-time c-time-dong">
                  <span>有效期至{{ couponInfo.expireTime }}</span>
                </div>
              </div>
              <div class="c-type c-type-dong">
                <span class="c-type-l">[东券]</span>
                <span class="c-type-r">[限品类]</span>
              </div>
            </div>
          </div>
				</div>
			</div>
    </div>

    <!-- 订单优惠信息区域 -->
		<div class="order-summary">
			<div class="static fr">
				<div class="list">
					<span><i class="number">{{tradeInfo.totalNum}}</i>件商品，总商品金额</span>
					<em class="allprice">¥{{tradeInfo.originalTotalAmount}}</em>
				</div>
				<div class="list">
					<span>运费：</span>
					<em class="transport">¥0</em>
				</div>
				<div class="list">
					<span>返现：</span>
					<em class="money" >¥{{tradeInfo.benefitReduceAmount}}</em>
				</div>
				<div class="list">
					<span>优惠券：</span>
					<em class="transport">¥{{ couponAmount }}</em>
				</div>
			</div>
		</div>


    <div class="trade">
      <div class="price">应付金额:　<span>¥{{totalPayAmount}}</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{selectAddress.fullAddress}}</span>
        收货人：<span>{{selectAddress.consignee}}</span>
        <span>&nbsp;{{selectAddress.phoneNum}}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a href="javascript:" class="subBtn" @click="sumitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Trade',
    data () {
      return {
        orderComment: '赶紧发吧!!!', // 用户留言
        selectedAddress: {},
        couponAmount:0,
        couponIndex:null,
        addressIndex:null
      }
    },

    computed: {
      ...mapState({
        tradeInfo: state => state.order.tradeInfo,
        userAddressList: state => state.user.userAddressList,
      }),
      totalPayAmount(){
        return this.tradeInfo.totalAmount - this.couponAmount
      },
      selectAddress(){
          return this.userAddressList[this.addressIndex]||{}
      }
    },

    async mounted () {
      this.getUserAddressList();
      this.getTradeInfo();
    },

    methods: {
      async sumitOrder () {
        // 准备参数数据
        let {orderComment,couponIndex} = this
        let {tradeNo, detailArrayList,couponInfoList} = this.tradeInfo
        let {consignee, phoneNum, userAddress,provinceId} = this.selectAddress
        let selectedCoupon = couponInfoList[couponIndex]
        if(selectedCoupon){
          couponInfoList=[selectedCoupon]
        }else{
          couponInfoList=[];
        }
        const tradeInfo = {
          consignee,
          consigneeTel: phoneNum,
          deliveryAddress: userAddress,
          paymentWay: 'ONLINE',
          orderComment,
          orderDetailList: detailArrayList,
          couponInfoList,
          provinceId
        }

        // 调用提交订单的接口函数
        const result = await this.$API.reqSumitOrder(tradeNo, tradeInfo)
        if (result.code===200) { // 提交订单请求成功
          // 取出返回的订单id
          const orderId = result.data
          // 跳转到支付路由
          this.$router.push({
            path: '/pay',
            query: {orderId}
          })
        } else {
          alert(result.message || '提交订单失败')
        }

      },
      checkCoupon(couponIndex,couponAmount){
        if(this.couponIndex===couponIndex){
          this.couponIndex=null;
          this.tradeInfo.couponInfoList[couponIndex].isChecked=0;
          this.couponAmount=0;
        }else{
          this.couponIndex=couponIndex;
          this.tradeInfo.couponInfoList[couponIndex].isChecked=1;
          this.couponAmount=couponAmount;
        }
      },

      //使用自定义API组件,弹出新增地址窗口,并绑定确定和取消按钮的回调函数
      addAddressShow(){
        this.address = this.$address();
        this.address.cancel=()=>{
          this.address.unmount();
        }
        this.address.confirm=async (formData)=>{
          //当用户点击弹窗的确定按钮,收集表单中的数据,并发送请求,新增地址
          const result = await this.$API.reqSaveUserAddress(formData);

          if(result.code===200){
            //地址添加成功,重新请求最新的地址列表
            this.getUserAddressList()
            this.address.unmount();
          }else{
            console.log(result.message||"修改地址失败")
          }
        }
      },

      //请求用户地址列表
      async getUserAddressList(){
        await this.$store.dispatch('getUserAddressList');
        this.addressIndex=this.userAddressList.findIndex(address=>address.isDefault==="1")
      },

      //请求当前订单详情,并设置优惠券列表
      async getTradeInfo(){
        await this.$store.dispatch('getTradeInfo')
        this.couponIndex=this.tradeInfo.couponInfoList.findIndex(couponInfo=>{
          this.couponAmount=couponInfo.reduceAmount;
          return couponInfo.isChecked===1;
        })
      },

      //删除用户地址
      async removeUserAddress(addressId){
        let result = await this.$API.reqRemoveUserAddress(addressId);

        if(result.code===200){
            //地址删除成功,重新请求最新的地址列表
            this.getUserAddressList();
          }else{
            console.log(result.message||"修改地址失败")
          }
      },

      //更新用户地址
      updateUserAddress(addressIndex){
        console.log("updateUserAddress",addressIndex)
        this.address=this.$address();
        
        this.address.cancel=()=>{
          this.address.clear();
          this.address.unmount();
        }

        this.address.confirm=async (formData)=>{
          let result = await this.$API.reqUpdateUserAddress(formData)
          this.address.clear();
          this.address.unmount();
          if(result.code===200){
            //地址修改成功,重新请求最新的地址列表
            this.getUserAddressList();
          }else{
            console.log(result.message||"修改地址失败")
          }
        }

        this.address.formData=this.userAddressList[addressIndex];
      }
    }
  }
</script>

<style lang="less" scoped>
  .trade-container {
    .title {
      width: 1200px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 21px;
    }

    .content {
      width: 1200px;
      margin: 10px auto 0;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      box-sizing: border-box;

      .receive,
      .pay {
        line-height: 36px;
        margin: 18px 0;
      }

      .receive{
        a{
          font-size: 12px;
          float: right;
          &:hover{
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
      }

      .address {
        padding-left: 20px;
        margin-bottom: 15px;

        .username {
          float: left;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #ddd;
          position: relative;
        }

        .username::after {
          content: "";
          display: none;
          width: 13px;
          height: 13px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url(./images/choosed.png) no-repeat;
        }

        .username.selected {
          border-color: #e1251b;
        }

        .username.selected::after {
          display: block;
        }

        p {
          width: 610px;
          float: left;
          line-height: 30px;
          margin-left: 10px;
          padding-left: 5px;
          cursor: pointer;

          .s1 {
            float: left;

          }

          .s2 {
            float: left;
            margin: 0 5px;
          }

          .s3 {
            float: left;
            width: 56px;
            height: 24px;
            line-height: 24px;
            margin-left: 10px;
            background-color: #878787;
            color: #fff;
            margin-top: 3px;
            text-align: center;
          }
        }

        p:hover {
          background-color: #ddd;
        }
      }

      .line {
        height: 1px;
        background-color: #ddd;
      }

      .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;

        h5 {
          line-height: 50px;
        }

        .info {
          margin-top: 20px;

          .s1 {
            float: left;
            border: 1px solid #ddd;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }

          p {
            line-height: 30px;
          }
        }
      }

      .detail {
        width: 1080px;

        background: #feedef;
        padding: 15px;
        margin: 2px auto 0;

        h5 {
          line-height: 50px;
        }

        .list {
          display: flex;
          justify-content: space-between;
          .activity{
            width:500px;
            strong{
              font-weight: bold;
            }
            .ml20{
              margin-left:20px;
              font-weight: 700;
              display: inline-block; 
              border: 1px solid rgb(122, 189, 84); 
              color: rgb(122, 189, 84); 
              padding: 2px 5px;
            }
          }
          li {
            line-height: 30px;

            // p {
            //   margin-bottom: 20px;
            // }

            h4 {
              color: #c81623;
              font-weight: 400;
            }

            h3 {

              color: #e12228;
            }
          }
        }
      }

      .bbs {
        margin-bottom: 15px;

        h5 {
          line-height: 50px;
        }

        textarea {
          width: 100%;
          border-color: #e4e2e2;
          line-height: 1.8;
          outline: none;
          resize: none;
        }
      }

      .cardInfo{
        margin-bottom:25px;
        .step-tit{ 
          line-height: 36px;
          margin: 15px 0;
          .coupon-enable{
            display: block;
            width: 920px;
            clear: both;
            margin-top: 10px;
            .c-detail{
              width: 200px;
              height: 120px;
              margin-left: 20px;
              display: inline-block;
              &.item-selected{
                border: 2px solid #e43a3d;
                background-image: url(//misc.360buyimg.com/user/purchase/2.0.0/css/i/coupon-selected.png);
                background-repeat: no-repeat;
                background-position: bottom right;
              }
              .c-nopointer{
                cursor: default!important;    
                background-color: rgb(116, 210, 212);    
                height: 85px;
                width: 100%;
                position: relative;    
                border-left: 0;
                border-right: 0;
                .c-top-dong{
                  height: 3px;
                  width: 100%;
                  background: #fff url(https://misc.360buyimg.com/user/purchase/2.0.0/css/i/virtual-spite.png) -36px -6px no-repeat;
                }
                .c-price{
                  color: #fff;
                  font: 24px Arial,Verdana,'Microsoft YaHei',SimSun;
                  display: inline;
                  position: relative;
                  top: 8px;
                  margin-left: 12px;
                  vertical-align: bottom;
                  cursor: default!important;
                }
                .c-limit{
                  color: #f5f5f5;
                  font-size: 12px;
                  display: inline;
                  position: relative;
                  top: 7px;
                }
                .c-time{
                  padding-left: 12px;
                  margin-top: 10px;   
                }
              }
              .c-type{
                color: #74d2d4;
                border: 1px solid #cef0f1;
                width: 100%;
                box-sizing:border-box;
                .c-type-l{
                  margin: 0 5px 0 12px;
                }
                .c-type-r{
                  margin: 0;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }

    .order-summary{
      width:1200px;
      overflow: hidden;
      padding-right: 20px;
      margin:20px auto 0;
      .static{
        float:right;
        .list{
          line-height: 26px;
          span{
            float: left;
            width: 160px;
            .number{
              color:red;
            }
          }
          em{
            font-family: "微软雅黑";
          }
        }
      }
    }

    .trade {
      box-sizing: border-box;
      width: 1200px;
      padding: 10px;
      margin: 10px auto;
      text-align: right;
      background-color: #f4f4f4;
      border: 1px solid #ddd;

      div {
        line-height: 30px;
      }

      .price span {
        color: #e12228;
        font-weight: 700;
        font-size: 14px;
      }

      .receiveInfo {
        color: #999;
      }
    }

    .sub {
      width: 1200px;
      margin: 0 auto 10px;

      .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: #e1251b;

      }
    }

  }
</style>