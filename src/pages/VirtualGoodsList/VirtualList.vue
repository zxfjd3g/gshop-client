<!--
 * @Author: 朽木白
 * @Date: 2022-09-02 15:09:47
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-09-02 16:15:57
 * @Description: 虚拟列表组件
 * @doc: https://juejin.cn/post/6844903449297944589#heading-8
 * @github: https://github.com/hejianxian/vue-list
-->
<template lang="html">
  <div class="vue-list" @scroll="handleScroll">
    <ul
      :style="{
        paddingTop: lineTopHeight + 'px',
        paddingBottom: lineBottomHeight + 'px',
      }"
    >
      <li v-for="good in previewList" :key="good.id">
        <div class="list-wrap">
          <div class="p-img">
            <router-link :to="`/detail/${good.id}`">
              <img v-lazy="good.defaultImg" />>
            </router-link>
          </div>
          <div class="price">
            <strong>
              <em>¥</em>
              <i>{{ good.price }}</i>
            </strong>
          </div>
          <div class="attr">
            <router-link :to="`/detail/${good.id}`">{{
              good.title
            }}</router-link>
          </div>
          <div class="commit">
            <i class="command">已有<span>2000</span>人评价</i>
          </div>
          <div class="operate">
            <a
              href="javascript:void(0);"
              class="sui-btn btn-bordered btn-danger"
              >加入购物车</a
            >
            <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
          </div>
        </div>
      </li>
    </ul>
    <div
      class="load-more-gif"
      v-loading="true"
      element-loading-text="拼命加载中"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'virtual-list',
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
      twoWays: true,
    },
    height: {
      type: Number,
      default: 44,
    },
    canScroll: {
      type: Boolean,
      default: true,
    },
    dispatchData: {
      type: Function,
    },
  },
  data() {
    return {
      lastScrollTop: null,
      distance: 403,
      lineTopHeight: 0,
      lineBottomHeight: 0,
      canLoadmore: true,
      previewList: [],
      displayCount: 0,
    };
  },
  mounted() {
    this.initData();
    this.handleScroll();
  },
  methods: {
    initData() {
      // init all data
      (this._rowsInWindow = Math.ceil(this.$el.offsetHeight / this.height)),
        (this._above = this._rowsInWindow * 2),
        (this._below = this._rowsInWindow),
        (this._max = this._rowsInWindow * this.height);
    },
    handleScroll() {
      let _scrollTop = this.$el.scrollTop,
        _height = this.$el.querySelectorAll('ul')[0].offsetHeight,
        _contentHeight = this.$el.offsetHeight;
      // Counts the number of rows on the current screen
      if (
        _scrollTop / this.height - Math.floor(_scrollTop / this.height) >
        0.5
      ) {
        this.displayCount = Math.ceil(_scrollTop / this.height);
      } else {
        this.displayCount = Math.floor(_scrollTop / this.height);
      }
      // if the maximum height is exceeded, reset the previewList
      if (
        this.lastScrollTop === null ||
        Math.abs(_scrollTop - this.lastScrollTop) > this._max
      ) {
        this.lastScrollTop = _scrollTop;
      } else {
        if (
          this.to === this.list.length &&
          _height - _scrollTop - _contentHeight < this.distance
        ) {
          this.canScroll && this.loadmore(this.from, this.to);
        }
        return;
      }
      // get from and to count
      let _from = parseInt(_scrollTop / this.height) - this._above;
      if (_from < 0) {
        _from = 0;
      }
      let _to = _from + this._above + this._below + this._rowsInWindow;
      if (_to > this.list.length) {
        _to = this.list.length;
      }
      this.from = _from;
      this.to = _to;
      // set top height and bottom height
      this.lineTopHeight = _from * this.height;
      this.lineBottomHeight = (this.list.length - _to) * this.height;
      // dispatch data
      if (typeof this.dispatchData === 'function') {
        this.dispatchData(this);
      }
      this.resetPreviewList(_from, _to);
      this.$nextTick(() => {
        let _scrollTop = this.$el.scrollTop,
          _height = this.$el.querySelectorAll('ul')[0].offsetHeight,
          _contentHeight = this.$el.offsetHeight;
        if (
          _to === this.list.length &&
          _height - _scrollTop - _contentHeight < 0
        ) {
          this.canScroll && this.loadmore(this.from, this.to);
        }
      });
    },
    loadmore(from, to) {
      if (!this.canLoadmore) return;
      this.canLoadmore = false;
      // fetch mock
      setTimeout(() => {
        for (var i = 0; i < 50; i++) {
          this.list.push({
            id: COUNT++,
            title: '手机' + COUNT++,
            defaultImg: '',
            price: Math.ceil(Math.random() * 1000),
          });
        }
        let _from = from,
          _to = to + this._below;
        this.resetPreviewList(_from, _to);
        this.lineBottomHeight = (this.list.length - _to) * this.height;
        this.handleScroll();
        this.canLoadmore = true;
      }, 1500);
    },
    resetPreviewList(from, to) {
      // reset previewList
      this.previewList = [];
      for (; from < to; from++) {
        this.previewList.push(this.list[from]);
      }
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.vue-list {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  &::scroll-bar {
    width: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      height: 403px;
      width: 20%;
    }
  }
  .load-more-gif {
    width: 100%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    background: #fff;
    border-top: none;
    color: #48b884;
  }
}

li {
  .list-wrap {
    .p-img {
      padding-left: 15px;
      width: 215px;
      height: 255px;

      a {
        color: #666;

        img {
          max-width: 100%;
          height: 100%;
          vertical-align: middle;
        }
      }
    }

    .price {
      padding-left: 15px;
      font-size: 18px;
      color: #c81623;

      strong {
        font-weight: 700;
      }
    }

    .attr {
      padding-left: 15px;
      width: 85%;
      overflow: hidden;
      margin-bottom: 8px;
      min-height: 38px;
      cursor: pointer;
      line-height: 1.8;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;

      a {
        color: #333;
        text-decoration: none;
      }
    }

    .commit {
      padding-left: 15px;
      height: 22px;
      font-size: 13px;
      color: #a7a7a7;

      span {
        font-weight: 700;
        color: #646fb0;
      }
    }

    .operate {
      padding: 12px 15px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        border-radius: 0;
        background-color: transparent;
        margin-right: 12px;
      }

      .btn-bordered {
        min-width: 85px;
        background-color: transparent;
        border: 1px solid #8c8c8c;
        color: #8c8c8c;

        &:hover {
          border: 1px solid #666;
          color: #fff !important;
          background-color: #666;
          text-decoration: none;
        }
      }

      .btn-danger {
        border: 1px solid #e1251b;
        color: #e1251b;

        &:hover {
          border: 1px solid #e1251b;
          background-color: #e1251b;
          color: white !important;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
