<template>
  <div>
    <div ref="chartId" class="gauge-content" />
  </div>
</template>
<script>
export default {
  props: {
    gaugeData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      option: {},
      mychart: null
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chartId)
    this.option = {
      animation: true,
      series: [{
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '100%',
        center: ['50%', '65%'],
        // 仪表盘轴线相关配置。
        axisLine: { // 顶部的轴
          lineStyle: {
            width: 10,
            color: [
              [0.5, 'rgba(35, 255, 200, 1)'],
              [1, 'rgba(27, 126, 255, 1)']
            ]
          }
        },
        // 仪表盘指针。
        pointer: {
          itemStyle: {
            color: 'rgba(7, 219, 255, 1)'
          },
          offsetCenter: [0, '-10%']
        },
        axisTick: {
          distance: 4,
          length: '6%',
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.6)',
            width: 1
          }
        },
        splitLine: {
          distance: 4,
          length: '9%',
          lineStyle: {
            color: '#fff',
            width: 3
          }
        },
        axisLabel: {
          color: 'rgba(163, 239, 255, 1)',
          distance: 14,
          fontSize: 6
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '40%'],
          formatter: [
            '{a|设备在线率：}',
            '{b|{value}%}'
          ].join(' '),

          rich: {
            a: {
              color: 'rgba(163, 239, 255, 1)',
              fontSize: 14,
              verticalAlign: 'middle'
            },
            b: {
              color: 'rgba(163, 239, 255, 1)',
              height: 40,
              fontSize: 28,
              verticalAlign: 'bottom'
            }
          },
          color: 'auto'
        },
        data: [{
          value: 0
        }],
        zlevel: 3
      }, {
        name: '外侧线条',
        type: 'gauge',
        // 起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        startAngle: 180,
        // 结束角度。
        endAngle: 0,
        center: ['50%', '65%'], // 默认全局居中
        // 半径
        radius: '105%',
        // 仪表盘轴线相关配置。
        axisLine: { // 坐标轴线
          show: true,
          lineStyle: { // 属性lineStyle控制线条样式
            width: 2,
            color: [
              [1, 'rgba(255, 255, 255, 0.3)']
            ]
          }
        },
        // 分隔线样式。
        splitLine: {
          show: false
        },
        // 刻度样式
        axisTick: {
          show: false
        },
        // 刻度标签。
        axisLabel: {
          show: false
        },
        // 仪表盘指针。
        pointer: {
          show: false
        },
        // 仪表盘标题。
        title: {
          show: false
        },
        // 仪表盘详情，用于显示数据。
        detail: {
          show: false,
          offsetCenter: [0, '-10%'],
          formatter: '',
          textStyle: {
            fontSize: 0
          }
        },
        data: [
          { name: '数量', value: 'n' }
        ],
        zlevel: 3
      }, {
        name: '扇形蒙层',
        type: 'gauge',
        // 起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        startAngle: 180,
        // 结束角度。
        endAngle: 0,
        center: ['50%', '65%'], // 默认全局居中
        // 半径
        radius: '100%',
        // 仪表盘轴线相关配置。
        axisLine: { // 坐标轴线
          show: true,
          lineStyle: { // 属性lineStyle控制线条样式
            width: 120,
            color: [
              [0.5, 'rgba(35, 255, 200, 0.15)'],
              [1, 'rgba(0, 192, 255, 0.15)']
            ]
          }
        },
        // 分隔线样式。
        splitLine: {
          show: false
        },
        // 刻度样式
        axisTick: {
          show: false
        },
        // 刻度标签。
        axisLabel: {
          show: false
        },
        // 仪表盘指针。
        pointer: {
          show: false
        },
        // 仪表盘标题。
        title: {
          show: false
        },
        // 仪表盘详情，用于显示数据。
        detail: {
          show: false,
          offsetCenter: [0, '-10%'],
          formatter: '',
          textStyle: {
            fontSize: 0
          }
        },
        data: [
          { name: '数量', value: 'n' }
        ],
        zlevel: 5
      }, {
        name: '内层扇形1',
        type: 'gauge',
        // 起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        startAngle: 180,
        // 结束角度。
        endAngle: 0,
        center: ['50%', '65%'], // 默认全局居中
        // 半径
        radius: '40%',
        // 仪表盘轴线相关配置。
        axisLine: { // 坐标轴线
          show: true,
          lineStyle: { // 属性lineStyle控制线条样式
            width: 5,
            color: [
              [1, 'rgba(0, 192, 255, 0.15)']
            ],
            shadowColor: 'rgba(0, 192, 255, 1)',
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 2
          }
        },
        // 分隔线样式。
        splitLine: {
          show: false
        },
        // 刻度样式
        axisTick: {
          show: false
        },
        // 刻度标签。
        axisLabel: {
          show: false
        },
        // 仪表盘指针。
        pointer: {
          show: false
        },
        // 仪表盘标题。
        title: {
          show: false
        },
        // 仪表盘详情，用于显示数据。
        detail: {
          show: false,
          offsetCenter: [0, '-10%'],
          formatter: '',
          textStyle: {
            fontSize: 0
          }
        },
        data: [
          { value: 100 }
        ],
        zlevel: 3
      }, {
        name: '内层扇形2',
        type: 'gauge',
        // 起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        startAngle: 180,
        // 结束角度。
        endAngle: 0,
        center: ['50%', '65%'], // 默认全局居中
        // 半径
        radius: '30%',
        // 仪表盘轴线相关配置。
        axisLine: { // 坐标轴线
          show: true,
          lineStyle: { // 属性lineStyle控制线条样式
            width: 5,
            color: [
              [1, 'rgba(0, 192, 255, 0.15)']
            ],
            shadowColor: 'rgba(0, 192, 255, 1)',
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 2
          }
        },
        // 分隔线样式。
        splitLine: {
          show: false
        },
        // 刻度样式
        axisTick: {
          show: false
        },
        // 刻度标签。
        axisLabel: {
          show: false
        },
        // 仪表盘指针。
        pointer: {
          show: false
        },
        // 仪表盘标题。
        title: {
          show: false
        },
        // 仪表盘详情，用于显示数据。
        detail: {
          show: false,
          offsetCenter: [0, '-10%'],
          formatter: '',
          textStyle: {
            fontSize: 0
          }
        },
        data: [
          { value: 100 }
        ],
        zlevel: 3
      }, {
        name: '内层扇形3',
        type: 'gauge',
        // 起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        startAngle: 180,
        // 结束角度。
        endAngle: 0,
        center: ['50%', '65%'], // 默认全局居中
        // 半径
        radius: '20%',
        // 仪表盘轴线相关配置。
        axisLine: { // 坐标轴线
          show: true,
          lineStyle: { // 属性lineStyle控制线条样式
            width: 5,
            color: [
              [1, 'rgba(0, 192, 255, 0.15)']
            ],
            shadowColor: 'rgba(0, 192, 255, 1)',
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 2
          }
        },
        // 分隔线样式。
        splitLine: {
          show: false
        },
        // 刻度样式
        axisTick: {
          show: false
        },
        // 刻度标签。
        axisLabel: {
          show: false
        },
        // 仪表盘指针。
        pointer: {
          show: false
        },
        // 仪表盘标题。
        title: {
          show: false
        },
        // 仪表盘详情，用于显示数据。
        detail: {
          show: false,
          offsetCenter: [0, '-10%'],
          formatter: '',
          textStyle: {
            fontSize: 0
          }
        },
        data: [
          { value: 100 }
        ],
        zlevel: 3
      }, {
        name: '仪表盘底部2个大的刻度线',
        type: 'gauge',
        // 起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        startAngle: 180,
        // 结束角度。
        endAngle: 0,
        splitNumber: 1,
        center: ['50%', '68%'], // 默认全局居中
        // 半径
        radius: '120%',
        // 仪表盘轴线相关配置。
        axisLine: { // 坐标轴线
          show: false,
          lineStyle: { // 属性lineStyle控制线条样式
            width: 10,
            color: [
              [1, 'rgba(0, 192, 255, 0.15)']
            ],
            shadowColor: 'rgba(0, 192, 255, 1)',
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 2
          }
        },
        // 分隔线样式。
        splitLine: {
          show: false
        },
        // 刻度样式
        axisTick: {
          show: true,
          splitNumber: 1,
          length: 13,
          lineStyle: {
            color: 'rgba(7, 219, 255, 1)',
            width: 5
          }
        },
        // 刻度标签。
        axisLabel: {
          show: false
        },
        // 仪表盘指针。
        pointer: {
          show: false
        },
        // 仪表盘标题。
        title: {
          show: false
        },
        // 仪表盘详情，用于显示数据。
        detail: {
          show: false,
          offsetCenter: [0, '-10%'],
          formatter: '',
          textStyle: {
            fontSize: 0
          }
        },
        data: [
          { value: 100 }
        ],
        zlevel: 3
      }]

    }
    if (this.gaugeData.onlinePercent > 0) {
      this.option.series[0].data[0].value = this.gaugeData.onlinePercent
      this.myChart.setOption(this.option, true)
    }
    this.myChart.setOption(this.option, true)
  },
  methods: {
    onMessage(msg) {
      this.option.series[0].data[0].value = msg.equipOnlinePrecent
      this.myChart.setOption(this.option, true)
    }
  }
}
</script>
<style scoped src='./Gauge.css'></style>
