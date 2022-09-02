<!--
 * @Author: 朽木白
 * @Date: 2022-08-30 08:27:15
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-09-02 10:55:09
 * @Description: 
-->
<template>
  <div>
    <!-- 大写转小写, 中间用-连接 -->
    <type-nav />
    <!--列表-->
    <ListContainer :loading="loading" />
    <!--今日推荐-->
    <TodayRecommend :loading="loading" />
    <!-- 商品排行 -->
    <Rank :loading="loading" />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="floor in floors" :floor="floor" :key="floor.id" />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Brand from './Brand/Brand';
import Floor from './Floor/Floor';
import Like from './Like/Like';
import ListContainer from './ListContainer/ListContainer';
import Rank from './Rank/Rank';
import TodayRecommend from './TodayRecommend/TodayRecommend';
// import {reqBanners, reqFloors} from '@/api'

export default {
  name: 'Home',

  computed: {
    ...mapState({
      floors: (state) => state.home.floors, // [] ==> [{carouselList: []}, {}]
    }),
  },

  data() {
    return {
      loading: true,
    };
  },

  async mounted() {
    this.$store.dispatch('getBanners');
    this.$store.dispatch('getRecommends');
    this.$store.dispatch('getFloors');

    // 模拟数据请求完毕，skeleton loading效果关闭
    setTimeout(() => (this.loading = false), 2000);
  },

  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
};
</script>

<style lang="less" scoped></style>
