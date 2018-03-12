<template>
<div @click="searchBoxListHidden">
  <div class="content">
    <div class="infoPlace ">
      您所在的位置是：
      <span>人事管理 / 人员台账</span>
    </div>
    <div class="infoo">
      <div class="infolinfoleft fl">
        <div class="infoTitle ">
          <div class="roster">
            <span>|</span>&nbsp;人员台账</div>
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
          <table border="0" cellspacing="1" cellpadding="10" align="center" id="dataGridTableJson" class="table " style="border-collapse:separate;border-spacing: 0px 10px;margin-right:30px;">
            <thead>
              <tr class="r-t-head">
                <th class="first-td">工号
                  <em style="right:15px"></em>
                </th>
                <th>姓名
                  <em style="right:15px"></em>
                </th>
                <th>性别
                  <em style="right:15px"></em>
                </th>
                <th>部门
                  <em style="right:16px"></em>
                </th>
                <th>职务
                  <em style="right:15px"></em>
                </th>
                <th>政治面貌
                  <em style="right:32px"></em>
                </th>
                <th>手机号码
                  <em style="right:32px"></em>
                </th>
                <th>操作</th>

              </tr>
            </thead>
            <tbody id="tbody">
              <tr v-for="(item,index) in tableResultList.rows">
                <td>{{item.CODE}}</td>
                <td>{{item.NAME}}</td>
                <td>{{item.SEX_NAME}}</td>
                <td>{{item.DEPT_ID_NAME}}</td>
                <td>{{item.POSTION_ID_NAME}}</td>
                <td>{{item.POLITICS_STATUS_ID_NAME}}</td>
                <td>{{item.CELL_PHONE_NUMBER}}</td>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next" :total="tableResultList.total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="inforight fr">
        <div class="arrleft" @click='viewOpen' v-show="!isShowEdit">

        </div>
        <div class="compile" v-show="isShowEdit">
          <div class="arrright" @click='viewClose' v-show="isShowEdit">

          </div>
          <div class="clearfix compile-top" style="padding-bottom:20px">
            <div class="clearfix">
              <div class="photo fl" style="width:200px;margin:20px 0 0 20px">
                <div>
                  <img src="./images/ui.jpg" alt="">
                </div>
                <div slot="tip" class="el-upload__tip">仅支持jpg文件，且不超过2MB</div>
                <!-- <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :file-list="fileList">

                                        <el-button size="small" type="primary">选择图片上传</el-button>
                                    </el-upload> -->
              </div>
              <div class="fr clearfix " style="width:880px;margin-left:-30px;">

                <el-row class="">
                  <el-col :span="6">
                    <span>姓名</span>
                    <input type="text" v-model="modelObj.NAME">
                  </el-col>
                  <el-col :span="6">
                    <span>性别</span>
                    <select class="span-select1" style="height:28px;width:100px;margin-left:20px" v-model="modelObj.SEX">
                                            <option :value="item.ID" v-for="item in dropDownSexList.rows">{{item.NAME}}</option>
                                              <option :value="item.ID" v-for="item in dropDownSexList.rows">{{item.NAME}}</option>
                                        </select>

                  </el-col>
                  <el-col :span="6">
                    <span>民族</span>
                    <input type="text" v-model="modelObj.NATION_ID_NAME">
                  </el-col>
                  <el-col :span="6">
                    <span>籍贯</span>
                    <input type="text" v-model="modelObj.NATIVE_PLACE">
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="6">
                    <span>出生日期</span>
                    <input type="text" v-model="modelObj.BIRTHDAY">
                  </el-col>
                  <el-col :span="6">
                    <span>年龄</span><input type="text" v-model="modelObj.AGE">
                  </el-col>
                  <el-col :span="6">
                    <span>政治面貌</span><input type="text" v-model="modelObj.POLITICS_STATUS_ID_NAME">
                  </el-col>
                  <el-col :span="6">
                    <span>入党时间</span>
                    <input type="text" v-model="modelObj.PARTY_DATE">
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>身高</span><input type="text" v-model="modelObj.HEIGHT">
                  </el-col>
                  <el-col :span="6">
                    <span>体重</span><input type="text" v-model="modelObj.WEIGHT">
                  </el-col>
                  <el-col :span="6">
                    <span>视力</span><input type="text" v-model="modelObj.EYESIGHT">
                  </el-col>
                  <el-col :span="6">
                    <span>血型</span>
                    <input type="text" v-model="modelObj.BLOOD_TYPE_ID_NAME">
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>健康状况</span><input type="text" v-model="modelObj.HEALTH_STATUS_ID_NAME">
                  </el-col>
                  <el-col :span="6">
                    <span>手机号码</span><input type="text" v-model="modelObj.CELL_PHONE_NUMBER">
                  </el-col>
                  <el-col :span="6">
                    <span>邮政编码</span><input type="text" v-model="modelObj.HOME_POST_CODE">
                  </el-col>
                  <el-col :span="6">
                    <span>住宅电话</span><input type="text" v-model="modelObj.HOME_PHONE_NUMBER">
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="6">
                    <span>文化程度</span>
                    <input type="text" v-model="modelObj.STANDARD_CULTURE_ID_NAME">
                  </el-col>

                  <el-col :span="12">
                    <span>工作地点</span>
                    <input class="placein" type="text" v-model="modelObj.WORKPLACE">
                  </el-col>
                  <el-col :span="6">
                    <span>办公号码</span>
                    <input type="text" v-model="modelObj.WORK_PHONE_NUMBER">
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="9">
                    <span>身份证号</span>
                    <input type="text" style="width:208px" v-model="modelObj.ID_NUMBER">
                  </el-col>
                  <el-col :span="9">
                    <span>电子邮件</span>
                    <input type="text" style="width:206px" v-model="modelObj.EMAIL">
                  </el-col>
                  <el-col :span="6">
                    <span>港澳台侨胞</span>
                    <input class="lastinput" type="text" v-model="modelObj.DIST_TYPE_ID_NAME">
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span>户口所在地</span>
                    <input type="text" style="width:738px" v-model="modelObj.ID_NUMBER">
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span>家庭通讯地址</span>
                    <input type="text" style="width:738px" v-model="modelObj.HOME_ADDRESS">
                  </el-col>
                </el-row>
              </div>
            </div>
            <div style="" class="clearfix">
              <el-row>
                <el-col :span="24">
                  <span>特长</span>
                  <input type="text" style="width:975px" v-model="modelObj.SPECIAL">
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span>爱好</span>
                  <input type="text" style="width:975px" v-model="modelObj.HOBBY">
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span>自我评价</span>
                  <input type="text" style="width:975px" v-model="modelObj.SELF_ASSESSMENT">
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span>备注</span>
                  <input type="text" style="width:975px" v-model="modelObj.COMMENTS">
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="compile-middle">
            <el-row>
              <el-col :span="6">
                <span>员工状态</span>
                <input type="text" v-model="modelObj.TYPE_ID_NAME">
              </el-col>
              <el-col :span="6">
                <span>部门</span><input type="text" v-model="modelObj.DEPT_ID_NAME">
              </el-col>
              <el-col :span="6">
                <span>参加工作时间</span><input type="text" v-model="modelObj.WORK_DATE">
              </el-col>
              <el-col :span="6">
                <span>工龄</span><input type="text" v-model="modelObj.WORKAGE">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <span>行政职务</span><input type="text" v-model="modelObj.POSTION_ID_NAME">
              </el-col>
              <el-col :span="6">
                <span>任职时间</span><input type="text" v-model="modelObj.AKEOFF_DATE">
              </el-col>
              <el-col :span="6">
                <span>兼职职务1</span><input type="text" v-model="modelObj.PLC_POSTION_ID1_NAME">
              </el-col>
              <el-col :span="6">
                <span>兼职职务2</span><input type="text" v-model="modelObj.PLC_POSTION_ID2_NAME">
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="6">
                <span>任用方式</span><input type="text" v-model="modelObj.APPOINT_TYPE_ID_NAME">
              </el-col>
              <el-col :span="6">
                <span>聘任时间</span><input type="text" v-model="modelObj.APPT_DATE">
              </el-col>
              <el-col :span="6">
                <span>入职时间</span><input type="text" v-model="modelObj.ENTRY_DATE">
              </el-col>
              <el-col :span="6">
                <span>来院时间</span><input type="text" v-model="modelObj.COME_DATE">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <span>离职日期</span><input type="text" v-model="modelObj.DIMISSION_DATE">
              </el-col>
              <el-col :span="6">
                <span>约定工资标准</span>
                <!-- <select class="span-select1" v-model="modelObj.APPOINT_SALARY_ID">
     <option :value="itemAppointSalary.ID" v-for="itemAppointSalary in dropDownAppointSalaryList.rows">
       {{itemAppointSalary.NAME}}</option>
                 </select> -->
              </el-col>
              <el-col :span="6">
                <span>约定岗位</span>
                <!-- <select class="span-select1" v-model="modelObj.APPOINT_STATION_ID">
                       <option :value="itemAppointStation.ID" v-for="itemAppointStation in dropDownAppointStationList.rows">
                      {{itemAppointStation.NAME}}
                        </option>
                </select> -->
              </el-col>
              <el-col :span="6">
              </el-col>
            </el-row>
          </div>
          <div class="compile-bottom">
            <el-row>
              <el-col :span="6">
                <span>编制类型</span>
                <input type="text" v-model="modelObj.AURHORIZED_TYPE_ID_NAME">
              </el-col>
              <el-col :span="6">
                <span>职工类型1</span><input type="text" v-model="modelObj.TYPE1_ID_NAME">
              </el-col>
              <el-col :span="6">
                <span>职工类型2</span><input type="text" v-model="modelObj.TYPE2_ID_NAME">
              </el-col>
              <el-col :span="6">
                <span>职工类型3</span><input type="text" v-model="modelObj.TYPE3_ID_NAME">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <span>外语水平</span><input type="text" v-model="modelObj.FOREIGN_LANGUAGE_ID_NAME">
              </el-col>
              <el-col :span="6">
                <span>计算机水平</span><input type="text" v-model="modelObj.COMPUTER_SKILL_ID_NAME">
              </el-col>
              <el-col :span="6">
                <span>执照(有/无)</span>
                <select class="span-select1" v-model="modelObj.IS_LICENSE_NAME">
                        <option value="1">有</option>
                        <option value="2">无</option>
                      </select>
              </el-col>
              <el-col :span="6">
                <span>全科证(有/无)</span>
                <select class="span-select1" v-model="modelObj.IS_WHOLECARD">
                     <option value="1">有</option>
                   <option value="2">无</option>
                 </select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <span>执业资格</span><input type="text" v-model="modelObj.PRACTCERTIFICATE_ID_NAME">
              </el-col>
              <el-col :span="6">
                <span>取得资格时间</span><input type="text" v-model="modelObj.OBTAIN_DATE">
              </el-col>
              <el-col :span="6">

              </el-col>
              <el-col :span="6">

              </el-col>
            </el-row>

          </div>
          <div class="block stysave">
            <span class="wrapper">
                                    <el-button
                                    	type="warning"
                                    	:class="{bgcgray:btnActive.isSave}"
                                    	:disabled="btnActive.isSave"
                                    	@click="cmdSave">保存
                                    </el-button>
                                </span>
          </div>
          <div class="panel">
            <div class="mes clearfix" @click="showCertificate" v-bind:class="{ marginb: isShowCertificate}">
              <div class="fl">
                <e></e>证书信息
              </div>
              <div class="fr">展开／隐藏</div>
            </div>
            <div class="mess mess2" v-show="isShowCertificate">
              <table style="border-collapse:separate;border-spacing: 0px 10px">
                <tr>
                  <!-- <td>
                                                <el-checkbox v-model="checkCertificate" style="padding:0 10px 0 35px;"></el-checkbox>
                                            </td> -->
                  <td>证书编号</td>
                  <td>证书名称</td>
                  <td>证书类型</td>
                  <td>取证时间</td>
                  <td>证书有效期</td>
                  <td>发证机构</td>
                  <td>证书范围</td>
                  <td>操作</td>
                </tr>
                <tbody>
                  <tr v-for="(item ,index) in tableCertificateList.rows">
                    <!-- <td>
                                                     <el-checkbox v-model="checkCertificate" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td> -->
                    <td>
                      <input type="text" v-model="item.CODE">
                    </td>
                    <td>
                      <input type="text" v-model="item.NAME">
                    </td>
                    <td>
                      <select class="span-select1" v-model="item.TYPE_ID">
                                                        <option :value="itemType.ID" v-for="itemType in dropDownCertificateTypeList.rows">{{itemType.NAME}}</option>
                                                    </select>
                    </td>
                    <td>
                      <input type="text" v-model="item.ACQUIRE_DATE" style="width:78px">
                    </td>
                    <td>
                      <select class="span-select1" v-model="item.VALIDITY_ID">
                                                        <option :value="itemValidity.ID" v-for="itemValidity in dropDownCertificateValidityList.rows">{{itemValidity.NAME}}</option>
                                                    </select>
                    </td>
                    <td>
                      <input type="text" v-model="item.CERTIFYING_AUTHORITY">
                    </td>
                    <td>
                      <span>
                                                       <select class="span-select1" v-model="item.SCOPE_ID">
                                                        <option :value="itemScope.ID" v-for="itemScope in dropDownCertificateScopeList.rows">{{itemScope.NAME}}</option>
                                                    </select>
                                                   </span>
                    </td>
                    <td>
                      <span><el-button @click="cmdCertificateRemove(item,index);">删除</el-button></span>
                    </td>
                  </tr>

                </tbody>
              </table>
              <div style="margin-top: 10px;margin-left:20px;">
                <el-button @click="cmdCertificateSave">保存</el-button>
                <el-button @click="cmdCertificateAdd">新增</el-button>
              </div>
            </div>
            <div class="mes clearfix" @click="showFamily" v-bind:class="{ marginb: isShowFamily}">
              <div class="fl">
                <e></e>家庭信息</div>
              <div class="fr">展开／隐藏</div>
            </div>
            <div class="mess mess1" v-show="isShowFamily">
              <table style="border-collapse:separate;border-spacing: 0px 10px">
                <tr>
                  <td>
                    <input style="height:16px" type="checkbox" v-model="checkedAll" @change="changeState">
                  </td>
                  <td>姓名</td>
                  <td>关系</td>
                  <td>工作单位</td>
                  <td>职务</td>
                  <td>政治面貌</td>
                  <td>备注</td>
                </tr>
                <tbody>
                  <tr v-for="(item,index) in itemTestList">
                    <td>
                      <input style="height:16px" type="checkbox" v-model="checkModel" :value="index">

                    </td>
                    <td><input type="text" :value="item.NAME"></td>
                    <td><input type="text" :value="item.RELATION"></td>
                    <td><input type="text" :value="item.WORK_PLACE" style="width:198px"></td>
                    <td><input type="text" :value="item.POSITION" width="78"></td>
                    <td><input type="text" :value="item.POLITICS_STATUS_ID_NAME" width="78"></td>
                    <td><input type="text" :value="item.COMMENTS" width="78"></td>

                  </tr>
                </tbody>
              </table>
              <div style="margin-top: 10px;margin-left:20px;">
                <el-button>保存</el-button>
                <el-button @click="cmdFamilyAdd">新增</el-button>
                <el-button>删除</el-button>


              </div>
            </div>

            <div class="mes clearfix" @click="showEducation" v-bind:class="{ marginb: isShowEducation}">
              <div class="fl">
                <e></e>学历信息</div>
              <div class="fr">展开／隐藏</div>
            </div>
            <div class="mess mess1" v-show="isShowEducation">
              <table style="border-collapse:separate;border-spacing: 0px 10px">
                <tr>
                  <td>
                    <el-checkbox v-model="checkEducation" style="padding:0 10px 0 35px;"></el-checkbox>
                  </td>
                  <td>起始时间</td>
                  <td>终止时间</td>
                  <td>学校单位名称</td>
                  <td>专业</td>
                  <td>学制</td>
                  <td>学历</td>
                  <td>学历类型</td>
                  <td>学位</td>
                </tr>
                <tbody>
                  <tr>
                    <td>
                      <el-checkbox v-model="checkEducation" style="padding:0 10px 0 35px;"></el-checkbox>
                    </td>
                    <td><input type="text" value="2009.6.1"></td>
                    <td><input type="text" value="2012.9.1"></td>
                    <td><input type="text" value="湖南省浏阳中医学院" style="width:198px"></td>
                    <td><input type="text" value="药理学"></td>
                    <td><input type="text" value="全日制"></td>
                    <td><input type="text" value="硕士"></td>
                    <td>
                      <span>
                                                        <select class="span-select" name="" id="" width="78">
                                                        <option value="最高">最高</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                   </span>
                    </td>
                    <td><input type="text" value="医学学士"></td>
                  </tr>
                </tbody>
              </table>
              <div style="margin-top: 10px;margin-left:20px;">
                <el-button>保存</el-button>
                <el-button>新增</el-button>
                <el-button>删除</el-button>
              </div>
            </div>
            <div class="mes clearfix" @click="showWork" v-bind:class="{ marginb: isShowWork}">
              <div class="fl">
                <e></e>工作经历</div>
              <div class="fr">展开／隐藏</div>
            </div>
            <div class="mess mess1" v-show="isShowWork">
              <table style="border-collapse:separate;border-spacing: 0px 10px">
                <tr>
                  <td>
                    <el-checkbox v-model="checkWork" style="padding:0 10px 0 35px;"></el-checkbox>
                  </td>
                  <td>起始时间</td>
                  <td>终止时间</td>
                  <td>单位名称</td>
                  <td>薪资待遇</td>
                  <td>证明人</td>
                  <td>证明人联系方式</td>
                  <td>起算司龄</td>
                  <td>起算工龄</td>
                </tr>
                <tbody>
                  <tr>
                    <td>
                      <el-checkbox v-model="checkWork" style="padding:0 10px 0 35px;"></el-checkbox>
                    </td>
                    <td><input type="text" value="2008.9.1"></td>
                    <td><input type="text" value="2012.6.1"></td>
                    <td><input type="text" value="湖南省浏阳中医学院" style="width:198px"></td>
                    <td><input type="text" value="10000/月"></td>
                    <td><input type="text" value="铁拐李"></td>
                    <td><input type="text" value="13827808080" style="width:128px"></td>
                    <td>
                      <span>
                                                        <select class="span-select" name="" id="" width="78">
                                                        <option value="最高">是</option>
                                                        <option value="其它">否</option>
                                                    </select>
                                                   </span>
                    </td>
                    <td>
                      <span>
                                                        <select class="span-select" name="" id="" width="78">
                                                        <option value="最高">是</option>
                                                        <option value="其它">否</option>
                                                    </select>
                                                   </span>
                    </td>
                  </tr>

                </tbody>
              </table>
              <div style="margin-top: 10px;margin-left:20px;">
                <el-button>保存</el-button>
                <el-button>新增</el-button>
                <el-button>删除</el-button>
              </div>
            </div>
            <div class="mes clearfix" @click="showAccount" v-bind:class="{ marginb: isShowAccount}">
              <div class="fl">
                <e></e>账号信息</div>
              <div class="fr">展开／隐藏</div>
            </div>
            <div class="mess mess1" v-show="isShowAccount">
              <table style="border-collapse:separate;border-spacing: 0px 10px">
                <tr>
                  <td>
                    <el-checkbox v-model="checkAccount" style="padding:0 10px 0 35px;"></el-checkbox>
                  </td>
                  <td>账号类型</td>
                  <td>账号/卡号</td>
                </tr>
                <tbody>
                  <tr>
                    <td>
                      <el-checkbox v-model="checkAccount" style="padding:0 10px 0 35px;"></el-checkbox>
                    </td>
                    <td>
                      <span>
                                                        <select class="span-select" name="" id="" style="width:128px">
                                                        <option value="最高">工资卡账号</option>
                                                        <option value="其它">其它</option>
                                                        </select>
                                                   </span>
                    </td>
                    <td><input type="text" value="6212345678901234567" style="width:368px"></td>
                  </tr>
                </tbody>
              </table>
              <div style="margin-top: 10px;margin-left:20px;">
                <el-button>保存</el-button>
                <el-button>新增</el-button>
                <el-button>删除</el-button>
              </div>
            </div>

            <div class="mes clearfix" @click="showTitle" v-bind:class="{ marginb: isShowTitle}">
              <div class="fl">
                <e></e>职称信息</div>
              <div class="fr">展开／隐藏</div>
            </div>
            <div class="mess mess3" v-show="isShowTitle">
              <table style="border-collapse:separate;border-spacing: 0px 10px">
                <tr>
                  <td>
                    <el-checkbox v-model="checkTitle" style="padding:0 10px 0 35px;"></el-checkbox>
                  </td>
                  <td>职称类型</td>
                  <td>职称级别</td>
                  <td>评定时间</td>
                  <td>评定有效期</td>
                  <td>评定小组组长</td>
                  <td>职称系列</td>
                  <td>默认职称</td>
                </tr>
                <tbody>
                  <tr>
                    <td>
                      <el-checkbox v-model="checkTitle" style="padding:0 10px 0 35px;"></el-checkbox>
                    </td>
                    <td>
                      <select class="span-select1" name="" id="">
                                                        <option value="最高">主任医师</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                    </td>
                    <td>
                      <select class="span-select1" name="" id="">
                                                        <option value="最高">正高</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                    </td>
                    <td><input type="text" value="2008.3.1"></td>
                    <td><input type="text" value="2012.3.1"></td>
                    <td>
                      <select class="span-select1" name="" id="">
                                                        <option value="最高">铁拐李</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                    </td>
                    <td>
                      <select class="span-select1" name="" id="">
                                                        <option value="最高">正高</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                    </td>
                    <td>
                      <span>
                                                            <input type="radio" name="" id="" style="height:20px">
                                                   </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style="margin-top: 10px;margin-left:20px;">
                <el-button>保存</el-button>
                <el-button>新增</el-button>
                <el-button>删除</el-button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</template>
