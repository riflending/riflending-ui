import Landing from '@/views/Landing.vue'
import store from '@/store'

const requireAuth = (to, from, next) => {
  if (!store.getters.SESSION_IS_LOGGED) {
    next({ name: 'Landing' })
  } else {
    next()
  }
}

export default [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/myActivity',
    name: 'MyActivity',
    component: () => import(/* webpackChunkName: "myActivity" */ '@/views/MyActivity.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/supplyBorrow',
    name: 'SupplyBorrow',
    component: () => import(/* webpackChunkName: "supplyBorrow" */ '@/views/SupplyBorrow.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import(/* webpackChunkName: "status" */ '@/views/Status.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/docs',
    name: 'Docs',
    component: () => import(/* webpackChunkName: "docs" */ '@/views/Docs.vue'),
  },
  {
    path: '*',
    redirect: { name: 'Landing' },
  },
]
