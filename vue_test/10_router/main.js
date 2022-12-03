import Vue from 'vue'
import App from './App.vue'
import dayjs from "dayjs"
import VueRouter from "vue-router"
import router from "./router"
Vue.config.productionTip = false


Vue.prototype.$dayjs = dayjs;
Vue.use(VueRouter)

new Vue({
  render: h => h(App),//组件放入容器
  router,
  beforeMount() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
