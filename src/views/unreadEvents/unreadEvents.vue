<template>
  <div class="unread-events">
    <div class="screen">
      <!-- 系统类型 -->
      <div class="screen-type">
        <van-popover
          v-model="showType"
          trigger="click"
          theme="dark"
          :actions="typeActions"
          @select="onSelect"
        >
          <template #reference>
            <van-button class="type-name" :class="{'active':showType}" style="color:#fff;">{{type.text}}</van-button>
          </template>
        </van-popover>
      </div>
      <!-- end -->
      <!-- 日期 -->
      <div class="screen-date">
        <div class="date-title" :class="{'active':showDate}" @click="showDate = true;state=true" >日期</div>
        <van-calendar 
          v-model="showDate"
          color="#5176AE" 
          row-height="60"
          :min-date="minDate"
          :max-date="maxDate"
          :show-confirm="false"
          :show-mark="false"
          :show-title="false"
          :default-date="defaultMark"
          :allow-same-day="true"
          type="range" 
          @confirm="confirmDate"
          @close="closeDate"
        />
      </div>
      <!-- end -->
      <!-- 更多 -->
      <div class="screen-more">
        <van-popover
          id="test"
          v-model="showMore"
          trigger="click"
          :offset="[5,6]"
          :actions="moreActions"
          @select="moreSelect"
        >
          <template #reference>
            <van-button class="more-title" :class="{'active':showMore}" style="color:#fff;">{{more.text}}</van-button>
          </template>
        </van-popover>
      </div>
      <!-- end -->
    </div>
    <div class="content">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getHazardList"
    >
      <div v-for="(item, index) in hazardLists" :key="index" class="events-item">
        <Adaptive :data="['100%','20.27%']">
        <div class="events-item-content">
          <van-image
            width="20.27%"
            height="100%%"
            fit="cover"
            class="events-item-img"
            :src="item.pictureUrl?item.pictureUrl: require('@/assets/images/equip/warn.png')"
            :show-error="false"
            :show-loading="false"
          />
          <div class="right-text">
            <p class="title1"> {{item.equipAddress}} </p>
            <span class="title2">{{item.hazardTypeName}}</span>
            <p class="title3"> {{item.createdTime}} </p>
          </div>
          <div class="dot"> <span /> </div>
        </div>
      </Adaptive>
      </div>
    </van-list>
    </div>

  </div>
</template>

<script>
import Api from '@/api/hazard/hazard'
import DateFormat from '@/utils/dateTransformation.js'
import ReadTypeNameOnVuex from '@/utils/readTypeNameOnVuex'
export default {
  name: 'UnreadEvents',
  data() {
    return {
      showType: false,   // 系统类型弹窗
      typeActions: [
        { text: '智慧视觉', id: 5 }, 
        { text: '环境监测', id: 10 }, 
        { text: '塔机监测', id: 11 }
      ],                  // 系统类型
      type: { text: '系统类型', id: 0 }, 
      showDate: false,    // 选择日期弹窗
      showMore: false,    // 更多弹窗
      minDate: new Date(2021, 0, 1),  // 最小日期
      maxDate: new Date(),            // 最大日期
      defaultMark: new Date(),  // 默认选中日期   null不选中
      screenDate: [],  // 选中的日期
      state: false,  // 是否是确认方法关闭弹窗
      moreActions: [
        { text: '全部已读', value: 1 }
      ],
      more: { text: '更多', value: 0 },
      hazardLists: [],  // 未读事件列表
      loading: false,  // 加载状态
      finished: false,  // 加载完毕
      page: 0  // 页码
    }
  },
  created() {
    this.getHazardList()
  },
  methods: {
    /**
     * 获取未读事件列表
     */
    async getHazardList () {
      const params = {
        type: this.type.id,
        page: ++this.page,
        size: 10,
        condition: ''
      }
      let pDate = this.screenDate.length > 0 ? 'startDate=' + new DateFormat().dataFormatNo(this.screenDate[0]) + ' 00:00:00' + '&endDate=' + new DateFormat().dataFormatNo(this.screenDate[1]) + ' 23:59:59' : ''
      let pMore = this.more.value != 0 ? 'isRead=' + this.more.value: ''
      if (this.screenDate.length > 0) {
        if (this.more.value != 0) {
          params.condition = '?' + pDate + '&' + pMore
        } else {
          params.condition = '?' + pDate
        }
      } else {
        if (this.more.value != 0) {
          params.condition = '?'+ pMore
        }
      }
      const res = await Api.hazardList(params)
      if (res.code === 200) {
        let rows = [...res.data.rows]
        console.log('接口返回', rows)
        // 数据全部加载完成
        if (res.data.page * 1 > res.data.total * 1) {
          this.finished = true
          this.loading = false
          return
        }
        rows.forEach(item => {
          item.createdTime = new DateFormat().dataFormat(item.createdTime)
        });
        rows = await ReadTypeNameOnVuex.conversion('hazardType', 'hazardType', 'hazardTypeName', rows)
        rows = await ReadTypeNameOnVuex.conversion('equipType', 'equipType', 'equipTypeName', rows)
        this.hazardLists = this.hazardLists.concat(rows)
        // 加载状态结束
        this.loading = false;
        
      }

    },
    /**
     * 系统类型选择
     */
    onSelect(actions) {
      this.type = actions
      this.hazardLists = []
      this.page = 0
      this.getHazardList()

    },
    /**
     * 确认日期选择
     */
    confirmDate (date) {
      this.showDate = false
      this.screenDate = date
      this.state = false
      this.hazardLists = []
      this.page = 0
      this.getHazardList()
    },
    /**
     * 关闭日期弹窗
     */
    closeDate() {
      if (this.state === true) {
        this.defaultMark = null
        this.screenDate = []
        this.hazardLists = []
        this.page = 0
        this.getHazardList()
      }
    },
    /**
     * 更多选择
     */
    moreSelect(actions) {
      this.more = actions
      console.log(this.more)
      this.hazardLists = []
      this.page = 0
      this.getHazardList()
    }

  }
}
</script>

