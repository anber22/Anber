<template>
  <div class="personal-center">
    <!-- 背景 start -->
    <div class="personal-center-background">
      <!-- 用户头像 start -->
      <div class="personal-header">
        <van-image
          round
          width="46px"
          height="46px"
          :src="personInfo.avatar ? personInfo.avatar : require('/src/assets/images/personalCenter/avatar.png')"
        />
        <div class="info-display">
          <p class="username">
            {{ personInfo.name }}
          </p>
          <p class="phone">
            {{ personInfo.phone }}
          </p>
        </div>
      </div>
      <!-- 用户头像 end -->

      <!-- 消息中心 start -->
      <div class="message" :class="number>99?'max':''">
        <van-cell is-link @click="goToUnread">
          <template #title>
            <div class="message-title">
              <van-image
                width="14"
                height="13"
                :src="require('/src/assets/images/personalCenter/message.png')"
              />
              <span class="message-center">消息中心</span>
            </div>
          </template>
          <template #default>
            <div v-if="number>0" class="message-number">
              {{ number>99?'99+':number }}
            </div>
          </template>
        </van-cell>
      </div>
    <!-- 消息中心 end -->
    </div>
    <!-- 背景 end -->

    <!-- 事件推送 start -->
    <div class="event-push">
      <MessagePush v-if="eventSetting" :title="'事件推送'" :message-type="'event'" :push-setting="eventSetting" @setPushSetting="setEventPushSetting" />
    </div>
    <!-- 事件推送 end -->

    <!-- 故障推送 start -->
    <div class="error-push">
      <MessagePush v-if="errorSetting" :title="'故障推送'" :message-type="'error'" :push-setting="errorSetting" @setPushSetting="setErrorPushSetting" />
    </div>
    <!-- 故障推送 end -->

    <!-- 退出账号 start -->
    <div class="log-out">
      <van-button plain hairline type="primary" @click="logOut">
        退出当前账号
      </van-button>
    </div>
    <!-- 退出账号 end -->
  </div>
</template>

<script>
import { getUserInfo, removeUserInfo } from '@/utils/auth.js'
import MessagePush from 'cmp/messagePush/MessagePush'
import { mapActions } from 'vuex'
import Config from '/config.json'
import UserApi from '@/api/user.js'

export default {
  name: 'PersonalCenter',
  components: {
    MessagePush
  },
  data() {
    return {
      personInfo: {},
      eventSetting: null,
      errorSetting: null,
      number: -1
    }
  },
  created() {
    this.getPersonInfo()
    this.getEventPushSetting()
    this.getErrorPushSetting()
    this.gethazardNumber()
  },
  methods: {
    ...mapActions([
      'RemoveToken'
    ]),
    goToUnread() {
      this.$router.push({ path: '/unreadEvents' })
    },
    logOut() {
      this.RemoveToken()
      this.$store.commit('SET_PERMISSIONS', [])
      removeUserInfo()
      this.$router.push('/login')
    },
    goNext() {
      this.$router.push('/iotApp')
    },
    getPersonInfo() {
      const res = getUserInfo()
      this.personInfo = res

      if (this.personInfo && this.personInfo.avatar) {
        this.personInfo.avatar = `${Config.figureBedAddress}${this.personInfo.avatar}`
      }
    },
    /**
     * 获取隐患总数
     */
    async gethazardNumber() {
      const param = {
        type: 0,
        page: 1,
        size: 1,
        condition: '?isRead=0'
      }
      const res = await UserApi.hazardList(param)
      if (res.code === 200) {
        this.number = res.data.records
      }
    },
    /**
     * 获取用户事件推送设置信息
     */
    async getEventPushSetting() {
      const param = {
        userId: ''
      }
      const res = await UserApi.getEventSetting(param)
      if (res.code === 200) {
        this.eventSetting = res.data
      }
    },
    /**
     * 获取用户故障推送设置信息
     */
    async getErrorPushSetting() {
      const param = {
        userId: ''
      }
      const res = await UserApi.getErrorSetting(param)
      if (res.code === 200) {
        this.errorSetting = res.data
      }
    },
    /**
     * 设置事件推送方式
     */
    async setEventPushSetting(e) {
      const param = {
        userId: '',
        conditions: e
      }
      const res = await UserApi.setEventSetting(param)
      if (res.code === 200) {
        // this.errorSetting = res.data
      }
    },
    /**
     * 设置故障推送方式
     */
    async setErrorPushSetting(e) {
      const param = {
        userId: '',
        conditions: e
      }

      const res = await UserApi.setErrorSetting(param)
      if (res.code === 200) {
        // this.errorSetting = res.data
      }
    }
  }
}
</script>

<style>
  .message .van-cell {
    background-color: #151d27;
  }

  .log-out .van-button {
    width: 345px;
    height: 50px;
    border: 1px solid #4d628f;
    border-radius: 6px;
    background-color: #07101A;
    color: #4D628F;
    font-size: 16px;
  }
  .message.max .van-cell__value {
    overflow: initial;
  }
  .message.max .message-number {
    width: 23px;
    height: 23px;
    font-size: 9px;
  }

</style>
<style src="./personalCenter.css" scoped/>
