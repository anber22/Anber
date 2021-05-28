<template>
  <div class="iotApp">
    <!-- 顶部条件选择 start -->
    <div class="header-conditions">
      <div class="header-picker">
        <van-dropdown-menu>
          <van-dropdown-item v-model="delaySystemId" :options="subsystemList" @close="changeSystem" />
        </van-dropdown-menu>
      </div>
      <div class="header-input">
        <van-search v-model="queryCondition" placeholder="设备名称\网点名称\IEMI码" :clearable="false" @search="onSearch" />
      </div>
      <div class="chang-list-type">
        <img v-show="!isCard" src="@/assets/images/public/list-type-table.png" alt="" class="list-type-img" @click="changeListType">
        <img v-show="isCard" src="@/assets/images/public/list-type-card.png" alt="" class="list-type-img" @click="changeListType">
      </div>
    </div>
    <div class="blankArea" />
    <!-- end -->
    <!-- 内容 start -->
    <div class="iot-content">
      <!-- 卡片展示列表 start -->
      <van-loading v-if="loading" size="24px" vertical>
        加载中...
      </van-loading>
      <div v-if="isCard">
        <!-- 智慧视觉卡片 start -->
        <div v-if="thisSubsystemId==='5' && equipInfoList.length>0" class="show-list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="van-clearfix"
            :immediate-check="false"
            @load="getEquipInfoList"
          >
            <div v-for="item in equipInfoList" :key="item.index" @click="toDetailInfo(item.equipId)">
              <Adaptive :size="['100%','49.9%']" class="physicalUnionApplication-card">
                <PhysicalUnionApplication :equip-info="item" />
              </Adaptive>
            </div>
          </van-list>
        </div>
        <!-- end -->
        <!-- 环境监测卡片 start -->
        <div v-if="thisSubsystemId==='10' && equipInfoList.length>0" class="show-list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="van-clearfix"
            :immediate-check="false"
            @load="getEquipInfoList"
          >
            <div v-for="item in equipInfoList" :key="item.index" @click="toDetailInfo(item.equipId)">
              <Adaptive :size="['100%','77.9%']" class="environmentalMonitoring-card">
                <EnvironmentalMonitoring :equip-info="item" />
              </Adaptive>
            </div>
          </van-list>
        </div>
        <!-- end -->
        <!-- 塔机卡片 start -->
        <div v-if="thisSubsystemId==='11' && equipInfoList.length>0 && !loading" class="show-list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="van-clearfix"
            :immediate-check="false"
            @load=" getEquipInfoList"
          >
            <div v-for="item in equipInfoList" :key="item.index" @click="toDetailInfo(item.equipId)">
              <TowerCraneMonitoring class="towerCraneMonitoring-card" :equip-info="item" />
            </div>
          </van-list>
        </div>
        <!-- end -->

        <div v-if="equipInfoList.length===0 && !loading" class="nothing-list">
          <img src="@/assets/images/public/nothing.png" alt="" class="nothing-img">
          <div class="nothing-content">
            无匹配项
          </div>
        </div>
      </div>
      <!-- end -->
      <!-- 列表卡片 start -->
      <div v-if="!isCard">
        <div v-if=" equipInfoList.length>0" class="show-list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="van-clearfix"
            :immediate-check="false"
            @load="getEquipInfoList"
          >
            <div v-for="item in equipInfoList" :key="item.index" @click="toDetailInfo(item.equipId)">
              <Adaptive :size="['100%','31.39%']" class="physicalUnionApplication-list-card">
                <PhysicalUnionApplicationListCard :equip-list-data="item" />
              </Adaptive>
            </div>
          </van-list>
        </div>
        <div v-if="equipInfoList.length===0 && !loading" class="nothing-list">
          <img src="@/assets/images/public/nothing.png" alt="" class="nothing-img">
          <div class="nothing-content">
            无匹配项
          </div>
        </div>
      </div>
      <!-- end -->
    </div>
    <!-- end -->
  </div>
</template>

<script>
import PhysicalUnionApplication from 'cmp/equipCard/PhysicalUnionApplication.vue'
import PhysicalUnionApplicationListCard from 'cmp/equipListCard/EquipListCard.vue'
import EnvironmentalMonitoring from 'cmp/equipCard/EnvironmentalMonitoring.vue'
import TowerCraneMonitoring from 'cmp/equipCard/TowerCraneMonitoring.vue'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
import JsStabilization from '@/utils/jsStabilization'

import Api from '@/api/aiot/iotApp.js'

