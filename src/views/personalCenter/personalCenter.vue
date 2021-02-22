<template>
  <div>
    personalCenter
    <van-button type="primary" @click="goNext()">
      主要按钮
    </van-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    goNext() {
      this.$router.push('/iotApp')
    }
  }
}
</script>

<style>
  .title {
    font-size: 50px;
  }
</style>
