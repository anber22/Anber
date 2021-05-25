<template>
  <!-- 隐患列表卡片 start -->
  <div class="hazardListCard">
    <!-- 隐患列表卡片 头部标题 start -->
    <div class="hazardListCard-header">
      <div v-if="hazarData.isDone===1" class="hazardListCard-status-deal">
        已处理
      </div>
      <div v-else class="hazardListCard-status">
        未处理
      </div>
      <div class="hazardListCard-analysis-name">
        {{ hazarData.hazardTypeName }}
      </div>

      <div class="hazardListCard-equip-count">
        <div :class="hazarData.hazardCategory===2?'hazardListCard-event-type-orange':'hazardListCard-event-type-red'">
          {{ hazarData.hazardCategory===2?"故障":"事件" }}
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- 隐患列表内容 start -->
    <div class="hazardListCard-content">
      <div class="hazardListCard-content-row">
        <div class="hazardListCard-content-row-name">
          {{ hazarData.equipTypeName+"-"+hazarData.placeName+"-"+hazarData.equipAddress }}
          <!-- 安全帽监测-港湾一号-湾9栋401大门口 -->
        </div>
        <a class="hazardListCard-content-row-a" @click.stop="callPhone(hazarData.placePhone)">
          <img src="@/assets/images/equip/phone.png" alt="" class="hazardListCard-content-row-icon">
        </a>
        <a class="hazardListCard-content-row-a" @click.stop="toMap(hazarData.placeId)">
          <img src="@/assets/images/equip/navigation.png" alt="" class="hazardListCard-content-row-icon">
        </a>
      </div>
      <div class="hazardListCard-content-row">
        <div class="hazardListCard-content-row-name">
          <!-- {{ hazarData.placeName }} -->
          {{ hazarData.imei }}
        </div>
      </div>
      <div class="hazardListCard-content-row">
        <div class="hazardListCard-content-row-name">
          <!-- {{ hazarData.placeName }} -->
          {{ changeDate(hazarData.createdTime) }}
        </div>
      </div>
    </div>
    <!-- end -->
  </div>
  <!-- end -->
</template>

<script>
import DateFormat from '@/utils/dateTransformation'
export default {
  components: {
    // EquipStatus
  },
  props: {
    hazarData: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      equipStatus: {
        wifi: 80,
        electricity: 80,
        statusName: '正常'
      }
    }
  },
  computed: {
    changeDate: function() {
      return function(val) {
        return this.timeTransformation(val)
      }
    }
  },
  methods: {
    /**
     * 跳转地图
     */
    toMap() {

    },
    /**
     * 跳转拨号
     */
    async  callPhone(e) {
      if (e && typeof e !== undefined) {
        window.location.href = 'tel://' + e
      } else {
        this.$toast.fail('当前网点暂无负责人联系电话')
      }
    },
    /**
     * 时间格式化
     */
    timeTransformation(e) {
      var date = new DateFormat()
      return date.dataFormat(e)
    }
  }
}
</script>

<style src='./HazardListCard.css'>

</style>
