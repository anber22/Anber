
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
      <SimpleForm />
    </div>
    <!-- end -->
    <!-- 预警趋势 start -->
    <div class="warning-trend">
      <div class="title-box">
        <div class="title-style" />
        <div class="title-name">
          预警趋势
        </div>
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
    </div>
    <!-- end -->
  </div>
</template>

<script>
import SimpleForm from 'cmp/simpleForm/SimpleForm'
export default {
  components: {
    SimpleForm
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
      timeType: 1
    }
  },
  created() {

  },
  methods: {
    onChangeDateType(value) {
      this.$emit('timeType', value)
    }
  }
}
</script>

<style scoped>
.plate{
  background-color: #0E1820;
  width: 100%;
  height: 100%;
  position: fixed;
  color: #ffffff;
  padding: 15px;
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
.title-box{
  height: 30px;
  width: 100%;
}
</style>
<style >
.plate .right-select{
  color: #8BA3C2;
  font-size: 15px;
      width: 90px;
    float: right;
  /* padding-right: 18px */
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
/* option样式 */
/* .plate .van-cell{
  background-color: #101720;
  width: 100%;
  font-size: 18px;
  color: rgba(128, 146, 161, 1);
  text-align: center;
  padding: 6px 10px;
} */
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
  right: 10px;
}
</style>
