<template>
    <div>
        <div class="card_wrapper mt25">
            <h3 class="card_title">消息列表</h3>
            <div class="card_cont" style="height:525px;">
                <el-radio-group v-model="msg_type" @change="_query">
                    <el-radio-button plain label="0">未读 ({{initData.read||0}})</el-radio-button>
                    <el-radio-button plain label="1">已读 ({{initData.unread||0}})</el-radio-button>
                    <el-radio-button plain label="2">回收站 ({{initData.rubbish||0}})</el-radio-button>
                </el-radio-group>
                <div class="handle_btn mt25">
                    <el-button plain size="small" @click="handleRow('delete')">删除</el-button>
                    <el-button plain size="small" @click="handleRow('read')">标记已读</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    class="mt25"
                    border
                    @row-click="jump"
                    @selection-change="handleSelectionChange">
                    <el-table-column prop="checkbox" type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="number" label="编号"></el-table-column>
                    <el-table-column prop="apply" label="应用"></el-table-column>
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="time" label="时间"></el-table-column>
                    <el-table-column prop="operate" label="操作">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" @click="handleRow('read', scope.row.id)">标记已读</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'msg_list',
    data() {
        return {
            msg_type: '0',
            initData: {
                read: '',
                unread: '',
                rubbish: ''
            },
            tableData: [
                {
                    id: 343,
                    number: '234',
                    apply: '爬虫服务-保监会数据',
                    title: '运行错误',
                    time: '2019-03-08 23:12:00'
                }, {
                    id: 111111,
                    number: '444',
                    apply: '爬虫服务-保监会数据',
                    title: '运行错误',
                    time: '2019-03-08 23:12:00'
                }, {
                    id: 222222,
                    number: '23',
                    apply: '爬虫服务-保监会数据',
                    title: '运行错误',
                    time: '2019-03-08 23:12:00'
                }, {
                    id: 333333,
                    number: '1',
                    apply: '爬虫服务-保监会数据',
                    title: '运行错误',
                    time: '2019-03-08 23:12:00'
                }, {
                    id: 3434444,
                    number: '44444',
                    apply: '爬虫服务-保监会数据',
                    title: '运行错误',
                    time: '2019-03-08 23:12:00'
                }
            ]
        }
    },
    methods: {
        init() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                this.initData = {
                    read: '12',
                    unread: '22',
                    rubbish: '34'
                }
            }, 500);
            
        },
        _query() {
            console.log('发送请求', this.msg_type);
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
            }, 500);
            
        },
        handleRow(type, id) {
            console.log(arguments);
        },
        handleSelectionChange(arr, i) {
            this.selectedRows = arr;
            console.log(arr, i);
        },
        jump(row, column) {
            if(column.property==='checkbox' || column.property==='operate')return;
            this.$router.push({ path: `/msg/msg/${row.id}`, params: {id: row.id} });
        }
    },
    created() {
        this.init();
    },
}
</script>

<style scoped>

</style>