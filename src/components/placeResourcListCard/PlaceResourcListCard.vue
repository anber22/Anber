<template>
  <div class="placeResourcListCard" @click="goJump(data.placeId)">
    <div class="placeResourcListCard-header">
      <div class="placeResourcListCard-title">
        {{ data.placeName }}
      </div>
      <div class="placeResourcListCard-equip-count">
        物联设备：
        <div class="placeResourcListCard-equip-count-num">
          {{ data.count }}
        </div>
      </div>
    </div>
    <div class="placeResourcListCard-content">
      <div class="placeResourcListCard-content-row">
        <div class="placeResourcListCard-content-row-name">
          {{ data.managerName }}
          <div class="placeResourcListCard-phone">
            {{ data.phone }}
          </div>
          <div class="placeResourcListCard-type">
            {{ data.placeTypeName }}
          </div>
        </div><img src="@/assets/images/equip/phone.png" alt="" class="placeResourcListCard-content-row-icon">
      </div>
      <div class="placeResourcListCard-content-row">
        <div class="placeResourcListCard-content-row-name">
          <!-- {{ data.placeName }} -->
          {{ data.placeAddress }}
        </div>
        <img src="@/assets/images/equip/navigation.png" alt="" class="placeResourcListCard-content-row-icon">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // EquipStatus
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
        wifi: 80,
        electricity: 80,
        statusName: '正常'
      }
    }
  },
  methods: {
    goJump(id) {
      this.$router.push({
        path: '/placeResourcDetail',
        query: {
          placeId: id
        }
      })
    }
  }
}
</script>

<style>
.placeResourcListCard{
  width: 100%;
  height: 100%;
  border: 1px solid #4D628F;
  background-color:#0A0B29;
}
.placeResourcListCard-header{

background: #131F3B;
}
.placeResourcListCard-title{
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
.placeResourcListCard-content{
  width: 100%;
  height: 55%;
  margin-top: 2.7%;
}
.placeResourcListCard-equip-count{
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
.placeResourcListCard-equip-count-num{
  width: auto;
  height: 100%;
  display: inline-block;

  color: #06F0FE;
}
.placeResourcListCard-content-row{
  height: 45.5%;
  width: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle
}
.placeResourcListCard-content-row-name{
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
.placeResourcListCard-type{
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
.placeResourcListCard-phone{
  width: auto;
  padding: 0.5% 1% 0.5% 1%;
  margin-left: 2%;
  color: #B9CEE9;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}
.placeResourcListCard-content-row-icon{
  width: 19px;
  height: 19px;
}
</style>
