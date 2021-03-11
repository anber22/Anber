<template>
  <div class="monitorAnalysis-content">
    <div class="title-box">
      <div class="title-style" />
      <div class="title-name">
        <div class="left-select" style="margin-left: 4px;max-width: 60%">
          <van-cell is-link :title="equipTypeTitle" class="actions-title" @click="show = true" />
          <van-action-sheet v-model="show" class="actions-content" :actions="data.equipType" :closeable="true" title="请选择" :round="false" @select="onChangeSystemType" />
        </div>
        <div class="right-select">
          <van-dropdown-menu :overlay="false" :z-index="200" active-color="#B9CEE9">
            <van-dropdown-item v-model="timeType" :options="data.dateType" @change="onChangeDateType" />
          </van-dropdown-menu>
        </div>
      </div>
    </div>
    <div class="item-right">
      <div class="detail-item">
        <p class="detail-item-title">
          隐患次数
        </p>
        <p class="detail-item-value color-light-blue">
          {{ data.pieData.title }}
        </p>
      </div>
    </div>
    <!-- <div class=""> -->
    <div class="analysisTimeline">
      <Pie v-if="data.monitorAnalysisFlag" :data="data.pieData" />
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import Pie from 'cmp/echarts/analysisPie/AnalysisPie'
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
      show: false,
      equipTypeTitle: null,
      timeType: 1
    }
  },
  mounted() {
    this.equipTypeTitle = this.data.equipType[0].name
  },
  methods: {
    onChangeSystemType(item) {
      this.show = false
      this.equipTypeTitle = item.name
      this.$emit('systemType', item.value)
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
.monitorAnalysis-content .right-select{
  color: #8BA3C2;
  font-size: 15px;
  /* padding-right: 18px */
}
/* option样式 */
.monitorAnalysis-content .van-cell{
  background-color: #101720;
  width: 100%;
  font-size: 20px;
  color: #B9CEE9;
  text-align: left;
  padding: 0 14px 0 5;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 关掉option下边框 */
.monitorAnalysis-content .van-cell::after{
  display: none
}

/* 小三角样式 */
.monitorAnalysis-content .actions-title .van-icon-arrow::before,
.monitorAnalysis-content .right-select .van-popover__wrapper::before{
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
.monitorAnalysis-content .actions-title .van-icon-arrow::before{
  right: -12px;
  margin-top: -5px;
}
.monitorAnalysis-content .right-select .van-popover__wrapper::before{
  right: 0px;
  margin-top: -14px;
}
.monitorAnalysis-content .actions-content.van-action-sheet{
  background-color: #10161F;
  color: #FFFEFE;
  font-size: 16px
}
.monitorAnalysis-content .actions-content .van-action-sheet__cancel, .monitorAnalysis-content .actions-content .van-action-sheet__item{
  background-color: #10161F;
  color: #B9CEE9;
  font-size: 16px;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px #283444 solid;
}
.monitorAnalysis-content .actions-content .van-action-sheet__header{
  border-bottom: 1px #283444 solid;
}
.monitorAnalysis-content .actions-content .van-action-sheet__close{
  color: #FFFEFE
}
.monitorAnalysis-content .van-overlay{
  background-color: rgba(10, 4, 1, 0.55)
}

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
/* .monitorAnalysis-content .van-cell{
  background-color: #101720;
  width: 100%;
  font-size: 18px;
  color: rgba(128, 146, 161, 1);
  text-align: center;
  padding: 6px 10px;
} */
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
  width: 60%;
  border: 1px rgba(42, 82, 134, 1) solid;
  left: 52px;
  top: 6px;
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
