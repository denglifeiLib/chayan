<template>
  <div class="subaccount-wrapper">
    <div class="account-wrapper">
        <div class="action_btns">
            <el-button plain @click="handlerRow('start')">开始</el-button>
            <el-button plain @click="handlerRow('pause')">暂停</el-button>
            <el-button type="danger" plain @click="handlerRow('delete')">删除</el-button>
            <div class="fr">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="form.dialogVisible = true">添加子账号</el-button>
            </div>
        </div>

        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @filter-change="filterAction"
            border
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="accountName" label="用户名"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
            <el-table-column 
                prop="role" 
                label="角色"
                :filter-multiple="false"
                filter-placement="bottom-start"
                column-key="role"
                :filters="[{text:'管理员',value:'manager'},{text:'渠道管理',value:'channel_m'},{text:'客服',value:'server'}]">
                <template slot-scope="scope">
                    <span>{{ ({'manager': '管理员','channel_m': '渠道管理','server': '客服'})[scope.row.role]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="business" label="业务处理" sortable></el-table-column>
            <el-table-column 
                label="状态" 
                :filter-multiple="false"
                filter-placement="bottom-start"
                prop="status"
                column-key="status"
                :filters="[{text:'正常运行',value:'1'},{text:'账号失效',value:'0'}]">
                <template slot-scope="scope">
                    <span :class="scope.row.status==='1'?'green':scope.row.status==='0'?'red':'yellow'">{{ ({'1': '正常运行','0': '账号失效','2': '暂停'})[scope.row.status]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="190" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="operateHandle(scope.row, scope.$index, 'validate')" :disabled="scope.row.role==='manager'">验证</el-button> <span class="seperator">|</span>
                    <el-button type="text" @click="operateHandle(scope.row, scope.$index, 'pause')" :disabled="scope.row.role==='manager'">暂停</el-button> <span class="seperator">|</span>
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

        <div class="mt24">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="3"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>


        <el-dialog title="添加子账号" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false" :modal="true">
            <div class="content">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="账户姓名">
                        <el-input v-model="form.accountName" style="width:240px;" placeholder="请输入姓名" size="medium" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="账户密码">
                        <el-input v-model="form.password" style="width:240px;" placeholder="请输入初始密码" size="medium" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="账户权限">
                        <el-radio-group v-model="form.root" size="medium">
                            <el-radio border label="manager">管理员</el-radio>
                            <el-radio border label="channel_m">渠道管理</el-radio>
                            <el-radio border label="server">客服</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="负责渠道">
                        <el-select v-model="form.industry" label="活动名称" label-width="224px" size="medium">
                            <el-option
                                v-for="item in form.industryList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <p class="custmor_tips">触发提醒消息时发往：</p>
                    <el-form-item label="手机号">
                        <el-input v-model="form.phone" style="width:240px;" placeholder="请输入手机号" size="medium" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" style="width:240px;" placeholder="请输入邮箱" size="medium" clearable></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="add">保存</el-button>
            </div>
        </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
    name: 'Subaccount',
    data () {
        return {
            visible2: true,
            form: {
                dialogVisible: false,
                accountName: '',
                password: '',
                industryList: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ],
                root: 'channel_m',
                industry: '选项2',
                phone: '',
                email: ''
            },
           selectedRows: [],
           tableData: [
               {
                   accountName: '张三',
                   createTime: '2019-03-08 23:12:00',
                   role: 'manager',//管理员 manager 渠道管理 channel_m 客服server
                   business: '101',
                   status: '1',
                   popoverVisible: false
               }, {
                   accountName: '张三',
                   createTime: '2019-03-08 23:12:00',
                   role: 'channel_m',
                   business: '101',
                   status: '2',
                   popoverVisible: false
               }, {
                   accountName: '张三',
                   createTime: '2019-03-08 23:12:00',
                   role: 'server',
                   business: '101',
                   status: '1',
                   popoverVisible: false
               }, {
                   accountName: '张三',
                   createTime: '2019-03-08 23:12:00',
                   role: 'channel_m',
                   business: '101',
                   status: '1',
                   popoverVisible: false
               }, {
                   accountName: '张三',
                   createTime: '2019-03-08 23:12:00',
                   role: 'server',
                   business: '101',
                   status: '2',
                   popoverVisible: false
               }, {
                   accountName: '张三',
                   createTime: '2019-03-08 23:12:00',
                   role: 'channel_m',
                   business: '101',
                   status: '2',
                   popoverVisible: false
               }, {
                   accountName: '张三',
                   createTime: '2019-03-08 23:12:00',
                   role: 'server',
                   business: '101',
                   status: '1',
                   popoverVisible: false
               }, {
                   accountName: '张三',
                   createTime: '2019-03-08 23:12:00',
                   role: 'channel_m',
                   business: '101',
                   status: '1',
                   popoverVisible: false
               }, {
                   accountName: '张三',
                   createTime: '2019-03-08 23:12:00',
                   role: 'server',
                   business: '101',
                   status: '2',
                   popoverVisible: false
               }
           ],
        };
    },
    computed: {},
    methods: {
        handlerRow(type) {
            if(this.selectedRows.length===0){
                this.$confirm('请选则要操作的行！', '提示', {
                    showCancelButton: false
                }).then(()=> {

                })
                return ; 
            }
            this.$confirm(' 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    console.log(2222, this.selectedRows)
                    this.$message({
                        type: 'success',
                        message: type+'操作成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
            });
        },
        handleSelectionChange(arr) {
            this.selectedRows = arr;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        filterAction(value) {
            console.log(value)
        },
        operateHandle(row, index, type, ref) {
            console.log(row, index);
            if(type === 'delete' && ref) {
                this.$refs[ref].doClose();
                this.$message({
                    type: 'success',
                    message: type+'操作成功!'
                });
            }
        },
        handlePopover(ref) {
            this.$refs[ref].doClose();
        },
        add() {
            console.log('add');
        },
    },
    components: { },
}
</script>
<style lang="scss">
    .subaccount-wrapper{
        padding: 24px 32px 30px;
        background: #fff;
        border-radius:2px;
        .action_btns{
            padding-bottom: 22px;
        }
        .list_icon{
            width: 32px;
            vertical-align: middle;
        }
        .seperator{
            color: #e9e9e9;
        }
        .red{
            color: #FF3636;
            &::before{
                content: ' ';
                display: inline-block;
                width:6px;
                height:6px;
                background: #FF3636;
                border-radius: 5px;
                vertical-align: middle;
                margin-right: 5px;
            }
        }
        .green{
            &::before{
                content: ' ';
                display: inline-block;
                width:6px;
                height:6px;
                background: #02E1A0;
                border-radius: 5px;
                vertical-align: middle;
                margin-right: 5px;
            }
        }
        .yellow{
            &::before{
                content: ' ';
                display: inline-block;
                width:6px;
                height:6px;
                background:#F0BD2B;
                border-radius: 5px;
                vertical-align: middle;
                margin-right: 5px;
            }
        }
        .content{
            padding:0 130px;
            border: 0;
        }
        .logo_wrap{
            padding-bottom: 50px;
            color: #000;
            font-size: 20px;
            text-align: center;
            .logo{
                width: 40px;
                height: 40px;
                vertical-align: middle;
            }
        }
        .el-form-item label{
            text-align: left;
        }
        .custmor_tips{
            color: #1890FF;
            font-size:16px;
            padding: 38px 0 24px;
        }
        .el-radio{
            margin-right: 3px;
        }
    }
</style>
