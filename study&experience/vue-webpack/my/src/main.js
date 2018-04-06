// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../theme/index.css'
import axios from 'axios'
// axios.defaults.baseURL = 'http://10.211.55.6:80/hpph/'
// axios.defaults.baseURL = 'localhost/'
// Vue.use(axios);
Vue.prototype.axios = axios;
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
