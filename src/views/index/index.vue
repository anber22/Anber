<template>
  <div class="scoll-box">
    <div ref="index" class="index-bg">
      <div class="index">
        <!-- 顶部设备网点数量统计 start -->
        <Adaptive class="equip-count" :size="['47.9%','18.67%']">
          <div class="count-title">
            设备总数
          </div>
          <div class="count-value">
            {{ equipCountings }}
          </div>
        </Adaptive>
        <Adaptive class="branches-count" :size="['47.9%','18.67%']">
          <div class="count-title">
            网点数
          </div>
          <div class="count-value">
            {{ branchesCountings }}
          </div>
        </Adaptive>
        <!-- end -->
        <!-- 设备在线率 start -->
        <Adaptive :size="['100%','60%']">
          <Gauge v-if="gaugeDataFlag" ref="Gauge" :gauge-data="gaugeData" />
        </Adaptive>
        <!-- 分割线line -->
        <div style="width: 100%;height: 8px;background: #131B25;margin-top: 14px" />
        <!-- end -->
        <!-- 实时预警 start -->
        <div v-permission:[type]="`Index-Hzard`">
          <Adaptive :size="['100%','5.57%']" class="title-box">
            <div class="title-style" />
            <div class="title-name">
              实时预警
            </div>
          </Adaptive>
          <Adaptive :size="['100%','12.75%']" class="warning-box">
            <Warning ref="Warning" class="warning" :warning-data="hiddenDangerList" :system="subsystemList" />
            <!--  -->
          </Adaptive>
        </div>

        <!-- end -->
        <!-- 应用列表 start -->
        <Adaptive :size="['100%','5.57%']" class="title-box">
          <div class="title-style" />
          <div class="title-name">
            应用列表
          </div>
        </Adaptive>
        <van-loading v-if="loading" size="24px" vertical>
          加载中...
        </van-loading>
        <EquipList v-if="equipList.length>0" :equip-data="equipList" />
        <!-- end -->

        <!-- 辖区统计 start  -->
        <Adaptive :size="['100%','5.57%']" class="title-box">
          <div class="title-style" />
          <div class="title-name">
            辖区统计
          </div>
        </Adaptive>

        <DepartCount :depart-count="departCountData" />
        <van-loading v-if="!lineDataFlag && !maxPieDataFlag" size="24px" vertical>
          加载中...
        </van-loading>
        <Adaptive :size="['100%','70%']">
          <MaxPie v-if="maxPieDataFlag" :pie-data="maxPieData" @activeType="activeType" />
        </Adaptive>
        <Adaptive :size="['100%','56%']" style=" overflow: hidden; ">
          <MaxLine v-if="lineDataFlag" :line-data="lineData" style=" overflow: hidden; " />
        </Adaptive>
        <!-- end -->
        <!-- 监测分析，近一月/近一年/全部 -->
        <Adaptive :size="['100%', analysisHeight +'%']">
          <MonitorAnalysis v-if="!loading" :monitor-analysis-data="monitorAnalysisData" @timeType="getDateType" @systemType="getMonitorSystemType" />
        </Adaptive>
        <!-- legend 图例 -->
        <!-- <div class="legend">
      <p v-for="(item, index) in monitorAnalysisData.pieData.data" :key="index">
        <span :style="{ background: item.color }" />{{ item.name }}&emsp;&emsp;{{ item.value }}次&emsp;&emsp;&ensp;{{ item.precent }}%
      </p>
    </div> -->
        <!-- end -->
        <!-- 事件数故障数统计分析 start  -->
        <Adaptive :size="['100%','76%']">
          <Events v-if="!loading" :event-data="eventData" @systemType="getSystemType" />
        </Adaptive>
      <!-- end -->
      </div>
    </div>
  </div>
</template>

<script>
import Gauge from 'cmp/echarts/gauge/Gauge'
import MaxPie from 'cmp/echarts/mixPie/MixPie'
import MaxLine from 'cmp/echarts/mixLine/MixLine'
import Api from '@/api/index'
import EquipList from 'cmp/index/equipList/EquipList'
import Warning from 'cmp/index/warning/Warning'
import Config from '/config.json'

import DepartCount from 'cmp/index/departCount/DepartCount'
import Events from 'cmp/index/events/Events'
import MonitorAnalysis from 'cmp/index/monitorAnalysis/MonitorAnalysis'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'

import { mapGetters } from 'vuex'
import Socket from '@/utils/socket'

