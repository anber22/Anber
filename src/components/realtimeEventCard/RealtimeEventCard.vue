<template>
  <div class="realtimeEventCard-box">
    <div v-for="(item,index) in hazardList" :key="index" class="events-item">
      <Adaptive :size="['100%','20.27%']">
        <div class="events-item-content" @click="goJump(item.id)">
          <van-image
            width="20.27%"
            height="100%"
            fit="cover"
            class="events-item-img"
            :src="item.pictureUrl?item.pictureUrl: require('@/assets/images/equip/warn.png')"
            :show-error="false"

            :show-loading="false"
          />
          <div class="right-text">
            <p class="title1">
              {{ item.equipAddress }}
            </p>
            <span class="title2">{{ item.hazardTypeName }}</span>
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
import Api from '@/api/hazard/hazard'

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
      this.hazardList = newVal
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 跳转页面
     */
    goJump(id) {
      this.deleteHazardIsRead(id)
      this.$router.push({
        path: '/hazardDetail',
        query: {
          hazardId: id
        }
      })
    },
    /**
     * 未读隐患清除
     */
    async deleteHazardIsRead(id) {
      const params = {
        id: id
      }
      const res = await Api.hazardIsRead(params)
      if (res.code === 200) {
        return
      }
    },
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
