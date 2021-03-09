<template>
  <div class="placeResourcDetail">
    <div class="placeResourcDetail-box">
      <div class="placeResourcDetail-content">
        <div class="title">
          <van-image
            width="4px"
            height="17px"
            fit="contain"
            src="/src/assets/images/home/title-icon.png"
            :show-error="false"
            :show-loading="false"
          />
          网点信息
        </div>
        <div class="text-box">
          <div class="text-item">
            <span class="name">网点名称：</span>
            <span class="describe">{{ placeResourcDetail.placeName }}</span>
            <span class="placeType">{{ $route.query.placeTypeName }}</span>
          </div>
          <div class="text-item">
            <span class="name">网点地址：</span>
            <span class="describe">{{ placeResourcDetail.placeAddress }}</span>
            <van-image
              width="19px"
              height="19px"
              fit="contain"
              src="/src/assets/images/equip/navigation.png"
              class="right-icon"
              :show-error="false"
              :show-loading="false"
            />
          </div>
          <div class="text-item">
            <span class="name">所属辖区：</span>
            <span class="describe">{{ placeResourcDetail.departName }}</span>
          </div>
          <div class="text-item" style="padding-bottom: 20px; border-bottom: 1px #283444 solid;">
            <span class="name">联系人：</span>
            <span class="describe">{{ placeResourcDetail.managerName }}-{{ placeResourcDetail.phone }}</span>
            <a :href="'tel:' + placeResourcDetail.phone">
              <van-image
                width="19px"
                height="19px"
                fit="contain"
                src="/src/assets/images/equip/phone.png"
                class="right-icon"
                :show-error="false"
                :show-loading="false"
              />
            </a>
          </div>
          <!-- 勿删：责任书照片和网点照片 -->
          <!-- <div class="text-item" style="display: flex;">
            <span class="name phone-name">责任书：</span>
            <div class="phone-box">
              <Adaptive
                v-for="(iitem, index) in placeResourcDetail.dutyPitcture"
                :key="
                  index"
                class="photo"
                :data="['29%', '29%']"
              >
                <van-image
                  fit="cover"
                  :src="iitem"
                />
              </Adaptive>
            </div>
          </div>
          <div class="text-item" style="display: flex;">
            <span class="name phone-name">网点照片：</span>
            <div class="phone-box">
              <Adaptive
                v-for="(iitem, index) in placeResourcDetail.placePicture"
                :key="
                  index"
                class="photo"
                :data="['29%', '29%']"
              >
                <van-image
                  fit="cover"
                  :src="iitem"
                />
              </Adaptive>
            </div>
          </div> -->
        </div>
        <div class="title iotTitle">
          <van-image
            width="4px"
            height="17px"
            fit="contain"
            src="/src/assets/images/home/title-icon.png"
            :show-error="false"
            :show-loading="false"
          />
          物联设备({{ placeResourcEquip.length }})
        </div>
        <Adaptive v-for="(item, index) in placeResourcEquip" :key="index" class="PlaceDetailCard" :data="['100%', '32%']">
          <PlaceDetailCard :data="item" />
        </Adaptive>
        <div class="PlaceDetailCard-bind-equip">
          <p>
            <van-image
              width="17px"
              height="17px"
              style="vertical-align: text-top;"
              fit="contain"
              src="/src/assets/images/equip/add.png"
              :show-error="false"
              :show-loading="false"
            />
            绑定设备
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/placeResourc/placeResourc'
import PlaceDetailCard from 'cmp/placeDetailCard/PlaceDetailCard'
export default {
  components: {
    PlaceDetailCard
  },
  data() {
    return {
      placeResourcDetail: {},
      placeResourcEquip: []
    }
  },
  mounted() {
    this.getPlaceResourcDetail(this.$route.query.placeId)
    this.getPlaceResourcEquip(this.$route.query.placeId)
  },
  methods: {
    /**
     * 获取当前网点详情
     */
    async getPlaceResourcDetail(id) {
      const res = await Api.placeResourcDetail(id)
      this.placeResourcDetail = res.data
    },
    /**
     * 获取当前网点关联的设备列表
     */
    async getPlaceResourcEquip(id) {
      const res = await Api.placeResourcEquip(id)
      this.placeResourcEquip = res.data
    }
  }
}
</script>

<style scoped>
.placeResourcDetail{
  width: 100%;
  height: calc(100% - 46px);
  background-color: #101720;
}
.placeResourcDetail-box{
  width: 100%;
  height: auto;
  background-color: #101720;
}
.placeResourcDetail-content{
  width: 92%;
  margin: 0 4%;
  overflow: hidden;
}
.title{
  font-size: 20px;
  color: #B9CEE9;
  padding-top: 20px;
}
.text-box{
  padding-top: 5px;
  margin-left: 10px
}
.text-box .text-item{
  color: #6F85A2;
  font-size: 12px;
  margin-top: 16px;
}
.text-box .text-item::after{
  display: block;
  clear: both;
  content: ''
}
.text-box .text-item .name{
  min-width: 60px;
  display: inline-block;
  margin-right: 20px;
  text-align: right
}
.text-box .text-item .placeType{
  color: #55A4E7;
  font-size: 10px;
  display: inline-block;
  padding: 3px 10px;
  border: 1px #54A4E7 solid;
  border-radius: 2px;
  transform: scale(0.8);
  -webkit-transform: scale(0.8);
  background: #0d2031;
}
.text-box .text-item .describe{
  color: #B9CEE9
}
.right-icon{
  vertical-align: middle;
  float: right;
  margin-right: 10px;
}
.photo{
  margin-right: 3%;
  margin-top: 1%;
  margin-bottom: 3%;
}
.iotTitle{
  /* 注释责任人跟网点图片 padding用26px;放开责任人跟网点图片后用回50px */
  /* padding-top: 50px; */
  padding-top: 26px;
  padding-bottom: 22px;
}
.PlaceDetailCard{
  margin-bottom: 4%
}
.phone-box{
  float: left;
  width: 78%;
}
.phone-name{
  float: left;
}
.PlaceDetailCard-bind-equip{
  border: 1px #4D628F dashed;
  box-sizing: border-box;
  margin-top: 4%;
  margin-bottom: 8%;
  font-size: 16px;
  color: #B9CEE9;
  text-align: center
}
.PlaceDetailCard-bind-equip p{
  padding: 2.8%;
  margin-right: 4px;
}
</style>
