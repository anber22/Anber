<template>
  <div class="navbar-box">
    <van-nav-bar
      :title="title"
      left-arrow
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
    >
      <template v-if="showEdit" #right>
        <!-- <img v-permission:[type]="`NavBar-${$route.name}`" src="@/assets/images/public/edit.png" alt="" class="nav-right-edit-icon" @click="changeToEdit()"> -->
      </template>
    </van-nav-bar>
    <keep-alive>
      <!-- 这是会被缓存的页面 -->
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的组件 -->
    </router-view>
  </div>
</template>

<script>
export default {

  data() {
    return {
      type: 'parent',
      active: 1,
      title: '',
      showEdit: false
    }
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        this.title = this.$route.meta.title
        this.showEdit = this.$route.meta.edit
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.title = this.$route.meta.title
    this.showEdit = this.$route.meta.edit
  },
  methods: {
    /**
     * 切换成编辑状态
     */
    changeToEdit() {
      this.$refs.page.toeEdit()
    },
    /**
     * 返回
     */
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
.navbar-box .van-nav-bar .van-icon {
  width: 19px;
  height: 19px;
  color: white;
}
.navbar-box .van-nav-bar {
  position: relative;
  z-index: 1;
  line-height: 22px;
  text-align: center;
  background-color: rgba(35, 49, 67, 1);
  -webkit-user-select: none;
  user-select: none;
}
.navbar-box .van-hairline--bottom::after {
    border: none;
}
.navbar-box .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: white;
    font-weight: 500;
    font-size: 18px;
}
.navbar-box .nav-right-edit-icon{
  width: 17px;
  height: 17px;
}
.navbar-box .van-nav-bar__placeholder{
  height: 45px !important;
}
</style>

