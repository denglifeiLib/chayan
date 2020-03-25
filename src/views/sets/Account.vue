<template>
    <div class="set_account_page">
        <div class="card_wrapper mt25">
            
            <div class="card_cont">
                <div class="fr">
                    <el-button type="primary" icon="el-icon-plus"  @click="operateHandle" size="small">添加用户</el-button>
                </div>
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-input v-model="searchForm.user" placeholder="用户账号" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
                
                <!-- table -->
                <Table :columns="columns" :rows="rows" :showOrder="true" :showSelect="true" @action="handleTableCell" @handleSelectionChange="handleSelectionChange"></Table>

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

        <!-- 新增/编辑弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :close-on-click-modal="false">
            <el-row :gutter="20">
                <el-col :span="18" :offset="3">
                    <el-form :model="dialogForm" class="demo-form-inline"  label-width="115px" v-if="type === 'addAccount' || type === 'fixAccount'">
                        <el-form-item label="登录账号：">
                            <el-input v-model="dialogForm.account" placeholder="请输入账号" size="medium" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="登录密码：">
                            <el-input v-model="dialogForm.password" placeholder="请输入密码" size="medium" type="password" show-password clearable></el-input>
                        </el-form-item>
                        <el-form-item label="角色：">
                            <el-select v-model="dialogForm.role" placeholder="请选择角色" style="width: 100%">
                                <el-option value="0" label="系统管理员"></el-option>
                                <el-option value="1" label="小屋管理员"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <el-input v-model="dialogForm.mobile" placeholder="请输入手机号" size="medium" clearable></el-input>
                        </el-form-item>
                    </el-form>

                    <el-form :model="dialogForm" class="demo-form-inline"  label-width="115px" v-if="type === 'fixPwd'">
                        <el-form-item label="修改密码：">
                            <el-input v-model="dialogForm.password" placeholder="请输入密码" size="medium" type="password" show-password clearable></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码：">
                            <el-input v-model="dialogForm.confirmPassword" placeholder="请重复输入密码" size="medium" type="password" show-password clearable></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="close">返回</el-button> -->
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
import Table from '../../components/Table';
import ButtonCell from '../../components/ButtonCell';
import Switch from '../../components/Switch';
export default {
    name: 'set_account_page',
    data() {
        return {
            searchForm: {
                user: '',
                pageSize: 15,
                page: 1
            },
            list: [],
            detail: {},
            columns: [
                {
                    prop: 'account',
                    label: '账号'
                }, {
                    prop: 'role',
                    label: '角色',
                    filter: (row)=> {
                        return row.role === '0' ? '系统管理员' : '小屋管理员';
                    }
                }, {
                    prop: 'mobile',
                    label: '手机号码'
                }, {
                    prop: 'status',
                    label: '状态',
                    component: Switch
                }, {
                    prop: 'id',
                    label: '操作',
                    component: ButtonCell
                }
            ],
            rows: [],

            // 弹窗信息
            type: 'add',
            dialogVisible: false,
            dialogForm: {}
        }
    },
    created() {
        this._query();
    },
    computed: {
        title() {
            let text = '用户管理 / ';
            if(this.type === 'addAccount') {
                text += '新增用户';
            }
            if(this.type === 'fixAccount') {
                text += '编辑用户';
            }
            if(this.type === 'fixPwd') {
                text += '修改密码';
            }
            return text;
        }
    },
    methods: {
        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                this.rows = [
                    {
                        id: 1,
                        account: 'XXXXXXX',
                        role: '0',
                        mobile: '17744885566',
                        status: 0
                    }, {
                        id: 2,
                        account: 'XXXXXXX',
                        role: '1',
                        mobile: '17744885566',
                        status: 1
                    }, {
                        id: 3,
                        account: 'XXXXXXX',
                        role: '1',
                        mobile: '17744885566',
                        status: 1
                    }, {
                        id: 4,
                        account: 'XXXXXXX',
                        role: '1',
                        mobile: '17744885566',
                        status: 1
                    }, {
                        id: 5,
                        account: 'XXXXXXX',
                        role: '0',
                        mobile: '17744885566',
                        status: 0
                    }, {
                        id: 6,
                        account: 'XXXXXXX',
                        role: '0',
                        mobile: '17744885566',
                        status: 0
                    }
                ];

                this.rows = this.rows.map(item=> {
                    item.status = !!item.status;
                    // 添加操作btns
                    item.items = [
                        {
                            key: 'EDIT',
                            desc: '编辑'
                        }, {
                            key: 'CHANGE_PWD',
                            desc: '修改密码'
                        }
                    ]
                    return item;
                })
                
            }, 500);
            console.log('发送请求', this.searchForm);
        },

        handleTableCell(type, row, index) {
            switch (type) {
                case 'EDIT': 
                    this.type = 'fixAccount';
                    this.dialogVisible = true;
                    this.dialogForm = row;
                    break;
                case 'CHANGE_PWD': 
                    this.type = 'fixPwd';
                    this.dialogVisible = true;
                    this.dialogForm = {id: row.id};
                    break;
                case 'SWITCH': 
                    this.changeStatus(row, index)
                    break;
            }
        },
        changeStatus(row, index) {
            row.status = !row.status;
            this.rows.splice(index, 1, row)
        },
        handleSelectionChange(val) {
            console.log('handleSelectionChange', val)
        },
        operateHandle() {
            this.type = 'addAccount';
            this.dialogVisible = true;
            this.dialogForm = {};
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
        submit() {

        }
    },
    components: { Table }
}
</script>

<style lang="scss" scoped>
.set_account_page{
    
}

</style>