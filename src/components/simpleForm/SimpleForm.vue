
<template>
  <!-- 看板表格 -->
  <div class="simpleForm">
    <div v-for="(colItem,colIndex) in tableData.column" :key="colIndex" class="colum" :style="'width:'+colItem.width+';text-align:'+colItem.text+';color:'+colItem.color">
      <div class="header-item">
        {{ colItem.name }}
      </div>
      <div v-for="(rowItem,rowIndex) in tableData.row" :key="rowIndex" class="content-item" @click="toOther(rowItem.condition,colItem.key)">
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
    },
    tableType: {
      type: String,
      default: ''
    },
    networkType: {
      type: Number,
      default: 0
    },
    days: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    toOther(condition, type) {
      if (this.tableType === '0') {
        this.$router.push({
          path: '/hazard',
          query: {
            hazardType: condition,
            dealType: type,
            fromPage: this.$route.path,
            networkType: this.networkType,
            days: this.days
          }
        })
      } else if (this.tableType === '1') {
        // this.$router.push({
        //   path: '/iotApp',
        //   query: {
        //     placeId: condition,
        //     onlineType: type,
        //     fromPage: this.$route.path,
        //     networkType: this.networkType
        //   }
        // })
      }
    }
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
