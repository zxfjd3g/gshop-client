<!--
 * @Author: 朽木白
 * @Date: 2022-09-02 08:54:11
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-09-02 10:35:55
 * @Description: 骨架屏组件，默认样式采用的是elment-ui@2.15.8
 * @doc: https://element.eleme.io/2.15/#/zh-CN/component/skeleton
-->
<template>
  <div>
    <template v-if="uiLoading">
      <div
        :class="['el-skeleton', animated ? 'is-animated' : '']"
        v-bind="$attrs"
      >
        <template v-for="i in count">
          <slot v-if="loading" name="template">
            <v-skeleton-item
              v-for="item in rows"
              :key="`${i}-${item}`"
              :class="{
                'el-skeleton__paragraph': item !== 1,
                'is-first': item === 1,
                'is-last': item === rows && rows > 1,
              }"
              variant="p"
            />
          </slot>
        </template>
      </div>
    </template>
    <template v-else>
      <slot v-bind="$attrs"></slot>
    </template>
  </div>
</template>

<script>
import SkeletonItem from './item';

export default {
  name: 'VSkeleton',
  components: {
    [SkeletonItem.name]: SkeletonItem,
  },
  props: {
    animated: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 1,
    },
    rows: {
      type: Number,
      default: 4,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    throttle: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    loading: {
      handler(loading) {
        if (this.throttle <= 0) {
          this.uiLoading = loading;
          return;
        }
        if (loading) {
          clearTimeout(this.timeoutHandle);
          this.timeoutHandle = setTimeout(() => {
            this.uiLoading = this.loading;
          }, this.throttle);
        } else {
          this.uiLoading = loading;
        }
      },
    },
  },
  data() {
    return {
      uiLoading: this.throttle <= 0 ? this.loading : false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