<script>
/*
    // 家庭信息  地址：hrm/staff/Srv_HRM_StaffFamilyList.ashx
    // let mes = {
    //     id:"",
    //     STAFF_ID:"员工ID",
    //     NAME:"家庭姓名",
    //     PHONE:"联系方式",
    //     BIRTHDAY:"出生年月",
    //     RELATION:"关系",
    //     POSITION:"职务",
    //     WORK_PLACE:"工作单位",
    //     POLITICS_STATUS_ID:"政治面貌",
    //     COMMENTS:"备注",
    //     };

    // 教育信息  地址：hrm/staff/Srv_HRM_StaffEducationSave.ashx
    // let mes1 = {
    //     id:"",
    //     STAFF_ID:"",
    //     STAFF_ID_NAME:"",
    //     LEARNING_FORMS_ID:"学习形式",
    //     LEARNING_FORMS_ID_NAME:"学习形式",
    //     ACADEMIC_DEGREE_ID:"学位",
    //     ACADEMIC_DEGREE_ID_NAME:"学位",
    //     MAJOR:"专业",
    //     IS_HIGHEST:"是否最高学历",
    //     IS_HIGHEST_NAME:"是否最高学历",
    //     DEGREE_ID:"学历",
    //     DEGREE_ID_NAME:"学历",
    //     BEGIN_DATE:"起始时间",
    //     END_DATE:"终止时间",
    //     SCHOOL:"学校名称",
    //     WITNESS:"证明人",
    //     SCHOOLING_ENGTH:"学制",
    //     CONTACT_INFORMATION:"证明人联系方式",
    //     OBTAIN_DATE:"取证时间",
    //     COMMENTS:"备注",
    //     };

    // 工作经历   地址：hrm/staff/Srv_HRM_StaffWorkList.ashx
    // let mes2 = {
    //      id:"",
    //      STAFF_ID:"员工姓名ID",
    //      STAFF_ID_NAME:"员工姓名",
    //      ENTERPRISE:"单位名称",
    //      DUTY:"职务或工作范围",
    //      BEGIN_DATE:"起始时间",
    //      END_DATE:"终止时间",
    //      RESPONSIBILITIES:"主要工作职责与业绩",
    //      SALARY:"薪资待遇",
    //      LEAVING_REASONS:"离职原因",
    //      WITNESS:"证明人",
    //      CONTACT_INFORMATION:"证明人联系方式",
    //      IS_FIRST:"是否起算工龄",
    //      IS_FIRST_NAME:"是否起算工龄",
    //      IS_OWN_FIRST:"是否起算本企业工龄",
    //      IS_OWN_FIRST_NAME:"是否起算本企业工龄",
    //      COMMENTS:"备注",
    // }

    // 账户信息  地址：hrm/staff/Srv_HRM_StaffAccountList.ashx
    // let mes3 = {
    //      id:"",
    //      STAFF_ID:"员工姓名ID",
    //      STAFF_ID_NAME:"员工姓名",
    //      TYPE_ID:"账号类型ID",
    //      TYPE_ID_NAME:"账号类型",
    //      ACCOUNT:"账号",
    //       COMMENTS:"备注",
    // }

    // 证书信息   地址：hrm/staff/Srv_HRM_StaffCertificateList.ashx
    // let mes4 = {
    //      id:"",
    //       STAFF_ID :"员工姓名ID",
    //       STAFF_ID_NAME :"员工姓名",
    //       NAME :"证书名称",
    //       CODE :"证书编号",
    //       TYPE_ID :"证书类型",
    //       TYPE_ID_NAME :"证书类型",
    //       SCOPE_ID :"证书范围",
    //       SCOPE_ID_NAME :"证书范围",
    //       ACQUIRE_DATE :"取证时间",
    //       VALIDITY_ID :"证书有效期",
    //       VALIDITY_ID_NAME :"证书有效期",
    //       CERTIFYING_AUTHORITY : "发证机构",
    //       COMMENTS:"备注",
    // }

    // 职称信息    地址：hrm/staff/Srv_HRM_StaffTitleList.ashx
    // let mes5 = {
    //     id:"",
    //     STAFF_ID :"员工姓名ID",
    //     STAFF_ID_NAME :"员工姓名",
    //     TYPE_ID :"职称类型ID",
    //     TYPE_ID_NAME :"职称类型",
    //     LEVEL_ID :"职称级别ID",
    //     LEVEL_ID_NAME :"职称级别",
    //     TITLE_SERIES_ID :"职称系列ID",
    //     TITLE_SERIES_ID_NAME :"职称系列",
    //     EVALUATE_DATE :"评定时间",
    //     APPOINT_DATE :"聘任日期",
    //     VALIDITY_ID :"评定有效期",
    //     VALIDITY_ID_NAME :"评定有效期",
    //     USER_ID :"评定小组组长",
    //     USER_ID_NAME :"评定小组组长",
    //     IS_DEFAULT :"是否默认",
    //     IS_DEFAULT_NAME :"是否默认",
    //     COMMENTS:"备注",
    // }
*/

