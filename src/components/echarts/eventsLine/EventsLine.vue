<template>
  <div>
    <div ref="chartId" class="lineMain" />
  </div>
</template>
<script>
export default {
  props: {
    lineData: {
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
      let interval = 4
      const _xAxisData = this.lineData.xAxis.data
      if (_xAxisData.length < 8) {
        interval = 0
      } else if (_xAxisData.length > 7 && _xAxisData.length < 14) {
        interval = 1
      } else if (_xAxisData.length > 13 && _xAxisData.length < 20) {
        interval = 2
      } else if (_xAxisData.length > 19 && _xAxisData.length < 26) {
        interval = 4
      } else {
        interval = 4
      }
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.chartId)
      // 指定图表的配置项和数据
      const option = {
        color: ['rgba(0, 133, 247, 1)', 'rgba(40, 255, 187, 1)'],
        title: {
          text: this.lineData.title,
          textStyle: {
            fontSize: '16px',
            color: '#333'
          },
          show: false
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.89)',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.42)',
              type: 'dashed'
            }
          },
          borderColor: '#8BA3C2',
          borderWidth: 1,
          triggerOn: 'mousemove|click',
          className: 'EventsLine-echarts-tooltip',
          formatter: function(params) {
            let result = ''
            const dotHtml = '<span style="display:inline-block;margin-right:5px;margin-bottom: 4px;width:13px;height:2px;background-color:rgba(40, 255, 187, 1)"></span>'
            const dotHtml2 = '<span style="display:inline-block;margin-right:5px;margin-bottom: 4px;width:13px;height:2px;background-color:rgba(116, 102, 248, 1)"></span>'
            result += dotHtml + '事件数 ' + params[0].data + '</br>' + dotHtml2 + '故障数 ' + params[1].data
            return result
          },
          textStyle: {
            color: 'rgba(111, 133, 162, 1)'
          }
        },
        legend: {
          show: false,
          icon: 'rect',
          itemWidth: 14, // 图例图形宽度
          itemHeight: 2, // 图例图形高度
          textStyle: {
            color: 'rgba(254, 255, 255, 1)'
          }
        },
        grid: {
          show: false,
          left: '3%',
          right: '4%',
          bottom: '8%',
          top: '8%',
          containLabel: true
        },
        xAxis: {
        // boundaryGap: false,
          data: this.lineData.xAxis.data,
          axisLine: { // X轴轴线的样式
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          axisTick: { // 是否显示刻度尺
            show: false
          },
          axisLabel: {
            showMaxLabel: true,
            showMinLabel: true,
            interval: interval, // 如果设置为 1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推
            show: true,
            textStyle: {
              color: 'rgba(111, 133, 162, 1)'
            },
            fontSize: 10
          }
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgba(111, 133, 162, 1)'
            },
            fontSize: 10
          },
          splitLine: { // 设置网格线颜色
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              width: 1,
              opacity: 0.4
            }
          }
        },
        series: [{
          name: '事件数',
          type: 'line',
          barGap: 0,
          data: this.lineData.series.data,
          symbol: 'none',
          smooth: this.lineData.series.smooth,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0.1, color: 'rgba(0, 15, 33, 0.5)' // 0% 处的颜色
              }, {
                offset: 0.2, color: 'rgba(40, 255, 187, 0.1)' // 20% 处的颜色
              }, {
                offset: 0.5, color: 'rgba(40, 255, 187, 0.1)' // 50% 处的颜色
              }, {
                offset: 0.8, color: 'rgba(40, 255, 187, 0.2)' // 50% 处的颜色
              }, {
                offset: 1, color: 'rgba(40, 255, 187, 0.1)' // 100% 处的颜色
              }]
            }
          },
          lineStyle: {
          // 线的颜色
            color: 'rgba(24, 237, 250, 1)',
            width: 1
          }
        },
        {
          name: '故障数',
          type: 'line',
          barGap: 0,
          data: this.lineData.series.data2,
          symbol: 'none',
          smooth: this.lineData.series.smooth,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0.1, color: 'rgba(0, 15, 33, 0.5)' // 0% 处的颜色
              }, {
                offset: 0.2, color: 'rgba(116, 102, 248, 0.1)' // 20% 处的颜色
              }, {
                offset: 0.5, color: 'rgba(116, 102, 248, 0.1)' // 50% 处的颜色
              }, {
                offset: 0.8, color: 'rgba(116, 102, 248, 0.2)' // 50% 处的颜色
              }, {
                offset: 1, color: 'rgba(116, 102, 248, 0.1)' // 100% 处的颜色
              }]
            }
          },
          lineStyle: {
          // 线的颜色
            color: 'rgba(116, 102, 248, 1)',
            width: 1
          }
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      }, false)
    }
  }
}
</script>
<style scoped src='./EventsLine.css'></style>
