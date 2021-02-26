<template>
  <div class="iotApp">
    <!-- 顶部导航栏 starts -->
    <van-nav-bar
      title="智慧物联"
      left-text="返回"
      left-arrow
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
    />
    <!-- end -->
    <!-- 顶部条件选择 start -->
    <div class="header-conditions">
      <div class="header-picker">
        <van-dropdown-menu>
          <van-dropdown-item v-model="thisSubsystemId" :options="subsystemList" @change="changeSystem()" />
        </van-dropdown-menu>
      </div>
      <div class="header-input">
        <van-search v-model="value" placeholder="设备名称\IEMI码" :clearable="false" />
      </div>
      <div class="chang-list-type">
        <img v-show="!isCard" src="/src/assets/images/public/list-type-table.png" alt="" class="list-type-img" @click="changeListType">
        <img v-show="isCard" src="/src/assets/images/public/list-type-card.png" alt="" class="list-type-img" @click="changeListType">>
      </div>
    </div>
    <!-- end -->
    <!-- 卡片展示列表 start -->
    <div v-if="isCard">
      <div v-if="thisSubsystemId===0" class="show-list">
        <Adaptive v-for="item in physicalUnionApplicationCardList" :key="item.index" :data="['100%','49.9%']" class="physicalUnionApplication-card">
          <PhysicalUnionApplication :data="item" />
        </Adaptive>
      </div>
      <div v-if="thisSubsystemId===1" class="show-list">
        <Adaptive v-for="item in environmentalMonitoringCardList" :key="item.index" :data="['100%','77.9%']" class="environmentalMonitoring-card">
          <EnvironmentalMonitoring :data="item" />
        </Adaptive>
      </div>
      <div v-if="thisSubsystemId===2" class="show-list">
        <TowerCraneMonitoring v-for="item in towerCraneMonitoringCardList" :key="item.index" class="towerCraneMonitoring-card" :data="item" />
      </div>
    </div>
    <div v-if="!isCard">
      <div class="show-list">
        <Adaptive v-for="item in thisSubsystemId===0?physicalUnionApplicationCardList:thisSubsystemId===1?environmentalMonitoringCardList:towerCraneMonitoringCardList" :key="item.index" :data="['100%','31.39%']" class="physicalUnionApplication-list-card">
          <PhysicalUnionApplicationListCard :data="item" />
        </Adaptive>
      </div>
    </div>

    <!-- end -->
  </div>
</template>

<script>
import PhysicalUnionApplication from '/src/components/equipCard/PhysicalUnionApplication.vue'
import PhysicalUnionApplicationListCard from '/src/components/equipListCard/PhysicalUnionApplicationListCard.vue'
import EnvironmentalMonitoring from '/src/components/equipCard/EnvironmentalMonitoring.vue'
import TowerCraneMonitoring from '/src/components/equipCard/TowerCraneMonitoring.vue'
import Api from '../../../src/api/aiot/iotApp.js'

