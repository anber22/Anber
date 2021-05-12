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
      <span class="sign-none">*</span>
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
      <input v-model="resourceInfo.phone" class="inputs" type="text" placeholder="请输入手机号">
    </div>
    <!-- 责任书 -->
    <div class="netinfo-detail border-no ">
      <span class="sign-none">*</span>
      <p class="quest">
        责任书
      </p>
      <div class="resource-img">
        <UploadImg class="uploadImg" :water-mark-info="waterMarkInfo" @choiceImg="choiceImg" />
      </div>
    </div>
    <!-- 网点照片 -->
    <div class="netinfo-detail border-no">
      <span class="sign-none">*</span>
      <p class="quest">
        网点照片
      </p>
      <div class="resource-img">
        <UploadImg class="uploadImg" :water-mark-info="waterMarkInfo" @choiceImg="choiceImg" />
      </div>
    </div>
    <!-- 物联设备 -->
    <div class="Ito-equip">
      <img src="@/assets/images/home/title-icon.png" alt="">
      物联设备({{ itoEquipList.length }})
    </div>
    <PlaceDetailCard class="PlaceDetailCard-bind-equip" :place-detail-data="itoEquipList" :status-add="true" @deleteEquip="deleteBindEquip" />
    <!-- 绑定设备 -->
    <p class="binding-device" @click="AddEquip">
      <img src="@/assets/images/equip/add.png" alt="">
      绑定设备
    </p>
    <!-- 保存按钮 -->
    <van-button class="store-btn" block color="linear-gradient(100deg, #1DF2FF,#008EFF )" @click="getPlaceResourceInfo">
      保存
    </van-button>
  </div>
</template>

<script>
import Api from '@/api/placeResource/placeResource.js'
import PlaceDetailCard from 'cmp/placeDetailCard/PlaceDetailCard'
import UploadImg from 'cmp/uploadImg/UploadImg'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'

export default {
  components: {
    PlaceDetailCard,
    UploadImg
  },
  data() {
    return {
      itoEquipList: [], // 设备列表
      equipList: [],
      resourceInfo: {
        name: '', // 网点名称
        type: '', // 网点类型
        address: '', // 网点地址
        departId: '', // 网点辖区
        managerName: '', // 负责人
        phone: '' // 手机号
      },
      departName: '', // 辖区名字
      selectedOptions: [], // 辖区选中数组
      showCascader: false, // 选中辖区弹窗
      fieldNames: {
        text: 'departName',
        value: 'departId',
        children: 'children'
      }, // 选择辖区自定义字段名
      departOptions: [
        {
          departName: '华南地区',
          departId: '330000',
          children: [
            {
              departName: '广东省',
              departId: '330100',
              children: [
                { departName: '广州市', departId: '330101' },
                { departName: '深圳市', departId: '330102' },
                { departName: '珠海市', departId: '330103' }
              ]
            },
            {
              departName: '湖南省',
              departId: '330200',
              children: [
                { departName: '岳阳市', departId: '330201' },
                { departName: '长沙市', departId: '330202' },
                { departName: '张家界市', departId: '330203' }
              ]
            },
            {
              departName: '广西壮族自治区',
              departId: '330300',
              children: [
                { departName: '柳州市', departId: '330301' },
                { departName: '南宁市', departId: '330302' },
                { departName: '北海市', departId: '330303' }
              ]
            }]
        }
      ], // 辖区树
      pickcolumns: [], // 网点类型列表
      placeTypeName: '',
      showPicker: false,
      waterMarkInfo: {
        placeName: '网点名称'
      } // 水印信息
    }
  },
  created() {
    if (window.localStorage.getItem('placeResource')) {
      const placeResource = JSON.parse(window.localStorage.getItem('placeResource'))
      this.resourceInfo = placeResource.resourceInfo
      this.selectedOptions = placeResource.selectedOptions
      this.placeTypeName = placeResource.placeTypeName
      this.departName = placeResource.selectedOptions.length > 0 ? placeResource.selectedOptions[placeResource.selectedOptions.length - 1].departName : ''
    }
    if (window.localStorage.getItem('equipList')) {
      this.manageEquipList()
    }
    this.getPlaceTypeList()
    // this.getPlaceTypeTree()
  },
  methods: {
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
          equipName: item.equipName
        }
        this.itoEquipList.push(obj)
      })
      console.log('itoEquipList-----', this.itoEquipList)
    },
    /**
     * 删除绑定设备
     */
    deleteBindEquip(index) {
      console.log('index---', index)
      this.$dialog.confirm({
        message: '是否确定解绑？',
        className: 'del-equip',
        confirmButtonColor: '#06F0FE',
        cancelButtonColor: '#6F85A2'
      })
        .then(() => {
          console.log('确认---')
          // this.itoEquipList.splice(index, 1)
          // this.equipList.splice(index, 1)
          // window.localStorage.setItem('equipList', JSON.stringify(this.equipList))
        })
        .catch(() => {
          console.log('取消---')
        // on cancel
        })
      // 询问是否确认删除
    },
    /**
     * 获取网点类型列表
     */
    async getPlaceTypeList() {
      this.pickcolumns = await this.$store.getters.placeType
      console.log('网点类型列表', this.pickcolumns)
    },
    /**
     * 网点类型选择
     */
    confirmPicker(value) {
      this.placeTypeName = value.name
      this.resourceInfo.type = value.id
      console.log('网点类型', value)
      this.showPicker = false
    },
    /**
     * 所属辖区选择-最后一级
     */
    finishDepart({ selectedOptions }) {
      this.departName = selectedOptions[selectedOptions.length - 1].departName
      this.resourceInfo.departId = selectedOptions[selectedOptions.length - 1].departID
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
      this.resourceInfo.departId = this.selectedOptions[this.selectedOptions.length - 1].departID
      this.showCascader = false
    },
    /**
     * 保存新增网点
     */
    async getPlaceResourceInfo() {
      if (this.resourceInfo.name === '') {
        this.$toast('请补充完善网点名称')
        return
      }
      if (this.resourceInfo.type === '') {
        this.$toast('请补充完善网点类型')
        return
      }
      if (this.resourceInfo.departId === '') {
        this.$toast('请补充完善所属辖区')
        return
      }
      const res = await Api.placeResourceInfo(this.resourceInfo)
      if (res.code === 200) {
        this.$toast('网点新增成功')
      }
    },
    /**
     * 获取辖区树
     */
    async getPlaceTypeTree() {
      const res = await Api.getPlaceTree()
      console.log('辖区树a--', res)
    },
    /**
     * 绑定设备
     */
    AddEquip() {
      // 获取微信地理位置-获取成功才跳页面
      const placeResource = {
        resourceInfo: this.resourceInfo,
        selectedOptions: this.selectedOptions,
        placeTypeName: this.placeTypeName
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
     * 选择图片  待用
     */
    choiceImg(e) {
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
.net-info,.Ito-equip{
  height: 65px;
  line-height: 65px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #B9CEE9;
}
.net-info img, .Ito-equip img{
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
.resource-img .uploadImg {
  margin-left: 0  !important;

}

</style>
<style>
.del-equip {
  background: #101720;
  border-radius: 0;
}
.del-equip .van-button--default {
  background: #101720;

}
.del-equip .van-hairline--top::after {
  border-color: #283444;
}
.del-equip .van-dialog__message {
  color: #B9CEE9;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
}
.del-equip .van-dialog__content--isolated {
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
