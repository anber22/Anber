<template>
  <!-- 卡片详细数据 start -->
  <div class="equipDetialCard" :style="'width:'+layout.width">
    <!-- 标题 start -->
    <div class="equipDetialCard-name">
      <div class="name-font">
        <img :src="layout.icon" alt="" :style="'width:'+layout.iconWidth+';height:'+layout.iconHight" class="type-icon">  {{ layout.name }}
      </div>
    </div>
    <div class="equipDetialCard-value">
      <div class="value-font">
        {{ layout.value }}
      </div>
    </div>
    <!-- end -->
  </div>
  <!-- end -->
</template>

<script>
export default {
  components: {
  },
  props: {
    layout: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }

  },
  data() {
    return {
      subValue: ''
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style src='./EquipDetialCard.css'>

</style>
