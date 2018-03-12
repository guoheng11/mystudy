<template>
<div >
  <div class="content">
    <div class="infoPlace ">
      您所在的位置是：
      <span>人事管理 / 合同管理</span>
    </div>
    <div class="infoo">
      <div class="infolinfoleft fl">
        <div class="infoTitle ">
          <div class="roster">
            <span>|</span>&nbsp;合同管理</div>
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
            </ul>
          </div>

        </div>
        <div style="min-height: 660px;">
          <table border="0" cellspacing="1" cellpadding="10" align="center" i d="dataGridTableJson" class="table " style="border-collapse:separate;border-spacing: 0px 10px;margin-right:30px;">
            <thead>
              <tr class="r-t-head">
                <th class="first-td">姓名
                  <em style="right:20px"></em>

                </th>
                <th>合同类型
                  <em style="right:40px"></em>
                </th>
                <th>合同期限
                  <em style="right:40px"></em>
                </th>
                <th>到期日期
                  <em style="right:40px"></em>
                </th>
                <th>状态
                  <em style="right:20px"></em>
                </th>
                <th>操作
                </th>

              </tr>
            </thead>
            <tbody id="tbody">
              <tr v-for="(item,index) in tableResultList.rows">
                <td>{{item.STAFF_ID_NAME}}</td>>
                <td>{{item.TYPE_ID_NAME}}</td>
                <td>{{item.LIMIT_ID_NAME}}</td>
                <td>{{item.DISABLE_DATE}}</td>
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
          </div>
        </div>
      </div>
      <div class="inforight fr">
        <div class="arrleft" @click='viewOpen();' v-show="!isShowEdit">
        </div>
        <div class="compile" v-show="isShowEdit" @click="alert('a');">
          <div class="arrright" @click='viewClose();' v-show="isShowEdit">
          </div>
          <div class="compile-top">
            <ul class="clearfix" style="margin-top: 66px">
              <li class="fl">
                <a class="cheaked" href="javascript:void(0)">

										添加</a>
              </li>
              <li class="fl">
                <a href="javascript:void(0)" @click="cmdSave">

										保存</a>
              </li>
              <li class="fl">
                <a href="javascript:void(0)" @click="cmdSubmit">

										提交</a>
              </li>
              <li class="fl">
                <a href="javascript:void(0)" @click="cmdAudit">

										审核</a>
              </li>
            </ul>
            <div class="input">
              <p>
                <span>姓名：</span><input type="text" @input="" @click='isDetailBoxStaff=true' @blur='isDetailBoxStaff=false'
								 v-model="modelObj.STAFF_ID_NAME">
                <div v-show="isDetailBoxStaff" @click.stop="pageDetailStaffClick"
								style="position: absolute;z-index:10;width:38%;margin-left:14%;margin-top:-10px" class="text-center">
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
                          <td width="24%">{{currentDetailPageStaff==1?index+1:index+1+((currentDetailPageStaff-1)*currentDetailPageSizeStaff)}}</td>
                          <td width="24%">{{item.NAME}}</td>
                          <td width="24%">{{item.DEPT_NAME}}</td>
                          <td width="24%">{{item.POSTION_NAME}}</td>
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
                </div>

                <span>生效日期：</span><input type="text" v-model="modelObj.ENABLE_DATE"><br></p>
              <p>
                <span>合同名称：</span><input type="text" v-model="modelObj.NAME">
                <span>到期日期：</span><input type="text" v-model="modelObj.DISABLE_DATE"><br></p>
              <p>
                <span>合同文号：</span><input type="text" v-model="modelObj.CODE">
                <span>试用类型：</span><select v-model="modelObj.PERIOD_TYPE_ID" class="inputselect" style="margin-left:10px">
										<!-- <option v-for="(item,index) in querySelectorList" :value="item.id">{{item.name}} -->
									</select>
                <br></p>
              <p>
                <span>合同状态：</span> <select v-model="modelObj.STATE_ID" class="inputselect" style="margin-left:7px">
										<!-- <option v-for="(item,index) in querySelectorList" :value="item.id">{{item.name}} -->
									</select>
                <span>开始日期：</span><input type="text" v-model="modelObj.TRIAL_BEGIN_DATE"><br></p>
              <p>
                <span>合同类型：</span><select v-model="modelObj.TYPE_ID" class="inputselect" style="margin-left:10px">
										<!-- <option v-for="(item,index) in querySelectorList" :value="item.id">{{item.name}} -->
									</select>
                <span>结束日期：</span><input type="text" v-model="modelObj.TRIAL_END_DATE"><br></p>
              <p>
                <span>合同期限：</span>
                <select v-model="modelObj.LIMIT_ID" class="inputselect" style="margin-left:7px">
										<!-- <option v-for="(item,index) in querySelectorList" :value="item.id">{{item.name}} -->
									</select>
                <span>签订日期：</span><input type="text" v-model="modelObj.SIGN_DATE"><br></p>
              <p>
                <span>聘用岗位：</span><select v-model="modelObj.STATION_ID" class="inputselect" style="margin-left:10px">
										<!-- <option v-for="(item,index) in querySelectorList" :value="item.id">{{item.name}} -->
									</select>
                <span>聘用日期：</span><input type="text" v-model="modelObj.ENGAGE_DATE"><br></p>
              <p class="only first">
                <span>聘用部门（仅事业编）：</span>
								<input type="text" v-model="modelObj.DEPT_ID" style="" @input='isDeptList=true' @blur='isDeptList=false' >
                <div v-show="isDeptList" @click.stop="pageDetailStaffClick"
								style="position: absolute;z-index:10;width:42%;margin-left:14.5%;margin-top:-10px" class="text-center">
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
                          <td width="24%">{{currentDetailPageStaff==1?index+1:index+1+((currentDetailPageStaff-1)*currentDetailPageSizeStaff)}}</td>
                          <td width="24%">{{item.NAME}}</td>
                          <td width="24%">{{item.DEPT_NAME}}</td>
                          <td width="24%">{{item.POSTION_NAME}}</td>
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
                </div>
              </p>
              <p class="only">
                <span>聘用职务（仅事业编）：</span><input type="text" v-model="modelObj.ROLE_ID">
								<div v-show="isDeptList" @click.stop="pageDetailStaffClick"
								style="position: absolute;z-index:10;width:42%;margin-left:14.5%;margin-top:-10px" class="text-center">
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
													<td width="24%">{{currentDetailPageStaff==1?index+1:index+1+((currentDetailPageStaff-1)*currentDetailPageSizeStaff)}}</td>
													<td width="24%">{{item.NAME}}</td>
													<td width="24%">{{item.DEPT_NAME}}</td>
													<td width="24%">{{item.POSTION_NAME}}</td>
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
								</div>
							</p>
              <!--<p class="only">
									<span>岗位类别（仅事业编）：</span><input type="text"><br></p>
								<p class="only">
									<span>岗位等级（仅事业编）：</span><input type="text"><br></p> -->
            </div>
          </div>
          <ul class="clearfix compile-bottom" style="padding-left: 150px;margin-top: 10px">
            <li class="fl">
              <a class="active" href="javascript:void(0)">
                <e class="add"></e>
                添加附件</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>

  <div id="mask" class="mask" v-show="isshow"></div>
