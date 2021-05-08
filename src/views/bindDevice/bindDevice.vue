<template>
  <div class="bind-device">
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
          <div v-for="(item, i) in viewList" :key="i" class="view-item">
            <div class="">
              <span v-if="item.required" class="required">*</span>
              <span class="title">{{ item.title }}</span>
            </div>
            <div class="item-type">
              <input v-if="item.type==='input'" v-model="item.value" type="test" class="item-input" :placeholder="item.placeholder" :style="i===1?'width: calc(100% - 40px)': ''" @keydown.enter="onchange(i)">
              <!-- <img v-if="i===1" src="@/assets/images/equip/scan.png" /> -->
              <div v-if="item.type==='display'" class="item-display">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
        <div class="submit">
          <van-button class="">
            提交
          </van-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Api from '@/api/aiot/iotApp.js'
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'BindDevice',
  data() {
    return {
      searchText: '',
      map: null,
      cameraMarker: null,
      showContent: true,
      viewList: [
        {
          title: '经纬度',
          placeholder: '请输入经纬度',
          required: true,
          type: 'input',
          value: ''
        },
        {
          title: 'IMEI码',
          placeholder: '请输入IMEI码',
          required: true,
          type: 'input',
          value: ''
        },
        {
          title: '设备类型',
          placeholder: '请输入经纬度',
          required: false,
          type: 'display',
          value: '摄像机'
        },
        {
          title: '安装位置',
          placeholder: '请输入安装位置',
          required: true,
          type: 'input',
          value: ''
        },
        {
          title: '安装照片',
          placeholder: '',
          required: true,
          type: 'image',
          value: ''
        }
      ],
      typeID: 5
    }
  },
  created() {
    this.init()
  },
  methods: {
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
        this.map = new AMap.Map('container', {
          mapStyle: 'amap://styles/e4aa2adc79a5186729bb5cd463d5b1a3', // 地图样式（自定义样式）
          resizeEnable: true, // 是否监控地图容器尺寸变化
          zoom: 17, // 地图显示的缩放级别
          center: [113.597206, 22.365622]
        })
        this.map.on('zoomend', () => {
          const zoom = this.map.getZoom()
          console.log('zoom---', zoom)
        })
        AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
          const auto = new AMap.Autocomplete({
            input: 'address',
            outPutDirAuto: false
          })
          // let placeSearch = new AMap.PlaceSearch({
          //   map: this.map
          // })

          AMap.event.addListener(auto, 'select', (e) => {
            console.log('搜索', e)
            // this.viewList[0].value = e.poi.location.lng + ',' + e.poi.location.lat
            // this.mapAddMarker()
            // placeSearch.setCity(e.poi.adcode);
            // placeSearch.search(e.poi.name);  //关键
          })
        })
      }).catch(e => {
        console.log(e)
      })
    },
    /**
     * 画标注
     */
    mapAddMarker() {
      let imgUrl = ''
      if (this.typeID === 5) imgUrl = require('@/assets/images/equip/camera-green.png')
      if (this.typeID === 10) imgUrl = require('@/assets/images/equip/ambient-green.png')
      if (this.typeID === 11) imgUrl = require('@/assets/images/equip/tower-green.png')
      const location = this.viewList[0].value.split(',')
      console.log(location, 'arr-----')
      this.cameraMarker = new AMap.Marker({
        position: location,
        map: this.map,
        anchor: 'bottom-center',
        icon: new AMap.Icon({
          image: imgUrl,
          size: new AMap.Size(30, 36),  // 图标大小
          imageSize: new AMap.Size(30, 36)
        }),
        draggable: true
      })
      this.cameraMarker.on('dragend', (e) => {
        console.log(e.lnglat, 'e-----')
        this.viewList[0].value = e.lnglat.lng + ',' + e.lnglat.lat
      })
      // this.markers.push(cameraMarker)
      this.map.add(this.cameraMarker)
      const a = 0
    },
    /**
     * 输入框失焦调用
     */
    onchange(inx) {
      console.log(inx, 'inx----')
      if (inx === 0) this.mapAddMarker()
      if (inx === 1) {
        this.getEquipImei(this.viewList[inx].value)
      }
    },
    /**
     * 根据IMEI查找设备
     */
    async getEquipImei(id) {
      const res = await Api.equipImei(id)
      console.log(res, 'res----')
      // this.typeID = 10
      // this.map.remove(this.cameraMarker);
      // this.mapAddMarker()
    }
  }
}
</script>

<style scoped src='./bindDevice.css'></style>
<style>
.search input::-webkit-input-placeholder, .search input:-moz-placeholder, .search input::-moz-placeholder, .search input:-ms-input-placeholder, .item-input input::-webkit-input-placeholder, .item-input input:-moz-placeholder, .item-input input::-moz-placeholder, .item-input input:-ms-input-placeholder {
  color: #373F4A !important;
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
</style>
