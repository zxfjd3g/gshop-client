<template>
  <div>
    <div class="refundList">
      <div class="body">
        <div class="table-title">
          <table class="sui-table order-table">
            <tr>
                <th width="30%">退款/退货宝贝</th>
                <th width="8%">类型</th>
                <th width="5%">金额</th>
                <th width="5%">数量</th>
                <th width="8%">原因</th>
                <th width="10%">交易状态</th>
                <th width="8%">退货单号</th>
                <th width="5%">操作</th>
            </tr>
          </table>
        </div>
        <div class="order-detail">
          <div class="orders">
            <div v-for="(refundApply,index) in refundList" :key="refundApply.id">
              <div class="choose-title hm-display-statistics">
                <label class="checkbox-pretty ">
                  <span>订单编号：{{ refundApply.outTradeNo }}  申请时间：{{ refundApply.createTime }}</span>
                </label>
              </div>
              <table class="sui-table table-bordered order-datatable">
                <tbody>
                <tr>
                  <td width="30%">
                    <div class="typographic">
                      <img :src="refundApply.imgUrl" width="45" height="65"/>
                      <router-link class="block-text" :to="`/detail/${refundApply.skuId}`">{{ refundApply.skuName }}</router-link>
                      <span class="guige">规格：温泉喷雾150ml</span>
                    </div>
                  </td>
                  <td width="5%" class="center">{{ refundApply.refundTypeString }}</td>
                  <td width="5%" class="center">
                    <ul class="unstyled">
                      <li class="o-price">¥{{ refundApply.orderPrice * refundApply.refundNum }}</li>
                      <li>¥{{ refundApply.refundAmount }}</li>
                    </ul>
                  </td>
                  <td width="5%" class="center">{{ refundApply.refundNum }}</td>
                  <td width="8%" class="center">
                    <ul class="unstyled">
                      <li><a>{{ refundApply.refundReasonTxt }}</a></li>
                    </ul>
                  </td>
                  <td width="10%" class="center">
                    <ul class="unstyled">
                      <li>{{ refundApply.refundStatusString }}</li>
                      <li v-if="refundApply.refundStatus == 'NOT_APPROVED'">原因：{{ refundApply.approveRemark }}</li>
                    </ul>
                  </td>
                  <td width="8%" class="center">{{ refundApply.trackingNo }}</td>
                  <td width="5%" class="center">
                    <ul class="unstyled">
                      <li v-if="refundApply.refundType == 'RETURN_GOODS' && refundApply.refundStatus == 'APPROVED'">
                        <a href="javascript:" @click="deleveredShow(refundApply.id)">发货</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        page: 1, // 页数
        limit: 10, // 限制数量
        refundList: []
      }
    },
    mounted(){
      this.getRefundList(this.page, this.limit)
    },
    methods: {
      async getRefundList(page, limit){
        let result = await this.$API.getRefundList(page, limit)
        if(result.code === 200){
          this.refundList = result.data.records;
        }else {
          alert('获取退货信息失败')
        }
      },

      deleveredShow(id){
        this.$prompt('请输入货单号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '必须输入'
        }).then(async ({ value }) => {
          await this.$API.delever(id, value)
          this.$message('提交发货请求完成')
          this.getRefundList(1, this.limit)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/stylus">
  .refundList {
    padding: 0 25px;
    .table-title {
      width: 100%;
      .sui-table {
        width: 100%;
        border: 1px solid #e6e6e6;
        border-collapse: separate;
        border-left: 0;
        border-radius: 2px;
        tr {
          width: 100%;
          th {
            background-color: #f4f4f4;
            border-left: 1px solid #e6e6e6;
            height: 30px;
            line-height: 30px;
          }
          td {
            border-left: 1px solid #e6e6e6;
          }
        }


      }
    }
    .order-detail{
      margin-bottom: 10px;
      .orders {
        padding: 10px 0;
        .choose-title {
          padding: 2px 0;
          margin-top: 10px;
          line-height: 28px;
          border: 1px solid #ddd;
          border-bottom: 0;
          overflow: hidden;
          background: #f1f1f1;
          .checkbox-pretty {
            float: left;
            padding-left: 10px;
            .radio-pretty {
              display: block;
              position: relative;

            }
            span {
              font-size: 12px;
              font-family: icon-pc;
            }
            span:before {
              content: "\e605";
              margin-right: 2px;
              vertical-align: -4px;
              font-size: 150%;
              color: #666;
              margin-left: -2px;
            }
          }
        }
        .sui-table.table-bordered {
          width: 100%;
          border: 1px solid #e6e6e6;
          border-collapse: separate;
          border-left: 0;
          border-radius: 2px;
          margin-bottom: 18px;
          max-width: 100%;
          background-color: transparent;
          border-spacing: 0;
          th {
            background-color: #f4f4f4;
            border-left: 1px solid #e6e6e6;
          }
          tbody {
            td {
              border-left: 1px solid #e6e6e6;
              padding: 10px 0;
              text-align: center;

              .typographic{
                img {
                  display: block;
                  float: left;
                  max-width: 100%;
                  border: 0;
                  margin: 0 10px ;
                }
                a {
                  display: block;
                  float: left;
                  min-width: 80px;
                  max-width: 250px;
                  color: #e1251b;
                  text-align: left;

                }
                .guige {
                  display: block;
                  float: left;
                  min-width: 80px;
                  max-width: 250px;
                  text-align: center;
                  line-height: 36px;
                  color: #a8a6a6;
                }
              }
              .unstyled {
                li {
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
