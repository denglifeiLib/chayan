<template>
<div class="question_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">回播分析</h3>
        <div class="card_cont">

            <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                <!-- <el-form-item label="时间段：">
                    <el-select v-model="searchForm.data" placeholder="请选择" size="medium">
                        <el-option value="-1" label="昨天"></el-option>
                        <el-option value="3" label="最近3天"></el-option>
                        <el-option value="7" label="最近7天"></el-option>
                        <el-option value="30" label="最近30天"></el-option>
                        <el-option value="0" label="自定义时间段"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="时间段选择：">
                    <el-date-picker
                        v-model="searchForm.data"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="直播名称：">
                    <el-input v-model="searchForm.name" placeholder="输入直播名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
                </el-form-item>
            </el-form>

            <Table :columns="columns" :rows="rows" @action="handleTableCell"></Table>
            <!-- 翻页 -->
            <div class="mt24"> 
                <el-pagination
                    background
                    @current-change="changePage"
                    :current-page="searchForm.page"
                    :page-size="searchForm.pageSize"
                    layout="prev, pager, next"
                    :total="40">
                </el-pagination>
            </div>
        </div>
       
    </div>
</div>
</template>

<script>
import Table from '@/components/Table';
import ButtonCell from '@/components/ButtonCell';
export default {
    name: 'question_list_page',
    data() {
        return {
            searchForm: {
                data: '',
                name: '',
                pageSize: 10,
                page: 1
            },
            rows: [],
            columns: [
                {
                    prop: 'name',
                    label: '回播名称'
                }, {
                    prop: 'longTime',
                    label: '视频时长',
                    width: '120px',
                }, {
                    prop: 'visitedNum',
                    label: '访问用户数'
                }, {
                    prop: 'visitedTimes',
                    label: '访问次数'
                }, {
                    prop: 'stayLong',
                    label: '平均停留时长',
                }, {
                    prop: 'id',
                    label: '部门分析',
                    listKey: 'btn1Item',
                    component: ButtonCell
                }, {
                    prop: 'id',
                    label: '人员分析',
                    listKey: 'btn2Item',
                    component: ButtonCell
                }
            ], 
            pickerOptions: {
                shortcuts: [
                    {
                        text: '昨天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近3天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近7天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近30天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
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
                        name: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                        longTime: '156:45:20',
                        visitedNum: "1214",
                        visitedTimes: "456",
                        stayLong: "1:55:12",
                        msgNum: "114",
                        questionNum: "7894",
                        valibleQA: "1844",
                        lotteryNum: "23",
                        shareNum: "1214",
                        invitedNum: "354",
                        feeTimes: "3434",
                        feeAmount: "783434"
                    }, {
                        id: 1,
                        name: '直播名称',
                        longTime: '156:45:20',
                        visitedNum: "1214",
                        visitedTimes: "456",
                        stayLong: "1:55:12",
                        msgNum: "114",
                        questionNum: "7894",
                        valibleQA: "1844",
                        lotteryNum: "23",
                        shareNum: "1214",
                        invitedNum: "354",
                        feeTimes: "3434",
                        feeAmount: "783434"
                    }, {
                        id: 1,
                        name: '直播名称',
                        longTime: '156:45:20',
                        visitedNum: "1214",
                        visitedTimes: "456",
                        stayLong: "1:55:12",
                        msgNum: "114",
                        questionNum: "7894",
                        valibleQA: "1844",
                        lotteryNum: "23",
                        shareNum: "1214",
                        invitedNum: "354",
                        feeTimes: "3434",
                        feeAmount: "783434"
                    }, {
                        id: 1,
                        name: '直播名称',
                        longTime: '156:45:20',
                        visitedNum: "1214",
                        visitedTimes: "456",
                        stayLong: "1:55:12",
                        msgNum: "114",
                        questionNum: "7894",
                        valibleQA: "1844",
                        lotteryNum: "23",
                        shareNum: "1214",
                        invitedNum: "354",
                        feeTimes: "3434",
                        feeAmount: "783434"
                    }, {
                        id: 1,
                        name: '直播名称',
                        longTime: '156:45:20',
                        visitedNum: "1214",
                        visitedTimes: "456",
                        stayLong: "1:55:12",
                        msgNum: "114",
                        questionNum: "7894",
                        valibleQA: "1844",
                        lotteryNum: "23",
                        shareNum: "1214",
                        invitedNum: "354",
                        feeTimes: "3434",
                        feeAmount: "783434"
                    }
                ];
                this.rows = this.addBtns(this.rows);
                console.log('发送请求', this.rows);

            }, 500);
            
        },
        addBtns(rows) {
            return rows.map(item=> {
                item.btn1Item = [
                    {
                        key: 'PARTMENT',
                        desc: '查看',
                        size: 'mini'
                    }
                ];
                item.btn2Item = [
                    {
                        key: 'MEMBER',
                        desc: '查看',
                        size: 'mini'
                    }
                ]
                return item;
            })
        },
        handleTableCell(type, row, index) {
            console.log(777, type, row, index)
            switch (type) {
                case 'PARTMENT': 
                    this.$router.push({name: 'analyse_replay_partment', query: {id: row.id}});
                    break;
                case 'MEMBER': 
                    this.$router.push({name: 'analyse_replay_member', query: {id: row.id}});
                    break;
            }
        },
        changePage(val) {
            this.searchForm.page = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },
    },
    components: {Table}
}
</script>

<style lang="scss" scoped>
.question_list_page{
    
}

</style>