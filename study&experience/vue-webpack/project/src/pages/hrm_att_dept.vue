<template>
	<div @click="searchBoxListHidden">
		<div class="content">
			<div class="infoPlace ">
				您所在的位置是：
				<span>人事管理 / 考勤科室管理</span>
			</div>
			<div class="infoo">
				<div class="infolinfoleft fl">
					<div class="infoTitle ">
						<div class="roster">
							<span>|</span>&nbsp;考勤科室管理</div>
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
									<a href="javascript:void(0)">
										<e class="inquire"></e>
										查询</a>
								</li>
								<li class="fl">
									<a href="javascript:void(0)">
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
									<th class="first-td">科室名称
										<em style="right:38px"></em>

									</th>
									<th>是否打考勤
										<em style="right:50px"></em>
									</th>
									<th>备注
										<em style="right:55px"></em>
									</th>
									<th>操作
									</th>
								</tr>
							</thead>
							<tbody id="tbody">
								<tr v-for="(item,index) in tableResultList">
									<td>{{item.DEPT_ID_NAME}}</td>
									<td>{{item.IS_ATTENDANCE_NAME}}</td>
									<td>{{item.COMMENTS}}</td>
									<td>
										<span class="spanLinkLook" v-show="viewLook()" @click="cmdLinkLook(item)">查看</span>
										<span class="spanLinkEdit" v-show="viewEdit()" @click="cmdLinkEdit(item,'')">编辑</span>
										<span v-show="viewSpan" style="font-size: 16px;">/</span>
										<span class="spanLinkRemove" v-show="viewRemove()" @click="cmdLinkRemove(item,index)">删除</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="infoBottom clearfix">
						<div class="block">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableResultList.total">
							</el-pagination>
						</div>
					</div>
				</div>

				<div class="inforight fr" style="height:873px">
					<div class="arrleft" @click='viewOpen' v-show="!isShowEdit">
					</div>
					<div class="compile" v-show="isShowEdit">
						<div class="arrright" @click='viewClose' v-show="isShowEdit">
						</div>
						<div class="compile-top">
							<div class="block">
								<span class="wrapper">
									<el-button type="success" :class="{bgcgray: btnActive.isAdd}" :disabled="btnActive.isAdd" @click="cmdAdd();">添加
									</el-button>
									<el-button type="warning" :class="{bgcgray:btnActive.isSave}" :disabled="btnActive.isSave" @click="cmdSave">保存
									</el-button>
								</span>
							</div>
							<div class="input">
								<p>

									<span>科室名称：</span>
									<input v-model="modelObj.DEPT_ID_NAME" @input="searchDeptDataChange" type="text" style="margin-left:30px" />
									<!-- <searchBoxDept :inputValue="modelObj.DEPT_ID_NAME" v-on:selectBox="selectBoxObj"></searchBoxDept> -->
									<!-- <div v-show="isDetailBoxDept" @click.stop="pageDetailStaffClick" style="position: absolute;z-index:10;width:38%;" class="text-center">
										<div class="tablehead" style="padding:10px 0">
											<el-row>
												<el-col :span="12">
													<span>序号</span>
												</el-col>
												<el-col :span="12">
													<span>部门</span>
												</el-col>
											</el-row>
										</div>

										<div style="" class="searchListDiv example">
											<table border="1" align="center" class="searchList">
												<tbody>
													<tr @click="selectDetailDept(item);" @mouseover="boxMouseOver(index)" @mouseout="boxMouseOut(index)" :class="{'trlistover': boxMouseOverbgc===index}" v-for="(item ,index) in searchDetailStaffDataList.rows">
														<td width="49%">{{currentDetailPageStaff==1?index+1:index+1+((currentDetailPageStaff-1)*currentDetailPageSizeStaff)}}</td>
														<td width="49%">{{item.NAME}}</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="tablefoot" style="width:100%">
											<div class="block pageDetailStaffClick" @click.stop="pageDetailStaffClick">
												<el-pagination @size-change="handleSizeChangeDetailStaff" @current-change="handleCurrentChangeDetailStaff" :current-page.sync="currentDetailPageStaff" :page-size="currentDetailPageSizeStaff" layout="total,prev, next, jumper" :total="searchDetailStaffDataList.total">
												</el-pagination>
											</div>
										</div>
									</div> -->
								</p>
								<p>
									<span>是否考勤：</span>
									<select class="kaoqinselect" v-model="modelObj.IS_ATTENDANCE">
										<option value="item.value" v-for="item in isList">{{item.name}}</option>
									</select>
									<br></p>
								<p>
									<span>备注：</span><input v-model="modelObj.COMMENTS" :disabled="isDisabledInput" type="text" style="margin-left:30px;height: 99px;"></p>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		<!-- <div id="mask" class="mask" v-show="isShowEdit"></div> -->
	</div>
