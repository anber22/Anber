<template>
  <div class="physicalUnionApplicationListCard">
    <div class="physicalUnionApplicationListCard-header">
      <div class="physicalUnionApplicationListCard-title">
        {{ data.equipName }}
      </div>
      <div class="physicalUnionApplicationListCard-state">
        <EquipStatus :electricity="data.equipPower" :signal="data.equipSignal" />
      </div>
    </div>
    <div class="physicalUnionApplicationListCard-content">
      <div class="physicalUnionApplicationListCard-content-row">
        <div class="physicalUnionApplicationListCard-content-row-name">
          {{ data.imei }}
          <div class="physicalUnionApplicationListCard-type">
            {{ data.equipTypeName }}
          </div>
        </div>
        <a @click.stop="callPhone(data.placeId)">
          <img src="@/assets/images/equip/phone.png" alt="" class="physicalUnionApplicationListCard-content-row-icon">
        </a>
      </div>
      <div class="physicalUnionApplicationListCard-content-row">
        <div class="physicalUnionApplicationListCard-content-row-name">
          <span class="physicalUnionApplicationListCard-content-row-place-name" @click="showDetail(data.placeId)">
            {{ data.placeName }}
          </span>
        </div>
        <img src="@/assets/images/equip/navigation.png" alt="" class="physicalUnionApplicationListCard-content-row-icon">
      </div>
    </div>
  </div>
</template>

<script>
import EquipStatus from 'cmp/equipStatus/EquipStatus'
import Api from '@/api/placeResource/placeResource'

import { mapGetters } from 'vuex'

export default {
  components: {
    EquipStatus
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
      equipStatus: {
        wifi: 'red',
        electricity: 'yellow',
        statusName: '正常'
      }
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
  },
  methods: {
    async  callPhone(e) {
      const res = await Api.placeResourcDetail(e)
      if (res.code === 200) {
        const result = res.data
        window.location.href = 'tel://' + result.phone
      }
    },
    showDetail(e) {
      console.log('网点id', e)
      this.$router.push({
        path: '/placeResourcDetail',
        query: {
          placeId: e
        }
      })
    }
  }
}
</script>

<style>
.physicalUnionApplicationListCard{
  width: 100%;
  height: 100%;
  border: 1px solid #4D628F;
  background-color:#0A0B29;
}
.physicalUnionApplicationListCard-header{

background: #131F3B;
}
.physicalUnionApplicationListCard-title{
  width: 40%;
  height: 25%;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 1% 5% 1% 3%;
  margin-top: 1%;
  display: inline-block;
  float: left;
}
.physicalUnionApplicationListCard-content{
  width: 100%;
  height: 55%;
  margin-top: 2.7%;
}
.physicalUnionApplicationListCard-state{
  width: 48%;
  height: 25%;
  display: inline-block;
  vertical-align: middle;
  padding: 2.1% 1% 1% 3%;
}
.physicalUnionApplicationListCard-content-row{
  height: 45.5%;
  width: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle
}
.physicalUnionApplicationListCard-content-row-name{
  width: 89%;
  text-align: left;
  padding-left: 3%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;

  color: #6F85A2;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}
.physicalUnionApplicationListCard-content-row-place-name{

font-size: 12px;
font-family: PingFang SC;
font-weight: 400;
text-decoration: underline;
color: #06F0FE;
}
.physicalUnionApplicationListCard-type{
  width: auto;
  background: #1B2B29;
  border: 1px solid #70C7BE;
  border-radius: 2px;
  padding: 0.5% 1% 0.5% 1%;
  margin-left: 2%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}
.physicalUnionApplicationListCard-content-row-icon{
  width: 19px;
  height: 19px;
}
</style>
