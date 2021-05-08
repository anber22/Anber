<template>
  <div class="bind-device">
    <!-- 地图 -->
    <div id='container' :style="showContent?'height:calc(100% - 380px)':'height:100%'"></div>
    <!-- 搜索 -->
    <div class="search">
      <!-- <van-search v-model="searchText" placeholder="请输入搜索关键词" />0 -->
      <input v-model="searchText" id="address"  type="text" placeholder="设备安装地址" />
    </div>
    <div class="message">
      <div class="message-button" :class="showContent?'down':'top'" @click="showContent=!showContent"></div>
      <template v-if="showContent">
        <div class="content">
          <div v-for="(item, i) in viewList" :key="i" class="view-item">
            <div class="">
              <span v-if="item.required" class="required">*</span>
              <span class="title">{{item.title}}</span>
            </div>
            <div class="item-type">
              <input v-if="item.type==='input'" v-model="item.value" type="test" class="item-input" :placeholder="item.placeholder" @keydown.enter="onchange(i)" :style="i===1?'width: calc(100% - 40px)': ''" />
              <!-- <img v-if="i===1" src="@/assets/images/equip/scan.png" /> -->
              <div v-if="i===1&&showErr" class="imei-err">{{imeiErr}}</div>
              <div v-if="item.type==='display'" class="item-display">{{item.value}}</div>
            </div>
          </div>
        </div>
        <div class="submit">
          <van-button @click="preserve">提交</van-button>
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
          placeholder: '请选择经纬度',
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
          value: ''
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
      typeID: 5,
      location: [],
      showErr: false,
      imeiErr: ''
    }
  },
  created() {
    this.location = this.$route.query.lng? [this.$route.query.lng, this.$route.query.lat]: [113.54342, 22.26666]
    this.viewList[0].value = this.$route.query.lng? this.$route.query.lng +','+ this.$route.query.lat: '113.54342, 22.26666'
    this.init()
  },
  methods: {
    /**
     * 画地图
     */
    init() {
      AMapLoader.load({
        key: '42bcf416c74d741ad1241b1a8742e765',     // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '1.4.15',    // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [],          // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {             // 是否加载 AMapUI，缺省不加载
          version: '1.1',     // AMapUI 缺省 1.1
          plugins:[],         // 需要加载的 AMapUI ui插件
        },
        Loca:{                // 是否加载 Loca， 缺省不加载
          version: '1.3.2'    // Loca 版本，缺省 1.3.2
        },
      }).then((AMap)=> {
        let _this = this
        // 其他坐标转高德坐标
        AMap.convertFrom(_this.location, 'gps', function (status, result) {
          if (result.info === 'ok') {
            const lnglats = result.locations; // Array.<LngLat>
            _this.location = [lnglats[0].lng, lnglats[0].lat]
            _this.viewList[0].value  = lnglats[0].lng + ',' + lnglats[0].lat
          }
        });
        _this.map = new AMap.Map('container', {
          mapStyle: 'amap://styles/e4aa2adc79a5186729bb5cd463d5b1a3',  // 地图样式（自定义样式）
          resizeEnable: true,  // 是否监控地图容器尺寸变化
          zoom: 17,  // 地图显示的缩放级别
          center: _this.location
        })
        // 地图缩放情况
        _this.map.on('zoomend', ()=> {
          let zoom = _this.map.getZoom();
          console.log('zoom---', zoom)
        })
        _this.mapAddMarker()
        AMap.plugin(['AMap.Autocomplete'], ()=> {
          let auto = new AMap.Autocomplete({
            input: 'address',
            outPutDirAuto: false
          })
          // 搜索框搜索地址 
          AMap.event.addListener(auto, 'select', (e) => {
            // console.log('搜索', e)
            _this.viewList[0].value = e.poi.location.lng + ',' + e.poi.location.lat
            _this.location = [e.poi.location.lng , e.poi.location.lat]
            _this.map.remove(_this.cameraMarker)
            _this.mapAddMarker()
          })
        })
        
      }).catch(e => {
        console.log(e)
      })
    },
    /**
     * 画标注
     */
    mapAddMarker () {
      let imgUrl = ''
      if (this.typeID === 5) imgUrl = require('@/assets/images/equip/camera-green.png')
      if (this.typeID === 10) imgUrl = require('@/assets/images/equip/ambient-green.png')
      if (this.typeID === 11) imgUrl = require('@/assets/images/equip/tower-green.png')
      let location = this.viewList[0].value.split(',')
      console.log('location---', location)
      this.map.setCenter(location)  // 设置地图中心点
      this.cameraMarker = new AMap.Marker({
        position: location,
        map: this.map,
        anchor:'bottom-center',
        icon: new AMap.Icon({            
          image: imgUrl,                // 图表路径
          size: new AMap.Size(30, 36),  //图标大小
          imageSize: new AMap.Size(30,36)
        }),
        draggable: true         // 图标自由移动
      })
      // 获取图标自由移动结束后的坐标
      this.cameraMarker.on('dragend', (e) => {
        this.viewList[0].value = e.lnglat.lng + ',' + e.lnglat.lat
      });
      // this.markers.push(cameraMarker)
      this.map.add(this.cameraMarker);
    },
    /**
     * 输入框失焦调用
     */
    onchange(inx) {
      if (inx === 0)  {
        this.map.remove(this.cameraMarker)
        this.mapAddMarker()
      }
      if (inx === 1) {
        this.getEquipImei(this.viewList[inx].value)
      }
    },
    /**
     * 根据IMEI查找设备
     */
    async getEquipImei(id) {
      const res = await Api.equipImei(id)
      // console.log(res, 'res----')
      if (res.code === 200) {
        this.showErr = false
        if(res.data !== this.typeID) {
          this.typeID = res.data
          this.map.remove(this.cameraMarker)
          this.mapAddMarker()
        }
      } else {
        this.showErr = true,
        this.imeiErr = 'IMEI码不正确'
      }
    },
    /**
     * 保存新增设备
     */
    preserve() {
      if (this.viewList[0].value === '') {
        this.$toast('请选择经纬度')
        return
      }
      if (this.viewList[1].value === '' || this.showErr) {
        this.$toast('请输入IMEI码')
        return
      }
      if (this.viewList[3].value === '') {
        this.$toast('请输入安装位置')
        return
      }
      // window.localStorage.removeItem('equipList')
      let list = window.localStorage.getItem('equipList') ? window.localStorage.getItem('equipList') : []
      const item = {
        location: this.viewList[0].value,
        imei: this.viewList[1].value,
        typeID: this.typeID,
        typeName: this.viewList[2].value,
        equipAddress: this.viewList[3].value,
        equipImg: ''
      }
      list.push(item)
      window.localStorage.setItem('equipList', list)
      this.$router.go(-1)
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
