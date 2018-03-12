$<template>
  <div class="info">
    <div class="infoPlace ">
      您所在的位置是：
      <span>人事管理 / 合同制职工花名册</span>
    </div>
    <div class="infoTitle clearfix">
      <div class="roster fl">
        <span>|</span>&nbsp;合同制职工花名册
      </div>
      <ul class="fr clearfix">
        <li class="fl">
          <a href="javascript:void(0)" @click="cmdDetailExpExcel">
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
            <th>编号</th>
            <th>姓名</th>
            <th>性别</th>
            <th style='letter-spacing:1em;padding-left:15px;'>身份证号</th>
            <th>年龄</th>
            <th>到院时间</th>
            <th>入党时间</th>
            <th>民族</th>
            <th>籍贯</th>
            <th>文化程度</th>
            <th>毕业院校</th>
            <th>所学专业</th>
            <th>毕业时间</th>
            <th>技术职称</th>
            <th>取得时间</th>
            <th>职务</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="(item,index) in tableResultList.rows">
            <td>{{item.CODE}}</td>
            <td>{{item.NAME}}</td>
            <td>{{item.SEX_NAME}}</td>
            <td>{{item.ID_NUMBER}}</td>
            <td>{{item.AGE}}</td>
            <td>{{item.SIGN_DATE}}</td>
            <td>{{item.SIGN_DATE}}</td>
            <td>{{item.NATION_ID_NAME}}</td>
            <td>{{item.NATIVE_PLACE}}</td>
            <td>{{item.STANDARD_CULTURE_ID_NAME}}</td>
            <td>{{item.SCHOOL}}</td>
            <td>{{item.MAJOR}}</td>
            <td>{{item.END_DATE}}</td>
            <td>{{item.TITLE_NAME}}</td>
            <td>{{item.EVALUATE_DATE}}</td>
            <td>{{item.POSITION_ID_NAME}}</td>
            <td>{{item.COMMENTS}}</td>
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
      tableResultList: [, ],
      condition:"",
    }
  },
  methods: {
   comGetDatas() {
      var param = this.common.orderOftenPagingParam(this.currentPage,this.pageSize,"","","")
      var url = this.common.baseNodeUrl+"hrm/rpt/Srv_HRM_StaffRosterRpt.ashx" + param  
         this.$http.get(url)             
					.then(function(res) {
						var dataJson = res.body;
						console.log(dataJson)
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("合同制工花名册数据失败");
							return false;
						}
						this.tableResultList = dataJson.Message;
					}).catch(function (res) {
	        			  console.log(res+"合同制工花名册数据异常")
					});		
    },
    // 导出
    cmdDetailExpExcel(){
        var url = this.common.baseNodeUrl+"hrm/rpt/Srv_HRM_StaffRosterContractRptExcel.ashx";
         this.$http.get(url)             
					.then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("合同制工花名册导出数据失败");
							return false;
						}
						window.location.href = dataJson.Message;
					}).catch(function (res) {
	        			  console.log(res+"合同制工花名册导出数据异常")
					});		
    },
    //打印
    cmdPrint(){
    	this.$confirm('您确定要打印', '是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
//					this.isActiveAdd = false;
//					function print(printpage) {						
//						var bt = document.getElementById("commandPrint");
//						var div_print = document.getElementById("dataGridTableJson");
//						bt.onclick = function() {
//							printdiv(div_print);
//							console.log(bt)
//						}
//					}
				}).catch(function (response) {
        			console.log(response)
   				});
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 0;
    },
    handleCurrentChange(val) {
      this.currentPage=val=0?1:val;
      this.comGetDatas();
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
