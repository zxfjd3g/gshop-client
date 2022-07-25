<template>
  <div class="detailContainer">
    <!-- 订单状态-->
    <div class="order-detail">
      <h4>订单详情</h4>
      <div class="order-bar">
        <div class="sui-steps-round steps-round-auto steps-4">
          <!--@todo 订单状态都有哪些属性？-->
          <div class="finished">
            <div class="wrap">
              <div class="round">1</div>
              <div class="bar"></div>
            </div>
            <div class="info">
              <span>提交订单</span>
              <span>{{dateTimes[0]}}</span>
            </div>
          </div>
          <div class="todo" :class="{finished: dateTimes[1]}">
            <div class="wrap">
              <div class="round">2</div>
              <div class="bar"></div>
            </div>
            <div class="info">
              <span>付款成功</span>
              <span>{{dateTimes[1]}}</span>
            </div>
          </div>
          <div class="todo" :class="{finished: dateTimes[2]}">
            <div class="wrap">
              <div class="round">3</div>
              <div class="bar"></div>
            </div>
            <div class="info">
              <span>发货</span>
              <span>{{dateTimes[2]}}</span>
            </div>
          </div>
          <div class="todo" :class="{finished: dateTimes[3]}">
            <div class="wrap">
              <div class="round">4</div>
              <div class="bar"></div>
            </div>
            <div class="info">
              <span>确认收货</span>
              <span>{{dateTimes[3]}}</span>
            </div>
          </div>
          <div class="todo" :class="{finished: dateTimes[4]}">
            <div class="wrap">
              <div class="round">5</div>
              <div class="bar"></div>
            </div>
            <div class="info">
              <span>评价晒单</span>
              <span>{{dateTimes[4]}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="order-state">
        <p>当前订单状态：<span class="red">{{orderInfo.orderStatusName}}</span></p>
        <!--									<p>还剩06天00小时 自动确认收货</p>-->
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="order-info">
      <h5>订单信息</h5>
      <p>收货地址：<span>{{orderInfo.deliveryAddress}}</span></p>
      <p>订单单号：<span>{{orderInfo.outTradeNo}}</span></p>
      <p>下单时间：<span>{{orderInfo.createTime}}</span></p>
      <!--@todo 订单支付时间字段未知-->
      <p>支付时间：<span>{{'test'}}</span></p>
      <p>支付方式：支付宝</p>
      <!--@todo 订单发货时间字段未知-->

      <p>发货时间：<span>{{'test'}}</span></p>
    </div>

    <!-- 订单商品 -->
    <div class="order-goods">
      <!-- 导航区域 -->
      <div class="nav">
        <span class="shop">商品</span>
        <span class="price">价格</span>
        <span class="count">数量</span>
        <span class="refundStatus">退款状态</span>
      </div>
      <!-- 商品内容区 -->
      <div class="goods-content">
        <div class="order-number">
          订单编号: <span class="number">{{orderInfo.outTradeNo}}</span>
        </div>
        <div class="goodsList">
          <div class="good-item" v-for="(orderItem, index) in orderInfo.orderDetailList" :key="orderItem.id">
            <div class="good-info">
              <img :src="orderItem.imgUrl" />
              <div class="info">
                <p>{{orderItem.skuName}}</p>
                <p class="guige">规格: <span>温泉喷雾150ml</span></p>
              </div>
            </div>
            <div class="good-price">¥{{orderItem.orderPrice}}</div>
            <div class="good-count">{{orderItem.skuNum}}</div>
            <div class="good-refund">{{orderItem.refundStatusString}}</div>
          </div>

        </div>

      </div>
      <div class="order-price">
        <p>商品总金额：￥{{orderInfo.originalTotalAmount}}</p>
        <p>运费金额：免费用</p>
        <p>返现：￥{{orderInfo.benefitReduceAmount}}</p>
        <p>使用优惠券：￥{{orderInfo.couponAmount}}</p>
        <h4 class="red">实际支付：￥{{orderInfo.totalAmount}}</h4>
      </div>
    </div>

    <!--猜你喜欢-->
    <div class="like-content">
      <div class="like-title">猜你喜欢</div>
      <div class="like-list">
        <div class="like-item">
          <img src="./img/itemlike01.png" alt="">
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">¥ 3699.00</div>
          <div class="evaluate">已有{{700}}人评价</div>
        </div>
        <div class="like-item">
          <img src="./img/itemlike02.png" alt="">
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">¥ 3699.00</div>
          <div class="evaluate">已有{{12}}人评价</div>
        </div>
        <div class="like-item">
          <img src="./img/itemlike03.png" alt="">
          <div class="attr">iphone手机</div>
          <div class="price">¥ 3699.00</div>
          <div class="evaluate">已有{{34}}人评价</div>
        </div>
        <div class="like-item">
          <img src="./img/itemlike04.png" alt="">
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">¥ 3699.00</div>
          <div class="evaluate">已有{{24}}人评价</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data(){
      return {
        orderInfo: {}, // 当前订单详情
        dateTimes: []
      }
    },
    mounted () {
      // 根据订单id获取当前订单详情
      let orderId = this.$route.params.orderId;
      this.getOrderInfo(orderId);
    },
    methods: {
      async getOrderInfo(orderId){
        let result = await this.$API.reqOrderInfo(orderId);
        console.log(result);
        this.orderInfo = result.data.orderInfo;
        const {date1,date2,date3,date4,date5,time1, time2,time3,time4,time5} = result.data
        if (date1) {
          this.dateTimes.push(date1 + ' ' + time1)
        }
        if (date2) {
          this.dateTimes.push(date2 + ' ' + time2)
        }
        if (date3) {
          this.dateTimes.push(date3 + ' ' + time3)
        }
        if (date4) {
          this.dateTimes.push(date4 + ' ' + time4)
        }
        if (date5) {
          this.dateTimes.push(date5 + ' ' + time5)
        }
      }
    },
    computed :{

    }
  }
