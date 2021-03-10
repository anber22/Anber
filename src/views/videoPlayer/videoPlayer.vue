<template>
  <div class="videoPlayer-box">
    <p class="title">
      {{ title }}
    </p>
    <div class="video-center">
      <!-- video-js 和 data-setup="{}" 一定要有，不然视频加载不出来  类vjs-big-play-centered主要是为了把按钮放中间-->
      <!-- <video
        id="my-video"
        class="video-js vjs-big-play-centered video-content"
        controls
        preload="auto"
        poster="src/assets/images/home/banner-2.jpg"
        data-setup="{}"
      >
        <source src="http://10.9.2.14:8681/hls/03428523308886210101_src.m3u8" type="video/mp4">
      </video> -->
      <!-- <div @click="getVideo()"> -->
      <video id="video" ref="video" muted autoplay class="video-center" />
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
// import 'videojs-contrib-hls'
// import { videojs } from 'video.js'
const Hls = require('hls.js')

export default {
  components: {
  },
  data() {
    return {
      title: '',
      hls: ''
    }
  },
  mounted() {
    // var player = videojs('video')

    if (this.$route.query) {
      this.title = this.$route.query.equipTypeName + '-' + this.$route.query.placeName + this.$route.query.equipAddress
      // this.getVideo(this.$route.query.imei)
    }
    // this.initVideoPlayer()
    /**
     * hls.js插件的init方法
     */
    this.getVideo()
  },
  beforeDestroy() {
    /**
     * hls.js插件的销毁方法
     */
    this.videoPause()
  },
  methods: {
    /**
     * video.js插件的方法
     */

    // initVideoPlayer() {
    //   // 第一个选中的要播放的video标签, 记得是video标签,
    //   const currentInstance = this.$video('video', {
    //     autoplay: true, // 是否自动播放
    //     controls: true // 是否显示控件
    //   })

    //   currentInstance.src({
    //     src: 'http://192.168.3.21:8888/hls/test.m3u8',
    //     type: 'application/x-mpegURL' // 这个type值必写, 告诉videojs这是一个hls流视频
    //   })
    // }

    /**
     * hls.js插件的方法
     * 03428523308467170101_low
     *
     */
    videoPause() {
      if (this.hls) {
        this.$refs.video.pause()
        this.hls.destroy()
        this.hls = null
      }
    },
    getVideo() {
      if (Hls.isSupported()) {
        this.hls = new Hls()
        this.hls.loadSource('/video/hls/03428523304647470101_src.m3u8')
        this.hls.attachMedia(this.$refs.video)
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('加载成功')
          this.$refs.video.play()
        })
        this.hls.on(Hls.Events.ERROR, (event, data) => {
          console.log('加载失败')
        })
      }
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
  position: fixed
}
.video-center {
    position: fixed;
    top: 45%;
    left: 50%;
    background-color: #101720;
    width: 100%;
    position: absolute;
    /* padding-bottom: 76%; */
    -webkit-transform: translateX(-50%) translateY(-50%);
}
.video-content{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #101720;
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
