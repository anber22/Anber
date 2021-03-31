<template>
  <div class="infoRows">
    <div class="row-name">
      {{ data.name }}
    </div>
    <div v-if="data.typed==='info'" class="row-info-value">
      {{ data.content }}
    </div>
    <div v-else-if="data.typed==='status'" class="row-status-value">
      <EquipStatus :electricity="data.content.equipPower" :signal="data.content.equipSignal" :status="data.content.onlineType" />
    </div>
    <div v-else-if="data.typed==='place'" class="row-place-value" @click="showDetail(data.content.placeId)">
      {{ data.content.name }}
      <img src="@/assets/images/equip/address.png" alt="" class="infoRows-address-icon">
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
      default: {}
    }
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
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

<style>
.infoRows{
  width: 100%;
  height: 4%;;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  display: flex;
  flex-direction: row;
}
.row-name{
  height: 100%;
  color: #6F85A2;
  width: 26%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.row-info-value{
  height: 100%;
  color: #B9CEE9;
  width: 64%;
  display: flex;
  padding-left: 6%;
  align-items: center;
}
.row-status-value{
  height:100% ;
  width: 64%;
  display: flex;
  align-items: center;
}
.row-place-value{
  height: 100%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  text-decoration: underline;
  color: #06F0FE;
  width: 64%;
  display: flex;
  padding-left: 6%;
  align-items: center;
}
.infoRows-address-icon{
  vertical-align: middle;

  width: 11px;
  height: 16px;
  margin-left: 8px;
}
</style>
