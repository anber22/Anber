<template>
  <div class="layout">
    <van-overlay :show="show" z-index="99999999" :lock-scroll="true">
      <div :class="flashingBox" @click="toDetail(hazardMessage.id)">
        <van-icon name="cross" color="rgba(255, 254, 254, 1)" class="close-button" @click.stop="closeMeaasge()" />
        <div class="content">
          <div class="content-left">
            <div class="unread" />
            <div class="icon-box">
              <img class="icon" src="@/assets/images/public/warning.png" alt="">
            </div>
          </div>
          <div class="content-right">
            <div class="title">
              {{ hazardMessage.equipAddress }}
            </div>
            <div class="hazard-type">
              {{ hazardMessage.onlineMsg }}
            </div>
            <div class="date">
              {{ changeDate(hazardMessage.createdTime/1000) }}
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
      flashingBox: 'hazard-message',
      hazardList: [],
      working: false,
      waitTime: 0
    }
  },
  computed: {
    changeDate: function() {
      return function(val) {
        return this.dateFormat(val)
      }
    }
  },
  watch: {
    '$route'(to, from) {
      if (from.path === '/placeResourceAddition' && to.path === '/placeResource') {
        window.localStorage.removeItem('equipList')
        window.localStorage.removeItem('placeResource')
      }
      if (this.$route.path === '/login') {
        return
      }
      if ((from.path === '/login' || (from.path === '/' && to.path !== '/login')) && this.$route.path !== '/login') {
        this.initSockets()
      }
    }
  },
  mounted() {
    if (this.$route.path !== '/login') {
      this.initSockets()
    }
  },
  destroyed() {
    Socket.unsubscribe('layout')
  },
  methods: {
    /**
     *  点击 X 关闭消息蒙层
     */
    closeMeaasge() {
      // 如果事件队列长度还有最后一个
      if (this.hazardList.length < 2) {
        // 直接关闭消息蒙层
        this.show = false
        // 清除闪烁定时器
        clearInterval(this.flashingTimer)
        this.hazardList.splice(0, 1)

        this.working = false
      } else {
        // 删除事件队列第一个
        this.hazardList.splice(0, 1)
        // 清除闪烁定时器
        clearInterval(this.flashingTimer)
        this.messageQueue()
      }
      // 清除当前事件队列等待定时器 直接跳过当前执行下一个
      clearTimeout(this.waitTime)
    },
    /**
     * 收到消息
     */
    onMessage(msg) {
      if (this.$route.path !== '/login') {
        // 收到socket通知添加msg到事件队列
        this.hazardList.push(msg)
        // 如果事件队列没有在执行 ，就开启事件队列
        if (!this.working) {
          this.messageQueue(msg)
        }
      }
    },
    /**
     * 初始化socket
     */
    initSockets() {
      // 定义频道列表 topicName  频道名称 refsList 订阅该频道的队列列表
      const topicList = [
        {
          topicName: 'realTimeWarning',
          refsList: [{
            domName: 'layout',
            dom: this
          }]
        }
      ]
      // 初始化socket
      Socket.initSocket(topicList)
    },
    /**
     * 时间格式转换
     */
    dateFormat(date) {
      const dateFormat = new DateTransformation()
      return dateFormat.dataFormatStamp(date)
    },
    /**
     * 点击跳转详情
     */
    toDetail(detailId) {
      this.show = false
      clearInterval(this.flashingTimer)
      this.flashingTimer = 0

      this.$router.push({
        path: '/hazardDetail',
        query: {
          hazardId: detailId
        }
      })
    },
    /**
     * 事件队列
     */
    messageQueue(msg) {
      // 开启消息队列
      this.working = true
      // 打开消息蒙层
      this.show = true
      // 清除闪烁定时器
      clearInterval(this.flashingTimer)
      // 信息卡片赋值   永远取事件队列的第一条
      this.hazardMessage = this.hazardList[0]
      // 闪烁定时器打开
      this.flashingTimer = setInterval(() => {
        this.flashingBox = this.flashingBox === 'hazard-message' ? 'hazard-message-light' : 'hazard-message'
      }, 300)

      // 消息队列定时器打开 十秒执行一次
      this.waitTime = setTimeout(() => {
        // 十秒之后执行删除第一条
        this.hazardList.splice(0, 1)
        // 事件队列还有值
        if (this.hazardList.length > 0) {
          // 递归调用执行消息队列
          this.messageQueue()
          // 如果事件队列空了
        } else {
          // 关闭蒙层
          this.show = false
          // 清除闪烁定时器
          clearInterval(this.flashingTimer)
          // 关闭消息队列执行状态
          this.working = false
        }
      }, 10000)
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
  margin: 70% 13.2% 0px 13.2%;
  text-align: center;
  border: 1px solid #431B0E;
  background: rgba(19, 27, 37, 1);
  box-shadow:0px 0px  12px 7px #431B0E;
}
.hazard-message{
  width: 73.6%;
  height: 110px;
  margin: 70% 13.2% 0px 13.2%;
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
  width: 80%;
  font-family: PingFang SC;
  overflow: hidden;
  font-weight: 500;
  color: #B9CEE9;
  text-align: left;

  white-space:nowrap;
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
