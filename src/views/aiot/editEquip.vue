<template>
  <div class="editEquip">
    <div v-if="rowList.length>0" class="content">
      <div class="iotApp-detail-title">
        <img src="@/assets/images/home/title-icon.png" alt="" class="iotApp-detail-title-icon">
        设备信息
      </div>

      <div class="equip-info">
        <div class="equip-status-box">
          <p class="info-name">
            设备状态
          </p>
          <EquipStatus class="equipStatus" :electricity="equip.equipPower" :signal="equip.equipSignal" :status="equip.onlineType" />
        </div>
        <div class="empty-row" />
        <InfoRow v-for="(rowItem,index) in rowList" :key="index" :data="rowItem" class="infoRows" />
        <div class="edit-row">
          <p class="important">
            *
          </p>
          <p class="edit-row-name">
            安装位置
          </p>
        </div>

        <van-field v-model="equipAddress" placeholder="请输入安装位置" />
        <div class="info-row">
          <p class="edit-row-name">
            所属网点：
          </p>
          <p class="edit-row-value">
            {{ equip.placeName }}
          </p>
        </div>
        <div class="edit-row">
          <p class="important">
            *
          </p>
          <p class="edit-row-name">
            物联网平台
          </p>
        </div>
        <div class="select-box" @click="showPicker">
          <div class="select-name" :style="'color:' + (platformName==='请选择物联网平台'?'#373F4A':'#8BA3C2')">
            {{ platformName }}
          </div>
          <img src="@/assets/images/equip/down.png" alt="" class="select-status-icon">
        </div>
        <div class="info-row">
          <p class="edit-row-name">
            安装照片
          </p>
        </div>
        <UploadImg class="uploadImg" @choiceImg="choiceImg" />
        <div class="foot">
          <button class="submit-btn" @click="submit">
            保存
          </button>
        </div>
      </div>
      <van-popup v-model="showPlatformPicker" position="bottom" :style="{ height: '40%' }">
        <van-picker
          title="物联网平台"
          show-toolbar
          :columns="platformList"
          value-key="name"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import EquipStatus from 'cmp/equipStatus/EquipStatus'
import InfoRow from 'cmp/infoRows/InfoRows'
import UploadImg from 'cmp/uploadImg/UploadImg'
import Api from '@/api/aiot/iotApp.js'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
import Communal from '@/api/communal.js'
export default {
  components: {
    EquipStatus,
    InfoRow,
    UploadImg
  },

  data() {
    return {
      equipId: 0,
      equip: {},
      equipAddress: '',
      rowList: [], // 设备信息行列表
      uploadImg: [], // 上传图片数组
      showPlatformPicker: false, // 是否显示物联网平台选择器
      platformName: '请选择物联网平台', // 当前选中平台名称
      platformId: 0, // 选中平台id
      platformList: [] // 平台数组
    }
  },
  created() {
    this.equipId = 300
    // this.$route.query.equipId
    this.getPlatform()
    this.getEquip()
  },
  methods: {
    /**
     * 提交修改
     */
    async submit() {
      const param = {
        equipAddress: this.equipAddress,
        platformId: this.platformId
      }
      const res = await Communal.platformList(this.equipId, param)
      if (res.code === 200) {
        this.$toast.success({
          message: res.message,
          duration: 2000
        })
        setTimeout(() => {
          this.$router.back()
        }, 2000)
      }
    },
    /**
     * 获取物联网平台列表
     */
    async getPlatform() {
      this.platformList = await this.$store.getters.platformList
    },
    /**
     * 获取设备信息
     */
    async getEquip() {
      const res = await Api.equipDtailInfo(this.equipId)
      if (res.code === 200) {
        let equipInfo = { ...res.data }
        equipInfo = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', equipInfo)
        this.rowList = [
          {
            name: '设备名称:',
            content: equipInfo.equipName,
            typed: 'info'
          }, {
            name: '设备类型:',
            content: equipInfo.equipTypeName,
            typed: 'info'
          }, {
            name: '设备型号:',
            content: equipInfo.equipModel,
            typed: 'info'
          }, {
            name: 'IMEI码:',
            content: equipInfo.imei,
            typed: 'info'
          },
          {
            name: '所属辖区:',
            content: equipInfo.departName,
            typed: 'info'
          }
        ]
        this.equip = equipInfo
      }
    },
    /**
     * 选择图片  待用
     */
    choiceImg(e) {
    },
    /**
     * 打开物联网平台选择器
     */
    showPicker() {
      this.showPlatformPicker = true
    },
    /**
     * 点击取消
     */
    onCancel() {
      this.showPlatformPicker = false
    },
    /**
     * 点击确认
     */
    onConfirm(e) {
      this.showPlatformPicker = false
      this.platformName = e.name
    }
  }
}
</script>

