import Vue from 'vue'
import Router from 'vue-router'
import Ebook from '@/Ebook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Ebook'
    },
    {
      path: '/Ebook',
      component: Ebook
    }
  ]
})
