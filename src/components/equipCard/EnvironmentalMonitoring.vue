<template>
  <div class="environmentalMonitoring">
    <!-- 标题 start -->
    <div class="environmentalMonitoring-header">
      <div class="environmentalMonitoring-title">
        {{ equipInfo.equipName }}
      </div>
      <div class="environmentalMonitoring-state">
        <div class="environmentalMonitoring-state-box">
          <EquipStatus :electricity="equipInfo.equipPower" :signal="equipInfo.equipSignal" :status="equipInfo.onlineType" />
        </div>
        <div v-if="equipInfo.count!==0 && equipInfo.count !== undefined" class="environmentalMonitoring-hidden-trouble" @click="showHazardDetail(equipInfo.equipId)">
          <van-badge :content="equipInfo.count" badge-size="14px" max="99">
            <img src="@/assets/images/equip/risk-early-warning.png" alt="" class="environmentalMonitoring-hidden-trouble-icon">
          </van-badge>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- 内容 start -->
    <div class="environmentalMonitoring-content">
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          设备类型:
        </div>
        <div class="environmentalMonitoring-content-row-value">
          {{ equipInfo.equipTypeName }}
        </div>
      </div>
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          IMEI码:
        </div>
        <div class="environmentalMonitoring-content-row-value">
          {{ equipInfo.imei }}
        </div>
      </div>
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          安装位置:
        </div>
        <div class="environmentalMonitoring-content-row-value">
          {{ equipInfo.equipAddress }}
        </div>
      </div>
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          所属辖区:
        </div>
        <div class="environmentalMonitoring-content-row-value">
          {{ equipInfo.departName }}
        </div>
      </div>
      <div class="environmentalMonitoring-content-row">
        <div class="environmentalMonitoring-content-row-name">
          所属网点:
        </div>
        <div class="environmentalMonitoring-content-row-value address-font" @click.stop="showDetail(equipInfo.placeId)">
          {{ equipInfo.placeName }}
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
        <EquipDetialCard v-for="item in equipDetailCardList" :key="item.index" class="equipDetailCard-box" :layout="item" :content="equipInfo" />
      </div>
    </div>
    <!-- end -->

    <!-- <Adaptive :size="['37%','36%']" class="environmentalMonitoring-content-img">
      <img src="@/assets/images/equip/camera-bg-img.png" alt="" class="camera-bg-img">
    </Adaptive> -->
  </div>
</template>

<script>
import EquipDetialCard from 'cmp/equipDetialCard/EquipDetialCard'
import EquipStatus from 'cmp/equipStatus/EquipStatus'

export default {
  components: {
    EquipStatus,
    EquipDetialCard
  },
  props: {
    equipInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      equipDetailCardList: [],
      equipStatus: {
        wifi: 'red',
        electricity: 'yellow',
        statusName: '正常'
      }

    }
  },
  watch: {
    equipInfo(val, oldVal) {
      this.setEquipDetailCardListData()
    }
  },
  created() {
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
    showDetail(e) {
      this.$router.push({
        path: '/placeResourceDetail',
        query: {
          placeId: e
        }
      })
    },
    setEquipDetailCardListData() {
      const detailData = this.equipInfo
      this.equipDetailCardList = [{
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

<style src='./EnvironmentalMonitoring.css'>

</style>
