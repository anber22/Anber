
<template>
  <!-- 物业看板 & 安委看板 -->
  <div class="plate">
    <!-- 预警统计 start -->
    <!-- 今日预警 本周预警 本月预警 -->

    <div class="warning-statistics">
      <div class="title-box">
        <div class="title-style" />
        <div class="title-name">
          预警统计
        </div>
      </div>

      <div class="equipList-detail">
        <div v-for="(item , index) in hazardCountList" :key="index" class="equipList-detail-item" :style=" 'color:'+item.color" @click="1===index?check():uncheck()">
          <p>
            {{ item.value }}
          </p>
          <p class="equipList-detail-item-title">
            {{ item.name }}
          </p>
        </div>
      </div>

      <!-- 预警列表标题栏 -->
      <div class="alert-list">
        <h2>预警列表</h2>
        <p>未处理<span>{{ undoneHazardCount }}</span>件</p>
      </div>
      <PlateWarning v-if="violationsList.length > 0" :plate-warning-data="violationsList" />
      <div v-else class="nothing">
        暂无数据
      </div>
    </div>
    <!-- end -->
    <!-- 事件统计 start -->
    <div class="event-statistics">
      <div class="title-box">
        <div class="title-style" />
        <div class="title-name">
          事件统计
        </div>

        <div class="right-select">
          <van-dropdown-menu :overlay="false" :z-index="200" active-color="#B9CEE9">
            <van-dropdown-item v-model="timeType" :options="dateType" @change="onChangeDateType" />
          </van-dropdown-menu>
        </div>
      </div>
      <SimpleForm v-if="eventList.row.length!==0" :table-data="eventList" class="simpleForm" />
    </div>
    <!-- end -->
    <!-- 预警趋势 start -->
    <div class="warning-trend">
      <div class="title-box">
        <div class="title-style" />
        <div class="title-name">
          预警趋势<span>(近30天)</span>
        </div>
      </div>
      <div class="warning-line">
        <Adaptive :size="['100%','56%']" style=" overflow: hidden; ">
          <MaxLine v-if="lineDataFlag" :line-data="lineData" style=" overflow: hidden; " />
        </Adaptive>
      </div>
    </div>
    <!-- end -->
    <!-- 设备统计 start -->
    <div class="equipment-statistics">
      <div class="title-box">
        <div class="title-style" />
        <div class="title-name">
          设备统计
        </div>
      </div>
      <SimpleForm v-if="equipList.row.length>0" :table-data="equipList" class="simpleForm" />
      <div v-else class="nothing">
        暂无数据
      </div>
    </div>
    <!-- end -->
  </div>
</template>

<script>
import SimpleForm from 'cmp/simpleForm/SimpleForm'
import MaxLine from 'cmp/echarts/mixLine/MixLine'
import PlateWarning from 'cmp/plateWarning/PlateWarning'
import PlateApi from '@/api/gtPlate/gtPlate'
import DateTransformation from '@/utils/dateTransformation.js'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
import Socket from '@/utils/socket'

