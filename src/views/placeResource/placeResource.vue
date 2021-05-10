<template>
  <div class="placeResource">
    <img class="add-outlet" src="@/assets/images/equip/add-outlet.png" alt="" @click="$router.push({path:'/placeResourceAddition'})">
    <van-search v-model="queryCondition" placeholder="网点名称/网点地址" background="#101720" @search="onSearch" />
    <div class="placeResource-content">
      <van-loading v-if="!placeResourceList" size="24px" vertical>
        加载中...
      </van-loading>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="van-clearfix"
        :immediate-check="false"
        @load="getPlaceResourceList"
      >
        <Adaptive v-for="item in placeResourceList" :key="item.index" :data="['94%','31.39%']" class="placeResource-list-card">
          <PlaceResourceListCard :data="item" />
        </Adaptive>
      </van-list>
    </div>
  </div>
</template>

<script>
import PlaceResourceListCard from 'cmp/placeResourceListCard/PlaceResourceListCard'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'

import Api from '@/api/placeResource/placeResource.js'

export default {
  components: {
    PlaceResourceListCard
  },
  data() {
    return {
      loading: false,
      placeResourceList: [],
      queryCondition: '',
      placeTypeList: [],
      page: 0,
      finished: false
    }
  },
  mounted() {
    if (this.placeResourceList.length === 0) {
      this.getPlaceResourceList()
    }
  },
  methods: {
    async getPlaceResourceList() {
      const params = {
        // systemType: this.thisSubsystemId,
        page: ++this.page,
        size: 10,
        condition: (this.queryCondition.length < 1 ? '' : ('?condition=' + this.queryCondition))
      }
      const res = await Api.placeResourceList(params)

      if (res.code === 200) {
        let listData = [...res.data.rows]

        if (listData.length === 0) {
          this.loading = false
          this.finished = true
          this.placeResourceList = []
          return
        }
        // 去vuex获取该网点的网点类型名称，放到数组集合里
        listData = await ReadTypeNameOnVuex.conversion('placeType', 'placeTypeId', 'placeTypeName', listData)
        this.placeResourceList = this.placeResourceList.concat(listData)
      }
      if (params.page === res.data.total) {
        this.finished = true
      }
      this.loading = false
    },
    /**
     * 搜索触发事件
     */
    onSearch(e) {
      this.placeResourceList = []
      this.finished = false
      this.page = 0
      this.getPlaceResourceList()
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
  position: relative;
}
.add-outlet{
  height: 54px;
  width: 54px;
  position: absolute;
  top: 580px;
  left: 306px;
  z-index: 9999;
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
