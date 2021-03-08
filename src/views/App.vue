<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld'

// const VConsole = require('vconsole')
// new VConsole()

export default {
  name: 'App',
  components: {
  }
}
</script>
<style>
*{
  margin: 0px;
  padding: 0px;
}
.AnalysisPie-echarts-tooltip{
  z-index: 9 !important;
}
.MaxLine-echarts-tooltip, .EventsLine-echarts-tooltip{
  padding: 6px !important
}
</style>
