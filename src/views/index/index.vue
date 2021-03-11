<template>
  <div class="index">
    <!-- 顶部设备网点数量统计 start -->
    <Adaptive class="equip-count" :data="['47.9%','18.67%']">
      <div class="count-title">
        设备总数
      </div>
      <div class="count-value">
        {{ equipCountings }}
      </div>
    </Adaptive>
    <Adaptive class="branches-count" :data="['47.9%','18.67%']">
      <div class="count-title">
        网点数
      </div>
      <div class="count-value">
        {{ branchesCountings }}
      </div>
    </Adaptive>
    <!-- end -->
    <!-- 设备在线率 start -->
    <Adaptive :data="['100%','60%']">
      <Gauge :data="gaugeData" />
    </Adaptive>
    <!-- 分割线line -->
    <div style="width: 100%;height: 8px;background: #131B25;margin-top: 14px" />
    <!-- end -->
    <!-- 实时预警 start -->
    <Adaptive :data="['100%','5.57%']" class="title-box">
      <div class="title-style" />
      <div class="title-name">
        实时预警
      </div>
    </Adaptive>
    <Adaptive :data="['100%','12.75%']" class="warning-box">
      <Warning v-if="hiddenDangerList.length>0" class="warning" :data="hiddenDangerList" />
    </Adaptive>
    <!-- end -->
    <!-- 应用列表 start -->
    <Adaptive :data="['100%','5.57%']" class="title-box">
      <div class="title-style" />
      <div class="title-name">
        应用列表
      </div>
    </Adaptive>
    <van-loading v-if="!loading" size="24px" vertical>
      加载中...
    </van-loading>
    <EquipList :data="equipList" />
    <!-- end -->

    <!-- 辖区统计 start  -->
    <Adaptive :data="['100%','5.57%']" class="title-box">
      <div class="title-style" />
      <div class="title-name">
        辖区统计
      </div>
    </Adaptive>
    <DepartCount :data="departCountData" />
    <Adaptive :data="['100%','70%']">
      <MaxPie v-if="maxPieDataFlag" :data="maxPieData" @activeType="activeType" />
    </Adaptive>
    <Adaptive :data="['100%','56%']">
      <MaxLine v-if="lineDataFlag" :data="lineData" />
    </Adaptive>
    <!-- end -->
    <!-- 监测分析，近一月/近一年/全部 -->
    <Adaptive :data="['100%', analysisHeight +'%']">
      <MonitorAnalysis v-if="!loading" :data="monitorAnalysisData" @timeType="getDateType" @systemType="getMonitorSystemType" />
    </Adaptive>
    <!-- legend 图例 -->
    <!-- <div class="legend">
      <p v-for="(item, index) in monitorAnalysisData.pieData.data" :key="index">
        <span :style="{ background: item.color }" />{{ item.name }}&emsp;&emsp;{{ item.value }}次&emsp;&emsp;&ensp;{{ item.precent }}%
      </p>
    </div> -->
    <!-- end -->
    <!-- 事件数故障数统计分析 start  -->
    <Adaptive :data="['100%','84%']">
      <Events v-if="!loading" :data="eventData" @systemType="getSystemType" />
    </Adaptive>
    <!-- end -->
  </div>
</template>

<script>
import Gauge from 'cmp/echarts/gauge/Gauge'
import MaxPie from 'cmp/echarts/maxPie/MaxPie'
import MaxLine from 'cmp/echarts/maxLine/MaxLine'
import Api from '@/api/index'
import EquipList from 'cmp/index/equipList/EquipList'
import Warning from 'cmp/index/warning/Warning'
import Config from '/config.json'

