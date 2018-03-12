<div class="panel">
                            <div class="mes clearfix" @click="isshowmes0" v-bind:class="{ marginb: show0}" v-show="false">
                                <div class="fl">
                                    <e></e>家庭信息</div>
                                <div class="fr">展开／隐藏</div>
                            </div>
                            <div class="mess mess1" v-show="false">
                                <table style="border-collapse:separate;border-spacing: 0px 10px">
                                        <tr>
                                            <td> 
                                                <el-checkbox v-model="checked1" style="padding:0 10px 0 35px;"></el-checkbox>
                                            </td>
                                            <td>姓名</td>
                                            <td>关系</td>
                                            <td>工作单位</td>
                                            <td>职务</td>
                                            <td>政治面貌</td>
                                            <td>备注</td>
                                        </tr>
                                        <tbody>
                                             <tr>
                                                <td>
                                                     <el-checkbox v-model="checked2" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td><input type="text" value="风清扬"></td>
                                                <td><input type="text" value="父女"></td>
                                                <td><input type="text" value="武汉市组织管理部" style="width:198px" ></td>
                                                <td><input type="text" value="副处长" width="78"></td>
                                                <td><input type="text" value="党员" width="78"></td>
                                                <td><input type="text" value="" width="78"></td>
                                          
                                            </tr>
                                             <tr>
                                                <td>
                                                     <el-checkbox v-model="checked3" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value="" style="width:198px" ></td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value=""></td>
                                            </tr>
                                        </tbody>
                                    </table>  
                                    <div style="margin-top: 20px;margin-left:30px;">
                                       <el-button >保存</el-button>
                                       <el-button >新增</el-button>
                                       <el-button >删除</el-button>
                                    </div>
                            </div>

                            <div class="mes clearfix" @click="isshowmes1" v-bind:class="{ marginb: show1}" v-show="false">
                                <div class="fl">
                                    <e></e>学历信息</div>
                                <div class="fr">展开／隐藏</div>
                            </div>
                                <div class="mess mess1" v-show="show1">                                 
                                    <table style="border-collapse:separate;border-spacing: 0px 10px">
                                        <tr>
                                            <td> 
                                                <el-checkbox v-model="checked1" style="padding:0 10px 0 35px;"></el-checkbox>
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
                                                     <el-checkbox v-model="checked2" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td><input type="text" value="2009.6.1"></td>
                                                <td><input type="text" value="2012.9.1"></td>
                                                <td><input type="text" value="湖南省浏阳中医学院" style="width:198px" ></td>
                                                <td><input type="text" value="药理学"></td>
                                                <td><input type="text" value="全日制"></td>
                                                <td><input type="text" value="硕士" ></td>
                                                <td>
                                                   <span >
                                                        <select class="span-select" name="" id="" width="78">
                                                        <option value="最高">最高</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                   </span>
                                                    </td>
                                                <td><input type="text" value="医学学士"></td>
                                            </tr>
                                             <tr>
                                                <td>
                                                     <el-checkbox v-model="checked3" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value="" style="width:198px" ></td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value=""></td>
                                                <td>
                                                    <select class="span-select" name="" id="" width="78">
                                                        <option value="最高">最高</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                    </td>
                                                <td><input type="text" value="医学学士" width="78"></td>
                                            </tr>
                                        </tbody>
                                    </table>  
                                    <div style="margin-top: 20px;margin-left:30px;">
                                       <el-button >保存</el-button>
                                       <el-button >新增</el-button>
                                       <el-button >删除</el-button>
                                    </div>
                            </div>
                            <div class="mes clearfix" @click="isshowmes2" v-bind:class="{ marginb: show2}" v-show="false">
                                <div class="fl">
                                    <e></e>工作经历</div>
                                <div class="fr">展开／隐藏</div>
                            </div>
                            <div class="mess mess1" v-show="show2">
                                  <table style="border-collapse:separate;border-spacing: 0px 10px">
                                        <tr>
                                            <td> 
                                                <el-checkbox v-model="checked1" style="padding:0 10px 0 35px;"></el-checkbox>
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
                                                     <el-checkbox v-model="checked2" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td><input type="text" value="2008.9.1"></td>
                                                <td><input type="text" value="2012.6.1"></td>
                                                <td><input type="text" value="湖南省浏阳中医学院" style="width:198px" ></td>
                                                <td><input type="text" value="10000/月"></td>
                                                <td><input type="text" value="铁拐李"></td>
                                                <td><input type="text" value="13827808080" style="width:128px"></td>
                                                <td>
                                                   <span >
                                                        <select class="span-select" name="" id="" width="78">
                                                        <option value="最高">是</option>
                                                        <option value="其它">否</option>
                                                    </select>
                                                   </span>
                                                    </td>
                                                <td>
                                                    <span >
                                                        <select class="span-select" name="" id="" width="78">
                                                        <option value="最高">是</option>
                                                        <option value="其它">否</option>
                                                    </select>
                                                   </span>
                                                </td>
                                            </tr>
                                             <tr>
                                                <td>
                                                     <el-checkbox v-model="checked3" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value="" style="width:198px" ></td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value=""></td>
                                                <td><input type="text" value="" style="width:128px"></td>
                                                <td>
                                                    <select class="span-select" name="" id="" width="78">
                                                        <option value="最高"></option>
                                                        <option value="其它"></option>
                                                    </select>
                                                    </td>
                                                <td><select class="span-select" name="" id="" width="78">
                                                        <option value="最高"></option>
                                                        <option value="其它"></option>
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>  
                                    <div style="margin-top: 20px;margin-left:30px;">
                                       <el-button >保存</el-button>
                                       <el-button >新增</el-button>
                                       <el-button >删除</el-button>
                                    </div>
                            </div>

                            <div class="mes clearfix" @click="isshowmes3" v-bind:class="{ marginb: show3}" v-show="false">
                                <div class="fl">
                                    <e></e>账号信息</div>
                                <div class="fr">展开／隐藏</div>
                            </div>
                            <div class="mess mess1" v-show="false">
                                 <table style="border-collapse:separate;border-spacing: 0px 10px">
                                        <tr>
                                            <td> 
                                                <el-checkbox v-model="checked1" style="padding:0 10px 0 35px;"></el-checkbox>
                                            </td>
                                            <td>账号类型</td>
                                            <td>账号/卡号</td>
                                        </tr>
                                        <tbody>
                                             <tr>
                                                <td>
                                                     <el-checkbox v-model="checked2" style="padding:0 10px 0 35px;"></el-checkbox>
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
                                             <tr>
                                                <td>
                                                     <el-checkbox v-model="checked3" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td>
                                                    <select class="span-select" name="" id="" style="width:128px">
                                                        <option value="最高">工资卡账号</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                    </td>
                                                <td><input type="text" value="" style="width:368px"></td>
                                            </tr>
                                        </tbody>
                                    </table>  
                                    <div style="margin-top: 20px;margin-left:30px;">
                                       <el-button >保存</el-button>
                                       <el-button >新增</el-button>
                                       <el-button >删除</el-button>
                                    </div>
                            </div>

                            <div class="mes clearfix" @click="isshowmes4" v-bind:class="{ marginb: show4}" v-show="false">
                                <div class="fl">
                                    <e></e>证书信息</div>
                                <div class="fr">展开／隐藏</div>
                            </div>
                                <div class="mess mess2" v-show="false">
                                     <table style="border-collapse:separate;border-spacing: 0px 10px">
                                        <tr>
                                            <td> 
                                                <el-checkbox v-model="checked1" style="padding:0 10px 0 35px;"></el-checkbox>
                                            </td>
                                            <td>证书编号</td>
                                            <td>证书名称</td>
                                            <td>证书类型</td>
                                            <td>取证时间</td>
                                            <td>证书有效期</td>
                                            <td>发证机构</td>
                                            <td>证书范围</td>
                                            <!-- <td>附件</td> -->
                                        </tr>
                                        <tbody>
                                             <tr>
                                                <td>
                                                     <el-checkbox v-model="checked2" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td><input type="text" value="2007012345678"></td>
                                                <td><input type="text" value="职业医师资格证"></td>
                                                <td>
                                                     <select class="span-select1" name="" id="">
                                                        <option value="最高">职业资格证</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                </td>
                                                <td><input type="text" value="2010.5.6" style="width:78px"></td>
                                                <td><input type="text" value="2030.5.6" style="width:78px"></td>
                                                <td><input type="text" value="中国武汉医生职业协会"></td>
                                                <td>
                                                   <span >
                                                        <select class="span-select1" name="" id="">
                                                        <option value="最高"></option>
                                                        <option value="其它"></option>
                                                    </select>
                                                   </span>
                                                    </td>
                                                <!-- <td><span><em></em> 添加附件</span></td> -->
                                            </tr>
                                            <tr>
                                                <td>
                                                     <el-checkbox v-model="checked2" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td><input type="text" value="2007012345678"></td>
                                                <td><input type="text" value="职业医师资格证"></td>
                                                <td>
                                                     <select class="span-select1" name="" id="">
                                                        <option value="最高">职业资格证</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                </td>
                                                <td><input type="text" value="2010.5.6" style="width:78px"></td>
                                                <td><input type="text" value="2030.5.6" style="width:78px"></td>
                                                <td><input type="text" value="中国武汉医生职业协会"></td>
                                                <td>
                                                   <span >
                                                        <select class="span-select1" name="" id="">
                                                        <option value="最高"></option>
                                                        <option value="其它"></option>
                                                    </select>
                                                   </span>
                                                    </td>
                                                <!-- <td><span><em></em> 添加附件</span></td> -->
                                            </tr>
                                        </tbody>
                                    </table>  
                                    <div style="margin-top: 20px;margin-left:30px;">
                                       <el-button >保存</el-button>
                                       <el-button >新增</el-button>
                                       <el-button >删除</el-button>
                                    </div>
                            </div>
                            <div class="mes clearfix" @click="isshowmes5" v-bind:class="{ marginb: show5}" v-show="false">
                                <div class="fl">
                                    <e></e>职称信息</div>
                                <div class="fr">展开／隐藏</div>
                            </div>
                            <div class="mess mess3" v-show="false">
                                   <table style="border-collapse:separate;border-spacing: 0px 10px">
                                        <tr>
                                            <td> 
                                                <el-checkbox v-model="checked1" style="padding:0 10px 0 35px;"></el-checkbox>
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
                                                     <el-checkbox v-model="checked2" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td>
                                                     <select class="span-select1" name="" id="" >
                                                        <option value="最高">主任医师</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                </td>
                                                <td>
                                                     <select class="span-select1" name="" id="" >
                                                        <option value="最高">正高</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                </td>
                                                <td><input type="text" value="2008.3.1"></td>
                                                <td><input type="text" value="2012.3.1" ></td>
                                                <td>
                                                     <select class="span-select1" name="" id="">
                                                        <option value="最高">铁拐李</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                </td>
                                                <td>
                                                     <select class="span-select1" name="" id="" >
                                                        <option value="最高">正高</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                </td>
                                                <td>
                                                   <span >
                                                            <input type="radio" name="" id="" style="height:20px">
                                                   </span>
                                                    </td> 
                                            </tr>
                                             <tr>
                                                <td>
                                                     <el-checkbox v-model="checked3" style="padding:0 10px 0 35px;"></el-checkbox>
                                                </td>
                                                <td><select class="span-select1" name="" id="" >
                                                        <option value="最高"></option>
                                                        <option value="其它"></option>
                                                    </select>
                                                </td>
                                                <td><select class="span-select1" name="" id="">
                                                        <option value="最高">最高</option>
                                                        <option value="其它">其它</option>
                                                    </select>
                                                </td>
                                                <td><input type="text" value=""  ></td>
                                                <td><input type="text" value=""></td>
                                                <td><select class="span-select1" name="" id="" >
                                                        <option value="最高"></option>
                                                        <option value="其它"></option>
                                                    </select>
                                                </td>
                                                <td><select class="span-select1" name="" id="" >
                                                        <option value="最高"></option>
                                                        <option value="其它"></option>
                                                    </select>
                                                </td>
                                                <td>
                                                   <input type="radio" name="" id="" style="height:20px">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>  
                                    <div style="margin-top: 20px;margin-left:30px;">
                                       <el-button >保存</el-button>
                                       <el-button >新增</el-button>
                                       <el-button >删除</el-button>
                                    </div>
                            </div>
                        </div>




                        <!-- <tbody v-for="(item ,index) in modelObj.DetailList " id="tbodyinput">
									
									 <tr>
										<td> 
											<input type="text" 
												v-model="item.CODE" 
												:disabled="isDisabledInput" 
												@input="searchDetailStaffDataChange(index,$event);">
											<input type="text" v-model="item.STAFF_ID" v-show="false">
											
										</td>
										<td>
											<input type="text" v-model="item.NAME" :disabled="isDisabledInput">
										</td>
										<td>
											<select name="" v-model="item.TYPE_ID_NAME" >
												<option :value="typeItem.ID" 
												v-for="typeItem in zslxdetailTypeList.rows">{{typeItem.NAME}}</option>
											</select>
										</td>
										<td>
											<input 
												type="text" 
												v-model="item.ACQUIRE_DATE" 
												:disabled="isDisabledInput" 
												@input="searchDetailDeptDataChange(index,$event);">
											<input type="text" v-model="item.TO_DEPT_ID" v-show="false">
										</td>
										<td>
											<input 
												type="text" 
												v-model="item.VALIDITY_ID_NAME" 
												:disabled="isDisabledInput" 
												@input="searchDetailPostionDataChange(index,$event);">
											<input type="text" v-model="item.VALIDITY_ID" v-show="false">
										</td>
										<td>
											<input 
												type="text" 
												v-model="item.CERTIFYING_AUTHORITY" 
												:disabled="isDisabledInput" 
												@input="searchDetailPostionDataChange(index,$event);">
										</td>
										<td> 
											<select name="" v-model="item.SCOPE_ID_NAME" >
												<option :value="typeItem.ID" 
												v-for="typeItem in zsfwdetailTypeList.rows">{{typeItem.NAME}}</option>
											</select>
										</td>
										<td>
											<span class="spanLinkRemove" v-show="!btnActive.isDetailLinkRemove" @click="cmdDetailLinkRemove(item,index);">删除</span>
										</td>
									</tr>
								</tbody> -->