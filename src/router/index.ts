import { createRouter, createWebHistory } from 'vue-router'
import HomepageVue from '@/views/Homepage.vue'
import Register from '@/sharing/Register.vue'
import Login from '@/sharing/Login.vue'
import UserDashboard from '@/views/user/UserDashboard.vue'
import OrganizationDashboard from '@/views/organization/organizationDashboard.vue'
import RegisterOrganization from '@/views/organization/RegisterOrganization.vue'
import StaffRegistration from '@/views/admin/StaffRegistration.vue'
import CleanerDashboard from '@/views/cleaner/cleaner-dashboard.vue'
import AvailableHouse from '@/views/cleaner/AvailableHouse.vue'
import MyRequest from '@/views/cleaner/my-request.vue'
import CleanerRequest from '@/views/organization/CleanerRequest.vue'
import AcceptedRequest from '@/views/cleaner/AcceptedRequest.vue'
import ClientStaffRequest from '@/views/organization/ClientStaffRequest.vue'
import ReportCliner from '@/views/organization/ReportCleaner.vue'
import RatingCliner from '@/views/user/RatingCliner.vue'


const routes = [
  { path: '/', name: 'Homepage', component: HomepageVue },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/user-dashboard', name: 'UserDashboard', component: UserDashboard},
  { path: '/organization', name: 'Organization', component: OrganizationDashboard },
  { path: '/register-organization', name: 'Register organization', component: RegisterOrganization },
  { path: '/register-staff', name: 'Register staff', component: StaffRegistration },
  { path: '/cleaner-dashboard', name: 'CleanerDashboard', component: CleanerDashboard },
  { path: '/available-house', name: 'AvailableHouse', component: AvailableHouse },
  { path: '/cleaner-request', name: 'CleanerRequest', component: MyRequest},
  { path: '/from-cleaner', name: 'FromCleaner', component: CleanerRequest },
  { path: '/approved-reqest', name: 'Approved', component: AcceptedRequest },
  { path: '/request', name: 'Request', component: ClientStaffRequest},
  { path: '/cleaner-report', name: 'Reports', component: ReportCliner },
  { path: '/rating', name: 'Rating', component: RatingCliner }
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
