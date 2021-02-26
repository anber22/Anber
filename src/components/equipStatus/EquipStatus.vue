<template>
  <div class="equip-status">
    <div v-if="data.statusName.length>0" class="status-name" :style="'color:'+ data.statusName==='正常'?'green':'red'">
      {{ data.statusName }}
    </div>

    <img v-if="data.electricity==='yellow'" src="/src/assets/images/equip/battery-yellow.png" alt="" class="battery">
    <img v-else-if="data.electricity==='green'" src="/src/assets/images/equip/battery-green.png" alt="" class="battery">
    <img v-else-if="data.electricity==='red'" src="/src/assets/images/equip/battery-red.png" alt="" class="battery">

    <img v-if="data.wifi==='green'" src="/src/assets/images/equip/wifi-green.png" alt="" class="wifi">
    <img v-else-if="data.wifi==='yellow'" src="/src/assets/images/equip/wifi-yellow.png" alt="" class="wifi">
    <img v-else-if="data.wifi==='red'" src="/src/assets/images/equip/wifi-red.png" alt="" class="wifi">
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
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

<style>
.equip-status{
  height: 19px;
  width: 90px;
  /* display: inline-block; */
  color: #ffffff;
  float: right;
}
.wifi{
  width: 13px;
  height: 10px;
  float: right;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10%;
  margin-top: 7%
}
.battery{
  width: 13px;
  height: 10px;
  vertical-align: middle;
  margin-left: 10%;
  float: right;
  display: inline-block;
  margin-top: 7%
}
.status-name{
  width: 25px;
  height: 21px;
  line-height: 21px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #29CF7B;
  margin-left: 10%;
  display: inline-block;
  float: right;
}
</style>
