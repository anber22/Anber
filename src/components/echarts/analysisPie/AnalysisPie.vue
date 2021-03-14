<template>
  <div :style="`zoom:${zoom};transform:scale(${1/zoom});transform-origin: 0 0;`">
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
      zoom: null
    }
  },
  mounted() {
    this.init()
    const width = document.documentElement.clientWidth || document.body.clientWidth
    this.zoom = 1 / (width / 375)
    window.addEventListener('resize', () => {
      const width = document.documentElement.clientWidth || document.body.clientWidth
      this.zoom = 1 / (width / 375)
    })
  },
  methods: {
    init() {
      let _data = []
      if (this.data.title < 1 || this.data.title === null) {
        _data = [{
          name: '暂无数据',
          value: 0,
          precent: 0
        }]
      } else {
        _data = this.data.data
      }
      const myChart = this.$echarts.init(document.getElementById(this.data.chartId))
      const option = {
        color: this.data.color,
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.89)',
          triggerOn: 'mousemove|click',
          textStyle: {
            color: 'rgba(111, 133, 162, 1)'
          },
          className: 'AnalysisPie-echarts-tooltip'
        },
        legend: {
          show: true,
          top: '56%',
          left: 'center',
          type: 'scroll', // 图例超出可翻页
          pageIconColor: '#A3D5FF', // 可点击翻页按钮颜色
          pageIconInactiveColor: '#122E51', // 不可点击翻页按钮颜色
          pageTextStyle: { // 翻页文字样式
            color: '#FFFFFF',
            fontSize: 8
          },
          pageIconSize: 12, // 翻页按钮大小
          orient: 'vertical',
          padding: 0,
          itemGap: 16,
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
                  name = item.name + '      ' + item.value + '次' + '        ' + item.precent + '%'
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
            center: ['50%', '26%'],
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
.AnalysisPie-echarts-tooltip{
  z-index: 9
}
</style>
