<!--
 * @Author: 朽木白
 * @Date: 2022-09-02 14:54:49
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-09-02 16:15:17
 * @Description: 虚拟商品列表
-->
<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="preview-content">
        <VirtualList :list.sync="list" :dispatchData="setData" />
      </div>
    </div>
  </div>
</template>

<script>
import VirtualList from './VirtualList.vue';
window.COUNT = 1;
export default {
  name: 'list',
  components: {
    VirtualList,
  },
  data() {
    return {
      list: [],
      data: {},
    };
  },
  created() {
    // 模拟数据
    for (var i = 0; i < 50; i++) {
      this.list.push({
        id: COUNT++,
        title: '手机' + COUNT++,
        defaultImg:
          'http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAcbl2AAFopp2WGBQ404.jpg',
        price: Math.ceil(Math.random() * 1000),
      });
    }
  },
  methods: {
    setData(data) {
      this.data = data;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 1200px;
  margin: 0 auto;
}
.preview-content {
  width: 100%;
  height: 622px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
