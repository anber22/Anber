<!-- 首页应用列表 -->
<template>
  <div class="equipList1">
    <div v-for="item in data" :key="item.id" class="item" @click="showCard()">
      <div class="item-left">
        <img class="equip-img" :src="item.img">
        <p class="item-title">
          {{ item.typeName }}
        </p>
      </div>
      <div class="item-right">
        <div class="detail-item">
          <p class="detail-item-title">
            在线
          </p>
          <p class="detail-item-value color-light-blue">
            {{ item.data.online }}
          </p>
        </div>
        <div class="detail-item">
          <p class="detail-item-title">
            隐患
          </p>
          <p class="detail-item-value color-light-yellow">
            {{ item.data.outline }}
          </p>
        </div>
        <div class="detail-item">
          <p class="detail-item-title">
            离线
          </p>
          <p class="detail-item-value color-light-red">
            {{ item.data.error }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    showCard() {
      this.$router.push('/iotApp')
    }
  }
}
</script>

<style  scoped>
.equipList1{
  width: 100%;
  height: 100%;
  margin-top: 1%;
  box-sizing: border-box;
  /* background: rgba(0, 133, 247, 0.1); */
  /* opacity: 0.6; */
  /* overflow: scroll; */
}
.equipList::-webkit-scrollbar {
    display: none;
}
.item{
  width: 100%;
  height: 22.5%;
  box-sizing: border-box;
  background: rgba(16, 233, 255, 0);
  border: 1px solid #008797;
  margin-top:2.8%;
  clear: both;
  box-shadow:1px 1px 11px 2px rgba(0, 133, 247, 0.6) inset;
}
.item-left{
  width: 25%;
  height: 72.6%;
  padding: 3.2%;
  text-align: center;
  float: left;
}
.equip-img{
  width: 60%;
  height: 66%;
}
.item-title{
  text-align: center;

font-size: 12px;
font-family: PingFang SC;
font-weight: 400;
color: #A3D5FF;
  margin-top: 6%;
}
.item-right{
  width: 68%;
  height: 100%;
  float: left;
}
.detail-item{
  width: 31.33%;
  height: 100%;
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
  margin-top:38%;
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
  text-align: center;
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
