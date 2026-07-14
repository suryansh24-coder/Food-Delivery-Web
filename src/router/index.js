import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Feast Fast — Premium Food Delivery' },
  },
  {
    path: '/restaurants',
    name: 'Restaurants',
    component: () => import('@/views/RestaurantsView.vue'),
    meta: { title: 'Restaurants — Feast Fast' },
  },
  {
    path: '/restaurant/:id',
    name: 'Menu',
    component: () => import('@/views/MenuView.vue'),
    meta: { title: 'Menu — Feast Fast' },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartView.vue'),
    meta: { title: 'Cart — Feast Fast' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404 — Feast Fast' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// Update document title on navigation
router.beforeEach((to) => {
  document.title = to.meta.title || 'Feast Fast — Premium Food Delivery'
})

export default router
