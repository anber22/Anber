<template>
  <div class="hazardDetail">
    <!-- 隐患详情信息 start -->
    <div v-if="!loading" class="hazardDetail-submit">
      <div class="hazardDetail-submit-title">
        <img src="@/assets/images/home/title-icon.png" alt="" class="hazardDetail-submit-titil-icon">
        隐患信息
      </div>

      <div class="hazardDetail-submit-content">
        <!-- 隐患详情信息  标题信息 start -->
        <div class="hazardDetail-submit-content-header">
          <span v-if="detailInfo.isDone===1" class="hazardDetail-submit-content-deal-status">
            已处理
          </span>
          <span v-if="detailInfo.isDone===0" class="hazardDetail-submit-content-undeal-status">
            未处理
          </span>
          <span class="hazardDetail-submit-content-equip-status">
            {{ detailInfo.hazardTypeName }}
          </span>
          <span :class="detailInfo.onlineType===0?'hazardDetail-submit-content-hazard-type-orange':'hazardDetail-submit-content-hazard-type-red'">
            {{ detailInfo.onlineType===0?"故障":"事件" }}
          </span>
        </div>
        <!-- end -->

        <!-- 隐患详情 start -->
        <div class="hazardDetail-submit-content-info">
          <div class="hazardDetail-submit-content-info-row">
            <div class="hazardDetail-submit-content-info-row-name">
              设备名称:
            </div>
            <div class="hazardDetail-submit-content-info-row-value">
              {{ detailInfo.equipName }}
            </div>
          </div>
          <div class="hazardDetail-submit-content-info-row">
            <div class="hazardDetail-submit-content-info-row-name">
              IMEI码:
            </div>
            <div class="hazardDetail-submit-content-info-row-value">
              {{ detailInfo.imei }}
            </div>
          </div>
          <div class="hazardDetail-submit-content-info-row">
            <div class="hazardDetail-submit-content-info-row-name">
              网点名称:
            </div>
            <a @click.stop="toPlaceDetail(detailInfo.placeId)">
              <div class="hazardDetail-submit-content-info-row-value underLine">
                {{ detailInfo.placeName }}
              </div>
            </a>
          </div>
          <div class="hazardDetail-submit-content-info-row">
            <div class="hazardDetail-submit-content-info-row-name">
              安装位置:
            </div>
            <div class="hazardDetail-submit-content-info-row-value">
              {{ detailInfo.equipAddress }}
            </div>
            <img src="@/assets/images/equip/navigation.png" alt="" class="hazardDetail-submit-content-info-row-icon">
          </div>
          <div class="hazardDetail-submit-content-info-row">
            <div class="hazardDetail-submit-content-info-row-name">
              联系人:
            </div>
            <div class="hazardDetail-submit-content-info-row-value">
              {{ detailInfo.managerName+"-"+detailInfo.placePhone }}
            </div>
            <a @click.stop="callPhone(detailInfo.placeId)">
              <img src="@/assets/images/equip/phone.png" alt="" class="hazardDetail-submit-content-info-row-icon">
            </a>
          </div>

          <div class="hazardDetail-submit-content-info-row">
            <div class="hazardDetail-submit-content-info-row-name">
              发生时间:
            </div>
            <div class="hazardDetail-submit-content-info-row-value">
              {{ changeDate(detailInfo.createdTime) }}
            </div>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
    <!-- end -->

    <!-- 隐患处理信息 start -->
    <div class="hazardDetail-deal-content">
      <div class="hazardDetail-submit-title">
        <img src="@/assets/images/home/title-icon.png" alt="" class="hazardDetail-submit-titil-icon">
        处理信息
      </div>
      <div v-if="detailInfo.isDone===1" class="hazardDetail-submit-content">
        <div class="hazardDetail-deal-content-info-row">
          <div class="hazardDetail-deal-content-info-row-name">
            隐患复核:
          </div>
          <div class="hazardDetail-deal-content-info-row-sort-value">
            {{ dealInfo.recheck===0?"真实":dealInfo.recheck===1?"误报":dealInfo.recheck===2?"测试":"" }}
          </div>
          <div class="hazardDetail-deal-content-info-row-name">
            复核方式:
          </div>
          <div class="hazardDetail-deal-content-info-row-sort-value">
            {{ dealInfo.checkWay===0?"电话":dealInfo.checkWay===1?"图像":dealInfo.checkWay===2?"现场":dealInfo.checkWay===3?"其他":"" }}
          </div>
        </div>
        <div class="hazardDetail-deal-content-info-auto-row">
          <div class="hazardDetail-deal-content-info-row-name float-left">
            隐患原因:
          </div>
          <div class="hazardDetail-deal-content-info-row-auto-value">
            {{ dealInfo.reason }}
          </div>
        </div>
        <div class="hazardDetail-deal-content-info-auto-row">
          <div class="hazardDetail-deal-content-info-row-name float-left">
            处理结果:
          </div>
          <div class="hazardDetail-deal-content-info-row-auto-value">
            {{ dealInfo.result }}
          </div>
        </div>
      </div>

      <div v-else class="hazardDetail-deal-content-none">
        暂无处理信息
      </div>
    </div>
    <!-- end -->
  </div>
</template>

<script>
import Api from '@/api/hazard/hazard.js'
import Date from '@/utils/dateTransformation'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'

import PlaceApi from '@/api/placeResource/placeResource'

