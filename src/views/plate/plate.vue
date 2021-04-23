
<template>
  <!-- 物业看板 & 安委看板 -->
  <div class="plate">
    <!-- 预警统计 start -->
    <!-- 今日预警 本周预警 本月预警 -->

    <div class="warning-statistics">
      <div class="title-box">
        <div class="title-style" />
        <div class="title-name">
          预警统计
        </div>
      </div>

      <div class="equipList-detail">
        <div v-for="(item , index) in warnList" :key="index" class="equipList-detail-item" :style=" 'color:'+item.color" @click="1===index?check():uncheck()">
          <p>
            {{ item.value }}
          </p>
          <p class="equipList-detail-item-title">
            {{ item.name }}
          </p>
        </div>
      </div>

      <!-- 预警列表标题栏 -->
      <div class="alert-list">
        <h2>预警列表</h2>
        <p>未处理<span>11</span>件</p>
      </div>

      <!-- 违规停放列表 -->
      <ul class="vio-list">
        <li
          v-for="(item,index) in violationsList"
          :key="index"
          :class="!index && play?'toUp':''"
        >
          <!-- ！违规停放 -->
          <div class="illegal-parking">
            <img class="alert-icon" src="@/assets/images/alert.png" alt="">
            {{ router==='PropertyPlate'? '违规停放': '未佩戴安全帽' }}
          </div>
          <!-- 地址 -->
          <div class="park-address">
            {{ item.address }}
          </div>
          <!-- 时间 -->
          <div class="violations-time">
            {{ item.time }}
          </div>
        </li>
      </ul>
    </div>
    <!-- end -->
    <!-- 事件统计 start -->
    <div class="event-statistics">
      <div class="title-box">
        <div class="title-style" />
        <div class="title-name">
          事件统计
        </div>

        <div class="right-select">
          <van-dropdown-menu :overlay="false" :z-index="200" active-color="#B9CEE9">
            <van-dropdown-item v-model="timeType" :options="dateType" @change="onChangeDateType" />
          </van-dropdown-menu>
        </div>
      </div>
      <SimpleForm :data="eventList" class="simpleForm" />
    </div>
    <!-- end -->
    <!-- 预警趋势 start -->
    <div class="warning-trend">
      <div class="title-box">
        <div class="title-style" />
        <div class="title-name">
          预警趋势<span>(近30天)</span>
        </div>
      </div>
      <div class="warning-line">
        <Adaptive :data="['100%','56%']" style=" overflow: hidden; ">
          <MaxLine :data="lineData" style=" overflow: hidden; " />
        </Adaptive>
      </div>
    </div>
    <!-- end -->
    <!-- 设备统计 start -->
    <div class="equipment-statistics">
      <div class="title-box">
        <div class="title-style" />
        <div class="title-name">
          设备统计
        </div>
      </div>
      <SimpleForm :data="equipList" class="simpleForm" />
    </div>
    <!-- end -->
  </div>
</template>

