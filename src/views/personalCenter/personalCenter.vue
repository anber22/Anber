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
          :src="personInfo.avatar"
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
      <div class="message">
        <van-cell is-link to="UnreadEvents">
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
            <div class="message-number">
              2
            </div>
          </template>
        </van-cell>
      </div>
    <!-- 消息中心 end -->
    </div>
    <!-- 背景 end -->

    <!-- 消息推送 start -->
    <div class="event-push">
      <MessagePush :title="'事件推送'" />
    </div>
    <!-- 消息推送 end -->

    <!-- 消息推送 start -->
    <div class="error-push">
      <MessagePush :title="'故障推送'" />
    </div>
    <!-- 消息推送 end -->

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
import { getUserInfo } from '@/utils/auth.js'
import MessagePush from 'cmp/messagePush/MessagePush'
import { mapActions } from 'vuex'

export default {
  name: 'PersonalCenter',
  components: {
    MessagePush
  },
  data() {
    return {
      personInfo: {}
    }
  },
  created() {
    this.getPersonInfo()
  },
  methods: {
    ...mapActions([
      'RemoveToken'
    ]),
    logOut() {
      this.RemoveToken()
      this.$router.push('/login')
    },
    goNext() {
      this.$router.push('/iotApp')
    },

    getPersonInfo() {
      const res = getUserInfo()
      this.personInfo = res
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

</style>
<style src="./PersonalCenter.css" scoped/>
