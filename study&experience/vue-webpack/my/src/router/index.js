import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import test1 from '../components/test1'
import test2 from '../components/test2'
import test3 from '../components/test3'
// import PageOemMyFundAuth from '../views/OEM_AUTH/PageOemMyFundAuth'
// import PageOemMyFundAuth from '../views/OEM_AUTH/PageOemMyFundAuth'
// import PageOemMyFundAuth from '../views/OEM_AUTH/PageOemMyFundAuth'
// import PageOemMyFundAuth from '../views/OEM_AUTH/PageOemMyFundAuth'
// import PageOemMyFundAuth from '../views/OEM_AUTH/PageOemMyFundAuth'
// import PageOemMyFundAuth from '../views/OEM_AUTH/PageOemMyFundAuth'
// import PageOemMyFundAuth from '../views/OEM_AUTH/PageOemMyFundAuth'
// import PageOemMyFundAuth from '../views/OEM_AUTH/PageOemMyFundAuth'
// import PageOemMyFundAuth from '../views/OEM_AUTH/PageOemMyFundAuth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //表示默认路由
      name: 'test1',
      component: test1,
      children:[
        {
          path:"test2",
          name:"test2",
          component:test2,
        },
          {
            path:"test3",
            name:"test3",
            component:test3,
          },
      ]
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
