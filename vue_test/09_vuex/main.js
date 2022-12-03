import Vue from 'vue'
import App from './App.vue'
import dayjs from "dayjs"

import store from './store'
Vue.config.productionTip = false


Vue.prototype.$dayjs = dayjs;


new Vue({
  render: h => h(App),//组件放入容器
  store,
  beforeMount() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
