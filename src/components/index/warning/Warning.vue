<!-- 设备卡片 -->
<template>
  <div class="warin">
    <div class="hidden-trouble-detail">
      <div class="out-rect">
        <div v-if="ulList" class="in-rect">
          <img class="equip-img" :src="currentSystemtypeImage">
          <ul class="list">
            <li
              v-for="(rowItem, index) in ulList"
              :key="index"
              :class="!index && play ? 'toUp' : ''"
              @click="showDetail(rowItem.id)"
            >
              <div class="colItem title">
                {{ rowItem.systemName }}
              </div>
              <div class="colItem content">
                {{ rowItem.onlineMsg }}
              </div>
              <div class="colItem content">
                {{ rowItem.placeName }}
              </div>
              <!-- <div class="colItem content" style="color:red;">
                未处理
              </div> -->
              <div class="colItem content">
                <!-- 22.22 -->
                {{ changeDate(rowItem.createTime) }}
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
import Socket from '../../../utils/socket'
import Data from '@/utils/data.js'
export default {
  components: {

  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      ulList: [

      ],
      play: false,
      // 接收定时器
      timer: null,
      currentSystemtypeImage: ''

    }
  },
  computed: {
    changeDate: function() {
      return function(val) {
        // console.log('组件传入时间', val)

        return this.dateFormat(val)
      }
    }
  },
  created() {
    console.log('页面创建', this.data, this.ulList)
    this.ulList = this.data

    if (this.ulList !== null) {
      if (this.ulList.length > 1) {
        this.currentSystemtypeImage = this.ulList[0].imgUrl
        setInterval(this.startPlay, 3000)
      }
    }
    // Socket.initSocket('equipCount')
  },
  destroyed() { // 页面销毁时清除定时器
    clearInterval(this.timer)
  },
  methods: {
    showDetail(e) {
      console.log('网点id', e)
      this.$router.push({
        path: '/hazardDetail',
        query: {
          hazardId: e
        }
      })
    },
    startPlay() {
      const that = this
      that.play = true // 开始播放

      that.timer = setTimeout(() => { // 创建并执行定时器
        that.play = false // 暂停播放
        that.ulList.push(that.ulList[0]) // 将第一条数据塞到最后一个
        that.ulList.shift() // 删除第一条数据

        // console.log('输出循环列表', that.ulList)
        this.currentSystemtypeImage = this.ulList[0].imgUrl
      }, 500)

      // console.log(that.timer)
    },
    /**
     * 时间格式转换
     */
    dateFormat(date) {
      // console.log('传出时间', Data.dateDifference(date))
      return Data.dateDifference(date)
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
  /* background: linear-gradient(45deg, transparent 4.67%, rgba(0, 186, 255, 1) 0%,#010F1F 48%)  right; */
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
   background-image: url('@/assets/images/index/hidden-trouble-to-push-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.colItem{
  width: auto;
  display: inline-block;
  text-align: center;
  height: 100%;
  line-height: 350%;
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
.no-data{
  width: 100%;
  height: 20px;

  line-height:20px;
  color: #ffffff;
  font-size: 14px;
  text-align: center
}
</style>
