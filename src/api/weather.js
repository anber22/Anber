
import request from '@/utils/request'

class Weather {
  //  获取天气
  async getWeather(param, ip) {
    return await request({
      url: `/weather/api?appid=${param.appid}&appsecret=${param.appsecret}&version=v6&vue=1&ip=${ip}`,
      method: 'get'
    })
  }
}
export default new Weather()
