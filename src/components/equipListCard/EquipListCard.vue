<template>
  <div class="equipListCard">
    <!-- 标题 start -->
    <div class="equipListCard-header">
      <div class="equipListCard-title">
        {{ equipListData.equipName }}
      </div>
      <div class="equipListCard-state">
        <EquipStatus :electricity="equipListData.equipPower" :signal="equipListData.equipSignal" :status="equipListData.onlineType" />
      </div>
    </div>
    <!-- end -->

    <!-- 内容 start -->
    <div class="equipListCard-content">
      <div class="equipListCard-content-row">
        <div class="equipListCard-content-row-name">
          {{ equipListData.imei }}
          <div class="equipListCard-type">
            {{ equipListData.equipTypeName }}
          </div>
        </div>
        <a @click.stop="callPhone(equipListData.placeId)">
          <img src="@/assets/images/equip/phone.png" alt="" class="equipListCard-content-row-icon">
        </a>
      </div>
      <div class="equipListCard-content-row">
        <div class="equipListCard-content-row-name">
          <span class="equipListCard-content-row-place-name" @click.stop="showDetail(equipListData.placeId)">
            {{ equipListData.placeName }}
          </span>
        </div>
        <img src="@/assets/images/equip/navigation.png" alt="" class="equipListCard-content-row-icon" @click.stop="showLocation()">
      </div>
    </div>
    <!-- end -->
  </div>
</template>

<script>
import EquipStatus from 'cmp/equipStatus/EquipStatus'
import Api from '@/api/placeResource/placeResource'
import WechatApi from '@/api/wechat'
import wx from 'weixin-js-sdk'
import sha1 from 'sha1'
import { mapGetters } from 'vuex'

export default {
  components: {
    EquipStatus
  },

  props: {
    equipListData: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      equipStatus: {
        wifi: 'red',
        electricity: 'yellow',
        statusName: '正常'
      }
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
  },
  methods: {
    // async showLocation() {
    //   const res = await WechatApi.getWechatToken()
    //   await this.getWeChat(res.data.ticket, res.data.timestamp)
    //   setTimeout(() => {
    //     wx.openLocation({
    //       latitude: 39.87803, // 纬度，浮点数，范围为90 ~ -90
    //       longitude: 116.19025, // 经度，浮点数，范围为180 ~ -180。
    //       name: '谢志林老巢', // 位置名
    //       address: '谢志林作案根据地', // 地址详情说明
    //       scale: 1, // 地图缩放级别,整型值,范围从1~28。默认为最大
    //       infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    //     })
    //   }, 1000)
    // },
    // getWeChat(ticket, time) {
    //   const appId = 'wx1a5337b3e34a02f5'
    //   // let timestamp = 1585724971524
    //   const nonceStr = 'Wm3WZYTPz0wzccnW'
    //   const signature = 'b4103540feb131b57e0fd9fb0f75be12ce41f251'
    //   // sha1(
    //   //   'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + time + '&url=' + 'http://zfiot.ctjt.cn/'
    //   //   // 'jsapi_ticket=HoagFKDcsGMVCIY2vOjf9i3IF-shbDKKVLpdbBVlpLBzTrYaS87ejfq89tDIqD9rTBjtOPEliZvbYY5pGYJYRQ&noncestr=Wm3WZYTPz0wzccnW&timestamp=1618824131&url=http://zfiot.ctjt.cn'
    //   // )

    //   wx.config({
    //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
    //     appId, // 必填，公众号的唯一标识
    //     timestamp: '1618879102', // 必填，生成签名的时间戳
    //     nonceStr, // 生成签名的随机串
    //     signature, // 签名
    //     jsApiList: [
    //       'openLocation',
    //       'getLocation',
    //       'scanQRCode'
    //     ] // 必填，需要使用的JS接口列表
    //   })
    //   wx.error(function(res) {
    //   })
    //   wx.ready(() => {
    //     wx.checkJsApi({
    //       jsApiList: [
    //         'openLocation',
    //         'getLocation',
    //         'scanQRCode'

    //       ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //       success: (res) => {
    //         // this.$forceUpdate()
    //         this.ticket = ticket
    //         if (res.errMsg === 'checkJsApi:ok') {
    //         }
    //       },
    //       fail: (res) => {
    //       }
    //     })
    //   })
    // },
    /**
     * 拨号
     */
    async  callPhone(e) {
      const res = await Api.placeResourceDetail(e)
      if (res.code === 200) {
        const result = res.data
        window.location.href = 'tel://' + result.phone
      }
    },
    /**
     * 显示详情
     */
    showDetail(e) {
      this.$router.push({
        path: '/placeResourceDetail',
        query: {
          placeId: e
        }
      })
    }
  }
}
</script>

<style src='./EquipListCard.css'>

</style>
