import { sha1 } from 'sha1'
import wx from 'jweixin-module'
import axios from '../utils/axios'
import { getToken } from './auth'

class Wechat {
  constructor() {
    this.ticket = ''
    this.time = ''
    // 获取微信ticket
    axios({
      url: 'http://beta.zfiot.ctjt.cn/api/wechat/getTicket',
      method: 'get',
      headers: { 'token': getToken() }
      // params: {
      //   token: cookieData("get", "token")
      // }
    }).then((res) => {
      if (res.data.status === 200) {
        // this.getWeChat(res.data.data.ticket, res.data.data.timestamp)
        this.ticket = res.data.data.ticket
        this.time = res.data.data.timestamp
      }
    }).catch(() => {
    })
  }
  initConfig() {
    const appId = 'wx1a5337b3e34a02f5'
    // let timestamp = 1585724971524
    const nonceStr = 'Wm3WZYTPz0wzccnW'
    const signature = sha1(
      'jsapi_ticket=' + this.ticket + '&noncestr=' + nonceStr + '&timestamp=' + this.time + '&url=' + location.href.split('#')[0]
    )
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
      appId, // 必填，公众号的唯一标识
      timestamp: this.time, // 必填，生成签名的时间戳
      nonceStr, // 生成签名的随机串
      signature, // 签名
      jsApiList: [
        'getLocation',
        'openLocation'
      ] // 必填，需要使用的JS接口列表
    })
    wx.error(function(res) {
      console.log('jweixin.config配置出错1')
    })
    wx.ready(() => {
      wx.checkJsApi({
        jsApiList: [
          'getLocation',
          'openLocation'
        ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: (res) => {
          // this.$forceUpdate()
          console.log('ready~')
          // this.ticket = ticket
          if (res.errMsg === 'checkJsApi:ok') {
            console.log(`${res} 1111`)
          }
        },
        fail: (res) => {
          console.log(res, 123321)
        }
      })
    })
  }
  navigation({ lat, lon }, name, address) {
    wx.openLocation({
      latitude: lat, // 目的地latitude
      longitude: lon, // 目的地longitude
      name: name,
      address: address,
      scale: 15 // 地图缩放大小，可根据情况具体调整
    })
  }
  location() {
    wx.getLocation({
      success(res) {
        this.navigation({ lat: res.latitude, lon: res.longitude }, '测试', '潮庭集团')
      },
      cancel(res) {
        console.log(res)
      }
    })
  }
}

export { Wechat }
