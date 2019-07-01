<template>
    <div>
        <div class="card_wrapper mt25">
            <h3 class="card_title">代理服务</h3>
            <div class="card_cont">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchForm.user" placeholder="请输入应用名称" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
                </el-form>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border>
                    <el-table-column prop="protocal" label="协议"></el-table-column>
                    <el-table-column prop="ip" label="IP地址"></el-table-column>
                    <el-table-column prop="path" label="路径"></el-table-column>
                    <el-table-column prop="port" label="端口"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <span :class="scope.row.status==='1'?'green':'yellow'">{{ ({'1': '正常','0': '已停止'})[scope.row.status]}}</span>
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
    </div>
</template>

<script>


export default {
    name: 'agent_server',
    data() {
        return {
            searchForm: {
                user: '',
                pageSize: 15,
                page: 1
            },
            tableData: [
                {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '0'
                }, {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '0'
                }, {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '0'
                }, {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '0'
                }, {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '1'
                }, {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '1'
                }, {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '0'
                }, {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '0'
                }, {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '1'
                }, {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '0'
                }, {
                    protocal: 'HTTPS',
                    ip: '10.1.1.1',
                    port: '8888',
                    status: '0'
                },
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
    components: {}
}
</script>

<style scoped lang="scss">
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
.dialog_content{
    .log_info{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .log{
        margin-top: 15px;
        padding: 22px 31px;
        width:100%;
        color:rgba(220,223,230,1);
        line-height:17px;
        background:rgba(48,49,51,0.5);
        max-height: 500px;
        overflow-y: scroll;
    }
}
</style>