<template>
    <div class="totalPage">
        <div class="card_wrapper mt25">
            <h3 class="card_title">定时任务配置</h3>
            <div class="card_cont">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchForm.taskName" placeholder="任务名称" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
                    <div class="fr">
                        <el-button type="primary" slot="reference" icon="el-icon-plus" @click="goDetail()">添加任务</el-button>
                    </div>
                </el-form>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark" 
                    style="width: 100%"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="48" align="center"></el-table-column>
                    <el-table-column type="index" label="ID" width="48" align="center"></el-table-column>
                    <el-table-column prop="taskName" label="任务名称" width="146"> </el-table-column>
                    <el-table-column prop="runTime" label="执行时机" width="146"></el-table-column>
                    <el-table-column  label="爬虫" prop="reptiles">
                        <template slot-scope="scope">
                            <span class="apply_item" v-for="(item,i) in scope.row.reptiles" :key="i">{{item}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="manageData" label="数据处理" width="136"></el-table-column>
                    <el-table-column prop="dataTransfer" label="数据传输" width="136"></el-table-column>
                    <el-table-column  label="默认" prop="status" align="center" width="76">
                        <template slot-scope="scope">
                            <el-switch :value="scope.row.status==='1'" active-color="#02E1A0"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operation" label="操作" align="center" width="120">
                        <template slot-scope="scope">
                            <el-button type="text" @click="operateHandle(scope.row, 'edit')">编辑</el-button> <span class="seperator">|</span>
                            <el-popover
                                placement="top-end"
                                width="213"
                                :ref="`popover3${scope.$index}`"
                                trigger="click"
                                v-model="scope.row.popoverVisible">
                                <p style="padding-bottom:10px;"><i class="el-icon-warning"></i>你确定要删除此渠道吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" @click="handlePopover(`popover3${scope.$index}`)">取消</el-button>
                                    <el-button type="primary" size="mini" @click="operateHandle(scope.row, 'delete', `popover3${scope.$index}`)">确定</el-button>
                                </div>
                                <el-button type="text" slot="reference" :style="{color:scope.row.role==='manager'?'#C0C4CC':'#F56C6C'}" :disabled="scope.row.role==='manager'">删除</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                
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
            </div>
        </div>
        
    </div>
</template>

<script>

export default {
    name: 'timed_task_set',
    data() {
        return {
            activeName: '1',
            searchForm: {
                taskName: '',
                pageSize: 15,
                page: 1
            },
            form: {
                dialogVisible: false,
                row: {}
            },
            tableData: [
                {
                    taskName: '保险讨论',
                    runTime: '每天1点30分执行',
                    reptiles: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    manageData: '各省保险数据处理',
                    dataTransfer: '内网主机1',
                    status: '1'
                }, {
                    taskName: '保险讨论',
                    runTime: '每天1点30分执行',
                    reptiles: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    manageData: '各省保险数据处理',
                    dataTransfer: '内网主机1',
                    status: '1'
                }, {
                    taskName: '保险讨论',
                    runTime: '每天1点30分执行',
                    reptiles: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    manageData: '各省保险数据处理',
                    dataTransfer: '内网主机1',
                    status: '1'
                }, {
                    taskName: '保险讨论',
                    runTime: '每天1点30分执行',
                    reptiles: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    manageData: '各省保险数据处理',
                    dataTransfer: '内网主机1',
                    status: '1'
                }, {
                    taskName: '保险讨论',
                    runTime: '每天1点30分执行',
                    reptiles: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    manageData: '各省保险数据处理',
                    dataTransfer: '内网主机1',
                    status: '1'
                }, {
                    taskName: '保险讨论',
                    runTime: '每天1点30分执行',
                    reptiles: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    manageData: '各省保险数据处理',
                    dataTransfer: '内网主机1',
                    status: '1'
                }, {
                    taskName: '保险讨论',
                    runTime: '每天1点30分执行',
                    reptiles: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    manageData: '各省保险数据处理',
                    dataTransfer: '内网主机1',
                    status: '1'
                }
            ]
        }
    },
    methods: {
        _query() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        showDialog(row) {
            this.form = {
                dialogVisible: true,
                row
            }
        },
        save() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                this.$set(this.form, 'dialogVisible', false);
            }, 500);
            console.log('发送请求', this.form);
        },
        operateHandle(row, type, ref) {
            console.log(row, type);
            if(type === 'set_root') {
                this.$set(this.distributForm, 'dialogVisible', true);
            }
            if(type === 'delete') {
                this.delete(row, ref)
            }
        },
        delete(row, ref) {
            this.$refs[ref].doClose();
            console.log(row);
        },
        goDetail(isEdit) {
            this.$router.push({name: 'timed_task_set_detail'});
        },
        handleSelectionChange(arr) {
            this.selectedRows = arr;
            console.log(arr);
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
        close() {
            this.$set(this.form, 'dialogVisible', false);
        },
        handlePopover(ref) {
            this.$refs[ref].doClose();
        },
    },
    created() {
        this._query();
    },
    components: {}
}
</script>

<style lang="scss">
.totalPage{
    .demo-form-inline{
        margin-top: 20px;
    }
    .el-tabs--top{
        margin-left: -32px;
        margin-right: -32px;
        margin-top: -20px;
        
    }
    .el-tabs__nav-scroll{
        padding-left: 20px;
    }
    .el-tabs__item.is-active {
        background: transparent;
    }
    .apply_item{
        margin-right: 8px;
        padding: 5px;
        background: #F0F7FF;
    }
}
</style>