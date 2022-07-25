  
/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
  显示进度条: 请求拦截器回调
  结束进度条: 响应拦截器回调
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
5. 每个请求自动携带userTempId的请求头: 在请求拦截器中实现
6. 如果当前有token, 自动携带token的请求头
*/
import NProgress from 'nprogress'
import {Message} from 'element-ui'
import axios from 'axios'
import store from '@/store'

// 创建instance
const instance = axios.create({
  // baseURL: 'http://39.99.186.36:8200/api',
  baseURL: '/api',
  timeout: 20000
})


  // 指定请求拦截器
instance.interceptors.request.use(config => {

  // 显示进度条: 请求拦截器回调
  NProgress.start()

  /* 每个请求自动携带userTempId的请求头: 在请求拦截器中实现 */
  const userTempId = store.state.user.userTempId
  config.headers.userTempId = userTempId

  /* 6. 如果当前有token, 自动携带token的请求头 */
  const {token, userInfo:{userId}} = store.state.user
  // debugger
  if (token) {
    config.headers.token = token
  }
  if (userId) {
    config.headers.userId = userId
  }
  
  return config // 必须返回config
}) 

// 指定响应拦截器
instance.interceptors.response.use(
  response => { // 成功的回调
    // 结束进度条: 响应拦截器回调
    NProgress.done()

    // 成功返回的数据不再是response, 而直接是响应体数据response.data
    return response.data
  },

  async error => { // 失败的回调
    // 结束进度条: 响应拦截器回调
    NProgress.done()

    // 统一处理请求错误, 具体请求也可以选择处理或不处理
    // alert('请求出错: ' + error.message||'未知错误')

    // 取出响应对象
    const { response } = error
    // 如果是请求处理出错
    if (response && response.status) {
      // 401说明token非法
      if (response.status === 401) {
        // 如果当前没在登陆页
        if (router.currentRoute.path!=='/login') {
          // 分发action去清除用户token信息
          await store.dispatch('logout')
          // 跳转到登陆页面
          router.replace('/login')
          // 提示
          Message.error('登陆已过期, 请重新登陆')
        }
      } else {
        Message.error('请求出错: ' + error.message||'未知错误')
      }
    } else if (!response) { // 网络连接不上服务器
      Message.error('您的网络发生异常，无法连接服务器')
    }

    // throw error
    return Promise.reject(error) // 将错误向下传递
  }
)

// 向外暴露instance
export default instance
