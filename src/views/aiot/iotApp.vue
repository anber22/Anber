<template>
  <div>
    <van-nav-bar
      title="智慧物联"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <img src="../asset/img.png" alt=""> -->
    <button class="title" @click="click">
      一起学习前端吧!
    </button>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  data() {
    return {
      wechat: null
    }
  },
  mounted() {
    // this.wechat = new Wechat()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },

    click() {
      // this.$router.back()
      // this.wechat.initConfig()
      // this.wechat.navigation({ lat: 37.54599, lon: 104.00231 }, '测试', '潮庭集团')
      // this.wechat.location()
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 50px;
}
</style>
