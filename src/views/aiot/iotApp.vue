<template>
  <div class="iotApp">
    <!-- 顶部条件选择 start -->
    <div class="header-conditions">
      <div class="header-picker">
        <van-dropdown-menu>
          <van-dropdown-item v-model="thisSubsystemId" :options="subsystemList" @closed="changeSystem()" />
        </van-dropdown-menu>
      </div>
      <div class="header-input">
        <van-search v-model="queryCondition" placeholder="设备名称\IEMI码" :clearable="false" @search="onSearch" />
      </div>
      <div class="chang-list-type">
        <img v-show="!isCard" src="@/assets/images/public/list-type-table.png" alt="" class="list-type-img" @click="changeListType">
        <img v-show="isCard" src="@/assets/images/public/list-type-card.png" alt="" class="list-type-img" @click="changeListType">>
      </div>
    </div>
    <!-- end -->
    <!-- 内容 start -->
    <div class="iot-content">
      <!-- 卡片展示列表 start -->
      <van-loading v-if="loadding" size="24px" vertical>
        加载中...
      </van-loading>
      <div v-if="isCard">
        <div v-if="thisSubsystemId===5 && equipInfoList.length>0" class="show-list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="van-clearfix"
            :immediate-check="false"
            @load="getEquipInfoList"
          >
            <div v-for="item in equipInfoList" :key="item.index" @click="toDetailInfo(item.equipId)">
              <Adaptive :data="['100%','49.9%']" class="physicalUnionApplication-card">
                <PhysicalUnionApplication :equip-info="item" />
              </Adaptive>
            </div>
          </van-list>
        </div>
        <div v-if="thisSubsystemId===10 && equipInfoList.length>0" class="show-list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="van-clearfix"
            :immediate-check="false"
            @load="getEquipInfoList"
          >
            <div v-for="item in equipInfoList" :key="item.index" @click="toDetailInfo(item.equipId)">
              <Adaptive :data="['100%','77.9%']" class="environmentalMonitoring-card">
                <EnvironmentalMonitoring :equip-info="item" />
              </Adaptive>
            </div>
          </van-list>
        </div>
        <div v-if="thisSubsystemId===11 && equipInfoList.length>0" class="show-list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="van-clearfix"
            :immediate-check="false"
            @load="getEquipInfoList"
          >
            <div v-for="item in equipInfoList" :key="item.index" @click="toDetailInfo(item.equipId)">
              <TowerCraneMonitoring class="towerCraneMonitoring-card" :equip-info="item" />
            </div>
          </van-list>
        </div>

        <div v-if="equipInfoList.length===0 && !loadding" class="nothing-list">
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
              <Adaptive :data="['100%','31.39%']" class="physicalUnionApplication-list-card">
                <PhysicalUnionApplicationListCard :data="item" />
              </Adaptive>
            </div>
          </van-list>
        </div>
        <div v-if="equipInfoList.length===0 && !loadding" class="nothing-list">
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
      loading: false,
      loadding: true,
      // 系统选择下拉菜单
      subsystemList: [
        { text: '智慧视觉', value: 5 },
        { text: '环境监测', value: 10 },
        { text: '塔机监测', value: 11 }
      ],
      // 当前选中系统
      thisSubsystemId: 5,
      // 展示形式 （列表||卡片）
      isCard: false,
      // 查询条件 （这里只有模糊查询）
      queryCondition: '',
      // 设备卡片信息
      equipInfoList: [],
      page: 0,
      finished: false
    }
  },
  created() {
    // 渲染页面查询卡片列表片数据
    if (this.$route.query.systemId) {
      this.thisSubsystemId = Number(this.$route.query.systemId)
    }
    this.getEquipInfoList()
  },

  methods: {
    /**
     * 查询
     */
    onSearch(e) {
      this.page = 0
      this.finished = false
      this.loading = false
      this.equipInfoList = []
      this.getEquipInfoList()
    },
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
     * 切换子系统11
     */
    changeSystem() {
      this.page = 0
      this.finished = false
      this.loading = false
      this.equipInfoList = []
      this.getEquipInfoList()
    },
    /**
     * 点击切换数据展示形式 （列表||卡片）
     */
    changeListType() {
      this.finished = false

      this.isCard = !this.isCard
    },
    /**
     * 获取卡片列表
     */
    async getEquipInfoList() {
      // this.loading = true
      this.loadding = true
      let temp = []
      this.loading = false
      const params = {
        systemType: this.thisSubsystemId,
        page: ++this.page,
        size: 10,
        conditionStr: (this.queryCondition.length < 1 ? '' : '?condition=' + this.queryCondition)
      }

      const res = await Api.equipInfoList(params)
      const total = res.data.total

      if (res.code === 200) {
        temp = [...res.data.rows]
        if (params.page > total) {
          this.finished = true
          this.loadding = false
          this.equipInfoList = this.equipInfoList.concat(temp)
          return
        }
        if (temp.length === 0) {
          this.equipInfoList = temp
          this.loadding = false
          this.finished = true
          return
        }
      }

      // 获取设备列表集合的
      // 根据设备类型id获取对应的设备类型名称
      temp = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', temp)

      this.equipInfoList = this.equipInfoList.concat(temp)
      this.loadding = false
      let system = ''
      if (this.thisSubsystemId === 10 || this.thisSubsystemId === 11) {
        // 根据对应的设备类型去请求相对应系统的接口

        if (this.thisSubsystemId === 10) {
          system = 'environment'
        } else if (this.thisSubsystemId === 11) {
          system = 'tower'
        }
      }
      await this.getRealDataList(system)
    },
    /**
     * 获取设备实时数据和未处理隐患数
     */
    async getRealDataList(e) {
      // 实时数据
      let realTime = {}
      // 未处理隐患数
      let hazardCount = 0
      // 打开loadding
      this.loadding = true
      const temp = this.equipInfoList
      // 如果是环境监测
      if (e === 'environment') {
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].windSpeed !== undefined) {
            continue
          }
          realTime = await Api.environmentRealTimeData(temp[i].equipId)
          if (realTime.code === 200 && realTime.data) {
            temp[i] = Object.assign(realTime.data, temp[i])
          }
        }
      } else if (e === 'tower') { // 如果是塔机监测
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].windSpeed !== undefined) {
            continue
          }
          realTime = await Api.towerRealTimeInfo(temp[i].equipId)
          if (realTime.code === 200 && realTime.data) {
            temp[i] = Object.assign(realTime.data, temp[i])
          }
        }
      }
      // 获取设备列表id对应的未处理事件数
      for (let i = 0; i < temp.length; i++) {
        hazardCount = await Api.equipUntreatedEvent(temp[i].equipId)

        if (hazardCount.code === 200) {
          temp[i]['count'] = hazardCount.data
        }
      }
      this.equipInfoList = temp
      this.loadding = false
    }
  }
}
</script>

<style>
.title {
  font-size: 50px;
}
.iotApp{
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #101720;

}
.iot-content{
  position: fixed;
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
  background-color: #101720;
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
  padding: 10px 31px;
}
.iotApp input::-webkit-input-placeholder{
  color: #373F4A !important;

font-size: 12px
}
.iotApp .van-cell{
  background-color: rgba(16, 23, 32, 1);
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
</style>
