<template>
  <div class="equipDetialCard" :style="'width:'+layout.width">
    <div class="equipDetialCard-name">
      <div class="name-font">
        <img :src="layout.icon" alt="" :style="'width:'+layout.iconWidth+';height:'+layout.iconHight" class="type-icon">  {{ layout.name }}
      </div>
    </div>
    <div class="equipDetialCard-value">
      <div class="value-font">
        <!-- {{ subValue===''?content[layout.typed]:subValue }} -->
        {{ layout.value }}
        <!-- 21111 -->
      </div>
    </div>
  </div>
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
    // ,
    // content: {
    //   type: Object,
    //   // eslint-disable-next-line vue/require-valid-default-prop
    //   default: {}
    // }
  },
  data() {
    return {
      subValue: ''
    }
  },
  mounted() {
    // if (this.layout.typed === 'windSpeed') {
    //   this.subValue = this.content.windSpeed + '/' + this.content.windDirection
    // } else if (this.layout.typed === 'temperature') {
    //   this.subValue = this.content.temperature + '/' + this.content.humidity
    // }
  },
  methods: {

  }
}
</script>

<style src='./EquipDetialCard.css'>

</style>
