<!-- 首页事件类型 -->
<template>
  <div class="events-content">
    <div class="title-box">
      <div class="title-style" />
      <div class="title-name">
        <div style="margin-left: 4px">
          <Select v-model="systemType" size="small" class="system-select" @on-change="onChangeSystemType">
            <Option v-for="item in data.equitType" :key="item.value" class="systemOption" :value="item.value">
              {{ item.label }}
            </Option>
          </Select>
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
/* .events-content .title .ivu-icon-ios-arrow-down:before{
  content: "\F33D";
  color: #A3EFFF
}
.events-content .title .ivu-icon-ios-arrow-down{
  font-size: 24px
}
.events-content .title .ivu-select-selection{
  background: transparent;
  border: 0;
  box-shadow: none;
  color: #A3EFFF;
}
.events-content .ivu-select .ivu-select-dropdown{
  background: rgba(13, 35, 63, 1);
  border: 1px solid #2A5286;
}
.events-content .systemOption{
  color: rgba(128, 146, 161, 1)
}
.events-content .ivu-select-item-focus{
  background: rgba(1, 255, 252, 0.16)
}
.events-content .ivu-select-item-selected, .events-content .ivu-select-item-selected:hover{
  color: rgba(1, 255, 252, 1);
  background: rgba(1, 255, 252, 0.16)
} */

select:focus,select:active,select:hover{
  outline:none;
}

</style>
