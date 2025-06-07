import { createRouter, createWebHistory } from 'vue-router'
import HomepageVue from '@/views/Homepage.vue'
import Register from '@/sharing/Register.vue'
import Login from '@/sharing/Login.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import UserDashboard from '@/views/user/UserDashboard.vue'
import OrganizationDashboard from '@/views/organization/organizationDashboard.vue'
import RegisterOrganization from '@/views/organization/RegisterOrganization.vue'
import StaffRegistration from '@/views/admin/StaffRegistration.vue'
import AvailableOrganization from '@/views/admin/AvailableOrganization.vue'
import OrganizationStatus from '@/views/organization/OrganizationStatus.vue'
import RegisterCleaner from '@/views/organization/RegisterCleaner.vue'
import AvailableBooking from '@/views/organization/AvailableBooking.vue'


const routes = [
  { path: '/', name: 'Homepage', component: HomepageVue },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin-dashboard', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/user-dashboard', name: 'UserDashboard', component: UserDashboard},
  { path: '/organization', name: 'Organization', component: OrganizationDashboard },
  { path: '/register-organization', name: 'Register organization', component: RegisterOrganization },
  { path: '/register-staff', name: 'Register staff', component: StaffRegistration },
  { path: '/available-organization', name: 'Available organization', component: AvailableOrganization },
  { path: '/organization-status', name: 'Organization status', component: OrganizationStatus },
  { path: '/registercleaner', name: 'Cleaners', component: RegisterCleaner },
  { path: '/availablebooking', name: 'Booking', component: AvailableBooking }
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
