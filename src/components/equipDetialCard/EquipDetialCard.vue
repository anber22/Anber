<template>
  <!-- 卡片详细数据 start -->
  <div class="equipDetailCard" :style="'width:'+layout.width">
    <!-- 标题 start -->
    <div class="equipDetailCard-name">
      <div class="name-font">
        <img :src="layout.icon" alt="" :style="'width:'+layout.iconWidth+';height:'+layout.iconHight" class="type-icon">  {{ layout.name }}
      </div>
    </div>
    <div class="equipDetailCard-value">
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

      default: () => {}
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
