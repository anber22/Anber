<template>
  <div class="title-box">
    <div class="title-style" />
     <div class="title-name">
        {{title}}
     </div>
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
  .title-box{
    height: 25px;
    width: 100%;
  }

  .title-style{
    width: 1.2%;
    height: 100%;
    background: -webkit-gradient(linear, 100% 100%, 0% 100%,from(#008EFF), to(#1DF2FF));
    /* display: inline-block; */
    float: left;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .title-name{
    width: 60%;
    height: 30px;
    display: inline-block;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #B9CEE9;
    margin-left: 15px;
 }
</style>