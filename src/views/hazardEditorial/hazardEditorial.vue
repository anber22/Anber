<template>
  <div class="hazardEditorial">
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
              {{ timeTransformation(detailInfo.createdTime) }}
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
      <div class="process-info">
        <form method="post" name="danger-review">
          <p class="danger-review">
            隐患复核
          </p>
          <van-radio-group v-model="reviewRadio" direction="horizontal">
            <van-radio :name="0" checked-color="linear-gradient(78deg, #008EFF, #1DF2FF)">
              真实
            </van-radio>
            <van-radio :name="1" checked-color="linear-gradient(78deg, #008EFF, #1DF2FF)">
              虚假
            </van-radio>
            <van-radio :name="2" checked-color="linear-gradient(78deg, #008EFF, #1DF2FF)">
              不确定
            </van-radio>
          </van-radio-group>
        </form>
        <form action="" name="danger-mode">
          <p class="danger-mode">
            隐患方式
          </p>
          <van-radio-group v-model="modeRadio" direction="horizontal">
            <van-radio :name="0" checked-color="linear-gradient(78deg, #008EFF, #1DF2FF)">
              电视
            </van-radio>
            <van-radio :name="1" checked-color="linear-gradient(78deg, #008EFF, #1DF2FF)">
              图像
            </van-radio>
            <van-radio :name="2" checked-color="linear-gradient(78deg, #008EFF, #1DF2FF)">
              现场
            </van-radio>
            <van-radio :name="3" checked-color="linear-gradient(78deg, #008EFF, #1DF2FF)">
              其他
            </van-radio>
          </van-radio-group>
        </form>
        <div class="reason-result">
          <p>隐患原因</p>
          <van-field
            v-model="dangerCause"
            rows="2"
            autosize
            type="textarea"
            placeholder="请输入隐患原因"
          />
        </div>
        <div class="reason-result">
          <p>处理结果</p>
          <van-field
            v-model="treatResult"
            rows="2"
            autosize
            type="textarea"
            placeholder="请输入处理结果"
          />
        </div>
        <!-- 处理照片 -->
      </div>
      <van-button class="store-btn" block color="linear-gradient(100deg, #1DF2FF,#008EFF )" @click="updateProcessRecord">
        保存
      </van-button>
    </div>

    <!-- end -->
  </div>
</template>

<script>
import Api from '@/api/hazard/hazard.js'
import Date from '@/utils/dateTransformation'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'

export default {
  components: {

  },

  data() {
    return {
      reviewRadio: 0,
      modeRadio: 0,
      detailInfoId: 0,
      detailInfo: {},
      dealInfo: {},
      loading: false,
      dangerCause: '',
      treatResult: ''
    }
  },
  mounted() {
    this.detailInfoId = this.$route.query.hazardId
    this.getHazardDetail()
  },
  create() {
  },
  methods: {
    /**
     * 拨号
     */
    async  toPlaceDetail(e) {
      this.$router.push({
        path: '/placeResourcDetail',
        query: {
          placeId: e
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
     * 获取隐患处理信息后台接口
     */
    async getHazardDealInfo() {
      const params = {
        id: this.detailInfoId
      }
      const res = await Api.hazardDealInfo(params)
      if (res.code === 200) {
        this.dealInfo = { ...res.data }
      }
    },
    /*
      隐患处理信息编辑+保存按钮
    */
    async updateProcessRecord() {
      // console.log('adajd')
      const param = {
        id: this.detailInfoId,
        condition: ''
      }
      param.condition = '?recheck=' + this.reviewRadio + '&checkWay=' + this.modeRadio +
      '&reason=' + this.dangerCause + '&result=' + this.treatResult
      // console.log('处理信息param--', param)
      const res = await Api.getProcessRecord(param)
      if (res.code === 200) {
        console.log('处理信息连接成功')
      }
    }

  }
}
</script>

<style>
.hazardEditorial{
  background-color: #101720;
  width: 90%;
  height: 100%;
  position: fixed;
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
.hazardEditorial .underLine{

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
.hazardEditorial .float-left{
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
.hazardEditorial .process-info p{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
}
.hazardEditorial .van-radio__icon--checked .van-icon{
  background: linear-gradient(78deg, #1DF2FF, #008EFF );

}
.hazardEditorial .van-radio__icon {
  font-size: 15px
}
.hazardEditorial .van-radio__label{

  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #8BA3C2;
  margin-left: 11px;
  margin-right: 13px;
}
.hazardEditorial form:nth-child(1),
.hazardEditorial form:nth-child(2){
  display: flex;
}
/* form:nth-child(1){
  margin-top: 25px;
} */
.hazardEditorial form:nth-child(2){
  justify-content: space-between
}
.hazardEditorial .danger-review{
  margin-right: 21px;
  line-height: 51px;
  /* margin-bottom: 11px; */
}
.hazardEditorial .danger-mode{
  width: 49px;
  margin-right: 20px;
  margin-bottom: 11px;
  margin-top: 5px
}
.hazardEditorial .van-radio-group{
  width: 268px;
  height: 51px;
}
.hazardEditorial .van-radio--horizontal {
    margin-right: 12px
}
.hazardEditorial input[type=text]{
  width: 335px;
  height: 91px;
  background-color: #101720;
  border: 1px solid #283444;
}
.hazardEditorial .result input::-webkit-input-placeholder,
.hazardEditorial .reason input::-webkit-input-placeholder{
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #373F4A;

}
.hazardEditorial .van-cell{
  padding: 7px 11px;
  width: 335px;
  height: 91px;
  border: 1px solid #283444;
  background: #101720;

}
.hazardEditorial .van-field__control{
  color: #B9CEE9;
  font-size: 16px;
}
.hazardEditorial .van-cell textarea::-webkit-input-placeholder{
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #373F4A;
}
.hazardEditorial .reason-result{
  margin-top: 20px
}
.hazardEditorial .reason-result p{
  margin-bottom: 15px
}
.hazardEditorial .store-btn{
  margin-top: 41px
}
.van-icon-success::before{
  width: 15px;
}
</style>
