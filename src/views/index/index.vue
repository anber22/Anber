<template>
  <div class="index">
    <div class="equip-count">
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
    </div>
    <div class="gauge-rapper">
      <div class="inner">
        <Gauge :data="gaugeData" />
      </div>
    </div>
  </div>
</template>

<script>
import Gauge from '@/components/echarts/gauge/Gauge'

import Api from '../../../src/api/index'
export default {
  components: {
    Gauge
  },
  data() {
    return {
      gaugeData: {
        chartId: 'gaugeId'
      },
      equipCountings: '',
      branchesCountings: ''
    }
  },
  mounted() {
    // this.getEquipCountings()
  },
  methods: {
    getEquipCountings() {
      this.equipCountings = Api.equipCountings()
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
