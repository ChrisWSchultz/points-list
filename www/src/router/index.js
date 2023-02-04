import { createRouter, createWebHistory } from 'vue-router'
import Points from '../views/Points.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'points home',
      component: Points
    }
  ]
})

export default router
