<!-- 绑定设备 -->
<template>
  <div class="bind-Equip">
    <!-- 地图 -->
    <div id="container" :style="showContent?'height:calc(100% - 380px)':'height:100%'" />
    <!-- 搜索 -->
    <div class="search">
      <!-- <van-search v-model="searchText" placeholder="请输入搜索关键词" />0 -->
      <input id="address" v-model="searchText" type="text" placeholder="设备安装地址">
    </div>
    <div class="message">
      <div class="message-button" :class="showContent?'down':'top'" @click="showContent=!showContent" />
      <template v-if="showContent">
        <div class="content">
          <!-- 经纬度 -->
          <div class="view-item">
            <div class="">
              <span class="required">*</span>
              <span class="title">经纬度</span>
            </div>
            <div class="item-type">
              <van-form>
                <van-field
                  v-model="location"
                  :rules="[{ required: true, message: '请选择经纬度' }]"
                  placeholder="请选择经纬度"
                  class="item-input"
                  readonly
                />
              </van-form>
            </div>
          </div>
          <!-- IMEI码 -->
          <div class="view-item">
            <div class="">
              <span class="required">*</span>
              <span class="title">IMEI码</span>
            </div>
            <div class="item-type">
              <van-form class="imei">
                <van-field
                  v-model="equipItem.imei"
                  :rules="[{ required: true, message: '请输入IMEI码' }]"
                  class="item-input "
                  placeholder="请输入IMEI码"
                  @keydown.enter="getEquipImei"
                />
              </van-form>
              <img src="@/assets/images/equip/scan.png">
              <div v-if="showErr" class="imei-err">
                {{ imeiErr }}
              </div>
            </div>
          </div>
          <!-- 设备类型 -->
          <div class="view-item">
            <div class="">
              <span class="title">设备类型</span>
            </div>
            <div class="item-type">
              <div class="item-display">
                {{ typeName }}
              </div>
            </div>
          </div>
          <!-- 安装位置 -->
          <div class="view-item">
            <div class="">
              <span class="required">*</span>
              <span class="title">安装位置</span>
            </div>
            <div class="item-type">
              <van-form>
                <van-field
                  v-model="equipItem.address"
                  :rules="[{ required: true, message: '请输入安装位置' }]"
                  class="item-input"
                  placeholder="请输入安装位置"
                  @keydown.enter="onchange(3)"
                />
              </van-form>
            </div>
          </div>
          <!-- 安装照片 -->
          <div class="view-item">
            <div class="">
              <span class="required">*</span>
              <span class="title">安装照片</span>
            </div>
            <div class="equip-img">
              <UploadImg v-if="waterMarkInfo" ref="uploadImg" class="upload-img" :old-img-list="uploadImages" :water-mark-info="waterMarkInfo" @getImgList="getUploadImg" />
            </div>
          </div>
        </div>
        <div class="submit">
          <van-button @click="preserve">
            提交
          </van-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Api from '@/api/placeResource/placeResource.js'
