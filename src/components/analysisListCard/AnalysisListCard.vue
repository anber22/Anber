<template>
  <div class="analysisListCard">
    <div class="analysisListCard-header">
      <div v-if="data.isDone===1" class="analysisListCard-status-deal">
        已处理
      </div>
      <div v-else class="analysisListCard-status">
        未处理
      </div>
      <div class="analysisListCard-analysis-name">
        {{ data.onlineMsg }}
      </div>

      <div class="analysisListCard-equip-count">
        <div class="analysisListCard-event-type">
          {{ data.onlineType===0?"故障":"事件" }}
        </div>
      </div>
    </div>
    <div class="analysisListCard-content">
      <div class="analysisListCard-content-row">
        <div class="analysisListCard-content-row-name">
          {{ data.typeName+"-"+data.placeName+"-"+data.equipAddress }}
          <!-- 安全帽监测-港湾一号-湾9栋401大门口 -->
        </div><img src="@/assets/images/equip/phone.png" alt="" class="analysisListCard-content-row-icon">
        <img src="@/assets/images/equip/navigation.png" alt="" class="analysisListCard-content-row-icon">
      </div>
      <div class="analysisListCard-content-row">
        <div class="analysisListCard-content-row-name">
          <!-- {{ data.placeName }} -->
          {{ data.imei }}
        </div>
      </div>
      <div class="analysisListCard-content-row">
        <div class="analysisListCard-content-row-name">
          <!-- {{ data.placeName }} -->
          {{ timeTransformation(data.createTime) }}
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
      return dealData.dataFormatStamp(e)
    }
  }
}
</script>

<style>
.analysisListCard{
  width: 100%;
  height: 100%;
  border: 1px solid #4D628F;
  background-color:#0A0B29;
}
.analysisListCard-header{
  background: #131F3B;
}
.analysisListCard-status-deal{
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
.analysisListCard-status{
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
.analysisListCard-analysis-name{
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
.analysisListCard-content{
  width: 100%;
  height: 55%;
  margin-top: 2.7%;
}
.analysisListCard-equip-count{
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
.analysisListCard-equip-count-num{
  width: auto;
  height: 100%;
  display: inline-block;

  color: #06F0FE;
}
.analysisListCard-content-row{
  height: 38%;
  width: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle
}
.analysisListCard-content-row-name{
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

.analysisListCard-event-type{
  width: auto;
  background: #1B2B29;
  border: 1px solid #54A4E7;
  border-radius: 2px;
  color: #55A4E7;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #55A4E7;
  padding: 3.5% 10% 6.5% 11%;
  margin-left: 2%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}

.analysisListCard-content-row-icon{
  width: 19px;
  height: 19px;
  margin-left: 5%;
}
</style>
