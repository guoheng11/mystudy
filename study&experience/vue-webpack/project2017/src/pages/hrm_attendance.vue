<template>
<div @click="searchBoxListHidden">
  <div class="content">
    <div class="infoPlace ">
      您所在的位置是：
      <span>人事管理 / 考勤登记</span>
    </div>
    <div class="infoo">
      <div class="infolinfoleft fl">
        <div class="infoTitle ">
          <div class="roster">
            <span>|</span>&nbsp;考勤登记</div>
          <div>
            <ul class="clearfix">
              <li class="fl" id="vacation">
                <e class="calendar"></e>
                <select class="checked" v-model="paramCk">
										<option v-for="(item,index) in querySelectorList" :value="item.id">{{item.name}}
										</option>
									</select>
                <div class="cover"></div>
                <div class="triangle"></div>
                <div class=" up"></div>
                <input type="text" class="condition" v-model="paramText"></li>
              <li class="fl">
                <a href="javascript:void(0)" @click="cmdSearchList">
                  <e class="inquire"></e>
                  查询</a>
              </li>
              <li class="fl">
                <a href="javascript:void(0)" @click="cmdDetailExpExcel">
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
        </div>
        <div style="min-height: 660px;">
          <table border="0" cellspacing="1" cellpadding="10" align="center" id="dataGridTableJson" class="table tablelist">
            <thead>
              <tr class="r-t-head">
                <th>单号
                  <em style="right:5px"></em>
                </th>
                <th>考勤月份
                  <em style="right:20px"></em>
                </th>
                <th>考勤科室
                  <em style="right:20px"></em>
                </th>
                <th>录入人
                  <em style="right:15px"></em>
                </th>
                <th>录入科室
                  <em style="right:20px"></em>
                </th>
                <th>录入日期
                  <em style="right:20px"></em>
                </th>
                <th>状态
                  <em style="right:5px"></em>
                </th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="tbody">
              <tr v-for="(item,index) in tableResultList.rows">
                <td>{{item.CODE}}</td>
                <td>{{item.FINANCE_CYCLE}}</td>
                <td>{{item.SUBJECT_DEPT_ID_NAME}}</td>
                <td>{{item.USER_ID_NAME}}</td>
                <td>{{item.DEPT_ID_NAME}}</td>
                <td>{{item.CREATE_DATE}}</td>
                <td>{{item.STATE_NAME}}</td>
                <td>
                  <span class="spanLinkLook" v-show="viewLook(item.STATE)" @click="cmdLinkLook(item)">查看</span>
                  <span class="spanLinkEdit" v-show="viewEdit(item.STATE)" @click="cmdLinkEdit(item,'')">编辑</span>
                  <span v-show="viewSpan(item.STATE)" style="font-size: 16px;">/</span>
                  <span class="spanLinkRemove" v-show="viewRemove(item.STATE)" @click="cmdLinkRemove(item,index)">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="infoBottom clearfix">
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableResultList.total">
            </el-pagination>
            <!-- <el-button-group>
							<el-button type="primary" icon="arrow-left">上一页</el-button>
							<el-button type="primary">下一页
							<i class="el-icon-arrow-right el-icon--right"></i>
							</el-button>
						</el-button-group> -->
          </div>
        </div>
      </div>
      <div class="inforight fr">
        <div class="arrleft" @click='viewOpen();' v-show="!isShowEdit">
        </div>
        <div class="compile" v-show="isShowEdit">
          <div class="arrright" @click='viewClose();' v-show="isShowEdit">

          </div>
          <div class="compile-top">
            <div class="block">
              <span class="wrapper">
                                    <el-button
                                    	type="success"
                                    	:class="{bgcgray: btnActive.isAdd}"
                                    	:disabled="btnActive.isAdd"
                                    	@click="cmdAdd">添加
                                    </el-button>
                                    <el-button
                                    	type="warning"
                                    	:class="{bgcgray:btnActive.isSave}"
                                    	:disabled="btnActive.isSave"
                                    	@click="cmdSave">保存
                                    </el-button>
                                    <el-button
                                    	type="danger"
                                    	:class="{bgcgray:btnActive.isSubmit}"
                                    	:disabled="btnActive.isSubmit"
                                    	@click="cmdSubmit">提交
                                    </el-button>
                                    <el-button
                                    	type="info"
                                    	:class="{bgcgray:btnActive.isAudit}"
                                    	:disabled="btnActive.isAudit"
                                    	@click="cmdAudit">审核
                                    </el-button>
                                </span>
            </div>
            <div class="input">
              <p>
                <span>单号：</span>
                <input type="text" v-model="modelObj.CODE" :disabled="isDisabledInput"><br></p>

              <p>
                <span>考勤科室：</span>
                <input type="text" v-model="modelObj.SUBJECT_DEPT_ID_NAME" :disabled="isDisabledInput"><br></p>
              <div class="block" style="display: inline-block;margin-left:0px;margin-bottom:10px ">
                <span class="demonstration">考勤月份：</span>
                <select class="month" v-model="modelObj.FINANCE_CYCLE">
										<option :value="item.K" v-for="item in yearMonthList">{{item.V}}</option>
									</select>
              </div>
              <p>
                <span>录入人：</span>
                <input type="text" v-model="modelObj.USER_ID_NAME" :disabled="isDisabledInput">
                <input type="text" v-model="modelObj.USER_ID" v-show="false"><br></p>
              <p>
                <span>录入科室：</span>
                <input type="text" v-model="modelObj.DEPT_ID_NAME" :disabled="isDisabledInput">
                <input type="text" v-model="modelObj.DEPT_ID" v-show="false"><br></p>
              <div class="block">
                <span class="demonstration">录入日期：</span>
                <div class="block" style="display: inline-block;margin-left:25px;margin-bottom:10px ">
                  <el-date-picker :disabled="isDisabledInput" v-model="modelObj.CREATE_DATE" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                  </el-date-picker>
                </div>
              </div>
              <p>
                <span>备注：</span>
                <input type="text" v-model="modelObj.SUMARRY" style="height: 99px;" :disabled="isDisabledInput"></p>
            </div>
          </div>
          <ul class="clearfix compile-bottom" style="padding-left: 20px;padding-right: 20px;margin-top: 10px">
            <li class="fl">
              <el-button type="text" :disabled="btnActive.isDetailAdd" @click="cmdDetailAdd">
                <e class="add"></e>添加明细行</el-button>
            </li>
            <li class="fl">
              <el-button type="text" :disabled="btnActive.isDetailAdd" @click="">
                <e class="daoru"></e> 导入Excel</el-button>
            </li>
            <li class="fl">
              <el-button type="text" :disabled="btnActive.isDetailAdd" @click="">
                <e class="daochu"></e> 导出Excel</el-button>
            </li>
            <li class="fl">
              <el-button type="text" :disabled="btnActive.isDetailAdd" @click="">
                <e class="fujian"></e> 添加附件</el-button>
            </li>
          </ul>
          <div class="addmingxi">
            <table border="1" ref="mytable" style="width:720px;margin-top:30px;margin-left:80px;">
              <thead>
                <tr>
                  <th>员工</th>
                  <th>事由</th>
                  <th>请假时间（起）</th>
                  <th>请假时间（止）</th>
                  <th>天数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody v-for="(item ,index) in modelObj.DetailList " id="tbodyinput">
                <tr>
                  <td>
                    <input type="text" v-model="item.STAFF_ID_NAME" :disabled="isDisabledInput" @input="searchDetailStaffDataChange(index,$event);">
                    <input type="text" v-model="item.STAFF_ID" v-show="false">
                    <div v-show="isDetailBoxStaff" @click.stop="pageDetailStaffClick" style="position: absolute;z-index:10">
                      <div class="tablehead" style="padding:10px 0">
                        <el-row>
                          <el-col :span="6">
                            <span>序号</span>
                          </el-col>
                          <el-col :span="6">
                            <span>姓名</span>
                          </el-col>
                          <el-col :span="6">
                            <span>部门</span>
                          </el-col>
                          <el-col :span="6">
                            <span>职务</span>
                          </el-col>
                        </el-row>
                      </div>

                      <div style="" class="searchListDiv example">
                        <table border="1" align="center" class="searchList">
                          <tbody>
                            <tr @click="selectDetailStaff(item);" @mouseover="boxMouseOver(index)" @mouseout="boxMouseOut(index)" :class="{'trlistover': boxMouseOverbgc===index}" v-for="(item ,index) in searchDetailStaffDataList.rows">
                              <td>{{currentDetailPageStaff==1?index+1:index+1+((currentDetailPageStaff-1)*currentDetailPageSizeStaff)}}</td>
                              <td>{{item.NAME}}</td>
                              <td>{{item.DEPT_NAME}}</td>
                              <td>{{item.POSTION_NAME}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="tablefoot">
                        <div class="block pageDetailStaffClick" @click.stop="pageDetailStaffClick">
                          <el-pagination @size-change="handleSizeChangeDetailStaff" @current-change="handleCurrentChangeDetailStaff" :current-page.sync="currentDetailPageStaff" :page-size="currentDetailPageSizeStaff" layout="total,prev, next, jumper" :total="searchDetailStaffDataList.total">
                          </el-pagination>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select name="" v-model="item.REASON_TYPE_ID">
												<option :value="typeItem.ID" v-for="typeItem in detailTypeList.rows">{{typeItem.NAME}}</option>
											</select>
                  </td>
                  <td>
                    <el-date-picker :disabled="isDisabledInput" v-model="item.BEGIN_DATE" type="date" placeholder="" size="small" :picker-options="pickerOptions0">
                    </el-date-picker>
                  </td>
                  <td>
                    <el-date-picker :disabled="isDisabledInput" v-model="item.END_DATE" type="date" placeholder="" size="small" :picker-options="pickerOptions0">
                    </el-date-picker>
                  </td>
                  <td>
                    <input type="text" v-model="item.DAYS" :disabled="isDisabledInput">
                  </td>
                  <td>
                    <span class="spanLinkRemove" v-show="!btnActive.isDetailLinkRemove" @click="cmdDetailLinkRemove(item,index);">删除</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <!--开始-->

            <!--结束-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="mask" class="mask" v-show="isShowEdit"></div> -->
</div>
</template>
<script>
import {
  format,
  addMonths
} from 'date-fns'
import JSON5 from 'json5'
import datepicker from './subcom/datepicker.vue';
export default {
  components: {
    datepicker
  },
  data() {
    return {
      yearMonthList: [],
      pickerOptions0: {
        disabledDate(time) {
          //					     return time.getTime() < Date.now() - 8.64e7;
        }
      },
      paramCk: "subjectDeptName",
      paramText: "",
      boxMouseOverbgc: "", //控制tr高亮
      topBox: 0,
      boxIndex: -1, //列表获取数据索引
      isDetailBoxStaff: false, //人员box控制隐藏
      boxChangeValue: "",
      btnActive: {
        isAdd: false, //添加禁用
        isSave: false, //保存禁用
        isLinkEdit: false, //编辑禁用
        isLook: false, //查看禁用
        isLinkRemove: false, //删除禁用
        isSubmit: false, //提交禁用
        isAudit: false, //审核禁用
        isDetailAdd: false, //明细添加禁用
        isDetailLinkRemove: false, //明细删除禁用
      },
      isDisabledInput: false,
      searchDetailStaffDataList: {
        total: 0,
        rows: [{
            ID: "1",
            NAME: "lis",
            DEPT_ID: "2",
            DEPT_ID_NAME: "开发部",
            POSTION_ID: "3",
            POSTION_ID_NAME: "开发工程师"
          },
          {
            ID: "2",
            NAME: "zhangs",
            DEPT_ID: "2",
            DEPT_ID_NAME: "开发部",
            POSTION_ID: "4",
            POSTION_ID_NAME: "前端工程师"
          },
          {
            ID: "1",
            NAME: "lis",
            DEPT_ID: "2",
            DEPT_ID_NAME: "开发部",
            POSTION_ID: "3",
            POSTION_ID_NAME: "开发工程师"
          },
          {
            ID: "2",
            NAME: "zhangs",
            DEPT_ID: "2",
            DEPT_ID_NAME: "开发部",
            POSTION_ID: "4",
            POSTION_ID_NAME: "前端工程师"
          },
          {
            ID: "1",
            NAME: "lis",
            DEPT_ID: "2",
            DEPT_ID_NAME: "开发部",
            POSTION_ID: "3",
            POSTION_ID_NAME: "开发工程师"
          },
        ]
      }, //明细人员查询
      querySelectorList: [{
          id: "code",
          name: "单号"
        },
        {
          id: "financeCycle",
          name: "考勤月份"
        },
        {
          id: "subjectDeptName",
          name: "考勤科室"
        },
        {
          id: "createDate",
          name: "录入日期"
        },
        {
          id: "stateName",
          name: "状态"
        }
      ],
      modelObj: {
        ID: "",
        CODE: "",
        SUBJECT_DEPT_ID_NAME: "",
        SUBJECT_DEPT_ID: "",
        FINANCE_CYCLE: "",
        USER_ID_NAME: "",
        USER_ID: "",
        DEPT_ID_NAME: "",
        DEPT_ID: "",
        CREATE_DATE: "",
        DetailList: [

        ],
      }, //主数据保存
      userMsg: {}, //用户登录信息及按钮权限
      isShowEdit: false, //编辑列表视图切换
      pageSize: 10, //列表主数据页数大小
      currentPage: 1, //列表主数据当前页数
      currentDetailPageStaff: 1, //box人员当前页数
      currentDetailPageSizeStaff: 5, //box人员页数大小
      tableResultList: {
        total: 0,
        rows: []
      }, //主表列表数据
      detailTypeList: {
        total: 0,
        rows: []
      }, //事由对象定义
    }
  },
  // filters: {
  // },
  methods: {
    //弹出Box列表事件背景变灰
    boxMouseOver(index) {
      this.boxMouseOverbgc = index
    },
    //弹出Box列表事件背景变白
    boxMouseOut(item) {
      this.boxMouseOverbgc = false
    },
    //隐藏列表删除按钮
    viewRemove(state) {
      let isView = false;
      if (this.btnActive.isLook && !this.btnActive.isLinkRemove) {
        if (state == 1)
          isView = true;
      }

      return isView;
    },
    //隐藏列表编辑按钮
    viewEdit(state) {
      let isView = false;
      if (this.btnActive.isLook && !this.btnActive.isLinkEdit) {
        if (state == 1)
          isView = true;
      }
      return isView;
    },
    //隐藏列表查看按钮
    viewLook(state) {
      let isView = false;
      if (state != 1) {
        if (!this.btnActive.isEdit || !this.btnActive.isSubmit || !this.btnActive.isAudit) {
          isView = true;
        }
      } else {
        if (!this.btnActive.isLook)
          isView = true;
      }
      return isView;
    },
    viewSpan(state) {
      let isView = false;
      if (this.btnActive.isLook && state == 1 && !this.btnActive.isLinkRemove) {
        isView = true;
      }
      return isView;
    },
    //打开编辑
    viewOpen() {
      this.isShowEdit = !this.isShowEdit;
      this.clearModelObj();
    },
    //关闭编辑
    viewClose() {
      this.isShowEdit = !this.isShowEdit;
      // this.paramText = "";
      this.cmdSearchList();
    },
    getMonths() {
      for (let i = 4; i >= 1; i--) {
        this.yearMonthList.push({
          K: format(addMonths(Date.now(), -i), 'YYYYMM'),
          V: format(addMonths(Date.now(), -i), 'YYYY年MM月')
        });
      }

      for (let i = 0; i <= 1; i++) {
        this.yearMonthList.push({
          K: format(addMonths(Date.now(), i), 'YYYYMM'),
          V: format(addMonths(Date.now(), i), 'YYYY年MM月')
        });
      }
    },
    //点击隐藏弹出Box框
    searchBoxListHidden() {
      this.isDetailBoxStaff = false;
    },
    /*人员弹出开始*/
    selectDetailStaff(item) {
      this.modelObj.DetailList[this.boxIndex].STAFF_ID = item.ID;
      this.modelObj.DetailList[this.boxIndex].STAFF_ID_NAME = item.NAME;
      // this.modelObj.DetailList[this.boxIndex].DEPT_ID = item.DEPT_ID;
      // this.modelObj.DetailList[this.boxIndex].DEPT_ID_NAME = item.DEPT_NAME;
      this.boxIndex = -1;
      this.isDetailBoxStaff = false;
      this.boxChangeValue = "";
    },
    //弹出点击阻止隐藏
    pageDetailStaffClick() {
      if (this.boxIndex != -1) {
        this.isDetailBoxStaff = true;
      }
    },
    //输入改变值
    searchDetailStaffDataChange(index, event) {
      if (!this.modelObj.DetailList[index].STAFF_ID_NAME.replace(/(^\s*)|(\s*$)/g, '')) {
        this.isDetailBoxStaff = false;
        return;
      }
      // this.modelObj.DetailList[index].STAFF_ID = "";
      // this.modelObj.DetailList[index].DEPT_ID = "";
      // this.modelObj.DetailList[index].DEPT_ID_NAME = "";
      // this.modelObj.DetailList[index].POSTION_ID = "";
      // this.modelObj.DetailList[index].POSTION_ID_NAME = "";
      this.boxIndex = index;
      this.isDetailBoxStaff = true;
      this.boxChangeValue = this.modelObj.DetailList[index].STAFF_ID_NAME;
      this.currentDetailPageStaff = 1;
      this.searchDetailStaffList();
    },
    //点击页数事件
    handleCurrentChangeDetailStaff(val) {
      this.currentDetailPageStaff = val = 0 ? 1 : val;
      this.searchDetailStaffList();
    },
    //查询请求
    searchDetailStaffList() {
      var paramObj = {
        tabName: "v_hrm_b_staff_type_info",
        valueField: "ID",
        nameField: "NAME||DEPT_ID||DEPT_NAME||POSITION_ID||POSITION_NAME",
        nameValue: "NAME||DEPT_NAME||POSITION_NAME",
        keyWord: this.boxChangeValue
      };

      var param = this.common.comPagingParam(this.currentDetailPageStaff, this.currentDetailPageSizeStaff, "", paramObj);

      var url = this.common.baseNodeUrl + "Srv_ComBoxList.ashx" + param
      this.$http.get(url)
        .then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            this.searchDetailStaffDataList = [];
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("获取人员数据失败");
          }
          var msgObj = JSON5.parse(dataJson.Message);
          this.searchDetailStaffDataList = msgObj;
        }).catch(function(res) {
          console.log(res + "获取人员数据异常")
        });
    },
    /*人员弹出结束*/

    //列表查询更改页数大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 0;
    },
    //列表查询更改当前页数
    handleCurrentChange(val) {
      this.currentPage = val = 0 ? 1 : val;
      this.cmdSearchList();
    },
    //编辑操作按钮不可用
    btnDisabled(state) {
      this.btnActive.isSave = state == 0 ? false : true;
      if (this.userMsg.ControlBar.IsAudit != 1) {
        this.btnActive.isSubmit = true;
      } else {
        this.btnActive.isAudit = state == 2 ? false : true;
      }
      this.btnActive.isSubmit = state == 0 ? false : true;
      this.isDisabledInput = state == 0 ? false : true;
      this.btnActive.isDetailAdd = state == 0 ? false : true;
      this.btnActive.isDetailLinkRemove = state == 0 ? false : true;
    },
    //根据用户判断按钮不可用
    btnUserDisabled(obj) {
      let isAdd = true;
      let isSave = true;
      let isEdit = true;
      let isLook = true;
      let isLinkRemove = true;
      let isSubmit = true;
      let isAudit = true;
      let isDetailAdd = true;
      let isDetailLinkRemove = true;

      if (obj.IsReadonly == 1) {
        isLook = false;
      } else {
        if (obj.IsAdd == 1) {
          isAdd = false;
          isSave = false;
          isDetailAdd = false;
          isDetailLinkRemove = false;
        }
        if (obj.IsEdit == 1) {
          isEdit = false;
          isSave = false;
          isDetailAdd = false;
          isDetailLinkRemove = false;
        }
        if (obj.IsDelete == 1) {
          isLinkRemove = false;
        }
        if (obj.IsSubmit == 1) {
          isSubmit = false;
        }
        if (obj.isAudit == 1) {
          isAudit = false;
        }
      }

      this.btnActive.isAdd = isAdd; //添加禁用
      this.btnActive.isSave = isSave; //保存禁用
      this.btnActive.isLinkEdit = isEdit; //编辑禁用
      this.btnActive.isLook = isLook; //查看禁用
      this.btnActive.isLinkRemove = isLinkRemove; //删除禁用
      this.btnActive.isSubmit = isSubmit; //提交禁用
      this.btnActive.isAudit = isAudit; //审核禁用
      this.btnActive.isDetailAdd = isDetailAdd; //明细添加禁用
      this.btnActive.isDetailLinkRemove = isDetailLinkRemove; //明细删除禁用
    },
    //清空数据
    clearModelObj() {
      var thisDate = Date.now();
      var thisMonth = format(Date.now(), 'YYYYMM');
      this.modelObj = {
        ID: "",
        CODE: "",
        SUBJECT_DEPT_ID_NAME: "",
        SUBJECT_DEPT_ID: "",
        FINANCE_CYCLE: thisMonth,
        USER_ID: this.userMsg.ID,
        USER_ID_NAME: this.userMsg.NAME,
        DEPT_ID: this.userMsg.DEPART_ID,
        DEPT_ID_NAME: this.userMsg.DEPART_ID_NAME,
        CREATE_DATE: thisDate,
        COMMENTS: "",
        DetailList: [],
      };

      this.cmdDetailAdd();

      if (this.userMsg.ControlBar.IsReadonly != 1) {
        if (this.userMsg.ControlBar.IsAdd != 1 && this.userMsg.ControlBar.IsEdit != 1) {
          this.btnActive.isSave = true;
          // this.isDisabledInput = true;
          this.btnActive.isDetailAdd = true;
          this.btnActive.isDetailLinkRemove = true;
        } else {
          this.btnActive.isSave = false;
          // this.isDisabledInput = false;
          this.btnActive.isDetailAdd = false;
          this.btnActive.isDetailLinkRemove = false;
        }
        this.btnActive.isAudit = true;
        if (this.userMsg.ControlBar.IsSubmit != 1) {
          this.btnActive.isSubmit = true;
        } else {
          this.btnActive.isSubmit = false;
        }

      }
    },
    //列表查询条件
    getQueryParam() {
      var paramObj = {};
      var paramText = this.paramText;
      var paramCk = this.paramCk;

      if (paramText != undefined && paramText != "")
        paramObj[paramCk] = paramText;
      return paramObj;
    },
    //添加主数据并清空
    cmdAdd() {
      this.clearModelObj();
    },
    /*列表查询*/
    cmdSearchList() {
      var paramObj = this.getQueryParam();
      var param = this.common.orderComPagingParam(this.currentPage, this.pageSize, "CREATE_DATE", "ASC", "", paramObj);
      var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendanceList.ashx" + param
      this.$http.get(url)
        .then(function(res) {
          var dataJson = res.body;
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
    //保存
    cmdSave() {
      var isErr = this.saveIn();
      if (!isErr)
        return
      var strDataJson = JSON5.stringify(this.modelObj);
      var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendanceSave.ashx";
      this.$http.post(url, strDataJson, {
        emulateJSON: true
      }).then(function(res) {
        var dataJson = res.body;
        if (dataJson.Succeed != 1) {
          if (dataJson.Message != null) {
            alert(dataJson.Message);
          }
          console.log("保存数据失败");
          return false;
        } else {
          this.modelObj.ID = dataJson.Message;
          this.cmdLinkEdit(this.modelObj, "Save");

        }

      }).catch(function(res) {
        console.log(res + "保存数据异常")
      });

    },
    // 提交
    cmdSubmit() {
      var isErr = this.saveIn();
      if (!isErr)
        return
      this.$confirm('您确定要提交', '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var strDataJson = JSON5.stringify(this.modelObj);
        var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendanceSubmit.ashx";
        this.$http.post(url, strDataJson, {
          emulateJSON: true
        }).then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("提交数据失败");
            return false;
          } else {
            this.modelObj.ID = dataJson.Message;
            this.cmdLinkEdit(this.modelObj, "Submit");
            // this.btnDisabled(2);
          }
        }).catch(function(res) {
          console.log(res + "提交数据异常")
        });
      });
    },
    //保存判断
    saveIn() {
      var result = true;
      if (!this.modelObj.CODE) {
        alert("请填入单号")
        return false;
      }
      if (!this.modelObj.SUBJECT_DEPT_ID_NAME) {
        alert("请填入考勤科室")
        return false;
      }
      if (!this.modelObj.FINANCE_CYCLE) {
        alert("请填入考勤月份")
        return false;
      }
      if (!this.modelObj.CREATE_DATE.toString().replace(/(^\s*)|(\s*$)/g, '')) {
        alert("请选择录入日期")
        return false;
      }

      this.modelObj.CREATE_DATE = format(this.modelObj.CREATE_DATE, 'YYYY-MM-DD')


      var display_index = 0;
      for (var k in this.modelObj.DetailList) {

        if (!this.modelObj.DetailList[k].STAFF_ID_NAME) {
          alert("请选择人员")
          return false;
        }

        if (!this.modelObj.DetailList[k].REASON_TYPE_ID) {
          alert("请选择事由")
          return false;
        }
        this.modelObj.DetailList[k].DISPLAY_INDEX = display_index++;
      }
      return result
    },
    // 审核
    cmdAudit() {
      this.$confirm('您确定要审核', '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendanceAudit.ashx";
        var strDataJson = JSON5.stringify({
          ID: this.modelObj.ID
        });
        this.$http.post(url, strDataJson, {
          emulateJSON: true
        }).then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("审核数据失败");
            return false;
          } else {
            this.modelObj.ID = dataJson.Message;
            this.btnDisabled(3);
          }
        }).catch(function(res) {
          console.log(res + "审核数据异常")
        });

      });
    },

    // 添加附件
    cmdUpLoad() {

    },
    //添加明细
    cmdDetailAdd() {
      var listone = {
        ID: "",
        STAFF_ID: "",
        STAFF_ID_NAME: "",
        REASON_TYPE_ID: "",
        REASON_TYPE_ID_NAME: "",
        BEGIN_DATE: "",
        END_DATE: "",
        DAYS: "",
        DISPLAY_INDEX: 0
      };

      if (this.modelObj.DetailList == null)
        this.modelObj.DetailList = [];

      this.modelObj.DetailList.push(listone);
      // listone{}
    },
    //查看详情
    cmdLinkLook(item) {
      this.isShowEdit = true;
      this.clearModelObj();
      var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendanceGet.ashx?ID=" + item.ID;
      this.$http.get(url)
        .then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("获取详情数据失败");
            return false;
          }
          this.modelObj = dataJson.Message;

          if (this.modelObj.DetailList == null || this.modelObj.DetailList.length == 0) {
            this.cmdDetailAdd();
          }

          // if(this.modelObj.FINANCE_CYCLE!=""){
          // 	for(var i=0;i<this.yearMonthList.length;i++)
          // 	{
          // 		if(this.yearMonthList[i].K.indexOf(this.modelObj.FINANCE_CYCLE)<0)
          // 		{
          // 			this.yearMonthList.push({K:this.modelObj.FINANCE_CYCLE,V:this.modelObj.FINANCE_CYCLE});
          // 		}
          // 	}
          // }

          this.btnActive.isSave = true; //保存禁用
          this.btnActive.isDetailAdd = true; //明细添加禁用
          this.btnActive.isDetailLinkRemove = true; //明细删除禁用
          this.btnActive.isSubmit = true;

          if (this.modelObj.STATE == 2 && this.userMsg.ControlBar.IsAudit == 1) { //审核禁用
            this.btnActive.isAudit = false;
          } else {
            this.btnActive.isAudit = true;
          }
        }).catch(function(res) {
          console.log(res + "获取详情数据异常")
        });
    },
    //编辑详情
    cmdLinkEdit(item, act) {
      this.isShowEdit = true;
      this.clearModelObj();
      var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendanceGet.ashx?ID=" + item.ID;
      this.$http.get(url)
        .then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("获取详情数据失败");
            return false;
          }
          this.modelObj = dataJson.Message;
          if (act == "Save") {
            alert("保存成功!");
          } else if (act == "Submit") {
            alert("提交成功!");
          }
          console.log(this.modelObj)
          if (this.modelObj.DetailList == null || this.modelObj.DetailList.length == 0) {
            this.cmdDetailAdd();
          }
          // if(this.modelObj.FINANCE_CYCLE!=""){
          // 	for(var i=0;i<this.yearMonthList.length;i++)
          // 	{
          // 		if(this.yearMonthList[i].K.indexOf(this.modelObj.FINANCE_CYCLE)<0)
          // 		{
          // 			this.yearMonthList.push({K:this.modelObj.FINANCE_CYCLE,V:this.modelObj.FINANCE_CYCLE});
          // 		}
          // 	}
          // }
          // console.log(this.modelObj.FINANCE_CYCLE);
          if (this.modelObj.STATE == 1 && this.userMsg.ControlBar.IsEdit == 1) {
            this.btnActive.isSave = false; //保存禁用
            this.btnActive.isDetailAdd = false; //明细添加禁用
            this.btnActive.isDetailLinkRemove = false; //明细删除禁用
          } else {
            this.btnActive.isSave = true; //保存禁用
            this.btnActive.isDetailAdd = true; //明细添加禁用
            this.btnActive.isDetailLinkRemove = true; //明细删除禁用
          }

          if (this.modelObj.STATE == 1 && this.userMsg.ControlBar.IsSubmit == 1) { //提交禁用
            this.btnActive.isSubmit = false;
          } else {
            this.btnActive.isSubmit = true;
          }

          if (this.btnActive.isSubmit && this.modelObj.STATE == 2 && this.userMsg.ControlBar.IsAudit == 1) { //审核禁用
            this.btnActive.isAudit = false;
          } else {
            this.btnActive.isAudit = true;
          }
        }).catch(function(res) {
          console.log(res + "获取详情数据异常")
        });
    },
    //列表主数据删除
    cmdLinkRemove(item, index) {
      this.$confirm('您确定要删除', '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendanceDel.ashx";
        var ids = "['" + item.ID + "']";
        this.$http.post(url, ids, {
            emulateJSON: true
          })
          .then(function(res) {
            var dataJson = res.body;
            if (dataJson.Succeed != 1) {
              if (dataJson.Message != null) {
                alert(dataJson.Message);
              }
              console.log("删除主表数据失败");
              return false;
            }
            this.cmdSearchList();

          }).catch(function(res) {
            console.log(res + "删除主表数据异常")
          });
      });
    },
    //列表明细数据删除
    cmdDetailLinkRemove(item, index) {
      var list = this.modelObj.DetailList;
      if (item.ID != undefined && item.ID != "") {
        var ids = "['" + item.ID + "']";
        var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendanceDetailDel.ashx";
        this.$http.post(url, ids, {
            emulateJSON: true
          })
          .then(function(res) {
            var dataJson = res.body;
            if (dataJson.Succeed != 1) {
              if (dataJson.Message != null) {
                alert(dataJson.Message);
              }
              console.log("删除明细数据失败");
              return false;
            }
            list.splice(index, 1);
            if (list.length == 0) {
              this.cmdDetailAdd();
            }

          }).catch(function(res) {
            console.log(res + "删除明细数据异常")
          });
      } else {
        if (list.length > 1) {
          list.splice(index, 1);
        }
      }
    },
    // 导出
    cmdDetailExpExcel() {

    },

  },
  //初始化
  created() {
    this.getMonths();
    var userParam = "?pageName=modules/VUE/index.html@/hrm_attendance";
    var userUrl = this.common.baseNodeUrl + "Srv_SystemUserMsg.ashx" + userParam;
    this.$http.get(userUrl)
      .then(function(res) {
        var dataJson = res.body;
        if (dataJson.Succeed != 1) {
          this.userMsg = {};
          if (dataJson.Message != null) {
            alert(dataJson.Message);
          }
          console.log("获取用户数据失败");
          return false;
        }
        this.userMsg = dataJson.Message;
        this.btnUserDisabled(this.userMsg.ControlBar);

        this.cmdSearchList();

      }).catch(function(res) {
        console.log(res + "获取用户数据异常")
      });

    var dropObj = {
      tabName: "COM_TYPE",
      viewName: "NAME"
    };
    var dropParam = this.common.comGetParam("PARENT_ID='HRM_LY1003'", dropObj);
    var dropUrl = this.common.baseNodeUrl + "Srv_DropDownList.ashx" + dropParam;
    this.$http.get(dropUrl)
      .then(function(res) {
        var dataJson = res.body;
        if (dataJson.Succeed != 1) {
          this.detailTypeList = [];
          if (dataJson.Message != null) {
            alert(dataJson.Message);
          }
          console.log("获取事由数据失败");
          return false;
        }
        var msgObj = JSON5.parse(dataJson.Message);
        this.detailTypeList = msgObj;
      }).catch(function(res) {
        console.log(res + "获取事由数据异常")
      });

  },
  mounted() {

  },
}
</script>
<style scoped>
	.content {
		background: #ffffff;
		width: 1113px;
		height: 921px;
	}

	.infoPlace {
		/* width: 100%; */
		height: 46px;
		border-bottom: 1px solid #ebf2f6;
		line-height: 46px;
		padding-left: 22px;
	}

	.infoo {
		padding-left: 22px;
	}

	#vacation {
		position: relative;
	}

	.checked {
		border: none;
		position: absolute;
		top: 26px;
		left: 39px;
		letter-spacing: 3px;
		padding-left: 6px;
		color: #5d89b3;
		outline-style: none;
	}

	.calendar {
		display: inline-block;
		width: 13px;
		height: 13px;
		background: url("images/icon_date.png");
		position: absolute;
		top: 28px;
		left: 18px;
	}

	.cover {
		width: 17px;
		height: 17px;
		position: absolute;
		top: 27px;
		left: 128px;
		background-color: #fff;
	}

	.line {
		height: 1px;
		width: 9px;
		background-color: #5d89b3;
		position: absolute;
		top: 15px;
		left: 78px;
	}

	.triangle {
		position: absolute;
		top: 38px;
		right: 282px;
		width: 0;
		height: 0;
		border-top: 4px solid #5d89b3;
		border-left: 3px solid transparent;
		border-bottom: 4px solid transparent;
		border-right: 3px solid transparent
	}

	.up {
		position: absolute;
		top: 27px;
		right: 282px;
		width: 0;
		height: 0;
		border-left: 3px solid transparent;
		border-right: 3px solid transparent;
		border-bottom: 4px solid #5d89b3;
		border-top: 4px solid transparent;
	}

	.inforight {
		background: #ffffff;
		border: 1px solid #ebf2f6;
		box-shadow: -5px 0 5px 0 rgba(235, 242, 246, 0.80);
		width: 100px;
		height: 873px;
		position: relative;
	}

	.arrleft {
		width: 22px;
		height: 42px;
		background: url("images/展开icon.png");
		position: absolute;
		top: 370px;
		margin-bottom: 21px;
		display: block;
	}

	.arrright {
		width: 22px;
		height: 42px;
		background: url("images/收起.png");
		position: absolute;
		top: 370px;
		margin-bottom: 21px;
	}

	.compile {
		padding-left: 50px;
		background: #ffffff;
		border: 1px solid #ebf2f6;
		box-shadow: -5px 0 5px 0 rgba(235, 242, 246, 0.80);
		width: 1120px;
		/* height: 873px; */
		position: absolute;
		left: -1000px;
		top: 0px;
		padding-bottom: 150px;
	}

	.compile li a {
		display: block;
		background: #fff;
		border-radius: 100px;
		width: 90px;
		height: 30px;
		line-height: 30px;
		text-decoration: none;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #5d89b3;
		text-align: center;
		margin-left: 38px;
		position: relative;
		border: 1px solid #5d89b3;
		margin-top: 20px;
		/* cursor: not-allowed */
	}

	.compile li .cheaked {
		background: #5d89b3;
		border-radius: 100px;
		width: 90px;
		height: 30px;
		color: #fff;
	}

	.compile-top {
		padding-left: 20px;
	}

	.input {
		margin-top: 40px;
		padding-left: 66px;
		color: #5d89b3;
		text-align: left;
	}

	.input span {
		display: inline-block;
		text-align: right;
		width: 100px;
	}

	.input input {
		border: 1px solid #ebf2f6;
		border-radius: 3px;
		width: 422px;
		height: 36px;
		margin-bottom: 10px;
		margin-left: 25px;
	}

	.compile-bottom li button {
		position: relative;
		border: none;
		color: #999999
	}

	.el-button[data-v-9f7e3c1c] {
		width: 112px;
	}

	.compile-bottom li .active {
		color: #5d89b3;
	}

	.compile-bottom li button e {
		display: block;
		position: absolute;
		top: 11px;
		left: -12px;
	}

	.add {
		width: 13px;
		height: 12px;
		background: url("images/添加icon02.png");
	}

	.kaoqin {
    width: 10px;
    height: 12px;
    background: url("images/生成icon_01.png");
}

