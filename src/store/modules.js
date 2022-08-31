/*
 * @Author: 朽木白
 * @Date: 2022-08-31 14:35:56
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-31 14:40:40
 * @Description:
 */
// 查找modules目录下的所有js文件
const files = require.context('./modules', false, /\.js$/);
const modules = {};
// 将文件列表赋值给modules
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default {
  modules,
};
