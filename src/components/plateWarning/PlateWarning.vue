<!-- 设备卡片 -->
<template>
  <div class="warin">
    <div class="hidden-trouble-detail">
      <div class="out-rect">
        <div v-if="violationsList.length>0" class="in-rect">
          <ul class="vio-list" :class=" play?'vio-up':''">
            <li
              v-for="(item,index) in violationsList"
              :key="index"
            >
              <!-- ！违规停放 -->
              <div class="illegal-parking">
                <img class="alert-icon" src="@/assets/images/alert.png" alt="">
                违规停放
              </div>
              <!-- 地址 -->
              <div class="park-address">
                {{ item.equipAddress }}
              </div>
              <!-- 时间 -->
              <div class="violations-time">
                {{ item.createdTime }}
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="no-data">
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Warning',
  components: {

  },
  props: {
    plateWarningData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      violationsList: [],
      timer: 0,
      play: false
    }
  },
  computed: {

  },
  created() {
    console.log('111', this.plateWarningData)
    this.violationsList = this.plateWarningData
    if (this.violationsList !== null) {
      if (this.violationsList.length > 1) {
        this.timer = setInterval(this.startPlay, 3000)
      }
    }
  },
  destroyed() { // 页面销毁时清除定时器
    clearInterval(this.timer)
  },
  methods: {
    startPlay() {
      const that = this
      that.play = true
      setTimeout(() => {
        that.play = false
        //  that.violationsList.unshift(that.violationsList[that.violationsList.length - 1])
        // that.violationsList.splice(that.violationsList.length - 1, 1)
        that.violationsList.push(that.violationsList[0])
        that.violationsList.shift()
      }, 500)
    }
  }
}
</script>

<style scoped>
.illegal-parking{
  display: inline;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 100;
  color: #FF1743;
}

.alert-icon{
  width: 24px;
  height: 23px;
}
.park-address{
  width: 110px;
  /* height: 100%; */
  line-height: 15px;
  margin : 0px 20px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 100;
  color: #B9CEE9;
  white-space: normal;
  word-break: break-all;
  display: inline-block;
}
.violations-time{
  color: #B9CEE9;
  font-weight: 100;
  display: inline-block;
  font-size: 15px;
}
.vio-list{
  list-style: none;
  width: 100%;
  text-align: center;
  overflow: hidden; /*key code*/
  height: 280px; /*key code*/
  padding: 0;
  overflow: hidden;
  margin-bottom: 20px;
}
.vio-list li{
  text-align: center;
  background-image: url(@/assets/images/alert-bcimg.png);
  margin-bottom: 10px;
  height: 60px;
  line-height: 60px;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0px 13px;
  overflow: hidden;
}
/* .toUp {
  margin-top: -55px;
  transition: all 1s;
} */
.vio-list.vio-up li{
  transition-duration: 1000ms;
  transform: translateY(-60px);
}
</style>
