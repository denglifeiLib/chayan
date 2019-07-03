<template>
    <div>
       <!-- tabs -->
       <div class="card_wrapper mt25">
            <h3 class="card_title">
                数据处理服务 
                <el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block">
                    <el-breadcrumb-item v-for="(item,i) in breadcrumb" :key="i">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
            </h3>
            <!-- tab content -->
            <div class="card_cont">
                <!-- 搜索form -->
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" v-if="breadcrumb.length===1">
                    <el-form-item>
                        <el-input v-model="searchForm.name" placeholder="请输入爬虫服务名称" size="medium" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" @click="_query" size="medium"  type="primary">搜索</el-button>
                    </el-form-item>
                </el-form>
                <div class="back" style="margin-bottom:25px">
                    <el-button type="primary" size="medium" icon="el-icon-arrow-left" @click="goBack()" v-if="breadcrumb.length>1">返回</el-button>
                </div>
                
                <!-- table列表 -->
                <div class="search_list" v-show="!showDetail">
                    <el-row>
                        <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="2" v-for="(item,i) in model" :key="i">
                            <div @click="goDeep(item)">
                                <img :src="item.icon" alt="">
                                <p>{{item.name}}</p>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                
                <!-- apply_detail -->
                <div class="apply_detail" v-show="showDetail">
                    <div class="top_tabel_wrap">
                        <el-table
                            ref="multipleTable"
                            :data="topTable"
                            border>
                            <el-table-column prop="name1" label="数据处理服务" width="175" align="center">
                                <template slot-scope="scope">
                                    <img :src="scope.row.icon1" alt="" class="apply_icon">
                                    <p>{{scope.row.name1}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name1" label="关联爬虫" width="210" align="center">
                                <template slot-scope="scope">
                                    <img :src="scope.row.icon2" alt="" class="apply_icon">
                                    <p>{{scope.row.name2}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="目标表设置">
                                <template slot-scope="scope">
                                    <div style="width:277px;margin:20px auto;">
                                        <el-select v-model="scope.row.respone" disabled>
                                            <el-option label="zhihu_qa" value="1"></el-option>
                                            <el-option label="zhihu_qa1" value="1"></el-option>
                                            <el-option label="zhihu_qa2" value="1"></el-option>
                                        </el-select>
                                        <p>列表未找到，创建新表</p>
                                        <div class="mt8">
                                            <el-input v-model="searchForm.name" placeholder="任务名称" size="medium" style="width: 200px;"></el-input>
                                            <el-button type="primary" size="medium" @click="create('add', 'popover6')">创建</el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 翻页 -->
                <div class="mt24" v-if="breadcrumb.length===1">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="3" 
                        :page-size="5"
                        layout="total, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
            </div>
        </div>


        <!-- apply_detail + -->
        <div class="card_wrapper mt25" v-if="breadcrumb.length!==1">
            <h3 class="card_title clearfix" style="line-height: 28px;">
                提取规则配置 
                <div class="fr">
                    <el-button type="primary" size="mini" plain slot="reference" icon="el-icon-plus">添加目标表字段</el-button>
                </div>
            </h3>
            <div class="card_cont rule_table">
                <el-table
                    ref="multipleTable"
                    :data="ruleTable"
                    border>
                    <el-table-column prop="target" label="目标表字段" align="center" width="140px"></el-table-column>
                    <el-table-column prop="source" label="源表字段" align="center" width="180px">
                        <template slot-scope="scope">
                            <div class="source_list">
                                <p v-for="(item,i) in [].concat(scope.row.source)" :key="i">{{item}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code" label="关联爬虫" align="center">
                        <template slot-scope="scope">
                            <el-row>
                                <el-col :span="20">
                                    <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        style="display:inline-block"
                                        v-model="scope.row.code">
                                    </el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-button type="text" style="margin-top:9px;" @click="editCodeDialogVisible=true">编辑</el-button>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="210" align="center">
                        <template slot-scope="scope">
                            <el-link type="danger" :underline="false" @click="ruleTable.splice(index, 1)">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt25">
                    <el-button type="primary" slot="reference" icon="el-icon-plus">保存提取规则</el-button>
                    <div class="fr">
                        <el-button type="primary" plain slot="reference" icon="el-icon-plus" @click="sourceDialogVisible=true">选择源表数据生成预览</el-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- apply_detail + -->
        <div class="card_wrapper mt25" v-if="breadcrumb.length!==1">
            <h3 class="card_title clearfix" style="line-height: 28px;">控制台</h3>
            <div class="card_cont">
                <div class="log">
                    <p>&#91Error] Failed to load resource: the server responded with a status of 404 (Not Found) (vendor-4dc15c6f9d3825f1ae34.css.map, line 0)</p> 
                    <p>&#91Error] Failed to load resource: the server responded with a status of 404 (Not Found) (webpack-runtime-d80c302ec73f03639067.js.map, line 0)</p> 
                    <p>&#91Error] Failed to load resource: the server responded with a status of 404 (Not Found) (preview-093369125f7dd00fcf13.css.map, line 0)</p> 
                    <p>&#91Error] Failed to load resource: the server responded with a status of 404 (Not Found) (preview-dded4d827e9f1dca5d5e.js.map, line 0)</p>
                    <p>&#91Error] Failed to load resource: the server responded with a status of 404 (Not Found) (preview-dded4d827e9f1dca5d5e.js.map, line 0)</p>
                    <p>&#91Error] Failed to load resource: the server responded with a status of 404 (Not Found) (preview-dded4d827e9f1dca5d5e.js.map, line 0)</p>
                </div>
            </div>
        </div>

        <!-- apply_detail + -->
        <div class="card_wrapper mt25" v-if="breadcrumb.length!==1">
            <h3 class="card_title clearfix" style="line-height: 28px;">源表数据 </h3>
            <div class="card_cont">
                <el-table
                    ref="multipleTable"
                    :data="sourceTable"
                    border>
                    <el-table-column type="index" label="ID" align="center" width="52px"></el-table-column>
                    <el-table-column prop="title" label="Title" align="center" width="200px"></el-table-column>
                    <el-table-column prop="document" label="Document" align="center"></el-table-column>
                    <el-table-column prop="cont" label="Cont" align="center" width="130px"></el-table-column>
                    <el-table-column prop="te" label="Te" align="center" width="130px"></el-table-column>
                    <el-table-column prop="submit_t" label="Submit_t" align="center" width="130px"></el-table-column>
                </el-table>
            </div>
        </div>

        <!-- apply_detail + -->
        <div class="card_wrapper mt25" v-if="breadcrumb.length!==1">
            <h3 class="card_title clearfix" style="line-height: 28px;">目标标数据预览 </h3>
            <div class="card_cont">
                <el-table
                    ref="multipleTable"
                    :data="targetTable"
                    border>
                    <el-table-column type="index" label="ID" align="center" width="52px"></el-table-column>
                    <el-table-column prop="title" label="Title" align="center" width="200px"></el-table-column>
                    <el-table-column prop="auth" label="auth" align="center" width="108px"></el-table-column>
                    <el-table-column prop="conntent" label="Conntent" align="center" ></el-table-column>
                    <el-table-column prop="summery" label="Summery" align="center" width="130px"></el-table-column>
                    <el-table-column prop="submit_t" label="Submit_t" align="center" width="130px"></el-table-column>
                </el-table>
            </div>
        </div>

        <!-- apply_detail + -->
        <div class="card_wrapper mt25" v-if="breadcrumb.length!==1">
            <h3 class="card_title clearfix" style="line-height: 28px;borber-bottom:0;">添加提取规则 </h3>
            <div class="card_cont">
                <div class="step_wrap">
                    <div class="step fl active">
                        <span>1</span>
                        选择源表字段
                    </div>
                    <div class="step fr">
                        <span>2</span>
                        代码片段编辑
                    </div>
                </div>
                <div class="back">
                    <el-button type="primary" size="medium"  @click="next()" v-if="breadcrumb.length>1">下一步</el-button>
                </div>
                
                <el-table
                    ref="multipleTable"
                    :data="addRuleTabel"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" label="选择" width="55" align="center"></el-table-column>
                    <el-table-column prop="source" label="源表字段" align="center" width="200px"></el-table-column>
                    <el-table-column prop="example" label="数据案例" align="center"></el-table-column>
                </el-table>
            </div>
        </div>

        <!-- apply_detail + -->
        <div class="card_wrapper mt25" v-if="breadcrumb.length!==1">
            <h3 class="card_title clearfix" style="line-height: 28px;borber-bottom:0;">添加提取规则 </h3>
            <div class="card_cont">
                <div class="step_wrap">
                    <div class="step fl">
                        <span>1</span>
                        选择源表字段
                    </div>
                    <div class="step fr active">
                        <span>2</span>
                        代码片段编辑
                    </div>
                </div>
                <div class="back">
                    <el-button type="primary" size="medium"  plain @click="next()" v-if="breadcrumb.length>1">上一步</el-button>
                    <el-button type="primary" size="medium"  @click="next()" v-if="breadcrumb.length>1">提交</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="addRuleTabel"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" label="选择" width="55" align="center"></el-table-column>
                    <el-table-column prop="source" label="源表字段" align="center" width="200px"></el-table-column>
                    <el-table-column prop="example" label="数据案例" align="center"></el-table-column>
                </el-table>
                <p class="exg_dis">配置正则表达式（源表多个字段合并为一个字段）</p>
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <el-form-item label="设置目标表字段名">
                        <el-input v-model="searchForm.name" placeholder="单行输入" size="medium" style="width: 272px;"></el-input>
                    </el-form-item>
                </el-form>
                <div class="rule_table">
                    <el-table
                        ref="multipleTable"
                        :data="ruleTable"
                        border>
                        <el-table-column prop="target" label="源字段选择" align="center" width="140px">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.source">
                                    <el-option label="document" value="document"></el-option>
                                    <el-option label="content" value="content"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="code" label="代码片段" align="center">
                            <template slot-scope="scope">
                                <el-row>
                                    <el-col :span="20">
                                        <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            style="display:inline-block"
                                            v-model="scope.row.code">
                                        </el-input>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="text" style="margin-top:9px;" @click="editCodeDialogVisible=true">编辑</el-button>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column label="删除" width="77" align="center">
                            <template slot-scope="scope">
                                <el-link type="danger" :underline="false" @click="deletRow(scope.$index)">删除</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column props="order_icon" label="顺序" width="77" align="center">
                            <template slot-scope="scope">
                                <img :src="scope.row.order_icon" alt="" class="order_icon">
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="add_row" @click="addRow"><i class="el-icon-plus"></i>添加一行</div>
                </div>
            </div>
        </div>

        <el-dialog title="源表数据选择" :visible.sync="sourceDialogVisible" :center="true" :close-on-click-modal="false" :modal="true" width="1290px">
            <div class="content">
                <el-table
                    ref="multipleTable"
                    style="width:100%"
                    :data="sourceTable"
                    border>
                    <el-table-column type="index" label="ID" align="center" width="52px"></el-table-column>
                    <el-table-column prop="title" label="Title" width="200px"></el-table-column>
                    <el-table-column prop="document" label="Document"></el-table-column>
                    <el-table-column prop="cont" label="Cont" align="center" width="130px"></el-table-column>
                    <el-table-column prop="te" label="Te" align="center" width="130px"></el-table-column>
                    <el-table-column prop="submit_t" label="Submit_t" align="center" width="130px"></el-table-column>
                    <el-table-column label="操作" align="center" width="108px">
                        <template slot-scope="scope">
                            <el-button type="text" style="margin-top:9px;">编辑</el-button>
                        </template>
                    </el-table-column>
                    
                </el-table>
            </div>
            <!-- 翻页 -->
            <div class="mt24">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="3" 
                    :page-size="5"
                    layout="total, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div>
        </el-dialog>

        <el-dialog title="代码片段编辑" :visible.sync="editCodeDialogVisible" :center="true" :close-on-click-modal="false" :modal="true" width="908px">
            <div class=" codeEditDialogCon">
                <div class="list">
                    <span v-for="i in 15" :key="i">{{i}}</span>
                </div>
                <div class="edit_panel" contenteditable="true" v-html="editCode" @input="changeCode"></div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">返回</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'data_manage_list',
    data() {
        return {
            sourceDialogVisible: false,
            editCodeDialogVisible: false,
            editCode: '<p> * Loads the WordPress environment and template. </p><p> * Loads the WordPress environment and template. </p><p> * Loads the WordPress environment and template. </p><p> * Loads the WordPress environment and template. </p><p> * Loads the WordPress environment and template. </p><p> * Loads the WordPress environment and template. </p><p> * Loads the WordPress environment and template. </p>',
            searchForm: {
               name: '',
               pageSize: 15,
               page: 1
           },
           breadcrumb: ['全部'],
           showDetail: false,
           detail_type: '0',
           model: [
               {
                   type: 'file',
                   name: '代理服务',
                   icon: require('../../../assets/images/p_file.png')
               }, {
                   type: 'file',
                   name: '代理服务',
                   icon: require('../../../assets/images/p_file.png')
               }, {
                   type: 'file',
                   name: '代理服务',
                   icon: require('../../../assets/images/p_file.png')
               }, {
                   type: 'file',
                   name: '代理服务',
                   icon: require('../../../assets/images/p_file.png')
               }, {
                   type: 'file',
                   name: '代理服务',
                   icon: require('../../../assets/images/p_file.png')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }
           ],
           topTable: [{
                name1: '代理服务',
                icon1: require('../../../assets/images/logo_1.jpg'),
                name2: '代理服务',
                icon3: require('../../../assets/images/logo_1.jpg')
           }],
           ruleTable: [
               {
                    target: 'ruleTable',
                    source: 'ruleTable',
                    code: '<tittle></tittle>',
                   order_icon: require('../../../assets/images/down.png')
                }, {
                        target: 'ruleTable',
                        source: 'ruleTable',
                        code: '<tittle></tittle>',
                        order_icon: require('../../../assets/images/up.png')
                }
           ],
           sourceTable: [
               {
                   id: 1,
                   title: '中美经贸高级别磋商双方牵头人通话',
                   document: '新华社北京6月25日电6月24日，中共中央政治局委员、国务院副总理、中美全面经济对话中方牵头人刘鹤应约与美国贸易代表莱特希泽、财政部长姆努钦通话。双方按照两国元首通话的指示，就经贸问题交换意见。双方同意继续保持沟通。（完）',
                   cont: '中美经贸高级别磋商双方牵头人通话',
                   te: '中美经贸高级别磋商双方牵头人通话',
                   submit_t: '6月25号'
               }
           ],
           targetTable: [
               {
                   id: 1,
                   title: '中美经贸高级别磋商双方牵头人通话',
                    auth: '中美经',
                   conntent: '新华社北京6月25日电6月24日，中共中央政治局委员、国务院副总理、中美全面经济对话中方牵头人刘鹤应约与美国贸易代表莱特希泽、财政部长姆努钦通话。双方按照两国元首通话的指示，就经贸问题交换意见。双方同意继续保持沟通。（完）',
                   summery: '中美经贸高级别磋商双方牵头人通话',
                   te: '中美经贸高级别磋商双方牵头人通话',
                   submit_t: '6月25号'
               }
           ],
           addRuleTabel: [
               {
                   id: 1,
                   source: 'ruleTable',
                   example: '新华社北京6月25日电6月24日，中共中央政治局委员、国务院副总理、中美全面经济对话中方牵头人刘鹤应约与美国贸易代表莱特希泽、财政部长姆努钦通话。双方按照两国元首通话的指示，就经贸问题交换意见。双方同意继续保持沟通。（完）'
               }, {
                   id: 1,
                   source: 'ruleTable',
                   example: '新华社北京6月25日电6月24日，中共中央政治局委员、国务院副总理、中美全面经济对话中方牵头人刘鹤应约与美国贸易代表莱特希泽、财政部长姆努钦通话。双方按照两国元首通话的指示，就经贸问题交换意见。双方同意继续保持沟通。（完）'
               }
           ]
        }
    },
    methods: {
        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                callback&&callback()
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        queryDetail() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        goDeep(item) {
            if(item.type === 'file') {
                this._query(()=>{ this.breadcrumb.push(item.name)})
            }
            if(item.type === 'apply') {
                this.showDetail = true;
                this.getDetail(()=>{ this.breadcrumb.push(item.name)})
            }
        },
        getDetail(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                callback&&callback()
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        goBack() {
            this.showDetail = false;
            this._query(()=>{ this.breadcrumb.splice(this.breadcrumb.length-1, 1) });
        },
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.searchForm.page = 1;
            this. _query();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.searchForm.page = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },
        handlePopover(ref) {
            this.$refs[ref].doClose();
        },
        save(type) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                console.log('发送请求', this.form);
                loading.close();
                this.close()
            }, 500);
        },
        close() {
            this.editCodeDialogVisible = false;
        },
        changeCode() {
            this.innerText = this.$el.innerHTML;
        },
        handleSelectionChange(arr) {
            this.selectedRows = arr;
            console.log(arr);
        },
        addRow() {
            this.ruleTable.push({
                        target: 'ruleTable',
                        source: 'ruleTable',
                        code: '<tittle></tittle>',
                        order_icon: require('../../../assets/images/up.png')
                })
        },
        deletRow(index) {
            this.ruleTable.splice(index, 1);
        }
    },
    created() {
        this._query();
        
    },
    components: {}
}
</script>

