$<template>
  <div class="info">
    <div class="infoPlace ">
      您所在的位置是：
      <span>人事管理 / 劳动用工备案职工花名册</span>
    </div>
    <div class="infoTitle clearfix">
      <div class="roster fl">
        <span>|</span>&nbsp;劳动用工备案职工花名册
      </div>
      <ul class="fr clearfix">
        <li class="fl">
          <a href="javascript:void(0)" @click="cmdExpExcel">
            <e class="export"></e>
            导出</a>
        </li>
        <li class="fl">
          <a href="javascript:void(0)" @click="cmdPrint" >
            <e class="print"></e>
            打印</a>
        </li>
      </ul>
    </div>
    <div class="roster-message" style="min-height: 660px;">
      <table border="0" cellspacing="1" cellpadding="10" align="center" class="table tablelist">
        <thead>
          <tr class="r-t-head">
            <th>序号</th>
            <th>档案号</th>
            <th>姓名</th>
            <th>身份证号</th>
            <th>合同起始期</th>
            <th>劳动合同期限</th>
            <th>约定岗位</th>
            <th>约定工资标准</th>
            <th>电话号码</th>
          </tr>
        </thead>

        <tbody id="tbody">
          <tr v-for="(item,index) in tableResultList.rows">
            <td>{{index=+1}}</td>
            <td>{{item.CODE}}</td>
            <td>{{item.NAME}}</td>
            <td>{{item.ID_NUMBER}}</td>
            <td>{{item.SIGN_DATE}}</td>
            <td>{{item.LIMIT_ID_NAME}}</td>
            <td>{{item.APPOINT_STATION_ID_NAME}}</td>
            <td>{{item.APPOINT_SALARY_ID_NAME}}</td>
            <td>{{item.CELL_PHONE_NUMBER}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="infoBOttom clearfix">
         <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100,'全部']"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableResultList.total">
              </el-pagination>
             
        </div>    
        <div class="showtotal" @click="cmdShowTotal">显示全部
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize:10,
      currentPage:1,
      tableResultList: [],
      condition:""
    }
  },
  methods: {
   comGetDatas() {
      var param = this.common.orderOftenPagingParam(this.currentPage,this.pageSize,"","","")
      var url = this.common.baseNodeUrl+"hrm/rpt/Srv_HRM_StaffRosterRpt.ashx" + param  
         this.$http.get(url)             
					.then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("查询列表数据失败");
							return false;
						}
						this.tableResultList = dataJson.Message;
					}).catch(function (res) {
	        			  console.log(res+"查询列表数据异常")
					});		
    },
    cmdExpExcel(){
      var url = this.common.baseNodeUrl+"hrm/rpt/Srv_HRM_StaffRosterContractRptExcel.ashx";
      this.$http.get(url)             
					.then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("导出数据失败");
							return false;
						}
						window.location.href = dataJson.Message;
					}).catch(function (res) {
                console.log(res+"导出数据异常")
					});	  
    },
    //打印
    cmdPrint(){
    	this.$confirm('您确定要打印', '是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
          alert(1);
				}).catch(function (response) {
        			console.log(response)
   				});
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 0;
    },
    handleCurrentChange(val) {
      this.currentPage=val==0?1:val;
      this.cmdSearchList();
    },
    cmdShowTotal(){
      this.currentPage = 1;
      this.pageSize= -1;
      this.comGetDatas();
    },
  },
  created() {
     this.comGetDatas();
  },
  mounted(){
  	
  }
}
</script>
<style scoped>
@import url('./css/index1.css');
.infoBOttom {
  position: relative;
}

.current {
  position: absolute;
  top: -13px;
  left: 250px;
}

.tablelist{
	border-collapse:separate;
	border-spacing: 0px 10px;
  margin-right:30px;
}




</style>
