<template>
  <div class="analysis">
    <!-- 头部搜索栏 start -->
    <div class="analysis-input">
      <van-search v-model="queryCondition" placeholder="网点名称/IMEI码" background="#101720" @search="onSearch" />
    </div>
    <div class="analysis-button">
      <img src="@/assets/images/public/screening.png" alt="" class="analysis-icon" @click="show = true">
    </div>
    <!-- end -->

    <!-- 详情列表 start -->
    <div v-if="!loading" class="analysis-content">
      <div v-for="item in analysisList" :key="item.index" @click="showDetail(item.id)">
        <Adaptive :data="['94%','38.39%']" class="analysis-list-card">
          <HazardListCard :data="item" />
        </Adaptive>
      </div>
    </div>
    <!-- end -->

    <!-- picker start -->
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        title="请选择"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
    <!-- end -->
  </div>
</template>

<script>
import HazardListCard from 'cmp/hazardListCard/HazardListCard'
import promiseToList from '@/utils/promiseToList'

import Api from '@/api/hazard/hazard.js'

export default {
  components: {
    HazardListCard
  },
  data() {
    return {
      analysisList: [],
      queryCondition: '',
      equipType: 0,
      columns: [
        // 第一列
        {
          values: ['全部'],
          defaultIndex: 0
        },
        // 第二列
        {
          values: ['全部', '未处理', '已处理'],
          defaultIndex: 0
        }
      ],
      hazardTypeList: [],
      show: false,
      status: 0,
      loading: true
    }
  },
  mounted() {
    this.getAnalysisList()
    this.getHazardTypeList()
  },
  methods: {
    /**
     * 跳转详情
     */
    showDetail(e) {
      console.log('网点id', e)
      this.$router.push({
        path: '/hazardDetail',
        query: {
          hazardId: e
        }
      })
    },
    /**
     * picker确认
     */
    onConfirm(value, index) {
      this.show = false
      this.equipType = index[0]
      this.status = index[1]
      // this.formattingCondition()
      this.getAnalysisList()
    },
    /**
     * 查询
     */
    onSearch(e) {
      this.getAnalysisList()
    },
    /**
     * 获取隐患列表
     */
    async getAnalysisList() {
      this.loading = true

      const params = {
        type: 0,
        page: 1,
        size: 999,
        condition: this.formattingCondition()
      }
      const res = await Api.analysisList(params)
      if (res.code === 200) {
        this.analysisList = [...res.data.rows]
      }
      this.analysisList = await promiseToList.conversion('hazardType', 'hazardType', 'hazardTypeName', this.analysisList)
      this.analysisList = await promiseToList.conversion('equipType', 'equipType', 'equipTypeName', this.analysisList)
      console.log(this.analysisList, 'analysisList')
      this.loading = false
    },
    /**
     * 获取设备类型列表
     */
    async getHazardTypeList() {
      const res = await Api.hazardTypeList(0)
      if (res.code === 200) {
        this.hazardTypeList = [...res.data]
      }
      this.hazardTypeList.forEach(item => {
        this.columns[0].values.push(item.name)
      })
    },
    /**
     * 格式化path传参
     */
    formattingCondition() {
      let conditionStr = ''
      let first = false
      if (this.queryCondition.length > 0) {
        conditionStr = conditionStr + '?condition=' + this.queryCondition
        first = true
      }
      if (this.equipType !== 0) {
        if (!first) {
          conditionStr = conditionStr + '?hazardType=' + this.hazardTypeList[(this.equipType === 0 ? 0 : this.equipType - 1)].id
          first = true
        } else {
          conditionStr = conditionStr + '&hazardType=' + this.hazardTypeList[(this.equipType === 0 ? 0 : this.equipType - 1)].id
        }
      }
      if (this.status !== 0) {
        if (!first) {
          conditionStr = conditionStr + '?isDone=' + (this.status - 1)
        } else {
          conditionStr = conditionStr + '&isDone=' + (this.status - 1)
        }
      }

      return conditionStr
    }
  }
}
</script>

<style>
.analysis{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #101720;
}
.analysis-content{
  position: fixed;
  padding: 0px 3% 52% 3%;
  width: 100%;
  height: 80%;
  overflow: scroll;
}
.analysis-list-card{
  margin-top: 3%;
}
.van-search__content {
  background-color: #1A212B;
}
input::-webkit-input-placeholder{
  color: #373F4A !important;
  font-size: 12px
}
.analysis-input{
  width: 90%;
  display: inline-block;
}
.analysis-button{
  width: 5%;
  display: inline-block;
}
.analysis-icon{
width: 20px;
height: 20px;
}
.van-picker__columns {
  background-color: #10161F;
}
.van-picker__mask{
  background-image: linear-gradient(180deg,hsla(216, 32%, 9%, .4),hsla(216, 32%, 9%, .9)),linear-gradient(0deg,hsla(216, 32%, 9%, .4),hsla(216, 32%, 9%, .9));
}
.van-picker-column__item {
  color:#B9CEE9
}
.van-picker__toolbar{
  background-color: #10161F
}
.van-picker__title{
  color:#B9CEE9
}
</style>
