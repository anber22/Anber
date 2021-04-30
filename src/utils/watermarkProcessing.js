export default class WatermarkProcessing {
  /**
   * 给图片加上水印
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

        const fontHeight = imageHeight
        const fontWidth = imageWidth

        // 字体对其方式
        context.textAlign = 'left'
        context.textBaseline = 'middle'
        // 字体样式 字体粗体 字体大小/间距 字体包
        context.font = 'normal bold 23px/20px arial,sans-serif'
        // 字体颜色
        context.fillStyle = '#3cea04'
        // 文字的内容 开始宽度 开始高度
        context.fillText('2021-04-27', fontWidth * 0.03, fontHeight * 0.95 - 90)
        context.fillText('港湾一号湾9 401', fontWidth * 0.03, fontHeight * 0.95 - 60)
        // 北纬
        context.fillText('北纬: ' + parseFloat(39.916527).toFixed(4), fontWidth * 0.03, fontHeight * 0.95 - 30)
        // 东经
        context.fillText('东经: ' + parseFloat(116.397128).toFixed(4), fontWidth * 0.03, fontHeight * 0.95)

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
