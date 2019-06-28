<template>
    <div class="totalPage">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchForm.role" placeholder="角色名称" style="width: 240px;"></el-input>
            </el-form-item>
            <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            border>
            <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="accountName" label="账号" width="240"></el-table-column>
            <el-table-column prop="role" label="应用角色"></el-table-column>
            <el-table-column prop="email" label="邮件"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" :underline="false" @click="showDialog(scope.row)">设置角色</el-link>
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
        
         <el-dialog title="用户授权" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false" :modal="true" width="543px">
            <div class="dialog_content">
                <el-form :model="form" label-width="100px" >
                    <el-form-item label="用户账号">{{form.row.accountName}}</el-form-item>
                    <el-form-item label="邮箱 ">{{form.row.email}}</el-form-item>
                    <el-form-item label="应用角色授权">
                        <el-select v-model="form.role" size="medium" placeholder="请选择角色" style="width:195px;margin-right:10px;">
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="渠道管理" value="channel_m"></el-option>
                            <el-option label="客服" value="server"></el-option>
                        </el-select>
                        <el-link type="primary" :underline="false" href="">创建新角色</el-link>
                    </el-form-item>
                </el-form>
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
    name: 'reptile_author_list',
    data() {
        return {
            activeName: '1',
            searchForm: {
                role: '',
                pageSize: 15,
                page: 1
            },
            form: {
                dialogVisible: false,
                row: {}
            },
            tableData: [
                {
                    id: 54,
                    accountName: '管理员',
                    role: '渠道管理',
                    email: '155555@126.com'
                }, {
                    id: 54,
                    accountName: '管理员',
                    role: '渠道管理',
                    email: '155555@126.com'
                }, {
                    id: 54,
                    accountName: '管理员',
                    role: '渠道管理',
                    email: '155555@126.com'
                }, {
                    id: 54,
                    accountName: '管理员',
                    role: '渠道管理',
                    email: '155555@126.com'
                }, {
                    id: 54,
                    accountName: '管理员',
                    role: '渠道管理',
                    email: '155555@126.com'
                }, {
                    id: 54,
                    accountName: '管理员',
                    role: '渠道管理',
                    email: '155555@126.com'
                }, {
                    id: 54,
                    accountName: '管理员',
                    role: '渠道管理',
                    email: '155555@126.com'
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
}

.dialog_content{
    padding: 0 55px;
}
</style>