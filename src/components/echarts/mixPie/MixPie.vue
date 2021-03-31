<template>
  <div class="maxPie-box">
    <div ref="chartId" :style="`zoom:${zoom};transform:scale(${1/zoom});transform-origin: 0 0;`" class="maxPie-content" />
    <div class="active-text">
      <p>
        <span class="depart-name">{{ departName }}</span>
        <br>
        <span class="depart-count">{{ count }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      index: null,
      activeType: {},
      departName: '',
      count: null,
      zoom: null,
      myChart: null,
      option: null
    }
  },
  watch: {
    activeType(index) {
      const activeData = this.data.data.filter(item => item.type === index)
      this.departName = activeData.length > 0 ? activeData[0].name : ''
      this.count = activeData.length > 0 ? activeData[0].count : ''
      this.$emit('activeType', index)
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
      this.departName = this.data.data[0].name
      this.count = this.data.data[0].count
      this.myChart = this.$echarts.init(this.$refs.chartId)
      this.option = {
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        selectedOffset: 0,
        series: [
          {
            name: '最外层环形圈',
            type: 'pie',
            radius: ['70%', '82%'],
            avoidLabelOverlap: false, // 是否启用防止标签重叠策略，默认开启
            label: {
              textStyle: {
                color: 'rgba(239, 240, 241, 1)', // 改变标示文字的颜色
                fontSize: 12
              }
            },
            // 图形的样式设置，
            itemStyle: {
              borderColor: 'rgba(4, 19, 42, 1)',
              borderWidth: 5, // 扇形间隔
              color: 'rgba(71, 167, 234, 1)'
            },
            // 高亮状态的扇区和标签样式。
            emphasis: {
              scale: false,
              label: {
                show: true,
                color: 'rgba(17, 254, 168, 1)',
                fontSize: 12
              },
              itemStyle: {
                color: 'rgba(17, 254, 168, 1)'
              }
            },
            // 标示文字引导线设置
            labelLine: {
              show: true,
              lineStyle: {
                color: 'rgba(84, 180, 247, 1)'
              },
              minTurnAngle: 100,
              length: 10,
              length2: 8
            },
            // 是否隐藏重叠的标签。
            labelLayout: {
              hideOverlap: false
            },
            data: this.data.data,
            zlevel: 6
          }, {
            name: '内阴影圈',
            type: 'pie',
            radius: ['58%', '60%'],
            label: {
              show: false
            },
            // 图形的样式设置，
            itemStyle: {
              color: 'rgba(71, 167, 234, 1)'
            },
            // 高亮状态的扇区和标签样式。
            emphasis: {
              show: false,
              scale: false
            },
            // 取消点击事件
            silent: true,
            // 标示文字引导线设置
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '内阴影圈1' }],
            zlevel: 5
          }, {
            name: '蚂蚁线',
            type: 'gauge',
            // 起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
            startAngle: 360,
            // 结束角度。
            endAngle: 0,
            splitNumber: 50,
            // 半径
            radius: '70%',
            // 仪表盘轴线相关配置。
            axisLine: { // 坐标轴线
              show: false
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            // 刻度样式
            axisTick: {
              show: true,
              splitNumber: 1,
              length: 2,
              lineStyle: {
                color: 'rgba(71, 167, 234, 1)',
                width: 4
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
            // 取消点击事件
            silent: true,
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
            zlevel: 4
          }, {
            name: '内线圈',
            type: 'pie',
            radius: ['38%', '38.5%'],
            label: {
              show: false
            },
            // 图形的样式设置，
            itemStyle: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            // 高亮状态的扇区和标签样式。
            emphasis: {
              show: false,
              scale: false
            },
            // 取消点击事件
            silent: true,
            // 标示文字引导线设置
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '搜索引擎' }],
            zlevel: 3
          }, {
            name: '旋转扇形',
            type: 'pie',
            radius: ['0%', '38.5%'],
            label: {
              show: false
            },
            // 取消点击事件
            silent: true,
            // 图形的样式设置，
            itemStyle: {
              color: function(params) {
                const colorList = [
                  {
                    c1: 'rgba(71, 167, 234, 0)',
                    c2: 'rgba(71, 167, 234, 0.2)'
                  },
                  {
                    c1: 'rgba(255,255,255,0)',
                    c2: 'rgba(255,255,255,0)'
                  },
                  {
                    c1: 'rgba(255,255,255,0)',
                    c2: 'rgba(255,255,255,0)'
                  },
                  {
                    c1: 'rgba(255,255,255,0)',
                    c2: 'rgba(255,255,255,0)'
                  }]
                return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  offset: 0,
                  color: colorList[params.dataIndex].c1
                }, {
                  offset: 1,
                  color: colorList[params.dataIndex].c2
                }])
              }
            },
            // 高亮状态的扇区和标签样式。
            emphasis: {
              show: false,
              scale: false
            },
            // 标示文字引导线设置
            labelLine: {
              show: false
            },
            data: [
              { value: 50, name: '扇形1' },
              { value: 50, name: '扇形2' },
              { value: 50, name: '扇形3' },
              { value: 50, name: '扇形4' }],
            zlevel: 2
          }
        ]
      }
      this.myChart.setOption(this.option, true)
      // 设置默认选中高亮部分
      this.myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
      // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
      this.myChart.on('click', (e) => {
        this.activeType = e.data.type
        if (e.dataIndex === 0 && this.index) { // 如果选中其他扇之后再选中第一个扇，则把其他扇去除高亮，第一个扇高亮
          this.changeStatus('downplay', this.index)
          this.changeStatus('highlight', 0)
        } else {
          if (this.index) { // 如果选中其他扇之后再选中非第一个扇，则把选中高亮切换为当前项
            this.changeStatus('downplay', this.index)
          }
          this.changeStatus('downplay', 0)
          this.changeStatus('highlight', e.dataIndex)
          this.index = e.dataIndex
        }
      })
    },
    changeStatus(type, index) {
      this.myChart.dispatchAction({ type: type, seriesIndex: 0, dataIndex: index })
    }
  }
}
</script>
<style scoped src='./MixPie.css'></style>
