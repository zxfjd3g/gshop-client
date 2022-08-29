// vue.config.js
module.exports = {
  lintOnSave: false, // 关闭ESLint的规则检查

  devServer: {
    proxy: {
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        changeOrigin:true,
        // pathRewrite:{
        //   '^/api':''
        // }
      }
    }
  },
}