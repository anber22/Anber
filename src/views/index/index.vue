<template>
  <div class="index-box">
    <div class="gauge-rapper">
      <div class="inner">
        <Gauge :data="gaugeData" />
      </div>
    </div>
  </div>
</template>

<script>
import Gauge from '@/components/echarts/gauge/Gauge'

export default {
  components: {
    Gauge
  },
  data() {
    return {
      gaugeData: {
        chartId: 'gaugeId'
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
.index-box{
  background: #eee;
}
.title {
  font-size: 50px;
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
