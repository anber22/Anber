<template>
  <div class="placeResourceEditorial">
    <!-- 网点信息list -->
    <div class="net-info">
      <img src="@/assets/images/home/title-icon.png" alt="">
      网点信息
    </div>
    <!-- 网点名称 -->
    <div class="netinfo-detail">
      <span class="sign">*</span>
      <p class="quest">
        网点名称
      </p>
      <van-form>
        <van-field
          v-model="resourceInfo.name"
          :rules="[{ required: true, message: '请输入网点名称' }]"
          placeholder="请输入网点名称"
          class="inputs"
          @blur="rulesImg"
        />
      </van-form>
    </div>
    <!-- 网点类型 -->
    <div class="netinfo-detail">
      <span class="sign">*</span>
      <p class="quest">
        网点类型
      </p>
      <van-form>
        <van-field
          v-model="placeTypeName"
          readonly
          clickable
          is-link
          placeholder="请选择网点类型"
          :rules="[{ required: true, message: '请选择网点类型' }]"
          @click="showPicker = true"
        />
      </van-form>
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          class="picker"
          title="网点类型"
          :default-index="0"
          value-key="name"
          show-toolbar
          :columns="pickcolumns"
          @confirm="confirmPicker"
          @cancel="showPicker=false"
        />
      </van-popup>
    </div>
    <!-- 网点地址 -->
    <div class="netinfo-detail">
      <span class="sign">*</span>
      <p class="quest">
        网点地址
      </p>
      <input v-model="resourceInfo.address" class="inputs" type="text" placeholder="请输入网点地址">
    </div>
    <!-- 所属辖区 -->
    <div class="netinfo-detail">
      <span class="sign">*</span>
      <p class="quest">
        所属辖区
      </p>
      <van-form>
        <van-field
          v-model="departName"
          class="pops"
          is-link
          readonly
          placeholder="请选择所属辖区"
          :rules="[{ required: true, message: '请选择所属辖区' }]"
          @click="showCascader = true"
        />
      </van-form>
      <van-popup v-model="showCascader" round position="bottom">
        <van-cascader
          v-model="departName"
          title="请选择所属辖区"
          :field-names="fieldNames"
          :options="departOptions"
          @close="showCascader=false"
          @change="onchange"
          @finish="finishDepart"
        />
        <van-button class="depart-btn" block color="linear-gradient(100deg, #1DF2FF,#008EFF )" @click="confirmDepart">
          确定
        </van-button>
      </van-popup>
    </div>
    <!-- 负责人 -->
    <div class="netinfo-detail">
      <span class="sign-none">*</span>
      <p class="quest">
        负责人
      </p>
      <input v-model="resourceInfo.managerName" class="inputs" type="text" placeholder="请输入负责人">
    </div>
    <!-- 手机号 -->
    <div class="netinfo-detail">
      <span class="sign-none">*</span>
      <p class="quest">
        手机号
      </p>
      <van-form>
        <van-field
          v-model="resourceInfo.phone"
          :rules="[
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误'}
          ]"
          placeholder="请输入手机号"
          class="inputs"
        />
      </van-form>
    </div>
    <!-- 责任书 -->
    <div class="netinfo-detail border-no ">
      <span class="sign-none">*</span>
      <p class="quest">
        责任书
      </p>
      <div class="resource-img">
        <UploadImg ref="dutyUploadImg" class="upload-img" :old-img-list="resourceInfo.dutyImg" :water-mark-info="waterMarkInfo" @getImgList="getDutyImg" />
      </div>
    </div>
    <!-- 网点照片 -->
    <div class="netinfo-detail border-no">
      <span class="sign-none">*</span>
      <p class="quest">
        网点照片
      </p>
      <div class="resource-img">
        <UploadImg ref="departUploadImg" class="upload-img" :old-img-list="resourceInfo.departImg" :water-mark-info="waterMarkInfo" @getImgList="getDepartImg" />
      </div>
    </div>
    <!-- 物联设备 -->
    <div class="ito-equip">
      <img src="@/assets/images/home/title-icon.png" alt="">
      物联设备({{ itoEquipList.length }})
    </div>
    <PlaceDetailCard class="PlaceDetailCard-bind-equip" :place-detail-data="itoEquipList" :status-add="true" @deleteEquip="deleteBindEquip" />
    <!-- 绑定设备 -->
    <p v-if="!uploadStatus" class="binding-device" @click="AddEquip">
      <img src="@/assets/images/equip/add.png" alt="">
      绑定设备
    </p>
    <!-- 保存按钮 -->
    <van-button class="store-btn" block color="linear-gradient(100deg, #1DF2FF,#008EFF )" :loading="loading" loading-text="保存中..." @click="addPlaceResourceInfo">
      保存
    </van-button>
  </div>
