# gshop-client

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目难点介绍

### 1.骨架屏

- 组件目录：`/src/components/Skeleton`

- 全局绑定

```js
// mian.js 引入骨架屏
import Skeleton from '@/components/Skeleton';
import SkeletonItem from '@/components/Skeleton/item';

// 注册为组件
Vue.component(Skeleton.name, Skeleton);
Vue.component(SkeletonItem.name, SkeletonItem);
```

- 使用方式

```vue
<template>
  <v-skeleton :loading="loading" animated style="margin: 10px 0">
    <!-- 自定义骨架屏元素 -->
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
    <!-- 继续渲染的dom -->
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
</template>
```

- [api 使用参考](https://element.eleme.io/2.15/#/zh-CN/component/skeleton)

### 虚拟列表

- 文件目录`src/pages/VirtualGoodsList/index.vue`

- 使用方法

```vue
<template>
  <div class="preview-content">
    <VirtualList :list.sync="list" :dispatchData="setData" />
  </div>
</template>
```

- [参考文章](https://juejin.cn/post/6844903449297944589#heading-8)

### store 读取多个模块

新建一个`modules.js`文件

添加内容

```js
const files = require.context('./modules', false, /\.js$/);
const modules = {};
// 将文件列表赋值给modules
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default {
  modules,
};
```

如此，便可读取`modules`文件夹下面的多个公共模块

### 埋点

待定

### 限时秒杀

待定
