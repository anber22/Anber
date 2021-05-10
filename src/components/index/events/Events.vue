<template>
  <div class="events-content">
    <div class="title-box" style="margin-top: 2%;">
      <div class="title-style" />
      <div class="title-name">
        <div style="margin-left: 4px;max-width: 70%; display: flex">
          <van-cell is-link :title="actionsTitle" class="actions-title" @click="show = true" />
          <van-action-sheet v-model="show" class="actions-content" :actions="eventData.equipType" :closeable="true" title="请选择" :round="false" @select="onChangeSystemType" />
          <div>
            <p class="thirtyDay" @click="show = true">
              (近30天)
            </p>
          </div>
        </div>

        <div>
          <span class="eventCounting">事件数</span>
          <span class="eventCounting errorCounting">故障数</span>
        </div>
      </div>
    </div>
    <div class="">
      <div class="analysisTimeline">
        <ChartLine v-if="eventData.analysisTimelineFlag" :line-data="eventData.analysisTimelineData" />
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
    eventData: {
      type: Object,
      default: () => {}
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
      show: false,
      actionsTitle: null
    }
  },
  mounted() {
    this.actionsTitle = this.eventData.equipType[0].name
  },
  methods: {
    onChangeSystemType(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      this.actionsTitle = item.name
      this.$emit('systemType', item.value)
    }
  }
}
</script>

<style scoped src="./Events.css"></style>
<style>
/* 修改弹出框样式 */
.thirtyDay{
  font-size: 12px;
  text-align: left;
  line-height: 30px;
  width: 50px;
  position: relative
}
.thirtyDay::before{
  content: '';
  position: absolute;
  top: 50%;
  right: -12px;
  margin-top: -8px;
  border: 3px solid;
  border-color: transparent transparent #dcdee0 #dcdee0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: .8;
  content: '';
}
/* option样式 */
.events-content .van-cell{
  background-color:transparent;
  width: 100%;
  font-size: 20px;
  color: #B9CEE9;
  text-align: left;
  padding: 0 0 0 5;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 关掉option下边框 */
.events-content .van-cell::after{
  display: none
}
/* 小三角样式 */
.events-content .actions-title .van-icon-arrow::before{
  content: '';
  position: absolute;
  top: 50%;
  right: -12px;
  margin-top: -5px;
  border: 3px solid;
  border-color: transparent transparent #dcdee0 #dcdee0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: .8;
  content: '';
  display: none;
}
.events-content .actions-content.van-action-sheet{
  background-color: #10161F;
  color: #FFFEFE;
  font-size: 16px
}
.events-content .actions-content .van-action-sheet__cancel, .actions-content .van-action-sheet__item{
  background-color: #10161F;
  color: #B9CEE9;
  font-size: 16px;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px #283444 solid;
}
.events-content .actions-content .van-action-sheet__header{
  border-bottom: 1px #283444 solid;
}
.events-content .actions-content .van-action-sheet__close{
  color: #FFFEFE
}
.events-content .van-overlay{
  background-color: rgba(10, 4, 1, 0.55)
}
</style>
