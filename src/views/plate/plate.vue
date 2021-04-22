
<template>
  <!-- 物业看板 & 安委看板 -->
  <div class="plate">
    <!-- 预警统计 start -->
    <div class="warning-statistics">
      <div class="title-box">
        <div class="title-style" />
        <div class="title-name">
          预警统计
        </div>
      </div>
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
import Date from '@/utils/dateTransformation'
export default {
  components: {
    SimpleForm,
    MaxLine
  },
  data() {
    return {
      dateType: [
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
      equipList: {
        column: [
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
        row: [
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
      eventList: {
        column: [
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
        row: [
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
      lineData: {
        title: '预警数',
        name: '预警数',
        xAxis: {
          data: ['04.01', '04.02', '04.03', '04.04', '04.05', '04.06', '04.07', '04.08', '04.09', '04.10', '04.11', '04.12', '04.13', '04.14', '04.15', '04.16', '04.17', '04.18', '04.19', '04.20', '04.21', '04.22']
        },
        yAxis: {
          splitLineColor: 'rgba(76,200,172, 0.3)'
        },
        series: {
          data: ['8', '8', '8', '8', '8', '8', '17', '17', '28', '19', '10', '10', '20', '12', '12', '12', '12', '12', '14', '15', '10', '20'],
          smooth: false
        }
      }
    }
  },
  created() {
    this.test()
  },
  methods: {
    test() {
      const date = new Date()
      // console.log('时间----', date.dataFormatNo())
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
  padding: 15px;
  overflow: scroll;
}
.event-statistics{
  width: 100%;
  height: auto;
}
.simpleForm{
  margin-top: 20px;
  margin-bottom: 10px;
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
  font-size: 20px;
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
  margin: 30px 0;
}
.equipment-statistics{
  height: auto;
  width: 100%;
  margin-bottom: 90px;
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