<script>
import SimpleForm from 'cmp/simpleForm/SimpleForm'
import MaxLine from 'cmp/echarts/mixLine/MixLine'
export default {
  components: {
    SimpleForm,
    MaxLine
  },
  props: {
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      dateType: [ // 时间下拉框值
        {
          value: 1,
          text: '近1月'
        },
        {
          value: 2,
          text: '近1年'
        },
        {
          value: 3,
          text: '全部'
        }
      ],
      timeType: 1,
      equipList: { // 设备统计列表
        column: [ // 列头
          {
            name: '网点名称',
            key: 'placeName',
            width: '35%',
            text: 'left',
            color: '#9CB6CD'
          },
          {
            name: '设备总数',
            key: 'equipCount',
            width: '20%',
            text: 'center',
            color: '#9CB6CD'

          },
          {
            name: '在线数',
            key: 'onlineCount',
            width: '20%',
            text: 'center',
            color: '#11CAD9'

          },
          {
            name: '离线数',
            key: 'outlineCount',
            width: '20%',
            text: 'center',
            color: '#F0FF76'

          }
        ],
        row: [ // 数据行
          {
            placeName: '港湾一号',
            equipCount: '100',
            onlineCount: '98',
            outlineCount: '2'
          },
          {
            placeName: '惠景合园',
            equipCount: '100',
            onlineCount: '98',
            outlineCount: '2'
          },
          {
            placeName: '惠景慧园',
            equipCount: '100',
            onlineCount: '98',
            outlineCount: '2'
          },
          {
            placeName: '民营科技园',
            equipCount: '100',
            onlineCount: '98',
            outlineCount: '2'
          },
          {
            placeName: '惠景海岸',
            equipCount: '100',
            onlineCount: '98',
            outlineCount: '2'
          },
          {
            placeName: '创新发展大厦',
            equipCount: '100',
            onlineCount: '98',
            outlineCount: '2'
          }
        ]
      },
      eventList: { // 事件统计列表
        column: [ // 列头
          {
            name: '事件类型',
            key: 'eventTypeName',
            width: '35%',
            text: 'left',
            color: '#9CB6CD'
          },
          {
            name: '事件总数',
            key: 'eventCount',
            width: '20%',
            text: 'center',
            color: '#9CB6CD'

          },
          {
            name: '已处理',
            key: 'dealCount',
            width: '20%',
            text: 'center',
            color: '#11CAD9'

          },
          {
            name: '未处理',
            key: 'unDealCount',
            width: '20%',
            text: 'center',
            color: '#E3372F'

          }
        ],
        row: [ // 数据行
          {
            eventTypeName: '周界越界监测',
            eventCount: '100',
            dealCount: '98',
            unDealCount: '2'
          },
          {
            eventTypeName: '消防通道占用监测',
            eventCount: '100',
            dealCount: '97',
            unDealCount: '3'
          }
        ]
      },
      lineData: { // 折线统计图数据
        title: '预警数',
        name: '预警数',
        xAxis: {
          data: ['03.25', '03.26', '03.27', '03.28', '03.29', '03.30', '03.31', '04.01', '04.02', '04.03', '04.04', '04.05', '04.06', '04.07', '04.08', '04.09', '04.10', '04.11', '04.12', '04.13', '04.14', '04.15', '04.16', '04.17', '04.18', '04.19', '04.20', '04.21', '04.22', '04.23']
        },
        yAxis: {
          splitLineColor: 'rgba(76,200,172, 0.3)'
        },
        series: {
          data: ['8', '8', '8', '8', '8', '8', '17', '17', '28', '19', '10', '10', '20', '12', '12', '12', '12', '12', '14', '15', '10', '20', '20', '20', '20', '20', '20', '20', '20', '20'],
          smooth: false
        }

      },
      warnList: [ // 预警数据数组
        {
          name: '今日预警',
          value: 3,
          color: '#46FFEB'
        },
        {
          name: '本周预警',
          value: 22,
          color: '#F7FF74'
        },
        {
          name: '本月预警',
          value: 142,
          color: '#FF3C3C'
        }
      ],
      violationsList: [
        {
          address: '港湾一号湾7湾8栋间',
          time: '8分钟前'
        },
        {
          address: '港湾一号湾2湾9栋间',
          time: '8分钟前'
        },
        {
          address: '港湾一号湾9湾1栋间',
          time: '10分钟前'
        },
        {
          address: '港湾一号湾9湾2栋间',
          time: '59分钟前'
        },
        {
          address: '港湾一号湾9湾3栋间',
          time: '49分钟前'
        },
        {
          address: '港湾一号湾9湾4栋间',
          time: '39分钟前'
        },
        {
          address: '港湾一号湾9湾5栋间',
          time: '29分钟前'
        },
        {
          address: '港湾一号湾9湾6栋间',
          time: '19分钟前'
        }
      ],
      play: false,
      router: 'PropertyPlate'

    }
  },
  created() {
    this.router = this.$router.history.current.name
    if (this.$router.history.current.name !== 'PropertyPlate') {
      this.equipList.row = [
        {
          placeName: '唐家第一工业园',
          equipCount: '100',
          onlineCount: '98',
          outlineCount: '2'
        },
        {
          placeName: '金发工地',
          equipCount: '100',
          onlineCount: '98',
          outlineCount: '2'
        },
        {
          placeName: '银溪雅园工地',
          equipCount: '100',
          onlineCount: '97',
          outlineCount: '3'
        },
        {
          placeName: '惠景海岸工地',
          equipCount: '100',
          onlineCount: '98',
          outlineCount: '2'
        },
        {
          placeName: '金地第一工业园',
          equipCount: '100',
          onlineCount: '98',
          outlineCount: '2'
        },
        {
          placeName: '后环工地',
          equipCount: '100',
          onlineCount: '97',
          outlineCount: '3'
        }
      ]
      this.violationsList = [
        {
          address: '金发工地正门',
          time: '6分钟前'
        },
        {
          address: '金发工地侧门',
          time: '8分钟前'
        },
        {
          address: '金发工地后门',
          time: '10分钟前'
        },
        {
          address: '金发工地正门',
          time: '59分钟前'
        },
        {
          address: '金发工地后门',
          time: '49分钟前'
        },
        {
          address: '金发工地正门',
          time: '29分钟前'
        },
        {
          address: '金发工地正侧门',
          time: '29分钟前'
        },
        {
          address: '金发工地正门',
          time: '9分钟前'
        }
      ]
      this.eventList.row = [
        {
          eventTypeName: '周界越界监测',
          eventCount: '100',
          dealCount: '98',
          unDealCount: '2'
        },
        {
          eventTypeName: '未佩戴安全帽',
          eventCount: '100',
          dealCount: '97',
          unDealCount: '3'
        }

      ]
    }
    if (this.violationsList !== null) {
      if (this.violationsList.length > 1) {
        this.timer = setInterval(this.startPlay, 3000)
      }
    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    check() {
      console.log('tttttue')
    },
    uncheck() {
      console.log('ffffalse')
    },
    startPlay() {
      const that = this
      that.play = true

      setTimeout(() => {
        that.play = false

        that.violationsList.push(that.violationsList[0]) // 将第一条数据塞到最后一个
        that.violationsList.shift() // 删除第一条数据
        // that.violationsList.unshift(that.violationsList[that.violationsList.length - 1])
        // that.violationsList.splice(that.violationsList.length - 1, 1)
        console.log('删除之后', this.violationsList)
      }, 500)
    },
    onChangeDateType(value) {
      this.$emit('timeType', value)
    }
  }
}
</script>

