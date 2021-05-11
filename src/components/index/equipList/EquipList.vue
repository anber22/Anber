<!-- 首页应用列表 -->
<template>
  <div class="equipList">
    <div v-for="(item,index) in equipData" :key="index" @click="showCard(item.id)">
      <!--  @click="showCard(item.id)" -->
      <Adaptive :size="['100%','24.4%']" class="equipList-item">
        <div class="equipList-item-left">
          <img class="equipList-equip-img" :src="item.imgUrl" alt="">
          <p class="equipList-item-title">
            {{ item.name }}
          </p>
        </div>
        <div class="equipList-item-right">
          <div class="equipList-detail-item">
            <p class="equipList-detail-item-title">
              在线
            </p>
            <p class="equipList-detail-item-value color-light-blue">
              {{ item.data.online }}
            </p>
          </div>
          <div class="equipList-detail-item">
            <p class="equipList-detail-item-title">
              隐患
            </p>
            <p class="equipList-detail-item-value color-light-yellow">
              {{ item.data.error }}
            </p>
          </div>
          <div class="equipList-detail-item">
            <p class="equipList-detail-item-title">
              离线
            </p>
            <p class="equipList-detail-item-value color-light-red">
              {{ item.data.outline }}
            </p>
          </div>
        </div>
      </Adaptive>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    equipData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    showCard(e) {
      // this.$router.push('/iotApp')
      this.$router.push({
        path: '/iotApp',
        query: {
          systemId: e
        }
      })
    }
  }
}
</script>

<style  scoped src='./EquipList.css'>

</style>
