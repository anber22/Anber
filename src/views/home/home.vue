<template>
  <div class="home-container">
    <div class="home-box">
      <!-- banner start-->
      <Adaptive :data="['100%', '43.5%']">
        <van-swipe class="banner-box" :autoplay="10000" :show-indicators="false" indicator-color="white">
          <van-swipe-item>
            <van-image
              fit="contain"
              src="/src/assets/images/home/banner-1.jpg"
            />
          </van-swipe-item>
          <van-swipe-item>
            <van-image
              fit="contain"
              src="/src/assets/images/home/banner-2.jpg"
            />
          </van-swipe-item>
          <van-swipe-item>
            <van-image
              fit="contain"
              src="/src/assets/images/home/banner-3.jpg"
            />
          </van-swipe-item>
          <van-swipe-item>
            <van-image
              fit="contain"
              src="/src/assets/images/home/banner-4.jpg"
            />
          </van-swipe-item>
        </van-swipe>
      </Adaptive>
      <!-- end -->
      <!-- 实时事件 start-->
      <div class="functional-module">
        <div>
          <Adaptive class="module-item" :data="['75.4%', '75.4%']">
            <van-image
              fit="contain"
              src="/src/assets/images/home/iot.png"
            />
          </Adaptive>
          <p>联网应用</p>
        </div>
        <div hidden>
          <Adaptive class="module-item" :data="['75.4%', '75.4%']">
            <van-image
              fit="contain"
              src="/src/assets/images/home/hazard.png"
            />
          </Adaptive>
          <p>隐患统计</p>
        </div>
        <div @click="goJump('/video')">
          <Adaptive class="module-item" :data="['75.4%', '75.4%']">
            <van-image
              fit="contain"
              src="/src/assets/images/home/video.png"
            />
          </Adaptive>
          <p>智慧视觉</p>
        </div>
        <div>
          <Adaptive class="module-item" :data="['75.4%', '75.4%']">
            <van-image
              fit="contain"
              src="/src/assets/images/home/place.png"
            />
          </Adaptive>
          <p>网点管理</p>
        </div>
        <div>
          <Adaptive class="module-item" :data="['75.4%', '75.4%']">
            <van-image
              fit="contain"
              src="/src/assets/images/home/manage.png"
            />
          </Adaptive>
          <p>隐患管理</p>
        </div>
        <div hidden>
          <Adaptive class="module-item" :data="['75.4%', '75.4%']">
            <van-image
              fit="contain"
              src="/src/assets/images/home/scan.png"
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
            src="/src/assets/images/home/title-icon.png"
          />
          实时事件
        </div>
        <RealtimeEventCard />
        <RealtimeEventCard />
      </div>
    </div>
  </div>
</template>

<script>
import RealtimeEventCard from 'cmp/realtimeEventCard/RealtimeEventCard'
export default {
  components: {
    RealtimeEventCard
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    goJump(path) {
      this.$router.push(path)
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
