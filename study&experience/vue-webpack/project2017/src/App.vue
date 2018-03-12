<template>
  <div id="app" style="background-color:#3f3f3f">
  <div class="" style="background-color:black">
    <main>
      <!-- 左侧导航 -->
      <div class="main-left">
        <el-menu default-active="/hrm_staff_roster_labor_rpt" class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/hrm_staff_roster_labor_rpt" :class="{'isActive': !active}">劳动用工备案职工花名册</el-menu-item>
          <el-menu-item index="/hrm_staff_roster_contract_rpt" :class="{'isActive': !active}">合同制职工花名册</el-menu-item>
          <el-menu-item index="/hrm_staff_attendance_rpt" :class="{'isActive': !active}">休假情况</el-menu-item>
          <el-menu-item index="/hrm_staff_att_deduct_rpt" :class="{'isActive': !active}">扣费汇总</el-menu-item>
          <el-menu-item index="/hrm_staff_station_dist_rpt" :class="{'isActive': !active}">岗位人员分布</el-menu-item>
          <el-menu-item index="/hrm_staff_dist_rpt" :class="{'isActive': !active}">科室人员分布</el-menu-item>
          <el-menu-item index="/hrm_contract_expire_rpt" :class="{'isActive': !active}">合同到期提醒</el-menu-item>
          <el-menu-item index="/hrm_certificate_expire_rpt" :class="{'isActive': !active}">证书到期提醒</el-menu-item>
          <el-menu-item index="/hrm_dept_att_stats_rpt" :class="{'isActive': !active}">科室考勤统计</el-menu-item>
          <el-menu-item index="/hrm_att_deduct" :class="{'isActive': !active}">考勤扣款登记</el-menu-item>
          <el-menu-item index="/hrm_attendance" :class="{'isActive': !active}">考勤登记管理</el-menu-item>
          <el-menu-item index="/hrm_att_dept" :class="{'isActive': !active}">考勤科室管理</el-menu-item>
          <el-menu-item index="/hrm_transfer" :class="{'isActive': !active}">调动信息</el-menu-item>
          <el-menu-item index="/hrm_staff_contract" :class="{'isActive': !active}">合同管理</el-menu-item>
          <el-menu-item index="/hrm_staff" :class="{'isActive': !active}">人员台账</el-menu-item>
        </el-menu>
      </div>
      <!-- 右侧主内容区 -->
      <div class="main-right" >
        <transition name="fade">
          <router-view class="view"></router-view>
        </transition>
      </div>
    </main>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//
Vue.use(Element)

export default {
  name: 'app',
  data: function() {
    return {
      active: true,
      headerFixed: true
    }
  },
  created: function() {
    // this.$router.push('/hrm_staff_roster_labor_rpt');
  },
  methods: {

  },
  watch: {
    '$route': function(to, from) {
      if (to.path == '/hrm_staff_roster_labor_rpt') {
        this.active = true;
      } else if (to.path == '/hrm_staff_roster_labor_rpt') {
        this.active = false;
      }
    }
  }
}
</script>
<!-- npm run  build -->
<style scoped>
body {
  margin: 0;
}

#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif;
}



/* 主内容区 */

main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 800px;
  background-color: #FCFCFC;
}

main .main-left {
  text-align: center;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 200px;
  flex: 0 0 200px;
}

main .main-right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background-color: #fff;
  /* padding: 50px 70px; */
}

main .el-menu {
  background-color: transparent!important;
}


/*  */

.router-link {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #475669;
  text-decoration: none;
}

.is-active .router-link {
  color: #20a0ff;
}


/* 单选框 */

.el-form-item .el-radio+.el-radio {
  margin-left: 30px!important;
}


/* 路由切换动效 */

.fade-enter-active,
.fade-leave-active {
  /* transition: all .2s; */
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}


/* 导航栏菜单选中效果 */

.isActive {
  color: #20a0ff!important;
}

#app main .aside .is-active {
  color: #475669;
}


/* 卡片 */

.el-card {
  overflow: visible!important;
}
</style>
