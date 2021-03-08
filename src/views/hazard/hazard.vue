<template>
  <div class="analysis">
    <div class="analysis-input">
      <van-search v-model="queryCondition" placeholder="设备名称/IMEI码" background="#101720" @search="onSearch" />
    </div>
    <div class="analysis-button">
      <img src="@/assets/images/public/screening.png" alt="" class="analysis-icon" @click="showPopup">
    </div>

    <div class="analysis-content">
      <div v-for="item in analysisList" :key="item.index" @click="showDetail(item.id)">
        <Adaptive :data="['94%','38.39%']" class="analysis-list-card">
          <HazardListCard :data="item" />
        </Adaptive>
      </div>
    </div>

    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        title="请选择"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import HazardListCard from 'cmp/hazardListCard/HazardListCard'
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
      equipTypeList: [],
      show: false,
      status: 0
    }
  },
  mounted() {
    this.getAnalysisList()
    this.getEquipTypeList()
  },
  methods: {
    showDetail(e) {
      this.$router.push({ name: 'HazardDetail', params: { id: e }})
    },
    onConfirm(value, index) {
      this.show = false
      this.equipType = index[0]
      this.status = index[1]
      console.log(value, index, 'iiiii')
      // this.formattingCondition()
      this.getAnalysisList()
    },
    onCancel() {
      this.show = false
    },
    showPopup() {
      this.show = true
    },

    onSearch(e) {
      this.getAnalysisList()
    },
    // 获取隐患列表
    async getAnalysisList() {
      const params = {
        type: 0,
        page: 1,
        size: 24,
        condition: this.formattingCondition()
      }
      const res = await Api.analysisList(params)
      this.analysisList = [...res.data.rows]
      console.log(this.analysisList, 'analysisList')
    }, // 获取设备类型列表
    async getEquipTypeList() {
      const res = await Api.equipTypeList(0)
      this.equipTypeList = [...res.data]
      this.equipTypeList.forEach(item => {
        // 这里有问题，不是拿设备类型，是要拿隐患类型
        // 这里有问题，不是拿设备类型，是要拿隐患类型
        // 这里有问题，不是拿设备类型，是要拿隐患类型
        // 这里有问题，不是拿设备类型，是要拿隐患类型
        // 这里有问题，不是拿设备类型，是要拿隐患类型
        this.columns[0].values.push(item.name)
      })
    },
    formattingCondition() {
      let conditionStr = ''
      let first = false
      if (this.queryCondition.length > 0) {
        conditionStr = conditionStr + '?condition=' + this.queryCondition
        first = true
      }
      if (this.equipType !== 0) {
        if (!first) {
          conditionStr = conditionStr + '?hazardType=' + this.equipType
          first = true
        } else {
          conditionStr = conditionStr + '&hazardType=' + this.equipType
        }
      }
      if (this.status !== 0) {
        if (!first) {
          conditionStr = conditionStr + '?isDone=' + this.status
        } else {
          conditionStr = conditionStr + '&isDone=' + this.status
        }
      }

      return conditionStr
    }
  }
}
</script>

<style>
.analysis{
    width: 100%;
  height: 100%;
  position: fixed;
  background-color: #101720;
}
.analysis-content{
padding: 0px 3% 52% 3%;
  width: 100%;
  height: 80%;
  position: fixed;
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
