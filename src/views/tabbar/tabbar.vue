<template>
  <div class="tabbar-box">
    <router-view />
    <van-tabbar route class="van-tabbar-box">
      <van-tabbar-item replace to="/home" icon="home-o">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? homeIcon.active : homeIcon.inactive">
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/index" icon="search">
        <span>智慧高投</span>
        <template #icon="props">
          <img :src="props.active ? indexIcon.active : indexIcon.inactive">
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/personalCenter" icon="search">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? personalCenterIcon.active : personalCenterIcon.inactive">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
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
      }
    }
  },
  mounted() {
  },
  methods: {
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

