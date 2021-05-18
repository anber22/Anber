<template>
  <div class="adaptive" :style="'width:'+size[0]+';padding-bottom:'+size[1]+';'">
    <div class="inside-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Adaptive',
  components: {

  },
  props: {
    size: {
      type: Array,
      default: () => { }
    }
  },
  data() {
    return {

    }
  },
  beforeMount() {
  },
  methods: {

  }
}
</script>

<style>
.adaptive{
  display: inline-block;
  position : relative;
}
.inside-content{
  position : absolute;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
}
</style>
