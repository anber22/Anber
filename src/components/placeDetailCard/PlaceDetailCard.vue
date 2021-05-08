<template>
  <div class="PlaceDetailCard-bind-equip">
    <div v-for="(item, index) in data" :key="index" class="equipcard">
      <div class="equipcard-top">
        <p>枪型摄像头</p>
        <!-- 状态放在这里 -->
        <EquipStatus class="equip-status" :electricity="item.equipStatus.electricity" :signal="item.equipStatus.signal" :status="item.equipStatus.statusname" />
      </div>
      <div class="content">
        <ul class="gun-IMEI">
          <li class="gun-type">
            {{ item.contentDetail.info[0] }}
          </li>
          <li class="IMEI-num">
            {{ item.contentDetail.info[1] }}
          </li>
        </ul>
        <ul class="locat-address">
          <img class="locat-img" src="@/assets/images/equip/address.png" alt="">
          <li class="gun-address">
            {{ item.contentDetail.info[2] }}
          </li>
        </ul>
        <img class="reduce-img" src="@/assets/images/equip/reduce.png" alt="">
      </div>
    </div>
    <!-- <div class="PlaceDetailCard">
      <div class="PlaceDetailCard-header">
        <div class="PlaceDetailCard-title">
          {{ data.equipName }}
        </div>
        <div class="PlaceDetailCard-state"> -->
    <!-- <div class="PlaceDetailCard-hidden-trouble">
          两个隐患1
          <van-icon name="arrow" color="#ffff" class="PlaceDetailCard-hidden-trouble-icon" />
        </div> -->
    <!-- <div class="PlaceDetailCard-state-box">
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
    </div> -->
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
      // placeResourc: [
      //   {
      //     equipStatus: {
      //       statusname: 1,
      //       electricity: 40,
      //       signal: -65
      //     },
      //     contentDetail: {
      //       info: ['YD333N枪型', 'FX328798798249182', '港湾一号湾9栋401大门口']
      //     }
      //   },
      //   {
      //     equipStatus: {
      //       statusname: 0,
      //       electricity: 90,
      //       signal: -85
      //     },
      //     contentDetail: {
      //       info: ['YD333N枪型', 'FB328796813299182', '港湾一号湾17栋903大门口']
      //     }
      //   }
      // ]
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
<style scoped>
.equipcard{
  width: 341px;
  height: 102px;
  background: linear-gradient(265deg, #1A2A4A, #0A0B29);
  border: 1px solid #4D628F;
  margin-bottom: 13px;
}
.equipcard-top{
  width: 100%;
  height: 31.5%;
  background: #131F3B;
  background-image: url('@/assets/images/equip/card-header.png');
  background-repeat: no-repeat;
  background-size: 345px 32px
}
.equipcard-top p{
  width: 75px;
  height: 32px;
  line-height: 32px;
  padding: 0px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  margin-left: 10px;
  display: inline-block;
}
.equip-status{
  margin-top: 4px;
  margin-right: 10px;
}
.content{
  position: relative;
}
.content li{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
}
.gun-IMEI{
  display: flex;
  margin: 13px 0px 11px 10px;
}
.locat-address{
  display: flex;
  margin: 0 0 0 10px;
}
.content .locat-img{
  width: 11px;
  height: 15px;
  margin-right: 6px;
}
.content .reduce-img{
  width: 15px;
  height: 14px;
}
.gun-type{
  margin-right:40px;
}
.reduce-img{
  position: absolute;
  left: 318px;
  top:9px;
}
</style>
