<template>
  <div class="message-push">
    <van-cell value="内容">
      <template #title>
        <page-title :title="title"/>
      </template>
      <template #default>
        <div class="switch">
          <van-switch v-model="isPushed"
            active-color="#13E8FF"
            inactive-color="#8B96B5"
           />
        </div>
      </template>
   </van-cell>
   <div class="options">
     <van-radio-group v-model="messageOptions"
      direction="horizontal"
    >
       <van-radio name="1" shape="square">微信公众号</van-radio>
       <van-radio name="2" shape="square">语音</van-radio>
       <van-radio name="3" shape="square">短信</van-radio>
    </van-radio-group>
   </div>

   <div class="end-line">
   </div>

  </div>
</template>

<script>
import PageTitle from 'cmp/pageTitle/PageTitle';

export default {
  name: "messagePush",
  props: {
    title: {
      type: String,
      require: true
    }
  },
  components: {
    PageTitle
  },
  data() {
    return {
      isPushed: true,
      messageOptions: ""
    }
  }
}
</script>

<style>
  .message-push {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 14px;
  }

  .message-push .van-cell {
    height: 45px;
    background-color: #07101A;
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
    background-color: #06101B;
    height: 20px;
    width: 20px;
  }

  .message-push .van-switch--on  .van-switch__node {
    transform: translateX(13px);
  }

  .options {
    width: 100%;
    color: #8CA4C3;
    margin-bottom: 15px;
  }

  .options .van-radio-group--horizontal {
    display: flex;
    justify-content: space-between;
    padding: 0 26px;
  }

  .options .van-radio__label {
    color: #8CA4C3;
    font-size: 15px;
  }

  .options .van-icon {
    position: relative;
    top: 4px;
    width: 14px;
    height: 14px;
    border: 1px solid #99b2d3;
    border-radius: 1px;
  }

  .options  .van-radio__icon--checked .van-icon {
    color: #0F1721;
    background: linear-gradient(78deg,#1df2ff 19%, #008eff 100%);
    border: 0;
  }

  .options  .van-radio__icon--checked .van-icon::before {
    position: relative;
    right: 1px;
    bottom: 3px;
  }


  .end-line {
    height: 1px;
    width: 345px;
    background-color: #283444;
  }

</style>