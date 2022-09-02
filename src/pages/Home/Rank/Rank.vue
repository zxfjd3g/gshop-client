<template>
  <div class="rank">
    <div class="tab">
      <div class="tab-tit clearfix">
        <a href="javascript:;" class="on">
          <p class="img">
            <i></i>
          </p>
          <p class="text">热卖排行</p>
        </a>
        <a href="javascript:;">
          <p class="img">
            <i></i>
          </p>
          <p class="text">特价排行</p>
        </a>
        <a href="javascript:;">
          <p class="img">
            <i></i>
          </p>
          <p class="text">新品排行</p>
        </a>
      </div>
    </div>
    <div class="content">
      <v-skeleton :loading="loading" animated>
        <template slot="template">
          <div
            v-for="(item, index) in 4"
            :key="index"
            class="img-item"
            style="
              width: 269px;
              float: left;
              overflow: hidden;
              margin: 0 12px 10px;
            "
          >
            <v-skeleton-item
              variant="image"
              style="
                width: 230px;
                height: 210px;
                text-align: center;
                margin: 5px auto 18px;
              "
            ></v-skeleton-item>
            <v-skeleton-item variant="p" class="info-title"></v-skeleton-item>
            <v-skeleton-item variant="p" class="info-title"></v-skeleton-item>
            <v-skeleton-item variant="h1" class="info-price"></v-skeleton-item>
          </div>
        </template>
        <ul>
          <li>
            <div class="img-item">
              <p class="tab-pic">
                <a href="#">
                  <img src="./images/1.jpg" />
                </a>
              </p>
              <div class="tab-info">
                <div class="info-title">
                  <a href="#"
                    >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                    移动联通电信4G手机</a
                  >
                </div>
                <p class="info-price">定金：¥100.00</p>
              </div>
            </div>
            <div class="img-item">
              <p class="tab-pic">
                <a href="#">
                  <img src="./images/1.jpg" />
                </a>
              </p>
              <div class="tab-info">
                <div class="info-title">
                  <a href="#"
                    >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                    移动联通电信4G手机</a
                  >
                </div>
                <p class="info-price">定金：¥100.00</p>
              </div>
            </div>
            <div class="img-item">
              <p class="tab-pic">
                <a href="#">
                  <img src="./images/1.jpg" />
                </a>
              </p>
              <div class="tab-info">
                <div class="info-title">
                  <a href="#"
                    >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                    移动联通电信4G手机</a
                  >
                </div>
                <p class="info-price">定金：¥100.00</p>
              </div>
            </div>
            <div class="img-item">
              <p class="tab-pic">
                <a href="#">
                  <img src="./images/1.jpg" />
                </a>
              </p>
              <div class="tab-info">
                <div class="info-title">
                  <a href="#"
                    >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                    移动联通电信4G手机</a
                  >
                </div>
                <p class="info-price">定金：¥100.00</p>
              </div>
            </div>
          </li>
        </ul>
      </v-skeleton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rank',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="less" scoped>
.rank {
  width: 1200px;
  margin: 0 auto;

  .tab {
    margin: 0 auto;
    overflow: hidden;
    width: 312px;

    .tab-tit {
      text-align: center;

      a {
        display: block;
        padding: 0 18px;
        float: left;
        text-decoration: none;
        font-size: 16px;
        color: #999;

        p {
          margin: 5px 0;
        }

        .img {
          i {
            width: 35px;
            height: 35px;
            display: block;
            background: url(./images/bg0.png);
            margin-left: 10px;
          }
        }

        .text {
          line-height: 28px;
        }
      }

      .on {
        color: #e60012;

        .img {
          i {
            background-position: -35px 0;
          }
        }
      }
    }
  }

  .content {
    overflow: hidden;
    padding: 10px;

    ul {
      li {
        overflow: hidden;
        list-style: none;
        line-height: 18px;

        .img-item {
          border: 1px solid #e1251b;
          width: 269px;
          float: left;
          overflow: hidden;
          margin: 0 12px 10px;
          background: #fff;

          .tab-pic {
            width: 230px;
            height: 210px;
            overflow: hidden;
            text-align: center;
            margin: 5px auto 18px;

            a {
              img {
                width: 200px;
                height: 200px;
              }
            }
          }

          .tab-info {
            background: #fafafa;

            .info-title {
              height: 50px;
              line-height: 28px;
              overflow: hidden;
              margin: 0 auto;
              padding-left: 10px;

              a {
                color: #333;
                text-decoration: none;
              }
            }

            .info-price {
              font-size: 20px;
              color: #e1251b;
              height: 35px;
              padding-left: 10px;
              display: block;
              line-height: 24px;
              margin: 10px auto 0;
            }
          }
        }
      }
    }
  }
}
</style>
