<template>
  <div class="towerCraneMonitoring">
    <Adaptive :data="['100%','60.9%']">
      <div class="towerCraneMonitoring-header">
        <div class="towerCraneMonitoring-title">
          {{ data.equipName }}
        </div>
        <div class="towerCraneMonitoring-state">
          <div class="towerCraneMonitoring-state-box">
            <EquipStatus :electricity="data.equipPower" :signal="data.equipSignal" :status="data.onlineType" />
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

<style src='./TowerCraneMonitoring.css'>

</style>
