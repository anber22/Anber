<!-- 首页监测分析 -->
<template>
  <div class="monitorAnalysis-content">
    <div class="title-box">
      <div class="title-style" />
      <div class="title-name">
        <div class="left-select" style="margin-left: 4px;width: 52%">
          <van-dropdown-menu :overlay="false" :z-index="200" active-color="#B9CEE9">
            <van-dropdown-item v-model="systemType" :options="data.equipType" @change="onChangeSystemType" />
          </van-dropdown-menu>
        </div>
        <div class="right-select">
          <van-dropdown-menu :overlay="false" :z-index="200" active-color="#B9CEE9">
            <van-dropdown-item v-model="timeType" :options="data.dateType" @change="onChangeDateType" />
          </van-dropdown-menu>
        </div>
      </div>
    </div>
    <div class="">
      <div class="analysisTimeline">
        <Pie v-if="data.monitorAnalysisFlag" :data="data.pieData" />
      </div>
    </div>
  </div>
</template>

<script>
import Pie from '@/components/echarts/pie/Pie'
export default {
  components: {
    Pie
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    changeSystem: {
      type: Function,
      default: () => {
        return Function
      }
    }
  },
  data() {
    return {
      systemType: 1,
      timeType: 1
    }
  },
  mounted() {
    console.log(this.data, 'monitorView')
  },
  methods: {
    onChangeSystemType(value) {
      this.$emit('systemType', value)
    },
    onChangeDateType(value) {
      this.$emit('timeType', value)
    }
  }
}
</script>

<style scoped src="./MonitorAnalysis.css"></style>
<style>
/* 修改下拉框样式 */
.monitorAnalysis-content .van-dropdown-menu__bar{
  background-color: #101720 !important;
  height: auto;
}
/* 标题和选中项文字样式 */
.monitorAnalysis-content .van-dropdown-menu__title{
  color: rgba(185, 206, 233, 1);
  font-size: 20px
}
.monitorAnalysis-content .right-select .van-dropdown-menu__title{
  color: #8BA3C2;
  font-size: 15px
}
/* 标题左对齐 */
.monitorAnalysis-content .van-dropdown-menu__item{
  justify-content: left
}
/* option样式 */
.monitorAnalysis-content .van-cell{
  background-color: #101720;
  width: 100%;
  font-size: 18px;
  color: rgba(128, 146, 161, 1);
  text-align: center;
  padding: 6px 10px;
}
.monitorAnalysis-content .right-select .van-cell{
  background-color: #101720;
  width: 100%;
  font-size: 14px;
  color: rgba(128, 146, 161, 1);
  text-align: center;
  padding: 6px 10px;
}
/* 关掉icon */
.monitorAnalysis-content .van-cell__value{
  display: none
}
/* 关掉option下边框 */
.monitorAnalysis-content .van-cell::after{
  display: none
}
/* 下拉框 */
.monitorAnalysis-content .van-popup--top{
  width: 80%;
  border: 1px rgba(42, 82, 134, 1) solid;
  left: 25px;
  background-color: transparent
}
/* 整个下拉框的宽高 */
.monitorAnalysis-content .van-dropdown-item{
  width: 188px;
  height: 137px;
}
.monitorAnalysis-content .right-select .van-dropdown-item{
  left: unset;
  width: 135px;
  right: 10px;
}
</style>