<style>
.unread-events {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #131B25;
}
.unread-events .screen {
  width: 100%;
  height: 54px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  background: #101720;

}
.screen-type {
  width: 34%;
  position: relative;
  text-align: center;
}
.type-name, .more-title {
  border: none;
  background: transparent;
}
.type-name .van-button--normal {
  font-size: 15px;
}
.type-name .van-button__text::after, .date-title::after, .more-title .van-button__text::after {
  position: absolute;
  top: 50%;
  right: -4px;
  margin-top: -5px;
  border: 3px solid;
  border-color: transparent transparent #8BA3C2 #8BA3C2;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: 0.8;
  content: '';
}
.date-title::after {
  right: -13px;
}
.type-name.active .van-button__text::after, .date-title.active::after, .more-title.active .van-button__text::after   {
  margin-top: -1px;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}
.screen-date, .screen-more {
  width: 33%;
  text-align: center;
}
.screen-date .date-title {
  color: #8BA3C2;
  position: relative;
  display: inline-block;
  font-size: 15px;
}
.screen-type .van-button__text, .screen-more .van-button__text {
  color: #8BA3C2;
}
.screen-date .van-calendar, .screen-date .van-popup {
  background-color: #10161F;
}
.screen-date .van-calendar__day, .screen-date .van-calendar__header-subtitle, .screen-date .van-calendar__header-title, .screen-date .van-calendar__month-title, .screen-date .van-calendar__weekday {
  color: #B9CEE9;
}
.screen-date .van-calendar__popup.van-popup--bottom {
  height: 65%;
}
.screen-date .van-calendar__day--disabled {
  color: #666;
}
.unread-events .content {
  height: calc(100% - 100px);
  overflow: auto;
  position: fixed;
  width: 100%;
  background-color: #101720;

}
.events-item {
  color: #B9CEE9;
  padding-bottom: 20px;
  padding-top: 18px;
  border-bottom: 1px #283444 solid;
  margin: 0 15px;
}
.events-item:last-child {
  border-bottom: none;
}
.events-item-content::after{
  display: block;
  clear: both;
  content: '';
  overflow: hidden;
}
.right-text{
  color: #B9CEE9;
  font-size: 15px;
  width: 66%;
  float: left;
  margin-left: 4%;
}
.events-item-img{
  float: left;
}
.right-text p{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.right-text .title1{
  font-size: 15px;
  color: #B9CEE9;
  padding-bottom: 4%
}
.right-text .title2{
  font-size: 12px;
  color: #FF1743;
  border-radius: 2px;
  border: 1px #ff1743 solid;
  padding: 2px 6px;
}
.right-text .title3{
  color: #6F85A2;
  font-size: 12px;
  padding-top: 4%
}
.dot{
  float: right;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 2%;
}
.dot span{
  padding: 3px;
  background: red;
  border-radius: 50%;
  box-shadow: 0px 0px 8px 2px #ff1743;
}
</style>
<style>
.van-popover__action {
  padding: 0;
  width: 100px;

}
.van-popover--dark .van-popover__content, .van-popover--light .van-popover__content {
  background-color: #101720;
  border: 1px solid #4D628F;
}
.van-popover--light, .van-popover--dark {
  color: #8BA3C2;
}
.van-popover__arrow {
  display: none;
}
.van-popover, .van-popover--light .van-popover__action:active{
  background-color: #101720;
}
.van-popover--light {
  left: inherit !important;
  right: 10px !important;

}
</style>
