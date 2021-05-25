<template>
  <div class="placeResourceDetail">
    <div class="placeResourceDetail-box">
      <div v-if="!loading" class="placeResourceDetail-content">
        <div class="title">
          <van-image
            width="4px"
            height="17px"
            fit="contain"
            :src="require('/src/assets/images/home/title-icon.png')"
            :show-error="false"
            :show-loading="false"
          />
          网点信息
        </div>
        <div class="text-box">
          <div class="text-item">
            <span class="name">网点名称：</span>
            <span class="describe">{{ placeResourceDetail.placeName }}</span>
            <span class="placeType">{{ placeResourceDetail.placeTypeName }}</span>
          </div>
          <div class="text-item">
            <span class="name">网点地址：</span>
            <span class="describe">{{ placeResourceDetail.placeAddress }}</span>
            <van-image
              width="19px"
              height="19px"
              fit="contain"
              :src="require('/src/assets/images/equip/navigation.png')"
              class="right-icon"
              :show-error="false"
              :show-loading="false"
            />
          </div>
          <div class="text-item">
            <span class="name">所属辖区：</span>
            <span class="describe">{{ placeResourceDetail.departName }}</span>
          </div>
          <div class="text-item" style="padding-bottom: 20px; border-bottom: 1px #283444 solid;">
            <span class="name">联系人：</span>
            <span class="describe">{{ placeResourceDetail.managerName }}-{{ placeResourceDetail.phone }}</span>
            <a :href="'tel:' + placeResourceDetail.phone">
              <van-image
                width="19px"
                height="19px"
                fit="contain"
                :src="require('/src/assets/images/equip/phone.png')"
                class="right-icon"
                :show-error="false"
                :show-loading="false"
              />
            </a>
          </div>
          <!-- 勿删：责任书照片和网点照片 -->
          <div class="text-item" style="display: flex;">
            <span class="name phone-name">责任书：</span>
            <div v-if="placeResourceDetail.dutyPitcture" class="phone-box">
              <Adaptive
                v-for="(iitem, index) in placeResourceDetail.dutyPitcture"
                :key="
                  index"
                class="photo"
                :size="['29%', '29%']"
              >
                <van-image
                  fit="cover"
                  :src="imgPrefix+ iitem"
                />
              </Adaptive>
            </div>
            <div v-else>
              <span class="describe">暂无图片</span>
            </div>
          </div>
          <div class="text-item" style="display: flex;">
            <span class="name phone-name">网点照片：</span>
            <div v-if="placeResourceDetail.placePicture" class="phone-box">
              <Adaptive
                v-for="(iitem, index) in placeResourceDetail.placePicture"
                :key="
                  index"
                class="photo"
                :size="['29%', '29%']"
              >
                <van-image
                  fit="cover"
                  :src="imgPrefix+ iitem"
                />
              </Adaptive>
            </div>
            <div v-else>
              <span class="describe">暂无图片</span>
            </div>
          </div>
        </div>
        <div class="title iotTitle">
          <van-image
            width="4px"
            height="17px"
            fit="contain"
            :src="require('/src/assets/images/home/title-icon.png')"
            :show-error="false"
            :show-loading="false"
          />
          物联设备({{ placeResource.length }})
        </div>
        <!-- <Adaptive v-for="(item, index) in placeResourceEquip" :key="index" class="PlaceDetailCard" :data="['100%', '32%']">
          <PlaceDetailCard :size="item" />
        </Adaptive> -->
        <PlaceDetailCard class="PlaceDetailCard-bind-equip" :place-detail-data="placeResource" />

        <!-- <p class="binding-device">
          <van-image
            width="18px"
            height="18px"
            margin-top="3px"
            fit="contain"
            :src="require('/src/assets/images/equip/add.png')"
            :show-error="false"
            :show-loading="false"
          />
          绑定设备
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/placeResource/placeResource'
import PlaceDetailCard from 'cmp/placeDetailCard/PlaceDetailCard'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
import Config from '/config.json'

export default {
  name: 'PlaceResourceDetail',
  components: {
    PlaceDetailCard
  },

  data() {
    return {
      placeResourceDetail: {},
      placeResource: [],
      loading: true,

      placeResourceDetailId: 0,
      detailPlaceId: 0,
      imgPrefix: ''
    }
  },
  mounted() {
    this.getPlaceResourceDetail(this.$route.query.placeId)
    this.getPlaceResourceEquip(this.$route.query.placeId)
    // this.placeResourceDetailId=this.$router.query.
    this.detailPlaceId = this.$route.query.placeId
  },
  created() {
    this.imgPrefix = Config.figureBedAddress
  },
  methods: {
    /**
     * 获取当前网点详情
     */
    async getPlaceResourceDetail(id) {
      this.loading = true

      const res = await Api.placeResourceDetail(id)
      if (res.code === 200) {
        this.placeResourceDetail = res.data
        this.placeResourceDetail = await ReadTypeNameOnVuex.conversion('placeType', 'placeTypeId', 'placeTypeName', [this.placeResourceDetail])
        this.placeResourceDetail = this.placeResourceDetail[0]
        this.loading = false
      }
    },
    /**
     * 获取当前网点关联的设备列表
     */
    async getPlaceResourceEquip(id) {
      const res = await Api.placeResourceEquip(id)
      if (res.code === 200) {
        let dataArray = [...res.data]
        dataArray = await ReadTypeNameOnVuex.conversion('placeType', 'placeTypeId', 'placeTypeName', dataArray)
        const arr = []
        for (let i = 0; i < dataArray.length; i++) {
          const element = dataArray[i]
          const obj = {
            equipStatus: {
              statusname: element.onlineType,
              electricity: element.equipPower,
              signal: element.equipSignal
            },
            equipName: element.equipName,
            imei: element.imei,
            equipAddress: element.equipAddress,
            equipTypeName: element.equipTypeName
          }
          arr.push(obj)
        }
        this.placeResource = arr
      }
    },
    /*
      navbar的编辑按钮
    */
    toeEdit() {
      this.$router.push({ path: '/placeResourceEditorial', query: { placeResourceId: this.detailPlaceId }})
    }
  }
}
</script>
<style scoped src='./placeResourceDetail.css'></style>
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
.binding-device{
  width: 342px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-top: 21px;
  border: 1px #4D628F dashed;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
}

</style>
