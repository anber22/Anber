<template>
  <div class="placeResourcDetail">
    <div class="placeResourcDetail-box">
      <div v-if="!loading" class="placeResourcDetail-content">
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
            <span class="describe">{{ placeResourcDetail.placeName }}</span>
            <span class="placeType">{{ placeResourcDetail.placeTypeName }}</span>
          </div>
          <div class="text-item">
            <span class="name">网点地址：</span>
            <span class="describe">{{ placeResourcDetail.placeAddress }}</span>
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
                :src="require('/src/assets/images/equip/phone.png')"
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
            :src="require('/src/assets/images/home/title-icon.png')"
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
              :src="require('/src/assets/images/equip/add.png')"
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
import Api from '@/api/placeResource/placeResource'
import PlaceDetailCard from 'cmp/placeDetailCard/PlaceDetailCard'
import promiseToList from '@/utils/promiseToList'

export default {
  components: {
    PlaceDetailCard
  },
  data() {
    return {
      placeResourcDetail: {},
      placeResourcEquip: [],
      loading: true
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
      this.loading = true

      const res = await Api.placeResourcDetail(id)
      if (res.code === 200) {
        this.placeResourcDetail = res.data
      }
      this.placeResourcDetail = await promiseToList.conversion('placeType', 'placeTypeId', 'placeTypeName', [this.placeResourcDetail])
      this.placeResourcDetail = this.placeResourcDetail[0]
      this.loading = false
    },
    /**
     * 获取当前网点关联的设备列表
     */
    async getPlaceResourcEquip(id) {
      const res = await Api.placeResourcEquip(id)
      if (res.code === 200) {
        this.placeResourcEquip = [...res.data]
      }
    }
  }
}
</script>
<style scoped src='./placeResourcDetail.css'></style>
