<template>
  <div>
    <div :id="data.chartId" class="line-content" />
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
  mounted() {
    let interval = 2
    const _xAxisData = this.data.xAxis.data
    if (_xAxisData.length < 7) {
      interval = 0
    } else if (_xAxisData.length > 6 && _xAxisData.length < 12) {
      interval = 1
    }
    // 基于准备好的dom，初始化echarts实例
    var myChart = this.$echarts.init(document.getElementById(this.data.chartId))
    // 指定图表的配置项和数据
    var option = {
      color: ['rgba(24, 237, 250, 0.5)'],
      backgroundColor: 'rgba(0, 133, 247, 0)',
      title: {
        text: this.data.title,
        textStyle: {
          fontSize: 14,
          color: 'rgba(139, 163, 194, 1)'
        },
        show: true
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
        textStyle: {
          color: '#8BA3C2'
        },
        borderColor: 'rgba(24, 237, 250, 1)',
        borderWidth: 1,
        triggerOn: 'mousemove|click',
        formatter: function(params) {
          var result = ''
          var dotHtml = '<span style="display:inline-block;margin-right:5px;margin-bottom: 4px;width:13px;height:2px;background-color:rgba(24, 237, 250, 1)"></span>'
          result += dotHtml + '隐患数 ' + params[0].data + '</br>'
          return result
        }
      },
      grid: {
        show: false,
        left: '3%',
        right: '4%',
        bottom: '8%',
        top: '28%',
        containLabel: true
      },
      xAxis: {
        // boundaryGap: false,
        data: this.data.xAxis.data,
        offset: 8,
        axisLine: { // X轴轴线的样式
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        axisTick: { // 是否显示刻度尺
          show: false
        },
        axisLabel: {
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
        axisLabel: { // Y轴左侧字
          show: true,
          textStyle: {
            color: 'rgba(111, 133, 162, 1)'
          },
          fontSize: 10
        },
        splitLine: { // 设置网格线颜色
          show: false
        }
      },
      series: [{
        name: '隐患数',
        type: 'line',
        barGap: 0,
        data: this.data.series.data,
        symbol: 'none',
        smooth: this.data.series.smooth,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(24, 237, 250, 0.25)' // 0% 处的颜色
            }, {
              offset: 0.2, color: 'rgba(24, 237, 250, 0.4)' // 20% 处的颜色
            }, {
              offset: 0.5, color: 'rgba(24, 237, 250, 0.2)' // 50% 处的颜色
            }, {
              offset: 1, color: 'transparent' // 100% 处的颜色
            }]
          }
        },
        lineStyle: {
          // 线的颜色
          color: 'rgba(24, 237, 250, 1)',
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
</script>
<style scoped>
.line-content{
  z-index: 10;
  width: 100%;
  height: 100%
}
</style>
