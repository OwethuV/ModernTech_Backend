import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import EmploymentView from '@/views/EmploymentView.vue'
import DashboardViews from '@/views/DashboardViews.vue'
import EmployeeViews from '@/views/EmployeeViews.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import PayrollView from '@/views/PayrollView.vue'
import PerformanceReview from '@/views/PerformanceReview.vue'

// import ManagementView from '@/views/ManagementView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/employment',
    name: 'employment',
    component: EmploymentView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardViews
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: AttendanceView
  },
  {
    path: '/employee',
    name: 'employee',
    component: EmployeeViews
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: PayrollView
  },
  {
    path: '/performancereview',
    name: 'performancereview',
    component:PerformanceReview
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router