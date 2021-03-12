<template>
  <div class="environmentalMonitoring">
    <div class="environmentalMonitoring-header">
      <div class="environmentalMonitoring-title">
        {{ data.equipName }}
      </div>
      <div class="environmentalMonitoring-state">
        <div class="environmentalMonitoring-state-box">
          <EquipStatus :electricity="data.equipPower" :signal="data.equipSignal" :status="data.onlineType" />
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

<style src='./EnvironmentalMonitoring.css'>

</style>
