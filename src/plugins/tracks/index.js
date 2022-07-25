import Vue from 'vue'
import VTrack from 'v-track'
import trackEvents from "./events"


Vue.use(VTrack, {
  trackEvents,
  trackEnable: {
    UVPV: "routeUpdate", // 追踪路由更新
    TONP: true // 追踪离开页面
  }
})