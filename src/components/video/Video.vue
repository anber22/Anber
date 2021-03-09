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
          imei: 123456,
          placeName: this.placename,
          equipTypeName: this.data.equipTypeName,
          equipAddress: this.data.equipAddress
        }
      })
    }
  }
}
</script>

<style scoped>
.video-component{
  color: #fff;
  font-size: 0
}
.item{
  box-sizing: border-box;
  display: inline-block;
  margin-bottom: 16px;
  font-size: 14px;
  width: 48%
}
.item:nth-child(odd){
  margin-right: 4%;
}
.image-item{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.title{
  font-size: 15px;
  padding-top: 8px
}
.title2{
  font-size: 12px;
  color: rgba(111, 133, 162, 1);
  padding-top: 4px
}
.title3{
  font-size: 12px;
  color: rgba(111, 133, 162, 1);
  padding-top: 4px
}
.item .text p{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
<style>
.video-component .item .van-image__img{
  height: auto;
}
.video-component .van-image__error, .video-component .van-image__loading{
  background-color: #666;
}
</style>
