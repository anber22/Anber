<template>
  <div class="message-push">
    <van-cell value="内容">
      <template #title>
        <page-title :title="title" />
      </template>
      <template #default>
        <div class="switch">
          <van-switch
            v-model="isPushed"
            active-color="#13E8FF"
            inactive-color="#8B96B5"
            @change="changeAll"
          />
        </div>
      </template>
    </van-cell>
    <div class="options">
      <van-checkbox-group
        v-model="messageOptions"
        direction="horizontal"
      >
        <van-checkbox name="Public" shape="square" @click="changeSetting(messageType+'Public','Public' )">
          微信公众号
        </van-checkbox>
        <van-checkbox name="Call" shape="square" @click="changeSetting(messageType+'Call','Call' )">
          语音
        </van-checkbox>
        <van-checkbox name="Msg" shape="square" @click="changeSetting(messageType+'Msg','Msg' )">
          短信
        </van-checkbox>
      </van-checkbox-group>
    </div>

    <div class="end-line" />
  </div>
</template>

<script>
import PageTitle from 'cmp/pageTitle/PageTitle'

export default {
  name: 'MessagePush',
  components: {
    PageTitle
  },
  props: {
    title: {
      type: String,
      require: true,
      default: ''
    },
    pushSetting: {
      type: Object,
      require: true,
      default: () => {}
    },
    messageType: {
      type: String,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      isPushed: true,
      messageOptions: [],
      settingInfo: {}
    }
  },
  created() {
    // TODO: 待优化
    this.settingInfo = this.pushSetting
    let count = 0
    if (this.messageType === 'event') {
      if (typeof this.pushSetting.eventPublic === 'number') {
        if (this.pushSetting.eventPublic !== 0) {
          this.messageOptions.push('Public')
          count = count + 1
        }
      }
      if (typeof this.pushSetting.eventCall === 'number') {
        if (this.pushSetting.eventCall !== 0) {
          this.messageOptions.push('Call')
          count = count + 1
        }
      }
      if (typeof this.pushSetting.eventMsg === 'number') {
        if (this.pushSetting.eventMsg !== 0) {
          this.messageOptions.push('Msg')
          count = count + 1
        }
      }
    } else if (this.messageType === 'error') {
      if (typeof this.pushSetting.errorPublic === 'number') {
        if (this.pushSetting.errorPublic !== 0) {
          this.messageOptions.push('Public')
          count = count + 1
        }
      }
      if (typeof this.pushSetting.errorCall === 'number') {
        if (this.pushSetting.errorCall !== 0) {
          this.messageOptions.push('Call')
          count = count + 1
        }
      }
      if (typeof this.pushSetting.errorMsg === 'number') {
        if (this.pushSetting.errorMsg !== 0) {
          this.messageOptions.push('Msg')
          count = count + 1
        }
      }
    }
    if (count > 0) {
      this.isPushed = true
    } else {
      this.isPushed = false
    }
  },
  methods: {
    /**
     * 多选框变化事件
     */
    changeSetting(type, name) {
      this.settingInfo[type] = this.settingInfo[type] === 0 ? 1 : 0
      if (this.messageType === 'event') {
        if (this.settingInfo.eventCall === 0 && this.settingInfo.eventMsg === 0 && this.settingInfo.eventPublic === 0) {
          this.isPushed = false
        } else {
          this.isPushed = true
        }
      } else if (this.messageType === 'error') {
        if (this.settingInfo.errorCall === 0 && this.settingInfo.errorMsg === 0 && this.settingInfo.errorPublic === 0) {
          this.isPushed = false
        } else {
          this.isPushed = true
        }
      }

      this.$emit(`setPushSetting`, this.settingInfo)
    },
    /**
     * 总开关事件
     */
    changeAll() {
      if (this.isPushed) {
        if (this.messageType === 'event') {
          this.settingInfo = { eventCall: 1, eventMsg: 1, eventPublic: 1 }
          this.messageOptions = ['Public', 'Call', 'Msg']
          this.$emit(`setPushSetting`, this.settingInfo)
        } else if (this.messageType === 'error') {
          this.settingInfo = { errorCall: 1, errorMsg: 1, errorPublic: 1 }
          this.messageOptions = ['Public', 'Call', 'Msg']
          this.$emit(`setPushSetting`, this.settingInfo)
        }
      } else {
        if (this.messageType === 'event') {
          this.settingInfo = { eventCall: 0, eventMsg: 0, eventPublic: 0 }
          this.messageOptions = []
          this.$emit(`setPushSetting`, this.settingInfo)
        } else if (this.messageType === 'error') {
          this.messageOptions = []
          this.settingInfo = { eerrorCall: 0, errorMsg: 0, errorPublic: 0 }
          this.$emit(`setPushSetting`, this.settingInfo)
        }
      }
    }
  }
}
</script>

<style>
  .message-push .van-cell {
    height: 45px;
    background-color: #101720;
    padding: 2px 16px;
    margin-bottom: 5px;
  }

  .message-push .van-cell::after {
    border-bottom: 0;
  }

  .message-push .van-switch {
    width: 33px;
    height: 20px;
  }

  .message-push .van-switch__node {
    background-color: #101720;
    height: 20px;
    width: 20px;
  }

  .message-push .van-switch--on  .van-switch__node {
    transform: translateX(13px);
  }

  .options .van-checkbox-group--horizontal {
    display: flex;
    justify-content: space-between;
    padding: 0 26px;
  }

  .options .van-checkbox__label {
    color: #8CA4C3;
    font-size: 15px;
  }

  .options .van-checkbox--disabled {
    opacity: .5;
  }

  .options .van-checkbox--disabled > * {
    background-color: #101720;
  }

  .options .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
    background: none !important;
    border: 1px solid #99b2d3 !important
  }

  .options .van-checkbox__icon--disabled > *::before {
    display: none;
  }

  .options .van-checkbox__icon--disabled .van-icon {
    background-color: #101720;
  }

  .options .van-checkbox__icon--checked .van-icon {
    background-color: #101720;
  }

  .options .van-icon {
    position: relative;
    top: 4px;
    width: 14px;
    height: 14px;
    border: 1px solid #99b2d3;
    border-radius: 1px;
  }

  .options  .van-checkbox__icon--checked .van-icon {
    color: #0F1721;
    background: linear-gradient(78deg,#1df2ff 19%, #008eff 100%);
    border: 0;
  }

  .options  .van-checkbox__icon--checked .van-icon::before {
    position: relative;
    right: 1px;
    bottom: 3px;
  }

</style>
<style src="./MessagePush.css" scoped/>
