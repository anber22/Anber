<template>
  <div class="placeResource">
    <van-search v-model="queryCondition" placeholder="网点名称/网点地址" background="#101720" @search="onSearch" />
    <div class="placeResource-content">
      <van-loading v-if="!placeResourcList" size="24px" vertical>
        加载中...
      </van-loading>
      <Adaptive v-for="item in placeResourcList" :key="item.index" :data="['94%','31.39%']" class="placeResource-list-card">
        <PlaceResourcListCard :data="item" />
      </Adaptive>
    </div>
  </div>
</template>

<script>
import PlaceResourcListCard from 'cmp/placeResourcListCard/PlaceResourcListCard'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'

import Api from '@/api/placeResource/placeResource.js'

export default {
  components: {
    PlaceResourcListCard
  },
  data() {
    return {
      placeResourcList: [],
      queryCondition: '',
      placeTypeList: []
    }
  },
  mounted() {
    if (this.placeResourcList.length === 0) {
      this.getPlaceResourcList()
    }
  },
  methods: {
    async getPlaceResourcList() {
      const params = {
        // systemType: this.thisSubsystemId,
        page: 1,
        size: 999,
        condition: (this.queryCondition.length < 1 ? '' : ('?condition=' + this.queryCondition))
      }
      const res = await Api.placeResourcList(params)
      if (res.code === 200) {
        let listData = [...res.data.rows]
        // 去vuex获取该网点的网点类型名称，放到数组集合里
        listData = await ReadTypeNameOnVuex.conversion('placeType', 'placeTypeId', 'placeTypeName', listData)
        this.placeResourcList = listData
      }
    },
    /**
     * 搜索触发事件
     */
    onSearch(e) {
      this.getPlaceResourcList()
    }
  }
}
</script>

<style>
.placeResource{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #101720;
}
.placeResource-content{
padding: 0px 3% 52% 3%;
  width: 100%;
  height: 80%;
  position: fixed;
  overflow: scroll;
}
.placeResource-list-card{
  margin-top: 3%;
}
.van-search__content {
  background-color: #1A212B;

}
input::-webkit-input-placeholder{
  color: #373F4A !important;

font-size: 12px
}
.van-field__control{
  color: #8BA3C2;
}
</style>
