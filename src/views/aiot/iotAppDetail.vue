<template>
  <div class="iotApp-detail">
    <van-tabs v-model="active" swipeable color="#06F0FE" title-active-color="#06F0FE" title-inactive-color="#8BA3C2" background="rgba(16, 23, 32, 1)" sticky ellipsis @change="tabChange">
      <van-tab v-for="item in tabList" :key="item.index" :title="item.title" class="tab-content" />
    </van-tabs>
    <div v-show="active===0">
      <div class="iotApp-detail-title">
        <img src="@/assets/images/home/title-icon.png" alt="" class="iotApp-detail-title-icon">
        设备信息
      </div>
      <InfoRow v-for="(rowItem,index) in rowList" :key="index" :data="rowItem" />
    </div>
    <div v-show="active===1">
      <div v-if="systemId === 5 || systemId === 11">
        <div class="iotApp-detail-title">
          <img src="@/assets/images/home/title-icon.png" alt="" class="iotApp-detail-title-icon">
          实时监控
        </div>
        <div class="demo-carousel">
          <VideoPlayer
            ref="equipDetailVideoPlayer"
            class="vjs-custom-skin"
            :options="playerOptions"
            @play="onPlayerPlay($event)"
            @ready="onPlayerReady($event)"
          />
        </div>
      </div>
      <div v-if="systemId===10">
        <div class="iotApp-detail-title">
          <img src="@/assets/images/home/title-icon.png" alt="" class="iotApp-detail-title-icon">
          实时监控
        </div>
        <div class="demo-carousel">
          <VideoPlayer
            ref="equipDetailVideoPlayer"
            class="vjs-custom-skin"
            :options="playerOptions"
            @play="onPlayerPlay($event)"
            @ready="onPlayerReady($event)"
          />
        </div>
      </div>
    </div>
    <div v-show="active===2" style="color:#fff;text-align: center;padding-top: 50px;">
      暂无日志
    </div>
  </div>
</template>

<script>

import InfoRow from '@/components/infoRows/InfoRows'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
import VideoPlayer from 'cmp/videoPlayer/VideoPlayer'
import VideoUUID from '@/utils/videoUUID'
import Config from '/config.json'

import Api from '@/api/aiot/iotApp.js'
export default {
  name: 'EquipDeail',
  components: {
    InfoRow,
    VideoPlayer
  },

  data() {
    return {
      active: 0,
      tabList: [
        {
          index: 0,
          title: '基本信息'
        },
        {
          index: 1,
          title: '实时数据'
        },
        {
          index: 2,
          title: '绑定日志'
        }
      ],
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
      },
      rowList: [],
      equipId: 0,
      equipInfo: {},
      systemId: 0
    }
  },
  computed: {
    player() {
      return this.$refs.equipDetailVideoPlayer.player
    }
  },
  mounted() {
    this.equipId = this.$route.query.id
    this.systemId = this.$route.query.systemId
    this.getEquipDetailInfo()
  },
  methods: {
    /**
     * 跳转编辑页面
     */
    toeEdit() {
      console.log('触发页面事件')
    },
    /**
     * 切换tab
     */
    tabChange(e) {
      // console.log('切换tab', e)
      // console.log('imei', this.equipInfo)
      this.active = e
    },
    /**
     * 获取设备详情
     */
    async getEquipDetailInfo() {
      const res = await Api.equipDtailInfo(this.equipId)

      let equipDetailInfo = {}
      if (res.code === 200) {
        equipDetailInfo = { ...res.data }
      }
      equipDetailInfo = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', equipDetailInfo)
      equipDetailInfo = await ReadTypeNameOnVuex.conversion('platformList', 'platformId', 'platformName', equipDetailInfo)
      console.log('设备详情', equipDetailInfo)
      this.rowList = [
        {
          name: '设备状态:',
          content: {
            equipPower: equipDetailInfo.equipPower,
            equipSignal: equipDetailInfo.equipSignal,
            onlineType: equipDetailInfo.onlineType
          },
          typed: 'status'
        }, {
          name: '设备名称:',
          content: equipDetailInfo.equipName,
          typed: 'info'
        }, {
          name: '设备型号:',
          content: equipDetailInfo.equipModel,
          typed: 'info'
        }, {
          name: '设备类型:',
          content: equipDetailInfo.equipName,
          typed: 'info'
        }, {
          name: 'IMEI码:',
          content: equipDetailInfo.imei,
          typed: 'info'
        },
        {
          name: '所属辖区:',
          content: equipDetailInfo.departName,
          typed: 'info'
        },
        {
          name: '安装位置:',
          content: equipDetailInfo.equipAddress,
          typed: 'info'
        },
        {
          name: '所属网点:',
          content: {
            name: equipDetailInfo.placeName,
            placeId: equipDetailInfo.placeId
          },
          typed: 'place'
        },
        {
          name: '物联网平台:',
          content: 'OneNet',
          typed: 'info'
        }
      ]
      this.equipInfo = equipDetailInfo

      let source, videoUrl
      if (Reflect.has(Config, 'videoUrl')) {
        videoUrl = Config.videoUrl
      }
      if (VideoUUID.match(this.equipInfo.imei)) {
        source = videoUrl + '/mag/hls/' + VideoUUID.match(this.equipInfo.imei) + '/0/live.m3u8'
      }
      // console.log('视频路径', source)
      this.playVideo(source)
    },
    onPlayerPlay(player) {
      this.player.play()
    },
    onPlayerReady(player) {
      this.player.play()
    },
    playVideo(source) {
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source
      }
      console.log('播放器', this.player)
      this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video)
      // this.player.load()
      this.player.play()
    }
  }
}
</script>

<style>
.iotApp-detail{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(16, 23, 32, 1);
}
.tab-content{
  width: 100%;
  height: 100%;
  position: fixed;
  color: white
}
.iotApp-detail-title-icon{
  height: 17px;
  width: 4px;
}
.iotApp-detail-title{
  font-size: 20px;
  margin-left: 8.5%;
  margin-top: 5%;
  color: white;
}
.demo-carousel{

  width: 83%;
  height: 290px;
   margin-left: 8.5%;
}
.demo-carousel .vjs-custom-skin .video-js {
  width: 100% !important;
  height: 100%;
}
</style>
