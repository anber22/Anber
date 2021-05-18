<template>
  <div class="placeResourceListCard" @click="goJump(placeData.placeId)">
    <div class="placeResourceListCard-header">
      <div class="placeResourceListCard-title">
        {{ placeData.placeName }}
      </div>
      <div v-if="placeData.count !== undefined" class="placeResourceListCard-equip-count">
        物联设备：
        <div class="placeResourceListCard-equip-count-num">
          {{ placeData.count }}
        </div>
      </div>
    </div>
    <div class="placeResourceListCard-content">
      <div class="placeResourceListCard-content-row">
        <div class="placeResourceListCard-content-row-name">
          {{ placeData.managerName }}
          <div class="placeResourceListCard-phone">
            {{ placeData.phone }}
          </div>
          <div class="placeResourceListCard-type">
            {{ placeData.placeTypeName }}
          </div>
        </div>
        <a @click.stop="callPhone(placeData.placeId)">
          <img src="@/assets/images/equip/phone.png" alt="" class="placeResourceListCard-content-row-icon">
        </a>
      </div>
      <div class="placeResourceListCard-content-row">
        <div class="placeResourceListCard-content-row-name">
          <!-- {{ placeData.placeName }} -->
          <span class="placeResourceListCard-content-row-adress-name">
            {{ placeData.placeAddress }}
          </span>
        </div>
        <a @click.stop="toMap(placeData.placeId)">
          <img src="@/assets/images/equip/navigation.png" alt="" class="placeResourceListCard-content-row-icon">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/placeResource/placeResource'

export default {
  components: {
    // EquipStatus
  },
  props: {
    placeData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      equipStatus: {
        wifi: 80,
        electricity: 80,
        statusName: '正常'
      },
      placeInfo: {}
    }
  },
  watch: {
    placeData: function(val, oldVal) {
      this.placeInfo = val
    }
  },
  mounted() {
    this.placeInfo = this.placeData
  },
  methods: {
    /**
     * 跳转地图
     */
    toMap() {

    },

    /**
     * 跳转拨号
     */
    async  callPhone(e) {
      const res = await Api.placeResourceDetail(e)
      if (res.code === 200) {
        const result = res.data
        window.location.href = 'tel://' + result.phone
      }
    },
    /**
     * 跳转页面
     */
    goJump(id) {
      this.$router.push({
        path: '/placeResourceDetail',
        query: {
          placeId: id,
          placeTypeName: this.placeData.placeTypeName
        }
      })
    }
  }
}
</script>

<style>
.placeResourceListCard{
  width: 100%;
  height: 100%;
  border: 1px solid #4D628F;
  background-color:#0A0B29;
}
.placeResourceListCard-header{
  background: #131F3B;
}
.placeResourceListCard-title{
  width: 35%;
  height: 25%;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 1% 5% 1% 3%;
  margin-top: 1%;
  display: inline-block;
  float: left;
}
.placeResourceListCard-content{
  width: 100%;
  height: 55%;
  margin-top: 2.7%;
}
.placeResourceListCard-equip-count{
  width: 50%;
  height: 25%;
  font-size: 12px;
  display: inline-block;
  font-family: PingFang SC;
  font-weight: 400;
  vertical-align: middle;
  color: #B9CEE9;
  padding: 2.1% 1% 1% 3%;
  text-align: right;
  padding-right: 3%;
}
.placeResourceListCard-equip-count-num{
  width: auto;
  height: 100%;
  display: inline-block;
  color: #06F0FE;
}
.placeResourceListCard-content-row{
  height: 45.5%;
  width: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle
}
.placeResourceListCard-content-row-name{
  width: 89%;
  text-align: left;
  padding-left: 3%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}
.placeResourceListCard-content-row-adress-name{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
}
.placeResourceListCard-type{
  width: auto;
  background: #1B2B29;
  border: 1px solid #54A4E7;
  border-radius: 2px;
  color: #55A4E7;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #55A4E7;
  padding: 0.5% 1% 0.5% 1%;
  margin-left: 2%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}
.placeResourceListCard-phone{
  width: auto;
  padding: 0.5% 1% 0.5% 1%;
  margin-left: 2%;
  color: #B9CEE9;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}
.placeResourceListCard-content-row-icon{
  width: 19px;
  height: 19px;
}
</style>
