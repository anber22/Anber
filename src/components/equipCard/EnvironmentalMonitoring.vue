<template>
  <div class="environmentalMonitoring">
    <div class="environmentalMonitoring-header">
      <div class="environmentalMonitoring-title">
        {{ data.equipName }}
      </div>
      <div class="environmentalMonitoring-state">
        <div class="environmentalMonitoring-hidden-trouble">
          两个隐患
          <van-icon name="arrow" color="#ffff" class="environmentalMonitoring-hidden-trouble-icon" />
        </div>
        <div class="environmentalMonitoring-state-box">
          <EquipStatus :data="equipStatus" />
        </div>
      </div>
    </div>
    <div class="environmentalMonitoring-content">
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          设备类型:
        </div>
        <div class="environmentalMonitoring-content-row-value">
          {{ data.equipType }}
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
        <div class="environmentalMonitoring-content-row-value address-font">
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
      <img src="/src/assets/images/equip/camera-bg-img.png" alt="" class="camera-bg-img">
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
      equipDetialCardList: [

        {
          typed: 'rainFall',
          width: '24.55%',
          name: '雨量',
          value: '130mm',
          icon: '/src/assets/images/equip/rainfall.png',
          iconWidth: '13px',
          iconHeight: '10px'
        }, {
          typed: 'windSpeed',

          width: '42%',
          name: '风速/风向',
          value: '2.10m/s/东南25.5°',
          icon: '/src/assets/images/equip/wind-speed.png',
          iconWidth: '16px',
          iconHeight: '10px'
        }, {
          typed: 'temperature',
          width: '24.55%',
          name: '温度/湿度',
          value: '25.5°/29.5°',
          icon: '/src/assets/images/equip/temperature.png',
          iconWidth: '8px',
          iconHeight: '16px'
        }],
      equipStatus: {
        wifi: 'red',
        electricity: 'yellow',
        statusName: '正常'
      }

    }
  }, beforeMount() {
    console.log('卡卡卡卡卡片111', this.data)
  }, mounted() {
    console.log('卡卡卡卡卡片', this.data)
  },

  methods: {

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
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 2% 5% 2% 3%;
  display: inline-block;
}
.environmentalMonitoring-state{
  width: 55%;
  height: 56.5%;
  display: inline-block;
}
.environmentalMonitoring-state-box{
  float: right;
}
.environmentalMonitoring-hidden-trouble{
  width: 32%;
  height: 68%;
  background-color: red;
  display: inline-block;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFEAEE;
  padding: 0.5% 1% 2.5% 2%;
  margin-left: 8%;
  border-radius: 5px;
}
.environmentalMonitoring-hidden-trouble-icon{
  position: absolute;
  top: 4.5%;
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
</style>
