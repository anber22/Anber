<template>
  <div class="towerCraneMonitoring">
    <Adaptive :equip-info="['100%','60.9%']">
      <!-- 标题 start -->
      <div class="towerCraneMonitoring-header">
        <div class="towerCraneMonitoring-title">
          {{ equipInfo.equipName }}
        </div>
        <div class="towerCraneMonitoring-state">
          <div class="towerCraneMonitoring-state-box">
            <EquipStatus :electricity="equipInfo.equipPower" :signal="equipInfo.equipSignal" :status="equipInfo.onlineType" />
          </div>
          <!-- <div v-if="data.count!==0" class="towerCraneMonitoring-hidden-trouble">
            <van-badge :content="data.count" badge-size="14px">
              <img src="@/assets/images/equip/risk-early-warning.png" alt="" class="towerCraneMonitoring-hidden-trouble-icon">
            </van-badge>
          </div> -->
        </div>
      </div>
      <!-- end -->
      <!-- 内容 start -->
      <div class="towerCraneMonitoring-content">
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name">
            设备类型:
          </div>
          <div class="towerCraneMonitoring-content-row-value">
            {{ equipInfo.equipTypeName }}
          </div>
        </div>
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name">
            IMEI码:
          </div>
          <div class="towerCraneMonitoring-content-row-value">
            {{ equipInfo.imei }}
          </div>
        </div>
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name">
            安装位置:
          </div>
          <div class="towerCraneMonitoring-content-row-value">
            {{ equipInfo.equipAddress }}
          </div>
        </div>
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name">
            所属辖区:
          </div>
          <div class="towerCraneMonitoring-content-row-value">
            {{ equipInfo.departName }}
          </div>
        </div>
        <div class="towerCraneMonitoring-content-row">
          <div class="towerCraneMonitoring-content-row-name">
            所属网点:
          </div>
          <div class="towerCraneMonitoring-content-row-value address-font" @click="showPlaceDetail(equipInfo.placeId)">
            {{ equipInfo.placeName }}
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
      <!-- end -->
    </Adaptive>
    <!-- 详细数据 start -->
    <div v-if="equipInfo!==null" class="tEquipDetailCard-for-box">
      <EquipDetialCard v-for="item in format(equipDetailCardList) " :key="item.index" :layout="item" class="tEquipDetailCard-box" />
    </div>
    <!-- end -->
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
    equipInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isShowMore: false,
      equipDetailCardList: [],
      equipStatus: {
        wifi: 'red',
        electricity: 'yellow',
        statusName: '正常'
      }
    }
  },
  computed: {
    format() {
      return function(val) {
        return this.filterData(val)
      }
    }
  },
  watch: {
    equipInfo(val, oldVal) {
      this.setEquipDetailCardListData()
    }
  },
  mounted() {
    this.setEquipDetailCardListData()
  },
  methods: {
    /**
     * 跳转详情
     */
    showHazardDetail(e) {
      this.$router.push({
        path: '/hazard',
        query: {
          equipId: e
        }
      })
    },
    /**
    * 跳转网点详情
    */
    showPlaceDetail(e) {
      this.$router.push({
        path: '/placeResourceDetail',
        query: {
          placeId: e
        }
      })
    },
    /**
     * 格式化日期
     */
    filterData: function(e) {
      if (this.isShowMore) {
        return this.equipDetailCardList
      } else {
        return this.equipDetailCardList.slice(0, 3)
      }
    },
    /**
     * 点开收起或者展开
     */
    showMore() {
      this.isShowMore = !this.isShowMore
    },
    /**
     * 设置卡片详情信息卡片的样式和值
     */
    setEquipDetailCardListData() {
      const detailData = this.equipInfo
      this.equipDetailCardList = [{
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