</template>
<script>
import { format, compareAsc } from 'date-fns'
import JSON5 from 'json5'
import datepicker from './subcom/datepicker.vue';
// import searchBoxDept from './subcom/searchBoxDept.vue';
export default {
	components: {
		datepicker,
		// searchBoxDept,
	},
	data() {
		return {
			pickerOptions0: {
				disabledDate(time) {
					//					     return time.getTime() < Date.now() - 8.64e7;
				}
			},
			tableFootBottom: 60,
			paramCk: "code",
			paramText: "",
			txtValue:"开发工程师11111",
			btnActive: {
				isAdd: false,  //添加禁用
				isSave: false,  //保存禁用
				isLinkEdit: false,//编辑禁用
				isLook: false,//查看禁用
				isLinkRemove: false,//删除禁用
				isSubmit: false,//提交禁用
				isAudit: false,//审核禁用
				isDetailAdd: false,//明细添加禁用
				isDetailLinkRemove: false,//明细删除禁用
			},
			isDisabledInput: false,
			isList: [
				{ value: 1, name: "是" }, { value: 2, name: "否" }
			],
			querySelectorList: [{
				id: "deptName",
				name: "科室"
			},
			{
				id: "isAttendanceName",
				name: "是否考勤"
			}
			],//列表查询条件
			modelObj: {
				ID: "",
				DEPT_ID: "",
				IS_ATTENDANCE: "",
				IS_ATTENDANCE_NAME: "",
				DEPT_ID_NAME: "123123",
				COMMENTS: "",
			},//主数据保存
			userMsg: {},//用户登录信息及按钮权限
			isShowEdit: false,//编辑列表视图切换
			pageSize: 10,//列表主数据页数大小
			currentPage: 1,//列表主数据当前页数
			tableResultList: { total: 0, rows: [] },//主表列表数据
		}
	},
	// filters: {
	// },
	methods: {
		//隐藏列表删除按钮
		viewRemove() {
			let isView = false;
			if (!this.btnActive.isLinkRemove) {
				isView = true;
			}

			return isView;
		},
		//隐藏列表编辑按钮
		viewEdit() {
			let isView = false;
			if (!this.btnActive.isLinkEdit) {
				isView = true;
			}
			return isView;
		},
		//隐藏列表查看按钮
		viewLook() {
			let isView = false;
			if (!this.btnActive.isEdit || !this.btnActive.isSubmit || !this.btnActive.isAudit) {
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
			this.paramText = "";
			this.cmdSearchList();
		},
		//
		selectBoxObj(obj) {
			console.log(obj);
		},
		searchBoxListHidden(){

		},
		/*部门弹出开始*/
		selectDetailDept(item) {
			this.modelObj.DetailList[this.boxIndex].TO_DEPT_ID = item.ID;
			this.modelObj.DetailList[this.boxIndex].TO_DEPT_ID_NAME = item.NAME;
			this.boxIndex = -1;
			this.isBoxDept = false;
			this.boxChangeValue = "";
		},
		//弹出点击阻止隐藏
		pageDetailDeptClick() {
			if (this.boxIndex != -1) {
				this.isBoxDept = true;
			}
		},
		//输入改变值
		searchDeptDataChange(index, event) {
			if (!this.modelObj.DEPT_ID_NAME.replace(/(^\s*)|(\s*$)/g, '')) {
				this.isBoxDept = false;
				return;
			}
			// this.modelObj.DetailList[index].TO_DEPT_ID="";
			this.boxIndex = index;
			this.isDetailBoxStaff = false;
			this.isDetailBoxPostion = false;
			this.isBoxDept = true;
			this.topBox = -event.srcElement.parentNode.offsetHeight * (this.modelObj.DetailList.length - index - 1);
			this.boxChangeValue = this.modelObj.DEPT_ID_NAME;
			this.currentPageSizeDept = 1;
			this.searchDetailDeptList();
		},
		//点击页数事件
		handleCurrentChangeDetailDept(val) {
			this.currentPageSizeDept = val = 0 ? 1 : val;
			this.searchDetailDeptList();
		},
		//查询请求
		searchDetailDeptList() {
			// var paramObj = {
			// 	tabName: "COM_DEPART",
			// 	valueField: "ID",
			// 	nameField: "NAME",
			// 	nameValue: "NAME",
			// 	keyWord: this.boxChangeValue
			// };

			// var param = this.common.comPagingParam(this.currentPageSizeDept, this.currentPageSizeDept, "", paramObj);
			// var url = this.common.baseNodeUrl + "Srv_ComBoxList.ashx" + param
			// this.$http.get(url)
			// 	.then(function(res) {
			// 		var dataJson = res.body;
			// 		if (dataJson.Succeed != 1) {
			// 			this.searchBoxDeptDataList = [];
			// 			if (dataJson.Message != null) {
			// 				alert(dataJson.Message);
			// 			}
			// 			console.log("获取部门数据失败");
			// 		}
			// 		var msgObj = eval('(' + dataJson.Message + ')');
			// 		this.searchBoxDeptDataList = msgObj;
			// 	}).catch(function(res) {
			// 		console.log(res + "获取部门数据异常")
			// 	});
		},
		/*部门弹出结束*/
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
		searchBoxDeptDataList: {
			total: 0, rows: [
				{ ID: "2", NAME: "开发部" },
				{ ID: "3", NAME: "销售部" },
				{ ID: "2", NAME: "开发部" },
				{ ID: "3", NAME: "销售部" },
				{ ID: "2", NAME: "开发部" }
			]
		},
		currentPageSizeDept: 1,//box部门当前页数
		currentPageSizeDept: 5,//box部门页数大小
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
			this.btnActive.isLinkEdit = isEdit;//编辑禁用
			this.btnActive.isLook = isLook;//查看禁用
			this.btnActive.isLinkRemove = isLinkRemove;//删除禁用
			this.btnActive.isSubmit = isSubmit;//提交禁用
			this.btnActive.isAudit = isAudit;//审核禁用
			this.btnActive.isDetailAdd = isDetailAdd;//明细添加禁用
			this.btnActive.isDetailLinkRemove = isDetailLinkRemove;//明细删除禁用

		},
		//清空数据
		clearModelObj() {
			var thisDate = Date.now();
			this.modelObj = {
				ID: "",
				DEPT_ID: "",
				IS_ATTENDANCE: "",
				IS_ATTENDANCE_NAME: "",
				DEPT_ID_NAME: "",
				COMMENTS: "",
			}

			// if (this.userMsg.ControlBar.IsReadonly != 1) {
			// 	this.btnActive.isSave = false;
			// 	this.btnActive.isAudit = true;
			// 	if (this.userMsg.ControlBar.IsSubmit != 1) {
			// 		this.btnActive.isSubmit = true;
			// 	} else {
			// 		this.btnActive.isSubmit = false;
			// 	}
			// 	this.isDisabledInput = false;
			// 	this.btnActive.isDetailAdd = false;
			// 	this.btnActive.isDetailLinkRemove = false;
			// }
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

			var param = this.common.orderComPagingParam(this.currentPage, this.pageSize, "IS_ATTENDANCE", "DESC", "", paramObj);
			var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendDeptList.ashx" + param
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
					console.log(res + "查询列表数据异常");
				});
			// var obj = {Succeed:1,Message:{total:1,rows:[{ID:"420aaccf-3e79-4a6e-b0de-716329928132",CODE:"Trn-170527-00045",NAME:null,USER_ID:"1                                   ",USER_ID_NAME:"系统管理员",DEPT_ID:"10001                               ",DEPT_ID_NAME:"信息科",ADJUST_CODE:"10001",EFFECT_DATE:"2017-09-30",CREATE_DATE:"2017-09-29",SUMARRY:"人员调整",CREATE_TIME:"2017-09-29",STATE:1,STATE_NAME:"编辑中"}]}};
			// this.tableResultList = obj.Message;
		},
		//保存
		cmdSave() {
			var isErr = this.saveIn();
			if (!isErr)
				return
			var strDataJson = JSON5.stringify(this.modelObj);
			var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendDept.ashx";
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
		//保存判断
		saveIn() {
			var result = true;
			if (!this.modelObj.DEPT_ID_NAME) {
				alert("请选择科室名称")
				return false;
			}
			if (!this.modelObj.IS_ATTENDANCE_NAME) {
				alert("请填入是否考前")
				return false;
			}
			return result
		},

		// 打印
		cmdPrint() {
			this.$confirm('您确定要打印', '是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				alert(1);
			}).catch(function(response) {
				console.log(response)
			});
		},
		// 添加附件
		cmdUpLoad() {

		},
		//查看详情
		cmdLinkLook(item) {
			this.isShowEdit = true;
			this.clearModelObj();
			var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendDeptGet.ashx?ID=" + item.ID;
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

					this.btnActive.isSave = true;//保存禁用
					this.btnActive.isDetailAdd = true;//明细添加禁用
					this.btnActive.isDetailLinkRemove = true;//明细删除禁用
					this.btnActive.isSubmit = true;

					if (this.userMsg.ControlBar.IsAudit == 1) {//审核禁用
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
			var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_TransferGet.ashx?ID=" + item.ID;
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

					if (this.userMsg.ControlBar.IsEdit == 1) {
						this.btnActive.isSave = false;//保存禁用
						this.btnActive.isDetailAdd = false;//明细添加禁用
						this.btnActive.isDetailLinkRemove = false;//明细删除禁用
					} else {
						this.btnActive.isSave = true;//保存禁用
						this.btnActive.isDetailAdd = true;//明细添加禁用
						this.btnActive.isDetailLinkRemove = true;//明细删除禁用
					}

					if (this.userMsg.ControlBar.IsSubmit == 1) {//提交禁用
						this.btnActive.isSubmit = false;
					} else {
						this.btnActive.isSubmit = true;
					}

					if (this.btnActive.isSubmit && this.userMsg.ControlBar.IsAudit == 1) {//审核禁用
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

				var url = this.common.baseNodeUrl + "hrm/atd/Srv_HRM_AttendDeptDel.ashx";
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
						var list = this.tableResultList.rows;
						list.splice(index, 1);

					}).catch(function(res) {
						console.log(res + "删除主表数据异常")
					});
			});
		},

	},
	//初始化
	created() {

		// var userParam = "?pageName=modules/VUE/index.html@/hrm_att_dept";
		// var userUrl = this.common.baseNodeUrl + "Srv_SystemUserMsg.ashx" + userParam;
		// this.$http.get(userUrl)
		// 	.then(function(res) {
		// 		var dataJson = res.body;
		// 		if (dataJson.Succeed != 1) {
		// 			this.userMsg = {};
		// 			if (dataJson.Message != null) {
		// 				alert(dataJson.Message);
		// 			}
		// 			console.log("获取用户数据失败");
		// 			return false;
		// 		}
		// 		this.userMsg = dataJson.Message;
		// 		this.btnUserDisabled(this.userMsg.ControlBar);

		// 		this.cmdSearchList();

		// 	}).catch(function(res) {
		// 		console.log(res + "获取用户数据异常")
		// 	});

	},
	mounted() {

	},
}
</script>
<style scoped>
.text-center{
	text-align: center;
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
.example {
width:100%;
height: 120px;
overflow-x: hidden;
overflow-y: auto;
}
	.tablehead{
width: 100%;
border-left: 1px solid #ccc;
border-right: 1px solid #ccc;
background: #C0C0C0;
}
.tablefoot{
width: 100%;
border-left: 1px solid #ccc;
border-right: 1px solid #ccc;
background: #C0C0C0;
}
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
	left: 119px;
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
	top: 37px;
	right: 293px;
	width: 0;
	height: 0;
	border-top: 4px solid #5d89b3;
	border-left: 3px solid transparent;
	border-bottom: 4px solid transparent;
	border-right: 3px solid transparent
}

