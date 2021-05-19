import DateTransformation from '@/utils/dateTransformation'

export default class WatermarkProcessing {
  /**
   * 图片加水印
   * @param {*} file
   * @returns
   */
  addWaterMark(file, waterMarkInfo) {
    return new Promise((resolve) => {
      const timestamp = Date.parse(new Date())
      const dateFormat = new DateTransformation()
      const nowDate = dateFormat.dataFormat(timestamp)
      let date = (nowDate + '').slice(0, 10)
      const time = (nowDate + '').slice(11, 16)
      date = date.replace(/-/g, '/')
      const reader = new FileReader()
      // new 一个FileReader之后用readAsDataURL
      const fileName = file.name
      reader.readAsDataURL(file)
      const image = new Image()
      reader.onload = (e) => {
        image.src = e.target.result
      }
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        let imageWidth = 0
        let imageHeight = 0
        if (image.width > image.height) {
          imageWidth = 500
          imageHeight = 500 / image.width * image.height
        } else {
          imageHeight = 500
          imageWidth = 500 / image.height * image.width
        }

        canvas.width = imageWidth
        canvas.height = imageHeight

        const widthPercent = imageWidth / 500

        context.drawImage(image, 0, 0, imageWidth, imageHeight)

        // 字体对其方式
        context.textAlign = 'left'
        context.textBaseline = 'middle'

        const my_gradient = context.createLinearGradient(0, 0, 90, 0)

        my_gradient.addColorStop(0, '#76F5FC')

        my_gradient.addColorStop(1, '#83B9EF')

        // 网点背景
        context.fillStyle = my_gradient
        context.fillRect(10, imageHeight - (136 * widthPercent), imageWidth * 0.2 + (waterMarkInfo.placeName.length - 4) * 9, imageWidth * 0.2 * 0.333)
        context.globalAlpha = 0.7
        // 详细信息背景
        context.fillStyle = '#707070'
        context.fillRect(10, imageHeight - (90 * widthPercent), imageWidth * 0.5, imageWidth * 0.5 * 0.333)

        context.strokeStyle = '#707070'
        context.strokeRect(10, imageHeight - (90 * widthPercent), imageWidth * 0.5, imageWidth * 0.5 * 0.333)

        // 字体样式 字体粗体 字体大小/间距 字体包
        context.font = 'normal bold ' + widthPercent * 16 + 'px/20px PingFang SC,sans-serif'
        // 字体颜色
        context.shadowColor = '#1F1E1E'
        context.shadowBlur = 10
        context.shadowOffsetX = 1
        context.shadowOffsetY = 1
        context.fillStyle = 'white'
        context.fillText(waterMarkInfo.placeName, 19, imageHeight - (119 * widthPercent))
        context.shadowOffsetX = 0
        context.shadowOffsetY = 0
        // 文字的内容 开始宽度 开始高度
        context.fillText(date, 16, imageHeight - (29 * widthPercent))
        context.font = widthPercent * 12 + 'px PingFang SC'

        // 上传人
        context.fillText('上传人:' + waterMarkInfo.managerName, 142 * widthPercent, imageHeight - (widthPercent * 70))

        // 经纬度
        context.fillText('经纬度:', 142 * widthPercent, imageHeight - (widthPercent * 48))

        if (waterMarkInfo.lat && waterMarkInfo.lat) {
          context.fillText(waterMarkInfo.lat + ',' + waterMarkInfo.lat, 142 * widthPercent, imageHeight - (widthPercent * 26))
        } else {
          context.fillText('暂无坐标', 142 * widthPercent, imageHeight - (widthPercent * 26))
        }

        // 时间
        context.font = widthPercent * 35 + 'px PingFang SC'
        context.fillText(time, 16, imageHeight - (64 * widthPercent))

        context.beginPath()
        context.moveTo(127 * widthPercent, imageHeight - (widthPercent * 79))
        context.lineWidth = 2
        context.lineTo(127 * widthPercent, imageHeight - (widthPercent * 19))
        context.strokeStyle = '#7DF4FA'
        context.stroke()

        // 这里因为需要预览图片, 所以包装一个对象, 都传递出去

        const img = {
          dUrl: canvas.toDataURL('image/jpeg'),
          blob: ''
        }
        // 将canvas生成出来的base64图片转换成文件
        var arr = img.dUrl.split(',')
        var mime = arr[0].match(/:(.*?);/)[1]
        var bstr = atob(arr[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        var file = new File([u8arr], fileName, { type: mime })
        img.dUrl = file
        // blob这里是异步的, 但是又不支持 async/await, 所以用 Promise
        const blob = new Promise((resolve, reject) => {
          canvas.toBlob((blob) => {
            blob.lastModifiedDate = new Date()
            resolve(blob)
          }, 'image/jpeg')
        })
        blob.then(res => {
          img.blob = res
          resolve(img)
        })
      }
    })
  }
}
