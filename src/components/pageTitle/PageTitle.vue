<template>
  <div class="title" @click="goJump('/unreadEvents')">
    <van-image
      width="4px"
      height="17px"
      fit="contain"
      :src="require('/src/assets/images/home/title-icon.png')"
      :show-error="false"
      :show-loading="false"
    />
    {{title}}
  </div>
</template>

<script>
export default {
  name: "pageTitle",
  props: {
    title: {
      type: String,
      require: true
    }
  }
}
</script>

<style scoped>
  .title{
    font-size: 20px;
    color: #B9CEE9;
  }
</style>