</script>

<style lang="less" rel="stylesheet/stylus">
  .detailContainer {
    margin-left: 30px;
    .order-detail {
      &>h4 {
        font-size: 14px;
        line-height: 28px;
      }
      .steps-round-auto {
        width: 100%;
        display: flex;
        &>div{
          display: flex;
          flex-direction: column;
          &.finished {
            color: #e1251b!important;
            .wrap {
              .round {
                border: 4px solid #e1251b;
                color: #fff;
                background: #e1251b;
              }
              .bar {
                background: #e1251b;
              }
            }
          }
          .wrap {
            display: flex;
            .round {
              width: 22px;
              height: 22px;
              border-radius: 50%;
              /*background: #e1251b;*/
              text-align: center;
              line-height: 22px;
              border: 4px solid #d3d3d3;
              color: #999;
            }
            .bar {
              width: 120px;
              height: 6px;
              background: #d3d3d3;
              margin: auto 20px;
              border-radius: 6px;
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
          }
        }

      }
      .order-state {
        p{
          color: #555;
          font-size: 16px;
          margin: 18px 0;
          span {
            color: #e4393c;
            font-weight: 700;
            font-size: 20px;
          }
        }
      }
    }
    .order-info {
      padding: 5px 15px;
      margin-bottom: 10px;
      background-color: #f1f1f1;
      h5 {
        line-height: 24px;
        border-bottom: 1px solid #a8a6a6;
      }
      p {
        margin: 5px 0;
        line-height: 24px;
      }
    }
    .order-goods {
      background: #f1f1f1;
      padding-bottom: 30px;
      .nav {
        display: flex;
        span {
          text-align: center;
          height: 40px;
          line-height: 40px;
          font-weight: bold;
        }
        .shop {
          flex: 6;
        }
        .price{
          flex: 1;
        }
        .count{
          flex: 1;
        }
        .refundStatus {
          flex: 2;
        }
      }
      .goods-content {
        background: #fff;
        width: 97%;
        margin: 0 auto;
        .order-number {
          padding: 6px 8px;
          line-height: 18px;
          text-align: left;
          vertical-align: middle;
          border-top: 1px solid #e6e6e6;
        }
        .goodsList {
          .good-item {
            border-top: 1px solid #eee;
            padding: 10px 0;
            display: flex;
            .good-info {
              flex: 6;
              display: flex;
              &>img {
                width: 82px;
                height: 82px;
              }
              .info {
                width: 300px;
                position: relative;
                margin-left: 20px;
                &>p:first-child {
                  color: red;
                }
                .guige {
                  position: absolute;
                  bottom: 0;
                  color: #666;
                }
              }
            }
            .good-price {
              flex: 1;
              text-align: center;
            }
            .good-count {
              text-align: center;
              flex: 1;
            }
            .good-refund {
              text-align: center;
              flex: 2;
            }
          }
        }
      }
      .order-price {
        text-align: right;
        margin-top: 30px;
        margin-right: 30px;
        line-height: 24px;
        .red {
          color: #e4393c;
          font-weight: 700;
          font-size: 20px;
        }
      }
    }
    .like-content {
      margin-top: 20px;
      border: 1px solid #ddd;
      .like-title {
        overflow: hidden;
        padding: 12px 10px;
        background-color: #f1f1f1;
        border: 1px solid #ddd;
        border-top: none;
        font-size: 15px;
      }
      .like-list {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 30px;
        .like-item {
          width: 25%;
          &>img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 10px auto;
          }
          .attr {
            color: #666;
            padding: 0 20px;
          }
          .price {
            padding: 0 20px;
            font-size: 16px;
            color: #e4393c;
            font-weight: bold;
            line-height: 28px;
            margin-top: 10px;
          }
          .evaluate {
            padding: 0 20px;
          }
        }
      }
    }
  }
</style>
