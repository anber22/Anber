<template>
  <div class="PlaceDetailCard">
    <div class="PlaceDetailCard-header">
      <div class="PlaceDetailCard-title">
        {{ data.equipTypeName }}
      </div>
      <div class="PlaceDetailCard-state">
        <!-- <div class="PlaceDetailCard-hidden-trouble">
          两个隐患
          <van-icon name="arrow" color="#ffff" class="PlaceDetailCard-hidden-trouble-icon" />
        </div> -->
        <div class="PlaceDetailCard-state-box">
          <EquipStatus :data="equipStatus" />
        </div>
      </div>
    </div>
    <div class="PlaceDetailCard-content">
      <div class="PlaceDetail-top-text">
        <span class="PlaceDetail-model PlaceDetail-ellipsis">{{ data.equipName }}</span>
        <span class="PlaceDetail-imei-code PlaceDetail-ellipsis">{{ data.imei }}</span>
      </div>
      <div class="PlaceDetail-bottom-text">
        <van-image
          width="11px"
          height="15px"
          fit="cover"
          style="vertical-align: text-top;"
          src="/src/assets/images/equip/address.png"
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
    this.equipStatus = {
      statusName: this.data.onlineType,
      wifi: this.data.equipSignal,
      electricity: this.data.equipPower
    }
  },
  methods: {

  }
}
</script>

<style scoped>

.PlaceDetailCard{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #4D628F;
  background-color:#0A0B29;
}

.PlaceDetailCard-header{
  background: #131F3B;
  background-image: url('@/assets/images/equip/card-header.png');
  background-position: right top;
  background-repeat: no-repeat;
  background-size:100% 100%;

}
.PlaceDetailCard-title{
  width: 35%;
  height: 11.5%;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 2% 5% 4% 3%;
  display: inline-block;
}
.PlaceDetailCard-state{
  width: 53%;
  height: 18.5%;
  display: inline-block;
}
.PlaceDetailCard-state-box{
  float: right;
}
.PlaceDetailCard-hidden-trouble{
  width: 34%;
  height: 70%;
  background-color: red;
  display: inline-block;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFEAEE;
  padding: 0.5% 1% 0.5% 2%;
  margin-left: 7%;
  border-radius: 5px
}
.PlaceDetailCard-hidden-trouble-icon{
  position: absolute;
  top: 9.5%;
}
.PlaceDetailCard-content{
  width: 100%;
  display: inline-block;
  color: #B9CEE9;
  font-size: 12px;
  position: relative;
}
.PlaceDetail-top-text{
  padding: 4% 3% 2%;
}
.PlaceDetail-bottom-text{
  padding: 2% 3% 2%;
  width: 80%
}
.PlaceDetail-ellipsis{
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.PlaceDetail-model{
  width: 33%;
}
.PlaceDetail-imei-code{
  width: 50%;
}
.PlaceDetail-unbundling{
  position: absolute;
  top: 37%;
  right: 4%;
  width: 15px;
  font-size: 18px;
  text-align: center;
  line-height: 12px;
  font-weight: 100;
  height: 15px;
  border-radius: 50%;
  border: 1px #06F0FE solid;
  color: #06F0FE;
}
</style>
