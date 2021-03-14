<template>
  <div class="infoRows">
    <div class="row-name">
      {{ data.name }}
    </div>
    <div v-if="data.typed==='info'" class="row-info-value">
      {{ data.content }}
    </div>
    <div v-else-if="data.typed==='status'" class="row-status-value">
      {{ data.content }}
    </div>
    <div v-else-if="data.typed==='place'" class="row-place-value">
      {{ data.content }}
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
  mounted() {
  },
  methods: {

  }
}
</script>

<style>
.infoRows{
  width: 100%;
  height: 4%;;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  display: flex;
  flex-direction: row;
}
.row-name{
  height: 100%;
  color: #6F85A2;
  width: 26%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.row-info-value{
  height: 100%;
  color: #B9CEE9;
  width: 64%;
  display: flex;
  padding-left: 6%;
  align-items: center;
}
</style>