<style scoped>
.plate{
  background-color: #0E1820;
  width: 92%;
  height: 100%;
  position: fixed;
  color: #ffffff;
  overflow: scroll;
  padding: 15px;
}
.warning-statistics{
  width:100%;
  height: auto;
}
.warning-statistics>p{
  color: #EFF0F1;
}
.adaptive{
  display: inline-block;
  position : relative;
}
.inside-content{
  position : absolute;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
}
.warning-data{
  width:345px ;
  height: 100px;

  font-size: 15px;
  font-family: UniDream;
  font-weight: normal;
  color: #46FFEB;
  line-height: 100px;
  text-align: center
}
.alert-list{
  width:345px ;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
}
.alert-list h2{
  display: inline-block;
  height: 11px;
  width: 70px;
  font-size: 17px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  text-align: left;
  line-height: 5px;
  padding-left: 12px;
  margin-left: 13px;
  color: #EFF0F1;
  margin-top: 7%;
  margin-bottom: 0px;
  background: linear-gradient(125deg, rgba(16, 233, 255, 0) 8px,#00B5ED 9%,transparent 81%) left;
  background-size: 100% 100%;
}
.alert-list p{
  float: right;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight:lighter;
  color: #B9CEE9;
}
.alert-list span{
  color: #FF1743;
}
.violations{
  background-image: url(@/assets/images/alert-bcimg.png);
  background-size:100% 100%;
  width: 313px;
  height: 65px;
  margin: 0 auto;
  line-height: 65px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 9px;
}
.illegal-parking{
  display: inline;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FF1743;
}
.illegal-parking img{
  transform: translateY(5px);
}
.alert-icon{
  width: 22px;
  height: 19px;
}
.park-address{
  width: 110px;
  /* height: 100%; */
  line-height: 15px;
  margin : 0px 20px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #B9CEE9;
  white-space: normal;
  word-break: break-all;
  display: inline-block;
}
.violations-time{
  color: #B9CEE9;
  font-weight: 400;
  display: inline-block;
  font-size: 12px;
}
.equipList-detail{
  width: 330px;
  margin: 20px auto;
  display: flex;
  /* background-color: #00B5ED; */
  justify-content: space-around;
}
.equipList-detail-item{
  width: 21%;
  height: 50px;
  display: inline-block;
  padding: 5px 14px;
  text-align: center;
}
.equipList-detail-item-title{
  height: 9px;
  width: 65px;
  font-size: 16px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  text-align: left;
  line-height: 2px;
  padding-left: 12px;
  color: #EFF0F1;
  margin-top: 28%;
  margin-bottom: 0px;
  background: linear-gradient(125deg,rgba(16, 233, 255, 0) 8px,#00B5ED 9%,transparent 56%) left;
  background-size: 100% 100%;
  /* margin-left: 15px */
}
.equipList-detail-item-value{
  height: 18px;
  font-size: 19px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #46FFEB;
  text-align: center;
  margin-top: 12%;
}

.color-light-red{
  background-color: #0E1820;
  width: 92%;
  height: 100%;
  position: fixed;
  color: #ffffff;
  padding: 15px;
  overflow: scroll;
}
.event-statistics{
  width: 100%;
  height: auto;
}
.simpleForm{
  margin-top: 20px;
  margin-bottom: 20px;
}
.title-style{
  width: 1.2%;
  height: 100%;
  background: -webkit-gradient(linear, 100% 100%, 0% 100%,from(#008EFF), to(#1DF2FF));
  /* display: inline-block; */
  float: left;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
}
.title-name{
  width: 60%;
  height: 30px;
  display: inline-block;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #B9CEE9;
  margin-left: 15px;
}
.title-name span{
  margin-left: 10px;
  font-size: 15px;
  font-weight: 400;
}
.title-box{
  height: 25px;
  width: 100%;
}
.warning-line {
  margin: 20px 0;
}
.equipment-statistics{
  height: auto;
  width: 100%;
  margin-bottom: 90px;
}
.toUp {
  margin-top: -70px; /*key code*/
  transition: all 1s; /*key code*/
}
.vio-list{
  list-style: none;
  width: 100%;
  text-align: center;
  overflow: hidden; /*key code*/
  height: 280px; /*key code*/
  padding: 0;
  overflow: hidden;
  margin-bottom: 20px;
  display: inline-block;
}
.vio-list li{
  text-align: center;
  background-image: url(@/assets/images/alert-bcimg.png);
  margin-bottom: 10px;
  height: 60px;
  line-height: 60px;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0px 13px;
}

</style>
<style >
.plate .right-select{
  color: #8BA3C2;
  font-size: 15px;
  width: 75px;
  float: right;
  padding-top: 5px;
}
.plate .right-select{
  color: #8BA3C2;
  font-size: 15px;
  /* padding-right: 18px */
}
/* option样式 */
.plate .van-cell{
  background-color: transparent;
  width: 100%;
  font-size: 20px;
  color: #B9CEE9;
  text-align: left;
  padding: 0 14px 0 5;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 关掉option下边框 */
.plate .van-cell::after{
  display: none
}

/* 小三角样式1 */
.plate .actions-title .van-icon-arrow::before,
.plate .right-select .van-popover__wrapper::before{
  content: '';
  position: absolute;
  top: 50%;
  border: 3px solid;
  border-color: transparent transparent #dcdee0 #dcdee0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: .8;
  content: '';
}
.plate .actions-title .van-icon-arrow::before{
  right: -12px;
  margin-top: -5px;
}
.plate .right-select .van-popover__wrapper::before{
  right: 0px;
  margin-top: -14px;
}
.plate .actions-content.van-action-sheet{
  background-color: #10161F;
  color: #FFFEFE;
  font-size: 16px
}
.plate .actions-content .van-action-sheet__cancel, .plate .actions-content .van-action-sheet__item{
  background-color: #10161F;
  color: #B9CEE9;
  font-size: 16px;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px #283444 solid;
}
.plate .actions-content .van-action-sheet__header{
  border-bottom: 1px #283444 solid;
}
.plate .actions-content .van-action-sheet__close{
  color: #FFFEFE
}
.plate .van-overlay{
  background-color: rgba(10, 4, 1, 0.55)
}

/* 修改下拉框样式 */
.plate .van-dropdown-menu__bar{
  background-color: #101720 !important;
  height: auto;
}
/* 标题和选中项文字样式 */
.plate .van-dropdown-menu__title{
  color: rgba(185, 206, 233, 1);
  font-size: 20px
}
.plate .right-select .van-dropdown-menu__title{
  color: #8BA3C2;
  font-size: 15px
}
/* 标题左对齐 */
.plate .van-dropdown-menu__item{
  justify-content: left
}
.plate .right-select .van-cell{
  background-color: #101720;
  width: 100%;
  font-size: 14px;
  color: rgba(128, 146, 161, 1);
  text-align: center;
  padding: 6px 10px;
}
/* 关掉icon */
.plate .van-cell__value{
  display: none
}
/* 关掉option下边框 */
.plate .van-cell::after{
  display: none
}
/* 下拉框 */
.plate .van-popup--top{
  width: 60%;
  border: 1px rgba(42, 82, 134, 1) solid;
  left: 52px;
  top: 6px;
  background-color: transparent
}
/* 整个下拉框的宽高 */
.plate .van-dropdown-item{
  width: 188px;
  height: 137px;
}
.plate .right-select .van-dropdown-item{
  left: unset;
  width: 135px;
  right: 15px;
}
</style>
