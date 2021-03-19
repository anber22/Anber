/* eslint-disable no-unused-vars */
const requestPath = 'wss://beta.zhgtwx.ctjt.cn/ws'

import Stomp from 'stompjs'
// import localData from './local'
import { cookieData, localData } from './local'

let channel = []
let socket = null
/*
 *初始化socket
 */

class Socket {
  constructor() {
    if (`${process.env.NODE_ENV}` === 'development') {
      this.accountName = 'webclient'
      this.passWord = 'webclient'
    } else {
      this.accountName = 'webclient'
      this.passWord = 'webclient'
    }
  }

  /**
   * 初始化socket
   * @param {*} channelName
   */
  initSocket(channelName) {
    // 先识别对应的频道
    this.identificationOfTheChannel(channelName)
    if (channel === []) { return '' }

    // 我们的socket是socket包装的websocket 所以用Stomp.over(socket)
    // 如果是原生的就用Stomp.client(url)
    console.log('开始连接')
    socket = new WebSocket(requestPath)
    socket = Stomp.over(socket)
    // socket = Stomp.client(requestPath)
    // 发送频率
    socket.heartbeat.outgoing = 1
    // 接受频率
    socket.heartbeat.incoming = 0
    // 发起连接
    socket.connect(this.accountName, this.passWord, this.onConnected, this.onFailed)
    // return onConnected
  }

  /**
   * 连接成功回调函数
   */
  onConnected() {
    // 订阅频道
    // .depart_id
    // 非正式版本下，加test-
    const topic = channel
    console.log('连接成功！', topic)
    socket.subscribe(topic, (msg) => {
      console.log('msgggg', typeof msg.body)
      const temp = JSON.parse(msg.body)
      console.log('msg-----------', temp)
      if (JSON.parse(msg.body)) {
        if (JSON.parse(msg.body)) {
          console.log('refresh === 1', msg.body)
        }
      }
    })

    // return responseCallback
    // const topic =
    //   "/exchange/notice_exchange_fanout/test-" +
    //   localData("get", "getUserInfo").id;
    // this.ws.subscribe(topic, this.responseCallback, this.onFailed);
  }

  /**
   * 失败回调函数
   * @param {*} frame
   */
  onFailed(frame) {
    console.log('订阅失败')
    setTimeout(() => {
      this.initSocket()
    }, 2000)
  }

  responseCallback(frame) {
    // 接收消息处理
    console.log('订阅成功', frame)
    if (JSON.parse(frame.body)) {
      if (JSON.parse(frame.body).refresh === 1) {
        this.getListData()
      } else {
        this.getListData()
        this.showJ = true
        this.audio = document.getElementById('audio')
        this.audio.play()
      }
    }
  }

  /**
   * 识别频道
   * @param {*} channelName
   */
  identificationOfTheChannel(channelName) {
    if (channelName === 'equipCount') {
      channel =
          '/exchange/aiot-event-message/' +
          '12345678'
    } else if (channelName === 'branchesCount') {
      return
    } else if (channelName === 'singleVideo') {
      return
    }
  }
}

export default new Socket()
