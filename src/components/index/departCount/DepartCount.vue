<template>
  <div class="item-right">
    <div class="detail-item">
      <p class="detail-item-title">
        在线
      </p>
      <p class="detail-item-value color-light-blue">
        {{ data.online }}
      </p>
    </div>
    <div class="detail-item">
      <p class="detail-item-title">
        隐患
      </p>
      <p class="detail-item-value color-light-yellow">
        {{ data.trouble }}
      </p>
    </div>
    <div class="detail-item">
      <p class="detail-item-title">
        离线
      </p>
      <p class="detail-item-value color-light-red">
        {{ data.outline }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
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
<style scoped src='./DepartCount.css'></style>
