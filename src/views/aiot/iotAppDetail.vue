<template>
  <div class="iotApp-detail">
    <van-tabs v-model="active" swipeable color="#06F0FE" title-active-color="#06F0FE" title-inactive-color="#8BA3C2" background="rgba(16, 23, 32, 1)" sticky ellipsis @change="tabChange">
      <van-tab v-for="item in tabList" :key="item.index" :title="item.title" class="tab-content" />
    </van-tabs>
    <!-- 设备信息 start -->
    <div v-show="active===0">
      <div class="iotApp-detail-title">
        <img src="@/assets/images/home/title-icon.png" alt="" class="iotApp-detail-title-icon">
        设备信息
      </div>
      <InfoRow v-for="(rowItem,index) in rowList" :key="index" :info-data="rowItem" class="detail-info" />
    </div>
    <!-- end -->
    <!-- 实时数据 || 实时监控 start -->
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
          实时数据
          <div class="refresh" @click="getEnvironmentRealTime()">
            <img src="@/assets/images/equip/refresh.png" alt="" class="refresh-img">
            刷新
          </div>
        </div>
        <InfoRow v-for="(rowItem,index) in realTimeRows" :key="index" :info-data="rowItem" class="realtime-data" />
      </div>
    </div>
    <!-- end -->
    <!-- 绑定日志 start -->
    <div v-show="active===2">
      <div class="iotApp-detail-title">
        <img src="@/assets/images/home/title-icon.png" alt="" class="iotApp-detail-title-icon">
        绑定日志
      </div>
      <BindingLog v-if="logData.length>0" :log-data="logData" />
      <img src="@/assets/images/public/nothing.png" alt="" class="log-nothing-img">
      <div class="log-nothing-content">
        无匹配项
      </div>
    </div>
    <!-- end -->
  </div>
</template>

<script>

import InfoRow from '@/components/infoRows/InfoRows'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
import VideoPlayer from 'cmp/videoPlayer/VideoPlayer'
import VideoUUID from '@/utils/videoUUID'
import Config from '/config.json'
import BindingLog from 'cmp/bindingLog/BindingLog'
import DateFormat from '@/utils/dateTransformation'

