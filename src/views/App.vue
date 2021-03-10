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
@media (min-width: 300px) and (max-width: 320px) {
  #app{
    zoom: 0.8533;
  }
}
@media (min-width: 321px) and (max-width: 350px) {
  #app{
    zoom: 0.93333;
  }
}
@media (min-width: 351px) and (max-width: 370px) {
  #app{
    zoom: 0.989333;
  }
}
@media (min-width: 371px) and (max-width: 400px) {
  #app{
    zoom: 1.067;
  }
}
@media (min-width: 401px) and (max-width: 413px) {
  #app{
    zoom: 1.1013;
  }
}

@media (min-width: 414px) and (max-width: 420px) {
  #app{
    zoom: 1.104;
  }

}
.AnalysisPie-echarts-tooltip{
  z-index: 9 !important;
}
.MaxLine-echarts-tooltip, .EventsLine-echarts-tooltip{
  padding: 6px !important
}
</style>
