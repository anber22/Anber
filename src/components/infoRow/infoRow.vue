<template>
  <div class="infoRow">
    <div class="row-name">
      123213:
    </div>
    <div class="row-value">
      3123213
    </div>
  </div>
</template>

<script>

export default {
  components: {

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
.infoRow{
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
.row-value{
  height: 100%;
  color: #B9CEE9;
  width: 64%;
  display: flex;
  padding-left: 6%;
  align-items: center;
}
</style>
