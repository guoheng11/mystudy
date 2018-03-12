<template>
  <div class="col-xs-7">
        <input style="width:100%" ng-model="roleName" id='roleName' ng-click="searchRole(rolePager.getCurIndex(),rolePager.getPageSize());showRole=true;showMenu=false;$event.stopPropagation()" type="text" />
        <div style=";width:300%" class="showTable" ng-if="showRole" ng-click="showRole=true;showMenu=false;$event.stopPropagation()">
            <div class="column">
                <span style="width : 33%">顺序号</span>
                <span style="width : 33%">编码</span>
                <span style="width : 33%">名称</span>
            </div>
            <div class="table">
                <table class="table table-hover">
                    <tr ng-repeat="v in roleList" ng-click="selectRole(v.id,v.name );$event.stopPropagation()">
                        <td width="33%" ng-bind="v.index">顺序号</td>
                        <td width="33%" ng-bind="v.code">编码</td>
                        <td width="33%" ng-bind="v.name ">名称</td>
                    </tr>
                </table>
            </div>
            <!-- 模块列表分页控件 -->
            <div class="row text-left">
                <div class="col-xs-8">
                    <div class="col-xs-4">
                        第
                        <span ng-bind="rolePager.curIndex"></span>页/共
                        <span ng-bind="rolePager.pageNum"></span>页
                    </div>
                    <div class="col-xs-4">
                        总记录数：
                        <span ng-bind="rolePager.dataNum">></span>
                    </div>
                    <div class="col-xs-4">
                        每页记录数:
                        <span>10</span>
                    </div>
                </div>
                <div class="col-xs-3">
                    <div class="col-xs-3">
                        <button class="btn btn-xs" ng-class="{'gray': rolePager.preButton }" ng-disabled="rolePager.preButton" ng-click="searchRole(1)">
                            <span class="glyphicon glyphicon-backward"></span>
                        </button>
                    </div>
                    <div class="col-xs-3">
                        <button class="btn btn-xs" ng-class="{'gray': rolePager.preButton }" ng-disabled="rolePager.preButton" ng-click="searchRole(rolePager.curIndex - 1);">
                            <span class="glyphicon glyphicon-triangle-left"></span>
                        </button>
                    </div>
                    <div class="col-xs-3">
                        <button class="btn btn-xs" ng-class="{'gray': rolePager.nextButton }" ng-disabled="rolePager.nextButton" ng-click="searchRole(rolePager.curIndex + 1);">
                            <span class="glyphicon glyphicon-triangle-right"></span>
                        </button>
                    </div>
                    <div class="col-xs-3">
                        <button class="btn btn-xs" ng-class="{'gray': rolePager.nextButton }" ng-disabled="rolePager.nextButton" ng-click="searchRole(rolePager.pageNum)">
                            <span class="glyphicon glyphicon-forward"></span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
