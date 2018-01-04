import Vue from 'vue'
import Router from 'vue-router'
import BusTest from '@/components/busTest/busTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'busTest',
      component: BusTest
    }
  ]
})
