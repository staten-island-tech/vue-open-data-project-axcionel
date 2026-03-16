import Draft from '@/views/Draft.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Draft,
    },
    {
      path: '/user-create',
      name: 'user-create',
      component: UserCreate,
    },
    {
      path: '/vue-lists',
      name: 'vue-lists',
      component: VueLists,
    },
    {
      ///pkmn/3
      path: '/pkmn/:id',
      name: 'pkmn',
      component: PokemonData,
    },
  ],
})


export default router
