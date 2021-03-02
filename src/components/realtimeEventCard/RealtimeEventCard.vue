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
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            :show-error="false"
            :show-loading="false"
          />
          <div class="right-text">
            <p class="title1">
              惠景合园东北门保安亭
            </p>
            <span class="title2">未佩戴安全帽</span>
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

<style scoped>
.events-list>.events-item:last-child{
  border-bottom: none
}
.events-item{
  color: #B9CEE9;
  padding-bottom: 20px;
  padding-top: 18px;
  border-bottom: 1px #283444 solid
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
    /* float: right; */
    padding: 3px;
    background: red;
    border-radius: 50%;
    box-shadow: 0px 0px 8px 2px #ff1743;
}
</style>
