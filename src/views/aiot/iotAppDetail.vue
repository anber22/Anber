<template>
  <div class="iotApp-detail">
    <van-tabs v-model="active" swipeable color="#06F0FE" title-active-color="#06F0FE" title-inactive-color="#8BA3C2" background="rgba(16, 23, 32, 1)" sticky ellipsis>
      <van-tab v-for="item in tabList" :key="item.index" :title="item.title" class="tab-content">
        <div class="iotApp-detail-title">
          <img src="@/assets/images/home/title-icon.png" alt="" class="iotApp-detail-title-icon">
          设备信息
        </div>
        <InfoRow v-for="(rowItem,index) in rowList" :key="index" :data="rowItem" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import InfoRow from '@/components/infoRow/InfoRow'
import Api from '@/api/aiot/iotApp.js'
import promiseToList from '@/utils/promiseToList'
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
      let temp = { ...res.data }
      console.log('设备详细信息', temp)
      temp = await promiseToList.conversion('equipType', 'equipType', 'equipTypeName', temp)
      this.rowList = [
        {
          name: '设备状态:',
          content: {
            equipPower: temp.equipPower,
            equipSignal: temp.equipSignal,
            onlineType: temp.onlineType
          },
          typed: 'status'
        }, {
          name: '设备名称:',
          content: temp.equipName,
          typed: 'info'
        }, {
          name: '设备型号：',
          content: temp.equipModel,
          typed: 'info'
        }, {
          name: '设备类型:',
          content: temp.equipTypeName,
          typed: 'info'
        }, {
          name: 'IMEI码:',
          content: temp.imei,
          typed: 'info'
        },
        {
          name: '所属辖区:',
          content: temp.departName,
          typed: 'info'
        },
        {
          name: '安装位置:',
          content: temp.equipAddress,
          typed: 'info'
        },
        {
          name: '所属网点:',
          content: '港湾一号',
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
