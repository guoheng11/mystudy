<template>
    <div>
        <input type="text" class="searchBoxDept" :style="inputObj.divStyle" v-model="inputObj.inputValue" @input="searchDataChange">
        <transition name="fold">
            <div class="showTable" v-show="inputObj.isBox" @click.stop="pageBoxClick" style="position:absolute ;z-index:9999;">
                <!-- style="left:200px" -->
                <div class="tablehead">
                    <ul>
                        <!-- style="width:200px" -->
                        <li class="fl tableli">序号</li>
                        <!-- style="" -->
                        <li class="fl tableli">部门</li>
                    </ul>
                </div>
                <!-- margin-left:200px; -->
                <div class="searchListDiv example">
                    <table border="1" align="center" class="searchList">
                        <tbody class="tbodylist">
                            <tr @click="selectBoxData(item);" @mouseover="boxMouseOver(index)" @mouseout="boxMouseOut(index)" :class="{'trlistover': boxMouseOverbgc===index}" v-for="(item ,index) in searchBoxDataList.rows">
                                <td>{{currentPageBox==1?index+1:index+1+((currentPageBox-1)*currentPageSizeBox)}}</td>
                                <td>{{item.NAME}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="tablefoot">
                    <div class="block pageClick" @click.stop="pageBoxClick">
                        <el-pagination @size-change="handleSizeChangeBox" @current-change="handleCurrentChangeBox" :current-page.sync="currentPageBox" :page-size="currentPageSizeBox" layout="total,prev, next, jumper" :total="searchBoxDataList.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style>

</style>
<script>
import JSON5 from 'json5'

export default {
    props: {
        inputObj: Object
    },
    data() {
        return {
            boxIndex:-1,
            boxMouseOverbgc: '', //控制tr高亮
            currentPageBox: 1,
            currentPageSizeBox: this.inputObj.currentPage,
            searchBoxDataList: {
                total: 0, rows: [{ID:1,NAME:'1'},{ID:2,NAME:'2'},{ID:3,NAME:'3'},]
            },
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
        //点击内部持续显示
        pageBoxClick() {
            if (this.boxIndex != -1) {
				this.inputObj.isBox = true;
			}
        },
        //分页页数大小改变
        handleSizeChangeBox(val) {

        },
        //分页当前页数改变
        handleCurrentChangeBox(val) {
            this.currentPageBox = val = 0 ? 1 : val;
            this.searchBoxList();
        },
        //输入改变值
        searchDataChange() {
            if (!this.inputObj.inputValue.replace(/(^\s*)|(\s*$)/g, '')) {
                this.inputObj.isBox = false;
                return;
            }
            this.boxIndex = 1;
            this.inputObj.isBox = true;
            this.currentPageBox = 1;
            this.searchBoxList();
        },
        //查询数据
        searchBoxList() {
            var paramObj = {
            	tabName: "COM_DEPART",
            	valueField: "ID",
            	nameField: "NAME",
            	nameValue: "NAME",
            	keyWord: this.inputObj.inputValue
            };
            var condition = "";
            var param = this.common.comPagingParam(this.currentPageBox, this.currentPageSizeBox, condition, paramObj);
            var url = this.common.baseNodeUrl + "Srv_ComBoxList.ashx" + param
            this.$http.get(url)
            	.then(function(res) {
            		var dataJson = res.body;
            		if (dataJson.Succeed != 1) {
            			this.searchBoxDataList = {total: 0, rows: []};
            			if (dataJson.Message != null) {
            				alert(dataJson.Message);
            			}
            			console.log("获取部门数据失败");
            		}
            		var msgObj = JSON5.parse(dataJson.Message);
            		this.searchBoxDataList = msgObj;
            	}).catch(function(res) {
            		console.log(res + "获取部门数据异常")
            	});
        },
        //选择数据返回值
        selectBoxData(item) {
            this.inputObj.inputValue = item.NAME;
            this.boxIndex=-1;
            this.inputObj.isBox = false;
            this.$emit('selectBox', item);
        },
    },
    created(){
        
    },
}
</script>

<style scoped>

.showTable {
    border-left: 1px solid #e1e1e1;
    margin-top: -2px;
}

.pageClick[data-v-748c11ac][data-v-748c11ac] {
    background: #f8f8f8;
}

.pageClick[data-v-748c11ac] {
    padding-right: 109px;
    border: 1px solid #e1e1e1;
    border-top: none;
    z-index: 99999;
}

.tablehead {
    position: absolute;
    top: 2px;
    background: #C0C0C0;
}

.tableli {
    width: 99px;
    line-height: 30px;
    text-align: center;
}

.tablefoot {
    width: 400px;
    /* position: absolute; */
    bottom: 30px;
    /* margin-left: 80px; */
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background: #C0C0C0;
    bottom: 32px;
    background: #ccc;
    left: -182px;
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

.trlistover {
    background: #C0C0C0;
    transition: all 1s;
}

.searchList {
    position: relative;
    top: 1px;
    left: 1px;
}

.example th,
tr {
    height: 48px;
}

.example {
    width: 401px;
    margin-top: 30px;
    overflow-y: scroll;
    max-height: 157px;
}

.tablehead ul li:first-child {
    width: 200px;
}

.tablehead ul li:last-child {
    width: 175px;
    padding-right: 26px;
}

.tbodylist tr td {
    text-align: center;
    width: 12.5%;
    height: 30px;
}

.el-pagination {
    margin-left: 50px;
}

.searchBoxDept{
    border: 1px solid #ebf2f6;
    border-radius: 3px;
    width: 422px;
    height: 36px;
    margin-bottom: 10px;
    margin-left: 25px;
}

</style>
 