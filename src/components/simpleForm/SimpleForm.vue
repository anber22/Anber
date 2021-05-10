
<template>
  <!-- 看板表格 -->
  <div class="simpleForm">
    <div v-for="(colItem,colIndex) in tableData.column" :key="colIndex" class="colum" :style="'width:'+colItem.width+';text-align:'+colItem.text+';color:'+colItem.color">
      <div class="header-item">
        {{ colItem.name }}
      </div>
      <div v-for="(rowItem,rowIndex) in tableData.row" :key="rowIndex" class="content-item">
        {{ rowItem[colItem.key] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    tableData: {
      type: Object,
      default: () => {}
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
  width: 94%;
  height: auto;
  /* background-color: aqua; */
  font-size: 12px;
  display: block;
  padding-left: 20px;
  box-shadow: 0px 0px 7px 0px rgba(0, 133, 247, 0.4) inset;
}
.colum{
  width: 23%;
  height: auto;
  display: inline-block;
}
.header-item{
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: inline-block;
}
.content-item{
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border-bottom: 1px solid #282F3F;
}
</style>
