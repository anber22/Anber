<template>
  <div class="equipDetialCard" :style="'width:'+data.width">
    <div class="equipDetialCard-name">
      <div class="name-font">
        <img :src="data.icon" alt="" :style="'width:'+data.iconWidth+';height:'+data.iconHight" class="type-icon">  {{ data.name }}
      </div>
    </div>
    <div class="equipDetialCard-value">
      <div class="value-font">
        {{ data.value }}
      </div>
    </div>
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