</div>
</template>

	<script>
    import {format, compareAsc} from 'date-fns'
	import JSON5 from 'json5'
	import datepicker from './subcom/datepicker.vue';
	export default {
		 components:{
         datepicker
    },
		data() {
			return {
				isDeptList:false,
				pickerOptions0: {
					   disabledDate(time) {
//					     return time.getTime() < Date.now() - 8.64e7;
					   }
				},
				paramCk:"code",
				paramText:"",
				boxMouseOverbgc:"", //控制tr高亮
				topBox:0,
				detailBoxIndex:-1,//列表获取数据索引
				isLinkage: false,
				isDetailBoxStaff: false,//人员box控制隐藏
				isDetailBoxDept: false,//部门box控制隐藏
				isDetailBoxPostion: false,//职务box控制隐藏
				detailBoxChangeValue:"",
				btnActive:{
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
				searchDetailStaffDataList: {
					total:0,rows:[
						{ID:"1",NAME:"lis",DEPT_ID:"2",DEPT_ID_NAME:"开发部",POSTION_ID:"3",POSTION_ID_NAME:"开发工程师"},
						{ID:"2",NAME:"zhangs",DEPT_ID:"2",DEPT_ID_NAME:"开发部",POSTION_ID:"4",POSTION_ID_NAME:"前端工程师"},
						{ID:"1",NAME:"lis",DEPT_ID:"2",DEPT_ID_NAME:"开发部",POSTION_ID:"3",POSTION_ID_NAME:"开发工程师"},
						{ID:"2",NAME:"zhangs",DEPT_ID:"2",DEPT_ID_NAME:"开发部",POSTION_ID:"4",POSTION_ID_NAME:"前端工程师"},
						{ID:"1",NAME:"lis",DEPT_ID:"2",DEPT_ID_NAME:"开发部",POSTION_ID:"3",POSTION_ID_NAME:"开发工程师"},
					]
				},//明细人员查询
				searchDetailDeptDataList: {
					total:0,rows:[
						{ID:"2",NAME:"开发部"},
						{ID:"3",NAME:"销售部"},
						{ID:"2",NAME:"开发部"},
						{ID:"3",NAME:"销售部"},
						{ID:"2",NAME:"开发部"}
					]
				},
				searchDetailPostionDataList: {
					total:0,rows:[
						{ID:"3",NAME:"开发工程师"},
						{ID:"4",NAME:"前端工程师"},
						{ID:"3",NAME:"开发工程师"},
						{ID:"4",NAME:"前端工程师"},
						{ID:"3",NAME:"开发工程师"}
					]
				},
				querySelectorList: [{
						id: "code",
						name: "合同文号"
					},
					{
						id: "staffName",
						name: "员工姓名"
					},
					{
						id: "typeName",
						name: "合同类型"
					},
					{
						id: "stateName",
						name: "审核状态"
					}
				],//列表查询条件
				modelObj: {
					ID: "",
					STAFF_ID_NAME:"",
					ENABLE_DATE:"",
					NAME:"",
					DISABLE_DATE:"",
					CODE:"",
					PERIOD_TYPE_ID:"",
					STATE_ID:"",
					ENABLE_DATE:"",
					TYPE_ID:"",
					TRIAL_END_DATE:"",
					LIMIT_ID:"",
					STATION_ID:"",
					SIGN_DATE:"",
					DEPT_ID:"",
					ROLE_ID:"",
					TRIAL_BEGIN_DATE:"",

				},//主数据保存
				userMsg: {},//用户登录信息及按钮权限
				isShowEdit: false,//编辑列表视图切换
				pageSize: 10,//列表主数据页数大小
				currentPage: 1,//列表主数据当前页数
				currentDetailPageStaff:1,//box人员当前页数
				currentDetailPageDept:1,//box部门当前页数
				currentDetailPagePostion:1,//box职务当前页数
				currentDetailPageSizeStaff:5,//box人员页数大小
				currentDetailPageSizeDept:5,//box部门页数大小
				currentDetailPageSizePostion:5,//box职务页数大小
				tableResultList: {total:0,rows:[]},//主表列表数据
				detailTypeList:{total:0,rows:[]},//调动类型对象定义
			}
		},
		// filters: {
		// },
		methods: {
			//弹出Box列表事件背景变灰
			boxMouseOver(index){
				this.boxMouseOverbgc = index
			},
			//弹出Box列表事件背景变白
			boxMouseOut(item){
				this.boxMouseOverbgc = false
			},
			//隐藏列表删除按钮
			viewRemove(state){
				let isView = false;
				if(!this.btnActive.isLinkRemove)
				{
					if(state==1)
						isView = true;
				}

				return isView;
			},
			//隐藏列表编辑按钮
			viewEdit(state){
				let isView = false;
				if(!this.btnActive.isLinkEdit)
				{
					if(state==1)
						isView = true;
				}
				return isView;
			},
			//隐藏列表查看按钮
			viewLook(state){
				let isView = false;
				if(state!=1)
				{
					if(!this.btnActive.isEdit || !this.btnActive.isSubmit || !this.btnActive.isAudit)
					{
						isView = true;
					}
				}
				return isView;
			},
			viewSpan(state){
				let isView = false;
				if(state==1 && !this.btnActive.isLinkRemove)
				{
					isView = true;
				}
				return isView;
			},
			//打开编辑
			viewOpen(){
				this.isShowEdit = !this.isShowEdit;
				this.clearModelObj();
			},
			//关闭编辑
			viewClose(){
				this.isShowEdit = !this.isShowEdit;
				this.paramText = "";
				this.cmdSearchList();
			},
			//点击隐藏弹出Box框
			searchBoxListHidden() {
				this.isDetailBoxStaff = false;
				this.isDetailBoxDept = false;
				this.isDetailBoxPostion = false;
			},
			/*人员弹出开始*/
			selectDetailStaff(item){
				this.modelObj.DetailList[this.detailBoxIndex].STAFF_ID = item.ID;
				this.modelObj.DetailList[this.detailBoxIndex].STAFF_ID_NAME = item.NAME;
				this.modelObj.DetailList[this.detailBoxIndex].DEPT_ID = item.DEPT_ID;
				this.modelObj.DetailList[this.detailBoxIndex].DEPT_ID_NAME = item.DEPT_NAME;
				this.modelObj.DetailList[this.detailBoxIndex].POSTION_ID = item.POSITION_ID;
				this.modelObj.DetailList[this.detailBoxIndex].POSTION_ID_NAME = item.POSITION_NAME;
				this.detailBoxIndex=-1;
				this.isDetailBoxStaff=false;
				this.detailBoxChangeValue = "";
			},
			//弹出点击阻止隐藏
			pageDetailStaffClick() {
				if(this.detailBoxIndex!=-1){
					this.isDetailBoxStaff = true;
				}
			},
			//输入改变值
			searchDetailStaffDataChange(index,event) {
				if(!this.modelObj.DetailList[index].STAFF_ID_NAME.replace(/(^\s*)|(\s*$)/g,'')){
					this.isDetailBoxStaff = false;
					return;
				}
				// this.modelObj.DetailList[index].STAFF_ID = "";
				// this.modelObj.DetailList[index].DEPT_ID = "";
				// this.modelObj.DetailList[index].DEPT_ID_NAME = "";
				// this.modelObj.DetailList[index].POSTION_ID = "";
				// this.modelObj.DetailList[index].POSTION_ID_NAME = "";
				this.detailBoxIndex = index;
				this.isDetailBoxDept = false;
				this.isDetailBoxPostion = false;
				this.isDetailBoxStaff = true;
                this.topBox = -event.srcElement.parentNode.offsetHeight*(this.modelObj.DetailList.length-index-1)+30;
				this.detailBoxChangeValue = this.modelObj.DetailList[index].STAFF_ID_NAME;
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
						tabName:"v_hrm_b_staff_type_info",
						valueField:"ID",
						nameField:"NAME||DEPT_ID||DEPT_NAME||POSITION_ID||POSITION_NAME",
						nameValue:"NAME||DEPT_NAME||POSITION_NAME",
						keyWord:this.detailBoxChangeValue
					};

				var param = this.common.comPagingParam(this.currentDetailPageStaff, this.currentDetailPageSizeStaff, "",paramObj);

				var url = this.common.baseNodeUrl+"Srv_ComBoxList.ashx" + param
				this.$http.get(url)
					.then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							this.searchDetailStaffDataList = [];
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("获取人员数据失败");
						}
						var msgObj = eval('(' + dataJson.Message + ')');
						this.searchDetailStaffDataList = msgObj;
					}).catch(function (res) {
	        			  console.log(res+"获取人员数据异常")
					});
			},
			/*人员弹出结束*/
			/*部门弹出开始*/
			selectDetailDept(item){
				this.modelObj.DetailList[this.detailBoxIndex].TO_DEPT_ID = item.ID;
				this.modelObj.DetailList[this.detailBoxIndex].TO_DEPT_ID_NAME = item.NAME;
				this.detailBoxIndex=-1;
				this.isDetailBoxDept=false;
				this.detailBoxChangeValue = "";
			},
			//弹出点击阻止隐藏
			pageDetailDeptClick() {
				if(this.detailBoxIndex!=-1){
					this.isDetailBoxDept = true;
				}
			},
			//输入改变值
			searchDetailDeptDataChange(index,event) {
				if(!this.modelObj.DetailList[index].TO_DEPT_ID_NAME.replace(/(^\s*)|(\s*$)/g,'')){
					this.isDetailBoxDept = false;
					return;
				}
				// this.modelObj.DetailList[index].TO_DEPT_ID="";
				this.detailBoxIndex = index;
				this.isDetailBoxStaff = false;
				this.isDetailBoxPostion = false;
				this.isDetailBoxDept = true;
				this.topBox = -event.srcElement.parentNode.offsetHeight*(this.modelObj.DetailList.length-index-1)+30;
				this.detailBoxChangeValue = this.modelObj.DetailList[index].TO_DEPT_ID_NAME;
				this.currentDetailPageDept = 1;
				this.searchDetailDeptList();
			},
			//点击页数事件
			handleCurrentChangeDetailDept(val) {
				this.currentDetailPageDept = val = 0 ? 1 : val;
				this.searchDetailDeptList();
			},
			//查询请求
			searchDetailDeptList() {
				var paramObj = {
						tabName:"COM_DEPART",
						valueField:"ID",
						nameField:"NAME",
						nameValue:"NAME",
						keyWord:this.detailBoxChangeValue
				};

				var param = this.common.comPagingParam(this.currentDetailPageDept, this.currentDetailPageSizeDept, "",paramObj);
				var url = this.common.baseNodeUrl+"Srv_ComBoxList.ashx" + param
				this.$http.get(url)
					.then(function(res) {
                        var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							this.searchDetailDeptDataList = [];
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("获取部门数据失败");
						}
						var msgObj = eval('(' + dataJson.Message + ')');
						this.searchDetailDeptDataList = msgObj;
					}).catch(function (res) {
	        			  console.log(res+"获取部门数据异常")
					});
			},
			/*部门弹出结束*/
			/*职务弹出开始*/
			selectDetailPostion(item,index){
				this.modelObj.DetailList[this.detailBoxIndex].TO_POSTION_ID = item.ID;
				this.modelObj.DetailList[this.detailBoxIndex].TO_POSTION_ID_NAME = item.NAME;
				this.detailBoxIndex=-1;
				this.isDetailBoxPostion=false;
				this.detailBoxChangeValue = "";
			},
			//弹出点击阻止隐藏
			pageDetailPostionClick() {
				if(this.detailBoxIndex!=-1){
					this.isDetailBoxPostion = true;
				}
			},
			//输入改变值
			searchDetailPostionDataChange(index,event) {
				if(!this.modelObj.DetailList[index].TO_POSTION_ID_NAME.replace(/(^\s*)|(\s*$)/g,'')){
					this.isDetailBoxPostion = false;
					return;
				}
				// this.modelObj.DetailList[index].TO_POSTION_ID = "";
				this.detailBoxIndex = index;
				this.isDetailBoxStaff = false;
				this.isDetailBoxDept = false;
				this.isDetailBoxPostion = true;
				this.topBox = -event.srcElement.parentNode.offsetHeight*(this.modelObj.DetailList.length-index-1)+30;
				this.detailBoxChangeValue = this.modelObj.DetailList[index].TO_POSTION_ID_NAME;
				this.currentDetailPagePostion = 1;
				this.searchDetailPostionList();
			},
			//点击页数事件
			handleCurrentChangeDetailPostion(val) {
				this.currentDetailPagePostion = val = 0 ? 1 : val;
				this.searchDetailPostionList();
			},
			//查询请求
			searchDetailPostionList() {
				var paramObj = {
						tabName:" HRM_B_POSITION",
						valueField:"ID",
						nameField:"NAME",
						nameValue:"NAME",
						keyWord:this.detailBoxChangeValue
				};

				var param = this.common.comPagingParam(this.currentDetailPagePostion, this.currentDetailPageSizePostion, "",paramObj);
				var url = this.common.baseNodeUrl+"Srv_ComBoxList.ashx" + param;
				this.$http.get(url)
					.then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							this.searchDetailPostionDataList = [];
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("获取职务数据失败");
						}
						var msgObj = eval('(' + dataJson.Message + ')');
						this.searchDetailPostionDataList = msgObj;
					}).catch(function (res) {
	        			  console.log(res+"获取职务数据异常")
					});
			},
			/*职务弹出结束*/
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
			btnDisabled(state){
				this.btnActive.isSave = state== 0 ? false : true;
				if(this.userMsg.ControlBar.IsAudit!=1)
				{
					this.btnActive.isSubmit = true;
				}else
				{
					this.btnActive.isAudit = state== 2 ?false : true;
				}

				this.btnActive.isSubmit = state== 0 ? false : true;
				this.isDisabledInput = state== 0 ? false : true;
				this.btnActive.isDetailAdd = state== 0 ? false : true;
				this.btnActive.isDetailLinkRemove = state== 0 ? false : true;
			},
			//根据用户判断按钮不可用
			btnUserDisabled(obj){
				let isAdd = true;
				let isSave = true;
				let isEdit = true;
				let isLook = true;
				let isLinkRemove = true;
				let isSubmit = true;
				let isAudit = true;
				let isDetailAdd = true;
				let isDetailLinkRemove = true;

				if(obj.IsReadonly==1)
				{
					isLook = false;
				}else
				{
					if(obj.IsAdd==1)
					{
						isAdd = false;
						isSave = false;
						isDetailAdd = false;
						isDetailLinkRemove = false;
					}
					if(obj.IsEdit==1)
					{
						isEdit = false;
						isSave = false;
						isDetailAdd = false;
						isDetailLinkRemove = false;
					}
					if(obj.IsDelete==1)
					{
						isLinkRemove = false;
					}
					if(obj.IsSubmit==1)
					{
						isSubmit = false;
					}
					if(obj.isAudit==1)
					{
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
					STAFF_ID_NAME:"",
					ENABLE_DATE:"",
					NAME:"",
					DISABLE_DATE:"",
					CODE:"",
					PERIOD_TYPE_ID:"",
					STATE_ID:"",
					ENABLE_DATE:"",
					TYPE_ID:"",
					TRIAL_END_DATE:"",
					LIMIT_ID:"",
					STATION_ID:"",
					SIGN_DATE:"",
					DEPT_ID:"",
				}

				this.cmdDetailAdd();
				if(this.userMsg.ControlBar.IsReadonly!=1){
					if(this.userMsg.ControlBar.IsAdd!=1 && this.userMsg.ControlBar.IsEdit!=1)
					{
						this.btnActive.isSave = true;
						// this.isDisabledInput = true;
						this.btnActive.isDetailAdd = true;
						this.btnActive.isDetailLinkRemove = true;
					}else
					{
						this.btnActive.isSave = false;
						// this.isDisabledInput = false;
						this.btnActive.isDetailAdd = false;
						this.btnActive.isDetailLinkRemove = false;
					}
					this.btnActive.isAudit = true;
					if(this.userMsg.ControlBar.IsSubmit!=1)
					{
						this.btnActive.isSubmit = true;
					}else
					{
						this.btnActive.isSubmit = false;
					}

				}
			},
			//列表查询条件
			getQueryParam() {
				var paramObj = {};
				var paramText = this.paramText;
				var paramCk = this.paramCk;

				if(paramText != undefined && paramText != "")
					paramObj[paramCk] = paramText;
				return paramObj;
			},
			//添加主数据并清空
			cmdAdd() {
				this.clearModelObj();
			},
			/*列表查询*/
			cmdSearchList() {
				var paramObj=this.getQueryParam();

				var param = this.common.orderComPagingParam(this.currentPage, this.pageSize, "CREATE_DATE", "ASC", "", paramObj);
				var url = this.common.baseNodeUrl+"hrm/staff/Srv_HRM_StaffContractList.ashx" + param
				this.$http.get(url)
					.then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("调动信息查询列表数据失败");
							return false;
						}
						this.tableResultList = dataJson.Message;
					}).catch(function (res) {
	        			  console.log(res+"调动信息查询列表数据异常")
					});
				// var obj = {Succeed:1,Message:{total:1,rows:[{ID:"420aaccf-3e79-4a6e-b0de-716329928132",CODE:"Trn-170527-00045",NAME:null,USER_ID:"1                                   ",USER_ID_NAME:"系统管理员",DEPT_ID:"10001                               ",DEPT_ID_NAME:"信息科",ADJUST_CODE:"10001",EFFECT_DATE:"2017-09-30",CREATE_DATE:"2017-09-29",SUMARRY:"人员调整",CREATE_TIME:"2017-09-29",STATE:1,STATE_NAME:"编辑中"}]}};
				// this.tableResultList = obj.Message;
			},
			//保存
			cmdSave() {
				var isErr = this.saveIn();
				if(!isErr)
					return
				var strDataJson = JSON5.stringify(this.modelObj);
				var url = this.common.baseNodeUrl+"hrm/org/Srv_HRM_TransferSave.ashx";
				this.$http.post(url, strDataJson, {
					emulateJSON: true
				}).then(function(res) {
					var dataJson = res.body;
					if(dataJson.Succeed != 1) {
						if(dataJson.Message!=null)
						{
							alert(dataJson.Message);
						}
						console.log("保存数据失败");
						return false;
					} else {
						this.modelObj.ID = dataJson.Message;
						this.cmdLinkEdit(this.modelObj,"Save");

					}

				}).catch(function (res) {
     			  console.log(res+"保存数据异常")
				});

			},
			// 提交
			cmdSubmit() {
				var isErr = this.saveIn();
				if(!isErr)
					return
				this.$confirm('您确定要提交', '是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var strDataJson = JSON5.stringify(this.modelObj);
					var url = this.common.baseNodeUrl+"hrm/org/Srv_HRM_TransferSubmit.ashx";
					this.$http.post(url, strDataJson, {
						emulateJSON: true
					}).then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("提交数据失败");
							return false;
						} else {
							this.modelObj.ID = dataJson.Message;
							this.cmdLinkEdit(this.modelObj,"Submit");
							// this.btnDisabled(2);
						}
					}).catch(function (res) {
     			  console.log(res+"提交数据异常")
					});
				});
			},
			//保存判断
			saveIn() {
				var result = true;
				if(!this.modelObj.STAFF_ID_NAME.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入姓名")
					return false;
				}
				if(!this.modelObj.ENABLE_DATE.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入生效日期")
					return false;
				}
				if(!this.modelObj.NAME.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入合同名称")
					return false;
				}

				if(!this.modelObj.DISABLE_DATE.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入到期日期")
					return false;
				}
				if(!this.modelObj.CODE.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入合同文号")
					return false;
				}
				if(!this.modelObj.PERIOD_TYPE_ID.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入试用类型")
					return false;
				}
				if(!this.modelObj.STATE_ID.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入合同状态")
					return false;
				}
				if(!this.modelObj.TRIAL_BEGIN_DATE.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入开始日期")
					return false;
				}
				if(!this.modelObj.TYPE_ID.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入合同类型")
					return false;
				}
				if(!this.modelObj.TRIAL_END_DATE.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入结束日期")
					return false;
				}
				if(!this.modelObj.LIMIT_ID.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入合同期限")
					return false;
				}
				if(!this.modelObj.SIGN_DATE.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入签订日期")
					return false;
				}

				if(!this.modelObj.STATION_ID.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入聘用岗位")
					return false;
				}
				if(!this.modelObj.SIGN_DATE.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入聘用日期")
					return false;
				}
				if(!this.modelObj.ENGAGE_DATE.replace(/(^\s*)|(\s*$)/g,'')) {
					alert("请填入聘用日期")
					return false;
				}
				this.modelObj.EFFECT_DATE = format(this.modelObj.EFFECT_DATE, 'YYYY-MM-DD')
				this.modelObj.CREATE_DATE = format(this.modelObj.CREATE_DATE, 'YYYY-MM-DD')
				return result
			},
			// 审核
			cmdAudit() {
				this.$confirm('您确定要审核', '是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var url = this.common.baseNodeUrl+ "hrm/org/Srv_HRM_TransferAudit.ashx";
					var strDataJson = JSON5.stringify({ID:this.modelObj.ID});
					this.$http.post(url, strDataJson, {
						emulateJSON: true
					}).then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("审核数据失败");
							return false;
						} else {
							this.modelObj.ID = dataJson.Message;
							this.btnDisabled(3);
						}
					}).catch(function (res) {
     			  		console.log(res+"审核数据异常")
					});

				});
			},
			// 打印
			cmdPrint() {
				this.$confirm('您确定要打印', '是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
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
			// 添加附件
			cmdUpLoad() {

			},
			//添加明细
			cmdDetailAdd() {
				var listone = {
					ID: "",
					STAFF_ID: "",
					STAFF_ID_NAME: "",
					DEPT_ID: "",
					DEPT_ID_NAME: "",
					POSTION_ID_NAME:"",
					POSTION_ID:"",
					TO_POSTION_ID_NAME:"",
					TO_POSTION_ID:"",
					TO_DEPT_ID_NAME:"",
					TO_DEPT_ID:"",
					TYPE_ID: "",
					TYPE_ID_NAME: "",
					CIRCUMSTANCE: "",
					DISPLAY_INDEX: 0
				};
				this.modelObj.DetailList.push(listone);
				// listone{}
			},
			//查看详情
			cmdLinkLook(item){
				this.isShowEdit = true;
				this.clearModelObj();
				var url = this.common.baseNodeUrl+ "hrm/org/Srv_HRM_TransferGet.ashx?ID=" + item.ID;
				this.$http.get(url)
					.then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
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

						if(this.modelObj.STATE==2 && this.userMsg.ControlBar.IsAudit==1){//审核禁用
							this.btnActive.isAudit = false;
						}else{
							this.btnActive.isAudit = true;
						}


					}).catch(function (res) {
	        			  console.log(res+"获取详情数据异常")
					});
			},
			//编辑详情
			cmdLinkEdit(item,act) {
				this.isShowEdit = true;
				this.clearModelObj();
				var url = this.common.baseNodeUrl+ "hrm/org/Srv_HRM_TransferGet.ashx?ID=" + item.ID;
				this.$http.get(url)
					.then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("获取详情数据失败");
							return false;
						}
						this.modelObj = dataJson.Message;
						if(act=="Save")
						{
							alert("保存成功!");
						}else if(act=="Submit")
						{
							alert("提交成功!");
						}
						if(this.modelObj.DetailList==null || this.modelObj.DetailList.length == 0) {
							this.cmdDetailAdd();
						}

						if(this.modelObj.STATE==1 && this.userMsg.ControlBar.IsEdit==1){
							this.btnActive.isSave = false;//保存禁用
							this.btnActive.isDetailAdd = false;//明细添加禁用
							this.btnActive.isDetailLinkRemove = false;//明细删除禁用
						}else
						{
							this.btnActive.isSave = true;//保存禁用
							this.btnActive.isDetailAdd = true;//明细添加禁用
							this.btnActive.isDetailLinkRemove = true;//明细删除禁用
						}

						if(this.modelObj.STATE==1 && this.userMsg.ControlBar.IsSubmit==1){//提交禁用
							this.btnActive.isSubmit = false;
						}else{
							this.btnActive.isSubmit = true;
						}

						if(this.btnActive.isSubmit && this.modelObj.STATE==2 && this.userMsg.ControlBar.IsAudit==1){//审核禁用
							this.btnActive.isAudit = false;
						}else{
							this.btnActive.isAudit = true;
						}
					}).catch(function (res) {
	        			  console.log(res+"获取详情数据异常")
					});
			},
			//列表主数据删除
			cmdLinkRemove(item, index) {
				this.$confirm('您确定要删除', '是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

				var url = this.common.baseNodeUrl+ "hrm/org/Srv_HRM_TransferDel.ashx";
				var ids = "['"+item.ID+"']";
				this.$http.post(url,ids, {
						emulateJSON: true
					})
					.then(function(res) {
						var dataJson = res.body;
						if(dataJson.Succeed != 1) {
							if(dataJson.Message!=null)
							{
								alert(dataJson.Message);
							}
							console.log("删除主表数据失败");
							return false;
						}
						var list = this.tableResultList.rows;
						list.splice(index, 1);

					}).catch(function (res) {
	        			  console.log(res+"删除主表数据异常")
					});
				});
			},
			//列表明细数据删除
			cmdDetailLinkRemove(item, index) {
				var list = this.modelObj.DetailList;
				if(item.ID != undefined && item.ID != "") {
					var ids = "['"+item.ID+"']";
					var url = this.common.baseNodeUrl+"hrm/org/Srv_HRM_TransferDetailDel.ashx";
					this.$http.post(url,ids, {
							emulateJSON: true
						})
						.then(function(res) {
							var dataJson = res.body;
							if(dataJson.Succeed != 1) {
								if(dataJson.Message!=null)
								{
									alert(dataJson.Message);
								}
								console.log("删除明细数据失败");
								return false;
							}
							list.splice(index, 1);
							if(list.length == 0) {
								this.cmdDetailAdd();
							}

						}).catch(function (res) {
		        			  console.log(res+"删除明细数据异常")
						});
				} else {
					if(list.length > 1) {
						list.splice(index, 1);
					}
				}
			},

		},
		//初始化
		created() {

			var userParam ="?pageName=modules/VUE/index.html@/index14";
			var userUrl = this.common.baseNodeUrl+ "Srv_SystemUserMsg.ashx" + userParam;
			this.$http.get(userUrl)
				.then(function(res) {
					var dataJson = res.body;
					if(dataJson.Succeed != 1) {
						this.userMsg = {};
						if(dataJson.Message!=null)
						{
							alert(dataJson.Message);
						}
						console.log("获取用户数据失败");
						return false;
					}
					this.userMsg = dataJson.Message;
					this.btnUserDisabled(this.userMsg.ControlBar);

					this.cmdSearchList();

				}).catch(function (res) {
						console.log(res+"获取用户数据异常")
				});

			var typeObj = {tabName:"COM_TYPE",viewName:"NAME"};
			var typeParam = this.common.comGetParam("PARENT_ID='0106'",typeObj);
			var typeUrl = this.common.baseNodeUrl+ "Srv_DropDownList.ashx" + typeParam;
			this.$http.get(typeUrl)
				.then(function(res) {
					var dataJson = res.body;
					if(dataJson.Succeed != 1) {
						this.detailTypeList = [];
						if(dataJson.Message!=null)
						{
							alert(dataJson.Message);
						}
						console.log("获取调动类型数据失败");
						return false;
					}
					var msgObj = eval('(' + dataJson.Message + ')');
					this.detailTypeList = msgObj;
				}).catch(function (res) {
						console.log(res+"获取调动类型数据异常")
				});

		},
		mounted() {

		},
	}
