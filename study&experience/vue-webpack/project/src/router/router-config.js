// import Vue from 'vue'
// import Router from 'vue-router'
//
// Vue.use(Router)
//
// import index1 from './pages/index1.vue'
// import index2 from './pages/index2.vue'
// import index3 from './pages/index3.vue'
// import index4 from './pages/index4.vue'
// import index5 from './pages/index5.vue'
// import index6 from './pages/index6.vue'
// import index7 from './pages/index7.vue'
// import index8 from './pages/index8.vue'
// import index9 from './pages/index9.vue'
// import index10 from './pages/index10.vue'
// import index11 from './pages/index11.vue'
// import index12 from './pages/index12.vue'
// import index13 from './pages/index13.vue'
// import index14 from './pages/index14.vue'
// import index15 from './pages/index15.vue'
//
//
//
// export default [
//   {path:'/index1',component:index1},
//   {path:'/index2',component:index2},
//   {path:'/index3',component:index3},
//   {path:'/index4',component:index4},
//   {path:'/index5',component:index5},
//   {path:'/index6',component:index6},
//   {path:'/index7',component:index7},
//   {path:'/index8',component:index8},
//   {path:'/index9',component:index9},
//   {path:'/index10',component:index10},
//   {path:'/index11',component:index11},
//   {path:'/index12',component:index12},
//   {path:'/index13',component:index13},
//   {path:'/index14',component:index14},
//   {path:'/index15',component:index15},
//
// ]
// )

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import hrm_staff_roster_labor_rpt from '../pages/hrm_staff_roster_labor_rpt.vue'
import hrm_staff_roster_contract_rpt from '../pages/hrm_staff_roster_contract_rpt.vue'
import hrm_staff_attendance_rpt from '../pages/hrm_staff_attendance_rpt.vue'
import hrm_staff_att_deduct_rpt from '../pages/hrm_staff_att_deduct_rpt.vue'
import hrm_staff_station_dist_rpt from '../pages/hrm_staff_station_dist_rpt.vue'
import hrm_staff_dist_rpt from '../pages/hrm_staff_dist_rpt.vue'
import hrm_contract_expire_rpt from '../pages/hrm_contract_expire_rpt.vue'
import hrm_certificate_expire_rpt from '../pages/hrm_certificate_expire_rpt.vue'
import hrm_dept_att_stats_rpt from '../pages/hrm_dept_att_stats_rpt.vue'
import hrm_att_deduct from '../pages/hrm_att_deduct.vue'
import hrm_attendance from '../pages/hrm_attendance.vue'
import hrm_att_dept from '../pages/hrm_att_dept.vue'
import hrm_transfer from '../pages/hrm_transfer.vue'
import hrm_staff_contract from '../pages/hrm_staff_contract.vue'
import hrm_staff from '../pages/hrm_staff.vue'

export default [
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
