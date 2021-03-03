<template>
  <div class="videoPlayer-box">
    <p class="title">
      {{ title }}
    </p>
    <div class="video-center">
      <iframe class="video-content" src="https://www.baidu.com/" frameborder="0" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      title: ''
    }
  },
  mounted() {
    if (this.$route.query) {
      this.title = this.$route.query.equipType + this.$route.query.placeName + this.$route.query.equipAddress
      this.getVideo(this.$route.query.imei)
    }
  },
  methods: {
    getVideo(imei) {
      console.log(imei, 'imei来了')
    }
  }
}
</script>

<style scoped>
.videoPlayer-box{
  position:relative;
  width: 100vw;
  height: 100vh;
  background-color: #101720;
}
.video-center {
    position: fixed;
    top: 46%;
    left: 50%;
    background-color: #eee;
    width: 100%;
    position: absolute;
    padding-bottom: 76%;
    -webkit-transform: translateX(-50%) translateY(-50%);
}
.video-content{
  position: absolute;
  width: 100%;
  height: 100%;
}
.title{
  color: #8BA3C2;
  font-size: 15px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  line-height: 40px;
  margin-left: 8px;
}
</style>
