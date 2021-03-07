<template>
  <div class="item-right">
    <div class="detail-item">
      <p class="detail-item-title">
        在线
      </p>
      <p class="detail-item-value color-light-blue">
        {{ data.online }}
      </p>
    </div>
    <div class="detail-item">
      <p class="detail-item-title">
        隐患
      </p>
      <p class="detail-item-value color-light-yellow">
        {{ data.trouble }}
      </p>
    </div>
    <div class="detail-item">
      <p class="detail-item-title">
        离线
      </p>
      <p class="detail-item-value color-light-red">
        {{ data.outline }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.item-right{
  width: 100%;
  height: auto;
}
.detail-item{
  width: 31.33%;
  height: auto;
  display: inline-block;
}
.detail-item-title{
  height: 11px;
  width: 43.33px;
  font-size: 12px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  text-align: left;
  line-height: 5px;
  padding-left: 12px;
  color: #EFF0F1;
  margin-top:18%;
  margin-bottom: 0px;
  background: linear-gradient(125deg, rgba(16, 233, 255, 0) 8px,#00B5ED 9%,transparent 81%) left  ;
  background-size: 100% 100%;
  margin-left: 15px
}
.detail-item-value{
  height: 18px;
  font-size: 19px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #46FFEB;
  margin-left: 20%;
  margin-top: 12%;
}
.color-light-blue{
  color: #46FFEB;
}
.color-light-yellow{
  color: #F7FF74;
}
.color-light-red{
  color:#FF3C3C;
}
.bg{
  width: 79px;
  height: 9px;

}
</style>
