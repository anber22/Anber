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
    zoom: 0.85333333;
  }
}
@media (min-width: 321px) and (max-width: 350px) {
  #app{
    zoom: 0.93333;
  }
}
@media (min-width: 351px) and (max-width: 374px) {
  #app{
    zoom: 0.989333;
  }
}
@media (min-width: 375px) and (max-width: 379px) {
  #app{
    zoom: 1;
  }
}
@media (min-width: 380px) and (max-width: 400px) {
  #app{
    zoom: 1.067;
  }
}
@media (min-width: 401px) and (max-width: 413px) {
  #app{
    zoom: 1.1013;
  }
}

<<<<<<< HEAD
=======
@media (min-width: 414px) and (max-width: 420px) {
  #app{
    zoom: 1.104;
  }

}
@media (min-width: 421px) and (max-width: 440px) {
  #app{
     zoom: 1.1733333;
  }
}
@media (min-width: 441px) and (max-width: 460px) {
  #app{
    zoom: 1.2266666;
  }
}
@media (min-width: 461px) and (max-width: 480px) {
  #app{
    zoom: 1.28;
  }
}
@media (min-width: 481px) and (max-width: 500px) {
  #app{
    zoom: 1.33333333;
  }
}
>>>>>>> 37ad99b829a5df0f5acef0b2c0062fb183d72d8e
.AnalysisPie-echarts-tooltip{
  z-index: 9 !important;
}
.MaxLine-echarts-tooltip, .EventsLine-echarts-tooltip{
  padding: 6px !important
}
</style>
