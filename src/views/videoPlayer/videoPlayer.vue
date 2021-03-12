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
    if (this.$route.query) {
      let source
      this.title = this.$route.query.equipTypeName + '-' + this.$route.query.placeName + this.$route.query.equipAddress
      const imei = this.$route.query.imei
      console.log(imei, 'this.$route.query.imei')
      if (imei === '21024125409SLB000873') {
        source = '/kkvideo/mag/hls/5b0536b81bf142559720059c7689a5b2/1/live.m3u8'
      } else if (imei === '21024125409SLB000464') {
        source = '/kkvideo/mag/hls/23afc05810e24b9aa912b31460214959/1/live.m3u8'
      } else if (imei === '21024125049SLB000450') {
        source = '/kkvideo/mag/hls/ee590462b44541858542455190786c28/1/live.m3u8'
      } else if (imei === '21024125049SLB000473') {
        source = '/kkvideo/mag/hls/6374ba29f92e41408ec2aa8b934313ec/1/live.m3u8'
      } else if (this.$route.query.equipId === '101') {
        source = '/kkvideo/mag/hls/34f7347c91eb4104b3d20ef12db64982/1/live.m3u8'
      } else if (this.$route.query.equipId === '100') {
        source = '/kkvideo/mag/hls/09c090c544e344888a91f9e673c1fb06/1/live.m3u8'
      } else {
        source = '/zjvideo/hls/03428523308467170101_src.m3u8'
      }
      this.playVideo(source)
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
