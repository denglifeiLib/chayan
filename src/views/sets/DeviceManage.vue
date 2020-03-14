<template>
    <div class="set_device_page">
        <div class="card_wrapper mt25">
            
            <div class="card_cont">

                <div class="fr">
                    <el-button type="primary" icon="el-icon-plus"  @click="operateHandle">添加设备</el-button>
                </div>
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchForm.user" placeholder="设备名称" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
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
    </div>
    
</template>

<script>
import Table from '../../components/Table';
import ButtonCell from '../../components/ButtonCell';
import Switch from '../../components/Switch';
export default {
    name: 'set_device_page',
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
                    prop: 'image',
                    label: '设备图片'
                }, {
                    prop: 'name',
                    label: '设备名称'
                }, {
                    prop: 'code',
                    label: '设备编码'
                }, {
                    prop: 'producer',
                    label: '厂家'
                }, {
                    prop: 'contactWay',
                    label: '连接方式'
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
            rows: []
        }
    },
    created() {
        this._query();
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
                        role: '系统管理员',
                        mobile: '17744885566',
                        status: 0
                    }, {
                        id: 2,
                        account: 'XXXXXXX',
                        role: '系统管理员',
                        mobile: '17744885566',
                        status: 1
                    }, {
                        id: 3,
                        account: 'XXXXXXX',
                        role: '系统管理员',
                        mobile: '17744885566',
                        status: 1
                    }, {
                        id: 4,
                        account: 'XXXXXXX',
                        role: '系统管理员',
                        mobile: '17744885566',
                        status: 1
                    }, {
                        id: 5,
                        account: 'XXXXXXX',
                        role: '系统管理员',
                        mobile: '17744885566',
                        status: 0
                    }, {
                        id: 6,
                        account: 'XXXXXXX',
                        role: '系统管理员',
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
                    break;
                case 'CHANGE_PWD': 
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
            console.log(7777, 'add')
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
    },
    components: { Table }
}
</script>

<style lang="scss" scoped>
.set_device_page{
    
}

</style>