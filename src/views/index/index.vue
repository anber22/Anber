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
  </div>
</template>

<script>
import Gauge from '@/components/echarts/gauge/Gauge'

import Api from '../../../src/api/index'
import EquipList from '@/components/index/equipList/EquipList'
import Warning from '@/components/index/Warning/Warning'
import Config from '/config.json'
export default {
  components: {
    EquipList,
    Warning,
    Gauge
  },
  data() {
    return {
      gaugeData: {
        chartId: 'gaugeId'
      },
      equipCountings: '',
      branchesCountings: '',
      equipList: []
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.socket()
    // }, 1000)
    this.getEquipCountings()
    this.getBranchesCountings()
    this.getEquipList()
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
    }

  }
}
</script>

<style >
.index{
  width: 92%;
  height: 2000px;
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
  /* background: #ccc; */
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
  /* background: #ccc; */
  padding-bottom : 120.75%;
  padding-right: 0px;

}
.equipList{
  width: 100%;
  height: 100%;
}

.gauge-rapper{
  position : relative;
  background: rgba(16, 23, 32, 1);
  width: 100%;
  padding-bottom : 60%;
  display: inline-block;
}
.inner{
  position : absolute;
  top : 0; left : 0; right : 0; bottom : 0;
}
</style>