<style scoped>
.editEquip{
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: scroll;
  background-color: rgba(16, 23, 32, 1);
}
.iotApp-detail-title-icon{
  height: 17px;
  width: 4px;
}
.iotApp-detail-title{
  font-size: 20px;
  margin-left: 4.5%;
  margin-top: 5%;
  margin-bottom: 10px;
  color: white;
}
.info-name{
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
  display: inline-block;
  margin-left: 26px;
}
.equipStatus{
  margin-right: 12px;
}
.empty-row{
  width: 100%;
  height: 8px;
  background-color: rgba(19, 27, 37, 1);
  margin-top: 21px;
}
.infoRows{
  width: 80%;
  margin-top: 10px;
}
.edit-row-value{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  text-decoration: underline;
  color: #06F0FE;
}
.info-row{
  height: 40px;
  line-height: 40px;
  margin-left: 24px;
}
.select-box{
  width: 90%;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid rgba(40, 52, 68, 1);
  margin-left: 20px;
}
.select-name{

  width: 80%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #373F4A;
  padding-left: 10px;
  padding-top: 2.5px;
  float: left;
}
.select-status-icon{
  width: 12px;
  height: 7px;
  vertical-align: middle;
  float: right;
  line-height: 40px;
  padding-top: 15px;
}

.submit-btn{
  width: 345px;
  height: 40px;
  margin-left: 15px;
  background: linear-gradient(-90deg, #008EFF, #1DF2FF);
  border: none;
  box-shadow: 0px 1px 7px 0px rgba(27, 60, 136, 0.67);
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  margin-top: 10px;
}
.foot{
  height: 30px;
  width: 100%;
  margin-top: 30px;
  border-top: 1px solid #283444;
  float: left;
  margin-bottom: 90px;
}
.edit-row{
  height: 8px;
  line-height: 11px;
  margin-top: 8px;
}
.important{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FF1743;
  float: left;
  margin-left: 24px;
  margin-right: 5px;
}
.edit-row-name{
  float: left;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(111, 133, 162, 1);
}
</style>
<style>
.editEquip .van-cell{
  background-color: rgba(16, 23, 32, 1);
  width: 90%;
  margin-left: 5%;
  border-bottom: 1px solid rgba(40, 52, 68, 1);
  padding: 10px 10px;
}
.editEquip .van-cell::after{
  border:none;
}
.editEquip input::-webkit-input-placeholder{
  color: #373F4A !important;
  font-size: 16px
}
.editEquip .van-field__control{
  color: #8BA3C2;
  font-size: 16px;
}

.editEquip .van-picker__columns {
  background-color: #10161F;
}
.editEquip .van-picker__mask{
  background-image: linear-gradient(180deg,hsla(216, 32%, 9%, .4),hsla(216, 32%, 9%, .9)),linear-gradient(0deg,hsla(216, 32%, 9%, .4),hsla(216, 32%, 9%, .9));
}
.editEquip .van-picker-column__item {
  color:#B9CEE9
}
.editEquip .van-picker__toolbar{
  background-color: #10161F
}
.editEquip .van-picker__title{
  color:#B9CEE9
}

.editEquip .van-search__content {
  background-color: #1A212B;
}
.editEquip .van-popup{
  background-color: unset;
}
</style>
