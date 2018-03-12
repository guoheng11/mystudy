<template>
	<div v-show="isShowBox" @click.stop="pageBoxClick" style="position:absolute ;z-index:9999;" class="showTable">
		<div class="tablehead">
			<ul>
				<li class="fl tableli">序号</li>
				<li class="fl tableli">姓名</li>
				<li class="fl tableli">部门</li>
				<li class="fl tableli" style="padding-right: 1px;">职务</li>
			</ul>
		</div>

		<div style="" class="searchListDiv example" v-bind:style="{ marginTop: topBox + 'px' }">
			<table border="1" align="center" class="searchList">
				<tbody>
					<tr @click="boxSelect(item);" @mouseover="boxMouseOver(index)" @mouseout="boxMouseOut(index)" :class="{'trlistover': boxMouseOverbgc===index}" v-for="(item ,index) in searchBoxDataList.rows">
						<td>{{currentDetailPageStaff==1?index+1:index+1+((currentDetailPageStaff-1)*currentDetailPageSizeStaff)}}</td>
						<td>{{item.NAME}}</td>
						<td>{{item.DEPT_NAME}}</td>
						<td>{{item.POSTION_NAME}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="tablefoot" style="margin-left:-80px;">
			<div class="block pageDetailStaffClick" @click.stop="pageBoxClick">
				<el-pagination @size-change="handleSizeChangeDetailStaff" @current-change="handleCurrentChangeBox" :current-page.sync="currentDetailPageStaff" :page-size="currentDetailPageSizeStaff" layout="total,prev, next, jumper" :total="searchBoxDataList.total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			topBox: 0,
			boxMouseOverbgc: "", //控制tr高亮
			boxIndex: -1,//列表获取数据索引
			isShowBox: false,//人员box控制隐藏
			boxChangeValue: "",
			searchBoxDataList: {
				total: 0, rows: [
					{ ID: "1", NAME: "lis", DEPT_ID: "2", DEPT_ID_NAME: "开发部", POSTION_ID: "3", POSTION_ID_NAME: "开发工程师" },
					{ ID: "2", NAME: "zhangs", DEPT_ID: "2", DEPT_ID_NAME: "开发部", POSTION_ID: "4", POSTION_ID_NAME: "前端工程师" },
					{ ID: "1", NAME: "lis", DEPT_ID: "2", DEPT_ID_NAME: "开发部", POSTION_ID: "3", POSTION_ID_NAME: "开发工程师" },
					{ ID: "2", NAME: "zhangs", DEPT_ID: "2", DEPT_ID_NAME: "开发部", POSTION_ID: "4", POSTION_ID_NAME: "前端工程师" },
					{ ID: "1", NAME: "lis", DEPT_ID: "2", DEPT_ID_NAME: "开发部", POSTION_ID: "3", POSTION_ID_NAME: "开发工程师" },
				]
			},//明细人员查询
			currentDetailPageStaff: 1,//box人员当前页数
			currentDetailPageSizeStaff: 5,//box人员页数大小
		}
	},
	methods: {
		//弹出Box列表事件背景变灰
		boxMouseOver(index) {
			this.boxMouseOverbgc = index
		},
		//弹出Box列表事件背景变白
		boxMouseOut(item) {
			this.boxMouseOverbgc = false
		},
		/*人员弹出开始*/
		boxSelect(item) {
			// this.modelObj.DetailList[this.boxIndex].STAFF_ID = item.ID;
			// this.modelObj.DetailList[this.boxIndex].STAFF_ID_NAME = item.NAME;
			// this.modelObj.DetailList[this.boxIndex].DEPT_ID = item.DEPT_ID;
			// this.modelObj.DetailList[this.boxIndex].DEPT_ID_NAME = item.DEPT_NAME;
			// this.modelObj.DetailList[this.boxIndex].POSTION_ID = item.POSITION_ID;
			// this.modelObj.DetailList[this.boxIndex].POSTION_ID_NAME = item.POSITION_NAME;
			this.boxIndex = -1;
			this.isShowBox = false;
			this.boxChangeValue = "";
		},
		//弹出点击阻止隐藏
		pageBoxClick() {
			if (this.boxIndex != -1) {
				this.isShowBox = true;
			}
		},
		//输入改变值
		searchBoxDataChange(index, event) {
			if (!this.modelObj.DetailList[index].STAFF_ID_NAME.replace(/(^\s*)|(\s*$)/g, '')) {
				this.isShowBox = false;
				return;
			}
			this.boxIndex = index;
			this.isShowBox = true;
			this.boxChangeValue = this.modelObj.DetailList[index].STAFF_ID_NAME;
			this.currentDetailPageStaff = 1;
			this.searchBoxList();
		},
		//点击页数事件
		handleCurrentChangeBox(val) {
			this.currentDetailPageStaff = val = 0 ? 1 : val;
			this.searchBoxList();
		},
		//查询请求
		searchBoxList() {
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
						this.searchBoxDataList = [];
						if (dataJson.Message != null) {
							alert(dataJson.Message);
						}
						console.log("获取人员数据失败");
					}
					var msgObj = eval('(' + dataJson.Message + ')');
					this.searchBoxDataList = msgObj;
				}).catch(function(res) {
					console.log(res + "获取人员数据异常")
				});
		},
		/*人员弹出结束*/
	}
}
</script>

<style>
.pageDetailStaffClick[data-v-748c11ac][data-v-748c11ac] {
	background: #f8f8f8;
}

.pageDetailStaffClick[data-v-748c11ac] {
	padding-right: 109px;
	border: 1px solid #e1e1e1;
	border-top: none;
	z-index: 99999;
}

.pageDetailStaffClick .el-pagination {
	margin-left: 20px;
}
</style>
