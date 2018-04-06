// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routeConfig from './router/router-config.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../static/css/normalize.css'
import '../static/css/base.css'
import '../static/css/index.css'
// import axios from 'axios'
// Vue.prototype.$http = axios

Vue.use(ElementUI)

import format from 'date-fns'

import common from "./pages/common/common.js"
Vue.prototype.common = common

Vue.filter("dateFilter",function(v){
        var d = new Date(input);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
})


// var myFilter = Vue.filter('dateFilter')

//加载路由中间件
Vue.use(VueRouter)
Vue.use(VueResource)

//定义路由
const router = new VueRouter({
  routes: routeConfig
})

new Vue({
  router,
  el: "#app",
  render: h => h(App)
})
