<!-- 首页事件类型 -->
<template>
  <div class="events-content">
    <div class="title-box">
      <div class="title-style" />
      <div class="title-name">
        <div style="margin-left: 4px;width: 52%">
          <!-- <Select v-model="systemType" size="small" class="system-select" @on-change="onChangeSystemType">
            <Option v-for="item in data.equitType" :key="item.value" class="systemOption" :value="item.value">
              {{ item.label }}
            </Option>
          </Select> -->
          <van-dropdown-menu class="dropdown-select" :overlay="false" :z-index="200" active-color="#B9CEE9">
            <van-dropdown-item v-model="systemType" :options="data.equitType" @change="onChangeSystemType" />
          </van-dropdown-menu>
        </div>
        <div>
          <span class="eventCounting">事件数</span>
          <span class="eventCounting errorCounting">故障数</span>
        </div>
      </div>
    </div>
    <div class="">
      <div class="analysisTimeline">
        <ChartLine v-if="data.analysisTimelineFlag" :data="data.analysisTimelineData" />
      </div>
    </div>
  </div>
</template>

<script>
import ChartLine from '@/components/echarts/eventsLine/EventsLine'
export default {
  components: {
    ChartLine
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
      systemType: 1
    }
  },
  methods: {
    onChangeSystemType(value) {
      this.$emit('systemType', value)
    }
  }
}
</script>

<style scoped src="./Events.css"></style>
<style>
/* 修改下拉框样式 */
.events-content .van-dropdown-menu__bar{
  background-color: #101720 !important;
  height: auto;
}
/* 标题和选中项文字样式 */
.events-content .van-dropdown-menu__title{
  color: rgba(185, 206, 233, 1);
  font-size: 20px
}
/* 标题左对齐 */
.events-content .van-dropdown-menu__item{
  justify-content: left
}
/* option样式 */
.events-content .van-cell{
  background-color: #101720;
  width: 100%;
  font-size: 18px;
  color: rgba(128, 146, 161, 1);
  text-align: center;
  padding: 6px 10px;
}
/* 关掉icon */
.events-content .van-cell__value{
  display: none
}
/* 关掉option下边框 */
.events-content .van-cell::after{
  display: none
}
/* 下拉框 */
.events-content .van-popup--top{
  width: 80%;
  border: 1px rgba(42, 82, 134, 1) solid;
  left: 25px;
  background-color: transparent
}
/* 整个下拉框的宽高 */
.events-content .van-dropdown-item{
  width: 188px;
  height: 137px;
}
</style>
