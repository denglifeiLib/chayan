<template>
    <div class="report_page">
        <div class="card_wrapper mt25">
            
            <div class="card_cont">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-date-picker v-model="searchForm.startTime" type="date" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="searchForm.endTime" type="date" placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searchForm.checkNum" placeholder="体检编号" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
                
                <!-- table -->
                <Table :columns="columns" :rows="rows" @action="handleTableCell" @handleSelectionChange="handleSelectionChange"></Table>

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
    name: 'report_page',
    data() {
        return {
            searchForm: {
                startTime: '',
                endTime: '',
                checkNum: '',
                pageSize: 15,
                page: 1
            },
            list: [],
            detail: {},
            columns: [
                {
                    prop: 'name',
                    label: '姓名'
                }, {
                    prop: 'checkNum',
                    label: '体检编号'
                }, {
                    prop: 'checkTime',
                    label: '检测时间'
                }, {
                    prop: 'deviceName',
                    label: '设备名称'
                }, {
                    prop: 'status',
                    label: '状态',
                    filter: (row)=> {
                        return row.role === '0' ? '检测失败' : '检测成功';
                    }
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
                        name: '王刚',
                        checkNum: '340',
                        checkTime: '17744885566',
                        deviceName: '2020-02-11 12:22:22',
                        status: 0
                    }, {
                        id: 1,
                        name: '王刚',
                        checkNum: '340',
                        checkTime: '17744885566',
                        deviceName: '2020-02-11 12:22:22',
                        status: 0
                    }, {
                        id: 1,
                        name: '王刚',
                        checkNum: '340',
                        checkTime: '17744885566',
                        deviceName: '2020-02-11 12:22:22',
                        status: 0
                    }, {
                        id: 1,
                        name: '王刚',
                        checkNum: '340',
                        checkTime: '17744885566',
                        deviceName: '2020-02-11 12:22:22',
                        status: 0
                    }, {
                        id: 1,
                        name: '王刚',
                        checkNum: '340',
                        checkTime: '17744885566',
                        deviceName: '2020-02-11 12:22:22',
                        status: 0
                    }, 
                ];

                this.rows = this.rows.map(item=> {
                    item.status = !!item.status;
                    // 添加操作btns
                    item.items = [
                        {
                            key: 'PRINT',
                            desc: '打印报告'
                        }
                    ]
                    return item;
                })
                
            }, 500);
            console.log('发送请求', this.searchForm);
        },

        handleTableCell(type, row, index) {
            switch (type) {
                case 'PRINT': 
                    this.type = 'fixAccount';
                    this.dialogVisible = true;
                    this.dialogForm = row;
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
.report_page{
    
}

</style>