<template>
  <div class="equip-status">
    <div class="status-name" :style="'color:'+ ((electricity===0 || ( 95> signal && signal >=105))?'#FF1743':'#29CF7B')">
      {{ (electricity===0 || ( -95> signal && signal >=105))?"故障":"正常" }}
    </div>

    <img v-if="electricity>0 && electricity<=30" src="@/assets/images/equip/battery-yellow.png" alt="" class="battery">
    <img v-else-if="electricity>30" src="@/assets/images/equip/battery-green.png" alt="" class="battery">
    <img v-else-if="electricity===0" src="@/assets/images/equip/battery-red.png" alt="" class="battery">

    <img v-if="signal>-75" src="@/assets/images/equip/wifi-green.png" alt="" class="wifi">
    <img v-else-if="signal<=-75 && signal >-95" src="@/assets/images/equip/wifi-yellow.png" alt="" class="wifi">
    <img v-else-if="signal<=-95 && signal >=-105" src="@/assets/images/equip/wifi-red.png" alt="" class="wifi">
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    electricity: {
      type: Number,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: 0
    },

    signal: {
      type: Number,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: 0
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

<style src='./EquipStatus.css'>

</style>
