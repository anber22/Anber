<template>
  <div class="tabbar-box">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/index" icon="search">
        智慧高投
      </van-tabbar-item>
      <van-tabbar-item replace to="/personalCenter" icon="search">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      active: 1
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
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
</style>

