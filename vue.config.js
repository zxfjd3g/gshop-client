// vue.config.js
module.exports = {
  lintOnSave: false, // 关闭ESLint的规则检查

  devServer: {
    proxy: {
      '/api1': { // 只对请求路由以/api开头的请求进行代理转发
        target: 'http://182.92.128.115', // 转发的目标url
        changeOrigin: true, // 支持跨域,
        pathRewrite:{
          '^/api1':'/api'
        }
      },
      '/api2':{
        // target:'http://39.99.186.36:8200',
        target:'http://39.99.186.36',
        changeOrigin:true,
        pathRewrite:{
          '^/api2':'/api'
        }
      },
      // '/cartapi':{
      //   // target:'http://39.99.186.36:8201',
      //   target:'http://api.atguigu.cn',
      //   changeOrigin:true,
      //   pathRewrite:{
      //     '^/cartapi':'/api'
      //   }
      // },
      // '/orderapi':{
      //   // target:'http://39.99.186.36:8204',
      //   target:'http://39.99.186.36',
      //   changeOrigin:true,
      //   pathRewrite:{
      //     '^/orderapi':'/api'
      //   }
      // },
      // '/userapi':{
      //   // target:'http://39.99.186.36:8208',
      //   target:'http://39.99.186.36',
      //   changeOrigin:true,
      //   pathRewrite:{
      //     '^/userapi':'/api'
      //   }
      // }
    }
  },
}