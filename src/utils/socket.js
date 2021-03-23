/* eslint-disable no-unused-vars */
const requestPath = 'wss://beta.zhgtwx.ctjt.cn/ws'

import Stomp from 'stompjs'
// import localData from './local'
import { cookieData, localData } from './local'

const channel = []
let socket = null
let requestList = []
const newTopicList = []
let connet = false
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
  async initSocket(channelNameList) {
    if (socket !== null) {
      requestList.forEach(item => {
        console.log('已经订阅', item.id)
        socket.unsubscribe(item.id)
      })
    }
    // 先识别对应的频道
    await this.identificationOfTheChannel(channelNameList)
    console.log('初始化频道', channelNameList)
    // 我们的socket是socket包装的websocket 所以用Stomp.over(socket)
    // 如果是原生的就用Stomp.client(url)
    if (socket !== null) {
      console.log('socket!==null')
      if (!connet) {
        setTimeout(() => {
          this.onConnected()
        }, 2000)
      } else {
        this.onConnected()
      }
    } else {
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
    }
  }
  /**
   * 连接成功回调函数
   */
  async onConnected() {
    // 订阅频道
    // .depart_id
    // 非正式版本下，加test-
    let topic = ''
    connet = true
    console.log('频道集合', requestList)
    requestList.forEach(item => {
      if (item.topicName === 'realTimeWarning') {
        topic = '/exchange/aiot-event-message/' + '12345678'
      } else if (item.topicName === 'realTimeStatistics') {
        topic = '/exchange/aiot-counting-message/' + '12345678'
      }
      item['id'] = socket.subscribe(topic, (msg) => {
        item.refsList.forEach(item => {
          console.log('分发通知', item)
          item.dom.onMessage(JSON.parse(msg.body))
        })
      }).id
    })
  }

  onFailed(frame) {
    console.log('订阅失败')
    setTimeout(() => {
      Socket.initSocket()
    }, 2000)
  }

  responseCallback(frame) {
    // 接收消息处理
    console.log('订阅成功', frame)
  }

  /**
   * 识别频道
   * @param {*} channelName
   */
  identificationOfTheChannel(channelName, ref) {
    if (requestList.length > 0) {
      channelName.forEach(cItem => {
        const rTemp = requestList.filter(rItem =>

          rItem.topicName === cItem.topicName
        )
        console.log('有匹配项？', rTemp, requestList)
        if (rTemp.length > 0) {
          cItem.refsList.forEach(ccItem => {
            const rrTemp = rTemp[0].refsList.filter(rItem =>

              rItem.domName === ccItem.domName
            )
            if (rrTemp.length === 0) {
              console.log('判断dom是否相等', rrTemp)
              rTemp[0].refsList.push(ccItem)
            }
          })
        } else {
          requestList.push(cItem)
        }
      })
      console.log('频道合并', requestList)
    } else {
      requestList = channelName
    }
  }
  unsubscribe(domName) {
    requestList.forEach((item, index) => {
      item.refsList.forEach((ref, refindex) => {
        if (ref.domName === domName) {
          console.log('删除', item.refsList)
          item.refsList.splice(refindex)
          if (item.refsList.length === 0) {
            requestList.splice(index)
          }
        }
      })
    })
    console.log('删除后输出', requestList)
  }
}

export default new Socket()
