import { createRouter, createWebHistory } from 'vue-router'
import HomepageVue from '@/views/Homepage.vue'
import Register from '@/sharing/Register.vue'
import Login from '@/sharing/Login.vue'
import AdminHeader from '@/views/admin/AdminHeader.vue'


const routes = [
  { path: '/', name: 'Homepage', component: HomepageVue },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin', name: 'Admin', component: AdminHeader }
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
