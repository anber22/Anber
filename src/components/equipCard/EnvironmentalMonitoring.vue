<template>
  <div class="environmentalMonitoring">
    <div class="environmentalMonitoring-header">
      <div class="environmentalMonitoring-title">
        {{ data.equipName }}
      </div>
      <div class="environmentalMonitoring-state">
        <div class="environmentalMonitoring-state-box">
          <EquipStatus :electricity="data.equipPower" :signal="data.equipSignal" />
        </div>
        <div v-if="data.count!==0" class="environmentalMonitoring-hidden-trouble">
          <van-badge :content="data.count" badge-size="14px">
            <img src="@/assets/images/equip/risk-early-warning.png" alt="" class="environmentalMonitoring-hidden-trouble-icon">
          </van-badge>
        </div>
      </div>
    </div>
    <div class="environmentalMonitoring-content">
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          设备类型:
        </div>
        <div class="environmentalMonitoring-content-row-value">
          {{ data.equipTypeName }}
        </div>
      </div>
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          IMEI码:
        </div>
        <div class="environmentalMonitoring-content-row-value">
          {{ data.imei }}
        </div>
      </div>
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          安装位置:
        </div>
        <div class="environmentalMonitoring-content-row-value">
          {{ data.equipAddress }}
        </div>
      </div>
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          所属辖区:
        </div>
        <div class="environmentalMonitoring-content-row-value">
          {{ data.departName }}
        </div>
      </div>
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          所属网点:
        </div>
        <div class="environmentalMonitoring-content-row-value address-font" @click="showDetail(data.placeId)">
          {{ data.placeName }}
          <img src="@/assets/images/equip/address.png" alt="" class="address-icon">
        </div>
      </div>
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name-real-time-data">
          实时数据
          <img src="@/assets/images/equip/refresh.png" alt="" class="refresh-img">
        </div>
      </div>
      <div>
        <EquipDetialCard v-for="item in equipDetialCardList" :key="item.index" class="equipDetialCard-box" :layout="item" :content="data" />
      </div>
    </div>

    <!-- <Adaptive :data="['37%','36%']" class="environmentalMonitoring-content-img">
      <img src="@/assets/images/equip/camera-bg-img.png" alt="" class="camera-bg-img">
    </Adaptive> -->
  </div>
</template>

<script>
import EquipStatus from 'cmp/equipStatus/EquipStatus'
import EquipDetialCard from 'cmp/equipDetialCard/EquipDetialCard'
export default {
  components: {
    EquipStatus,
    EquipDetialCard
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
      equipDetialCardList: [],
      equipStatus: {
        wifi: 'red',
        electricity: 'yellow',
        statusName: '正常'
      }

    }
  }, beforeMount() {
  },
  mounted() {
    this.setEquipDetailCardListData()
  },

  methods: {
    showDetail(e) {
      console.log('网点id', e)
      this.$router.push({
        path: '/placeResourcDetail',
        query: {
          placeId: e
        }
      })
    },
    setEquipDetailCardListData() {
      const detailData = this.data
      this.equipDetialCardList = [{
        typed: 'rainFall',
        width: '24.55%',
        name: '雨量',
        value: detailData.rainFall ? detailData.rainFall + 'mm' : '-',
        icon: require('/src/assets/images/equip/rainfall.png'),
        iconWidth: '13px',
        iconHeight: '10px'
      }, {
        typed: 'windSpeed',

        width: '42%',
        name: '风速/风向',
        value: (detailData.windSpeed ? detailData.windSpeed + 'm/s/' : '-/') + (detailData.windDirection ? detailData.windDirection + '°' : '-'),
        icon: require('/src/assets/images/equip/wind-speed.png'),
        iconWidth: '16px',
        iconHeight: '10px'
      }, {
        typed: 'temperature',
        width: '24.55%',
        name: '温度/湿度',
        value: (detailData.temperature ? detailData.temperature + '°/' : '-/') + (detailData.humidity ? detailData.humidity + '%RH' : '-'),
        icon: require('/src/assets/images/equip/temperature.png'),
        iconWidth: '8px',
        iconHeight: '16px'
      }]
    }
  }
}
</script>

<style>
.environmentalMonitoring{
  width: 100%;
  height: 100%;
  /* padding: 0px 1% 0px 1%; */
  border: 0.5px solid #4D628F;
  background-color:#0A0B29;
}
/* .environmentalMonitoring-card{
  background-color:#0A0B29;
} */
.environmentalMonitoring-header{
  width: 100%;
  height: 13.5%;
  background: #131F3B;

  background-image: url('@/assets/images/equip/card-header.png');
  background-position: right top;
  background-repeat: no-repeat;
  background-size:100% 100%;
}
.environmentalMonitoring-title{
  width: 35%;
  height: 7.5%;
  /* background: black; */
  font-size: 15px;
  white-space: nowrap;
overflow-x:scroll;
overflow-y: hidden;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 2% 5% 2% 3%;
  display: inline-block;
}
::-webkit-scrollbar{
  display: none;
}
.environmentalMonitoring-state{
  width: 55%;
  height: 36.5%;
  display: inline-block;
}
.environmentalMonitoring-state-box{
  float: right;
}
.environmentalMonitoring-hidden-trouble{
  width: 15%;
  height: 68%;
  display: inline-block;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFEAEE;
  padding: 0.5% 1% 2.5% 2%;
  margin-left: 8%;
  border-radius: 5px;
  float: right;

}
.environmentalMonitoring-hidden-trouble-icon{
    width: 18px;
  height: 19px;
}
.environmentalMonitoring-content{
  width: 100%;
  display: inline-block;
  background-image: url('@/assets/images/equip/environmental-monitoring.png');
  background-position: right top;
  background-repeat: no-repeat;
  background-size:180px 120px;
}
.environmentalMonitoring-content-img{
  width: 40%;
  position: relative;
}
.environmentalMonitoring-content-row{
  height: 9.7%;
  width: 97%;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle;
  padding-left: 0%;

}
.environmentalMonitoring-content-row-name{
  width: 18.5%;
  text-align: right;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
}
.environmentalMonitoring-content-row-name-real-time-data{
   width: 90%;
  text-align: left;
  font-size: 12px;
  padding-left: 1%;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
  padding-left: 3.4%;
}
.environmentalMonitoring-content-row-value{
  width: 62%;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  padding-left: 5%;
  color: #B9CEE9;
}
.address-font{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  text-decoration: underline;
  color: #06F0FE;
  position: relative;
  top: -4px;
}
.address-icon{
  width: 11px;
  height: 16px;
  position: relative;
  top: 3px;
  left: 10px;
}
.camera-bg-img{
  width: 100%;
  height: 100%;
  z-index: -1;
}
.equipDetialCard-box{
  height: 23%;
  /* background-color: #FFFFFF; */
  margin-left: 1.2%;
  margin-right: 1.1%;
  margin-top: 2%
}
.refresh-img{
width: 13px;
height: 13px;
position: relative;
top: 2px;
}
.van-badge--fixed{
top: 4px
}
</style>
