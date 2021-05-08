export default class WatermarkProcessing {
  /**
   * 图片加水印
   * @param {*} file
   * @returns
   */
  addWaterMark(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      // new 一个FileReader之后用readAsDataURL
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

        context.drawImage(image, 0, 0, imageWidth, imageHeight)

        // const fontHeight = imageHeight
        // const fontWidth = imageWidth

        // 字体对其方式
        context.textAlign = 'left'
        context.textBaseline = 'middle'

        const my_gradient = context.createLinearGradient(0, 0, 90, 0)

        my_gradient.addColorStop(0, '#76F5FC')

        my_gradient.addColorStop(1, '#83B9EF')

        // 网点背景
        context.fillStyle = my_gradient
        context.fillRect(10, imageHeight - 126, imageWidth * 0.2, imageWidth * 0.2 * 0.333)
        context.globalAlpha = 0.7
        // 详细信息背景
        context.fillStyle = '#707070'
        context.fillRect(10, imageHeight - 90, imageWidth * 0.5, imageWidth * 0.5 * 0.333)

        context.strokeStyle = '#707070'
        context.strokeRect(10, imageHeight - 90, imageWidth * 0.5, imageWidth * 0.5 * 0.333)

        // 字体样式 字体粗体 字体大小/间距 字体包
        context.font = 'normal bold ' + imageWidth / 375 * 15 + 'px/20px PingFang SC,sans-serif'
        // 字体颜色
        context.shadowColor = '#1F1E1E'
        context.shadowBlur = 10
        context.shadowOffsetX = 1
        context.shadowOffsetY = 1
        context.fillStyle = 'white'
        context.fillText('港湾一号', 13, imageHeight - (imageHeight / 674 * 146))
        context.shadowOffsetX = 0
        context.shadowOffsetY = 0
        // 文字的内容 开始宽度 开始高度
        context.fillText('2021/04/27', 20, imageHeight - 37)
        context.font = '2px PingFang SC'

        // 上传人
        context.fillText('上传人: 吴亦凡', 115, imageHeight - 70)

        context.font = '10px PingFang SC'
        // 北纬
        context.fillText('经纬度:', 115, imageHeight - 52)
        // 东经
        context.fillText('116.400819, 40.000549', 115, imageHeight - 36)
        // 时间
        context.font = '25px PingFang SC'
        context.fillText('8:00', 20, imageHeight - 67)

        context.beginPath()
        context.moveTo(108, imageHeight - 85)
        context.lineWidth = 2
        context.lineTo(108, imageHeight - 25)
        context.strokeStyle = '#7DF4FA'
        context.stroke()

        // 这里因为需要预览图片, 所以包装一个对象, 都传递出去
        const img = {
          dUrl: canvas.toDataURL('image/jpeg'),
          blob: ''
        }

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