</template>

<script>
import Api from '@/api/placeResource/placeResource.js'
import PlaceDetailCard from 'cmp/placeDetailCard/PlaceDetailCard'
import UploadImg from 'cmp/uploadImg/UploadImg'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
import { getUserInfo } from '@/utils/auth'
import Config from '../../../config.json'
export default {
  components: {
    PlaceDetailCard,
    UploadImg
  },
  data() {
    return {
      itoEquipList: [], // 设备列表
      equipList: [], // 本地拿到新增绑定设备列表
      resourceInfo: {
        name: '', // 网点名称
        type: '', // 网点类型
        address: '', // 网点地址
        departId: '', // 网点辖区
        managerName: '', // 负责人
        phone: '', // 手机号
        dutyImg: [], // 责任书
        departImg: [] // 网点照片
      },
      departName: '', // 辖区名字
      selectedOptions: [], // 辖区选中数组
      showCascader: false, // 选中辖区弹窗
      fieldNames: {
        text: 'departName',
        value: 'departId',
        children: 'children'
      }, // 选择辖区自定义字段名
      departOptions: [], // 辖区树
      pickcolumns: [], // 网点类型列表
      placeTypeName: '',
      showPicker: false,
      waterMarkInfo: {
        placeName: '', // 网点名称
        managerName: '' // 上传人
      }, // 水印信息
      uploadImages: {
        departImg: [],
        dutyImg: []
      },
      loading: false,
      uploadStatus: false, // 新增网点成败
      dutyFailedList: [], // 责任书上传失败
      departFailedList: [], // 网点照片上传失败
      equipFailedList: [], // 设备上传失败
      equipImgFailedList: [], // 设备图片上传失败
      resourceId: '' // 网点id
    }
  },
  created() {
    if (window.localStorage.getItem('placeResource')) this.manageResourceInfo()
    if (window.localStorage.getItem('equipList')) this.manageEquipList()
    this.getPlaceTypeList()
    this.getPlaceTypeTree()
    this.waterMarkInfo.managerName = getUserInfo().name
  },
  methods: {
    /**
     * 获取网点类型列表
     */
    async getPlaceTypeList() {
      this.pickcolumns = await this.$store.getters.placeType
    },
    /**
     * 获取本地网点信息x
     */
    manageResourceInfo() {
      const placeResource = JSON.parse(window.localStorage.getItem('placeResource'))
      this.resourceInfo = placeResource.resourceInfo
      this.selectedOptions = placeResource.selectedOptions
      this.placeTypeName = placeResource.placeTypeName
      this.waterMarkInfo = placeResource.waterMarkInfo
      this.uploadImages = placeResource.uploadImages
      this.departName = placeResource.selectedOptions.length > 0 ? placeResource.selectedOptions[placeResource.selectedOptions.length - 1].departName : ''
    },
    /**
     * 网点类型选择
     */
    confirmPicker(value) {
      this.placeTypeName = value.name
      this.resourceInfo.type = value.id
      this.showPicker = false
    },
    /**
     * 所属辖区选择-最后一级
     */
    finishDepart({ selectedOptions }) {
      this.departName = selectedOptions[selectedOptions.length - 1].departName
      this.resourceInfo.departId = selectedOptions[selectedOptions.length - 1].departId
      this.showCascader = false
    },
    /**
     * 所属辖区选择-选中
     */
    onchange({ selectedOptions }) {
      this.selectedOptions = selectedOptions
    },
    /**
     * 所属辖区选择-确认
     */
    confirmDepart() {
      this.departName = this.selectedOptions[this.selectedOptions.length - 1].departName
      this.resourceInfo.departId = this.selectedOptions[this.selectedOptions.length - 1].departId
      this.showCascader = false
    },
    /**
     * 保存新增网点
     */
    async addPlaceResourceInfo() {
      this.loading = true
      if (this.resourceInfo.name === '') {
        this.$toast('请补充完善网点名称')
        this.loading = false
        return
      }
      if (this.resourceInfo.type === '') {
        this.$toast('请补充完善网点类型')
        this.loading = false
        return
      }
      if (this.resourceInfo.address === '') {
        this.$toast('请补充完善网点地址')
        this.loading = false
        return
      }
      if (this.resourceInfo.departId === '') {
        this.$toast('请补充完善所属辖区')
        this.loading = false
        return
      }
      if (!this.uploadStatus) this.uploadStatus = await this.uploadPlaceResource()
      if (this.uploadStatus) {
        // 责任书上传
        this.bindUploadImg(this.uploadImages.dutyImg, 3)
        // 网点照片上传
        this.bindUploadImg(this.uploadImages.departImg, 2)
        // 绑定设备
        for (let i = 0; i < this.equipList.length; i++) {
          const status = await this.addBindEquip(this.equipList[i], i)
          if (status) this.bindUploadImg(this.equipList[i].uploadNames, 4, this.equipList[i].imei)
        }
        // 失败提示
        if (this.departFailedList.length > 0 || this.dutyFailedList.length > 0 || this.equipFailedList.length > 0 || this.equipImgFailedList.length > 0) {
          const dutyTips = this.dutyFailedList.length > 0 ? '有' + this.dutyFailedList.length + '张责任书照片上传失败\n' : ''
          const departTips = this.departFailedList.length > 0 ? '有' + this.departFailedList.length + '张网点照片上传失败\n' : ''

          let equipTips = ''
          this.equipFailedList.forEach((item, i) => {
            const equipSign = i === 0 ? '' : '、'
            equipTips = equipTips + equipSign + '第' + item.index + '个 IMEI码为:' + item.imei
          })
          equipTips = equipTips + '设备绑定绑定失败\n'
          let equipImgTips = ''
          this.equipImgFailedList.forEach((item, i) => {
            const equipImgSign = i === 0 ? '' : '、'
            equipImgTips = equipImgTips + equipImgSign + 'IMEI码为:' + item.imei + '的' + item.names.length + '张'
          })
          this.$dialog.confirm({
            message: '以下内容上传失败，是否前往完善信息？\n' + dutyTips + departTips + equipTips + equipImgTips,
            className: 'dialog-tips',
            confirmButtonColor: '#06F0FE',
            cancelButtonColor: '#6F85A2'
          })
            .then(() => {
              this.$router.push({ path: '/placeResourceEditorial', query: { placeResourceId: this.resourceId }})
            })
            .catch(() => {
              this.$router.back()
            })
        } else {
          this.$toast('新增网点成功')
          setTimeout(() => {
            this.$router.back()
          }, 1500)
        }
        this.loading = false
      }
    },
    /**
     * 新增网点
     */
    async uploadPlaceResource() {
      const res = await Api.placeResourceInfo(this.resourceInfo)
      if (res.code === 201) {
        this.resourceId = res.data
        return true
      } else {
        this.$toast(res.message)
        return false
      }
    },
    /**
     * 绑定设备
     */
    async addBindEquip(item, index) {
      const param = {
        lon: item.lon,
        lat: item.lat,
        address: item.address
      }
      const res = await Api.bindEquip(this.resourceId, item.imei, param)
      if (res.code === 200) {
        this.equipList[index].equipId = res.data
        return true
      } else {
        const obj = {
          index: index + 1,
          imei: item.imei
        }
        this.equipFailedList.push(obj)
        return false
      }
    },
    /**
     * 关联图片
     */
    async bindUploadImg(list, type, imei) {
      const param = {
        names: list,
        type: type,
        networkId: this.resourceId
      }
      if (imei) param.imei = imei
      const res = await Api.connectFile(param)
      if (res.code === 200) {
        return true
      } else {
        const names = res.data ? res.data : list
        if (type === 2) this.departFailedList = names
        if (type === 3) this.dutyFailedList = names
        if (type === 4) {
          this.equipImgFailedList.push({ names: names, imei: imei })
        }
      }
    },
    /**
     * 上传文件
     */
    async uploadFile(file, index, type, j, imgLength, equipId) {
      // 这里需要用formdata的格式提交参数
      const param = new FormData()
      param.append('file', file)
      param.append('type', type)
      param.append('networkId', this.resourceId)
      const res = await Api.uploadFile(param)
      if (res.code === 200) {
        return true
      } else {
        if (type === 2) {
          this.departFailedList.push(index + 1)
        }
        if (type === 3) {
          this.dutyFailedList.push(index + 1)
        }
        if (type === 4) {
          let status = false
          this.equipImgFailedList.forEach(item => {
            if (item.imei === this.equipList[j].imei) {
              status = true
              item.Failed.push(index)
              const inx = index + 1
              item.imgIndex = item.imgIndex + '、' + inx
              if (item.Failed.length === imgLength) {
                this.deleteEquip(equipId)
                const obj = {
                  index: j + 1,
                  imei: item.imei
                }
                this.equipFailedList.push(obj)
              }
              return
            }
          })
          if (!status) {
            const obj = {
              index: j + 1, // 设备下标
              imgIndex: index + 1, // 图片下标
              imei: this.equipList[j].imei, // 设备imei码
              Failed: [] // 图片失败数组
            }
            obj.Failed.push(index)
            this.equipImgFailedList.push(obj)
          }
        }
        // 记录上传失败的图片下表，用于提交完成之后告知用户
        // this.uploadFailedList = this.uploadFailedList + `第${index + 1}`
        // this.uploadFailedList.push(index)
        return false
      }
    },
    /**
     * 解绑设备
     */
    async deleteEquip(equipId) {
      const deleteres = await Api.deleteEquip(this.resourceId, equipId)
      if (deleteres.code === 200) {
        return true
      }
    },
    /**
     * 获取辖区树
     */
    async getPlaceTypeTree() {
      const res = await Api.getDepartTree()
      if (res.code === 200) {
        this.departOptions = res.data
      }
    },
    /**
     * 绑定设备
     */
    AddEquip() {
      // 获取微信地理位置-获取成功才跳页面
      const placeResource = {
        resourceInfo: this.resourceInfo,
        selectedOptions: this.selectedOptions,
        placeTypeName: this.placeTypeName,
        waterMarkInfo: this.waterMarkInfo,
        uploadImages: this.uploadImages
      }
      window.localStorage.setItem('placeResource', JSON.stringify(placeResource)) // 保存辖区信息到本地
      this.$router.push({
        path: '/bindEquip',
        query: {
          status: true
        }
      })
    },
    /**
     *  绑定设备列表
     */
    async manageEquipList() {
      this.equipList = JSON.parse(window.localStorage.getItem('equipList'))
      const list = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', this.equipList)
      list.forEach(item => {
        const obj = {
          equipAddress: item.address,
          equipTypeName: item.equipTypeName,
          imei: item.imei,
          equipName: item.equipName,
          equipImg: item.equipImg
        }
        this.itoEquipList.push(obj)
      })
    },
    /**
     * 删除绑定设备
     */
    deleteBindEquip(index) {
      this.$dialog.confirm({
        message: '是否确定解绑？',
        className: 'dialog-tips',
        confirmButtonColor: '#06F0FE',
        cancelButtonColor: '#6F85A2'
      })
        .then(() => {
          this.itoEquipList.splice(index, 1)
          this.equipList.splice(index, 1)
          window.localStorage.setItem('equipList', JSON.stringify(this.equipList))
        })
        .catch(() => {
        })
    },
    /**
     * 网点名称修改
     */
    rulesImg() {
      if (this.resourceInfo.dutyImg.length > 0 || this.resourceInfo.departImg.length > 0 || this.itoEquipList.length > 0) {
        this.$dialog.confirm({
          message: '责任书、网点照片、物联设备都需重新上传\n是否确定修改网点名称？',
          className: 'dialog-tips',
          confirmButtonColor: '#06F0FE',
          cancelButtonColor: '#6F85A2'
        })
          .then(() => {
            this.waterMarkInfo.placeName = this.resourceInfo.name
            this.resourceInfo.dutyImg.forEach(item => {
              const uri = item.imgUrl.replace(Config.figureBedAddress, '')
              this.deleteUploadImg(uri)
            })
            this.resourceInfo.departImg.forEach(item => {
              const uri = item.imgUrl.replace(Config.figureBedAddress, '')
              this.deleteUploadImg(uri)
            })
            this.$refs.dutyUploadImg.uploadImg = []
            this.$refs.departUploadImg.uploadImg = []
            this.itoEquipList = []
            this.equipList = []
            this.resourceInfo.dutyImg = []
            this.resourceInfo.departImg = []
            this.uploadImages.dutyImg = []
            this.uploadImages.departImg = []
            window.localStorage.setItem('equipList', JSON.stringify(this.equipList))
          })
          .catch(() => {
            this.resourceInfo.name = this.waterMarkInfo.placeName
          })
      } else {
        this.waterMarkInfo.placeName = this.resourceInfo.name
      }
    },
    /**
     * 删除图片
     */
    async deleteUploadImg(uri) {
      const param = '?name=' + uri
      const res = await Api.deleteFile(param)
      if (res.code === 200) {
        // this.$toast.success('删除成功')
      }
    },
    /**
     * 选择图片 责任书
     * @img {*}  图片列表
     * @deleteUri 点击删除图片的uri
     */
    async getDutyImg(img, deleteUri, deleteIndex, images) {
      // this.resourceInfo.dutyImg = img
      if (images) this.uploadDutyimg(images, 'duty')
      // 如果不是删除图片则传的deleteUri 为空字符
      if (deleteUri.length > 0) {
        // * name 点击删除图片的uri
        // * type 图片类型(2网点图片,3网点责任书,4设备安装图片)
        // networkId 网点id
        // imei 设备imei码
        const param = '?name=' + deleteUri
        const res = await Api.deleteFile(param)
        if (res.code === 200) {
          this.$toast.success('删除成功')
          // 如果触发删除方法，则把equip里面的对应的图片页删了
          this.uploadImages.dutyImg.splice(deleteIndex, 1)
          this.uploadImages.dutyImg.splice(deleteIndex, 1)
        }
      }
    },
    /**
     * 上传图片（未绑定网点/设备）
     */
    async uploadDutyimg(item, type) {
      const param = new FormData()
      param.append('file', item.file)
      const res = await Api.uploadFile(param)
      if (res.code === 200) {
        if (type === 'duty') {
          this.resourceInfo.dutyImg.push({ imgUrl: Config.figureBedAddress + res.data })
          this.uploadImages.dutyImg.push(res.data)
        }
        if (type === 'depart') {
          this.resourceInfo.departImg.push({ imgUrl: Config.figureBedAddress + res.data })
          this.uploadImages.departImg.push(res.data)
        }
      }
    },
    /**
     * 选择图片 网点照片
     * @img {*}  图片列表
     * @deleteUri 点击删除图片的uri
     */
    async getDepartImg(img, deleteUri, deleteIndex, images) {
      // this.resourceInfo.departImg = img
      if (images) this.uploadDutyimg(images, 'depart')
      // 如果不是删除图片则传的deleteUri 为空字符
      if (deleteUri.length > 0) {
        // * name 点击删除图片的uri
        // * type 图片类型(2网点图片,3网点责任书,4设备安装图片)
        // networkId 网点id
        // imei 设备imei码
        const param = '?name=' + deleteUri
        const res = await Api.deleteFile(param)
        if (res.code === 200) {
          this.$toast.success('删除成功')
          // 如果触发删除方法，则把equip里面的对应的图片页删了
          this.resourceInfo.departImg.splice(deleteIndex, 1)
          this.uploadImages.departImg.splice(deleteIndex, 1)
        }
      }
    }
  }

}
</script>
<style scoped>
.placeResourceEditorial{
  background-color: #101720;
  width: 92%;
  height: calc(100% - 46px);
  position: fixed;
  color: #ffffff;
  overflow: scroll;
  padding: 0 15px;
}
.net-info, .ito-equip{
  height: 65px;
  line-height: 65px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #B9CEE9;
}
.net-info img, .ito-equip img{
  width: 4px;
  height: 17px;
  background: linear-gradient(78deg, #008EFF, #1DF2FF);
}
.van-nav-bar{
  width: 375px;
  height: 50px;
  background: #233143;
}
.binding-device{
  text-align: center;
  /* height: 22px;
  line-height: 22px; */
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
  border: 1px #4D628F dashed;
  padding: 8px 0;
}
.binding-device img{
  width: 16px;
  height: 16px;
  vertical-align: -2px;
}
.netinfo-detail{
  padding: 0 0 0 10px;
  border-bottom: 1px solid #283444;
  margin-bottom: 15px;
}
.border-no {
  border-bottom: none;
}
.quest{
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #6F85A2;
  display: inline;
}
.inputs{
  width: 100%;
  background-color: #101720;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color:#B9CEE9;
  border: none;
  padding-bottom: 15px;
  padding-top: 5px;
}
.sign {
  color:red;
  font-size:12px;
  display: inline-block;
}
.sign-none{
  display: none;
}
.pops,.picker{
  width: 100%;
  background-color: #101720;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #373F4A;
  border-bottom: 1px solid #283444;
  padding:0 0 20px 0;
}
.depart-btn {
  width: 80%;
  margin: 15px auto;
}
.resource-img {
  min-height: 100px;
}
.resource-img .upload-img {
  margin-left: 0  !important;

}

</style>
<style>
.dialog-tips {
  background: #101720;
  border-radius: 0;
}
.dialog-tips .van-button--default {
  background: #101720;

}
.dialog-tips .van-hairline--top::after {
  border-color: #283444;
}
.dialog-tips .van-dialog__message {
  color: #B9CEE9;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
}
.dialog-tips .van-dialog__content--isolated {
  min-height: 80px;
}
.placeResourceEditorial input::-webkit-input-placeholder, .placeResourceEditorial .van-field__control::-webkit-input-placeholder{
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #373F4A;
}
.placeResourceEditorial .van-cell__value--alone {
  color: #373F4A;
  text-align: left;
}
.placeResourceEditorial .van-cell{
  position: relative;
  display: -webkit-box;
  box-sizing: border-box;
  width: 100%;
  padding: 5px 0 15px;
  overflow: hidden;
  color: #323233;
  font-size: 16px;
  line-height: 24px;
  background-color: #101720;
  border-bottom: none;
}
.placeResourceEditorial .van-cell::after{
  border: none;
}
.placeResourceEditorial .van-cell--clickable{
  padding: 5px 0px 15px;
}
.placeResourceEditorial .van-picker-column{
  background-color: #10161F;
}
.placeResourceEditorial .van-picker__title{
  color: #FFFEFE;
  font-size: 16px;
}
.placeResourceEditorial .van-ellipsis{
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFEFE;
}
.placeResourceEditorial .van-picker__toolbar{
  background-color: #10161F;
}
.placeResourceEditorial .van-picker-column__item{
  background-color: #10161F;
}

.placeResourceEditorial .van-cascader__option{
  color: #10161F
}
.placeResourceEditorial .van-cascader__option span,
.placeResourceEditorial .van-tab span{
  color: #FFFEFE;
  font-size: 14px;
}
.placeResourceEditorial .van-picker__mask{
  background-image: linear-gradient(180deg,hsla(216, 32%, 9%, .4),hsla(216, 32%, 9%, .9)),linear-gradient(0deg,hsla(216, 32%, 9%, .4),hsla(216, 32%, 9%, .9));
}
.placeResourceEditorial .van-cascader{
  background-color:#10161F;
}
.placeResourceEditorial .van-tabs__nav--complete{
  background-color:#10161F;
}
.placeResourceEditorial .van-cascader__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #FFFEFE;
    padding-left: 112px;

}
.placeResourceEditorial .van-cascader__header{
  background-color:#10161F;
}
.placeResourceEditorial .van-tabs__line{
  background-color: #06F0FE;
  width: 23px;
  height: 1px;
}
.placeResourceEditorial .van-cascader__option:active{
  background-color: transparent;
}
.placeResourceEditorial .van-field__control{
  color: #B9CEE9;
}
.placeResourceEditorial .van-tab--active .van-tab__text{
  color: #06F0FE
}
.placeResourceEditorial .store-btn{
  margin-top: 40px;
  margin-bottom: 20px;
}
.placeResourceEditorial .van-popup {
  background: #10161F;
}
.placeResourceEditorial .van-cascader__options {
  height: 330px;
}
.placeResourceEditorial .van-field--error .van-field__control {
  color: #B9CEE9 !important;
}
</style>