import Api from '@/api/aiot/iotApp.js'
export default {
  name: 'EquipDeail',
  components: {
    InfoRow,
    VideoPlayer,
    BindingLog
  },

  data() {
    return {
      active: 0, // tab当前选中下标
      tabList: [ // tab
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
      playerOptions: { // 播放器配置选项
        autoplay: true,
        controls: true,
        muted: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        }
      },
      rowList: [], // 设备详细信息
      equipId: 0, // 设备id
      equipInfo: {}, // 设备信息
      systemId: 0, // 当前设备所属系统id
      realTimeRows: [], // 实时数据行
      logData: [] // 日志信息
    }
  },
  computed: {
    player() {
      return this.$refs.equipDetailVideoPlayer.player
    }
  },
  mounted() {
    this.equipId = this.$route.query.id
    this.systemId = Number(this.$route.query.systemId)
    this.getEquipDetailInfo()
  },
  methods: {
    /**
     * 跳转编辑页面
     */
    toeEdit() {
      this.$router.push({
        path: '/editEquip',
        query: {
          equipId: this.equipId
        }
      })
    },
    /**
     * 切换tab
     */
    tabChange(e) {
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
          content: equipDetailInfo.platformName,
          typed: 'info'
        }
      ]
      this.equipInfo = equipDetailInfo
      // 查询日志列表，暂时不做， 不能删
      // const bindingRes = await Api.bindingLogList(this.equipInfo.imei)
      // if (bindingRes.code === 200) {
      //   const bindingList = bindingRes.data.list
      //   const dataTran = new DateFormat()

      //   bindingList.forEach(item => {
      //     const dateTime = dataTran.dataFormatStamp(item.createdTime)
      //     //  dataTran.dataFormat(1619392568000)
      //     this.logData.push({ date: dateTime.slice(0, 10), time: dateTime.slice(10, 19), editType: item.operationType, createdName: item.workerName, placeName: item.placeName })
      //   })
      // }

      if (this.systemId === 5 || this.systemId === 11) {
        if (this.systemId === 11) {
          const detailRes = await Api.towerRealTimeInfo(this.equipId)
          let realDate = {}
          if (detailRes.code === 200) {
            realDate = { ... detailRes.data }
          }
          this.realTimeRows = [
            {
              name: '回旋角度:',
              content: realDate.turningAngle === null ? '--' : realDate.turningAngle,
              typed: 'info'
            }, {
              name: '幅度:',
              content: realDate.amplitude === null ? '--' : realDate.amplitude,
              typed: 'info'
            }, {
              name: '吊钩高度:',
              content: realDate.hookHeight === null ? '--' : realDate.hookHeight,
              typed: 'info'
            }, {
              name: '吊重:',
              content: realDate.currentHoisting === null ? '--' : realDate.currentHoisting,
              typed: 'info'
            }, {
              name: '安全吊重:',
              content: realDate.safetyHoisting === null ? '--' : realDate.safetyHoisting,
              typed: 'info'
            }, {
              name: '力矩百分比:',
              content: realDate.torquePrecentage === null ? '--' : realDate.torquePrecentage,
              typed: 'info'
            }, {
              name: '风速:',
              content: realDate.windSpeed === null ? '--' : realDate.windSpeed,
              typed: 'info'
            }, {
              name: '塔机倾斜角度:',
              content: realDate.tiltAngle === null ? '--' : realDate.tiltAngle,
              typed: 'info'
            }, {
              name: '塔机方向:',
              content: realDate.towerDirection === null ? '--' : realDate.towerDirection,
              typed: 'info'
            }, {
              name: '吊绳倍率:',
              content: realDate.humidity === null ? '--' : realDate.humidity,
              typed: 'info'
            }
          ]
        }
        let source, videoUrl
        if (Reflect.has(Config, 'videoUrl')) {
          videoUrl = Config.videoUrl
        }
        if (VideoUUID.match(this.equipInfo.imei)) {
          source = videoUrl + '/mag/hls/' + VideoUUID.match(this.equipInfo.imei) + '/0/live.m3u8'
        }
        this.playVideo(source)
      } else if (this.systemId === 10) {
        this.getEnvironmentRealTime()
      }
    },
    onPlayerPlay(player) {
      this.player.play()
    },
    onPlayerReady(player) {
      this.player.play()
    },
    // 环境监测实时数据
    async getEnvironmentRealTime() {
      let realDate = {}
      const detailRes = await Api.environmentRealTimeData(this.equipId)

      if (detailRes.code === 200) {
        realDate = { ... detailRes.data }
      }
      this.realTimeRows = [
        {
          name: '雨量:',
          content: realDate.rainFall === null ? '--' : realDate.rainFall,
          typed: 'info'
        }, {
          name: '风速:',
          content: realDate.windSpeed === null ? '--' : realDate.windSpeed,
          typed: 'info'
        }, {
          name: '风向:',
          content: realDate.windDirection === null ? '--' : realDate.windDirection,
          typed: 'info'
        }, {
          name: '温度:',
          content: realDate.temperature === null ? '--' : realDate.temperature,
          typed: 'info'
        }, {
          name: '湿度:',
          content: realDate.humidity === null ? '--' : realDate.humidity,
          typed: 'info'
        }
      ]
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
  }
}
</script>

<style >
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
  margin-bottom: 10px;
  color: white;
}
.demo-carousel{
  width: 83%;
  height: 237px;
   margin-left: 8.5%;
}
.demo-carousel .vjs-custom-skin .video-js {
  width: 100% !important;
  height: 74%;
}
.realtime-data{
  width: 70%;
}

.detail-info{
  widows: 100%;
}
.log-nothing-img{
  width: 90px;
  height: 85px;
  vertical-align: middle;
  margin-top: 50%;
  margin-left: 40%;
}
.log-nothing-content{
  width: 78%;
  height:auto;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
  margin-left: 6%;
  margin-top: 2%;
  margin-left: 42%;
}
.refresh{
  height: 28px;
  line-height: 28px;
  margin-right: 12px;
  float: right;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #06F0FE;
}
.refresh-img{
  width: 13px;
  height: 13px;
}
</style>
