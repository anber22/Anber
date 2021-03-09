<template>
  <div class="hazardListCard">
    <div class="hazardListCard-header">
      <div v-if="data.isDone===1" class="hazardListCard-status-deal">
        已处理
      </div>
      <div v-else class="hazardListCard-status">
        未处理
      </div>
      <div class="hazardListCard-analysis-name">
        {{ data.hazardTypeName }}
      </div>

      <div class="hazardListCard-equip-count">
        <div :class="data.hazardCategory===2?'hazardListCard-event-type-orange':'hazardListCard-event-type-red'">
          {{ data.hazardCategory===2?"故障":"事件" }}
        </div>
      </div>
    </div>
    <div class="hazardListCard-content">
      <div class="hazardListCard-content-row">
        <div class="hazardListCard-content-row-name">
          {{ data.equipTypeName+"-"+data.placeName+"-"+data.equipAddress }}
          <!-- 安全帽监测-港湾一号-湾9栋401大门口 -->
        </div><img src="@/assets/images/equip/phone.png" alt="" class="hazardListCard-content-row-icon">
        <img src="@/assets/images/equip/navigation.png" alt="" class="hazardListCard-content-row-icon">
      </div>
      <div class="hazardListCard-content-row">
        <div class="hazardListCard-content-row-name">
          <!-- {{ data.placeName }} -->
          {{ data.imei }}
        </div>
      </div>
      <div class="hazardListCard-content-row">
        <div class="hazardListCard-content-row-name">
          <!-- {{ data.placeName }} -->
          {{ timeTransformation(data.createdTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dealData from '@/utils/data'

export default {
  components: {
    // EquipStatus
  },
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
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
  methods: {
    timeTransformation(e) {
      console.log('date', e)
      return dealData.dataFormat(e)
    }
  }
}
</script>

<style>
.hazardListCard{
  width: 100%;
  height: 100%;
  border: 1px solid #4D628F;
  background-color:#0A0B29;
}
.hazardListCard-header{
  background: #131F3B;
}
.hazardListCard-status-deal{
  width: 16%;
  height: 11%;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 0% 1% 1% 3%;
  border-left: 3px solid #29CF7B;
  margin-top: 2%;
  line-height: 130%;
  margin-left: 3%;
  color: #29CF7B;
  display: inline-block;
  float: left;
}
.hazardListCard-status{
  width: 16%;
  height: 11%;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 0% 1% 1% 3%;
  border-left: 3px solid red;
  margin-top: 2%;
  line-height: 130%;
  margin-left: 3%;
  color: red;
  display: inline-block;
  float: left;
}
.hazardListCard-analysis-name{
   width: 54%;
  height: 25%;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 0.5% 5% 1% 3%;
  margin-top: 1%;
  display: inline-block;
  float: left;
}
.hazardListCard-content{
  width: 100%;
  height: 55%;
  margin-top: 2.7%;
}
.hazardListCard-equip-count{
  width: 8%;
  height: 13%;
  font-size: 12px;
  display: inline-block;
  font-family: PingFang SC;
  font-weight: 400;
  vertical-align: middle;
  color: #B9CEE9;
  padding: 1.5% 1% 3% 3%;
  text-align: right;
  padding-right: 3%;
}
.hazardListCard-equip-count-num{
  width: auto;
  height: 100%;
  display: inline-block;

  color: #06F0FE;
}
.hazardListCard-content-row{
  height: 38%;
  width: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle
}
.hazardListCard-content-row-name{
  width: 74%;
  text-align: left;
  padding-left: 3%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}

.hazardListCard-event-type-orange{
  width: auto;
  background: #1B2B29;
  border: 1px solid #FF9F17;
  border-radius: 2px;
  color: #FF9F17;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  padding: 3.5% 10% 6.5% 11%;
  margin-left: 2%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}
.hazardListCard-event-type-red{
  width: auto;
  background: #1B2B29;
  border: 1px solid #FF1743;
  border-radius: 2px;
  color: #FF1743;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  padding: 3.5% 10% 6.5% 11%;
  margin-left: 2%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}

.hazardListCard-content-row-icon{
  width: 19px;
  height: 19px;
  margin-left: 5%;
}
</style>