</script>
<style scoped>
.text-center {
  text-align: center;
}


/*下拉列表样式*/

.searchListDiv {}

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

.example {
  width: 100%;
  height: 120px;
  overflow-x: hidden;
  overflow-y: auto;
}

.tablehead {
  width: 100%;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background: #C0C0C0;
}

.tablefoot {
  width: 400px;
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
  top: 50%;
  margin-bottom: 21px;
  display: block;
}

.arrright {
  width: 22px;
  height: 42px;
  background: url("images/收起.png");
  position: absolute;
  top: 50%;
  margin-bottom: 21px;
}

.input p {
  margin: 10px 0;
}

.compile {
  background: #ffffff;
  border: 1px solid #ebf2f6;
  box-shadow: -5px 0 5px 0 rgba(235, 242, 246, 0.80);
  width: 1100px;
  height: 873px;
  position: absolute;
  left: -1000px;
  top: 0px;
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
  margin-left: 60px;
  position: relative;
  border: 1px solid #5d89b3;
  margin-top: 20px;
}

.compile li .cheaked {
  background: #5d89b3;
  border-radius: 100px;
  width: 90px;
  height: 30px;
  color: #fff;
}

.compile-top {
  padding-left: 120px;
}

.input {
  margin-top: 40px;
  padding-left: 66px;
  color: #5d89b3;
  text-align: left;
}

.input span {
  display: inline-block;
  text-align: center;
  width: 147px;
}

.input input {
  border: 1px solid #ebf2f6;
  border-radius: 3px;
  width: 140px;
  height: 30px;
  margin-left: 10px;
}

.inputselect {
  border: 1px solid #ebf2f6;
  border-radius: 3px;
  width: 140px;
  height: 36px;
  margin-bottom: 10px;
  margin-left: 7px;
}

.only input {
  width: 452px;
}

.first {
  margin-top: 16px;
}

.compile-bottom li a {
  position: relative;
  border: none;
  color: #999999
}

.compile-bottom li .active {
  color: #5d89b3;
}

.compile-bottom li a e {
  display: block;
  position: absolute;
  top: 9px;
  left: -9px;
}

.add {
  width: 13px;
  height: 15px;
  background: url("images/附件icon02.png");
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
  left: 195px;
  opacity: 0.2;
  -moz-opacity: 0.5;
  height: 878px;
  width: 370px;
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

.infoBottom {
  position: relative;
}
</style>
