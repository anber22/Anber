<template>
  <div class="iotApp-detail">
    <van-tabs v-model="active" swipeable color="#06F0FE" title-active-color="#06F0FE" title-inactive-color="#8BA3C2" background="rgba(16, 23, 32, 1)" sticky ellipsis>
      <van-tab v-for="item in tabList" :key="item.index" :title="item.title" class="tab-content">
        <div v-if="item.index===0">
          <div class="iotApp-detail-title">
            <img src="@/assets/images/home/title-icon.png" alt="" class="iotApp-detail-title-icon">
            设备信息
          </div>
          <InfoRow v-for="(rowItem,index) in rowList" :key="index" :data="rowItem" />
        </div>
        <div v-if="item.index===1">
          视频
        </div>
        <div v-if="item.index===2">
          日志
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

import InfoRow from '@/components/infoRows/InfoRows'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'

import Api from '@/api/aiot/iotApp.js'
export default {
  components: {
    InfoRow
  },
  data() {
    return {
      active: 0,
      tabList: [
        {
          index: 0,
          title: '基本信息'
        },
        {
          index: 1,
          title: '实时数据'
        },
        {
          index: 2,
          title: '绑定日志'
        }
      ],
      rowList: [],
      equipId: 0
    }
  },
  mounted() {
    this.equipId = this.$route.query.id
    this.getEquipDetailInfo()
  },
  methods: {
    async getEquipDetailInfo() {
      const res = await Api.equipDtailInfo(this.equipId)

      let equipDetailInfo = {}
      if (res.code === 200) {
        equipDetailInfo = { ...res.data }
      }
      equipDetailInfo = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', equipDetailInfo)
      equipDetailInfo = await ReadTypeNameOnVuex.conversion('platformList', 'platformId', 'platformName', equipDetailInfo)

      this.rowList = [
        {
          name: '设备状态:',
          content: {
            equipPower: equipDetailInfo.equipPower,
            equipSignal: equipDetailInfo.equipSignal,
            onlineType: equipDetailInfo.onlineType
          },
          typed: 'status'
        }, {
          name: '设备名称:',
          content: equipDetailInfo.equipName,
          typed: 'info'
        }, {
          name: '设备型号:',
          content: equipDetailInfo.equipModel,
          typed: 'info'
        }, {
          name: '设备类型:',
          content: equipDetailInfo.equipName,
          typed: 'info'
        }, {
          name: 'IMEI码:',
          content: equipDetailInfo.imei,
          typed: 'info'
        },
        {
          name: '所属辖区:',
          content: equipDetailInfo.departName,
          typed: 'info'
        },
        {
          name: '安装位置:',
          content: equipDetailInfo.equipAddress,
          typed: 'info'
        },
        {
          name: '所属网点:',

          content: equipDetailInfo.placeName,

          typed: 'place'
        },
        {
          name: '物联网平台:',
          content: 'OneNet',
          typed: 'info'
        }
      ]
    }
  }
}
</script>

<style>
.iotApp-detail{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(16, 23, 32, 1);
}
.tab-content{
  width: 100%;
  height: 100%;
  position: fixed;
  color: white
}
.iotApp-detail-title-icon{
  height: 17px;
  width: 4px;
}
.iotApp-detail-title{
  font-size: 20px;
  margin-left: 8.5%;
  margin-top: 5%;
}
</style>
