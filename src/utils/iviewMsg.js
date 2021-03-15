import { Message } from 'view-design'

class IviewMsg {
  msgFun(msg) {
    Message.error({
      content: msg,
      background: true,
      duration: 1
    })
  }
}

export default IviewMsg
