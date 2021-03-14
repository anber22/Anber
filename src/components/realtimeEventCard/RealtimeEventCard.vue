<template>
  <div class="realtimeEventCard-box">
    <div class="events-item">
      <Adaptive :data="['100%','20.27%']">
        <div class="events-item-content">
          <van-image
            width="20.27%"
            height="100%%"
            fit="cover"
            class="events-item-img"
            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1423490917,2942550944&fm=26&gp=0.jpg"
            :show-error="false"
            :show-loading="false"
          />
          <div class="right-text">
            <p class="title1">
              惠景合园东北门保安亭
            </p>
            <span class="title2">消防通道占用</span>
            <p class="title3">
              2020-12-13 10:20:21
            </p>
          </div>
          <div class="dot">
            <span />
          </div>
        </div>
      </Adaptive>
    </div>
    <div class="events-item">
      <Adaptive :data="['100%','20.27%']">
        <div class="events-item-content">
          <van-image
            width="20.27%"
            height="100%%"
            fit="cover"
            class="events-item-img"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2559982960,2879475880&fm=26&gp=0.jpg"
            :show-error="false"
            :show-loading="false"
          />
          <div class="right-text">
            <p class="title1">
              惠景合园正门大门口
            </p>
            <span class="title2">周界越界监测</span>
            <p class="title3">
              2020-12-12 13:21:34
            </p>
          </div>
          <div class="dot">
            <span />
          </div>
        </div>
      </Adaptive>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style scoped src='./RealtimeEventCard.css'></style>
