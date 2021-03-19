<template>
  <div class="physicalUnionApplication">
    <!-- 标题 start -->
    <div class="physicalUnionApplication-header">
      <div class="physicalUnionApplication-title">
        {{ data.equipName }}
      </div>
      <div class="physicalUnionApplication-state">
        <div class="physicalUnionApplication-state-box">
          <EquipStatus :electricity="data.equipPower" :signal="data.equipSignal" :status="data.onlineType" />
        </div>
        <div v-if="data.count!==0" class="physicalUnionApplication-hidden-trouble" @click="showHazardDetail(data.equipId)">
          <van-badge :content="data.count" badge-size="14px" max="99">
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
          {{ data.equipTypeName }}
        </div>
      </div>
      <div class="physicalUnionApplication-content-row">
        <div class="physicalUnionApplication-content-row-name">
          IMEI码:
        </div>
        <div class="physicalUnionApplication-content-row-value">
          {{ data.imei }}
        </div>
      </div>
      <div class="physicalUnionApplication-content-row">
        <div class="physicalUnionApplication-content-row-name">
          安装位置:
        </div>
        <div class="physicalUnionApplication-content-row-value">
          {{ data.equipAddress }}
        </div>
      </div>
      <div class="physicalUnionApplication-content-row">
        <div class="physicalUnionApplication-content-row-name">
          所属辖区:
        </div>
        <div class="physicalUnionApplication-content-row-value">
          {{ data.departName }}
        </div>
      </div>
      <div class="physicalUnionApplication-content-row">
        <div class="physicalUnionApplication-content-row-name">
          所属网点:
        </div>
        <div class="physicalUnionApplication-content-row-value address-font" @click="showDetail(data.placeId)">
          {{ data.placeName }}
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
        statusName: '正常'
      }
    }
  },
  mounted() {
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
