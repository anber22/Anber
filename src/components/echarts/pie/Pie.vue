<template>
  <div>
    <div :id="data.chartId" class="pie-content" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const _data = this.data.data
      var myChart = this.$echarts.init(document.getElementById(this.data.chartId))
      var option = {
        color: ['rgba(99, 127, 234, 1)', 'rgba(90, 173, 212, 1)', 'rgba(179, 90, 255, 1)', 'rgba(237, 204, 49, 1)', 'rgba(37, 189, 151, 1)'],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.89)'
        },
        title: {
          text: this.data.title,
          top: '21%',
          left: '45%',
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        legend: {
          top: '55%%',
          left: 'center',
          padding: 0,
          itemGap: 20,
          icon: 'rect',
          itemWidth: 11,
          itemHeight: 9,
          textStyle: {
            color: 'rgba(255, 255, 255, 1)',
            fontSize: 12
          },
          formatter: function(name) {
            if (_data[0].value) {
              _data.forEach((item, i) => {
                if (item.name === name) {
                  name = item.name + '      ' + item.value + '次'
                }
              })
            }
            return name
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['50%', '25%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: _data
          }
        ]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>
.pie-content{
  width: 100%;
  height: 100%;
}
</style>