export default {
  components: {
    SimpleForm,
    MaxLine,
    PlateWarning
  },
  data() {
    return {
      pageType: 0, // 页面类型 （12：物业看板 13: 安委看板）
      undoneHazardCount: 0, // 未处理事件数
      dateType: [ // 时间下拉框值
        {
          value: 1,
          text: '近1月'
        },
        {
          value: 2,
          text: '近1年'
        },
        {
          value: 3,
          text: '全部'
        }
      ],
      timeType: 1,
      equipList: { // 设备统计列表
        column: [ // 列头
          {
            name: '网点名称',
            key: 'networkName',
            width: '35%',
            text: 'left',
            color: '#9CB6CD'
          },
          {
            name: '设备总数',
            key: 'count',
            width: '20%',
            text: 'center',
            color: '#9CB6CD'

          },
          {
            name: '在线数',
            key: 'online',
            width: '20%',
            text: 'center',
            color: '#11CAD9'

          },
          {
            name: '离线数',
            key: 'outline',
            width: '20%',
            text: 'center',
            color: '#F0FF76'

          }
        ],
        row: [ // 数据行

        ]
      },
      eventList: { // 事件统计列表
        column: [ // 列头
          {
            name: '事件类型',
            key: 'hazardTypeName',
            width: '35%',
            text: 'left',
            color: '#9CB6CD'
          },
          {
            name: '事件总数',
            key: 'count',
            width: '20%',
            text: 'center',
            color: '#9CB6CD'

          },
          {
            name: '已处理',
            key: 'done',
            width: '20%',
            text: 'center',
            color: '#11CAD9'

          },
          {
            name: '未处理',
            key: 'undone',
            width: '20%',
            text: 'center',
            color: '#E3372F'

          }
        ],
        row: [ // 数据行

        ]
      },
      lineData: { // 预警趋势折线统计图数据
        title: '预警数',
        name: '预警数',
        xAxis: {
          data: []
        },
        yAxis: {
          splitLineColor: 'rgba(76,200,172, 0.3)'
        },
        series: {
          data: [],
          smooth: false
        }

      },
      lineDataFlag: false, // 预警趋势图表是否显示
      hazardCountList: [ // 预警数据数组
        {
          name: '今日预警',
          value: 0,
          color: '#46FFEB'
        },
        {
          name: '本周预警',
          value: 0,
          color: '#F7FF74'
        },
        {
          name: '本月预警',
          value: 0,
          color: '#FF3C3C'
        }
      ],
      violationsList: [],
      play: false,
      router: 'PropertyPlate'
    }
  },
  created() {
    if (this.$route.path === '/propertyPlate') {
      this.pageType = 12
    } else if (this.$route.path === '/safetyCommitteePlate') {
      this.pageType = 13
    }
    this.getHzardCountByDays()
    this.getUndoneHzardCount()
    this.getHzardList()
    this.getHeartBeatStatistical('heartBeatStatisticalLastMonth', { month: 1, conditions: `?networkType=${this.pageType}` })
    this.getEquipStatistical()
    this.getHazardTrend()
    this.initSockets()
  },
  destroyed() {
    Socket.unsubscribe('PlateWarning')
  },
  methods: {
    onMessage(msg) {
      if (msg.networkType !== undefined) {
        if (msg.networkType === this.pageType) {
          const dateTransformation = new DateTransformation()

          msg.createdTime = dateTransformation.dateDifference(msg.createdTime)
          this.violationsList.splice(0, 0, msg)
          this.$forceUpdate()
        }
      }
    },
    initSockets() {
      const topicList = [
        {
          topicName: 'realTimeWarning',
          refsList: [{
            domName: 'PlateWarning',
            dom: this
          }]
        }
      ]
      setTimeout(() => {
        Socket.initSocket(topicList)
      }, 1000)
    },
    /**
     * 根据天数查询事件数量（全部类型）
     */
    getHzardCountByDays() {
      let conditions = ''
      this.hazardCountList.forEach(async(item, index) => {
        conditions = `?networkType=${this.pageType}&days=${index === 0 ? 1 : index === 1 ? 7 : index === 2 ? 30 : 30}`
        const res = await PlateApi.hazardCount(conditions)
        if (res.code === 200) {
          this.hazardCountList[index].value = res.data
        }
      })
    },
    /**
     * 获取未处理事件数
     */
    async getUndoneHzardCount() {
      const conditions = `?networkType=${this.pageType}&isDone=0`
      const res = await PlateApi.hazardCount(conditions)
      if (res.code === 200) {
        this.undoneHazardCount = res.data
      }
    },
    /**
     * 获取预警列表 （top10）
     */
    async getHzardList() {
      const param = {
        size: 10,
        conditions: `?networkType=${this.pageType}`
      }
      const res = await PlateApi.undoneHazardList(param)
      if (res.code === 200) {
        this.violationsList = res.data
      }
      const dateTransformation = new DateTransformation()
      this.violationsList.forEach((item, index) => {
        this.violationsList[index].createdTime = dateTransformation.dateDifference(this.violationsList[index].createdTime)
      })
    },
    getHzardCount() {
      // const conditions = ''
      this.hazardCountList.forEach(async(item, index) => {
        // conditions=`?networkType=${this.pageType}&days=${index===0?1:index===1?7:index===2?30}`
        this.hazardCountList[index].value = await PlateApi.hazardCount()
      })
    },
    /**
     * 获取事件统计列表
     */
    async getHeartBeatStatistical(requestName, param) {
      const res = await PlateApi[requestName](param)

      if (res.code === 200) {
        let temp = res.data
        temp = await ReadTypeNameOnVuex.conversion('hazardType', 'hazardType', 'hazardTypeName', temp)
        temp.forEach((item, index) => {
          temp[index]['undone'] = item.count - item.done
        })
        this.eventList.row = temp
      }
    },
    onChangeDateType(value) {
      this.$emit('timeType', value)
      let param = []
      if (this.timeType === 1) {
        param = {
          month: 1,
          conditions: `?networkType=${this.pageType}`
        }
        this.getHeartBeatStatistical('heartBeatStatisticalLastMonth', param)
      } else if (this.timeType === 2) {
        param = {
          year: 1,
          conditions: `?networkType=${this.pageType}`
        }
        this.getHeartBeatStatistical('heartBeatStatisticalLastYear', param)
      } else if (this.timeType === 3) {
        param = `?networkType=${this.pageType}`
        this.getHeartBeatStatistical('heartBeatStatisticalAll', param)
      }
    },
    async getEquipStatistical(value) {
      const param = this.pageType
      const res = await PlateApi.equipOnPlaceOnlineStatistical(param)
      const temp = res.data
      temp.forEach((item, index) => {
        temp[index]['outline'] = item.count - item.online
      })
      this.equipList.row = temp
    },
    /**
     * 获取近30天预警趋势
     */
    async getHazardTrend() {
      const params = {
        conditions: '?conditions=' + this.pageType
      }
      const res = await PlateApi.hazardTrend(params)
      if (res.code === 200) {
        const dataArr = [...res.data]
        dataArr.forEach(item => {
          this.lineData.xAxis.data.push(item.date.substring(4, 6) + '.' + item.date.substring(6, 8))
          this.lineData.series.data.push(item.count)
        })
        this.lineDataFlag = true
      }
    }
  }
}
</script>

