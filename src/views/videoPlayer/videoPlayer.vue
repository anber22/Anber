<template>
  <div class="videoPlayer-box">
    <p class="title">
      {{ title }}
    </p>
    <div class="video-center">
      <div class="video-content">
        <video-player
          ref="videoPlayer"
          class="vjs-custom-skin"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @ready="onPlayerReady($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from 'cmp/videoPlayer/VideoPlayer.vue'
export default {
  components: {
    VideoPlayer
  },
  data() {
    return {
      title: '',
      // nowPlayVideoUrl: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8', // cctv6的hls视频流，测试用
      playerOptions: {
        autoplay: true,
        controls: true,
        muted: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        }
        // ,
        // poster: require('@/assets/images/home/banner-2.jpg')
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  mounted() {
    const source = '/video/hls/03428523308467170101_low.m3u8'
    this.playVideo(source)
    if (this.$route.query) {
      this.title = this.$route.query.equipTypeName + '-' + this.$route.query.placeName + this.$route.query.equipAddress
      // this.getVideo(this.$route.query.imei)
    }
  },
  methods: {
    onPlayerPlay(player) {
      console.log('player play!', player)
      this.player.play()
    },
    onPlayerReady(player) {
      console.log('player ready!', player)
      this.player.play()
    },
    playVideo(source) {
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source
      }
      this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video)
      // this.player.load()
      this.player.play()
    }
    // ,
    // switchPlayer() {
    //   this.playVideo(this.src)
    // }
  }
}
</script>

<style scoped>
.videoPlayer-box{
  /* position: absolute !important; */
  width: 100%;
  height: 100%;
  background-color: #000;
  position: fixed
}
.video-center {
  position: fixed;
  top: 45%;
  left: 50%;
  width: 100%;
  position: absolute;
  padding-bottom: 76%;
  -webkit-transform: translateX(-50%) translateY(-50%);
}
.video-content{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
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
<style>
.videoPlayer-box .vjs-custom-skin .video-js {
  width: 100% !important;
  height: 100%;
}
</style>