export default {
  components: {

  },

  data() {
    return {
      detailInfoId: 0,
      detailInfo: {},
      dealInfo: {},
      loading: true
    }
  },
  computed: {
    changeDate: function() {
      return function(val) {
        return this.timeTransformation(val)
      }
    }
  },
  mounted() {
    this.detailInfoId = this.$route.query.hazardId
    this.getHazardDetail()
  },
  methods: {
    toeEdit() {
      this.$router.push({ path: '/hazardEditorial', query: { hazardId: this.detailInfoId }})
    },
    /**
     * 拨号
     */
    async  toPlaceDetail() {
      this.$router.push({
        path: '/placeResourceDetail',
        query: {
          placeId: this.detailInfoId
        }
      })
    },
    /**
     * 获取隐患详情信息
     */
    async getHazardDetail() {
      const params = {
        id: this.detailInfoId
      }
      const res = await Api.hazardDeatilInfo(params)
      if (res.code === 200) {
        this.detailInfo = { ...res.data }
      }

      this.detailInfo = await ReadTypeNameOnVuex.conversion('hazardType', 'hazardType', 'hazardTypeName', this.detailInfo)
      if (this.detailInfo.isDone === 1) {
        this.getHazardDealInfo()
      }
      this.loading = false
    },

    /**
     *  时间格式化
     */
    timeTransformation(e) {
      var dealData = new Date()
      return dealData.dataFormat(e)
    },

    /**
     * 获取隐患处理信息
     */
    async getHazardDealInfo() {
      const params = {
        id: this.detailInfoId
      }
      const res = await Api.hazardDealInfo(params)
      if (res.code === 200) {
        this.dealInfo = { ...res.data }
      }
    }
  }
}
</script>

<style>
.hazardDetail{
  background-color: #101720;
  width: 90%;
  height: calc(100% - 45px);
  /* position: fixed; */
  padding:0px 5% 0px 5%;
  color: #ffffff;
  overflow: scroll;
}
.hazardDetail-submit{
  width: 100%;
  height: auto;

}
.hazardDetail-submit-title{
  width: 100%;
  height: auto;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #B9CEE9;
  margin-top: 8%;
}
.hazardDetail-submit-titil-icon{
  width: 4px;
height: 17px;
}
.hazardDetail-submit-content{
  width: 98%;
  height: auto;
  padding-left: 3%;
  margin-top: 3%;
}
.hazardDetail-deal-content{
  width: 100%;
  height: auto;
  margin-top: 3%;
  padding-bottom: 30%;
}

.hazardDetail-submit-content-header{
  width: 100%;
  height: 30px;
}
.hazardDetail-submit-content-deal-status{
  width: 10%;
  padding-left: 2%;
  border-left: 3px solid #29CF7B;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #29CF7B;
}
.hazardDetail-submit-content-undeal-status{
  width: 10%;
  padding-left: 2%;
  border-left: 3px solid red;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FF1743;
}
.hazardDetail-submit-content-equip-status{
  width: 40%;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  margin-left: 6%;
  color: #FFFFFF;
}
.hazardDetail .underLine{

  font-size: 12px !important;
  font-family: PingFang SC !important;;
  font-weight: 400 !important;;
  text-decoration: underline;
  color: #06F0FE !important;;
}
.hazardDetail-submit-content-hazard-type{
  width: 5%;
  margin-left: 48%;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;

  padding: 1%;
}
.hazardDetail-submit-content-info{
  width: 100%;
  height: auto;
}
.hazardDetail-submit-content-hazard-type-red{
  width: auto;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  padding: 1%;
  border: 1px solid red;
  color: #FF1743;
  float: right
}
.hazardDetail-submit-content-hazard-type-orange{
   width: auto;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  padding: 0.5% 1% 0.5% 1%;
  border: 1px solid #FF9F17;
  color: #FF9F17;
  float: right
}
.hazardDetail-submit-content-info-row{
  width: 100%;
  height: 30px;
}
.hazardDetail-deal-content-info-row{
    width: 100%;
  height: 30px;
}
.hazardDetail-deal-content-info-auto-row{
    width: 100%;
    vertical-align: top
}
.hazardDetail-submit-content-info-row-name{
  width: 21%;
  height: 100%;
  display: inline-block;
  text-align: right;
  line-height: 250%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
}
.hazardDetail-deal-content-info-row-name{
  width: 20%;
  height: auto;
  display: inline-block;
  text-align: right;
  line-height: 250%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
}
.hazardDetail .float-left{
  float: left;
}
.hazardDetail-submit-content-info-row-value{
   width:61%;
  height: 100%;
  display: inline-block;
  text-align: left;
  padding-left: 5%;
  line-height: 250%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
}
.hazardDetail-deal-content-info-row-sort-value{
  width:21%;
  height: 100%;
  display: inline-block;
  text-align: left;
  padding-left: 5%;
  line-height: 250%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
}
.hazardDetail-deal-content-info-row-auto-value{
    width:73%;
  height: auto;
  display: inline-block;
  text-align: left;
  padding-left: 5%;
  line-height: 250%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
}
.hazardDetail-submit-content-info-row-icon{
  width: 19px;
  height: 19px;
  vertical-align: middle
}
.hazardDetail-deal-content-none{
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
}
.btn{
  background-color:black;
  border:1px #fffeff dashed;
  color:#fffeff;
  width: 100%;
  height: 35px;
}
</style>
