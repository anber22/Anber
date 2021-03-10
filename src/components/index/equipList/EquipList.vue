<!-- 首页应用列表 -->
<template>
  <div class="equipList">
    </p><div v-for="item in data" :key="item.id" @click="showCard()">
      <Adaptive :data="['100%','24.4%']" class="equipList-item">
        <div class="equipList-item-left">
          <img class="equipList-equip-img" :src="require(item.imgUrl)" alt>
          <p class="equipList-item-title">
            {{ item.name }}
          </p>
        </div>
        <div class="equipList-item-right">
          <div class="equipList-detail-item">
            <p class="equipList-detail-item-title">
              在线
            </p>
            <p class="equipList-detail-item-value color-light-blue">
              {{ item.data.online }}
            </p>
          </div>
          <div class="equipList-detail-item">
            <p class="equipList-detail-item-title">
              隐患
            </p>
            <p class="equipList-detail-item-value color-light-yellow">
              {{ item.data.error }}
            </p>
          </div>
          <div class="equipList-detail-item">
            <p class="equipList-detail-item-title">
              离线
            </p>
            <p class="equipList-detail-item-value color-light-red">
              {{ item.data.outline }}
            </p>
          </div>
        </div>
      </Adaptive>
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
.equipList{
  width: 100%;
  height: auto;
  margin-top: 1%;
  box-sizing: border-box;
  /* background: rgba(0, 133, 247, 0.1); */
  /* opacity: 0.6; */
  /* overflow: scroll; */
}
.equipList::-webkit-scrollbar {
    display: none;
}

.equipList-item{
  /* width: 100%;
  height: 10.6%; */
  box-sizing: border-box;
  background: rgba(16, 233, 255, 0);
  /* border: 1px solid #008797; */
  border: 1px solid rgba(71, 167, 234, 0.2);
  margin-top:2.8%;
  clear: both;
  /* box-shadow:1px 1px 11px 2px rgba(0, 133, 247, 0.6) inset; */
  box-shadow: 0px 0px 7px 0px rgba(0, 133, 247, 0.4) inset;
}
.equipList-item-left{
  width: 25%;
  height: 72.6%;
  padding: 3.2%;
  text-align: center;
  float: left;
}
.equipList-equip-img{
  width: 60%;
  height: 66%;
}
.equipList-item-title{
  text-align: center;

font-size: 12px;
font-family: PingFang SC;
font-weight: 400;
color: #A3D5FF;
  margin-top: 6%;
}
.equipList-item-right{
  width: 68%;
  height: 100%;
  float: left;
}
.equipList-detail-item{
  width: 31.33%;
  height: 100%;
  display: inline-block;
}
.equipList-detail-item-title{
  height: 11px;
  width: 43.33px;
  font-size: 12px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  text-align: left;
  line-height: 5px;
  padding-left: 12px;
  color: #EFF0F1;

  margin-top:32%;
  margin-bottom: 0px;
  background: linear-gradient(125deg, rgba(16, 233, 255, 0) 8px,#00B5ED 9%,transparent 81%) left  ;
  background-size: 100% 100%;
  margin-left: 15px
}
.equipList-detail-item-value{
  height: 18px;
  font-size: 19px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #46FFEB;
  text-align: center;
  margin-top: 12%;
}
.equipList-color-light-blue{
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
