<template>
  <div class="video-view">
    <van-search v-model="searchValue" class="search-item" background="rgba(16, 23, 32, 1)" placeholder="设备安装位置/IMEI码" @search="onSearch" />
    <div class="video-content">
      <van-collapse v-model="activeName" accordion :border="false" @change="changeCollapse">
        <van-loading v-if="!placeList" size="18px" vertical>
          <span style="color: #6F85A2">加载中...</span>
        </van-loading>
        <van-collapse-item v-for="(item, index) in placeList" v-show="item.count" :key="index" :title="item.placeName + '('+item.count+')'" :name="item.placeId">
          <van-loading v-if="!equipsFlag" size="18px" vertical>
            <span style="color: #6F85A2">加载中...</span>
          </van-loading>
          <div v-if="equipsFlag">
            <Video v-for="(iitem, iindex) in item.equips" :key="iindex" :video-info="iitem" :place-name="item.placeName" />
          </div>
        </van-collapse-item>
      </van-collapse>
      <div v-show="emptyFlag" class="emptyImg">
        <img src="@/assets/images/public/empty.png" alt="">
        <p>无匹配项</p>
      </div>
    </div>
  </div>
</template>

<script>
import Video from 'cmp/video/Video'
import videoApi from '@/api/video'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'

import { mapGetters } from 'vuex'
export default {
  components: {
    Video
  },
  data() {
    return {
      activeName: 0,
      placeList: [],
      searchValue: '',
      // 无匹配项显示
      emptyFlag: false,
      // 判断有没有equips网点下的设备列表
      equipsFlag: false
    }
  },
  computed: {
    ...mapGetters(['equipType', 'activeCollapseName'])
  },
  mounted() {
    /**
     * 获取网点列表，智慧视觉传对应的智慧视觉子系统的id:5
     */
    this.getVideoPlaceList(5, '')
    // this.activeName = this.activeCollapseName
  },
  methods: {
    /**
     * 设备类型关联的场所列表
     */
    async getVideoPlaceList(type, condition) {
      const param = {
        type: type,
        condition: ''
      }
      if (condition) {
        param.condition = '?condition=' + condition
      }
      const res = await videoApi.videoPlaceList(param)
      if (res.code === 200) {
        this.placeList = [...res.data]
        const flag = this.placeList.filter(item => item.count)
        if (!flag.length) {
          this.emptyFlag = true
        } else {
          this.emptyFlag = false
        }

        // 默认展开第一列（获取第一列数据）
        // this.getVideoPlaceEquipList(this.placeList[0].placeId, 5)
        this.placeList.forEach(item => {
          this.getVideoPlaceEquipList(item.placeId, 5, condition)
        })
      }
    },
    /**
     * 切换面板时触发,用选中的placeId获取该网点下的设备列表
     */
    // changePlace(id) {
    //   if (id) {
    //     this.placeList.forEach((item, index) => {
    //       if (!Reflect.has(item, 'equips') && id === item.placeId) {
    //         this.getVideoPlaceEquipList(id, 5)
    //         return true
    //       }
    //     })
    //   }
    // },
    /**
     * 获取场所关联的设备列表
     */
    async getVideoPlaceEquipList(id, type, condition) {
      const param = {
        id: id,
        type: type,
        condition: ''
      }
      if (condition) {
        param.condition = '?condition=' + condition
      }
      const res = await videoApi.videoPlaceEquipList(param)
      if (res.code === 200) {
        // 去vuex获取该网点的设备类型名称，放到数组集合里
        res.data = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', res.data)
        this.placeList.map((item, index) => {
          if (param.id === item.placeId) {
            this.$set(item, 'equips', res.data)
            item.count = res.data.length
            if (item.placeId === this.activeName && item.count === 0) {
              this.activeName = 0
            }
            this.equipsFlag = true
          }
        })
      }
    },
    onSearch(e) {
      this.getVideoPlaceList(5, e)
    },
    // 切换面板时触发
    changeCollapse(e) {
      this.$store.commit('SET_ACTIVE_COLLAPSE_NAME', e)
    }
  }
}
</script>
<style scoped src='./video.css'></style>
<style>
.video-view .van-search__content{
  background-color: rgba(26, 33, 43, 1);
  padding-left: 15px;
}
.video-view .van-search{
  padding: 20px 16px 10px
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
