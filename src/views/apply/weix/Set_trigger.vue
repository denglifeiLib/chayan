<template>
    <div>
        <h1 class="pageTitle">事件触发规则</h1>
       <!-- tabs -->
       <div class="card_wrapper">
            <h3 class="card_title">昨日微信监控数据</h3>
            <!-- tab content -->
        <div class="card_cont">
            <!-- 搜索form -->
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="规则名称：">
                    <el-input v-model="searchForm.rule" placeholder="请输入" size="medium" style="width: 240px;"></el-input>
                </el-form-item>
                <el-button icon="el-icon-search" @click="_query" size="medium"  type="primary">搜索</el-button>
                <div class="fr">
                    <el-button type="primary" size="medium" icon="el-icon-plus" @click="form.dialogVisible = true">添加规则</el-button>
                </div>
            </el-form>
            <!-- table列表 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="channelName" label="事件规则名称" > </el-table-column>
                <el-table-column prop="catchTime" label="规则创建时间"></el-table-column>
                <el-table-column  label="状态" prop="clewType" align="center">
                    <template slot-scope="scope">
                        <el-switch :value="scope.row.clewType==='1'" active-color="#02E1A0"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作" width="144" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="operateHandle(scope.row, scope.$index)">编辑</el-button><span class="seperator">|</span>
                        <el-popover
                            placement="top-end"
                            width="213"
                            :ref="`popover3${scope.$index}`"
                            trigger="click"
                            v-model="scope.row.popoverVisible">
                            <p style="padding-bottom:10px;"><i class="el-icon-warning"></i>你确定要删除此渠道吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" @click="handlePopover(`popover3${scope.$index}`)">取消</el-button>
                                <el-button type="primary" size="mini" @click="operateHandle(scope.row, scope.$index, 'delete', `popover3${scope.$index}`)">确定</el-button>
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
        
        <add-rule :form="form"></add-rule>
    </div>
</template>

<script>

import AddRule from '@/components/AddRule';

export default {
    name: 'set_trigger_list',
    data() {
        return {
            searchForm: {
               rule: '',
               pageSize: 15,
               page: 1
           },
           form: {
                dialogVisible: false,
                name: 'xx品牌营销线索监控策略',
                tableData: [{
                    regexp: '老师，报了个问题',
                    result: '0',
                    respone: '1',
                    responeText: '老师，收到，请稍等'
                }]
            },
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
        operateHandle(row, index, type, ref) {
            console.log(row, index);
            if(type === 'delete' && ref) {
                this.$refs[ref].doClose();
            }
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
        handlePopover(ref) {
            this.$refs[ref].doClose();
        },
    },
    created() {
        this._query();
        this.tableData = [
            {
                channelName: '百度贴吧',
                account: 'qwertyuiop123456789',
                catchTime: '2019-03-08 23:12:00',
                title: '奥迪A8和宝马7系怎么选？',
                clewType: '0',
                operator: '俞开渊',
            }, {
                channelName: '百度贴吧',
                account: 'qwertyuiop123456789',
                catchTime: '2019-03-08 23:12:00',
                title: '奥迪A8和宝马7系怎么选？',
                clewType: '1',
                operator: '俞开渊',
            }, {
                channelName: '百度贴吧',
                account: 'qwertyuiop123456789',
                catchTime: '2019-03-08 23:12:00',
                title: '奥迪A8和宝马7系怎么选？',
                clewType: '1',
                operator: '俞开渊',
            }, {
                channelName: '百度贴吧',
                account: 'qwertyuiop123456789',
                catchTime: '2019-03-08 23:12:00',
                title: '奥迪A8和宝马7系怎么选？',
                clewType: '0',
                operator: '',
            }, {
                channelName: '百度贴吧',
                account: 'qwertyuiop123456789',
                catchTime: '2019-03-08 23:12:00',
                title: '奥迪A8和宝马7系怎么选？',
                clewType: '1',
                operator: '',
            }
        ];
    },
    components: {AddRule}
}
</script>

<style scoped>

</style>