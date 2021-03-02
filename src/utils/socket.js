const requestPath = 'ws://192.168.1.12:15654/ws'
import Stomp from 'stompjs'
// import localData from './local'
import { cookieData, localData } from './local'

let channel = []
let socket = new WebSocket(requestPath)
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
    // socket = Stomp.over(socket)
    socket = Stomp.client(requestPath)
    // 离线
    socket.heartbeat.outgoing = 1
    // 在线
    socket.heartbeat.incoming = 0
    // 发起连接
    console.log('发起连接')
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
    socket.subscribe(topic, this.responseCallback, this.onFailed)

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
    setTimeout(() => {
      this.initSocket()
    }, 2000)
  }

  /**
   *
   * @param {*} frame
   */
  responseCallback(frame) {
    // 接收消息处理
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
    switch (channelName) {
      case 'equipCount':
        channel =
          '/exchange/notice_exchange_fanout/' +
          (window.location.href.indexOf('/a') === -1 ? 'test-' : '') +
          '11'
        break
      case 'branchesCount':
        break
      case 'singleVideo':
        break
    }
  }
}

export default new Socket()
