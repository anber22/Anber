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

    <div ref="wrapper" class="hazard-content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="van-clearfix"
        :immediate-check="false"
        @load="getAnalysisList"
      >
        <div v-for="item in hazardList" :key="item.index" @click="showDetail(item.id)">
          <Adaptive :size="['100%','38.39%']" class="hazard-list-card">
            <HazardListCard :hazar-data="item" />
          </Adaptive>
        </div>
      </van-list>
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
import DateTransformation from '@/utils/dateTransformation.js'

import Api from '@/api/hazard/hazard.js'

export default {
  components: {
    HazardListCard
  },
  /**
   * 从当前页面离开时触发
   */
  beforeRouteLeave(to, from, next) {
    // 记录当前页面某个组件记录的高度
    this.scrollTop = this.$refs.wrapper.scrollTop
    console.log('上次保存的高度', this.$refs.wrapper.scrollTop)
    // 执行路由管道的下一个
    next()
  },
  data() {
    return {
      hazardList: [],
      queryCondition: '',
      hazardType: 0,
      hazardTypeId: 0,
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
      equipId: 0,
      page: 0,
      finished: false,
      networkType: 0,
      endDate: '',
      startDate: '',
      scrollTop: 0

    }
  },
  mounted() {
    this.getHazardTypeList()
    if (this.$route.query) {
      this.equipId = this.$route.query.equipId ? this.$route.query.equipId : 0
      if (this.$route.query.fromPage === '/propertyPlate') {
        const dateTransformation = new DateTransformation()
        const dd = new Date()
        this.endDate = dateTransformation.dataFormat(JSON.parse(JSON.stringify(dd)))
        dd.setDate(dd.getDate() - this.$route.query.days)// 获取AddDayCount天后的日期
        this.startDate = dateTransformation.dataFormat(dd)
        this.startDate = this.startDate.slice(0, 10) + ' 00:00:00'
        this.status = this.$route.query.dealType === 'count' ? 0 : this.$route.query.dealType === 'undone' ? 1 : this.$route.query.dealType === 'done' ? 2 : 0

        this.hazardTypeId = this.$route.query.hazardType

        this.networkType = this.$route.query.networkType
      }
      // else if (this.$route.query.fromPage === '/safetyCommitteePlate') {
      // }
    }

    this.getAnalysisList()
  },
  /**
   * 当前路由如果有keep-alive状态则不执行created，进入该生命周期
   */
  activated() {
    console.log('上次浏览的高度', this.scrollTop)
    // 将上次记录的滚动高度记录到当前页面
    this.$refs.wrapper.scrollTop = this.scrollTop
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
      this.hazardType = index[0]
      this.status = index[1]
      this.hazardList = []
      this.finished = false
      this.page = 0
      this.hazardTypeId = 0
      // this.formattingCondition()
      this.getAnalysisList()
    },
    /**
     * 查询
     */
    onSearch(e) {
      this.hazardList = []
      this.finished = false
      this.page = 0
      this.hazardTypeId = 0
      this.getAnalysisList()
    },
    /**
     * 获取隐患列表
     */
    async getAnalysisList() {
      const params = {
        type: 0,
        page: ++this.page,
        size: 10,
        condition: this.formattingCondition()
      }

      const res = await Api.hazardList(params)
      let temp = []
      if (res.code === 200) {
        temp = res.data.rows
        if (temp.length === 0) {
          this.loading = false
          this.finished = true
          this.hazardList = []
          return
        }
      }

      temp = await ReadTypeNameOnVuex.conversion('hazardType', 'hazardType', 'hazardTypeName', temp)
      temp = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', temp)

      this.hazardList = this.hazardList.concat(temp)
      this.loading = false
      if (params.page === 3) {
        this.finished = true
      }
    },
    /**
     * 获取隐患类型列表
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
      if (this.hazardType !== 0) {
        if (!first) {
          conditionStr = conditionStr + '?hazardType=' + this.hazardTypeList[(this.hazardType === 0 ? 0 : this.hazardType - 1)].id
          first = true
        } else {
          conditionStr = conditionStr + '&hazardType=' + this.hazardTypeList[(this.hazardType === 0 ? 0 : this.hazardType - 1)].id
        }
      }
      if (this.hazardTypeId !== 0) {
        if (!first) {
          conditionStr = conditionStr + '?hazardType=' + this.hazardTypeId
          first = true
        } else {
          conditionStr = conditionStr + '&hazardType=' + this.hazardTypeId
        }
      }
      if (this.status !== 0) {
        if (!first) {
          conditionStr = conditionStr + '?isDone=' + (this.status - 1)
          first = true
        } else {
          conditionStr = conditionStr + '&isDone=' + (this.status - 1)
        }
      }
      if (this.equipId > 0) {
        if (!first) {
          conditionStr = conditionStr + '?equipId=' + (this.equipId)
          first = true
        } else {
          conditionStr = conditionStr + '&equipId=' + (this.equipId)
        }
      }
      if (this.networkType > 0) {
        if (!first) {
          conditionStr = conditionStr + '?networkType=' + (this.networkType)
          first = true
        } else {
          conditionStr = conditionStr + '&networkType=' + (this.networkType)
        }
      }
      if (this.startDate !== '' && this.endDate !== '') {
        if (!first) {
          conditionStr = conditionStr + '?startDate=' + (this.startDate) + '&endDate=' + (this.endDate)
        } else {
          conditionStr = conditionStr + '&startDate=' + (this.startDate) + '&endDate=' + (this.endDate)
        }
      }
      return conditionStr
    }
  }
}
</script>

<style src="./hazard.css" scoped>

</style>
<style>
.hazard .van-picker__columns {
  background-color: #10161F;
}
.hazard .van-picker__mask{
  background-image: linear-gradient(180deg,hsla(216, 32%, 9%, .4),hsla(216, 32%, 9%, .9)),linear-gradient(0deg,hsla(216, 32%, 9%, .4),hsla(216, 32%, 9%, .9));
}
.hazard .van-picker-column__item {
  color:#B9CEE9
}
.hazard .van-picker__toolbar{
  background-color: #10161F
}
.hazard .van-picker__title{
  color:#B9CEE9
}
.hazard .van-field__control{
  color: #8BA3C2;
}
.hazard .van-search__content {
  background-color: #1A212B;
}
.hazard input::-webkit-input-placeholder{
  color: #373F4A !important;
  font-size: 12px
}
</style>
