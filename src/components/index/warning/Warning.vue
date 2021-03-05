<!-- 设备卡片 -->
<template>
  <div class="warin">
    <div class="hidden-trouble-detail">
      <div class="out-rect">
        <div class="in-rect">
          <img class="equip-img" src="@/assets/images/index/real-time-warning-camera.png">
          <ul class="list">
            <li
              v-for="(rowItem, index) in ulList"
              :key="rowItem.id"
              :class="!index && play ? 'toUp' : ''"
            >
              <div class="colItem title">
                智慧视觉
              </div>
              <div class="colItem content">
                {{ rowItem.type }}
              </div>
              <div class="colItem content">
                {{ rowItem.address }}
              </div>
              <div class="colItem content" style="color:red;">
                {{ rowItem.status }}
              </div>
              <div class="colItem content">
                {{ rowItem.time }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Socket from '../../../utils/socket'
export default {
  components: {

  },

  data() {
    return {
      ulList: [
        {
          type: '违规停放',
          address: '港湾一号',
          status: '待处理',
          time: '8min'
        }, {
          type: '高空抛物',
          address: '港湾一号',
          status: '待处理',
          time: '6min'
        }, {
          type: '电瓶车上楼',
          address: '港湾一号',
          status: '待处理',
          time: '23:00'
        }, {
          type: '未戴安全帽',
          address: '港湾一号',
          status: '待处理',
          time: '18:00'
        }
      ],
      play: false,
      timer: null // //接收定时器
    }
  },
  mounted() {
    setInterval(this.startPlay, 3000)

    // Socket.initSocket('equipCount')
  },
  destroyed() { // 页面销毁时清除定时器
    clearInterval(this.timer)
  },
  methods: {
    startPlay() {
      const that = this
      that.play = true // 开始播放
      that.timer = setTimeout(() => { // 创建并执行定时器
        that.play = false // 暂停播放
        that.ulList.push(that.ulList[0]) // 将第一条数据塞到最后一个
        that.ulList.shift() // 删除第一条数据
      }, 500)
      // console.log(that.timer)
    }
  }
}
</script>

<style  scoped  >
.warin{
  width: 100%;
  height: 100%;
  /* background: rgba(0, 133, 247, 0.1); */
}
.equip-type{
  width: 22.3%;
  height: 100%;
  float: left;
 opacity: 0.9;

}
.hidden-trouble-detail{
  width: 99.2%;
  height: 100%;
  display: inline-block;
}
.equip-img{
      width: 7.8%;
    height: 52.27%;
    margin: 2.865% 1% 3.865% 1%;
}

.title{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #A3D5FF;
}
.out-rect {
  width: 100%;
  height: 100%; /*关键样式*/
  line-height: 350%;
  background: linear-gradient(45deg, transparent 4.67%, rgba(0, 186, 255, 1) 0%,#010F1F 48%)  right;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  /* box-shadow: 4px 0 10px rgba(226, 226, 226, 0.3); */
  padding: 0.5%;
  font-size: 14px;
  display: flex;
}
.in-rect{
  width: 99%;
  height: 99.9%;
  /* line-height: 55px; */
  display: flex;
  padding: 0px  3%;
  margin-top: 0.03%;
  background: linear-gradient(45deg, transparent 4.47%, rgba(0, 48, 93, 1) 0,#010F1F) top right;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.colItem{
  width: auto;
  display: inline-block;
  text-align: center;
  height: 100%;
  line-height: 40px;
  overflow: hidden;
  margin-left: 2%
}
.content{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(1, 255, 252, 1);
}
.roll-line {
  width: 2px;
  height: 100%;
  /* background: #dee2e6; */
  margin: 0 20px 0 -20px;
}
.el-icon-bell {
  color: #343a40;
  line-height: 55px; /*key code*/
  margin-right: 10px;
}
.toUp {
  margin-top: -55px; /*key code*/
  transition: all 1s; /*key code*/
}
.list {
  list-style: none;
  width: 100%;
  text-align: center;
  overflow: hidden; /*key code*/
  height: 100%; /*key code*/
  padding: 0;
  margin-left: 3%;
  overflow: hidden;
}
li {
  height: 100%;
  text-align: left;
}
</style>