import {
  format,
  compareAsc
} from 'date-fns'
import JSON5 from 'json5'
import datepicker from './subcom/datepicker.vue';

export default {
  components: {
    datepicker
  },
  data() {
    return {
      itemTestList: [{
          ID: "1",
          STAFF_ID: "1",
          STAFF_ID_NAME: "张三",
          NAME: "张1",
          PHONE: "123",
          BIRTHDAY: "2011-11-12",
          RELATION: "父",
          POSITION: "a",
          WORK_PLACE: "b",
          POLITICS_STATUS_ID: "1",
          POLITICS_STATUS_ID_NAME: "b",
          COMMENTS: "c"
        },
        {
          ID: "2",
          STAFF_ID: "2",
          STAFF_ID_NAME: "李四",
          NAME: "李2",
          PHONE: "321",
          BIRTHDAY: "2011-11-12",
          RELATION: "父",
          POSITION: "a",
          WORK_PLACE: "b",
          POLITICS_STATUS_ID: "2",
          POLITICS_STATUS_ID_NAME: "b",
          COMMENTS: "c"
        }
      ],
      checkedAll: false,
      checkModel: [],
      checkCertificate: false,
      checkFamily: true,
      checkEducation: false,
      checkWork: false,
      checkAccount: false,
      checkTitle: false,
      marginb: false,
      activeNames: ['1'],
      fileList2: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      isShowCertificate: false, //证书数据展开
      isShowFamily: false, //家庭数据展开
      isShowEducation: false, //学历数据展开
      isShowWork: false, //工作经历数据展开
      isShowAccount: false, //账户数据展开
      isShowTitle: false, //职称数据展开
      isCertificateEvent: false, //监控证书事件只触发一次
      isFamilyEvent: false, //监控家庭事件只触发一次
      isEducationEvent: false, //监控学历事件只触发一次
      isWorkEvent: false, //监控工作经历事件只触发一次
      isAccountEvent: false, //监控账户事件只触发一次
      isTitleEvent: false, //监控职称事件只触发一次
      tableResultList: {

      },
      pickerOptions0: {
        disabledDate(time) {
          //					     return time.getTime() < Date.now() - 8.64e7;
        }
      },
      paramCk: "code",
      paramText: "",
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
      boxMouseOverbgc: "", //控制tr高亮
      topBox: 0,
      boxIndex: -1, //列表获取数据索引
      boxChangeValue: "",
      isBoxDept: false, //部门box控制隐藏
      searchDetailDeptDataList: {
        total: 0,
        rows: [{
            ID: "2",
            NAME: "开发部"
          },
          {
            ID: "3",
            NAME: "销售部"
          },
          {
            ID: "2",
            NAME: "开发部"
          },
          {
            ID: "3",
            NAME: "销售部"
          },
          {
            ID: "2",
            NAME: "开发部"
          },
          {
            ID: "3",
            NAME: "销售部"
          },
          {
            ID: "2",
            NAME: "开发部"
          }
        ]
      },
      currentPageDept: 1, //box部门当前页数
      currentPageSizeDept: 5, //box部门页数大小
      isDisabledInput: false,
      querySelectorList: [{
          id: "code",
          name: "单号"
        },
        {
          id: "adjustCode",
          name: "调动文号"
        },
        {
          id: "effectDate",
          name: "生效日期"
        },
        {
          id: "createDate",
          name: "录入日期"
        },
        {
          id: "stateName",
          name: "审核状态"
        }
      ], //列表查询条件
      modelObj: {
        ID: '',
        TYPE_ID: '', //员工状态
        TYPE_ID_NAME: '', //员工状态
        AURHORIZED_TYPE_ID: '', //编制类型
        AURHORIZED_TYPE_ID_NAME: '', //编制类型
        CODE: '', //工号
        NAME: '', //姓名
        PHOTO: '', //照片
        DEPT_ID: '', //部门
        DEPT_ID_NAME: '', //部门
        POSTION_ID: '', //职务
        POSTION_ID_NAME: '', //职务
        SEX: '', //性别
        SEX_NAME: '', //性别
        BIRTHDAY: '', //出生年月
        AGE: '', //年龄
        NATIVE_PLACE: '', //籍贯
        NATION_ID: '', //民族
        NATION_ID_NAME: '', //民族
        HEIGHT: 0, //身高
        WEIGHT: 0, //体重
        EYESIGHT: 0, //视力
        BLOOD_TYPE_ID: '', //血型
        BLOOD_TYPE_ID_NAME: '', //血型
        POLITICS_STATUS_ID: '', //中共党员
        POLITICS_STATUS_ID_NAME: '', //中共党员
        DOMICILE_PLACE: '', //户口所在地
        ID_NUMBER: '', //身份证号码
        HEALTH_STATUS_ID: '', //健康状况
        HEALTH_STATUS_ID_NAME: '', //健康状况
        MARITAL_STATUS_ID: '', //婚姻状况
        MARITAL_STATUS_ID_NAME: '', //婚姻状况
        FOREIGN_LANGUAGE_ID: '', //外语水平
        FOREIGN_LANGUAGE_ID_NAME: '', //外语水平
        COMPUTER_SKILL_ID: '', //计算机水平
        COMPUTER_SKILL_ID_NAME: '', //计算机水平
        HOME_ADDRESS: '', //家庭通讯地址
        HOME_POST_CODE: '', //邮政编码
        WORK_PHONE_NUMBER: '', //办公号码
        CELL_PHONE_NUMBER: '', //手机号码
        HOME_PHONE_NUMBER: '', //住宅号码
        EMAIL: '', //电子邮件
        WORKPLACE: '', //工作地点
        SPECIAL: '', //特长
        HOBBY: '', //爱好
        SELF_ASSESSMENT: '', //自我评价
        ENTRY_DATE: '', //入职日期
        DIMISSION_DATE: '', //离职时间
        IS_DIMISSION: 2,
        IS_DIMISSION_NAME: '', //1是2否离职
        PERSON_IDENTITY_ID: '', //个人身份
        PERSON_IDENTITY_ID_NAME: '', //个人身份
        PARTY_DATE: '', //入党时间
        STANDARD_CULTURE_ID: '', //文化程度
        STANDARD_CULTURE_ID_NAME: '', //文化程度
        APPOINT_TYPE_ID: '', //任用方式
        APPOINT_TYPE_ID_NAME: '', //任用方式
        AURHORIZED_CODE: '', //用编文号
        WORK_DATE: '', //参加工作时间
        WORKAGE: '', //工龄
        TYPE1_ID: '', //职工类别1
        TYPE1_ID_NAME: '', //职工类别1
        TYPE2_ID: '', //职工类别2
        TYPE2_ID_NAME: '', //职工类别2
        TYPE3_ID: '', //职工类别3
        TYPE3_ID_NAME: '', //职工类别3
        TYPE4_ID: '', //职工类别4
        TYPE4_ID_NAME: '', //职工类别4
        PRACTCERTIFICATE_ID: '', //执业资格
        PRACTCERTIFICATE_ID_NAME: '', //执业资格
        OBTAIN_DATE: '', //取得资格时间
        APPOINT_ID: '', //专业
        APPOINT_ID_NAME: '', //专业
        APPT_DATE: '', //聘任时间
        TAKEOFF_DATE: '', //任职时间
        COME_DATE: '', //来院日期
        IS_LICENSE: 2,
        IS_LICENSE_NAME: '', //执照(1有2无)
        IS_WHOLECARD: 2,
        IS_WHOLECARD_NAME: '', //全科证(1有2无)
        DIST_TYPE_ID: '', //港澳台侨胞
        DIST_TYPE_ID_NAME: '', //港澳台侨胞
        PLC_POSTION_ID1: '', //兼职职务1
        PLC_POSTION_ID1_NAME: '', //兼职职务1
        PLC_POSTION_ID2: '', //兼职职务2
        PLC_POSTION_ID2_NAME: '', //兼职职务2
        APPOINT_SALARY_ID: '', //约定工资标准
        APPOINT_SALARY_ID_NAME: '', //约定工资标准
        APPOINT_STATION_ID: '', //约定岗位
        APPOINT_STATION_ID_NAME: '', //约定岗位
        APPOINT_STATION_DATE: '', //约定岗位日期
        COMMENTS: '', //备注
      }, //主数据保存
      userMsg: {}, //用户登录信息及按钮权限
      isShowEdit: false, //编辑列表视图切换
      pageSize: 10, //列表主数据页数大小
      currentPage: 1, //列表主数据当前页数
      tableResultList: {
        total: 0,
        rows: []
      }, //主表列表数据
      // detailTypeList:{total:0,rows:[]},//调动类型对象定义
      tableCertificateList: {
        total: 0,
        rows: [{
          ID: "",
          STAFF_ID: "",
          STAFF_ID_NAME: "",
          NAME: "", //证书名称
          CODE: "", //证书编号
          TYPE_ID: "", //证书类型
          TYPE_ID_NAME: "", //证书类型
          SCOPE_ID: "", //证书范围
          SCOPE_ID_NAME: "", //证书范围
          ACQUIRE_DATE: "", //取证时间
          VALIDITY_ID: "", //证书有效期
          VALIDITY_ID_NAME: "", //证书有效期
          CERTIFYING_AUTHORITY: "", //发证机构
          COMMENTS: "" //备注
        }]
      }, //证书列表数据
      dropDownSexList: [],
      dropDownCertificateScopeList: [],
      dropDownCertificateValidityList: [],
      dropDownCertificateTypeList: [],
    }
  },
  // filters: {
  // },
  watch: {
    checkModel: {
      handler() {
        if (this.checkModel.length == this.itemTestList.length) {
          this.checkedAll = true;
        } else {
          this.checkedAll = false;
        }
      }
    }
  },
  methods: {
    changeState() {
      this.checkModel = [];
      if (this.checkedAll == true) {
        this.itemTestList.forEach(function(value, index) {
          this.checkModel.push(index);
        }, this);

      }
    },
    //家庭信息
    showFamily() {
      this.isShowFamily = !this.isShowFamily;
    },
    //学历信息
    showEducation() {
      this.isShowEducation = !this.isShowEducation;
    },
    //工作经历
    showWork() {
      this.isShowWork = !this.isShowWork;
    },
    //账号信息
    showAccount() {
      this.isShowAccount = !this.isShowAccount;
    },
    //证书信息
    showCertificate() {
      if (!this.isCertificateEvent) {
        this.cmdCertificateList();
        this.isCertificateEvent = true;
      }
      this.isShowCertificate = !this.isShowCertificate;
    },
    //职称信息
    showTitle() {
      this.isShowTitle = !this.isShowTitle;
    },
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
      if (!this.btnActive.isLinkRemove) {
        if (state == 1)
          isView = true;
      }

      return isView;
    },
    //隐藏列表编辑按钮
    viewEdit(state) {
      let isView = false;
      if (!this.btnActive.isLinkEdit) {
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
      }
      return isView;
    },
    viewSpan(state) {
      let isView = false;
      if (state == 1 && !this.btnActive.isLinkRemove) {
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
    //点击隐藏弹出Box框
    searchBoxListHidden() {
      this.isBoxDept = false;
    },
    /*部门弹出开始*/
    selectDetailDept(item) {
      this.modelObj.DetailList[this.boxIndex].DEPT_ID = item.ID;
      this.modelObj.DetailList[this.boxIndex].DEPT_ID_NAME = item.NAME;
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
      this.boxIndex = index;
      this.isBoxDept = true;
      this.boxChangeValue = this.modelObj.DEPT_ID_NAME;
      this.currentPageDept = 1;
      this.searchDetailDeptList();
    },
    //点击页数事件
    handleCurrentChangeDetailDept(val) {
      this.currentPageDept = val = 0 ? 1 : val;
      this.searchDetailDeptList();
    },
    //查询请求
    searchDetailDeptList() {
      var paramObj = {
        tabName: "COM_DEPART",
        valueField: "ID",
        nameField: "NAME",
        nameValue: "NAME",
        keyWord: this.boxChangeValue
      };

      var param = this.common.comPagingParam(this.currentPageDept, this.currentPageSizeDept, "", paramObj);
      var url = this.common.baseNodeUrl + "Srv_ComBoxList.ashx" + param
      this.$http.get(url)
        .then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            this.searchBoxDeptDataList = [];
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("获取部门数据失败");
          }
          var msgObj = JSON5.parse(dataJson.Message);
          this.searchBoxDeptDataList = msgObj;
        }).catch(function(res) {
          console.log(res + "获取部门数据异常")
        });
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
      // var thisDate = Date.now();
      this.modelObj = {
        ID: '',
        TYPE_ID: '', //员工状态
        TYPE_ID_NAME: '', //员工状态
        AURHORIZED_TYPE_ID: '', //编制类型
        AURHORIZED_TYPE_ID_NAME: '', //编制类型
        CODE: '', //工号
        NAME: '', //姓名
        PHOTO: '', //照片
        DEPT_ID: '', //部门
        DEPT_ID_NAME: '', //部门
        POSTION_ID: '', //职务
        POSTION_ID_NAME: '', //职务
        SEX: '', //性别
        SEX_NAME: '', //性别
        BIRTHDAY: '', //出生年月
        AGE: '', //年龄
        NATIVE_PLACE: '', //籍贯
        NATION_ID: '', //民族
        NATION_ID_NAME: '', //民族
        HEIGHT: 0, //身高
        WEIGHT: 0, //体重
        EYESIGHT: 0, //视力
        BLOOD_TYPE_ID: '', //血型
        BLOOD_TYPE_ID_NAME: '', //血型
        POLITICS_STATUS_ID: '', //中共党员
        POLITICS_STATUS_ID_NAME: '', //中共党员
        DOMICILE_PLACE: '', //户口所在地
        ID_NUMBER: '', //身份证号码
        HEALTH_STATUS_ID: '', //健康状况
        HEALTH_STATUS_ID_NAME: '', //健康状况
        MARITAL_STATUS_ID: '', //婚姻状况
        MARITAL_STATUS_ID_NAME: '', //婚姻状况
        FOREIGN_LANGUAGE_ID: '', //外语水平
        FOREIGN_LANGUAGE_ID_NAME: '', //外语水平
        COMPUTER_SKILL_ID: '', //计算机水平
        COMPUTER_SKILL_ID_NAME: '', //计算机水平
        HOME_ADDRESS: '', //家庭通讯地址
        HOME_POST_CODE: '', //邮政编码
        WORK_PHONE_NUMBER: '', //办公号码
        CELL_PHONE_NUMBER: '', //手机号码
        HOME_PHONE_NUMBER: '', //住宅号码
        EMAIL: '', //电子邮件
        WORKPLACE: '', //工作地点
        SPECIAL: '', //特长
        HOBBY: '', //爱好
        SELF_ASSESSMENT: '', //自我评价
        ENTRY_DATE: '', //入职日期
        DIMISSION_DATE: '', //离职时间
        IS_DIMISSION: 2,
        IS_DIMISSION_NAME: '', //1是2否离职
        PERSON_IDENTITY_ID: '', //个人身份
        PERSON_IDENTITY_ID_NAME: '', //个人身份
        PARTY_DATE: '', //入党时间
        STANDARD_CULTURE_ID: '', //文化程度
        STANDARD_CULTURE_ID_NAME: '', //文化程度
        APPOINT_TYPE_ID: '', //任用方式
        APPOINT_TYPE_ID_NAME: '', //任用方式
        AURHORIZED_CODE: '', //用编文号
        WORK_DATE: '', //参加工作时间
        WORKAGE: '', //工龄
        TYPE1_ID: '', //职工类别1
        TYPE1_ID_NAME: '', //职工类别1
        TYPE2_ID: '', //职工类别2
        TYPE2_ID_NAME: '', //职工类别2
        TYPE3_ID: '', //职工类别3
        TYPE3_ID_NAME: '', //职工类别3
        TYPE4_ID: '', //职工类别4
        TYPE4_ID_NAME: '', //职工类别4
        PRACTCERTIFICATE_ID: '', //执业资格
        PRACTCERTIFICATE_ID_NAME: '', //执业资格
        OBTAIN_DATE: '', //取得资格时间
        APPOINT_ID: '', //专业
        APPOINT_ID_NAME: '', //专业
        APPT_DATE: '', //聘任时间
        TAKEOFF_DATE: '', //任职时间
        COME_DATE: '', //来院日期
        IS_LICENSE: 2,
        IS_LICENSE_NAME: '', //执照(1有2无)
        IS_WHOLECARD: 2,
        IS_WHOLECARD_NAME: '', //全科证(1有2无)
        DIST_TYPE_ID: '', //港澳台侨胞
        DIST_TYPE_ID_NAME: '', //港澳台侨胞
        PLC_POSTION_ID1: '', //兼职职务1
        PLC_POSTION_ID1_NAME: '', //兼职职务1
        PLC_POSTION_ID2: '', //兼职职务2
        PLC_POSTION_ID2_NAME: '', //兼职职务2
        APPOINT_SALARY_ID: '', //约定工资标准
        APPOINT_SALARY_ID_NAME: '', //约定工资标准
        APPOINT_STATION_ID: '', //约定岗位
        APPOINT_STATION_ID_NAME: '', //约定岗位
        APPOINT_STATION_DATE: '', //约定岗位日期
        COMMENTS: '', //备注
        STATE: 1,
        STATE_NAME: ''
      }

      this.isCertificateEvent = false; //监控证书事件只触发一次
      this.isFamilyEvent = false; //监控家庭事件只触发一次
      this.isEducationEvent = false; //监控学历事件只触发一次
      this.isWorkEvent = false; //监控工作经历事件只触发一次
      this.isAccountEvent = false; //监控账户事件只触发一次
      this.isTitleEvent = false; //监控职称事件只触发一次
      this.isShowCertificate = false; //展开显示
      this.isShowFamily = false;
      this.isShowEducation = false;
      this.isShowWork = false;
      this.isShowAccount = false;
      this.isShowTitle = false;
      // if(this.userMsg.ControlBar.IsReadonly!=1){
      // 	if(this.userMsg.ControlBar.IsAdd!=1 && this.userMsg.ControlBar.IsEdit!=1)
      // 	{
      // 		this.btnActive.isSave = true;
      // 		// this.isDisabledInput = true;
      // 		this.btnActive.isDetailAdd = true;
      // 		this.btnActive.isDetailLinkRemove = true;
      // 	}else
      // 	{
      // 		this.btnActive.isSave = false;
      // 		// this.isDisabledInput = false;
      // 		this.btnActive.isDetailAdd = false;
      // 		this.btnActive.isDetailLinkRemove = false;
      // 	}
      // 	this.btnActive.isAudit = true;
      // 	if(this.userMsg.ControlBar.IsSubmit!=1)
      // 	{
      // 		this.btnActive.isSubmit = true;
      // 	}else
      // 	{
      // 		this.btnActive.isSubmit = false;
      // 	}

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
      var param = this.common.orderComPagingParam(this.currentPage, this.pageSize, "CREATE_TIME", "ASC", "", paramObj);
      var url = this.common.baseNodeUrl + "hrm/staff/Srv_HRM_StaffList.ashx" + param
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
      var url = this.common.baseNodeUrl + "hrm/staff/Srv_HRM_StaffSave.ashx";
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
      if (!this.modelObj.NAME.replace(/(^\s*)|(\s*$)/g, '')) {
        alert("请填入姓名")
        return false;
      }

      return result
    },
    //查看详情
    cmdLinkLook(item) {
      this.isShowEdit = true;
      this.clearModelObj();
      var url = this.common.baseNodeUrl + "hrm/staff/Srv_HRM_StaffGet.ashx?ID=" + item.ID;
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
      var url = this.common.baseNodeUrl + "hrm/staff/Srv_HRM_StaffGet.ashx?ID=" + item.ID;
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

        var url = this.common.baseNodeUrl + "hrm/staff/Srv_HRM_StaffDel.ashx";
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
    cmdCertificateAdd() {
      var list = {
        ID: "",
        STAFF_ID: this.modelObj.ID,
        STAFF_ID_NAME: "",
        NAME: "", //证书名称
        CODE: "", //证书编号
        TYPE_ID: "", //证书类型
        TYPE_ID_NAME: "", //证书类型
        SCOPE_ID: "", //证书范围
        SCOPE_ID_NAME: "", //证书范围
        ACQUIRE_DATE: "", //取证时间
        VALIDITY_ID: "", //证书有效期
        VALIDITY_ID_NAME: "", //证书有效期
        CERTIFYING_AUTHORITY: "", //发证机构
        COMMENTS: "" //备注
      }

      this.tableCertificateList.rows.push(list);
    },
    cmdCertificateList() {
      console.log(this.modelObj.ID)
      var url = this.common.baseNodeUrl + "hrm/staff/Srv_HRM_StaffCertificateList.ashx?ID=" + this.modelObj.ID;
      this.$http.get(url)
        .then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("证书信息查询列表数据失败");
            return false;
          }
          this.tableCertificateList = dataJson.Message;
        }).catch(function(res) {
          console.log(res + "证书信息查询列表数据异常")
        });
    },
    cmdCertificateSave() {
      var strDataJson = JSON5.stringify(this.tableCertificateList.rows);
      var url = this.common.baseNodeUrl + "hrm/staff/Srv_HRM_CertificateSave.ashx";
      this.$http.post(url, strDataJson, {
        emulateJSON: true
      }).then(function(res) {
        var dataJson = res.body;
        if (dataJson.Succeed != 1) {
          if (dataJson.Message != null) {
            alert(dataJson.Message);
          }
          console.log("证书保存数据失败");
          return false;
        } else {
          this.cmdCertificateList();
        }

      }).catch(function(res) {
        console.log(res + "证书保存数据异常")
      });
    },
    cmdCertificateRemove(item, index) {
      var list = this.tableResultList.rows;
      if (item.ID != undefined && item.ID != "") {
        var ids = "['" + item.ID + "']";
        var url = this.common.baseNodeUrl + "hrm/staff/Srv_HRM_CertificateDel.ashx";
        this.$http.post(url, ids, {
            emulateJSON: true
          })
          .then(function(res) {
            var dataJson = res.body;
            if (dataJson.Succeed != 1) {
              if (dataJson.Message != null) {
                alert(dataJson.Message);
              }
              console.log("删除证书数据失败");
              return false;
            }
            list.splice(index, 1);
            if (list.length == 0) {
              this.cmdCertificateAdd();
            }

          }).catch(function(res) {
            console.log(res + "删除证书数据异常")
          });
      } else {
        if (list.length > 1) {
          list.splice(index, 1);
        }
      }

    },
    cmdFamilyAdd() {

    },
    //下拉框初始化
    dropDownData() {
      //性别
      var dropObj = {
        tabName: "COM_TYPE",
        viewName: "NAME"
      };
      var dropParam = this.common.comGetParam("PARENT_ID='0090'", dropObj);
      var dropUrl = this.common.baseNodeUrl + "Srv_DropDownList.ashx" + dropParam;
      this.$http.get(dropUrl)
        .then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            this.dropDownSexList = [];
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("获取性别数据失败");
            return false;
          }
          var msgObj = JSON5.parse(dataJson.Message);
          this.dropDownSexList = msgObj;
        }).catch(function(res) {
          console.log(res + "获取性别数据异常")
        });

      //证书范围
      dropParam = this.common.comGetParam("PARENT_ID='HR07'", dropObj);
      dropUrl = this.common.baseNodeUrl + "Srv_DropDownList.ashx" + dropParam;
      this.$http.get(dropUrl)
        .then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            this.dropDownCertificateScopeList = [];
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("获取证书范围数据失败");
            return false;
          }
          var msgObj = JSON5.parse(dataJson.Message);
          this.dropDownCertificateScopeList = msgObj;
        }).catch(function(res) {
          console.log(res + "获取证书范围数据异常")
        });
      //证书类型
      dropParam = this.common.comGetParam("PARENT_ID='0102'", dropObj);
      dropUrl = this.common.baseNodeUrl + "Srv_DropDownList.ashx" + dropParam;
      this.$http.get(dropUrl)
        .then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            this.dropDownCertificateTypeList = [];
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("获取证书类型数据失败");
            return false;
          }
          var msgObj = JSON5.parse(dataJson.Message);
          this.dropDownCertificateTypeList = msgObj;
        }).catch(function(res) {
          console.log(res + "获取证书类型数据异常")
        });

      //证书有效期
      dropParam = this.common.comGetParam("PARENT_ID='0103'", dropObj);
      dropUrl = this.common.baseNodeUrl + "Srv_DropDownList.ashx" + dropParam;
      this.$http.get(dropUrl)
        .then(function(res) {
          var dataJson = res.body;
          if (dataJson.Succeed != 1) {
            this.dropDownCertificateValidityList = [];
            if (dataJson.Message != null) {
              alert(dataJson.Message);
            }
            console.log("获取证书有效期数据失败");
            return false;
          }
          var msgObj = JSON5.parse(dataJson.Message);
          this.dropDownCertificateValidityList = msgObj;
        }).catch(function(res) {
          console.log(res + "获取证书有效期数据异常")
        });
    }
  },
  //初始化
  created() {
    var userParam = "?pageName=modules/VUE/index.html@/hrm_staff";
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
    this.dropDownData();
  },
  mounted() {

  },
}
</script>
<style scoped>
.el-row {
  margin: 10px 30px 10px 0;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  text-align: right;
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}







