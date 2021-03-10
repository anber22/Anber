<template>
  <div class="iotApp">
    <!-- 顶部导航栏 starts -->

    <!-- end -->
    <!-- 顶部条件选择 start -->
    <div class="header-conditions">
      <div class="header-picker">
        <van-dropdown-menu>
          <van-dropdown-item v-model="thisSubsystemId" :options="subsystemList" @change="changeSystem()" />
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
      <div v-if="isCard">
        <div v-if="thisSubsystemId===5 && !loadding " class="show-list">
          <Adaptive v-for="item in equipInfoList" :key="item.index" :data="['100%','49.9%']" class="physicalUnionApplication-card">
            <PhysicalUnionApplication :data="item" />
          </Adaptive>
        </div>
        <div v-if="thisSubsystemId===10 && !loadding " class="show-list">
          <Adaptive v-for="item in equipInfoList" :key="item.index" :data="['100%','77.9%']" class="environmentalMonitoring-card">
            <EnvironmentalMonitoring :data="item" />
          </Adaptive>
        </div>
        <div v-if="thisSubsystemId===11 && !loadding " class="show-list">
          <TowerCraneMonitoring v-for="(item, index) in equipInfoList" :key="index" class="towerCraneMonitoring-card" :data="item" />
        </div>
      </div>
      <!-- end -->
      <!-- 列表卡片 start -->
      <div v-if="!isCard">
        <div v-if="!loadding" class="show-list">
          <Adaptive v-for="item in equipInfoList" :key="item.index" :data="['100%','31.39%']" class="physicalUnionApplication-list-card">
            <PhysicalUnionApplicationListCard :data="item" />
          </Adaptive>
        </div>
      </div>
      <!-- end -->
    </div>
    <!-- end -->
  </div>
</template>

<script>
import PhysicalUnionApplication from 'cmp/equipCard/PhysicalUnionApplication.vue'
import PhysicalUnionApplicationListCard from 'cmp/equipListCard/PhysicalUnionApplicationListCard.vue'
import EnvironmentalMonitoring from 'cmp/equipCard/EnvironmentalMonitoring.vue'
import TowerCraneMonitoring from 'cmp/equipCard/TowerCraneMonitoring.vue'
import Api from '@/api/aiot/iotApp.js'
import promiseToList from '@/utils/promiseToList'

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
      equipInfoList: []
    }
  },
  mounted() {
    // 渲染页面查询卡片列表片数据
    this.getEquipInfoList()
  },
  methods: {
    /**
     * 查询
     */
    onSearch(e) {
      this.getEquipInfoList()
    },
    /**
     * 切换子系统
     */
    changeSystem() {
      this.getEquipInfoList()
    },
    /**
     * 点击切换数据展示形式 （列表||卡片）
     */
    changeListType() {
      this.isCard = !this.isCard
    },
    /**
     * 获取卡片列表
     */
    async getEquipInfoList() {
      this.loadding = true
      const params = {
        systemType: this.thisSubsystemId,
        page: 1,
        size: 99999,
        conditionStr: (this.queryCondition.length < 1 ? '' : '?condition=' + this.queryCondition)
      }
      console.log('输出参数', params)
      const res = await Api.equipInfoList(params)
      if (res.code === 200) {
        this.equipInfoList = [...res.data.rows]
      }
      var ids = this.equipInfoList.map(item => { return item.equipId })

      const hazardCountList = await Api.equipUntreatedEventList(ids)

      this.equipInfoList = await promiseToList.conversion('equipType', 'equipType', 'equipTypeName', this.equipInfoList)
      let combined = []
      if (res.code === 200) {
        combined = hazardCountList.data.reduce((acc, cur) => {
          const target = acc.find(e => e.equipId === cur.equipId)
          if (target) {
            Object.assign(target, cur)
          }
          return acc
        }, this.equipInfoList)
      }
      this.equipInfoList = combined
      console.log('设备列表', this.equipInfoList)
      // this.equipInfoList.forEach(item => {
      //   promiseToList.conversion('equipType', item.)
      // })
      // 如果选择的是 thisSubsystemId ===1 的环境监测系统
      if (this.thisSubsystemId === 10 || this.thisSubsystemId === 11) {
        this.loadding = true
        // 根据对应的设备类型去请求相对应系统的接口
        let system = ''
        if (this.thisSubsystemId === 10) {
          system = 'environment'
        } else if (this.thisSubsystemId === 11) {
          system = 'tower'
        }
        // 获取ids去查询对应设备的详细数据
        const temp = await Api.equipRealTimeInfoList(ids, system)
        // 把两个数组对象根据equipId来合并
        if (res.code === 200) {
          combined = temp.data.reduce((acc, cur) => {
            const target = acc.find(e => e.equipId === cur.equipId)
            if (target) {
              Object.assign(target, cur)
            }
            return acc
          }, this.equipInfoList)
        }
        console.log(combined, 'combined')
        this.equipInfoList = combined
      }
      console.log('最后输出卡片列表', this.equipInfoList)
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
  top: 0;
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
  background-color: rgba(26, 33, 43, 1);
  padding-left: 0px;
}

.iotApp .van-dropdown-menu__bar{
  background-color:  rgba(16, 23, 32, 1) ;
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
</style>
