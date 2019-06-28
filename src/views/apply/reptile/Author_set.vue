<template>
    <div class="totalPage">

        <!-- 搜索form -->
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchForm.rule" placeholder="用户账号" size="medium" style="width: 240px;"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" @click="_query" size="medium"  type="primary">搜索</el-button>
            <div class="fr">
                <el-popover
                    placement="bottom-end"
                    width="260"
                    ref="popover6"
                    trigger="click">
                    <p style="padding-bottom:10px;">角色名称</p>
                    <el-input v-model="addRole" placeholder="角色名称" style="width: 240px;margin-bottom: 15px;"></el-input>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" @click="handlePopover('popover6')">取消</el-button>
                        <el-button type="primary" size="mini" @click="handleRole('add', 'popover6')">确 定</el-button>
                    </div>
                    <el-button type="primary" slot="reference" icon="el-icon-plus">添加角色</el-button>
                </el-popover>
            </div>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark" 
            style="width: 100%"
            border
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="userName" label="用户名" width="150"> </el-table-column>
            <el-table-column prop="role" label="应用角色" width="200"></el-table-column>
            <el-table-column  label="应用访问" prop="apply_items" width="476">
                <template slot-scope="scope">
                   <span class="apply_item" v-if="scope.row.apply_items[0]">{{scope.row.apply_items[0]}}</span>
                   <span class="apply_item" v-if="scope.row.apply_items[1]">{{scope.row.apply_items[1]}}</span>
                   <span class="apply_item" v-if="scope.row.apply_items[2]">{{scope.row.apply_items[2]}}</span>
                   <span class="apply_item" v-if="scope.row.apply_items[3]">{{scope.row.apply_items[3]}}</span>
                   <span class="apply_item" v-if="scope.row.apply_items[4]">{{scope.row.apply_items[4]}}</span>
                   <span class="apply_item" v-if="scope.row.apply_items[5]">...</span>
                </template>
            </el-table-column>
            <el-table-column  label="默认" prop="status" align="center">
                <template slot-scope="scope">
                    <el-switch :value="scope.row.status==='1'" active-color="#02E1A0"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="operateHandle(scope.row, 'edit')">编辑</el-button> <span class="seperator">|</span>
                    <el-button type="text" @click="operateHandle(scope.row, 'password')">配置应用访问</el-button></span>
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
        <reptile-root-set :form="eaditForm" @callback="sumbit"></reptile-root-set>
            
    </div>
</template>

<script>

import ReptileRootSet from '@/components/ReptileRootSet';

export default {
    name: 'reptile_author_set',
    data() {
        return {
            activeName: '1',
            addRole: '',
            searchForm: {
                user: '',
                pageSize: 15,
                page: 1
            },
            eaditForm: {
                dialogVisible: false,
                type: 'set'
            },
            tableData: [
                {
                    id: 54,
                    userName: '个电饭锅电饭锅',
                    role: '管理员',
                    apply_items: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    email_warn: '1',
                    status: '1'
                }, {
                    id: 4444,
                    userName: '个电饭锅电饭锅',
                    role: '渠道管理',
                    apply_items: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    email_warn: '1',
                    status: '1'
                }, {
                    id: 5555,
                    userName: '个电饭锅电饭锅',
                    role: '管理员',
                    apply_items: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    email_warn: '1',
                    status: '1'
                }, {
                    id: 666,
                    userName: '个电饭锅电饭锅',
                    role: '渠道管理',
                    apply_items: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    email_warn: '0',
                    status: '0'
                }, {
                    id: 777,
                    userName: '个电饭锅电饭锅',
                    role: '渠道管理',
                    apply_items: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    email_warn: '0',
                    status: '0',
                    weixGroup: {
                        icon: require('@/assets/images/logo_1.jpg'),
                        name: '保险讨论'
                    }
                }, {
                    id: 8888,
                    userName: '个电饭锅电饭锅',
                    role: '渠道管理',
                    apply_items: ['知乎', '各省采购网', '各省采购网', '各省采购网', '微博','微博'],
                    email_warn: '1',
                    status: '0'
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
            console.log('发送请求', this.dayWeekForm);
        },
         operateHandle(row, type, ref) {
            console.log(row, type);
            if(type === 'add') {
                this.$set(this.eaditForm, 'dialogVisible', true);
                this.$set(this.eaditForm, 'type', 'add');
            }
            if(type === 'edit') {
                this.$set(this.eaditForm, 'dialogVisible', true);
                this.$set(this.eaditForm, 'type', 'edit');
            }
            if(type === 'password') {
                this.$set(this.eaditForm, 'dialogVisible', true);
                this.$set(this.eaditForm, 'type', 'password');
            }
            if(type === 'delete') {
                this.delete(row, ref)
            }
        },
        sumbit(model) {
            console.log(4444, model);
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                console.log('发送请求', model);
                loading.close();
                this.$set(this.eaditForm, 'dialogVisible', false);
            }, 500);

        },
        delete(row, ref) {
            console.log(5555, row);
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                console.log('发送请求', row);
                loading.close();
                this.$refs[ref].doClose();
            }, 500);

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
    },
    components: {ReptileRootSet}
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
        padding: 5px;
        background: #F0F7FF;
    }
}
</style>