.daoru {
    width: 11px;
    height: 13px;
    background: url("images/导入icon01.png");
}

.daochu {
    width: 11px;
    height: 13px;
    background: url("images/导出icon01.png");
}

	.fujian {
		width: 13px;
		height: 15px;
		background: url("images/附件icon_01.png");
		left: 5px;
	}

	.bottomtable {
		background: #f5f8fa;
		border: 1px solid #5d89b3;
		border-radius: 3px 3px 0 0;
		width: 558px;
		height: 48px;
	}

	.mask {
		position: absolute;
		top: 47px;
		filter: alpha(opacity=60);
		background-color: #777;
		z-index: 1002;
		left: 20px;
		opacity: 0.2;
		-moz-opacity: 0.5;
		height: 878px;
		width: 350px;
	}

	.infolinfoleft {
		width: 87%;
	}

	.r-t-head th {
		position: relative;
	}

	.r-t-head em {
		width: 8px;
		height: 8px;
		display: block;
		background: url('images/排序icon_02.png');
		position: absolute;
		top: 20px;
		right: 13px;
	}

	.inquire {
		background: url('images/查询icon01.png');
	}

	.addmingxi td {
		text-align: center;
		width: 12.5%
	}

	#tbodyinput input {
		border: 1px solid #dddddd;
		    height: 26px;
		    text-align: center;
		    width: 118px;
		    border-radius: 4px;
		/*padding-left: 28px;*/
	}

	/*.el-input {
		border: none;
		border-radius: 3px;
		width: 424px;
		height: 36px;
		margin-bottom: 15px;
		margin-left: 15px;
		padding-left: 10px;
	}*/

	/*.el-input__inner {
		height: 42px;
		border: 1px solid #ebf2f6;
	}
	*/
	.el-button {
		border-radius: 100px;
		border: 1px solid #5d89b3;
		width: 90px;
		background: #fff;
		color: #5d89b3;
		margin-right: 30px;
		margin-top: 30px;
		margin-left: 40px;
	}

	.bgcgray {
		background: #ccc;
		color: #000;
		opacity: .4;
	}
	.el-button--success {
		margin-left: 50px;
	}

	.el-icon-search::before {
		display: none;
		content: none;
	}

	[class*=" el-icon-"],
	[class^=el-icon-] {
		display: none；
	}

	.el-pagination .btn-prev {
		margin-left: 530px;
	}

	.el-picker-picker {
		width: 300px!important;
		left: 795px!important;
	}

	.searchListDiv {

	}

	.searchListDiv tr{
		height: 30px;
	}
	.searchListDiv table{
		background: #fff;
		border: 1px solid #e1e1e1;
		z-index: 99999;
	}

	.example th,tr{
		height: 48px;
	}

	.searchList {
		/*position: relative;
		top: 1px;
		left: 1px;*/
	}

	.pageDetailStaffClick {
	}

	.tablelist {
		border-collapse: separate;
		border-spacing: 0px 10px;
		margin-right: 30px;
	}

	.el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #48576a;
    position: relative;

    }

    .pageDetailStaffClick[data-v-748c11ac][data-v-748c11ac]{
    	background: #f8f8f8;
    }
    .marginleft{
    	margin-left: 55px;
    }


    .pageDetailStaffClick[data-v-748c11ac] {
		/*position: absolute;*/
		/*bottom: -34px;*/
		/*left: 1px;*/
		padding-right: 109px;
		border: 1px solid #e1e1e1;
		border-top: none;
		z-index: 99999;
	}

   tr>.headth{
   	height:20px;
   }
  /* .example {
    opacity: 1;
	}
	.fold-enter-active, .fold-leave-active,.fold-enterbefore {
	    transition: all .5s;
	}
	.fold-enterbefore{
		  opacity: 0;
	}
	.fold-enter{
		  opacity: 1;
	}
	.fold-leave-active {
	    opacity: 0;
	}
	.el-picker-panel {
		width: 455px!important;
	}
	*/
	.r-t-head{
		border: none;
		background: #f8f8f8;
	}

	.tableli{
		width: 99px;
		line-height: 30px;
		text-align: center;
	}

	.tablehead{
		width: 100%;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		background: #C0C0C0;
	}

	.tablefoot{
		width: 400px;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		background: #C0C0C0;
	}
	.trlistover{
		background: #C0C0C0;
		/*opacity: .8;*/
		transition: all 1s;
	}

	.example {
		width:100%;
		height: 120px;
		overflow-x: hidden;
		overflow-y: auto;
		}
	.spanLinkEdit{
 		color: #E61A0F;
 		cursor: pointer;
 	}

 	.spanLinkRemove{
 		color: #05C400;
 		cursor: pointer;
 	}

 	.spanLinkLook{
 		color: #5d89b3;
 		cursor: pointer;
 	}

	 .el-message-box {
		top: 380px;
		left: 40%;
		position: absolute;
		text-align: left;
		display: inline-block;
		vertical-align: middle;
		background-color: #fff;
		width: 410px;
		border-radius: 3px;
		font-size: 16px;
		overflow: hidden;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		margin-top: -200px;
	}

.month{
	outline: 1px solid #ccc;
	margin-left: 25px;
	height: 36px;
	width: 402px;
	padding-left: 10px;
}
</style>
