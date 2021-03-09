<template>
  <div class="placeResourc">
    <van-search v-model="queryCondition" placeholder="请输入搜索关键词" background="#101720" @search="onSearch" />
    <div class="placeResourc-content">
      <Adaptive v-for="item in placeResourcList" :key="item.index" :data="['94%','31.39%']" class="placeResourc-list-card">
        <PlaceResourcListCard :data="item" />
      </Adaptive>
    </div>
  </div>
</template>

<script>
import PlaceResourcListCard from 'cmp/placeResourcListCard/PlaceResourcListCard'
import Api from '@/api/placeResourc/placeResourc.js'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters(['placeType'])
  },
  mounted() {
    this.getPlaceResourcList()
  },
  methods: {
    async getPlaceResourcList() {
      const params = {
        // systemType: this.thisSubsystemId,
        page: 1,
        size: 12,
        condition: (this.queryCondition.length < 1 ? '' : ('?condition=' + this.queryCondition))
      }
      const res = await Api.placeResourcList(params)
      if (res.code === 200) {
        const listData = [...res.data.rows]
        const placeTypeList = await this.placeType
        listData.forEach((item, index) => {
          const placeTypeName = placeTypeList.filter(e =>
            item.placeTypeId === e.id
          )
          Reflect.set(item, 'placeTypeName', placeTypeName.length > 0 ? placeTypeName[0].name : '')
        })
        this.placeResourcList = listData
      }
    },
    onSearch(e) {
      this.getPlaceResourcList()
    }
  }
}
</script>

<style>
.placeResourc{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #101720
}
.placeResourc-content{
padding: 0px 3% 52% 3%;
  width: 100%;
  height: 80%;
  position: fixed;
  overflow: scroll;
}
.placeResourc-list-card{
  margin-top: 3%;
}
.van-search__content {
  background-color: #1A212B;
}
input::-webkit-input-placeholder{
  color: #373F4A !important;

font-size: 12px
}
</style>
