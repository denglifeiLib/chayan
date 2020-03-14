<template>
  <div class="privilege-wrapper">
        <div class="action_btns">
            <el-button plain @click="handlerRow('start')" size="medium">开始</el-button>
            <el-button plain @click="handlerRow('pause')" size="medium">暂停</el-button>
            <el-button type="danger" plain @click="handlerRow('delete')" size="medium">删除</el-button>
            <div class="fr">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="form.dialogVisible = true">添加角色</el-button>
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
            <el-table-column prop="roleName" label="角色名称" width="130"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="162" sortable></el-table-column>
            <el-table-column prop="rolePermission" label="角色权限">
                <template slot-scope="scope">
                    <span v-for="(item,index) in scope.row.rolePermission" :key="index" class="rolePermissions">
                        <i class="el-icon-circle-check"></i>
                        {{item}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column 
                label="状态" 
                :filter-multiple="false"
                filter-placement="bottom-start"
                prop="status"
                column-key="status"
                 width="120"
                :filters="[{text:'正常运行',value:'1'},{text:'账号失效',value:'0'}]">
                <template slot-scope="scope">
                    <span :class="scope.row.status==='1'?'green':scope.row.status==='0'?'red':'yellow'">{{ ({'1': '正常运行','0': '账号失效','2': '暂停'})[scope.row.status]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="operateHandle(scope.row, scope.$index, 'validate')" :disabled="scope.row.role==='manager'">编辑</el-button> <span class="seperator">|</span>
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


        <el-dialog title="添加角色" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false" :modal="true">
            <div class="content">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="角色名称">
                        <el-input v-model="form.roleName" placeholder="请输入姓名" size="medium" clearable style="width:240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="权限类型">
                        <el-radio-group v-model="form.rootType" size="medium">
                            <el-radio border label="查询">查询</el-radio>
                            <el-radio border label="查询+操作">查询+操作</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="角色状态">
                        <el-switch v-model="form.open" active-color="#02E1A0" inactive-color="#EBEEF5" :width="40" />
                        {{form.open ? '开启' : '关闭'}}
                    </el-form-item>
                    <p class="custmor_tips">触发提醒消息时发往：</p>
                    <tree></tree>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="add">保存</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import Tree from './components/Tree'
export default {
    name: 'Privilege',
    data () {
        return {
            visible2: false,
            form: {
                dialogVisible: false,
                roleName: '',
                rootType: '',
                open: false,
            },
           selectedRows: [],
           tableData: [
               {
                   roleName: '管理员',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['全部'],
                   status: '1',
               }, {
                   roleName: '渠道管理-1',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['监控策略', '渠道管理', '账号库'],
                   status: '2',
               }, {
                   roleName: '渠道管理-2',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['监控策略', '渠道管理', '账号库'],
                   status: '1',
               }, {
                   roleName: '客服',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['监控策略', '渠道管理'],
                   status: '1',
               }, {
                   roleName: '角色名',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['线索库', '智能客服', '工作台'],
                   status: '2',
               }, {
                   roleName: '角色名',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['权限'],
                   status: '2',
               }, {
                   roleName: '角色名',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['权限'],
                   status: '2',
               }, {
                   roleName: '角色名',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['权限'],
                   status: '2',
               }, {
                   roleName: '角色名',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['权限'],
                   status: '2',
               }, {
                   roleName: '角色名',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['权限'],
                   status: '2',
               }, {
                   roleName: '角色名',
                   createTime: '2019-03-08 23:12:00',
                   rolePermission: ['权限'],
                   status: '2',
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
            this.form.dialogVisible = false;
        },
    },
    components: { Tree },
}
</script>
<style lang="scss">
    .privilege-wrapper{
        padding: 20px;
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
        .rolePermissions{
            i{
                color: #02E1A0;
                font-size: 16px;
            }
            padding-right: 15px;
        }
        .el-radio:first-child{
            margin-right: 3px;
        }
        .custmor_tips{
            margin-bottom: 16px;
            color:rgba(0,0,0,0.85);
            font-size:16px;
        }
    }
</style>
