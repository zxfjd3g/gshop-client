<!--
 * @Author: 朽木白
 * @Date: 2022-08-30 08:27:15
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-09-02 10:38:35
 * @Description: 
-->
<template>
  <div class="today-recommend">
    <div class="py-container">
      <v-skeleton :loading="loading" animated style="margin: 10px 0">
        <template slot="template">
          <div style="display: flex;">
            <v-skeleton-item variant="image" style="flex: 1; height: 165px" />
            <v-skeleton-item
              v-for="item in recommends"
              :key="item.id"
              variant="image"
              style="flex: 1; height: 165px"
            />
          </div>
        </template>

        <ul class="recommend">
          <li class="clock">
            <div class="time">
              <img src="./images/clock.png" />
              <h3>今日推荐</h3>
            </div>
          </li>
          <li class="banner" v-for="item in recommends" :key="item.id">
            <img :src="item.imageUrl" />
          </li>
        </ul>
      </v-skeleton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TodayRecommend',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      recommends: (state) => state.home.recommends,
    }),
  },
};
</script>

<style lang="less" scoped>
.today-recommend {
  .py-container {
    width: 1200px;
    margin: 0 auto;

    .recommend {
      height: 165px;
      background-color: #eaeaea;
      margin: 10px 0;
      display: flex;

      .clock {
        width: 16.67%;
        background-color: #5c5251;
        color: #fff;
        font-size: 18px;
        text-align: center;

        .time {
          padding: 30px 0;
        }

        h3 {
          margin: 9px 0;
          font-weight: 700;
          font-size: 18px;
          line-height: 30.06px;
        }
      }

      .banner {
        width: 20.83%;

        img {
          width: 100%;
          height: 100%;
          transition: all 400ms;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
