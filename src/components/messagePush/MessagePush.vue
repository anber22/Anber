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
          />
        </div>
      </template>
    </van-cell>
    <div class="options">
      <van-checkbox-group
        v-model="messageOptions"
        direction="horizontal"
        :disabled="!isPushed"
      >
        <van-checkbox name="1" shape="square">
          微信公众号
        </van-checkbox>
        <van-checkbox name="2" shape="square">
          语音
        </van-checkbox>
        <van-checkbox name="3" shape="square">
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
    }
  },
  data() {
    return {
      isPushed: true,
      messageOptions: []
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
