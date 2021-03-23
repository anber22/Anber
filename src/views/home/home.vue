<template>
  <div class="home-container">
    <div class="home-bg">
      <div class="home-box">
        <!-- banner start-->
        <Adaptive :data="['100%', '43.5%']">
          <van-swipe class="banner-box" :autoplay="10000" :show-indicators="false" indicator-color="white">
            <!-- <van-swipe-item>
              <van-image
                fit="contain"
                src="@/assets/images/home/banner-1.jpg"
                :show-error="false"
                :show-loading="false"
              />
            </van-swipe-item> -->
            <van-swipe-item>
              <van-image
                fit="contain"
                :src="require('/src/assets/images/home/banner-2.jpg')"
                :show-error="false"
                :show-loading="false"
              />
            </van-swipe-item>
            <van-swipe-item>
              <van-image
                fit="contain"
                :src="require('/src/assets/images/home/banner-3.jpg')"
                :show-error="false"
                :show-loading="false"
              />
            </van-swipe-item>
            <van-swipe-item>
              <van-image
                fit="contain"
                :src="require('/src/assets/images/home/banner-4.jpg')"
                :show-error="false"
                :show-loading="false"
              />
            </van-swipe-item>
          </van-swipe>
        </Adaptive>
        <!-- end -->
        <!-- 实时事件 start-->
        <div class="functional-module">
          <div @click="goJump('/iotApp')">
            <Adaptive class="module-item" :data="['75.4%', '75.4%']">
              <van-image
                fit="contain"
                :src="require('/src/assets/images/home/iot.png')"
                :show-error="false"
                :show-loading="false"
              />
            </Adaptive>
            <p>物联应用</p>
          </div>
          <div hidden>
            <Adaptive class="module-item" :data="['75.4%', '75.4%']">
              <van-image
                fit="contain"
                :src="require('/src/assets/images/home/hazard.png')"
                :show-error="false"
                :show-loading="false"
              />
            </Adaptive>
            <p>隐患统计</p>
          </div>
          <div @click="goJump('/video')">
            <Adaptive class="module-item" :data="['75.4%', '75.4%']">
              <van-image
                fit="contain"
                :src="require('/src/assets/images/home/video.png')"
                :show-error="false"
                :show-loading="false"
              />
            </Adaptive>
            <p>智慧视觉</p>
          </div>
          <div @click="goJump('/placeResourse')">
            <Adaptive class="module-item" :data="['75.4%', '75.4%']">
              <van-image
                fit="contain"
                :src="require('/src/assets/images/home/place.png')"
                :show-error="false"
                :show-loading="false"
              />
            </Adaptive>
            <p>网点管理</p>
          </div>
          <div @click="goJump('/hazard')">
            <Adaptive class="module-item" :data="['75.4%', '75.4%']">
              <van-image
                fit="contain"
                :src="require('/src/assets/images/home/manage.png')"
                :show-error="false"
                :show-loading="false"
              />
            </Adaptive>
            <p>隐患管理</p>
          </div>
          <div hidden>
            <Adaptive class="module-item" :data="['75.4%', '75.4%']">
              <van-image
                fit="contain"
                :src="require('/src/assets/images/home/scan.png')"
                :show-error="false"
                :show-loading="false"
              />
            </Adaptive>
            <p>扫一扫</p>
          </div>
        </div>
        <!-- end -->
        <div class="realtime-events">
          <div class="title">
            <van-image
              width="4px"
              height="17px"
              fit="contain"
              :src="require('/src/assets/images/home/title-icon.png')"
              :show-error="false"
              :show-loading="false"
            />
            实时事件
          </div>
          <RealtimeEventCard v-if="!loading" :data="hazardLists" />
          <div>{{ loading }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/index'
import RealtimeEventCard from 'cmp/realtimeEventCard/RealtimeEventCard'
import Socket from '@/utils/socket'

export default {
  components: {
    RealtimeEventCard
  },
  data() {
    return {
      hazardLists: [],
      subsystemList: [
        {
          id: 5,
          name: '智慧视觉',
          imgUrl: require('/src/assets/images/index/wisdom-visual.png')
        }, {
          id: 10,
          name: '环境监测',
          imgUrl: require('/src/assets/images/index/environmental-monitoring.png')
        }, {
          id: 11,
          name: '塔机监测',
          imgUrl: require('/src/assets/images/index/crane-monitoring.png')
        }
      ],
      loading: true
    }
  },
  created() {
    this.getHiddenDangerList()
    setTimeout(() => {
      this.initSockets()
    }, 2000)
  },
  methods: {
    onMessage(msg) {
      const that = this
      that.loading = true

      console.log('首页收到消息', msg)
      // this.hiddenDangerList.splice(2, 1)
      console.log(that.hazardLists)
      // this.hiddenDangerList.splice(0, 0, msg)
      that.hazardLists.push(msg)
      console.log(that.hazardLists)

      that.loading = false
    },
    initSockets() {
      const topicList = [
        {
          topicName: 'realTimeWarning',
          refsList: [{
            domName: 'RealtimeEventCard',
            dom: this
          }]
        }
      ]
      console.log('订阅频道参数', topicList)
      Socket.initSocket(topicList)
    },
    /**
     * 跳转页面
     */
    goJump(path) {
      this.$router.push(path)
    },
    /**
     * 获取隐患列表 top10
     */
    async getHiddenDangerList() {
      this.loading = true
      const res = await Api.hiddenDangerList(3)
      let temp = []
      if (res.code === 200) {
        temp = [...res.data]
      }
      console.log('隐患列表', res)
      temp.forEach(hItem => {
        this.subsystemList.forEach(cItem => {
          if (hItem.type === cItem.id) {
            // Object.assign(hItem, cItem) assign后者会覆盖前者的同名属性的值
            hItem['imgUrl'] = cItem.imgUrl

            hItem['systemName'] = cItem.name
          }
        })
      })
      this.hazardLists = temp
      console.log('隐患列表', this.hazardLists)
      this.loading = false
    }
  }
}
</script>

<style scoped>
.home-container{
  background-color: #101720;
  width: 100%;
  height: 100%;
}
.home-bg{
  width: 100%;
  height: auto;
  background-color: #101720;
}
.home-box{
  width: 92%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
}
.banner-box{
  background-color: #101720
}
.functional-module{
  padding-top: 4%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 12%;
  border-bottom: 10px #131B25 solid;
}
.module-item{
  margin-bottom: 4%;
}
.functional-module>div{
  width: 25%;
  text-align: center
}
.functional-module>div>p{
  color: #B9CDE8;
  font-size: 14px;
  text-align: center
}
.title{
  font-size: 20px;
  color: #B9CEE9;
  margin-top: 20px;
}
.realtime-events{
  margin-bottom: 50px
}
</style>
