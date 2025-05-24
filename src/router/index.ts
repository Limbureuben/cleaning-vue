import { createRouter, createWebHistory } from 'vue-router'
import HomepageVue from '@/views/Homepage.vue'
import Register from '@/sharing/Register.vue'
import Login from '@/sharing/Login.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import UserHeader from '@/views/user/UserHeader.vue'


const routes = [
  { path: '/', name: 'Homepage', component: HomepageVue },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin-dashboard', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/user', name: 'UserDashboard', component: UserHeader}
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
