<template>
  <div class="layout">
    <van-overlay :show="show" z-index="99999999" :lock-scroll="true">
      <div :class="flashingBox">
        <van-icon name="cross" color="rgba(255, 254, 254, 1)" class="close-button" @click="closeMeaasge()" />
        <div class="content">
          <div class="content-left">
            <div class="unread" />
            <div class="icon-box">
              <img class="icon" src="@/assets/images/public/warning.png" alt="">
            </div>
          </div>
          <div class="content-right">
            <div class="title">
              {{ hazardMessage.placeName + hazardMessage.equipAddress }}
            </div>
            <div class="hazard-type">
              {{ hazardMessage.onlineMsg }}
            </div>
            <div class="date">
              {{ changeDate(hazardMessage.createdTime) }}
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
    <slot />
  </div>
</template>

<script>
import Socket from '@/utils/socket'
import DateTransformation from '@/utils/dateTransformation.js'

export default {
  components: {
  },
  props: {

  },
  data() {
    return {
      show: false,
      hazardMessage: {},
      flashingTimer: 0,
      flashingBox: 'hazard-message'
    }
  },
  computed: {
    changeDate: function() {
      return function(val) {
        return this.dateFormat(val)
      }
    }
  },
  mounted() {
    this.initSockets()
  },
  methods: {
    /**
     * 关闭消息蒙层
     */
    closeMeaasge() {
      this.show = false
      clearInterval(this.flashingTimer)
    },
    /**
     * 收到消息
     */
    onMessage(msg) {
      console.log('layout收到消息', msg)
      this.show = true
      this.hazardMessage = msg
      this.flashingTimer = setInterval(() => {
        this.flashingBox = this.flashingBox === 'hazard-message' ? 'hazard-message-light' : 'hazard-message'
      }, 300)
      setTimeout(() => {
        this.show = false
        clearInterval(this.flashingTimer)
      }, 10000)
    },
    /**
     * 初始化socket
     */
    initSockets() {
      const topicList = [
        {
          topicName: 'realTimeWarning',
          refsList: [this]
        }
      ]
      console.log('订阅频道参数', topicList)
      Socket.initSocket(topicList)
    },
    /**
     * 时间格式转换
     */
    dateFormat(date) {
      var dateFormat = new DateTransformation()
      return dateFormat.dataFormatStamp(date)
    }
  }
}
</script>

<style scoped>
.layout{
  width: 100%;
  height: auto;
}
.hazard-message-light{
  width: 73.6%;
  height: 110px;
  margin: 80% 13.2% 0px 13.2%;
  text-align: center;
  border: 1px solid #431B0E;
  background: rgba(19, 27, 37, 1);
  box-shadow:0px 0px  12px 7px #431B0E;
}
.hazard-message{
  width: 73.6%;
  height: 110px;
  margin: 80% 13.2% 0px 13.2%;
  text-align: center;
  border: 1px solid #431B0E;

  background: rgba(19, 27, 37, 1);
}
.close-button{
  float: right;
  margin:8px 8px 0px 0px ;
}
.content{
  width: 100%;
  height: 72%;
  float: left;
}
.content-left{
  width:31%;
  height: 100%;
  float: left;
}
.content-right{
  width: 67%;
  padding-left: 2%;
  height: 100%;
  float: right;
text-align: left;

}
.unread{
  width: 6px;
  height: 6px;
  background: #FF1743;
  border-radius: 50%;
  margin-top: 35%;
  margin-left: 17%;
  float: left;
}
.icon-box{
  width: 45px;
  height: 45px;
  float: left;
  margin-top: 12%;
  margin-left: 14px;
  background-color: rgba(40, 52, 68, 0.38);
}
.icon{
  margin-top: 15px;
  width: 18px;
  height: 17px;
}
.title{
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #B9CEE9;
  text-align: left;
}
.hazard-type{
  width: auto;
  height: 21px;
  display: inline-block;
  background: #2A1A1D;
  padding: 0px 5px 0px 5px;
  border: 1px solid #FF1743;
  border-radius: 2px;
  font-size: 12px;
  line-height: 21px;
  margin-top: 6px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FF1743;
}
.date{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
  text-align: left;
  margin-top: 6px;
}
</style>
