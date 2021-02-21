<template>
  <div>
    <van-nav-bar left-arrow>
      <template #left>
        <van-icon name="arrow-left" size="18" />
        <van-search
          v-model="value1"
          placeholder="请输入搜索关键词"
          background="transparent"
          search-input-height="20px"
        />
      </template>
      <template #right>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </template>
    </van-nav-bar>
    <!-- <img src="../asset/img.png" alt=""> -->
    <button class="title" @click="click">
      一起学习前端吧
    </button>
    <van-button type="primary">
      主要按钮
    </van-button>
    <van-grid direction="horizontal" :column-num="1">
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    <van-row>
      <van-col span="8">
        span: 8
      </van-col>
      <van-col span="8">
        span: 8
      </van-col>
      <van-col span="8">
        span: 8
      </van-col>
    </van-row>

    <van-row>
      <van-col span="4">
        span: 4
      </van-col>
      <van-col span="10" offset="4">
        offset: 4, span: 10
      </van-col>
    </van-row>

    <van-row>
      <van-col offset="12" span="12">
        offset: 12, span: 12
      </van-col>
    </van-row>
    <!-- <img src="@/3474.jpg"> -->
  </div>
</template>

<script>
import { Wechat } from '@/utils/wechat'
import { Toast } from 'vant'
export default {
  data() {
    return {
      wechat: null,
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ]
    }
  },
  mounted() {
    this.wechat = new Wechat()
  },
  methods: {
    onClickLeft() {
      Toast('返回')
    },
    onClickRight() {
      Toast('按钮')
    },
    click() {
      this.$router.push('/iotApp')
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 50px;
}
</style>
