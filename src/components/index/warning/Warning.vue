<!-- 设备卡片 -->
<template>
  <div class="warin">
    <div class="hidden-trouble-detail">
      <div class="out-rect">
        <div v-if="ulList.length>0" class="in-rect">
          <img class="equip-img" :src="currentSystemtypeImage" alt="">
          <ul class="list">
            <li
              v-for="(rowItem, index) in ulList"
              :key="index"
              :class="!index && play ? 'toUp' : ''"
              @click="showDetail(rowItem)"
            >
              <div class="colItem title width-20">
                {{ rowItem.systemName }}
              </div>
              <div class="colItem content width-30">
                {{ rowItem.onlineMsg }}
              </div>
              <div class="colItem content width-30">
                {{ rowItem.placeName }}
              </div>
              <!-- <div class="colItem content" style="color:red;">
                未处理
              </div> -->
              <div class="colItem content width-15">
                <!-- 22.22 -->
                {{ changeDate(rowItem.createTime) }}
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="no-data">
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Socket from '../../../utils/socket'
import Data from '@/utils/data.js'
export default {
  components: {

  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      ulList: [

      ],
      play: false,
      // 接收定时器
      timer: null,
      currentSystemtypeImage: ''

    }
  },
  computed: {
    changeDate: function() {
      return function(val) {
        return this.dateFormat(val)
      }
    }
  },
  created() {
    this.ulList = this.data

    if (this.ulList !== null) {
      if (this.ulList.length > 1) {
        this.currentSystemtypeImage = this.ulList[0].imgUrl
        setInterval(this.startPlay, 3000)
      } else {
        this.currentSystemtypeImage = this.ulList[0].imgUrl
      }
    }
    // Socket.initSocket('equipCount')
  },
  destroyed() { // 页面销毁时清除定时器
    clearInterval(this.timer)
  },
  methods: {
    showDetail(e) {
      this.$router.push({
        path: '/hazardDetail',
        query: {
          hazardId: e.id
        }
      })
    },
    startPlay() {
      const that = this
      that.play = true // 开始播放

      that.timer = setTimeout(() => { // 创建并执行定时器
        that.play = false // 暂停播放
        that.ulList.push(that.ulList[0]) // 将第一条数据塞到最后一个
        that.ulList.shift() // 删除第一条数据

        this.currentSystemtypeImage = this.ulList[0].imgUrl
      }, 500)
    },
    /**
     * 时间格式转换
     */
    dateFormat(date) {
      return Data.dateDifference(date)
    }
  }

}
</script>

<style  scoped  src="./Warning.css">

</style>
