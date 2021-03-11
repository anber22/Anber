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
/* @media (min-width: 300px) and (max-width: 320px) {
  #app{
    zoom: 0.8533;
  }
} */

/* @media (min-width: 401px) and (max-width: 413px) {
  #app{
    zoom: 1.1013;
  }
} */

.AnalysisPie-echarts-tooltip{
  z-index: 9 !important;
}
.MaxLine-echarts-tooltip, .EventsLine-echarts-tooltip{
  padding: 6px !important
}
</style>
