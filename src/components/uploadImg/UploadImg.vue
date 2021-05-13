
<template>
  <!-- 上传图片 -->
  <div class="uploadImg">
    <div v-for="(item ,index) in uploadImg" :key="index" class="img-item" @click="showImg(index)">
      <div class="delete-img-icon" @click.stop="deleteImg(index)">
        ×
      </div>
      <img :src="item.imgUrl" alt="" class="img">
    </div>

    <div v-if="uploadImg.length < 6" class="img-item" @click="choiceImg">
      <img src="@/assets/images/equip/add.png" alt="" class="add-img">
      上传照片
    </div>
    <input
      id="file"
      ref="choice"
      type="file"
      accept="image/*"
      @change="getPicture($event)"
    >
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import WaterMarkProcessing from '@/utils/waterMarkProcessing'

export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: {
    waterMarkInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      uploadImg: []
    }
  },
  methods: {
    deleteImg(index) {
      this.uploadImg.splice(index, 1)
      this.$emit('getImgList', this.uploadImg)
    },
    async getPicture(e) {
      // 预览图片
      const wm = new WaterMarkProcessing()
      const isImg = e.target.files[0].type === 'image/jpeg'
      const isLt2M = e.target.files[0].size / 1024 / 1024 < 4
      if (!isImg) {
        this.$Toast.fail({
          message: '上传图片只能是 JPG 格式!',
          type: 'fail',
          duration: 3000
        })
        return false
      }
      if (!isLt2M) {
        this.$Toast.fail({
          message: '上传图片大小不能超过 3MB!',
          type: 'fail',
          duration: 3000
        })
        return false
      }
      const imgFile = await wm.addWaterMark(e.target.files[0], this.waterMarkInfo)

      this.uploadImg.push({ file: imgFile.dUrl, imgUrl: window.URL.createObjectURL(imgFile.dUrl) })
      this.$emit('getImgList', this.uploadImg)
      // 将图片文件转化成base64格式图片
      var reader = new FileReader()
      reader.onload = (e) => {
        // e.target.result  就是从本地读取的图片的base64格式,将它上传给服务器即可
        // 使用axios的post方法上传即可
      }
      reader.readAsDataURL(e.target.files[0])
    },
    choiceImg() {
      this.$refs.choice.click()
    },
    showImg(e) {
      const imgList = this.uploadImg.map(item => item.imgUrl)
      ImagePreview({
        images: imgList,
        startPosition: e
      })
    }
  }
}
</script>

<style scoped>
.uploadImg{
  width: 100%;
  height: auto;
  margin-left: 25px
}
.img-item{
  width: 79px;
  height: 79px;
  float: left;
  margin-right: 14px;

  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
  text-align: center;
  line-height: 34px;
  margin-top: 13px;
  border: 1px solid #4D628F;
}
.delete-img-icon{
  width: 12px;
  height: 12px;
  line-height: 9px;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(89, 109, 155, 1);
  position: relative;
  top: -5px;
  z-index: 99;
  left: 73px;
}
.add-img{
  width: 28%;
  height: 28%;
  margin-left: 27.5px;
  margin-top: 19px;
  display: block;
}
input {
  /* 隐藏默认的"打开文件"样式 */
  display: none;
}
.img{
  height: 100%;
  width: 100%;
  position: relative;
  top: -12px;
}
</style>