.up {
	position: absolute;
	top: 26px;
	right: 293px;
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
.block{
	margin: 30px 0;
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
	background: #ffffff;
	border: 1px solid #ebf2f6;
	box-shadow: -5px 0 5px 0 rgba(235, 242, 246, 0.80);
	width: 1120px;
	/* height: 873px; */
	position: absolute;
	left: -1000px;
	top: 0px;
	padding-bottom: 150px;
	height: 83%;
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
	padding-left: 180px;
}

.input {
	margin-left: -30px;
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
	width: 57px;
	height: 48px;
	border: none;
	outline: none;
	outline-style: none;
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
}

.bgcgray {
	background: #ccc;
	color: #000;
	opacity: .4;
}

.el-button--success {
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
	position: relative;
	z-index: 9999;
}

.searchListDiv tr {
	height: 30px;
}

.searchListDiv table {
	background: #fff;
	border: 1px solid #e1e1e1;
	z-index: 99999;
}

.example th,
tr {
	height: 48px;
}

.searchList {
	position: relative;
	top: 1px;
	left: 1px;
}


.pageDetailStaffClick[data-v-748c11ac][data-v-748c11ac] {
	background: #f8f8f8;
}

.pageDetailStaffClick[data-v-748c11ac] {
	padding-right: 109px;
	border: 1px solid #e1e1e1;
	border-top: none;
	z-index: 99999;
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

.marginleft {
	margin-left: 55px;
}


tr>.headth {
	height: 20px;
}

.r-t-head {
	border: none;
	background: #f8f8f8;
}

.tableli {
	width: 99px;
	line-height: 30px;
	text-align: center;
}

.tablehead {
	position: absolute;
	top: -28px;
	left: 80px;
	border-left: 10px solid #C0C0C0;
	border-right: 13px solid #C0C0C0;
	background: #C0C0C0;
}

.showTable{
	margin-top: 18px;
	margin-left: 50px;
}

.tablefoot {
	width: 400px;
	position: absolute;
	left: 80px;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
	background: #C0C0C0;
	/* bottom: 32px; */
}


.trlistover {
	background: #C0C0C0;
	/*opacity: .8;*/
	transition: all 1s;
}

.example {
	width: 401px;
	max-height: 185px;
	margin-left: 80px;
	margin-top: 30px;
	overflow-x: hidden;
	overflow-y: scroll;
}

.spanLinkEdit {
	color: #E61A0F;
	cursor: pointer;
}

.spanLinkRemove {
	color: #05C400;
	cursor: pointer;
}

.spanLinkLook {
	color: #5d89b3;
	cursor: pointer;
}


.el-message-box {
	position: absolute;
	top: 200px;
	left: 40%;
	text-align: left;
	display: inline-block;
	vertical-align: middle;
	background-color: #fff;
	width: 420px;
	border-radius: 3px;
	font-size: 16px;
	overflow: hidden;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}

.infoBottom {
	position: relative;
}

.kaoqinselect{
	margin-bottom: 10px;
	width: 424px;
	height: 40px;
	margin-left: 26px;
	outline-style: none;
	border: 1px solid #ebf2f6;
}

</style>
