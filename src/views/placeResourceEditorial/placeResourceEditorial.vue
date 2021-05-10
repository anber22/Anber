<template>
  <div class="placeResourceEditorial">
    <!--标题框 -->
    <!-- <div class="van-nav-bar">
      <i>a</i>
      新增网点
    </div> -->
    <!-- 网点信息list -->
    <div class="net-info">
      <img src="@/assets/images/home/title-icon.png" alt="">
      网点信息
    </div>
    <!-- 网点信息详情 -->
    <div v-for="(item,index) in netinfodetail" :key="index" class="netinfo-detail">
      <span :class="item.required?'sign':'sign-none'" style="color:red;font-size:12px" :required="item.required">*</span>
      <p class="quest">
        {{ item.question }}
      </p>
      <template v-if="item.type==='input'">
        <input v-model="item.answer" class="inputs" type="text" :placeholder="item.value">
      </template>
      <!-- 网点类型 -->
      <template v-if="item.type==='picker'">
        <van-field
          v-model="netinfodetail[1].answer"
          readonly
          clickable
          is-link
          placeholder="请选择网点类型"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            class="picker"
            title="网点类型"
            :default-index="0"
            value-key="name"
            show-toolbar
            :columns="pickcolumns"
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </van-popup>
      </template>
      <!-- 所属辖区 -->
      <template v-if="item.type==='cascader'">
        <van-field
          v-model="netinfodetail[3].answer"
          class="pops"
          is-link
          readonly
          placeholder="请选择所属辖区"
          @click="show = true"
        />
        <van-popup v-model="show" round position="bottom">
          <van-cascader
            v-model="cascaderValue"
            title="请选择所属辖区"
            :options="options"
            @close="show = false"
            @finish="onFinish"
          />
        </van-popup>
      </template>
    </div>
    <!-- 责任书 -->
    <!-- 网点照片 -->
    <!-- 物联设备 -->
    <div class="Ito-equip">
      <img src="@/assets/images/home/title-icon.png" alt="">
      物联设备({{ itoEquipList.length }})
    </div>
    <PlaceDetailCard class="PlaceDetailCard-bind-equip" :data="itoEquipList" />
    <!-- 绑定设备 -->
    <p class="binding-device">
      <img src="@/assets/images/equip/add.png" alt="">
      绑定设备
    </p>
    <!-- 保存按钮 -->
    <van-button class="store-btn" block color="linear-gradient(100deg, #1DF2FF,#008EFF )" @click="savePlaceResourceInfo">
      保存
    </van-button>
  </div>
</template>

<script>
import Api from '@/api/placeResource/placeResource.js'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
import PlaceDetailCard from 'cmp/placeDetailCard/PlaceDetailCard'