<style scoped>
.plate{
  background-color: #0E1820;
  width: 92%;
  height: calc(100% - 75px);
  /* position: fixed; */
  color: #ffffff;
  overflow: scroll;
  padding: 15px;
  /* display: flex;
  flex-direction:column; */
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

.equipList-detail{
  width: 330px;
  margin: 20px auto;
  display: flex;
  /* background-color: #00B5ED; */
  justify-content: space-around;
}
.equipList-detail-item{
  /* width: 21%; */
  height: 50px;
  display: inline-block;
  padding: 5px 14px;
  text-align: center;
}
.equipList-detail-item-title{
  height: 9px;
  /* width: 65px; */
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

.color-light-red{
  background-color: #0E1820;
  width: 92%;
  height: 100%;
  position: fixed;
  color: #ffffff;
  padding: 15px;
  overflow: scroll;
}
.event-statistics{
  width: 100%;
  height: auto;
}
.simpleForm{
  margin-top: 20px;
  margin-bottom: 20px;
}
.title-style{
  width: 1.2%;
  height: 100%;
  background: -webkit-gradient(linear, 100% 100%, 0% 100%,from(#008EFF), to(#1DF2FF));
  /* display: inline-block; */
  float: left;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
}
.title-name{
  width: 60%;
  height: 30px;
  display: inline-block;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #B9CEE9;
  margin-left: 15px;
}
.title-name span{
  margin-left: 10px;
  font-size: 15px;
  font-weight: 400;
}
.title-box{
  height: 25px;
  width: 100%;
}
.warning-line {
  margin: 20px 0;
}
.equipment-statistics{
  height: auto;
  width: 100%;
}
.nothing{
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
}
</style>
<style >
.plate .right-select{
  color: #8BA3C2;
  font-size: 15px;
  width: 75px;
  float: right;
  padding-top: 5px;
}
.plate .right-select{
  color: #8BA3C2;
  font-size: 15px;
  /* padding-right: 18px */
}
/* option样式 */
.plate .van-cell{
  background-color: transparent;
  width: 100%;
  font-size: 20px;
  color: #B9CEE9;
  text-align: left;
  padding: 0 14px 0 5;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 关掉option下边框 */
.plate .van-cell::after{
  display: none
}

/* 小三角样式1 */
.plate .actions-title .van-icon-arrow::before,
.plate .right-select .van-popover__wrapper::before{
  content: '';
  position: absolute;
  top: 50%;
  border: 3px solid;
  border-color: transparent transparent #dcdee0 #dcdee0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: .8;
  content: '';
}
.plate .actions-title .van-icon-arrow::before{
  right: -12px;
  margin-top: -5px;
}
.plate .right-select .van-popover__wrapper::before{
  right: 0px;
  margin-top: -14px;
}
.plate .actions-content.van-action-sheet{
  background-color: #0E1820;
  color: #FFFEFE;
  font-size: 16px
}
.plate .actions-content .van-action-sheet__cancel, .plate .actions-content .van-action-sheet__item{
  background-color: #0E1820;
  color: #B9CEE9;
  font-size: 16px;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px #283444 solid;
}
.plate .actions-content .van-action-sheet__header{
  border-bottom: 1px #283444 solid;
}
.plate .actions-content .van-action-sheet__close{
  color: #FFFEFE
}
.plate .van-overlay{
  background-color: rgba(10, 4, 1, 0.55)
}

/* 修改下拉框样式 */
.plate .van-dropdown-menu__bar{
  background-color: #101A22 !important;
  height: auto;
}
/* 标题和选中项文字样式 */
.plate .van-dropdown-menu__title{
  color: rgba(185, 206, 233, 1);
  font-size: 20px
}
.plate .right-select .van-dropdown-menu__title{
  color: #8BA3C2;
  font-size: 15px
}
/* 标题左对齐 */
.plate .van-dropdown-menu__item{
  justify-content: left
}
.plate .right-select .van-cell{
  background-color: #0E1820;
  width: 100%;
  font-size: 14px;
  color: rgba(128, 146, 161, 1);
  text-align: center;
  padding: 6px 10px;
}
/* 关掉icon */
.plate .van-cell__value{
  display: none
}
/* 关掉option下边框 */
.plate .van-cell::after{
  display: none
}
/* 下拉框 */
.plate .van-popup--top{
  width: 60%;
  border: 1px rgba(42, 82, 134, 1) solid;
  left: 52px;
  top: 6px;
  background-color: #0E1820;

}
/* 整个下拉框的宽高 */
.plate .van-dropdown-item{
  width: 188px;
  height: 137px;
}
.plate .right-select .van-dropdown-item{
  left: unset;
  width: 135px;
  right: 15px;
}
</style>
