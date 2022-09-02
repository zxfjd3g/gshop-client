<!--
 * @Author: 朽木白
 * @Date: 2022-09-02 08:54:20
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-09-02 09:35:09
 * @Description: 
-->
<template>
  <div :class="['el-skeleton__item', `el-skeleton__${variant}`]">
    <img-placeholder v-if="variant === 'image'" />
  </div>
</template>

<script>
import ImgPlaceholder from './img-placeholder';

export default {
  name: 'VSkeletonItem',
  props: {
    variant: {
      type: String,
      default: 'text',
    },
  },
  components: {
    [ImgPlaceholder.name]: ImgPlaceholder,
  },
};
</script>
