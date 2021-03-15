<template>
  <div class="PlaceDetailCard">
    <div class="PlaceDetailCard-header">
      <div class="PlaceDetailCard-title">
        {{ data.equipName }}
      </div>
      <div class="PlaceDetailCard-state">
        <!-- <div class="PlaceDetailCard-hidden-trouble">
          两个隐患1
          <van-icon name="arrow" color="#ffff" class="PlaceDetailCard-hidden-trouble-icon" />
        </div> -->
        <div class="PlaceDetailCard-state-box">
          <EquipStatus :data="equipStatus" />
        </div>
      </div>
    </div>
    <div class="PlaceDetailCard-content">
      <div class="PlaceDetail-top-text">
        <span class="PlaceDetail-model PlaceDetail-ellipsis">{{ data.equipTypeName }}</span>
        <span class="PlaceDetail-imei-code PlaceDetail-ellipsis">{{ data.imei }}</span>
      </div>
      <div class="PlaceDetail-bottom-text">
        <van-image
          width="11px"
          height="15px"
          fit="cover"
          style="vertical-align: text-top;"
          :src="require('/src/assets/images/equip/address.png')"
          :show-error="false"
          :show-loading="false"
        />
        {{ data.equipAddress }}
      </div>
      <div class="PlaceDetail-unbundling">
        -
      </div>
    </div>
  </div>
</template>

<script>
import EquipStatus from 'cmp/equipStatus/EquipStatus'
export default {
  components: {
    EquipStatus
  },
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data() {
    return {
      equipStatus: {
        wifi: 'red',
        electricity: 'yellow',
        statusName: '故障'
      }
    }
  },
  mounted() {
    // this.equipStatus = {
    //   statusName: this.data.onlineType,
    //   wifi: this.data.equipSignal,
    //   electricity: this.data.equipPower
    // }
  },
  methods: {

  }
}
</script>
<style scoped src='./PlaceDetailCard.css'></style>
