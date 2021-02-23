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
    <!-- <div class="equip-count">
      <div class="inside-content" />
    </div> -->
    <Adaptive class="branches-count" :data="['47.9%','18.67%']">
      <div class="count-title">
        网点数
      </div>
      <div class="count-value">
        {{ branchesCountings }}
      </div>
    </Adaptive>
    <!-- end -->
    <!-- 仪表盘 start -->
    <div class="gauge-rapper">
      <div class="inner">
        <Gauge :data="gaugeData" />
      </div>
    </div>
    <!-- end -->
    <!-- 设备在线率 start -->
    <div class="gauge-content">
      <div class="inside-content">
        <Gauge :data="gaugeData" />
      </div>
    </div>
    <!-- end -->
    <!-- 实时预警 start -->
    <div class="title-box">
      <div class="inside-content">
        <div class="title-style" />
        <div class="title-name">
          实时预警
        </div>
      </div>
    </div>
    <div class="warning-box">
      <div class="inside-content">
        <Warning class="warning" />
      </div>
    </div>
    <!-- end -->
    <!-- 应用列表 start -->
    <div class="title-box">
      <div class="inside-content">
        <div class="title-style" />
        <div class="title-name">
          应用列表
        </div>
      </div>
    </div>
    <div class="equipList-box">
      <div class="inside-content">
        <EquipList :data="equipList" class="equipList" />
      </div>
    </div>
    <!-- end -->

    <!-- 辖区统计 start  -->
    <div class="title-box">
      <div class="inside-content">
        <div class="title-style" />
        <div class="title-name">
          辖区统计
        </div>
      </div>
    </div>
    <DepartCount :data="departCountData" />
    <div class="maxPie-content">
      <div class="inside-content">
        <MaxPie v-if="maxPieDataFlag" :data="maxPieData" @activeType="activeType" />
      </div>
    </div>
    <div class="max-line-content">
      <div class="inside-content">
        <MaxLine v-if="lineDataFlag" :data="lineData" />
      </div>
    </div>
    <!-- end -->
  </div>
</template>

<script>
import Gauge from '@/components/echarts/gauge/Gauge'
import MaxPie from '@/components/echarts/maxPie/MaxPie'
import MaxLine from '@/components/echarts/line/Line'
import Api from '../../../src/api/index'
import EquipList from '@/components/index/equipList/EquipList'
import Warning from '@/components/index/Warning/Warning'
import Config from '/config.json'

import DepartCount from '@/components/index/departCount/DepartCount'

export default {
  components: {
    EquipList,
    Warning,
    Gauge,
    MaxPie,
    MaxLine,
    DepartCount
  },
  data() {
    return {
      gaugeData: {
        chartId: 'gaugeId'
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
      lineDataFlag: false,
      departCountList: [],
      departCountData: {}
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.socket()
    // }, 1000)
    this.getEquipCountings()
    this.getBranchesCountings()
    this.getEquipList()
    this.getTroubleAnalysis('12345')
    this.getDepartCounting()
  },
  methods: {
    /**
     * 获取设备总数
     */
    async getEquipCountings() {
      const res = await Api.equipCountings()
      this.equipCountings = parseInt(res.data).toLocaleString()
      console.log(this.equipCountings)
    },
    /**
     * 获取网点总数
     */
    async getBranchesCountings() {
      const res = await Api.branchesCountings()
      this.branchesCountings = parseInt(res.data).toLocaleString()
      console.log(this.equipCountings)
    },
    /**
     * 获取应用列表
     */
    async getEquipList() {
      const res = await Api.applicationlist()
      this.equipList = [...res.data]
      const arryNew = []
      // 过滤 config 的equipList ，拿出对应的imgUrl
      this.equipList.forEach(item => {
        console.log(Config)
        Config.equipList.some((equip, index) => {
          console.log('id', equip.id, item.id, equip.imgUrl)
          if (equip.id === item.id) {
            arryNew.push(Object.assign({}, item, { img: equip.imgUrl }))
          }
        })
      })
      console.log(arryNew)
      this.equipList = arryNew
    },
    /**
     * 辖区统计选中的辖区ID，并筛选当前辖区的数据出来
     */
    activeType(type) {
      this.lineDataFlag = false
      const countObj = this.departCountList.filter(item => {
        return type === item.departId
      })
      this.departCountData = {
        online: countObj[0].data.online,
        outline: countObj[0].data.outline,
        trouble: countObj[0].data.trouble
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
            value: item.data.trouble,
            name: item.departName,
            type: item.departId,
            count: item.data.count
          })
        })
        this.departCountData = {
          online: dataArr[0].data.online,
          outline: dataArr[0].data.outline,
          trouble: dataArr[0].data.trouble
        }
        this.maxPieDataFlag = true
      }
    },
    /**
     * 15天隐患分析
     */
    async getTroubleAnalysis(id) {
      const departId = id
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
    }

  }
}
</script>

<style >
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
  background-image: url('/src/assets/images/index/equip-count.png');
  background-repeat:no-repeat ;
  background-size: cover;
}
.branches-count{
  padding-right: 0px;
  border-radius:5px;
  margin-top: 5%;
  display: inline-block;
  margin-left: 2.7%;
  background-image: url('/src/assets/images/index/branches-count.png');
  background-repeat:no-repeat ;
  background-size: cover;
}
.warning-box{
  width: 100%;
  position : relative;
  padding-bottom : 12.75%;
  padding-right: 0px;

  margin-top: 8%;
}
.inside-content{
  position : absolute;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
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
  width: 100%;
  position : relative;
  padding-bottom : 5.57%;
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
 width: 100%;
  position : relative;
  padding-bottom : 120.75%;
  padding-right: 0px;

}
.equipList{
  width: 100%;
  height: 100%;
}

.gauge-content{
  position : relative;
  width: 100%;
  padding-bottom : 66%;
  display: inline-block;
}
.maxPie-content{
  position : relative;
  width: 100%;
  padding-bottom : 70%;
  display: inline-block;
}
.max-line-content{
  position : relative;
  width: 100%;
  padding-bottom : 56%;
  display: inline-block;
}
</style>
