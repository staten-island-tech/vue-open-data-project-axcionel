import { createRouter, createWebHistory } from 'vue-router'
import Draft from '@/views/Draft.vue'
import LeadingCausesView from '@/views/LeadingCausesView.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Draft,
    },
    // 2. Add the new route object
    {
      path: '/leading-causes',
      name: 'leadingCauses',
      component: LeadingCausesView,
    },
  ],
})

export default router