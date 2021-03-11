<template>
  <div class="towerCraneMonitoring">
    <Adaptive :data="['100%','60.9%']">
      <div class="towerCraneMonitoring-header">
        <div class="towerCraneMonitoring-title">
          {{ data.equipName }}
        </div>
        <div class="towerCraneMonitoring-state">
          <div class="towerCraneMonitoring-state-box">
            <EquipStatus :electricity="data.equipPower" :signal="data.equipSignal" />
          </div>
          <!-- <div v-if="data.count!==0" class="towerCraneMonitoring-hidden-trouble">
            <van-badge :content="data.count" badge-size="14px">
              <img src="@/assets/images/equip/risk-early-warning.png" alt="" class="towerCraneMonitoring-hidden-trouble-icon">
            </van-badge>
          </div> -->
        </div>
      </div>
      <div class="towerCraneMonitoring-content">
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name">
            设备类型:
          </div>
          <div class="towerCraneMonitoring-content-row-value">
            {{ data.equipTypeName }}
          </div>
        </div>
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name">
            IMEI码:
          </div>
          <div class="towerCraneMonitoring-content-row-value">
            {{ data.imei }}
          </div>
        </div>
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name">
            安装位置:
          </div>
          <div class="towerCraneMonitoring-content-row-value">
            {{ data.equipAddress }}
          </div>
        </div>
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name">
            所属辖区:
          </div>
          <div class="towerCraneMonitoring-content-row-value">
            {{ data.departName }}
          </div>
        </div>
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name">
            所属网点:
          </div>
          <div class="towerCraneMonitoring-content-row-value address-font" @click="showDetail(data.placeId)">
            {{ data.placeName }}
            <img src="@/assets/images/equip/address.png" alt="" class="address-icon">
          </div>
        </div>
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name-real-time-data">
            实时数据
            <img src="@/assets/images/equip/refresh.png" alt="" class="refresh-img">

            <img v-show="!isShowMore" src="@/assets/images/equip/down.png" alt="" class="isShowIcon" @click="showMore">
            <img v-show="isShowMore" src="@/assets/images/equip/up.png" alt="" class="isShowIcon" @click="showMore">
          </div>
        </div>
      </div>
    </Adaptive>
    <div class="tEquipDetialCard-for-box">
      <EquipDetialCard v-for="item in filterData(equipDetialCardList) " :key="item.index" :layout="item" class="tEquipDetialCard-box" />
    </div>
  </div>

  <!-- <Adaptive :data="['37%','36%']" class="towerCraneMonitoring-content-img">
      <img src="@/assets/images/equip/camera-bg-img.png" alt="" class="camera-bg-img">
    </Adaptive> -->
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
      default: null
    }
  },
  data() {
    return {
      isShowMore: false,
      equipDetialCardList: [],
      equipStatus: {
        wifi: 'red',
        electricity: 'yellow',
        statusName: '正常'
      }
    }
  },
  computed: {

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
    filterData: function(e) {
      if (this.isShowMore) {
        return this.equipDetialCardList
      } else {
        return this.equipDetialCardList.slice(0, 3)
      }
    },
    showMore() {
      this.isShowMore = !this.isShowMore
    },
    setEquipDetailCardListData() {
      const detailData = this.data
      this.equipDetialCardList = [{
        width: '30.3%',
        name: '回旋角度',
        value: detailData.turningAngle ? detailData.turningAngle + '°' : '-',
        icon: require('/src/assets/images/equip/angle.png'),
        iconWidth: '11px',
        iconHeight: '10px'
      }, {
        width: '30.3%',
        name: '幅度',
        value: detailData.amplitude ? detailData.amplitude + 'mm' : '-',
        icon: require('/src/assets/images/equip/amplitude.png'),
        iconWidth: '13px',
        iconHeight: '13px'
      }, {
        width: '30.3%',

        name: '吊钩高度',
        value: detailData.hookHeight ? detailData.hookHeight + 'm' : '-',
        icon: require('/src/assets/images/equip/hook-angle.png'),
        iconWidth: '11px',
        iconHeight: '14px'

      }, {
        width: '30.3%',

        name: '吊重',
        value: detailData.currentHoisting ? detailData.currentHoisting + 't' : '-',
        icon: require('/src/assets/images/equip/hoisting.png'),
        iconWidth: '14px',
        iconHeight: '14px'
      }, {
        width: '30.3%',

        name: '安全吊重',
        value: detailData.safetyHoisting ? detailData.safetyHoisting + 't' : '-',
        icon: require('/src/assets/images/equip/safe.png'),
        iconWidth: '10px',
        iconHeight: '12px'
      }, {
        width: '30.3%',

        name: '力矩百分比',
        value: detailData.torquePrecentage ? detailData.torquePrecentage + '%' : '-',
        icon: require('/src/assets/images/equip/torque.png'),
        iconWidth: '12px',
        iconHeight: '12px'

      }, {
        width: '30.3%',

        name: '风速',
        value: detailData.windSpeed ? detailData.windSpeed + 'm/s' : '-',
        icon: require('/src/assets/images/equip/wind-speed.png'),
        iconWidth: '13px',
        iconHeight: '9px'

      }, {
        width: '30.3%',

        name: '塔机倾斜角度',
        value: detailData.tiltAngle ? detailData.tiltAngle + '°' : '-',
        icon: require('/src/assets/images/equip/angle.png'),
        iconWidth: '10px',
        iconHeight: '10px'
      }, {
        width: '30.3%',

        name: '塔机方向',
        value: detailData.towerDirection ? detailData.towerDirection + '°' : '-',
        icon: require('/src/assets/images/equip/direction-of-tower-crane.png'),
        iconWidth: '12px',
        iconHeight: '12px'
      }, {
        width: '30.3%',

        name: '吊绳倍率',
        value: detailData.wireRatio ? detailData.wireRatio : '-',
        icon: require('/src/assets/images/equip/wire-ratio.png'),
        iconWidth: '15px',
        iconHeight: '9px'

      }]
    }
  }
}
</script>

