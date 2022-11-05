import Vue from 'vue'
import App from './App.vue'
import dayjs from "dayjs"

Vue.config.productionTip = false


Vue.prototype.$dayjs = dayjs;


new Vue({
  render: h => h(App),//组件放入容器
}).$mount('#app')
