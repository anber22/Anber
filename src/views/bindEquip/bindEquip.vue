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
                  @keydown.enter="onchange(1)"
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
              <UploadImg class="uploadImg" :water-mark-info="waterMarkInfo" @choiceImg="choiceImg" />
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
        equipImg: []
      },
      typeName: '',
      location: '113.54342, 22.26666',
      centerLocation: [113.54342, 22.26666],
      showErr: false,
      imeiErr: '',
      status: false,
      waterMarkInfo: {
        placeName: '网点名称'
      } // 水印信息
    }
  },
  created() {
    this.status = this.$route.query.status
    if (this.$route.query.lon) {
      this.location = [this.$route.query.lon, this.$route.query.lat]
      this.equipItem.lon = this.$route.query.lon
      this.equipItem.lat = this.$route.query.lat
    }
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
              console.log('zoom---', zoom)
            })
            _this.mapAddMarker(AMap)
            AMap.plugin(['AMap.Autocomplete'], () => {
              const auto = new AMap.Autocomplete({
                input: 'address',
                outPutDirAuto: false
              })
              // 搜索框搜索地址
              AMap.event.addListener(auto, 'select', (e) => {
                // console.log('搜索', e)
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
     * 输入框失焦调用
     */
    onchange(inx) {
      // if (inx === 0) {
      //   this.map.remove(this.cameraMarker)
      //   this.mapAddMarker(AMap)
      // }
      if (inx === 1) {
        this.getEquipImei()
      }
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
     * 选择图片  待用
     */
    choiceImg(e) {
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
      if (this.status) {
        const list = window.localStorage.getItem('equipList') ? JSON.parse(window.localStorage.getItem('equipList')) : []
        list.push(this.equipItem)
        window.localStorage.setItem('equipList', JSON.stringify(list))
        this.$router.go(-1)
      } else {
        const id = this.$route.query.id
        const param = {
          lon: this.equipItem.lon,
          lat: this.equipItem.lat,
          address: this.equipItem.address
        }
        const res = await Api.bindEquip(id, this.equipItem.imei, param)
        if (res.code === 200) {
          this.$toast('绑定成功')
          this.$router.go(-1)
        }
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
