<template>
  <div class="video-view">
    <van-search v-model="searchValue" class="search-item" background="rgba(16, 23, 32, 1)" placeholder="请输入搜索关键词" />
    <div class="video-content">
      <van-collapse v-model="activeName" accordion :border="false" @change="changePlace">
        <van-collapse-item v-for="(item, index) in placeList" :key="index" :title="item.placeName" :name="item.placeId">
          <div v-if="item.equips">
            <Video v-for="(iitem, iindex) in item.equips" :key="iindex" :data="iitem" :placename="item.placeName" />
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import Video from 'cmp/video/Video'
import videoApi from '@/api/video'
import { mapGetters } from 'vuex'
import promiseToList from '@/utils/promiseToList'
export default {
  components: {
    Video
  },
  data() {
    return {
      activeName: null,
      placeList: [],
      searchValue: null
    }
  },
  computed: {
    ...mapGetters(['equipType'])
  },
  mounted() {
    /**
     * 获取网点列表，智慧视觉传对应的智慧视觉子系统的id:5
     */
    this.getVideoPlaceList(5)
  },
  methods: {
    /**
     * 设备类型关联的场所列表
     */
    async getVideoPlaceList(type) {
      const res = await videoApi.videoPlaceList(type)
      if (res.code === 200) {
        this.placeList = [...res.data]
        this.activeName = this.placeList[0].placeId
        // 默认展开第一列（获取第一列数据）
        this.getVideoPlaceEquipList(this.placeList[0].placeId, 5)
      }
    },
    /**
     * 切换面板时触发,用选中的placeId获取该网点下的设备列表
     */
    changePlace(id) {
      if (id) {
        this.placeList.forEach((item, index) => {
          if (!Reflect.has(item, 'equips') && id === item.placeId) {
            this.getVideoPlaceEquipList(id, 5)
            return true
          }
        })
      }
    },
    /**
     * 获取场所关联的设备列表
     */
    async getVideoPlaceEquipList(id, type) {
      const param = {
        id: id,
        type: type
      }
      const res = await videoApi.videoPlaceEquipList(param)
      if (res.code === 200) {
        // 去vuex获取该网点的设备类型名称，放到数组集合里
        res.data = await promiseToList.conversion('equipType', 'equipType', 'equipTypeName', res.data)

        for (const i in this.placeList) {
          if (param.id === this.placeList[i].placeId) {
            this.$set(this.placeList[i], 'equips', res.data)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.video-view{
  position: fixed;
  width: 100%;

  height: 100%;
  background-color: rgba(16, 23, 32, 1);
  color: #fff;
  min-height: 100%;
}
.video-content{
  position: fixed;
  width: 92%;

  height: 80%;
  overflow: scroll;
  padding: 0 4%;
}
</style>
<style>
.video-view .van-search__content{
  background-color: rgba(26, 33, 43, 1);
  padding-left: 15px;
}
.video-view .van-search{
  padding: 20px 16px 0
}
.video-view .van-field__left-icon .van-icon{
  font-size: 24px
}
/* 修改搜索输入框默认样式 */
.video-view input::-webkit-input-placeholder {
  color: rgba(55, 63, 74, 1);
}
.video-view  input::-moz-input-placeholder {
  color: rgba(55, 63, 74, 1);
}
.video-view  input::-ms-input-placeholder {
  color: rgba(55, 63, 74, 1);
}
.video-view .search-item input:focus {
  color: rgba(139, 163, 194, 1) !important
}
/* 手风琴样式修改 */

.video-view .van-cell{
  background-color: transparent;
  color: #8BA3C2;
  font-size: 15px;
  padding: 10px 0px;
}
/* 展开的样式 */
.video-view .van-collapse-item__content{
  background-color: transparent;
  color: #8BA3C2;
  font-size: 15px;
  padding: 0
}
/* 隐藏item下边框 */
.video-view .van-cell::after{
  border-bottom: 1px solid #283444;
  left: 0;
  right: 0
}
/* 隐藏item上边框 */
.video-view .van-collapse-item--border::after{
  border: none
}
/* content设置padding */
.video-view .van-collapse-item__wrapper{
  padding-top: 20px;
}
/* input失去焦点时文字颜色 */
.video-view .van-field__control{
  color: #8BA3C2
}
</style>