<style>
.towerCraneMonitoring{
  width: 100%;
  height: auto;
  /* padding: 0px 1% 2.5% 1%; */
  border: 1px solid #4D628F;
  background-color:#0A0B29;
}
/* .towerCraneMonitoring-card{
  background-color:#0A0B29;
} */
.towerCraneMonitoring-header{
    background: #131F3B;
   background-image: url('@/assets/images/equip/card-header.png');

  background-position: right top;
  background-repeat: no-repeat;
  background-size:100% 100%;
}
.towerCraneMonitoring-title{
  width: 35%;
  height: 12.5%;
  /* background: black; */
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 2% 5% 1% 3%;
  display: inline-block;
}
.towerCraneMonitoring-state{
  width: 55%;
  height: 6.5%;
  display: inline-block;
}
.towerCraneMonitoring-state-box{
  float: right;
}
.towerCraneMonitoring-hidden-trouble{
  width: 31%;
  height: 85%;
  display: inline-block;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFEAEE;
  padding: 0.5% 1% 1.5% 2%;
  border-radius: 5px;
  margin-left: 7%;
  float:right;

}
.towerCraneMonitoring-hidden-trouble-icon{
  width: 18px;
  height: 19px;
}
.towerCraneMonitoring-content{
  width: 100%;
  display: inline-block;
  background-image: url('@/assets/images/equip/towerCrane.png');
  background-position: right top;
  background-repeat: no-repeat;
  background-size:180px 120px;
}
.towerCraneMonitoring-content-img{
  width: 40%;
  position: relative;
}
.towerCraneMonitoring-content-row{
  height: 14.5%;
  width: 97%;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle;
  padding-left: 0%;

}
.towerCraneMonitoring-content-row-name{
  width: 18.5%;
  text-align: right;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
}
.towerCraneMonitoring-content-row-name-real-time-data{
   width: 100%;
  text-align: left;
  font-size: 12px;
  padding-left: 1%;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
  padding-left: 3.4%;
}
.towerCraneMonitoring-content-row-value{
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
.tEquipDetialCard-box{
  height: 63px;
  /* background-color: #FFFFFF; */
  margin-left: 1.4%;
  margin-right: 1.0%;
  margin-top: 3%;
}
.refresh-img{
  width: 13px;
  height: 13px;
  position: relative;
  top: 2px;
}
.isShowIcon{
width: 13px;
height: 7px;
float: right;
margin-top: 1.8%;
}

.tEquipDetialCard-for-box{
padding-bottom: 1.5%;

}
</style>