import store from '@/store'
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
      type: 'parent',
      Warning: 'Warning',
      loading: true,
      subsystemList: [
      ],
      gaugeData: {},
      gaugeDataFlag: false,
      equipCountings: '', // 设备总数
      equipOnlineCount: 0, // 设备在线数
      branchesCountings: '',
      equipList: [],
      maxPieData: {
        data: []
      },
      maxPieDataFlag: false,
      lineData: {
        title: '隐患分析（近15天)',
        name: '隐患数',
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

      eventData: { // 事件数、故障数统计双折线图
        equipType: [],
        analysisTimelineData: {
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

      monitorAnalysisData: { // 隐患分析近一月近一年全部数据
        equipType: [],
        dateType: [
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
        pieData: {
          data: [],
          title: '',
          color: []
        },
        monitorAnalysisFlag: false
      },
      monitorAnalysisLegendData: [],
      analysisDateType: 1, // 监测分析当前选中的时间类型 默认近1月
      analysisSystemType: 5, // 监测分析当前选中的系统类型 默认智慧视觉
      hiddenDangerList: [],
      onlinePercent: 0,
      analysisHeight: 134,
      screenWidth: null,
      departList: [],
      departIndex: 0
    }
  },
  computed: {
    ...mapGetters(['equipType', 'hazardType', 'placeType', 'applicationEquipList']),
    changeDateType() {
      return function(system, type) {
        if (type === 3) {
          return Api.monitorAnalysis(system)
        } else if (type === 1) {
          return Api.monitorAnalysisMonth(system)
        } else {
          return Api.monitorAnalysisYear(system)
        }
      }
    }
  },
  created() {
    this.subsystemList = Config.subsystemList
    this.getHazardTypeList()
    this.getHiddenDangerList()
    this.getEquipCountings()
    this.getBranchesCountings()
    this.getEquipList()
    this.getDepartCounting()
    store.dispatch('generatePersistence')

    // this.getOnlinePercent()
    this.$nextTick(function() {
      this.initSockets()
    })
  },
  destroyed() { // 页面销毁时清除定时器
    this.$socket.unsubscribe('Warning')
    this.$socket.unsubscribe('index')
    this.$socket.unsubscribe('Gauge')
  },
  methods: {
    /**
     * 监听socket消息
     */
    onMessage(msg) {
      this.equipCountings = msg.equipCount === null ? this.equipCountings : parseInt(msg.equipCount).toLocaleString()
      this.branchesCountings = msg.placeCount === null ? this.branchesCountings : parseInt(msg.placeCount).toLocaleString()
    },
    /**
     * 初始化socket
     */
    initSockets() {
      if (this.$refs.Warning === undefined) {
        setTimeout(() => {
          this.initSockets()
        }, 500)

        return
      }
      const topicList = [
        {
          topicName: 'realTimeWarning',
          refsList: [
            {
              domName: 'Warning',
              dom: this.$refs.Warning

            }

          ]
        },
        {
          topicName: 'realTimeStatistics',
          refsList: [
            {
              domName: 'index',
              dom: this

            }, {
              domName: 'Gauge',
              dom: this.$refs.Gauge

            }
          ]
        }]
      this.$socket.initSocket(topicList)
    },
    /**
     * 获取设备总数
     */
    async getEquipCountings() {
      const res = await Api.equipCountings('')

      if (res.code === 200) {
        this.equipCountings = parseInt(res.data).toLocaleString()
        this.getEquipOnlineCount()
      }
    },
    /**
     * 获取设备在线数
     */
    async getEquipOnlineCount() {
      const params = '?onlineType=1'
      const res = await Api.equipCountings(params)

      if (res.code === 200) {
        this.equipOnlineCount = parseInt(res.data).toLocaleString()
        const onlinePercent = ((this.equipOnlineCount / this.equipCountings) * 100).toFixed(2)
        Reflect.set(this.gaugeData, 'onlinePercent', onlinePercent)
        // this.gaugeData.onlinePercent = res.data
        this.gaugeDataFlag = true
      }
    },
    async getHazardTypeList() {

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
        Reflect.set(this.gaugeData, 'onlinePercent', res.data)
        // this.gaugeData.onlinePercent = res.data
        this.gaugeDataFlag = true
      }
    },
    /**
     * 获取应用列表
     */
    async getEquipList() {
      this.loading = true

      // this.equipList = this.applicationEquipList
      this.equipList = await this.$store.dispatch('GetApplicationlist')
      let combined = this.subsystemList.reduce((acc, cur) => {
        const target = acc.find(e => e.id === cur.id)
        if (target) {
          Object.assign(target, cur)
          // target.imgUrl = require(`/src/assets/images/index/${target.imgUrl}`)
        }
        return acc
      }, this.equipList)
      combined = combined.filter(v => v.name !== undefined)
      console.log('系统名称', combined, this.subsystemList, this.equipList)
      this.equipList = combined
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
      const countObj = this.departList.filter(item => type === item.departId)
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
      const res = await Api.departCountingList()
      this.maxPieDataFlag = false
      if (res.code === 200) {
        this.departList = [...res.data]
        await this.departList.forEach(async(item, i) => {
          await this.getDepartEquipCounting(item.departId, i, item.departName)
        })
      }
    },
    /**
     * 辖区统计-设备状态
     */
    async getDepartEquipCounting(id, i, name) {
      const res = await Api.departEquipCounting(id)
      if (res.code === 200) {
        this.departList[i].data = { ...res.data }
        this.maxPieData.data.push({
          value: res.data.count,
          name: name,
          type: id,
          count: res.data.count
        })
        if (i === 0) {
          this.getTroubleAnalysis(id)
          this.departCountData = {
            online: res.data.online,
            outline: res.data.outline,
            trouble: res.data.trouble
          }
        }
      }
      if (i === this.departList.length - 1) { this.maxPieDataFlag = true }
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
      const apiUrl = this.changeDateType(system, type)
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
          this.analysisHeight = 110
        } else {
          this.analysisHeight = 144
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
      let temp = []
      if (res.code === 200) {
        temp = [...res.data]
      }
      temp.forEach(hItem => {
        this.subsystemList.forEach(cItem => {
          if (hItem.type === cItem.id) {
            // Object.assign(hItem, cItem) assign后者会覆盖前者的同名属性的值
            hItem['imgUrl'] = cItem.imgUrl

            hItem['systemName'] = cItem.name
          }
        })
      })
      temp = await ReadTypeNameOnVuex.conversion('hazardType', 'hazardType', 'hazardTypeName', temp)

      this.hiddenDangerList = temp
    }
  }
}
</script>
<style scoped src='./index.css'></style>