export default {
  components: {
    PhysicalUnionApplication,
    PhysicalUnionApplicationListCard,
    EnvironmentalMonitoring,
    TowerCraneMonitoring
  },
  data() {
    return {
      value: '',
      switch1: false,
      switch2: false,
      subsystemList: [
        { text: '智慧视觉', value: 0 },
        { text: '环境监测', value: 1 },
        { text: '塔机监测', value: 2 }
      ],
      subsystemListTest: [
        { text: '智慧视觉', value: 0 },
        { text: '环境监测', value: 1 },
        { text: '塔机监测', value: 2 }
      ],
      test: { name: '张三', age: '22' },
      thisSubsystemId: 0,
      testStr: 'string',
      wechat: null,
      isCard: false,
      queryCondition: '',
      equipInfoList: [],
      physicalUnionApplicationCardList: [
        {
          'equipName': 'YD234摄像头',
          'equipType': '安全帽监测',
          'equipAddress': '惠景合园1#、2#交界处',
          'imei': 'FX328798798249182',
          'placeId': '1',
          'placeName': '港湾一号',
          'placeAddress': '珠海唐家湾',
          'departId': '1',
          'departName': '唐家社区',
          'onlineType': 1,
          'equipId': '1'
        }, {
          'equipName': 'YD235摄像头',
          'equipType': '电瓶车上楼1111',
          'equipAddress': '惠景合园1#、2#交界处',
          'imei': 'FX328798798249182',
          'placeId': '1',
          'placeName': '港湾一号',
          'placeAddress': '珠海唐家湾',
          'departId': '1',
          'departName': '唐家社区',
          'onlineType': 1,
          'equipId': '1'
        }, {
          'equipName': 'YD236摄像头',
          'equipType': '安全帽监测',
          'equipAddress': '惠景合园1#、2#交界处',
          'imei': 'FX328798798249182',
          'placeId': '1',
          'placeName': '港湾一号',
          'placeAddress': '珠海唐家湾',
          'departId': '1',
          'departName': '唐家社区',
          'onlineType': 1,
          'equipId': '1'
        }],
      environmentalMonitoringCardList: [{
        'equipName': 'YD234摄像头',
        'equipType': '安全帽监测',
        'equipAddress': '惠景合园1#、2#交界处',
        'imei': 'FX328798798249182',
        'placeId': '1',
        'placeName': '港湾一号',
        'placeAddress': '珠海唐家湾',
        'departId': '1',
        'departName': '唐家社区',
        'onlineType': 1,
        'equipPower': 80,
        'equipSignal': -45,
        'equipId': '1'
      }, {
        'equipName': 'YD235摄像头',
        'equipType': '电瓶车上楼1111',
        'equipAddress': '惠景合园1#、2#交界处',
        'imei': 'FX328798798249182',
        'placeId': '1',
        'placeName': '港湾一号',
        'placeAddress': '珠海唐家湾',
        'departId': '1',
        'departName': '唐家社区',
        'onlineType': 1,
        'equipPower': 80,
        'equipSignal': -45,
        'equipId': '1'
      }, {
        'equipName': 'YD236摄像头',
        'equipType': '安全帽监测',
        'equipAddress': '惠景合园1#、2#交界处',
        'imei': 'FX328798798249182',
        'placeId': '1',
        'placeName': '港湾一号',
        'placeAddress': '珠海唐家湾',
        'departId': '1',
        'departName': '唐家社区',
        'onlineType': 1,
        'equipPower': 80,
        'equipSignal': -45,
        'equipId': '1'
      }],
      towerCraneMonitoringCardList: [
        {
          'equipName': 'YD234摄像头',
          'equipType': '安全帽监测',
          'equipAddress': '惠景合园1#、2#交界处',
          'imei': 'FX328798798249182',
          'placeId': '1',
          'placeName': '港湾一号',
          'placeAddress': '珠海唐家湾',
          'departId': '1',
          'departName': '唐家社区',
          'onlineType': 1,
          'equipPower': 80,
          'equipSignal': -45,
          'equipId': '1'
        }, {
          'equipName': 'YD235摄像头',
          'equipType': '电瓶车上楼1111',
          'equipAddress': '惠景合园1#、2#交界处',
          'imei': 'FX328798798249182',
          'placeId': '1',
          'placeName': '港湾一号',
          'placeAddress': '珠海唐家湾',
          'departId': '1',
          'departName': '唐家社区',
          'onlineType': 1,
          'equipPower': 80,
          'equipSignal': -45,
          'equipId': '1'
        }, {
          'equipName': 'YD236摄像头',
          'equipType': '安全帽监测',
          'equipAddress': '惠景合园1#、2#交界处',
          'imei': 'FX328798798249182',
          'placeId': '1',
          'placeName': '港湾一号',
          'placeAddress': '珠海唐家湾',
          'departId': '1',
          'departName': '唐家社区',
          'onlineType': 1,
          'equipPower': 80,
          'equipSignal': -45,
          'equipId': '1'
        }
      ]

    }
  },
  mounted() {
    // this.wechat = new Wechat()
    this.getEquipInfoList()
    console.log('测试基本类型', this.testStr)

    console.log('测试完全observer', this.test.name)
    this.test.name = 'hezijian'
    console.log('测试observer', Object.assign({}, this.test), this.test)
  },
  methods: {
    changeSystem() {
      console.log(this.thisSubsystemId)
      this.getEquipInfoList()
    },
    onClickLeft() {
      this.$router.back()
      this.getEquipInfoList()
    },
    /**
     * 点击切换数据展示形式 （列表||卡片）
     */
    changeListType() {
      this.isCard = !this.isCard
    },
    async getEquipInfoList() {
      const params = {
        systemType: this.thisSubsystemId,
        page: 1,
        size: 10,
        consitionStr: (this.queryCondition.length < 1 ? '' : '?' + this.queryCondition)
      }
      const res = await Api.equipInfoList(params)
      this.equipInfoList = [...res.data]
      if (this.systemType === 1) {
        var ids = this.equipInfoList.map(item => { return item.equipId })
        console.log('ids', ids)
      }

      console.log('设备信息列表', this.equipInfoList)
    }

  }
}
</script>

<style>
.title {
  font-size: 50px;
}
.iotApp{
  height: 2000px;
  padding: 0px 3%;
  background-color: #101720;
}
.physicalUnionApplication-card{
  margin-top: 5%;
}
.physicalUnionApplication-list-card{
    margin-top: 5%;
}
.environmentalMonitoring-card{
  margin-top: 5%;
}
.towerCraneMonitoring-card{
  margin-top: 5%;
}
.header-conditions{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  vertical-align: middle;
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
.van-search {
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
.van-search__content{
  background-color: rgba(26, 33, 43, 1);
}

.van-dropdown-menu__bar{
  background-color:  rgba(16, 23, 32, 1) ;
}
.van-dropdown-menu__title{

font-size: 15px;
font-family: PingFang SC;
font-weight: 400;
color: #8BA3C2;
}
.van-field__control{
  font-size: 15px;
font-family: PingFang SC;
font-weight: 400;
  color: #373F4A;
}
.van-cell{
  color: rgba(139, 163, 194, 1);
  padding: 10px 31px;
}
input::-webkit-input-placeholder{
  color: #373F4A !important;

font-size: 12px
}
.list-type-img{
  width: 21px;
  height: 19px;
}
.van-cell{
  background-color: rgba(16, 23, 32, 1);
}
.van-popup{
  background-color: rgba(16, 23, 32, 1);

}
.van-cell::after {
  border-bottom: 1px solid rgba(16, 23, 32, 1);
}
.van-dropdown-item__option--active .van-dropdown-item__icon{
  color: rgba(139, 163, 194, 1);
}
</style>
