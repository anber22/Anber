<template>
  <div class="personalHeader">
    <van-image
      round
      width="46px"
      height="46px"
      :src="personInfo.avatar"
    />
    <div class="info-display">
      <p class="username">{{personInfo.userName}}</p>
      <p class="phone">{{personInfo.phone}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalHeader",
  props: {
    personInfo: {
      type: Object,
      default: {}
    }
  },
}
</script>

<style scoped>
  .personalHeader {
    display: flex;
    flex-direction: row;
    padding-left: 15px;
    height: 100px;
    align-items: center;
  }
  
  .info-display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    margin-top: 3px;
  }

  .username {
    font-size: 16px;
    font-weight: 360;
    color: #B9CDE8;
  }

  .phone {
    color: #6F86A3;
    font-size: 12px;
  }

</style>