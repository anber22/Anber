<template>
  <div class="equip-status">
    <!-- 状态 start -->
    <div class="status-name" :style="'color:'+ (status===0?'#FF1743':'#29CF7B')">
      {{ status === 0 ? "故障":"正常" }}
    </div>
    <!-- end -->
    <!-- 电量 start -->
    <img v-if="electricity>0 && electricity<=30" src="@/assets/images/equip/battery-yellow.png" alt="" class="battery">
    <img v-else-if="electricity>30" src="@/assets/images/equip/battery-green.png" alt="" class="battery">
    <img v-else-if="electricity===0" src="@/assets/images/equip/battery-red.png" alt="" class="battery">
    <!-- end -->

    <!-- 信号 start -->
    <img v-if="signal>-75" src="@/assets/images/equip/wifi-green.png" alt="" class="wifi">
    <img v-else-if="signal<=-75 && signal >-95" src="@/assets/images/equip/wifi-yellow.png" alt="" class="wifi">
    <img v-else-if="signal<=-95 && signal >=-105" src="@/assets/images/equip/wifi-red.png" alt="" class="wifi">
    <!-- end -->
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
    },
    status: {
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
