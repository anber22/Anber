<template>
  <div class="iotApp-detail">
    <van-tabs v-model="active" swipeable color="#06F0FE" title-active-color="#06F0FE" title-inactive-color="#8BA3C2" background="rgba(16, 23, 32, 1)" sticky ellipsis>
      <van-tab v-for="item in tabList" :key="item" :title="item.title" class="tab-content" />
    </van-tabs>
  </div>
</template>

<script>
// import InfoRow from "/"
export default {
  components: {

  },
  data() {
    return {
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
</style>
