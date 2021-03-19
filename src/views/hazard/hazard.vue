<template>
  <div class="hazard">
    <!-- 头部搜索栏 start -->
    <div class="hazard-input">
      <van-search v-model="queryCondition" placeholder="网点名称/IMEI码" background="#101720" @search="onSearch" />
    </div>
    <div class="hazard-button">
      <img src="@/assets/images/public/screening.png" alt="" class="hazard-icon" @click="show = true">
    </div>
    <!-- end -->

    <!-- 详情列表 start -->
    <van-loading v-if="loading" size="24px" vertical>
      加载中...
    </van-loading>
    <div v-if="!loading" class="hazard-content">
      <div v-for="item in hazardList" :key="item.index" @click="showDetail(item.id)">
        <Adaptive :data="['94%','38.39%']" class="hazard-list-card">
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
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'

import Api from '@/api/hazard/hazard.js'

export default {
  components: {
    HazardListCard
  },
  data() {
    return {
      hazardList: [],
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
      loading: true,
      equipId: 0
    }
  },
  mounted() {
    this.equipId = this.$route.query ? this.$route.query.equipId : 0
    this.getAnalysisList()
    this.getHazardTypeList()
  },
  methods: {
    /**
     * 跳转详情
     */
    showDetail(e) {
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

      const res = await Api.hazardList(params)
      if (res.code === 200) {
        this.hazardList = res.data.rows
      }
      this.hazardList = await ReadTypeNameOnVuex.conversion('hazardType', 'hazardType', 'hazardTypeName', this.hazardList)
      this.hazardList = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', this.hazardList)
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
      if (this.equipId > 0) {
        if (!first) {
          conditionStr = conditionStr + '?equipId=' + (this.equipId)
        } else {
          conditionStr = conditionStr + '&equipId=' + (this.equipId)
        }
      }
      return conditionStr
    }
  }
}
</script>

<style src="./hazard.css">

</style>
