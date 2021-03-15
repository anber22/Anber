<template>
  <div class="equipListCard">
    <!-- 标题 start -->
    <div class="equipListCard-header">
      <div class="equipListCard-title">
        {{ data.equipName }}
      </div>
      <div class="equipListCard-state">
        <EquipStatus :electricity="data.equipPower" :signal="data.equipSignal" :status="data.onlineType" />
      </div>
    </div>
    <!-- end -->

    <!-- 内容 start -->
    <div class="equipListCard-content">
      <div class="equipListCard-content-row">
        <div class="equipListCard-content-row-name">
          {{ data.imei }}
          <div class="equipListCard-type">
            {{ data.equipTypeName }}
          </div>
        </div>
        <a @click.stop="callPhone(data.placeId)">
          <img src="@/assets/images/equip/phone.png" alt="" class="equipListCard-content-row-icon">
        </a>
      </div>
      <div class="equipListCard-content-row">
        <div class="equipListCard-content-row-name">
          <span class="equipListCard-content-row-place-name" @click.stop="showDetail(data.placeId)">
            {{ data.placeName }}
          </span>
        </div>
        <img src="@/assets/images/equip/navigation.png" alt="" class="equipListCard-content-row-icon">
      </div>
    </div>
    <!-- end -->
  </div>
</template>

<script>
import EquipStatus from 'cmp/equipStatus/EquipStatus'
import Api from '@/api/placeResource/placeResource'

import { mapGetters } from 'vuex'

export default {
  components: {
    EquipStatus
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
      equipStatus: {
        wifi: 'red',
        electricity: 'yellow',
        statusName: '正常'
      }
    }
  },
  computed: {

  },
  created() {
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
     * 显示详情
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

<style src='./EquipListCard.css'>

</style>
