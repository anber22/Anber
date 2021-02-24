<!-- 首页监测分析 -->
<template>
  <div class="events-content">
    <div class="title-box">
      <div class="title-style" />
      <div class="title-name">
        <div style="margin-left: 4px">
          <Select v-model="systemType" size="small" class="system-select" @on-change="onChangeSystemType">
            <Option v-for="item in data.equipType" :key="item.value" class="systemOption" :value="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div>
          <Select v-model="systemType" size="small" class="system-select system-select-date" @on-change="onChangeSystemType">
            <Option v-for="item in data.dateType" :key="item.value" class="systemOption" :value="item.value">
              {{ item.label }}
            </Option>
          </Select>
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
      systemType: 1
    }
  },
  mounted() {
    console.log(this.data, 'monitorView')
  },
  methods: {
    onChangeSystemType(value) {
      this.$emit('systemType', value)
    }
  }
}
</script>

<style scoped src="./MonitorAnalysis.css"></style>
<style>
select:focus,select:active,select:hover{
  outline:none;
}

</style>
