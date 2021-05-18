let requestPath = 'wss://beta.zhgtwx.ctjt.cn/ws'

import Stomp from 'stompjs'
import DepartApi from '@/api/placeResource/placeResource'
import { getToken, setUserInfo } from '@/utils/auth'

let socket = null
// 频道列表
let requestList = []
// 连接状态
let connet = false
// 辖区列表
let departList = []
/*
 *初始化socket
 */
class Socket {
  constructor() {
    if (`${process.env.NODE_ENV}` === 'development') {
      requestPath = 'ws://server12.ctjt.cn:15654/ws'
      this.accountName = 'webclient'
      this.passWord = 'webclient'
    } else {
      requestPath = 'wss://aiot.rabbitmq.ctjt.cn/ws'
      this.accountName = 'webclient'
      this.passWord = 'webclient'
    }
  }

  /**
   * 初始化socket
   * @param {*} channelNameList
   */
  async initSocket(channelNameList) {
    if ((departList.length < 1 || !departList) && getToken) {
      const res = await DepartApi.departList()
      if (res.code === 200) {
        departList = res.data
      }
    }
    // 如果socket已经已经创建那就把之前订阅的频道先取消订阅，这一步需要在处理传入频道数组对象之前，因为处理之后会把已存的频道数组对象的频道id覆盖掉
    if (socket !== null) {
      requestList.forEach(item => {
        // 频道退订
        socket.unsubscribe(item.id)
      })
    }
    // 处理频道数组对象
    await this.identificationOfTheChannel(channelNameList)
    // 我们的socket是socket包装的websocket 所以用Stomp.over(socket)
    // 如果是原生的就用Stomp.client(url)
    if (socket !== null) {
      // 如果没连接上那就两秒之后再连接，如果连接上就直接连接
      if (!connet) {
        setTimeout(() => {
          this.onConnected()
        }, 2000)
      } else {
        this.onConnected()
      }
    } else {
      // 初始化socket
      socket = new WebSocket(requestPath)
      socket = Stomp.over(socket)
      // 发送频率
      socket.heartbeat.outgoing = 1
      // 接收频率
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
    let topic = ''
    connet = true
    requestList.forEach(item => {
      departList.forEach(departItem => {
        // 事件频道
        if (item.topicName === 'realTimeWarning') {
          topic = '/exchange/aiot-event-message/' + departItem.departId
          // 数量频道
        } else if (item.topicName === 'realTimeStatistics') {
          topic = '/exchange/aiot-counting-message/' + departItem.departId
        }
        // 向后台发起频道订阅，将订阅回调的id存入对应的频道，当其他dom接入的时候需要根据频道id去去掉订阅对应的频道
        item['id'] = socket.subscribe(topic, (msg) => {
        // 事件回调触发 => 给对应频道的dom节点分发信息
          item.refsList.forEach(item => {
            item.dom.onMessage(JSON.parse(msg.body))
          })
        }).id
      })
    })
  }

  /**
   *
   * 失败回调函数
   * @param {*} frame
   */
  onFailed(frame) {
    // setTimeout(() => {
    Socket.initSocket(requestList)
    // }, 2000)
  }

  /**
   * 识别频道，对传入频道和已存频道进行匹配处理
   * @param {*} channelName 传入频道
   */
  identificationOfTheChannel(channelName, ref) {
    // 如果已存频道数组不为空，则需要提取传入频道的新增频道，或者是已存频道的新增dom订阅者
    if (requestList.length > 0) {
      channelName.forEach(cItem => {
        // 遍历两个数组，找出相同频道名称的对象，返回形式为数组
        const rTemp = requestList.filter(rItem =>
          rItem.topicName === cItem.topicName
        )
        // 如果匹配项不为空
        if (rTemp.length > 0) {
          // 需要遍历频道名称相同的对象的dom订阅着数组的相同项
          cItem.refsList.forEach(ccItem => {
            const rrTemp = rTemp[0].refsList.filter(rItem =>
              rItem.domName === ccItem.domName
            )
            // 如果有新增的dom订阅着
            if (rrTemp.length === 0) {
              // 则新增到对应的频道对象的dom订阅着数组里面
              rTemp[0].refsList.push(ccItem)
            } else {
              // 如果有订阅着名称相同，则需要更新对应名字的dom对象
              rTemp[0].refsList.forEach(item => {
                if (item.domName === ccItem.domName) {
                  item.dom = ccItem.dom
                }
              })
            }
          })
        } else {
          // 如果传入频道数组和已存频道数组没匹配项，就直接新增
          requestList.push(cItem)
        }
      })
    } else {
      // 如果已存频道为空，那就直接新增
      requestList = channelName
    }
  }
  /**
   * 退订频道函数 （页面推出调用此方法删除对应的订阅dom对象）
   * @param {*} domName
   */
  unsubscribe(domName) {
    requestList.forEach((item, index) => {
      item.refsList.forEach((ref, refindex) => {
        if (ref.domName === domName) {
          item.refsList.splice(refindex)
          // 如果删除dom订阅者对象后，订阅数组为空，直接删除这个频道
          if (item.refsList.length === 0) {
            requestList.splice(index)
          }
        }
      })
    })
  }
}

export default new Socket()
