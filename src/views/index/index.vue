<template>
  <div class="index">
    <!-- <div class="equip-count">
      <div class="count-content">
        <p class="count-title">
          设备总数
        </p>
        <p class="count-value">
          12312
        </p>
      </div>
    </div>
    <div class="branches-count">
      <div class="count-content">
        <p class="count-title">
          网点数
        </p>
        <p class="count-value">
          343434
        </p>
      </div>
    </div> -->
    <!-- <div class="gauge-wrapper">
      <div class="inner">
        <Gauge :data="gaugeData" />
      </div>
    </div> -->
    <div class="maxPie-wrapper">
      <div class="inner">
        <MaxPie v-if="maxPieDataFlag" :data="maxPieData" @activeType="activeType" />
      </div>
    </div>
    <div class="max-line-wrapper">
      <div class="inner">
        <MaxLine v-if="lineDataFlag" :data="lineData" />
      </div>
    </div>
  </div>
</template>

<script>
import Gauge from '@/components/echarts/gauge/Gauge'
import MaxPie from '@/components/echarts/maxPie/MaxPie'
import MaxLine from '@/components/echarts/line/Line'
import Api from '../../../src/api/index'
export default {
  components: {
    Gauge,
    MaxPie,
    MaxLine
  },
  data() {
    return {
      gaugeData: {
        chartId: 'gaugeId'
      },
      equipCountings: '',
      branchesCountings: '',
      maxPieData: {
        chartId: 'maxPieChartId',
        data: []
      },
      maxPieDataFlag: false,
      lineData: {
        chartId: 'lineChartId', // 饼图的id
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
      lineDataFlag: false
    }
  },
  mounted() {
    // this.getEquipCountings()
    this.getTroubleAnalysis('12345')
    this.getDepartCounting()
  },
  methods: {
    getEquipCountings() {
      this.equipCountings = Api.equipCountings()
    },
    // 辖区统计选中的辖区ID
    activeType(type) {
      this.lineDataFlag = false
      this.getTroubleAnalysis(type)
    },
    // 获取辖区统计数据
    async getDepartCounting() {
      const res = await Api.departCounting()
      if (res.code === 200) {
        const dataArr = [...res.data]
        dataArr.forEach(item => {
          this.maxPieData.data.push({
            value: item.data.trouble,
            name: item.departName,
            type: item.departId
          })
        })
        this.maxPieDataFlag = true
      }
    },
    // 15天隐患分析
    async getTroubleAnalysis(id) {
      const departId = id
      const res = await Api.troubleAnalysis(departId)
      this.lineData.xAxis.data = []
      this.lineData.series.data = []
      if (res.code === 200) {
        console.log('15')
        const dataArr = [...res.data.list]
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

<style >
.index{
  width: 92%;
  height: auto;
  padding: 0px 4% 0px 4%;
}

.equip-count{
  width: 47.7%;
  position : relative;
  /* background: #ccc; */
  padding-bottom : 18.67%;
  border-radius:5px;
  margin-top: 5%;
  display: inline-block;
  background-image: url('/src/assets/index/equip-count.png');
  background-repeat:no-repeat ;
  background-size: contain;
}
.branches-count{
  width: 47.7%;
  position : relative;
  /* background: #ccc; */
  padding-bottom : 18.67%;
  border-radius:5px;
  margin-top: 5%;
  display: inline-block;
  margin-left: 2.7%;
  background-image: url('/src/assets/index/equip-count.png');
  background-repeat:no-repeat ;
  background-size: contain;
}
.count-content{
  position : absolute;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
  text-align: center;
}
.count-title{
  margin: 0px;
  padding-top: 8%;
  text-align: center;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
}
.count-value{
  margin: 0px;
  text-align: center;
  font-size: 21px;
  font-family: PingFang SC;
  font-weight: 600;
  color: #FFFFFF;
}
.gauge-wrapper{
  position : relative;
  /* background: rgba(16, 23, 32, 1); */
  width: 100%;
  padding-bottom : 60%;
  display: inline-block;
}
.inner{
  position : absolute;
  top : 0; left : 0; right : 0; bottom : 0;
}
.maxPie-wrapper{
  position : relative;
  background: rgba(16, 23, 32, 1);
  width: 100%;
  padding-bottom : 70%;
  display: inline-block;
}
.max-line-wrapper{
  position : relative;
  background: rgba(16, 23, 32, 1);
  width: 100%;
  padding-bottom : 56%;
  display: inline-block;
}
</style>
