<template>
  <div class="maxPie-box">
    <div :id="data.chartId" class="maxPie-content" />
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
// import echarts from 'echarts'
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
      count: null
    }
  },
  watch: {
    activeType(index) {
      const activeData = this.data.data.filter(item => {
        return item.type === index
      })
      this.departName = activeData[0].name
      this.count = activeData[0].count
      this.$emit('activeType', index)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.departName = this.data.data[0].name
      this.count = this.data.data[0].count
      var myChart = this.$echarts.init(document.getElementById(this.data.chartId))
      var option = {
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        avoidLabelOverlap: true,
        selectedOffset: 0,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['70%', '82%'],
            avoidLabelOverlap: false,
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
            // 标示文字引导线设置
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '搜索引擎' }],
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
            // 图形的样式设置，
            itemStyle: {
              color: function(params) {
                var colorList = [
                  {
                    c1: 'rgba(71, 167, 234, 0)', // 管理
                    c2: 'rgba(71, 167, 234, 0.2)'
                  },
                  {
                    c1: 'rgba(255,255,255,0)', // 实践
                    c2: 'rgba(255,255,255,0)'
                  },
                  {
                    c1: 'rgba(255,255,255,0)', // 操作
                    c2: 'rgba(255,255,255,0)'
                  },
                  {
                    c1: 'rgba(255,255,255,0)', // 操作
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
              { value: 50, name: '搜索引擎' },
              { value: 50, name: '搜索引擎' },
              { value: 50, name: '搜索引擎' },
              { value: 50, name: '搜索引擎' }],
            zlevel: 2
          }
        ]
      }
      myChart.setOption(option, true)
      // 设置默认选中高亮部分
      myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
      // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
      myChart.on('click', (e) => {
        this.activeType = e.data.type
        if (e.dataIndex === 0) {
          if (this.index) {
            myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: this.index })
          }
          myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
        } else {
          if (this.index) {
            myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: this.index })
          }
          myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: 0 })
          myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: e.dataIndex })
          this.index = e.dataIndex
        }
      })
    }
  }
}
</script>

<style scoped>
.maxPie-content{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.active-text{
  position: absolute;
  width: 30%;
  height: 30%;
  text-align: center;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  display: flex;
}
.depart-name{
  color: rgba(239, 240, 241, 1);
  font-size: 12px;
  line-height: 2
}
.depart-count{
  color: rgba(70, 255, 235, 1);
  font-size: 12px;
  ;line-height: 2
}
</style>