<style lang="less">
.card_wrapper{
    margin-bottom: 0;
}
.search_list{
    text-align: center;
    font-size:14px;
    padding-top: 10px;
    img{
        width: 56px;
        height: 56px;
    }
    p{
    margin-bottom: 50px;
    }
}
.back{
    margin-bottom: 24px;
}
.apply_detail{
    .top_tabel_wrap{
        width:762px;
    }
   .apply_icon{
       width: 52px;
       height: 52px;
   }
}
.mt8{
    margin-top: 8px;
}
.source_list p{
    margin-left: -12px;
    margin-right: -12px;
    padding-bottom: 12px;
    padding-top: 12px;
    border-bottom: 1px solid #EBEEF5;
    &:last-child{
        padding-bottom: 0;
        border-bottom: 0;
    }
    &:first-child{
        padding-top: 0;
    }
}
.log{
    padding: 10px 13px 17px;
    line-height: 19px;
    border:1px solid rgba(238,238,240,1)
}
.codeEditDialogCon{
    overflow: hidden;
    width:854px;
    height:352px;
    border:1px solid rgba(238,238,240,1);
    .list{
        float: left;
        padding-top: 22px;
        background:rgba(240,242,245,1);
        span{
            display: block;
            width:45px;
            height:22px;
            line-height:22px;
            text-align: center;
        }
    }
    .edit_panel{
        padding-left: 85px;
        padding-right: 40px;
        margin-top: 22px;
        height: 22px * 15;
        line-height:22px;
        outline: 0;
        // overflow-y: scroll;
    }
}
.step_wrap{
    position: relative;
    margin: 20px auto 30px;
    width: 500px;
    height: 32px;
    line-height: 32px;
    text-align: justify;
    &::before{
        position: absolute;
        height:1px;
        left: 0;
        right: 0;
        top: 15px;
        content: ' ';
        z-index: 1;
        background:rgba(233,233,233,1);
    }
    .step{
        padding: 0 16px;
        position: relative;
        display: inline;
        z-index: 3;
        background: #fff;
        font-size: 16px;
        span{
            display: inline-block;
            width:32px;
            height:32px;
            margin: 0 8px;
            line-height: 32px;
            text-align: center;
            color:rgba(0,0,0,0.25);
            border: solid 1px rgba(0,0,0,0.25);
            border-radius: 50px;
        }
        &.active span{
            border: 0;
            background:rgba(24,144,255,1);
            color: #fff;
        }
        &.active{
            color: #000;
        }
        
    }
}
.exg_dis{
    padding: 50px 0 20px;
    color:rgba(96,98,102,1);
}
.add_row{
    margin-top: 16px;
    line-height: 32px;
    border-radius: 2px;
    border: dotted 1px #D9D9D9;
    text-align: center;
    color:rgba(0,0,0,0.65);
    cursor: pointer;
}
</style>