
<template>
  <!-- 看板表格 -->
  <div class="simpleForm">
    <div class="table-header">
      <div v-for="(colItem,index) in data.column" :key="index" class="header-item">
        {{ colItem.name }}
        <div v-for="(rowItem,index) in data.row" :key="index" class="content-item">
          {{ rowItem.value }}
        </div>
      </div>
    </div>
    <div class="table-content" />
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
.simpleForm{
  width: 100%;
  height: auto;
  background-color: aqua
}
</style>
