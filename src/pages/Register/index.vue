<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone"
          name="phone" v-validate="{required: true,regex: /^1\d{10}$/}" 
          :class="{invalid: errors.has('phone')}">
        <button @click="sendCode" :disabled="!isRightPhone || computeTime>0" class="sendBtn">
           {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}
        </button>
        <span class="error-msg">{{ errors.first('phone') }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code"
          name="code" v-validate="{required: true, regex: /^\d{6}$/}"
          :class="{invalid: errors.has('code')}">
        <span class="error-msg">{{errors.first('code')}}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model="password"
          name="密码" v-validate="{required: true, min: 6, max: 10}"
          :class="{invalid: errors.has('密码')}">
        <span class="error-msg">{{errors.first('密码')}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="password2"
        name="确认密码" v-validate="{required: true, is: password}"
          :class="{invalid: errors.has('确认密码')}">
        <span class="error-msg">{{errors.first('确认密码')}}</span>
      </div>
      <div class="controls">
        <input type="checkbox" v-model="isAgree" name="协议" 
          v-validate="'agree'">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{errors.first('协议')}}</span>
      </div>
      
      <div class="btn">
        <button @click="register">完成注册</button>
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
  export default {
    name: 'Register',

    data () {
      return {
        phone: '',
        code: '',
        password: '',
        password2: '',
        isAgree: true,
        computeTime: 0,
      }
    },

    computed: {
      // 判断phone是否是正确的手机号格式: 使用正则
      isRightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {

      /* 
      请求发送短信验证码
      */
      async sendCode () {
        return this.$message.error('演示系统不支持注册')

        // try {
        //   // 请求发送验证码
        //   const result = await this.$API.reqSendCode(this.phone)
        //   console.log(result)
        //   this.$message.success('短信已发送!')
        //   this.computeTime = 60
        //   // 启动循环定时器, 每隔1s, 将计时减1
        //   const intervalId = setInterval(() => {
        //     // 一旦变为了0, 停止计时
        //     if(this.computeTime<=0) {
        //       clearInterval(intervalId)
        //     } else {
        //       this.computeTime--
        //     }
        //   }, 1000)
        // } catch(error) {
        //   // 停止计时
        //   // clearInterval(this.intervalId)
        //   this.computeTime = 0
        // }
      },

      /* 
      注册
      */
      async register () {
        return this.$message.error('演示系统不支持注册')


        // 进行前台表单校验
        // const success = await this.$validator.validateAll() // 对所有表单项进行验证
        // if (success) { // 校验通过
        //   // 分发注册的异步action
        //   const {phone, password, code} = this
        //   try {
        //     await this.$store.dispatch('register', {phone, password, code})
        //     // 成功了, 跳转到登陆
        //     this.$router.replace('/login')
        //     this.$message.success('注册成功, 请登陆')
        //   } catch(error) {
        //     // 失败了, 提示
        //     alert(error.message)
        //   }
        // }
      },
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
          &.invalid {
            border: 1px solid red;
          }
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }

        .sendBtn {
            background-color: #1299ec;
            border: 1px solid #1089d4;
            height: 30px;
            width: 80px;
            margin-left: 5px;
            color: white;
            font-size: 14px;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          background-color: #e1251b;
          border: 1px solid #e1251b;
          padding: 6px;
          border-radius: 0;
          font-size: 16px;
          font-family: 微软雅黑;
          word-spacing: 4px;
          color: white;
          width: 270px;
          height: 36px;
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