<template>

  <div class="info" style="width: 1061px">
    <div class="infoPlace">
      您所在的位置是：
      <span>人事管理 / 职工病事假扣费汇总</span>
    </div>
    <div class="infoTitle clearfix">
      <div class="roster fl">
        <span>|</span>&nbsp;职工病事假扣费汇总</div>
      <ul class="fr clearfix">
        <li class="fl " id="vacation">
          <e class="calendar"></e>
          <select style="border: none" v-model="currentYear"  @change="cmdChange">
              <option :value="year" v-for="year in yearList">{{year}}年</option>
          </select>
          <div class="cover"></div>
          <div class="line"></div>
          <select style="border: none" v-model="currentMonth"  @change="cmdChange">
              <option value="01">1月</option>
              <option value="02">2月</option>
              <option value="03">3月</option>
              <option value="04">4月</option>
              <option value="05">5月</option>
              <option value="06">6月</option>
              <option value="07">7月</option>
              <option value="08">8月</option>
              <option value="09">9月</option>
              <option value="10">10月</option>
              <option value="11">11月</option>
              <option value="12">12月</option>
          </select>
          <div class="cover covertwo"></div>
          <div class="triangle"></div>
          <div class=" up"></div>
        </li>
        <li class="fl">
          <a href="javascript:void(0)" @click="cmdExpExcel">
            <e class="export"></e>
            导出</a>
        </li>
        <li class="fl">
          <a href="javascript:void(0)">
            <e class="print"></e>
            打印</a>
        </li>
      </ul>
    </div>
    <div class="roster-message" style="min-height: 660px;">
      <table border="0" cellspacing="1" cellpadding="10" align="center" 
      	id="dataGridTableJson" class="table tablelist">
        <thead>
          <tr class="r-t-head">
            <th class="first-td">编号</th>
            <th>姓名</th>
            <th>事由</th>
            <th>休假天数</th>
            <th>扣款金额</th>
            <th>科室</th>
            <th>备注</th>
          </tr>
        </thead>

        <tbody id="tbody">
          <tr v-for="(item,index) in tableResultList.rows">
            <td>{{item.CODE}}</td>
            <td>{{item.STAFF_ID_NAME}}</td>
            <td>{{item.REASON_TYPE_ID_NAME}}</td>
            <td>{{item.DAYS}}</td>
            <td>{{item.MONEY}}</td>
            <td>{{item.DEPT_ID_NAME}}</td>
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
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableResultList.total">
              </el-pagination>
              <!-- <el-button-group>
                  <el-button type="primary" icon="arrow-left">上一页</el-button>
                  <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
              </el-button-group> -->
        </div>    
        <div class="showtotal" @click="cmdShowTotal">显示全部
        </div>
    </div>
  </div>
</template>

<script>
import { format , addYears } from 'date-fns'
export default {
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      tableResultList: {total:0,rows:[]},
      yearList:[],
      currentMonth:format(Date.now(), 'MM'),
      currentYear:format(Date.now(), 'YYYY'),
    }
  },
  methods: {
    getYears(){
      for(let i=3;i>=1;i--)
      {
        this.yearList.push(format(addYears(Date.now(),-i), 'YYYY'));
      }
      
      this.yearList.push(format(Date.now(), 'YYYY'));
    },
    cmdShowTotal(){
      this.currentPage = 1;
      this.pageSize= -1;
      this.cmdSearchList();
    },
    cmdChange(){
       this.cmdSearchList();
    },
    cmdSearchList() {
      var objParam = {financeCycle:this.currentYear+''+this.currentMonth};
      var param = this.common.orderComPagingParam(this.currentPage,this.pageSize,"","","",objParam);
      var url = this.common.baseNodeUrl+"hrm/rpt/Srv_HRM_StaffAttendDeductRpt.ashx" + param  
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
    // 导出
    cmdExpExcel(){
        var url = this.common.baseNodeUrl+"hrm/rpt/Srv_HRM_StaffAttendDeductRptExcel.ashx?financeCycle="+this.currentYear+''+this.currentMonth;
         this.$http.get(url)             
					.then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("列表导出数据失败");
							return false;
						}
						window.location.href = dataJson.Message;
					}).catch(function (res) {
	        			  console.log(res+"列表导出数据异常")
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
  },
  created() {
    this.getYears();
    this.cmdSearchList();
  },
}
</script>
<style scoped>
#vacation {
  display: inline-block;
  background: #fff;
  border-radius: 100px;
  line-height: 28px;
  text-decoration: none;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #5d89b3;
  text-align: center;
  margin-left: 20px;
  position: relative;
  border: 1px solid #5d89b3;
  width: 158px;
  height: 28px;
  margin-top: 23px;
  padding-left: 10px;
}

.calendar {
  display: inline-block;
  width: 13px;
  height: 13px;
  background: url("images/icon_date.png");
  position: absolute;
  top: 7px;
  left: 6px;
}

select {
  position: relative;
  outline: none;
}

.cover {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 6px;
  left: 80px;
  background-color: #fff;
}

.line {
  height: 1px;
  width: 9px;
  background-color: #5d89b3;
  position: absolute;
  top: 13px;
  left: 83px;
}

.covertwo {
  top: 6px;
  left: 132px;
}

.triangle {
  position: absolute;
  top: 16px;
  right: 26px;
  width: 0;
  height: 0;
  border-top: 4px solid #5d89b3;
  border-left: 3px solid transparent;
  border-bottom: 4px solid transparent;
  border-right: 3px solid transparent
}

.up {
  position: absolute;
  top: 5px;
  right: 26px;
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 4px solid #5d89b3;
  border-top: 4px solid transparent;
}

.export {
  background: url("images/icon_export_01.png");
}

.print {
  background: url("images/icon_print_01.png");
}

.tablelist{
	border-collapse:separate;
	border-spacing: 0px 10px;
	margin-right:30px;
}
.infoBOttom{
  position: relative;
}
</style>
