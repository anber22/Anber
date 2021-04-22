
<template>
  <!-- 物业看板 & 安委看板 -->
  <div class="plate">
    <!-- 预警统计 start -->
    <!-- 今日预警 本周预警 本月预警 -->
    <div class="warning-statistics">
      <p>预警统计</p>
      <div class="equipList-detail">
        <div class="equipList-detail-item">
          <p class="equipList-detail-item-value color-light-blue">
            3
          </p>
          <p class="equipList-detail-item-title">
            今日预警
          </p>
        </div>
        <div class="equipList-detail-item">
          <p class="equipList-detail-item-value color-light-yellow">
            23
          </p>
          <p class="equipList-detail-item-title">
            本周预警
          </p>
        </div>
        <div class="equipList-detail-item">
          <p class="equipList-detail-item-value color-light-red">
            142
          </p>
          <p class="equipList-detail-item-title">
            本月预警
          </p>
        </div>
      </div>

      <!-- 预警列表标题栏 -->
      <div class="alert-list">
        <h2>预警列表</h2>
        <p>未处理<span>11</span>件</p>
      </div>
      <!-- 违规停放列表 -->
      <ul class="vio-list">
        <!-- <li
          v-for="index in ulList"
          :key="index"
          :class="!index && play?'toUp':''"
        > -->
        <div class="violations">
          <!-- ！违规停放 -->
          <div class="illegal-parking">
            <img class="alert-icon" src="@/assets/images/alert.png" alt="">
            违规停放
          </div>
          <!-- 地址 -->
          <div class="park-address">
            港湾一号湾29湾栋间
          </div>
          <!-- 时间 -->
          <div class="violations-time">
            8分钟前
          </div>
        </div>
        <div class="violations">
          <!-- ！违规停放 -->
          <div class="illegal-parking">
            <img class="alert-icon" src="@/assets/images/alert.png" alt="">
            违规停放
          </div>
          <!-- 地址 -->
          <div class="park-address">
            港湾一号湾29湾栋间
          </div>
          <!-- 时间 -->
          <div class="violations-time">
            8分钟前
          </div>
        </div>
        <div class="violations">
          <!-- ！违规停放 -->
          <div class="illegal-parking">
            <img class="alert-icon" src="@/assets/images/alert.png" alt="">
            违规停放
          </div>
          <!-- 地址 -->
          <div class="park-address">
            港湾一号湾29湾栋间
          </div>
          <!-- 时间 -->
          <div class="violations-time">
            8分钟前
          </div>
        </div>
        <div class="violations">
          <!-- ！违规停放 -->
          <div class="illegal-parking">
            <img class="alert-icon" src="@/assets/images/alert.png" alt="">
            违规停放
          </div>
          <!-- 地址 -->
          <div class="park-address">
            港湾一号湾29湾栋间
          </div>
          <!-- 时间 -->
          <div class="violations-time">
            8分钟前
          </div>
        </div>
        <!-- </li> -->
      </ul>
    </div>
    <!-- end -->
    <!-- 事件统计 start -->
    <div class="event-statistics">
      事件统计
    </div>
    <!-- end -->
    <!-- 预警趋势 start -->
    <div class="warning-trend">
      预警趋势
    </div>
    <!-- end -->
    <!-- 设备统计 start -->
    <div class="equipment-statistics">
      设备统计
    </div>
    <!-- end -->
  </div>
</template>

<script>

export default {
  name: 'Adaptive',
  components: {
  },
  props: {
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: function() {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  created() {
    this.ulList = this.data
    this.systemList = this.system
    if (this.ulList !== null) {
      if (this.ulList.length > 1) {
        this.timer = setInterval(this.startPlay, 3000)
      }
    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    startPlay() {
      const that = this
      that.play = true
      setTimeout(() => {
        that.play = false
        that.ulList.push(that.ulList[0])
        that.ulList.shift()
        // var a = that.ulList.pop(that.ulList[length])
        // that.ulList.unshift(a)
      }, 500)
    }
  }
}
</script>

<style scoped>
.plate{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #101720;
}
.warning-statistics{
  width:100%;
  height: auto;
}
.warning-statistics>p{
  color: #EFF0F1;
}
.adaptive{
  display: inline-block;
  position : relative;
}
.inside-content{
  position : absolute;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
}
.warning-data{
  width:345px ;
  height: 100px;

  font-size: 15px;
  font-family: UniDream;
  font-weight: normal;
  color: #46FFEB;
  line-height: 100px;
  text-align: center
}
.alert-list{
  width:345px ;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
}
.alert-list h2{
    display: inline-block;
    height: 11px;
    width: 70px;
    font-size: 17px;
    font-family: SourceHanSansCN;
    font-weight: 400;
    text-align: left;
    line-height: 5px;
    padding-left: 12px;
    margin-left: 13px;
    color: #EFF0F1;
    margin-top: 7%;
    margin-bottom: 0px;
    background: linear-gradient(125deg, rgba(16, 233, 255, 0) 8px,#00B5ED 9%,transparent 81%) left;
    background-size: 100% 100%;
}
.alert-list p{
  float: right;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight:lighter;
  color: #B9CEE9;
}
.alert-list span{
  color: #FF1743;
}
.violations{
  background-image: url(@/assets/images/alert-bcimg.png);
  background-size:100% 100%;
  width: 313px;
  height: 65px;
  margin: 0 auto;
  line-height: 65px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 9px;
}
.illegal-parking{
  display: inline;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 100;
  color: #FF1743;

}
.illegal-parking img{
  transform: translateY(5px);
}
.alert-icon{
  width: 25px;
  height: 25px;
}
.park-address{
  width: 110px;
  /* height: 100%; */
  line-height: 15px;
  margin-top: 17.5px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 100;
  color: #B9CEE9;
  white-space: normal;
  word-break: break-all;
}
.violations-time{
  color: #B9CEE9;
  font-weight: 100;
}
.equipList-detail{
  width: 330px;
  margin: 20px auto;
  display: flex;
  /* background-color: #00B5ED; */
  justify-content: space-around;
}
.equipList-detail-item{
  width: 21%;
  height: 50px;
  display: inline-block;
  padding: 5px 14px;
}
.equipList-detail-item-title{
    height: 9px;
    width: 65px;
    font-size: 16px;
    font-family: SourceHanSansCN;
    font-weight: 400;
    text-align: left;
    line-height: 2px;
    padding-left: 12px;
    color: #EFF0F1;
    margin-top: 28%;
    margin-bottom: 0px;
    background: linear-gradient(125deg,rgba(16, 233, 255, 0) 8px,#00B5ED 9%,transparent 56%) left;
    background-size: 100% 100%;
  /* margin-left: 15px */
}
.equipList-detail-item-value{
  height: 18px;
  font-size: 19px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #46FFEB;
  text-align: center;
  margin-top: 12%;
}
.equipList-color-light-blue{
  color: #46FFEB;
}
.color-light-yellow{
  color: #F7FF74;
}
.color-light-red{
  color:#FF3C3C;
}
</style>