export default {
  components: {
    // 智慧物联设备信息卡片
    PhysicalUnionApplication,
    // 设备信息列表卡片  子系统通用
    PhysicalUnionApplicationListCard,
    // 环境监测设备信息卡片
    EnvironmentalMonitoring,
    // 塔机检测设备信息卡片
    TowerCraneMonitoring
  },
  data() {
    return {
      loading: true, // 加载状态
      subsystemList: [ // 系统选择下拉菜单
        { text: '智慧视觉', value: '5' },
        { text: '环境监测', value: '10' },
        { text: '塔机监测', value: '11' }
      ],
      thisSubsystemId: '5', // 当前选中系统
      isCard: false, // 展示形式 （列表||卡片）
      queryCondition: '', // 查询条件 （这里只有模糊查询）
      equipInfoList: [], // 设备卡片信息
      page: 0, // 当前页数
      finished: false, // 是否加载全部
      dataLoadingStart: '5', // 数据开始加载的子系统id
      jsStabilization: null, // 函数防抖实例对象
      delaySystemId: '5' // 延时系统id
    }
  },
  created() {
    // 渲染页面查询卡片列表片数据

    if (this.$route.query) {
      if (this.$route.query.systemId) {
        this.thisSubsystemId = this.$route.query.systemId
        this.delaySystemId = this.$route.query.systemId
      }
      // if (this.$route.query.fromPage === '/propertyPlate') {
      //   this.status = this.$route.query.onlineType === 'count' ? 0 : this.$route.query.onlineType === 'online' ? 1 : this.$route.query.onlineType === 'outline' ? 2 : 0
      //   this.hazardType = this.$route.query.hazardType
      //   this.networkType = this.$route.query.networkType
      // } else if (this.$route.query.fromPage === '/safetyCommitteePlate') {
      // }
    }
    this.jsStabilization = new JsStabilization()
    this.getEquipInfoList()
  },

  methods: {
    /**
     * 查询
     */
    async onSearch(e) {
      this.page = 0
      this.finished = false
      this.loading = true
      this.equipInfoList = []
      this.getEquipInfoList()
    },
    /**
     * 跳转详情页
     */
    toDetailInfo(equipId) {
      this.$router.push({
        path: '/iotAppDetail',
        query: {
          id: equipId,
          systemId: this.thisSubsystemId
        }
      })
    },
    /**
     * 输入框内容变化改变
     */
    conditionChange(value) {
      this.queryCondition = value
    },
    /**
     * 切换子系统
     */
    changeSystem() {
      this.equipInfoList = []
      this.thisSubsystemId = this.delaySystemId
      this.page = 0
      this.finished = false
      this.loading = true
      this.dataLoadingStart = this.thisSubsystemId
      this.getEquipInfoList()
    },

    /**
     * 点击切换数据展示形式 （列表||卡片）
     */
    async changeListType() {
      this.finished = false
      this.isCard = !this.isCard
    },
    /**
     * 获取卡片列表
     */
    async  getEquipInfoList() {
      this.loading = true
      let temp = []
      let system = ''
      // 根据对应的设备类型去请求相对应系统的接口
      if (this.thisSubsystemId === '10') {
        system = '10'
      } else if (this.thisSubsystemId === '11') {
        system = '11'
      } else if (this.thisSubsystemId === '5') {
        system = '5'
      }
      const params = {
        systemType: this.thisSubsystemId,
        page: ++this.page,
        size: 10,
        conditionStr: (this.queryCondition.length < 1 ? '' : '?condition=' + this.queryCondition)
      }
      const res = await Api.equipInfoList(params)
      // 获取总页数
      const total = res.data.total
      if (res.code === 200) {
        temp = [...res.data.rows]
        if (params.page > total) {
          this.finished = true
          this.loading = false
          // this.equipInfoList = this.equipInfoList.concat(temp)
          return
        }
        if (temp.length === 0) {
          this.equipInfoList = temp
          this.loading = false
          this.finished = true
          // return
        }
      }

      // 根据设备类型id获取对应的设备类型名称
      temp = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', temp)

      this.equipInfoList = this.equipInfoList.concat(temp)
      this.loading = false

      // 05-08 挖坑，立牌 如果有什么更好的解决方案请联系梁工
      // 所在方法是分页获取设备列表，后端更新后我们不能再批量获取实时数据和未处理隐患数，所以这里我们需要一条一条获取
      // 所以这里就会有一个异步方法频繁被触发，这个方法里面有循环在异步发请求，如果我们等待他获取完完展示就没有问题
      // 开始用户在A系统未处理完请求的时候切换到B系统（这里我们装载不同系统的设备列表的变量是同一个），就会出现在B系统的数据会被A系统未处理完的请求所影响
      // 所以我们需要中断这些异步方法里面的A系统未处理完的请求
      // 解决方案
      // 1、 函数防抖 处理用户快速下拉在短时间内多次调用遍历查询当前设备列表的隐患数和实时数据的方法，这样我们就可以限制在设定的时间内不再调用该方法的时候，我们再调用他
      // 2、 在循环内用当前展示的子系统id和调用时传入的id做比较，如果不匹配则是用户切换了子系统，那么我们就需要这个if来中断我们的切换之前的子系统的遍历请求
      //     用跳出循环的方式来控制我们的发请求
      // 遗留问题：
      // 1、 用户下拉需要等待前十条的实时数据和隐患数据加载完毕才能加载后面十条，体验稍差
      // 这里用到函数防抖，如果频繁调用该函数则在间隔时间之内不再调用再执行
      const getRealDataAndHzardCount = this.jsStabilization.stabilization(
        //
        async() => {
          // 打开loadding
          // this.loading = true
          const temp = JSON.parse(JSON.stringify(this.equipInfoList))
          // 如果是环境监测
          await this.getRealData(temp, system, system === '10' ? 'environmentRealTimeData' : system === '11' ? 'towerRealTimeInfo' : '')
          // 获取设备列表id对应的未处理事件数

          for (let i = 0; i < temp.length; i++) {
            if (this.dataLoadingStart !== system) {
              break
            }
            if (temp[i].count === undefined) {
              const untreated = await Api.equipUntreatedEvent(temp[i].equipId)
              if (untreated.code === 200) {
                temp[i]['count'] = untreated.data
              }
            }
          }
          if (this.dataLoadingStart === system) {
            this.equipInfoList = JSON.parse(JSON.stringify(temp))
            // this.loading = false
          }
        }
        , 1000)
      getRealDataAndHzardCount()
    },
    async getRealData(equipList, system, interfaceName) {
      if (interfaceName === '') {
        return
      }
      for (let i = 0; i < equipList.length; i++) {
        let realTimeData = {}
        // 判断当前子系统不是当前在遍历请求的时候就break出循环
        if (this.dataLoadingStart !== system) {
          break
        }
        // 如果某一项不是不存在，就跳过
        if (equipList[i].windSpeed === undefined) {
          realTimeData = await Api[interfaceName](equipList[i].equipId)
          if (realTimeData.code === 200 && realTimeData.data) {
            equipList[i] = Object.assign(realTimeData.data, equipList[i])
          }
        }
      }
    }
  }
}
</script>

