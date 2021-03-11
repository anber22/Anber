<template>
  <div class="iotApp-detail">
    <van-tabs v-model="active" swipeable color="#06F0FE" title-active-color="#06F0FE" title-inactive-color="#8BA3C2" background="rgba(16, 23, 32, 1)" sticky ellipsis>
      <van-tab v-for="item in tabList" :key="item.index" :title="item.title" class="tab-content">
        <div class="iotApp-detail-title">
          <img src="@/assets/images/home/title-icon.png" alt="" class="iotApp-detail-title-icon">
          设备信息
        </div>
        <!-- <InfoRow /> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// import InfoRow from 'cmp/infoRow/InfoRow'
export default {
  components: {
    // InfoRow
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
      rowItem: [
        {
          name: '设备状态：',
          content: 'statusCard'
        }, {
          name: '设备名称：',
          content: '珠海市唐家湾镇88号'
        }, {
          name: '设备型号：',
          content: 'YD100枪型'
        }, {
          name: '设备类型：',
          content: '安全帽监测'
        }
      ]
    }
  },
  mounted() {

  },
  methods: {

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
