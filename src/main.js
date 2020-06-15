import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/index'
import './utils/index'


/* 统一网站风格 */
import 'normalize.css'
/* 引入iconfont */
import './assets/fonts/iconfont.css'
/* 按需导入element-ui */
import './plugins/element.js'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
