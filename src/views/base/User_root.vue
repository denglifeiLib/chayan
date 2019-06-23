<template>
    <div class="totalPage">
        <!-- tab content -->
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
                    <el-button type="primary" size="mini" @click="handleRole('add', 'popover6')">确定</el-button>
                </div>
                <el-button type="primary" slot="reference" icon="el-icon-plus">添加角色</el-button>
            </el-popover>
        </div>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchForm.role" placeholder="角色名称" style="width: 240px;"></el-input>
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
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column  label="状态" prop="status" align="center">
                <template slot-scope="scope">
                    <el-switch :value="scope.row.status==='1'" active-color="#02E1A0"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-popover
                        placement="bottom-end"
                        width="260"
                        :ref="`popover4${scope.$index}`"
                        trigger="click">
                        <p style="padding-bottom:10px;">角色名称</p>
                        <el-input v-model="addRole" placeholder="角色名称" style="width: 240px;margin-bottom: 15px;"></el-input>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" @click="handlePopover(`popover4${scope.$index}`)">取消</el-button>
                            <el-button type="primary" size="mini" @click="handleRole('edit', `popover4${scope.$index}`, scope.row)">确定</el-button>
                        </div>
                        <el-button type="text" slot="reference">编辑</el-button>
                    </el-popover>
                    <el-button type="text" @click="operateHandle(scope.row, 'set_root')">权限配置</el-button> <span class="seperator">|</span>
                    <el-popover
                        placement="top-end"
                        width="260"
                        :ref="`popover3${scope.$index}`"
                        trigger="click">
                        <p style="padding-bottom:10px;"><i class="el-icon-warning"></i>你确定要删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" @click="handlePopover(`popover3${scope.$index}`)">取消</el-button>
                            <el-button type="primary" size="mini" @click="operateHandle(scope.row, 'delete', `popover3${scope.$index}`)">确定</el-button>
                        </div>
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
                @getCheckedKeys="getCheckedKeys"
                :current-page="3"
                :page-size="5"
                layout="total, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>

        <el-dialog title="权限配置" :visible.sync="distributForm.dialogVisible" :center="true" :close-on-click-modal="false" width="590px">
            <p class="tree_top">
                <span>角色</span><span>渠道管理</span>
            </p>
            <div class="tree_content">
                <el-tree
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    :leafOnly="true"
                    :check-on-click-node="true"
                    :default-expanded-keys="[0,1,2]"
                    :default-checked-keys="[5]"
                    :props="defaultProps">
                </el-tree>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">返回</el-button>
                <el-button type="primary" @click="distribute">保存</el-button>
            </div>
        </el-dialog>
            
    </div>
</template>

<script>

export default {
    name: 'base_user_root',
    data() {
        return {
            activeName: '1',
            searchForm: {
                role: '',
                pageSize: 15,
                page: 1
            },
            addRole: '',
            distributForm: {
                dialogVisible: false,
            },
            treeData: [
                {
                    id: 1,
                    label: '基础',
                    children: []
                }, {
                    id: 2,
                    label: '应用',
                    children: [
                        {
                            id: 21,
                            label: '爬虫'
                        }, {
                            id: 22,
                            label: '定时任务'
                        }, {
                            id: 23,
                            label: '微信'
                        }, {
                            id: 24,
                            label: '数据传输'
                        }, {
                            id: 25,
                            label: '数据处理'
                        }, {
                            id: 26,
                            label: '代理'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tableData: [
                {
                    id: 54,
                    role: '管理员',
                    status: '0'
                }, {
                    id: 4444,
                    role: '渠道管理',
                    status: '1'
                }, {
                    id: 5555,
                    role: '管理员',
                    status: '1'
                }, {
                    id: 666,
                    role: '渠道管理',
                    status: '0'
                }, {
                    id: 777,
                    role: '渠道管理',
                    status: '0'
                }, {
                    id: 8888,
                    role: '渠道管理',
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
            if(type === 'set_root') {
                this.$set(this.distributForm, 'dialogVisible', true);
            }
            if(type === 'delete') {
                this.delete(row, ref)
            }
        },
        handleRole(type, ref,  row) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                this.$refs[ref].doClose();
            }, 500);
            console.log('发送请求', type, this.addRole, row);
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
        close() {
            this.$set(this.distributForm, 'dialogVisible', false);
        },
        distribute() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                this.close();
            }, 500);
            console.log('发送请求', this.getCheckedKeys());
        },
        getCheckedKeys(val) {
            console.log(val)
        }
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
.tree_top{
    font-size:14px;
    color:rgba(0,0,0,0.85);
    line-height:22px;
    span{padding-right: 24px;}
}
.tree_content{
    margin-top: 20px;
    padding: 17px 24px;
    background:rgba(245,247,250,1);
    border-radius:2px;
    .el-tree{
        background:rgba(245,247,250,1);
    }
}
</style>