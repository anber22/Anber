<template>
  <div class="personalCenter" />
</template>

<script>

export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    goNext() {
      this.$router.push('/iotApp')
    }
  }
}
</script>

<style>
  .title {
    font-size: 50px;
  }
  .personalCenter{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #101720;
  }
</style>
