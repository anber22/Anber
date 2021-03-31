<template>
  <div class="realtimeEventCard-box">
    <div v-for="(item,index) in hazardList" :key="index" class="events-item">
      <Adaptive :data="['100%','20.27%']">
        <div class="events-item-content">
          <van-image
            width="20.27%"
            height="100%%"
            fit="cover"
            class="events-item-img"
            :src="index%2===0?'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1423490917,2942550944&fm=26&gp=0.jpg': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2559982960,2879475880&fm=26&gp=0.jpg'"
            :show-error="false"

            :show-loading="false"
          />
          <div class="right-text">
            <p class="title1">
              {{ item.equipAddress }}
            </p>
            <span class="title2">{{ item.onlineMsg }}</span>
            <p class="title3">
              {{ changeDate(item.createdTime) }}
            </p>
          </div>
          <div class="dot">
            <span />
          </div>
        </div>
      </Adaptive>
    </div>
  </div>
</template>

<script>
import DateTransformation from '@/utils/dateTransformation.js'

export default {
  components: {

  },
  props: {
    hazardData: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data() {
    return {
      hazardList: []
    }
  },
  computed: {
    changeDate: function() {
      return function(val) {
        return this.dateFormat(val)
      }
    }
  },
  watch: {
    hazardData: function(newVal) {
      console.log('组件监测', newVal)
      this.hazardList = newVal
    }
  },
  // watch: {
  //   data: {
  //     handler(data) {
  //       console.log('组件内的值改变了吗', data)
  //       this.hazardList = data
  //     },
  //     deep: true // 划重点
  //   }
  // },
  mounted() {
    // console.log('组件内输出', this.data)
  },
  methods: {
    /**
     * 时间格式转换
     */
    dateFormat(date) {
      var dateFormat = new DateTransformation()
      return dateFormat.dataFormatStamp(date / 1000)
    }
  }
}
</script>
<style scoped src='./RealtimeEventCard.css'></style>
