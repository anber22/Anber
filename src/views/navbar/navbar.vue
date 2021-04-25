<template>
  <div class="tabbar-box">
    <van-nav-bar
      :title="title"
      left-arrow
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
    >
      <template v-if="showEdit" #right>
        <img src="@/assets/images/public/edit.png" alt="" class="nav-right-edit-icon" @click="chengeToEdit">
      </template>
    </van-nav-bar>
    <router-view />
  </div>
</template>

<script>
export default {

  data() {
    return {
      active: 1,
      title: '',
      showEdit: false
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.title = this.$route.meta.title
        this.showEdit = this.$route.meta.edit
        console.log(this.showEdit)
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
    chengeToEdit() {
      console.log('点击编辑', this)
      this.toeEdit()
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
.nav-right-edit-icon{
  width: 17px;
  height: 17px;
}
</style>

