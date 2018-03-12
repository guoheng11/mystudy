<template>
  <div>
    <div class="info">
      <div class="infoPlace">
        您所在的位置是：
        <span>人事管理 / 岗位人员分布情况</span>
      </div>
      <div class="infoTitle clearfix">
        <div class="roster fl">
          <span>|</span>&nbsp;岗位人员分布情况</div>
        <ul class="fr clearfix">
          <li class="fl " id="vacation">
            <e class="calendar"></e>
            <select style="border: none" id="select" v-model="currentYear" @change="cmdChange">
              <option :value="year" v-for="year in yearList">{{year}}年</option>
            </select>
            <div class="cover"></div>

            <div class="triangle"></div>
            <div class=" up"></div>
          </li>
          <li class="fl">
            <a href="javascript:void(0)" @click="cmdSave">
              <e class="pigeonhole"></e>
              归档</a>
          </li>
          <li class="fl">
            <a href="javascript:void(0)">
              <e class="print"></e>打印</a>
          </li>
        </ul>
      </div>
      <div class="roster-message">
        <table border="1 " width="1061" align="center">
          <tr>
            <td width="13%">科室</td>
            <td colspan="9">成员</td>
            <td width="13%">总人数</td>
          </tr>
          <tr>
            <td rowspan="7">急诊科8001</td>
            <td rowspan="3">医生组</td>
            <td>高级</td>
            <td>娄振华</td>
            <td>振华</td>
            <td>娄华</td>
            <td>娄振华</td>
            <td></td>
            <td></td>
            <td></td>
            <td>4人</td>
          </tr>
          <tr>
            <td>中级</td>
            <td>吴晓伟</td>
            <td>吴晓伟</td>
            <td>吴晓伟</td>
            <td>吴晓伟</td>
            <td>吴晓伟</td>
            <td>吴晓伟</td>
            <td></td>
            <td>6人</td>
          </tr>
          <tr>
            <td>初级</td>
            <td>李小璐</td>
            <td>李小璐</td>
            <td>李小璐</td>
            <td>李小璐</td>
            <td>李小璐</td>
            <td>李小璐</td>
            <td>李小璐</td>
            <td>7人</td>
          </tr>
          <tr>
            <td rowspan="4">护士组</td>
            <td>兰梦娇</td>
            <td>兰梦娇</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td rowspan="4">26人</td>
          </tr>
          <tr>
            <td>兰梦娇</td>
            <td>兰梦娇</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
          </tr>
          <tr>
            <td>兰梦娇</td>
            <td>兰梦娇</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
          </tr>
          <tr>
            <td>兰梦娇</td>
            <td>兰梦娇</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td>龙凤</td>
            <td></td>
            <td></td>
          </tr>
        </table>

      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { format , addYears } from 'date-fns'
export default {
  data() {
    return {
      tableResultData: [],
      yearList:[],
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
      cmdChange(){
        this.cmdSearchList();
      },
      cmdSearchList() {
        var objParam = {year:this.currentYear};
        var param = this.common.orderComPagingParam(this.currentPage,this.pageSize,"","","",objParam);
        var url = this.common.baseNodeUrl + "hrm/rpt/Srv_HRM_StaffDistRpt.ashx" + param
        this.$http.get(url)
          .then(function(res) {
            var dataJson = res.body;
            console.log(dataJson)
            if (dataJson.Succeed != 1) {
              if (dataJson.Message != null) {
                alert(dataJson.Message);
              }
              console.log("查询列表数据失败");
              return false;
            }
            this.tableResultList = dataJson.Message;
          }).catch(function(res) {
            console.log(res + "查询列表数据异常")
          });
      },
      // 导出
      cmdExpExcel() {
        var url = this.common.baseNodeUrl + "hrm/rpt/Srv_HRM_StaffDistExpExcel.ashx";
        this.$http.get(url)
          .then(function(res) {
            var dataJson = res.body;
            if (dataJson.Succeed != 1) {
              if (dataJson.Message != null) {
                alert(dataJson.Message);
              }
              console.log("导出数据失败");
              return false;
            }
            window.location.href = dataJson.Message;
          }).catch(function(res) {
            console.log(res + "导出数据异常")
          });
      },
      //归档
      cmdSave(){
        var url = this.common.baseNodeUrl + "hrm/rpt/Srv_HRM_StaffStation_DistRptSave.ashx?year="+this.currentYear;
        this.$http.get(url)
          .then(function(res) {
            var dataJson = res.body;
            console.log(dataJson)
            if (dataJson.Succeed != 1) {
              if (dataJson.Message != null) {
                alert(dataJson.Message);
              }
              console.log("归档数据失败");
              return false;
            }
            alert("归档成功!");
          }).catch(function(res) {
            console.log(res + "归档数据异常")
          });
    },
  },
  created() {
    this.getYears();
    this.cmdSearchList();
  }
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
  left: 11px;
}

select {
  position: relative;
  outline: none;
  top: 2px;
}

.cover {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 6px;
  left: 105px;
  background-color: #fff;
}

.covertwo {
  top: 6px;
  left: 118px;
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

.pigeonhole {
  display: block;
  position: absolute;
  width: 10px;
  height: 13px;
  background: url("./images/归档icon01.png");
  top: 9px;
  left: 23px;
}

.infoTitle {
  font-family: PingFangSC-Regular;
  height: 70px;
  padding: 0 30px 0 20px;
  line-height: 70px;
}

.roster {
  /* font-size: 12px; */
  color: #626262;
  text-align: left;
}

.infoTitle span {
  color: #5d89b3;
  font-size: 12px;
  font-weight: 900;
}

.export {
  background: url("images/icon_export_01.png");
}

.print {
  background: url("images/icon_print_01.png");
}

td {
  text-align: center;
  	height:48px;
}
</style>