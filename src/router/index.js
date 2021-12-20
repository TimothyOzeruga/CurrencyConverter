import { createRouter, createWebHistory } from 'vue-router'
import Converter from '../views/Converter.vue'

const routes = [
  {
    path: '/',
    name: 'Converter',
    component: Converter
  },
  {
    path: '/currencies',
    name: 'Currencies',
    component: function () {
      return import('../views/Currencies.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
