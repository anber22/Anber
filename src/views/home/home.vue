<template>
  <div class="home-container">
    <div class="home-bg">
      <div class="home-box">
        <!-- banner start-->
        <Adaptive :size="['100%', '43.5%']">
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
          <div v-for="(item,index) in menuList" :key="index" @click="goJump(item.path)">
            <Adaptive class="module-item" :size="['75.4%', '75.4%']">
              <van-image
                fit="contain"
                :src="icon[item.name]"
                :show-error="false"
                :show-loading="false"
              />
            </Adaptive>
            <p>{{ item.title }}</p>
          </div>
        </div>
        <!-- end -->
        <div v-permission:[type]="`Home-Hzard`" class="realtime-events">
          <div class="title" @click="goJump('/unreadEvents')">
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
          <RealtimeEventCard :hazard-data="hazardList" />
        </div>
      </div>
    </div>
  </div>
</template>subsystemList

<script>
import Api from '@/api/index'
import RealtimeEventCard from 'cmp/realtimeEventCard/RealtimeEventCard'
import Socket from '@/utils/socket'
import Config from '/config.json'

export default {
  components: {
    RealtimeEventCard
  },
  data() {
    return {
      type: 'parent',
      hazardList: [],
      subsystemList: [
      ],
      icon: {
        IotApp: require('@/assets/images/home/iot.png'),
        PlaceResource: require('@/assets/images/home/place.png'),
        Statistics: require('@/assets/images/home/hazard.png'),
        WisdomVisual: require('@/assets/images/home/video.png'),
        PropertyPlate: require('@/assets/images/home/property-plate.png'),
        SafetyCommitteePlate: require('@/assets/images/home/safety-committee-plate.png')
      },

      menuList: []
    }
  },
  created() {
    this.subsystemList = Config.subsystemList
    this.getHiddenDangerList()

    this.getMenuList()
    this.initSockets()
  },
  methods: {
    /**
     * 根据权限获取菜单列表
     */
    getMenuList() {
      let menus = this.$store.getters.menus
      menus = menus[menus.length - 1].children

      menus.forEach((item, index) => {
        if (item.meta.menu) {
          this.menuList.push({ name: item.name, path: item.path, title: item.meta.title })
        }
      })
    },
    onMessage(msg) {
      this.hazardList.splice(2, 1)
      this.hazardList.splice(0, 0, msg)
      this.$forceUpdate()
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
      setTimeout(() => {
        Socket.initSocket(topicList)
      }, 1000)
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
      const res = await Api.hiddenDangerList(3)
      let temp = []
      if (res.code === 200) {
        temp = [...res.data]
      }
      temp.forEach(hItem => {
        this.subsystemList.forEach(cItem => {
          if (hItem.type === cItem.id) {
            // Object.assign(hItem, cItem) assign后者会覆盖前者的同名属性的值
            hItem['imgUrl'] = cItem.imgUrl

            hItem['systemName'] = cItem.name
          }
        })
      })
      this.hazardList = temp
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
