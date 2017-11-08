import Vue from 'vue'
import Router from 'vue-router'
import Slot from '@/components/slot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'slot',
      component: Slot
    }
  ]
})
