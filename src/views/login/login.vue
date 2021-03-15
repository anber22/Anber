<template>
  <div class="login-box">
    <div class="logo-box">
      <Adaptive :data="['100%', '32%']">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="require('/src/assets/images/login/logo.png')"
          :show-error="false"
          :show-loading="false"
        />
      </Adaptive>
    </div>
    <p class="title">
      高新建投智慧视觉平台
    </p>
    <div class="tab-box">
      <van-tabs v-model="activeTab" title-active-color="#06F0FE" title-inactive-color="#6F85A2" line-height="2px">
        <van-tab title="短信登录">
          <div class="form-box">
            <div class="form-content">
              <!-- 输入手机号，调起手机号键盘 -->
              <van-image
                width="40px"
                height="44px"
                fit="cover"
                :src="require('/src/assets/images/login/phone.png')"
                :show-error="false"
                :show-loading="false"
              />
              <van-field v-model="isSMSData.phone" type="tel" placeholder="请输入手机号" />
            </div>
            <div class="form-content">
              <van-image
                width="40px"
                height="44px"
                fit="cover"
                :src="require('/src/assets/images/login/code.png')"
                :show-error="false"
                :show-loading="false"
              />
              <van-field
                v-model="isSMSData.code"
                center
                clearable
                placeholder="请输入验证码"
              >
                <template #button>
                  <van-button class="send-code" size="small" type="primary" @click="getPhoneCode()">
                    {{ yzm_state ? yzm_state + "秒" : "发送验证码" }}
                  </van-button>
                </template>
              </van-field>
            </div>
          </div>
        </van-tab>
        <van-tab title="账号登录">
          <div class="form-box">
            <div class="form-content">
              <!-- 输入用户名称，调起手机号键盘 -->
              <van-image
                width="40px"
                height="44px"
                fit="cover"
                :src="require('/src/assets/images/login/userName.png')"
                :show-error="false"
                :show-loading="false"
              />
              <van-field v-model="isPasswordData.userName" type="tel" placeholder="请输入用户名称" />
            </div>
            <div class="form-content">
              <!-- 输入密码 -->
              <van-image
                width="40px"
                height="44px"
                fit="cover"
                :src="require('/src/assets/images/login/password.png')"
                :show-error="false"
                :show-loading="false"
              />
              <van-field v-model="isPasswordData.password" type="password" placeholder="请输入用户密码" />
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="login-button-box">
        <Adaptive :data="['100%', '13.333%']">
          <van-button type="default" class="login-button" color="linear-gradient(78deg, #008EFF, #1DF2FF)" @click="login">
            登录
          </van-button>
        </Adaptive>
      </div>
    </div>
  </div>
</template>

<script>
import Regular from '@/utils/regular'
import User from '@/api/user'
export default {
  components: {

  },
  data() {
    return {
      activeTab: 1,
      isPasswordData: {
        userName: '18666121714',
        password: '123456'
      },
      isSMSData: {
        phone: '',
        code: ''
      },
      yzm_state: 0
    }
  },
  methods: {
    login() {
      // activeTab:0 短信登录，activeTab:1 账号(手机号)登录
      if (this.activeTab === 0) {
        this.isSMSLogin()
      } else {
        this.isPasswordLogin()
      }
    },
    // 获取手机号验证码
    async getPhoneCode() {
      var regular = new Regular()

      const param = this.isSMSData.phone
      if (!param) {
        this.$Toast('手机号不能为空')
        return
      }
      if (!regular.phone(param)) {
        this.$Toast('手机号码输入有误')
        return
      }
      // 距离上次点击未到60秒不让你进来
      if (this.yzm_state) {
        return
      }
      const res = await User.getPhoneCode(param)
      if (res.code === 200) {
        this.yzm_state = 60
        const yzmTime = setInterval(() => {
          if (this.yzm_state) {
            this.yzm_state--
          } else {
            clearInterval(yzmTime)
          }
        }, 1000)
      } else {
        this.$Toast(res.message)
        this.yzm_state = 0
      }
    },
    /**
     * 短信登录
     */
    async isSMSLogin() {
      var regular = new Regular()
      const param = {
        phone: this.isSMSData.phone,
        code: this.isSMSData.code
      }
      if (!param.phone) {
        this.$Toast('账号不能为空')
        return
      }
      if (!regular.phone(param.phone)) {
        this.$Toast('手机号码输入有误')
        return
      }
      if (!param.code) {
        this.$Toast('验证码不能为空')
        return
      }
      /**
       * 暂时不请求接口，勿删此段注释代码
       */
      // const res = await this.$store.dispatch('LoginByCode', param)
      // if (res.code === 200) {
      // this.$Toast(res.message)
      this.$Toast('登录成功')
      this.$router.push('/home')
      // } else {
      //   this.$Toast(res.message)
      // }
    },
    /**
     *密码登录
     */
    async isPasswordLogin() {
      var regular = new Regular()
      const param = {
        phone: this.isPasswordData.userName,
        password: this.isPasswordData.password,
        loginType: 0
      }
      if (!param.phone) {
        this.$Toast('账号不能为空')
        return
      }
      if (!regular.phone(param.phone)) {
        this.$Toast('手机号码输入有误')
        return
      }
      if (!param.password) {
        this.$Toast('密码不能为空')
        return
      }
      /**
       * 暂时不请求接口，勿删此段注释代码
       */
      // const res = await this.$store.dispatch('Login', param)

      // if (res.code === 200) {
      //   this.$Toast(res.message)
      this.$Toast('登录成功')
      this.$router.push('/home')
      // } else {
      //   this.$Toast(res.message)
      // }
    }
  }
}
</script>
<style scoped src='./login.css'></style>
<style>
.login-box .van-tabs__nav--line{
  border-top: 2px #263447 solid;
  background-color: transparent
}
.login-box .van-tabs__line{
  top: -2px;
  bottom: unset;
  background-color: #06F0FE;
  width: 60px;
}
.login-box .van-tab{
  font-size: 16px
}
.login-box .van-cell{
  background-color: transparent;
  padding-left: 7px;
  font-size: 16px
}
.login-box .van-tabs--line .van-tabs__wrap{
  width: 54%;
  margin: 0 auto;
}
.login-box .van-tabs__content{
  width: 80%;
  margin: 0 auto
}
.login-box .form-box input::-webkit-input-placeholder {
  color: #373F4A;
}
.login-box .form-box input::-moz-input-placeholder {
  color: #373F4A;
}
.login-box .form-box input::-ms-input-placeholder {
  color: #373F4A;
}
.login-box .form-box input:focus {
  color: rgba(139, 163, 194, 1) !important
}
/* input失去焦点时文字颜色 */
.login-box .van-field__control{
  color: #8BA3C2
}
</style>
