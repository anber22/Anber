<template>
  <div class="video-component item">
    <div v-if="data" @click="goJump()">
      <Adaptive :data="['100%','60%']">
        <van-image
          fit="cover"
          :src="data.pictureUrl"
          class="image-item"
          :show-error="false"
          :show-loading="false"
        />
      </Adaptive>
      <div class="text">
        <p class="title">
          {{ data.equipTypeName }}
        </p>
        <p class="title2">
          {{ placename }}
        </p>
        <p class="title3">
          <van-icon name="location-o" />
          {{ data.equipAddress }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    placename: {
      type: String,
      default: ''
    }
  },
  methods: {
    goJump() {
      this.$router.push({
        path: '/videoPlayer',
        query: {
          imei: this.data.imei,
          placeName: this.placename,
          equipTypeName: this.data.equipTypeName,
          equipAddress: this.data.equipAddress,
          equipId: this.data.equipId
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
