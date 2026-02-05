import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    
    {
      path: '/scripts/url-expander',
      name: 'url-expander',
      component: () => import('@/views/UrlExpanderView.vue')
    },
    
    {
      path: '/config',
      name: 'config',
      component: () => import('@/views/SettingsView.vue')
    }
  ]
})

export default router