/*个人信息的样式*/

.information {
  margin-left: -30px;
}

.information .el-row .el {
  text-align: right;
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






/*YABLE表格里面复选框的样式*/

input.tabChecked {
  width: 20px;
  height: 10px;
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
  border-right: 3px solid transparent;
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
  left: -43px;
}

.compile {
  background: #ffffff;
  border: 1px solid #ebf2f6;
  box-shadow: -5px 0 5px 0 rgba(235, 242, 246, 0.80);
  width: 1100px;
  position: absolute;
  left: -1008px;
  top: 0px;
  border-top: 22px solid #fff;
  border-bottom: 22px solid #fff;
  border-left: 44px solid #fff;
  border-right: 44px solid #fff;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #3f3f3f;
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
  right: 17px;
}

.inquire {
  background: url('images/查询icon01.png');
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.picture {
  margin-top: 10px;
  margin-left: 10px;
  width: 150px;
  height: 180px;
  display: inline-block;
  border: 1px solid #ccc;
  text-align: left;
  float: left;
}


.compile-top {
  position: relative;
  background: #fcfcfc;
  /* width: 1100px; */
  margin-bottom: 20px;
}


.compile-middle {
  /*height: 180px;*/
  margin-bottom: 20px;
  background-color: #fcfcfc;
  padding: 10px 0 15px;
}
.compile-middle .el-row .el-col {
  padding-right: 30px;

  /*text-align: left;*/
}

.compile-middle .el-row {
  padding: 5px;
}

.compile-middle .el-row span {
  padding-right: 20px;
}

.compile-bottom {
  background-color: #fcfcfc;
  padding: 15px 0;
}
.compile-bottom select{
  width: 120px;
}
.compile-bottom input {
  border: 1px solid #bababa;
  border-radius: 4px;
  width: 120px;
  height: 24px;
}
.compile-bottom .el-row .el-col {
  padding-right: 30px;

  /*text-align: left;*/
}

.compile-bottom .el-row {
  padding: 5px;
}

.compile-bottom .el-row span {
  padding-right: 20px;
}

.compile-bottom {
  background-color: #fcfcfc;
  padding-bottom: 15px;
}
.compile-middle ul li {
  margin-bottom: 15px;
  margin-left: 15px;
}

.compile-middle .showTable ul li {
  padding: 0;
  margin: 0;
  text-align: center;
}

.compile-middle .showTable ul li {
  padding: 0;
  margin: 0;
  text-align: center;
}

.compile-middle .showTable table tr:hover {
  background-color: #e9e9e9;
}

.compile-middle input {
  border: 1px solid #bababa;
  border-radius: 4px;
  width: 120px;
  height: 24px;
  /* margin-right: 90px; */
}

.compile-top input {
  margin-left: 20px;
  border: 1px solid #bababa;
  border-radius: 4px;
  width: 100px;
  height: 24px;
}

.compile-top ul {
  margin-top: 20px;
  margin-right: 20px;
}

.compile-top ul li {
  margin: 10px 0;
  text-align: right;
  width: 100%;
}







/*.compile-top input {
        margin-right: 20px;
    }*/

.lastul input {
  margin-right: 0px;
}

.el-upload {
  text-align: center;
  width: 161px;
  margin-top: 200px;
}







/* ul,
    li {
        list-style: none;
    }

    ul {
        padding-top: 20px;
    }

    ul:nth-child(1) {
        padding-left: 20px;
    } */

.panel table tr {
  height: 40px;
}

.panel table {
  color: rgb(93, 137, 179);
}

.panel {
  padding-right: 44px s;
  height: 500px;
  margin-top: 20px;
  padding-bottom: 50px;
}

.panel .mes {
  background: #fcfcfc;
  width: 1067px;
  height: 56px;
  margin-bottom: 20px;
  line-height: 56px;
  padding: 0 12px 0 22px;
}

.mes div {
  position: relative;
}

.mes div e {
  display: inline-block;
  background: #5d89b3;
  width: 3px;
  height: 18px;
  position: absolute;
  top: 50%;
  margin-top: -9px;
  left: -10px;
}

.mess {
  /* height: 172px; */
  background: #fcfcfc;
  margin-bottom: 20px;
  padding-bottom: 20px;
}

.messmargin {
  margin-bottom: 80px;
}

.panel .marginb {
  margin-bottom: 0;
}

.el-pagination .btn-prev {
  margin-left: 570px;
}

.compile-top .place {
  position: absolute;
  left: 457px;
  top: 195px;
}

.compile-top .placein {
  width: 312px;
}

.idinput input {
  width: 205px;
}

.compile-top .idinput {
  padding-top: 0px;
  padding-left: 18px;
}

.idinput .lastinput {
  width: 150px;
}

.hukou {
  padding-top: 0px;
}

.hukou input {
  width: 745px;
}

.techang input {
  width: 975px;
}

.mes table th div.cell {
  text-align: center;
  white-space: nowrap;
}

.el-table th>.cell {
  line-height: 60px;
}

.mes .mess1 table,
tr,
td {
  border: 0;
}

.mes .mess1 table,
td {
  text-align: center;
  margin-left: 5px;
}







/* .mes .mess1 table,td{

    } */

.mess1 input {
  border: 1px solid #dddddd;
  height: 26px;
  text-align: center;
  width: 98px;
  border-radius: 4px;
}

.mess2 input {
  border: 1px solid #dddddd;
  height: 26px;
  text-align: center;
  width: 118px;
  border-radius: 4px;
}

.mess3 input {
  border: 1px solid #dddddd;
  height: 26px;
  text-align: center;
  width: 118px;
  border-radius: 4px;
}

.span-select1 {
  border: 1px solid #dddddd;
  width: 118px;
  height: 30px;
  padding-left: 10px;
  border-radius: 4px;
}

.span-select {
  border: 1px solid #dddddd;
  width: 78px;
  height: 30px;
  padding-left: 10px;
  border-radius: 4px;
}

.el-button {}

.el-upload__tip {
  font-size: 10px;
}

.infoBottom {
  margin-top: 30px;
  position: relative;
}

.padleft {
  padding-left: 27px;
}

.stysave {
  margin: 20px 0px 30px -10px;
}

.el-button--warning {
  color: #fff;
  background-color: #5d89b3;
  border-color: #5d89b3;
}

.zhengshu {
  height: 400px;
  margin-bottom: 50px;
  margin-left: -90px;
  width: 1100px;
}

.zhengshu th {
  height: 55px;
}

.zhengshu tr {
  height: 55px;
}

.zhengshu input {
  height: 35px;
}

.spanLinkEdit {
  color: #05C400;
  cursor: pointer;
}

.spanLinkRemove {
  color: #E61A0F;
  cursor: pointer;
}

.spanLinkLook {
  color: #5d89b3;
  cursor: pointer;
}
</style>
