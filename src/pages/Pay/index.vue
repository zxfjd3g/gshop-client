<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">
            请您在提交订单
            <em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：
            <em>{{$route.query.orderId}}</em>
          </span>
          <span class="fr">
            <em class="lead">应付金额：</em>
            <em class="orange money">￥{{codeInfo.totalFee}}</em>
          </span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">微信</span>与<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
        </ol>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li>
              <!-- target="_blank" -->
              <a :href="`http://api.atguigu.cn/api/payment/alipay/submit/${payInfo.id}`">
                <img src="./images/pay2.jpg">
              </a>
            </li>
            <li><img src="./images/pay3.jpg" @click="pay"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  export default {
    name: 'Pay',
    data(){
      return {
        payInfo:{},
        codeInfo: {}
      }
    },

    async mounted () {
      let result = await this.$API.reqOrderDetail(this.$route.query.orderId);
      if(result.code===200){
        this.payInfo=result.data;
        // 发送请求获取对应的微信支付二维码
        let codeInfoResult = await this.$API.reqPayInfo(this.payInfo.id);
        if(codeInfoResult.code === 200){
          this.codeInfo = codeInfoResult.data
        }
      }else{
        console.log(result.message||"请求订单详情失败")
      }
      // this.$store.dispatch('getPayInfo', this.$route.query.orderId)
    },

    methods: {
      pay () {
        // 根据支付的url生成对应的二维码图片显示
        QRCode.toDataURL(this.codeInfo.codeUrl)
          .then(url => {
            console.log(url)
            // 显示二维码图片
            this.$alert(`<img src="${url}"/>`, '请使用微信扫码支付', {
              dangerouslyUseHTMLString: true, // 将内容字符串作为html解析
              showClose: false, // 不显示右上角的关闭按钮
              showCancelButton: true, // 显示取消按钮
              cancelButtonText: '支付中遇到了问题',
              confirmButtonText: '已支付',
              center: true, // 水平居中显示
            })
              .then(() => {
                clearInterval(this.intervalId)
                this.intervalId = null
                // 跳转到成功页面
                this.$router.push('/paysuccess')
              })
              .catch(() => {
                this.$message.warning('请联系客服小姐姐')
                clearInterval(this.intervalId)
                this.intervalId = null
              })

            // 轮询获取订单的支付状态(每隔1S发个请求)
            this.intervalId = setInterval(() => {
              this.$API.reqOrderStatus(this.$route.query.orderId)
                .then(result => {
                  console.log(result.code)
                  if (result.code===200) { // 支付完成
                    // 清除定时器
                    clearInterval(this.intervalId)
                    this.intervalId = null
                    // 关闭对话框
                    this.$msgbox.close()
                    // 提示支付成功
                    this.$message.success('支付成功')
                    // 跳转到成功页面
                    this.$router.push('/paysuccess')
                    // 删除购物车中选中的商品
                    this.$store.dispatch('deleteCheckedCartItems')
                  }
                })
                .catch((error) => {
                  console.log('---', error)
                  this.$message.error('获取订单状态出错了!')
                  clearInterval(this.intervalId)
                  this.intervalId = null
                })
            }, 1000);

          })
          .catch(err => {
            alert('解决二维码失败!')
          })
      }
    },

    beforeDestroy () {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.$alert.close()
      }
    }
  }
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>
