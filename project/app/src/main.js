import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import TypeNav from "@/components/TypeNav"
import store from "@/store"
import Carousel from "@/components/Carousel"
import Pagination from "@/components/Pagination"
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false

import { reqCategoryList } from "@/api"
reqCategoryList()
import "@/mock/mockServe";
import "swiper/swiper-bundle.min.css"
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,

}).$mount('#app')