import AMapLoader from '@amap/amap-jsapi-loader'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
import UploadImg from 'cmp/uploadImg/UploadImg'
import Config from '../../../config.json'
export default {
  name: 'BindEquip',
  components: {
    UploadImg
  },
  data() {
    return {
      searchText: '',
      map: null,
      cameraMarker: null,
      showContent: true,
      equipItem: {
        lon: '113.54342',
        lat: '22.26666',
        imei: '',
        equipType: 5,
        address: '',
        equipName: '',
        equipImg: [],
        uploadNames: []
      },
      typeName: '',
      location: '113.54342, 22.26666',
      centerLocation: [113.54342, 22.26666],
      showErr: false,
      imeiErr: '',
      status: false,
      waterMarkInfo: {}, // 水印信息
      uploadStatus: false,
      uploadImages: [], // 已上传图片
      placeId: '', // 网点id
      uploadFailedMsg: '您的', // 上传失败提示
      uploadFailedList: [] // 上传失败图片下标数组
    }
  },
  created() {
    this.status = this.$route.query.status
    if (this.$route.query.placeId) this.placeId = this.$route.query.placeId
    if (this.$route.query.lon) {
      this.location = [this.$route.query.lon, this.$route.query.lat]
      this.equipItem.lon = this.$route.query.lon
      this.equipItem.lat = this.$route.query.lat
    }
    if (window.localStorage.getItem('placeResource')) this.manageResourceInfo()
    this.init()
  },
  methods: {
    /**
     * 画地图
     */
    init() {
      AMapLoader.load({
        key: '42bcf416c74d741ad1241b1a8742e765', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: { // 是否加载 AMapUI，缺省不加载
          version: '1.1', // AMapUI 缺省 1.1
          plugins: [] // 需要加载的 AMapUI ui插件
        },

        Loca: { // 是否加载 Loca， 缺省不加载
          version: '1.3.2' // Loca 版本，缺省 1.3.2
        }
      }).then((AMap) => {
        const _this = this
        // 其他坐标转高德坐标
        AMap.convertFrom(_this.centerLocation, 'gps', function(status, result) {
          if (result.info === 'ok') {
            const lnglats = result.locations // Array.<LngLat>
            _this.centerLocation = [lnglats[0].lng, lnglats[0].lat]
            _this.location = lnglats[0].lng + ',' + lnglats[0].lat
            _this.equipItem.lon = lnglats[0].lng
            _this.equipItem.lat = lnglats[0].lat
            _this.map = new AMap.Map('container', {
              mapStyle: 'amap://styles/e4aa2adc79a5186729bb5cd463d5b1a3', // 地图样式（自定义样式）
              resizeEnable: true, // 是否监控地图容器尺寸变化
              zoom: 17, // 地图显示的缩放级别
              center: _this.centerLocation
            })
            // 地图缩放情况
            _this.map.on('zoomend', () => {
              const zoom = _this.map.getZoom()
            })
            _this.mapAddMarker(AMap)
            AMap.plugin(['AMap.Autocomplete'], () => {
              const auto = new AMap.Autocomplete({
                input: 'address',
                outPutDirAuto: false
              })
              // 搜索框搜索地址
              AMap.event.addListener(auto, 'select', (e) => {
                _this.equipItem.lon = e.poi.location.lng
                _this.equipItem.lat = e.poi.location.lat
                _this.centerLocation = [e.poi.location.lng, e.poi.location.lat]
                _this.location = e.poi.location.lng + ',' + e.poi.location.lat
                _this.map.remove(_this.cameraMarker)
                _this.mapAddMarker(AMap)
              })
            })
          }
        })
      }).catch(e => {
        console.log(e)
      })
    },
    /**
     * 画标注
     */
    mapAddMarker(AMap) {
      this.map.setCenter(this.centerLocation)
      const imgUrl = require('@/assets/images/equip/equip-icon.png')
      this.cameraMarker = new AMap.Marker({
        position: this.centerLocation,
        map: this.map,
        anchor: 'bottom-center',
        icon: new AMap.Icon({
          image: imgUrl, // 图表路径
          size: new AMap.Size(30, 40), // 图标大小
          imageSize: new AMap.Size(30, 40)
        }),
        draggable: true // 图标自由移动
      })
      // 获取图标自由移动结束后的坐标
      this.cameraMarker.on('dragend', (e) => {
        this.equipItem.lon = e.lnglat.lng
        this.equipItem.lat = e.lnglat.lat
        this.centerLocation = [e.lnglat.lng, e.lnglat.lat]
        this.location = e.lnglat.lng + ',' + e.lnglat.lat
      })
      this.map.add(this.cameraMarker)
    },
    /**
     * 获取本地网点水印信息
     */
    manageResourceInfo() {
      const placeResource = JSON.parse(window.localStorage.getItem('placeResource'))
      this.waterMarkInfo = placeResource.waterMarkInfo
    },
    /**
     * 输入框失焦调用
     */
    onchange(inx) {
    },
    /**
     * 根据IMEI查找设备
     */
    async getEquipImei() {
      const res = await Api.equipImei(this.equipItem.imei)
      if (res.code === 200) {
        this.equipItem.equipType = res.data.equipType
        this.equipItem.equipName = res.data.equipName
        let placeResourceDetail = { equipType: res.data.equipType }
        placeResourceDetail = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', placeResourceDetail)
        this.typeName = placeResourceDetail.equipTypeName
        this.showErr = false
      } else {
        this.showErr = true
        this.imeiErr = res.message
      }
    },
    /**
     * 选择图片 责任书
     * @img {*}  图片列表
     * @deleteUri 点击删除图片的uri
     */
    async getUploadImg(img, deleteUri, deleteIndex, images) {
      this.equipItem.equipImg = img
      if (images && this.status) this.uploadDutyimg(images)
      // 如果不是删除图片则传的deleteUri 为空字符
      if (deleteUri.length > 0) {
        // * name 点击删除图片的uri
        // * type 图片类型(2网点图片,3网点责任书,4设备安装图片)
        // networkId 网点id
        // imei 设备imei码
        let param = ''
        if (this.status) {
          param = '?name=' + deleteUri
        } else {
          param = '?name=' + deleteUri + '&type=4&networkId=' + this.placeId + '&imei=' + this.equipItem.imei
        }
        const res = await Api.deleteFile(param)
        if (res.code === 200) {
          this.$toast.success('删除成功')
          // 如果触发删除方法，则把equip里面的对应的图片页删了
          this.uploadImages.splice(deleteIndex, 1)
          this.equipItem.uploadNames.splice(deleteIndex, 1)
        }
      }
    },
    /**
     * 上传图片（未绑定网点/设备）
     */
    async uploadDutyimg(item) {
      const param = new FormData()
      param.append('file', item.file)
      const res = await Api.uploadFile(param)
      if (res.code === 200) {
        this.uploadImages.push({ imgUrl: Config.figureBedAddress + res.data })
        this.equipItem.uploadNames.push(res.data)
      }
    },
    /**
     * 保存新增设备
     */
    async preserve() {
      // if (this.location === '') {
      //   this.$toast('请选择经纬度')
      //   return
      // }
      if (this.equipItem.imei === '') {
        this.$toast('请输入IMEI码')
        return
      }
      if (this.showErr) {
        this.$toast('请输入正确的IMEI码')
        return
      }
      if (this.equipItem.address === '') {
        this.$toast('请输入安装位置')
        return
      }
      if (this.equipItem.equipImg.length <= 0) {
        this.$toast('请上传安装照片')
        return
      }
      if (this.status) {
        const list = window.localStorage.getItem('equipList') ? JSON.parse(window.localStorage.getItem('equipList')) : []
        list.push(this.equipItem)
        window.localStorage.setItem('equipList', JSON.stringify(list))
        this.$router.go(-1)
      } else {
        if (!this.uploadStatus) this.uploadStatus = await this.updateEquipInfo()
        if (this.uploadStatus) {
          for (let i = this.uploadImages.length; i < this.equipItem.equipImg.length; i++) {
            await this.uploadFile(this.equipItem.equipImg[i].file, i)
          }
          // 上传失败
          if (this.uploadFailedMsg.length > 2) {
            // 拼装上传失败提示信息
            this.uploadFailedMsg = this.uploadFailedMsg + '张图片上传失败，请检查网络或者更换图片上传～'
            this.$toast.fail(this.uploadFailedMsg)
            this.uploadFailedList.forEach((item) => {
              // 用filter来做数组删除操作 如果是对象的话，需要指定对象值唯一属性来匹配
              this.$refs.uploadImg = this.$refs.uploadImg.filter(v => v !== item)
            })
            this.loading = false
          } else { // 上传成功
            this.$toast.success({
              message: '绑定设备成功！三秒后跳转网点编辑页面～',
              overlay: true,
              duration: 3000
            })
            this.loading = false
            setTimeout(() => {
              this.$router.back()
            }, 3000)
          }
        }
      }
    },
    /**
     * 绑定设备
     */
    async updateEquipInfo() {
      const param = {
        lon: this.equipItem.lon,
        lat: this.equipItem.lat,
        address: this.equipItem.address
      }
      const res = await Api.bindEquip(this.placeId, this.equipItem.imei, param)
      if (res.code === 200) {
        return true
      } else {
        return false
      }
    },
    /**
     * 上传文件
     */
    async uploadFile(file, index) {
      // 这里需要用formdata的格式提交参数
      const param = new FormData()
      param.append('file', file)
      param.append('type', 4)
      param.append('imei', this.equip.imei)
      const res = await Api.uploadFile(param)
      if (res.code === 200) {
        this.uploadImages.push({ imgUrl: Config.figureBedAddress + res.data })
        return true
      } else {
        // 记录上传失败的图片下表，用于提交完成之后告知用户
        this.uploadFailedMsg = this.uploadFailedMsg + `第${index + 1}`
        this.uploadFailedList.push(this.$refs.uploadImg[index])
        this.uploadFailedList.push(index)
        return false
      }
    }
  }
}
</script>

<style scoped src='./bindEquip.css'></style>
<style>
.search input::-webkit-input-placeholder, .bind-Equip .van-field__control::-webkit-input-placeholder {
  color: #373F4A !important;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
}
.search input:-internal-autofill-selected {
  background-color: #1A212B !important;
}
.amap-sug-result {
  background: #1A212B;
  border: none;
  width: calc(100% - 34px);
  min-width: calc(100% - 34px)  !important;;
  padding-top: 10px;
  left: 15px !important;
}
.auto-item {
  color: #fff;
}
#container .amap-logo{
  display: none;
  opacity:0 !important;
}
.bind-Equip .van-field__control {
  color: #6F85A2;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
}
.bind-Equip .van-cell::after {
  border: none;
}
</style>
