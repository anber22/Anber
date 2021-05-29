<template>
  <div class="placeResource">
    <!-- <img v-permission:[type]="`PlaceResource-Add`" class="add-outlet" src="@/assets/images/equip/add-outlet.png" alt="" @click="$router.push({path:'/placeResourceAddition'})"> -->
    <van-search v-model="queryCondition" placeholder="网点名称/网点地址" background="#101720" @search="onSearch" />
    <div v-if="placeResourceList.length>0" class="placeResource-content">
      <van-loading v-if="loading" size="24px" vertical>
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
        <div v-for="item in placeResourceList" :key="item.index">
          <Adaptive :size="['100%','31.39%']" class="placeResource-list-card">
            <PlaceResourceListCard :place-data="item" />
          </Adaptive>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import PlaceResourceListCard from 'cmp/placeResourceListCard/PlaceResourceListCard'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
import JsStabilization from '@/utils/jsStabilization'

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
      finished: false,
      jsStabilization: null
    }
  },
  mounted() {
    if (this.placeResourceList.length === 0) {
      this.getPlaceResourceList()
    }
    this.jsStabilization = new JsStabilization()
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
      const total = res.data.total
      let listData = []
      if (res.code === 200) {
        listData = [...res.data.rows]
        if (params.page >= total) {
          this.finished = true
          this.loading = false
        }
        if (listData.length === 0) {
          this.loading = false
          this.finished = true
          this.placeResourceList = listData
        }
      }
      // 去vuex获取该网点的网点类型名称，放到数组集合里
      listData = await ReadTypeNameOnVuex.conversion('placeType', 'placeTypeId', 'placeTypeName', listData)
      this.placeResourceList = this.placeResourceList.concat(listData)
      this.loading = false
      const getRealDataAndHzardCount = this.jsStabilization.stabilization(
        //
        async() => {
          // this.loading = true
          const listData = JSON.parse(JSON.stringify(this.placeResourceList))
          for (let i = 0; i < listData.length; i++) {
            if (listData[i].count === undefined) {
              const params = '?networkId=' + listData[i].placeId
              const res = await Api.placeResourceCount(params)
              if (res.code === 200) {
                listData[i]['count'] = res.data
              }
            }
          }

          this.placeResourceList = JSON.parse(JSON.stringify(listData))
          // this.loading = false
        }, 1000)
      getRealDataAndHzardCount()
    },
    async getPlaceResourceCount(id) {
      const params = '?networkId=' + id
      const res = await Api.placeResourceCount(params)
      if (res.code === 200) {
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
  /* position: fixed; */
  background-color: #101720;
  position: relative;
  -webkit-overflow-scrolling: touch;
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
  padding: 0px 3% 5% 3%;
  width: 94%;
  height: 88%;
  /* position: fixed; */
  overflow-x: hidden;
  overflow-y: scroll;
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
