<template>
  <div class="physicalUnionApplication">
    <!-- 标题 start -->
    <div class="physicalUnionApplication-header">
      <div class="physicalUnionApplication-title">
        {{ equip.equipName }}
      </div>
      <div class="physicalUnionApplication-state">
        <div class="physicalUnionApplication-state-box">
          <EquipStatus :electricity="equip.equipPower" :signal="equip.equipSignal" :status="equip.onlineType" />
        </div>
        <div v-if="equip.count!==0 && equip.count !== undefined" class="physicalUnionApplication-hidden-trouble" @click.stop="showHazardDetail(equip.equipId)">
          <van-badge :content="equip.count" badge-size="14px" max="99">
            <img src="@/assets/images/equip/risk-early-warning.png" alt="" class="physicalUnionApplication-hidden-trouble-icon">
          </van-badge>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- 内容 start -->
    <div class="physicalUnionApplication-content">
      <div class="physicalUnionApplication-content-row">
        <div class="physicalUnionApplication-content-row-name">
          设备类型:
        </div>
        <div class="physicalUnionApplication-content-row-value">
          {{ equip.equipTypeName }}
        </div>
      </div>
      <div class="physicalUnionApplication-content-row">
        <div class="physicalUnionApplication-content-row-name">
          IMEI码:
        </div>
        <div class="physicalUnionApplication-content-row-value">
          {{ equip.imei }}
        </div>
      </div>
      <div class="physicalUnionApplication-content-row">
        <div class="physicalUnionApplication-content-row-name">
          安装位置:
        </div>
        <div class="physicalUnionApplication-content-row-value">
          {{ equip.equipAddress }}
        </div>
      </div>
      <div class="physicalUnionApplication-content-row">
        <div class="physicalUnionApplication-content-row-name">
          所属辖区:
        </div>
        <div class="physicalUnionApplication-content-row-value">
          {{ equip.departName }}
        </div>
      </div>
      <div class="physicalUnionApplication-content-row">
        <div class="physicalUnionApplication-content-row-name">
          所属网点:
        </div>
        <div class="physicalUnionApplication-content-row-value address-font" @click.stop="showDetail(data.placeId)">
          {{ equip.placeName }}
          <img src="@/assets/images/equip/address.png" alt="" class="address-icon">
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- <Adaptive :data="['37%','36%']" class="physicalUnionApplication-content-img">
      <img src="/src/assets/images/equip/camera-bg-img.png" alt="" class="camera-bg-img">
    </Adaptive> -->
  </div>
</template>

<script>
import EquipStatus from 'cmp/equipStatus/EquipStatus'
import Api from '@/api/placeResource/placeResource'

export default {
  components: {
    EquipStatus
  },
  props: {
    equipInfo: {
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
        statusName: '正常'
      },
      equip: {}
    }
  },
  watch: {
    equipInfo(val, oldVal) {
      this.equip = val
    }
  },
  mounted() {
    this.equip = this.equipInfo
  },
  methods: {
    /**
     * 拨号
     */
    async  callPhone(e) {
      const res = await Api.placeResourcDetail(e)
      if (res.code === 200) {
        const result = res.data
        window.location.href = 'tel://' + result.phone
      }
    },
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
    showDetail(e) {
      this.$router.push({
        path: '/placeResourcDetail',
        query: {
          placeId: e
        }
      })
    }
  }
}
</script>

<style src='./PhysicalUnionApplication.css'>

</style>
