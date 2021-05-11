<template>
  <div class="personalCenter">
    <personalHeader :person-info="headerInfo" />

    <!-- 消息中心 start -->
    <div class="message">
      <van-cell is-link>
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
          <div class="message-number">2</div>
        </template>
      </van-cell>
    </div>
    <!-- 消息中心 end -->

    <!-- 消息推送 start -->
    <div class="event-push">
      <message-push :title="'事件推送'" />
    </div>
    <!-- 消息推送 start -->

    <!-- 消息推送 start -->
    <div class="error-push">
      <message-push :title="'故障推送'" />
    </div>
    <!-- 消息推送 start -->

    <!-- 退出账号 start -->
      <div class="log-out">
        <van-button plain hairline type="primary">
          退出当前账号
        </van-button>
      </div>
    <!-- 退出账号 end -->
  </div>
</template>

<script>
import personalCenter from "@/api/personalCenter/personalCenter";
import PersonalHeader from "cmp/personalHeader/PersonalHeader";
import MessagePush from "cmp/messagePush/MessagePush";

export default {
  name: "personalCenter",
  components: {
    PersonalHeader,
    MessagePush
  },
  data() {
    return {
      personInfo: {}
    }
  },
  computed: {
    headerInfo() {
      return {
        phone: this.personInfo.phone,
        avatar: this.personInfo.avatar,
        userName: this.personInfo.userName
      }
    }
  },
  created() {
    this.getPersonInfo()
  },
  methods: {
    goNext() {
      this.$router.push('/iotApp')
    },
    async getPersonInfo() {
      try {
        const res = await personalCenter.personInfo();
        if (res.code === 200) {
          this.personInfo = {...res.data};
        }
      } catch (e) {
        throw e;
      }
    }
  }
}
</script>

<style>
  .title {
    font-size: 50px;
  }

  .personalCenter{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #101720;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  
  .message-number {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 2px;
    top: 3px;
    width: 1.3em;
    height: 1.3em;
    color: #FFFFFF;
    background: #FF1041;
    border-radius: 50%;
  }

  .message-title {
    display: flex;
    align-items: center;
    font-weight: 300;
    font-size: 14px;
    color: #BACEE9;
  }

  .message {
    margin:  15px;
  }

  .message-center {
    display: inline-block;
    margin-left: 12px;
  }

  .message .van-cell {
    background-color: #101720;
  }


  .error-push {
    margin-top: 15px;
  }

  .log-out {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
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
