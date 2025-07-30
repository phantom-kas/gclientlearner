import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/base',
      name: 'base',
      component: () => import('../views/index.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/remountonrutechanges',
          name: 'remountonrutechanges',
          component: () => import('../views/refreshBase.vue'),
          children: [
            {
              path: '/top-tracks',
              name: 'top-tracks',
              component: () => import('../views/tracks/tracks.vue'),
            },
            {
              path: '/track/:id',
              name: 'track',
              component: () => import('../views/tracks/track.vue'),
              props: (route: { params: { id: string } }) => ({
                id: route.params.id
              })
            }
          ]
        },
        {
          path: '/checkout/:id',
          name: 'checkout',
          component: () => import('../views/checkout/checkout.vue'),
          props: (route: { params: { id: string } }) => ({
            id: route.params.id
          })
        },
      ]
    },

  ],
})

export default router
