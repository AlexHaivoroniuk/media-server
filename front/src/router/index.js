import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/Movies'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies
    }
  ]
})
