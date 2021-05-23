<!-- 设备卡片 -->
<template>
  <div class="warin">
    <div class="hidden-trouble-detail">
      <div class="out-rect">
        <div v-if="ulList.length>0" class="in-rect">
          <img class="equip-img" :src="require(`@/assets/images/index/${currentSystemtypeImage}`) " alt="">
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
                {{ rowItem.hazardTypeName }}
              </div>
              <div class="colItem content width-27">
                {{ rowItem.placeName }}
              </div>

              <div class="colItem content width-18">
                {{ changeDate(rowItem.createdTime) }}
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
import DateTransformation from '@/utils/dateTransformation.js'
export default {
  name: 'Warning',
  components: {

  },
  props: {
    warningData: {
      type: Array,
      default: () => []
    },
    system: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ulList: [

      ],
      play: false,
      // 接收定时器
      timer: null,
      currentSystemtypeImage: '',
      systemList: []
    }
  },
    watch:{
    warningData(val){
    this.ulList=val
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
    this.ulList = this.warningData
    this.systemList = this.system
    if (this.ulList !== null && this.ulList.length > 0) {
      this.currentSystemtypeImage = this.ulList[0].imgUrl
      if (this.ulList.length > 1) {
        this.timer = setInterval(this.startPlay, 3000)
      }
    }
  },
  destroyed() { // 页面销毁时清除定时器
    clearInterval(this.timer)
  },
  methods: {
    onMessage(msg) {
      clearInterval(this.timer)
      this.systemList.forEach(cItem => {
        if (msg.type === cItem.id) {
          msg['imgUrl'] = cItem.imgUrl
          msg['systemName'] = cItem.name
        }
      })
      this.ulList.splice(0, 0, msg)

      this.currentSystemtypeImage = this.ulList[0].imgUrl
      if (this.ulList.length > 1) {
        this.timer = setInterval(this.startPlay, 3000)
      }
    },
    /**
     * 显示详情
     */
    showDetail(e) {
      this.$router.push({
        path: '/hazardDetail',
        query: {
          hazardId: e.id
        }
      })
    },

    /**
     * 开始轮播
     */
    startPlay() {
      const that = this
      that.play = true // 开始播放

      setTimeout(() => { // 创建并执行定时器
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
      const dateFormat = new DateTransformation()
      return dateFormat.dateDifference(date)
    }
  }
}
</script>

<style  scoped  src="./Warning.css">

</style>