import DepartCount from 'cmp/index/departCount/DepartCount'
import Events from 'cmp/index/events/Events'
import MonitorAnalysis from 'cmp/index/monitorAnalysis/MonitorAnalysis'
import { mapGetters } from 'vuex'
import store from '@/store'
import CraneMonitoring from '@/assets/images/index/wisdom-visual.png'
export default {
  components: {
    EquipList,
    Warning,
    Gauge,
    MaxPie,
    MaxLine,
    DepartCount,
    Events,
    MonitorAnalysis
  },
  data() {
    return {
      loading: true,
      subsystemList: [
        {
          id: 5,
          name: '智慧视觉',
          imgUrl: require('/src/assets/images/index/wisdom-visual.png')
        }, {
          id: 10,
          name: '环境监测',
          imgUrl: require('/src/assets/images/index/environmental-monitoring.png')
        }, {
          id: 11,
          name: '塔机监测',
          imgUrl: require('/src/assets/images/index/crane-monitoring.png')
        }
      ],
      gaugeData: {
        chartId: 'gaugeId',
        onlinePercent: 0
      },
      equipCountings: '',
      branchesCountings: '',
      equipList: [],
      maxPieData: {
        chartId: 'maxPieChartId',
        data: []
      },
      maxPieDataFlag: false,
      lineData: {
        // 饼图的id
        chartId: 'lineChartId',
        title: '隐患分析（近15天)',
        xAxis: {
          data: []
        },
        yAxis: {
          splitLineColor: 'rgba(192, 203, 220, 0.3)'
        },
        series: {
          data: [],
          smooth: true
        }
      },
      lineDataFlag: false,
      departCountList: [],
      departCountData: {},
      // 事件数、故障数统计双折线图
      eventData: {
        equipType: [],
        analysisTimelineData: {
          // 双折线图的id
          chartId: 'analysisTimelineChartId',
          xAxis: {
            data: []
          },
          yAxis: {
            splitLineColor: 'rgba(255, 255, 255, 0.05)'
          },
          series: {
            data: [],
            data2: [],
            smooth: true
          }
        },
        analysisTimelineFlag: false
      },
      // 隐患分析近一月近一年全部数据
      monitorAnalysisData: {
        equipType: [],
        dateType: [
          {
            value: 1,
            text: '全部'
          },
          {
            value: 2,
            text: '近1月'
          },
          {
            value: 3,
            text: '近1年'
          }
        ],
        pieData: {
          // 饼图的id
          chartId: 'monitorAnalysisChartId',
          data: [],
          title: '',
          color: []
        },
        monitorAnalysisFlag: false
      },
      monitorAnalysisLegendData: [],
      // 监测分析当前选中的时间类型 默认全部
      analysisDateType: 1,
      // 监测分析当前选中的系统类型 默认智慧视觉
      analysisSystemType: 1,

      hiddenDangerList: [],
      onlinePercent: 0,
      analysisHeight: 154
    }
  },
  computed: {
    ...mapGetters(['equipType', 'hazardType', 'placeType']),
    changeDateType() {
      return function(type, system) {
        if (type === 1) {
          return Api.monitorAnalysis(system)
        } else if (type === 2) {
          return Api.monitorAnalysisMonth(system)
        } else {
          return Api.monitorAnalysisYear(system)
        }
      }
    }
  },
  created() {
    // setTimeout(() => {
    //   this.socket()
    // }, 1000)
    // this.subsystemList.forEach(item => {
    //   item.imgUrl = require(item.imgUrl)
    // })
    this.getHazardTypeList()
    this.getHiddenDangerList()
    this.getEquipCountings()
    this.getBranchesCountings()
    this.getEquipList()
    this.getDepartCounting()

    store.dispatch('generatePersistence')
    // console.log('设备类型', await this.equipType)
    // console.log('隐患类型', await this.hazardType)
    // console.log('网点类型', await this.placeType)
    this.getOnlinePercent()
  },
  methods: {
    /**
     * 获取设备总数
     */
    async getEquipCountings() {
      const res = await Api.equipCountings()

      if (res.code === 200) {
        this.equipCountings = parseInt(res.data).toLocaleString()
      }
    },
    async getHazardTypeList() {
      // console.log('index111', await store.getters.hazardType)

      // console.log('index2222', await store.getters.hazardType)
    },
    /**
     * 获取网点总数
     */
    async getBranchesCountings() {
      const res = await Api.branchesCountings()
      this.branchesCountings = parseInt(res.data).toLocaleString()
    },
    /**
     * 设备在线率
     */
    async getOnlinePercent() {
      const res = await Api.onlinePercent()
      if (res.code === 200) {
        this.gaugeData.onlinePercent = res.data
      }
    },
    /**
     * 获取应用列表
     */
    async getEquipList() {
      this.loading = true
      const res = await Api.applicationlist()
      if (res.code === 200) {
        this.equipList = [...res.data]
      }
      console.log('设备数量', this.equipList)

      const combined = this.subsystemList.reduce((acc, cur) => {
        const target = acc.find(e => e.id === cur.id)
        if (target) {
          Object.assign(target, cur)
          // target.imgUrl = require(`/src/assets/images/index/${target.imgUrl}`)
        }
        return acc
      }, this.equipList)
      this.equipList = combined

      // console.log(typeof '/src/assets/images/index/wisdom-visual.png')
      // console.log('config', typeof Config.subsystemList[0].imgUrl)
      combined.forEach(item => {
        this.monitorAnalysisData.equipType.push({
          value: item.id,
          name: item.name + '分析'
        })
        this.eventData.equipType.push({
          value: item.id,
          name: item.name + '统计'
        })
      })
      // this.eventData.equipType = this.monitorAnalysisData.equipType
      this.analysisDateType = combined[0].id
      // 用应用列表里的第一个子系统获取15天事件和故障数统计数据
      this.getAnalysisTimeline(combined[0].id)
      // 用应用列表里的第一个子系统获取监测分析全部数据
      this.getMonitorAnalysis(combined[0].id, this.monitorAnalysisData.dateType[0].value)
      this.loading = false
    },
    /**
     * 辖区统计选中的辖区ID，并筛选当前辖区的数据出来
     */
    activeType(type) {
      this.lineDataFlag = false
      const countObj = this.departCountList.filter(item => type === item.departId)
      this.departCountData = {
        online: countObj.length > 0 ? countObj[0].data.online : '',
        outline: countObj.length > 0 ? countObj[0].data.outline : '',
        trouble: countObj.length > 0 ? countObj[0].data.trouble : ''
      }
      this.getTroubleAnalysis(type)
    },
    /**
     * 获取辖区统计数据
     */
    async getDepartCounting() {
      const res = await Api.departCounting()
      if (res.code === 200) {
        this.departCountList = [...res.data]
        const dataArr = [...res.data]
        dataArr.forEach(item => {
          this.maxPieData.data.push({
            value: item.data.count,
            name: item.departName,
            type: item.departId,
            count: item.data.count
          })
        })
        // 使用当前第一个辖区id去获取该辖区隐患分析数据---折线图数据
        this.getTroubleAnalysis(dataArr[0].departId)
        this.departCountData = {
          online: dataArr[0].data.online,
          outline: dataArr[0].data.outline,
          trouble: dataArr[0].data.trouble
        }
        this.maxPieDataFlag = true
      }
    },
    /**
     * 辖区统计联动，当前选中辖区的隐患分析（近15天）
     */
    async getTroubleAnalysis(departId) {
      const res = await Api.troubleAnalysis(departId)
      this.lineData.xAxis.data = []
      this.lineData.series.data = []
      if (res.code === 200) {
        const dataArr = [...res.data.list]
        dataArr.forEach(item => {
          this.lineData.xAxis.data.push(item.date.substring(4, 6) + '.' + item.date.substring(6, 8))
          this.lineData.series.data.push(item.count)
        })
        this.lineDataFlag = true
      }
    },
    /**
     * 智慧视觉统计折线图（30天事件数，故障数）
     */
    async getAnalysisTimeline(system) {
      this.eventData.analysisTimelineData.xAxis.data = []
      this.eventData.analysisTimelineData.series.data = []
      this.eventData.analysisTimelineData.series.data2 = []
      const res = await Api.analysisTimeline(system)
      if (res.code === 200) {
        const day = [...res.data.list]
        day.forEach((item) => {
          this.eventData.analysisTimelineData.xAxis.data.push(item.date.substring(4, 6) + '.' + item.date.substring(6, 8))
          this.eventData.analysisTimelineData.series.data.push(item.eventCount)
          this.eventData.analysisTimelineData.series.data2.push(item.errorCount)
        })
        this.eventData.analysisTimelineFlag = true
      }
    },
    /**
     * 从近15日事件统计Event组件传过来的选定的子系统，用于重新渲染图表数据
     */
    getSystemType(value) {
      this.eventData.analysisTimelineFlag = false
      this.getAnalysisTimeline(value)
    },
    /**
     * 监测分析 type:1 (全部)、type:2 (近1月)、type: 3（近1年）
     */
    async getMonitorAnalysis(system, type) {
      const apiUrl = this.changeDateType(type, system)
      const res = await apiUrl
      let color = []
      this.monitorAnalysisData.pieData.data = []
      this.monitorAnalysisData.pieData.title = ''
      this.monitorAnalysisData.pieData.color = []
      if (res.code === 200) {
        const dataArr = [...res.data.event]
        if (Reflect.has(Config, 'hazardAnalysis')) {
          color = Config.hazardAnalysis.color
        }
        if (dataArr.length < 4) {
          this.analysisHeight = 100
        } else {
          this.analysisHeight = 158
        }
        dataArr.forEach((item, index) => {
          this.monitorAnalysisData.pieData.data.push({
            value: item.count,
            name: item.name,
            precent: item.precent,
            color: color[index]
          })
        })
        this.monitorAnalysisData.pieData.color = color
        this.monitorAnalysisData.pieData.title = res.data.count
        this.monitorAnalysisData.monitorAnalysisFlag = true
      }
    },
    /**
     * 监测分析切换日期
     */
    getDateType(value) {
      this.analysisDateType = value
      this.monitorAnalysisData.monitorAnalysisFlag = false
      this.getMonitorAnalysis(this.analysisSystemType, value)
    },
    /**
     * 监测分析切换系统类型
     */
    getMonitorSystemType(value) {
      this.analysisSystemType = value
      this.monitorAnalysisData.monitorAnalysisFlag = false
      this.getMonitorAnalysis(value, this.analysisDateType)
    },
    /**
     * 获取隐患列表 top10
     */
    async getHiddenDangerList() {
      const res = await Api.hiddenDangerList(12)
      if (res.code === 200) {
        this.hiddenDangerList = [...res.data]
      }
      this.hiddenDangerList.forEach(hItem => {
        this.subsystemList.forEach(cItem => {
          if (hItem.type === cItem.id) {
            // Object.assign(hItem, cItem) assign后者会覆盖前者的同名属性的值
            hItem['imgUrl'] = cItem.imgUrl

            hItem['systemName'] = cItem.name
          }
        })
      })
      console.log('隐患列表', this.hiddenDangerList)
    }
  }
}
</script>

