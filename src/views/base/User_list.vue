<template>
    <div class="totalPage">
        <!-- tab content -->
        <div class="fr">
            <el-button type="primary" icon="el-icon-plus"  @click="operateHandle(null, 'add')">添加用户</el-button>
        </div>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchForm.user" placeholder="用户账号" style="width: 240px;"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
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
            <el-table-column prop="userName" label="用户名" > </el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column prop="email" label="邮件"></el-table-column>
            <el-table-column  label="邮件预警" prop="email_warn" align="center">
                <template slot-scope="scope">
                    <el-switch :value="scope.row.email_warn==='1'" active-color="#02E1A0"></el-switch>
                </template>
            </el-table-column>
            <el-table-column  label="状态" prop="status" align="center">
                <template slot-scope="scope">
                    <el-switch :value="scope.row.status==='1'" active-color="#02E1A0"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="operateHandle(scope.row, 'edit')">编辑</el-button> <span class="seperator">|</span>
                    <el-button type="text" @click="operateHandle(scope.row, 'password')">修改密码</el-button> <span class="seperator">|</span>
                    <el-popover
                        placement="top-end"
                        width="213"
                        :ref="`popover3${scope.$index}`"
                        trigger="click"
                        v-model="scope.row.popoverVisible">
                        <p style="padding-bottom:10px;"><i class="el-icon-warning"></i>你确定要删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" @click="handlePopover(`popover3${scope.$index}`)">取消</el-button>
                            <el-button type="primary" size="mini" @click="operateHandle(scope.row, 'delete', `popover3${scope.$index}`)">确定</el-button>
                        </div>
                        <!-- <el-button type="text" @click="operateHandle(scope.row, 'delete')" :style="{color:scope.row.role==='管理员'?'#C0C4CC':'#F56C6C'}" :disabled="scope.row.role==='manager'">删除</el-button> -->
                        <el-button type="text" slot="reference" :style="{color:scope.row.role==='管理员'?'#C0C4CC':'#F56C6C'}" :disabled="scope.row.role==='manager'">删除</el-button>
                    </el-popover>
                </template>
                <!-- <template slot-scope="scope">
                    <el-button type="text" @click="operateHandle(scope.row, 'edit')">编辑</el-button> <span class="seperator">|</span>
                    <el-button type="text" @click="operateHandle(scope.row, 'password')">修改密码</el-button> <span class="seperator">|</span>
                    <el-button type="text" @click="operateHandle(scope.row, 'delete')" :style="{color:scope.row.role==='管理员'?'#C0C4CC':'#F56C6C'}" :disabled="scope.row.role==='manager'">删除</el-button>
                </template> -->
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
        <edit-user :form="eaditForm" @callback="sumbit"></edit-user>
            
    </div>
</template>

<script>

import EditUser from '@/components/EditUser';

export default {
    name: 'base_user_list',
    data() {
        return {
            activeName: '1',
            searchForm: {
                user: '',
                pageSize: 15,
                page: 1
            },
            eaditForm: {
                dialogVisible: false,
                password: '',
                password2: '',
                role: '',
                email: '',
                type: 'add'
            },
            tableData: [
                {
                    id: 54,
                    userName: '个电饭锅电饭锅',
                    role: '管理员',
                    email: '155555@126.com',
                    email_warn: '1',
                    status: '0'
                }, {
                    id: 4444,
                    userName: '个电饭锅电饭锅',
                    role: '渠道管理',
                    email: '155555@126.com',
                    email_warn: '1',
                    status: '1'
                }, {
                    id: 5555,
                    userName: '个电饭锅电饭锅',
                    role: '管理员',
                    email: '155555@126.com',
                    email_warn: '1',
                    status: '1'
                }, {
                    id: 666,
                    userName: '个电饭锅电饭锅',
                    role: '渠道管理',
                    email: '155555@126.com',
                    email_warn: '0',
                    status: '0'
                }, {
                    id: 777,
                    userName: '个电饭锅电饭锅',
                    role: '渠道管理',
                    email: '155555@126.com',
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
                    email: '155555@126.com',
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
    components: {EditUser}
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
}
</style>