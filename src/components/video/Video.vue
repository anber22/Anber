<template>
  <div class="video-component item">
    <div v-if="videoInfo" @click="goJump()">
      <Adaptive :size="['100%','60%']" style="text-align: center">
        <!-- <van-image
          fit="cover"
          :src="videoInfo.pictureUrl"
          class="image-item"
          :show-error="false"
          :show-loading="false"
        /> -->
        <img v-if="videoInfo.pictureUrl" class="image-item" :src="videoInfo.pictureUrl" alt="">
        <div v-if="!videoInfo.pictureUrl" class="image-item" style="align-items: center;box-sizing: border-box;display: flex;justify-content: center;border: 1px #273240 solid">
          <span style="color: #6F85A2;font-size: 12px;display: inline-block; vertical-align: middle">
            视频已加载，暂无图片
          </span>
        </div>
      </Adaptive>
      <div class="text">
        <p class="title">
          {{ videoInfo.equipTypeName }}
        </p>
        <p class="title2">
          {{ placeName }}
        </p>
        <p class="title3">
          <van-icon name="location-o" />
          {{ videoInfo.equipAddress }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoInfo: {
      type: Object,
      default: () => {}
    },
    placeName: {
      type: String,
      default: ''
    }
  },
  methods: {
    goJump() {
      this.$router.push({
        path: '/videoPlayer',
        query: {
          imei: this.videoInfo.imei,
          placeName: this.placeName,
          equipTypeName: this.videoInfo.equipTypeName,
          equipAddress: this.videoInfo.equipAddress,
          equipId: this.videoInfo.equipId
        }
      })
    }
  }
}
</script>
<style scoped src='./Video.css'></style>
<style>
.video-component .item .van-image__img{
  height: auto;
}
.video-component .van-image__error, .video-component .van-image__loading{
  background-color: #666;
}
</style>
