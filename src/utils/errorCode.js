class ErrorCode {
  constructor() {
    this.BadRequest = 400
    this.Unauthorized = 401
    this.Forbidden = 403
    this.NotFound = 404
    this.MethodNotAllowed = 405
    this.RequestTimeOut = 408
    this.InternalServerError = 500
    this.ServiceUnavailable = 503
    this.GatewayTimeOut = 504
    this.HTTPVersionNotSupported = 505
  }

  getMessage(code) {
    if (this.BadRequest === code) {
      return '操作失败'
    }
    if (this.Unauthorized === code) {
      return '登录超时，请重新登录'
    }
    if (this.Forbidden === code) {
      return '拒绝访问'
    }
    if (this.NotFound === code) {
      return '网络资源无法访问'
    }
    if (this.MethodNotAllowed === code) {
      return '请求方法不支持'
    }
    if (this.RequestTimeOut === code) {
      return '请求超时，请稍后重试'
    }
    if (this.InternalServerError === code) {
      return '服务器内部错误'
    }
    if (this.ServiceUnavailable === code) {
      return '服务不可用'
    }
    if (this.GatewayTimeOut === code) {
      return '网关超时'
    }
    if (this.HTTPVersionNotSupported === code) {
      return 'HTTP版本不受支持'
    }
  }
}

export default new ErrorCode()
