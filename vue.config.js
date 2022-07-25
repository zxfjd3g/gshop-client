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
      },

      '/xxx':{
        // target:'http://39.99.186.36',
        // target:'http://182.92.128.115',
        target:'http://39.98.123.333',
        changeOrigin:true,
        // pathRewrite:{
        //   '^/api':''
        // }
      },
    }
  },
}