export default {
  components: {
    PlaceDetailCard
  },
  data() {
    return {
      itoEquipList: [],

      netinfodetail: [
        {
          question: '网点名称',
          value: '请输入网点名称',
          required: true,
          type: 'input',
          answer: ''
        },
        {
          question: '网点类型',
          value: '请选择网点类型',
          required: true,
          type: 'picker',
          answer: ''
        },
        {
          question: '网点地址',
          value: '请输入网点地址',
          required: false,
          type: 'input',
          answer: ''
        },
        {
          question: '所属辖区',
          value: '请选择所属辖区',
          required: true,
          type: 'cascader',
          answer: ''
        },
        {
          question: '负责人',
          value: '请输入负责人',
          required: false,
          type: 'input',
          answer: ''
        },
        {
          question: '手机号',
          value: '请输入手机号',
          required: false,
          type: 'input',
          answer: ''
        }
      ],
      show: false,
      fieldValue: '',
      cascaderValue: '',
      options: [
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
      ],
      pickcolumns: [],
      placeName: '',
      showPicker: false,
      detailPlaceId: 0,
      placeResourceDetail: {},
      placeResource: []
    }
  },
  mounted() {
    console.log('打印', this.$route)
  },
  created() {
    this.detailPlaceId = this.$route.query.placeResourceId

    this.getPlaceTypeList()
    this.getPlaceResourceDetail()
    this.getPlaceResourceEquip(this.detailPlaceId)
    this.getPlaceTypeTree()
  },
  methods: {
    async getPlaceTypeList() {
      // console.log('打印store', this.$store)
      this.pickcolumns = await this.$store.getters.placeType
      console.log('网点类型列表', this.pickcolumns)
    },
    showPopup() {
      this.show = true
    },
    onConfirm(value) {
      this.placeName = value.name
      // console.log('网点类型选择的是', value.name, this.placeName)
      this.netinfodetail[1].answer = value.name
      this.showPicker = false
    },
    onCancel() {
      this.showPicker = false
    },
    onFinish({ selectedOptions }) {
      this.show = false
      this.fieldValue = selectedOptions.map((option) => option.text).join('/')
    },
    // 保存功能
    async savePlaceResourceInfo() {
      console.log('保存成功')
      // 判断必填的是否未填
      if (this.netinfodetail[0].answer === '') {
        this.$toast({
          message: '请补充完善网点名称',
          position: 'bottom'
        })
        return
      }
      if (this.netinfodetail[1].answer === '') {
        this.$toast({
          message: '请补充完善网点类型',
          position: 'bottom'
        })
        return
      }
      if (this.netinfodetail[3].answer === '') {
        this.$toast({
          message: '请补充完善所属辖区',
          position: 'bottom'
        })
        return
      }

      const param = {
        name: this.netinfodetail[0].answer,
        type: this.netinfodetail[1].answer,
        address: this.netinfodetail[2].answer,
        departId: this.netinfodetail[3].answer,
        managerName: this.netinfodetail[4].answer,
        phone: this.netinfodetail[5].answer
      }
      console.log('param', param)
      const res = await Api.updateplaceResource(this.detailPlaceId, param)
      if (res.code === 200) {
        this.$toast({
          message: '网点修改成功',
          position: 'bottom'
        })
      }
    },

    /**
     * 获取当前网点详情
     */
    async getPlaceResourceDetail() {
      const res = await Api.placeResourceDetail(this.detailPlaceId)
      if (res.code === 200) {
        this.placeResourceDetail = res.data
      }
      this.placeResourceDetail = await ReadTypeNameOnVuex.conversion('placeType', 'placeTypeId', 'placeTypeName', [this.placeResourceDetail])
      console.log('网点详情', this.placeResourceDetail)
      this.placeResourceDetail = this.placeResourceDetail[0]
      this.netinfodetail[0].answer = this.placeResourceDetail.placeName
      this.netinfodetail[1].answer = this.placeResourceDetail.placeTypeName
      this.netinfodetail[2].answer = this.placeResourceDetail.placeAddress
      this.netinfodetail[3].answer = this.placeResourceDetail.departName
      this.netinfodetail[4].answer = this.placeResourceDetail.managerName
      this.netinfodetail[5].answer = this.placeResourceDetail.phone
    },
    /**
     * 获取当前网点关联的设备列表
     */
    async getPlaceResourceEquip(detailPlaceId) {
      // console.log(id, 'id----')
      const res = await Api.placeResourceEquip(detailPlaceId)
      // console.log('关联设备的res-----', res.data)
      if (res.code === 200) {
        const dataArr = [...res.data]
        console.log('dataArr-----', dataArr)
        const arr = []
        for (let i = 0; i < dataArr.length; i++) {
          const element = dataArr[i]
          const obj = {
            equipStatus: {
              statusname: element.onlineType,
              electricity: element.equipPower,
              signal: element.equipSignal
            },
            contentDetail: {
              info: [element.equipName, element.imei, element.equipAddress]
            }
          }
          arr.push(obj)
        }
        this.itoEquipList = arr
      }
    },

    /*
      获取辖区树
    */
    async getPlaceTypeTree() {
      const a = await Api.getPlaceTree()
      console.log('辖区树res--', a)
    }
  }
}

</script>
<style scoped>
.placResourceEditorial{
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
  width: 17px;
  height: 17px;
}
.netinfo-detail{
  padding: 0 11px;
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
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #283444;
  padding-bottom: 20px;
}
.sign{
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

</style>
<style>
.placeResourceEditorial input::-webkit-input-placeholder{
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
    padding-bottom: 20px;
    overflow: hidden;
    color: #323233;
    font-size: 16px;
    line-height: 24px;
    background-color: #101720;
    border-bottom: 1px solid #283444;
}
.placeResourceEditorial .van-cell::after{
  border: none;
}
.placeResourceEditorial .van-cell--clickable{
  padding: 0px;
  padding-bottom: 20px;
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
  margin-top: 41px;
  margin-bottom: 11px
}
.placeResourceEditorial .PlaceDetailCard-bind-equip{
  box-sizing: border-box;
  margin-top: 4%;
  margin-bottom: 8%;
  font-size: 16px;
  color: #B9CEE9;
  /* text-align: center */
}
</style>
