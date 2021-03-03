<template>
  <div class="physicalUnionApplication">
    <div class="physicalUnionApplication-header">
      <div class="physicalUnionApplication-title">
        {{ data.equipName }}
      </div>
      <div class="physicalUnionApplication-state">
        <div class="physicalUnionApplication-state-box">
          <EquipStatus :data="equipStatus" />
        </div>
        <div v-if="data.count!==0" class="physicalUnionApplication-hidden-trouble">
          <van-badge :content="data.count" badge-size="14px">
            <img src="@/assets/images/equip/risk-early-warning.png" alt="" class="physicalUnionApplication-hidden-trouble-icon">
          </van-badge>
        </div>
      </div>
    </div>
    <div class="physicalUnionApplication-content">
      <div class="physicalUnionApplication-content-row">
        <div class="physicalUnionApplication-content-row-name">
          设备类型:
        </div>
        <div class="physicalUnionApplication-content-row-value">
          {{ data.equipType }}
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
        <div class="physicalUnionApplication-content-row-value address-font">
          {{ data.placeName }}
          <img src="@/assets/images/equip/address.png" alt="" class="address-icon">
        </div>
      </div>
    </div>
    <!-- <Adaptive :data="['37%','36%']" class="physicalUnionApplication-content-img">
      <img src="/src/assets/images/equip/camera-bg-img.png" alt="" class="camera-bg-img">
    </Adaptive> -->
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
        statusName: '正常'
      }
    }
  },
  mounted() {
    console.log('卡片信息', this.data)
  },
  methods: {

  }
}
</script>

<style>
.physicalUnionApplication{
  width: 100%;
  /* padding: 0px 1% 0px 1%; */
  border: 1px solid #4D628F;
    background-color:#0A0B29;
}

.physicalUnionApplication-header{
  background: #131F3B;
  background-image: url('@/assets/images/equip/card-header.png');
  background-position: right top;
  background-repeat: no-repeat;
  background-size:100% 100%;

}
.physicalUnionApplication-title{
  width: 35%;
  height: 11.5%;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 3% 5% 2% 3%;
  display: inline-block;
}
.physicalUnionApplication-state{
  width: 55%;
  height: 10.5%;
  display: inline-block;
}
.physicalUnionApplication-state-box{
  float: right;
}
.physicalUnionApplication-hidden-trouble{
  width: 11%;
  height: 70%;
  /* background-color: red; */
  display: inline-block;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  float: right;
  color: #FFEAEE;
  padding: 0.5% 1% 0.5% 2%;
  margin-left: 7%;
  border-radius: 5px
}
/* .physicalUnionApplication-hidden-trouble-icon{
  position: absolute;
  top: 9.5%;
} */
.physicalUnionApplication-content{
  width: 100%;
  display: inline-block;
  background-image: url('@/assets/images/equip/camera-bg-img.png');
  background-position: right;
  background-repeat: no-repeat;
  background-size:160px 110px;
}
.physicalUnionApplication-content-img{
  width: 40%;
  position: relative;
}
.physicalUnionApplication-content-row{
  height: 15.5%;
  width: 97%;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  padding-left: 3%;
  align-items: center;
  vertical-align: middle
}
.physicalUnionApplication-content-row-name{
  width:19.5%;
  text-align: right;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
}
.physicalUnionApplication-content-row-value{
  width: 60%;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
  padding-left: 5%;
}
.physicalUnionApplication-hidden-trouble-icon{
  width: 18px;
  height: 19px;
}
.address-font{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  text-decoration: underline;
  color: #06F0FE;
  position: relative;
  top: -4px;
}
.address-icon{
  width: 11px;
  height: 16px;
  position: relative;
  top: 3px;
  left: 10px;
}
.camera-bg-img{
  width: 100%;
  height: 100%;
  z-index: -1;
}
.van-badge{
  border: none
}
.van-badge--fixed{
top: 4px
}
</style>
