<template>
  <div class="tabbar-box">
    <van-nav-bar
      :title="title"
      left-arrow
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
    />
    <router-view />
  </div>
</template>

<script>
export default {

  data() {
    return {
      active: 1,
      title: ''
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.title = this.$route.meta.title
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.title = this.$route.meta.title
  },
  methods: {
    onClickLeft() {
      this.$router.back()
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
.van-nav-bar .van-icon {
  width: 19px;
  height: 19px;
    color: white;
}
.van-nav-bar {
    position: relative;
    z-index: 1;
    line-height: 22px;
    text-align: center;
    background-color: rgba(35, 49, 67, 1);
    -webkit-user-select: none;
    user-select: none;
}
.van-hairline--bottom::after {
    border: none;
}
.van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: white;
    font-weight: 500;
    font-size: 18px;
}
</style>