<style>
.title {
  font-size: 50px;
}
.iotApp{
  /* position: fixed; */
  height: calc(100% - 45px);
  width: 100%;
  background-color: #101720;

}
.iot-content{
  /* position: fixed; */
  padding: 0px 3% 13% 3%;
  height: 80%;
  width: 94%;
  overflow: scroll;
}
.physicalUnionApplication-card{
  margin-top: 5%;
}
.physicalUnionApplication-list-card{
  margin-bottom: 5%;
}
.environmentalMonitoring-card{
  margin-top: 5%;
}
.towerCraneMonitoring-card{
  margin-top: 5%;
}
.header-conditions{
  width: 94%;
  height: 50px;
  display: flex;
  flex-direction: row;
  padding: 0px 3%;
  vertical-align: middle;
  position: relative;
  top: -1;
  background: #101720;
}
.header-picker{
  width: 30%;
  height: 100%;
  display: inline-block;
  background-color: transparent;
}
.header-input{
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: row;
  vertical-align: middle;
}
.chang-list-type{
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
}
.list-type-img{
  width: 21px;
  height: 19px;
}
.nothing-list{
  width: 79%;
  height: 100%;
  position: fixed;
  text-align: center;
  line-height: 300%;
  margin-left: 10%;
}
.nothing-img{
  width: 90px;
  height: 85px;
  vertical-align: middle;
  margin-top: 60%;
}
.nothing-content{
  width: 78%;
  height:auto;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
  margin-left: 6%;
  margin-top: 2%;
}
.blankArea{
  width: 100%;
  height: 8px;
  background: #131B25;
}
</style>

<style >
.iotApp .van-search {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  vertical-align: middle;
  align-items: center;
  box-sizing: border-box ;
  /* padding: 10px 12px; */
  background-color: transparent;
}
.iotApp .van-search__content{
  background-color: #101720;
  padding-left: 0px;
}

.iotApp .van-dropdown-menu__bar{
  background-color:  #101720 ;
  box-shadow:none;
}
.iotApp .van-dropdown-menu__title{
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #8BA3C2;
}
.iotApp .van-field__control{
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #8BA3C2
}
.iotApp .van-cell{
  color: rgba(139, 163, 194, 1);
  padding: 10px 11px;
  background-color: rgba(16, 23, 32, 1);
}
.iotApp input::-webkit-input-placeholder{
  color: #373F4A !important;
  font-size: 12px
}

.iotApp .van-popup{
  background-color: rgba(16, 23, 32, 1);
}
.iotApp .van-cell::after {
  border-bottom: 1px solid rgba(16, 23, 32, 1);
}
.iotApp .van-dropdown-item__option--active .van-dropdown-item__icon{
  color: rgba(139, 163, 194, 1);
}
</style>
