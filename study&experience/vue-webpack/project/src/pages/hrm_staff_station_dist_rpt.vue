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
            <select style="border: none" id="select">
              <option value="2017">2017年</option>
              <option value="2016">2016年</option>
              <option value="2015">2015年</option>
              <option value="2014">2014年</option>
            </select>
            <div class="cover"></div>

            <div class="triangle"></div>
            <div class=" up"></div>
          </li>
          <li class="fl">
            <a href="javascript:void(0)">
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
export default {
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableResultData: []
    }
  },
  methods: {
    getdata() {

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    this.getdata();
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
