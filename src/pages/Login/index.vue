<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0;">扫描登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form action="##">
              <div class="input-text clearFix">
                <span></span>
                <input type="text" placeholder="手机号" v-model="phone" name="phone" 
                  v-validate="{required: true,regex: /^1\d{10}$/}" :class="{invalid: errors.has('phone')}">
                <div class="error-msg">{{ errors.first('phone') }}</div>
              </div>
              <div class="input-text clearFix">
                <span class="pwd"></span>
                <input type="password" placeholder="请输入密码" v-model="password"
                  name="密码" v-validate="{required: true, min: 6, max: 10}"
                  :class="{invalid: errors.has('密码')}">
                <div class="error-msg">{{ errors.first('密码') }}</div>
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input type="checkbox">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click.prevent="login">登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt=""></li>
                <li><img src="./images/sina.png" alt=""></li>
                <li><img src="./images/ali.png" alt=""></li>
                <li><img src="./images/weixin.png" alt=""></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  export default {
    name: 'Login',

    data () {
      return {
        phone: '13700032456',
        password: '111111'
      }
    },

    methods: {
      async login () {
        // 前台表单检验
        const success = await this.$validator.validateAll() // 对所有表单项进行验证
        if (!success) return 
         
        // 分发登陆的异步action
        const {phone, password} = this
        try {
          await this.$store.dispatch('login', {phone, password})
          // 成功了, 跳转到首页(后面会优化)
          const redirect = this.$route.query.redirect
          this.$router.replace(redirect || '/')
        } catch (error) {
          // 失败了, 提示
          alert(error.message)
        }
      }
    },

    // beforeRouteEnter中不能直接通过this得到组件对象
    // 因为此时组件对象还没有创建
    beforeRouteEnter (to, from, next) { // 路由前置守卫
      // const token = this.$store.state.user.userInfo.token
      /* const token = store.state.user.userInfo.token
      // 如果已经登陆, 自动跳转到首页
      if (token) {
        next('/')
      } else {
        // 如果还没有登陆, 才放行显示
        next()
      } */

      next(component => { // 组件对象创建后才执行
        console.log('next', this)
        const token = component.$store.state.user.userInfo.token
        // 如果已经登陆, 自动跳转到首页
        if (token) {
          next('/')
        } else {
          // 如果还没有登陆, 才放行显示
          next()
        }
      })
    }
    
  }
</script>

<style lang="less" scoped>
  .login-container {
    .login-wrap {
      height: 487px;
      background-color: #e93854;

      .login {
        width: 1200px;
        height: 487px;
        margin: 0 auto;
        background: url(./images/loginbg.png) no-repeat;
      }

      .loginform {
        width: 420px;
        height: 406px;
        box-sizing: border-box;
        background: #fff;
        float: right;
        top: 45px;
        position: relative;
        padding: 20px;

        .tab {

          li {
            width: 50%;
            float: left;
            text-align: center;

            a {
              width: 100%;
              display: block;
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              font-weight: 700;
              color: #333;
              border: 1px solid #ddd;
              box-sizing: border-box;
              text-decoration: none;

            }

            .current {
              border-bottom: none;
              border-top-color: #28a3ef;
              color: #e1251b;
            }
          }
        }

        .content {
          width: 380px;
          height: 316px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-top: none;
          padding: 18px;

          form {
            margin: 15px 0 18px 0;
            font-size: 12px;
            line-height: 18px;

            .input-text {
              margin-bottom: 16px;

              span {
                float: left;
                width: 37px;
                height: 32px;
                border: 1px solid #ccc;
                background: url(../../assets/images/icons.png) no-repeat -10px -201px;
                box-sizing: border-box;
                border-radius: 2px 0 0 2px;
              }

              .pwd {
                background-position: -72px -201px;
              }

              input {
                width: 302px;
                height: 32px;
                box-sizing: border-box;
                border-left: none;
                float: left;
                padding-top: 6px;
                padding-bottom: 6px;
                font-size: 14px;
                line-height: 22px;
                padding-right: 8px;
                padding-left: 8px;
                border-radius: 0 2px 2px 0;
                border: 1px solid #ccc;
                outline: none;
                &.invalid {
                  border: 1px solid red;
                }
              }

              .error-msg {
                color: red;
              }
            }

            .setting {
              label {
                float: left;
              }

              .forget {
                float: right;
              }
            }

            .btn {
              background-color: #e1251b;
              padding: 6px;
              border-radius: 0;
              font-size: 16px;
              font-family: 微软雅黑;
              word-spacing: 4px;
              border: 1px solid #e1251b;
              color: #fff;
              width: 100%;
              height: 36px;
              margin-top: 25px;
              outline: none;
            }
          }

          .call {
            margin-top: 30px;

            ul {
              float: left;

              li {
                float: left;
                margin-right: 5px;
              }
            }

            .register {
              float: right;
              font-size: 15px;
              line-height: 38px;
            }

            .register:hover {
              color: #4cb9fc;
              text-decoration: underline;
            }
          }

        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }

  }
</style>