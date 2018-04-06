import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import hrm_staff_roster_labor_rpt from '../pages/hrm_staff_roster_labor_rpt.vue'
import hrm_staff_roster_contract_rpt from './pages/hrm_staff_roster_contract_rpt.vue'
import hrm_staff_attendance_rpt from './pages/hrm_staff_attendance_rpt.vue'
import hrm_staff_att_deduct_rpt from './pages/hrm_staff_att_deduct_rpt.vue'
import hrm_staff_station_dist_rpt from './pages/hrm_staff_station_dist_rpt.vue'
import hrm_staff_dist_rpt from './pages/hrm_staff_dist_rpt.vue'
import hrm_contract_expire_rpt from './pages/hrm_contract_expire_rpt.vue'
import hrm_certificate_expire_rpt from './pages/hrm_certificate_expire_rpt.vue'
import hrm_dept_att_stats_rpt from './pages/hrm_dept_att_stats_rpt.vue'
import hrm_att_deduct from './pages/hrm_att_deduct.vue'
import hrm_attendance from './pages/hrm_attendance.vue'
import hrm_att_dept from './pages/hrm_att_dept.vue'
import hrm_transfer from './pages/hrm_transfer.vue'
import hrm_staff_contract from './pages/hrm_staff_contract.vue'
import hrm_staff from './pages/hrm_staff.vue'

export default [
  {path:"",redirect:"/hrm_staff_roster_labor_rpt"},
  {path:'/hrm_staff_roster_labor_rpt',component:hrm_staff_roster_labor_rpt},
  {path:'/hrm_staff_roster_contract_rpt',component:hrm_staff_roster_contract_rpt},
  {path:'/hrm_staff_attendance_rpt',component:hrm_staff_attendance_rpt},
  {path:'/hrm_staff_att_deduct_rpt',component:hrm_staff_att_deduct_rpt},
  {path:'/hrm_staff_station_dist_rpt',component:hrm_staff_station_dist_rpt},
  {path:'/hrm_staff_dist_rpt',component:hrm_staff_dist_rpt},
  {path:'/hrm_contract_expire_rpt',component:hrm_contract_expire_rpt},
  {path:'/hrm_certificate_expire_rpt',component:hrm_certificate_expire_rpt},
  {path:'/hrm_dept_att_stats_rpt',component:hrm_dept_att_stats_rpt},
  {path:'/hrm_att_deduct',component:hrm_att_deduct},
  {path:'/hrm_attendance',component:hrm_attendance},
  {path:'/hrm_att_dept',component:hrm_att_dept},
  {path:'/hrm_transfer',component:hrm_transfer},
  {path:'/hrm_staff_contract',component:hrm_staff_contract},
  {path:'/hrm_staff',component:hrm_staff},
]
