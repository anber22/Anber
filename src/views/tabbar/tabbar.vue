<template>
  <div class="tabbar-box">
    <router-view />
    <van-tabbar route class="van-tabbar-box">
      <van-tabbar-item v-for="(item ,index) in tabList" :key="index" replace :to="item.path" icon="home-o">
        <span>{{ item.name }}</span>
        <template #icon="props">
          <img :src="props.active ? require(item.active) : require(item.inactive)">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data() {
    return {
      active: 1,
      homeIcon: {
        active: require('/src/assets/images/public/home-active.png'),
        inactive: require('/src/assets/images/public/home.png')
      },
      indexIcon: {
        active: require('/src/assets/images/public/index-active.png'),
        inactive: require('/src/assets/images/public/index.png')
      },
      personalCenterIcon: {
        active: require('/src/assets/images/public/personalCenter-active.png'),
        inactive: require('/src/assets/images/public/personalCenter.png')
      },
      tabList: []
    }
  },
  mounted() {
    console.log('当前路由集合', this.$store.getters.permission_routers[0])
    this.$store.getters.permission_routers[0].children.forEach(item => {
      this.tabList.push({ name: item.meta.title, path: item.path, active: item.meta.active, inactive: item.meta.inactive })
    })
    console.log('过滤完毕', this.tabList)
  },
  methods: {
    showDone() {
      console.log('正在开发中')
      Toast('正在开发中...')
    }
  }
}
</script>

<style>
.title {
  font-size: 50px;
}
</style>
<style>
.tabbar-box .van-tabbar-item--active{
  color: rgba(6, 240, 254, 1) !important;
  background: rgba(16, 25, 32, 1);
}
.tabbar-box .van-tabbar-item{
  color: rgba(147, 158, 191, 1);
  background: rgba(16, 25, 32, 1);
}
.van-tabbar-box{
  z-index: 10
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  border: none
}
.van-tabbar {
  background-color:  #101920;
}
</style>

