import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import form from '../views/form.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/memos/add',
      component: form
    },
    {
      path: '/memos/:id',
      component: form
    }
  ],
})

export default router
