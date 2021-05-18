<template>
  <div class="placeResource">
    <img class="add-outlet" src="@/assets/images/equip/add-outlet.png" alt="" @click="$router.push({path:'/placeResourceAddition'})">
    <van-search v-model="queryCondition" placeholder="网点名称/网点地址" background="#101720" @search="onSearch" />
    <div v-if="placeResourceList" class="placeResource-content">
      <!-- <van-loading v-if="loading" size="24px" vertical>
        加载中...
      </van-loading> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="van-clearfix"
        :immediate-check="false"
        @load="getPlaceResourceList"
      >
        <Adaptive v-for="item in placeResourceList" :key="item.index" :size="['94%','31.39%']" class="placeResource-list-card">
          <PlaceResourceListCard :place-data="item" />
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
      loading: true,
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
      this.loading = true
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
        listData.forEach(async(item) => {
          const params = '?networkId=' + item.placeId
          const res = await Api.placeResourceCount(params)
          if (res.code === 200) {
            console.log('count-', res.data)
            item.count = res.data
          }
          console.log('await count', item.count)
        })
        // 去vuex获取该网点的网点类型名称，放到数组集合里
        listData = await ReadTypeNameOnVuex.conversion('placeType', 'placeTypeId', 'placeTypeName', listData)

        this.placeResourceList = this.placeResourceList.concat(listData)
        console.log('this.placeResourceList---', this.placeResourceList)
      }
      if (params.page === res.data.total) {
        this.finished = true
      }
      this.loading = false
    },
    async getPlaceResourceCount(id) {
      const params = '?networkId=' + id
      const res = await Api.placeResourceCount(params)
      if (res.code === 200) {
        console.log('count-', res.data)
        return res.data
      }
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

<style scoped>
.placeResource{
  width: 100%;
  height: calc(100% - 45px);
  position: fixed;
  background-color: #101720;
  position: relative;
}
.add-outlet{
  height: 54px;
  width: 54px;
  position: absolute;
  bottom: 54px;
  right: 24px;
  z-index: 9999;
}
.placeResource-content{
padding: 0px 3% 52% 3%;
  width: 100%;
  height: 85%;
  position: fixed;
  overflow: scroll;
}
.placeResource-list-card{
  margin-top: 3%;
}
</style>
<style>
.placeResource .van-search__content {
  background-color: #1A212B;
}
.placeResource input::-webkit-input-placeholder{
  color: #373F4A !important;
  font-size: 12px
}
.placeResource .van-field__control{
  color: #8BA3C2;
}
</style>