<style scoped>
.index{
  width: 92%;
  height: auto;
  padding: 0px 4% 0px 4%;
  background-color: rgba(16, 23, 32, 1);
}
.equip-count{
  border-radius:5px;
  margin-top: 5%;
  padding-right: 0px;
  display: inline-block;
  background-image: url('@/assets/images/index/equip-count.png');
  background-repeat:no-repeat ;
  background-size: cover;
}
.branches-count{
  padding-right: 0px;
  border-radius:5px;
  margin-top: 5%;
  display: inline-block;
  margin-left: 2.7%;
  background-image: url('@/assets/images/index/branches-count.png');
  background-repeat:no-repeat;
  background-size: cover;
}
.warning-box{
  padding-right: 0px;
  margin-top: 8%;
}
.count-title{
  width: 100%;
  margin: 0px;
  padding-top: 8%;
  text-align: center;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
}
.count-value{
  width: 100%;
  margin: 0px;
  text-align: center;
  font-size: 21px;
  font-family: PingFang SC;
  font-weight: 600;
  color: #FFFFFF;
}
/* 标题  start*/
.title-box{
  margin-top: 8%;
  margin-bottom: 2%;
}
.title-style{
  width: 1.2%;
  height: 100%;
  background:-webkit-gradient(linear, 100% 100%, 0% 100%,from(#008EFF), to(#1DF2FF));
  display: inline-block;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
}
.title-name{
  width: 80%;
  height: 100%;
  display: inline-block;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #B9CEE9;
}
/* end */
.equipList-box{
  padding-right: 0px;
}

.legend{
  /* text-align: center; */
  font-size: 12px;
  color: #fff;
  padding-left: 18%;
}
.legend p{
  line-height: 2.5
}
.legend p span{
  display: inline-block;
  width: 11px;
  background-color: #008EFF;
  height: 9px;
  margin-right: 10px;
}
</style>
