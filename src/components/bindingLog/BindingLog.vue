<template>
  <div class="bindingLog">
    <div v-for="(item , index) in logData" :key="index" class="log-row">
      <div class="point-of-division" />
      <div class="log-left" :style="'border-right:' +( index ===logData.length-1?'none;':'1px dashed rgba(111, 133, 162, 0.3);')">
        <p class="bindingLog-date">
          {{ item.date }}
          <!-- 2020-12-12 -->
        </p>
        <p class="bindingLog-time">
          {{ item.time }}
        </p>
      </div>
      <div class="log-right">
        <div class="detail-row">
          <div class="detail-row-name">
            操作：
          </div>
          <div class="detail-row-value">
            {{ item.editType===0?'解绑':'绑定' }}
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-row-name">
            处理人：
          </div>
          <div class="detail-row-value">
            {{ item.createdName }}
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-row-name">
            {{ item.editType===0?'解绑':'绑定' }}网点：
          </div>
          <div class="detail-row-value">
            港湾一号
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    logData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style scoped>
.bindingLog{
  width: 100%;
  height: auto;
}
.log-row{
  width: 100%;
  height: 150px;

}
.log-left{
  width: 25%;
  height: 150px;
  line-height: 150px;
  float: left;
  margin-left: 35px;
  border: none;
  word-break : break-all;
  vertical-align: middle;

}
.log-right{
  width: 50%;
  height: 150px;
  /* line-height: 120px; */
  float: left;
  border: none;
}
.bindingLog-date{
  width: 80%;
  line-height: 9px;
  text-align: right;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
}
.bindingLog-time{
  width: 80%;
  line-height: 9px;
  padding-top: 5px;
  text-align: right;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
}
.detail-row{
  width: 100%;
  height: 25px;
  float: left;
  line-height: 10px;
}
.detail-row-name{
  width: 70px;
  float: left;
  text-align: left;
  padding-left: 22px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
}
.detail-row-value{
  float: left;
  text-align: left;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
}
.point-of-division{
  width: 10px;
  height: 10px;
  background: #06F0FE;
  border-radius: 50%;
  position: relative;
  left: 125px;
  top: 8px;
}
</style>
