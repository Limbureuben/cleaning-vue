import { createRouter, createWebHistory } from 'vue-router'
import HomepageVue from '@/views/Homepage.vue'
import Register from '@/sharing/Register.vue'
import Login from '@/sharing/Login.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import UserDashboard from '@/views/user/UserDashboard.vue'
import OrganizationDashboard from '@/views/organization/organizationDashboard.vue'
import RegisterOrganization from '@/views/admin/RegisterOrganization.vue'


const routes = [
  { path: '/', name: 'Homepage', component: HomepageVue },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin-dashboard', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/user-dashboard', name: 'UserDashboard', component: UserDashboard},
  { path: '/organization', name: 'Organization', component: OrganizationDashboard },
  { path: '/register-organization', name: 'Register organization', component: RegisterOrganization },
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
