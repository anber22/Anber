<template>
  <div class="equipDetialCard" :style="'width:'+layout.width">
    <div class="equipDetialCard-name">
      <div class="name-font">
        <img :src="layout.icon" alt="" :style="'width:'+layout.iconWidth+';height:'+layout.iconHight" class="type-icon">  {{ layout.name }}
      </div>
    </div>
    <div class="equipDetialCard-value">
      <div class="value-font">
        {{ subValue===''?content[layout.typed]:subValue }}
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
    },
    content: {
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
    console.log(this.layout, '0000000', this.content[this.layout.typed])
    if (this.layout.typed === 'windSpeed') {
      this.subValue = this.content.windSpeed + '/' + this.content.windDirection
      console.log(this.subValue, '11111')
    } else if (this.layout.typed === 'temperature') {
      this.subValue = this.content.temperature + '/' + this.content.humidity
      console.log(this.subValue, '11111')
    }
  },
  methods: {

  }
}
</script>

<style>
.equipDetialCard{
  display: inline-block;

  border-radius: 2px;

  border: 0.01px solid #008797;
}
.equipDetialCard-name{
  height: 26px;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  background: #122E51;
  border-radius: 2px 2px 0px 0px;

  border: 1px solid #008797;
  box-shadow:1px 1px 11px 2px rgba(0, 135, 151, 0.2) inset;
}
.equipDetialCard-value{
  height: 37px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
.name-font{
  height: auto;
  width: auto;
  text-align: center;

font-size: 10px;
font-family: PingFang SC;
font-weight: 400;
color: #B9CEE9;
}
.value-font{
  height: auto;
  width: auto;
  text-align: center;

  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
}
.type-icon{
  vertical-align: middle;
}
</style>
