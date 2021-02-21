<template>
  <div>
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

<style>
.title {
  font-size: 50px;
}
</style>
