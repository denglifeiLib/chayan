<template>
<div class="analyse_live_member_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">
            直播人员分析
            <el-button @click="$router.go(-1)" class="fr" size="mini">返回</el-button>
        </h3>
        <div class="card_cont">
            <p class="subTitle">总数据 </p>
            <Table :columns="totalColumns" :rows="totalRow" @action="handleTableCell"></Table>
 
            <p class="subTitle mt25 flex_box">
                人员分析
                <el-select v-model="partment" placeholder="请选择" size="mini" class="ml20" style="width: 240px">
                    <el-option
                        v-for="item in partmentList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="ml20" size="mini" type="primary">数据导出</el-button>
            </p>
            <Table :columns="detailColumns" :rows="detailRows" @action="handleTableCell"></Table>
        </div>
       
    </div>
</div>
</template>

<script>
import Table from '@/components/Table';
import ButtonCell from '@/components/ButtonCell';
export default {
    name: 'analyse_live_member_page',
    data() {
        return {
            partmentList: [
                {
                    value: '1',
                    label: '江苏分公司-宿迁中支-王大雷团队1'
                }, {
                    value: '2',
                    label: '江苏分公司-宿迁中支-王大雷团队2'
                }, {
                    value: '3',
                    label: '江苏分公司-宿迁中支-王大雷团队3'
                }
            ],
            partment: '',
            totalRow: [],
            detailRows: [],

            totalColumns: [
                {
                    prop: 'name',
                    label: '直播名称'
                }, {
                    prop: 'longTime',
                    label: '直播持续时间',
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
                    width: '120px',
                }, {
                    prop: 'msgNum',
                    label: '发言数'
                }, {
                    prop: 'questionNum',
                    label: '答疑数'
                }, {
                    prop: 'lotteryNum',
                    label: '抽奖参数数'
                }, {
                    prop: 'valibleQA',
                    label: '调查问卷有效答卷数'
                }, {
                    prop: 'shareNum',
                    label: '分享人数'
                }, {
                    prop: 'invitedNum',
                    label: '分享邀请数'
                }, {
                    prop: 'feeTimes',
                    label: '打赏人数'
                }, {
                    prop: 'feeAmount',
                    label: '打赏金额'
                }
            ], 
            detailColumns:  [
                {
                    prop: 'partment',
                    label: '部门名称',
                    width: '140px'
                }, {
                    prop: 'name',
                    label: '姓名',
                }, {
                    prop: 'personType',
                    label: '类型'
                }, {
                    prop: 'ip',
                    label: 'IP'
                }, {
                    prop: 'weixName',
                    label: '微信名'
                }, {
                    prop: 'stayLong',
                    label: '停留时长',
                    width: '120px',
                }, {
                    prop: 'msgNum',
                    label: '发言数'
                }, {
                    prop: 'questionNum',
                    label: '答疑数'
                }, {
                    prop: 'lotteryNum',
                    label: '抽奖参数数'
                }, {
                    prop: 'valibleQA',
                    label: '调查问卷有效答卷数'
                }, {
                    prop: 'shareNum',
                    label: '分享人数'
                }, {
                    prop: 'invitedNum',
                    label: '分享邀请数'
                }, {
                    prop: 'feeTimes',
                    label: '打赏人数'
                }, {
                    prop: 'feeAmount',
                    label: '打赏金额'
                }
            ], 
            
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
                this.totalRow = [
                    {
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
                this.detailRows = [
                    {
                        id: 1,
                        partment: '江苏分公司-宿迁中支-王大雷团队',
                        persons: '2321',
                        name: '老王',
                        personType: '游客',
                        ip: '江苏无锡',
                        weixName: '凡事',
                        visitedNum: "1214",
                        visitedRate: '80%',
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
                        partment: '江苏分公司-宿迁中支-王大雷团队',
                        persons: '2321',
                        name: '老王',
                        personType: '游客',
                        ip: '江苏无锡',
                        weixName: '凡事',
                        visitedNum: "1214",
                        visitedRate: '80%',
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
                        partment: '江苏分公司-宿迁中支-王大雷团队',
                        persons: '2321',
                        name: '老王',
                        personType: '游客',
                        ip: '江苏无锡',
                        weixName: '凡事',
                        visitedNum: "1214",
                        visitedRate: '80%',
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
                        partment: '江苏分公司-宿迁中支-王大雷团队',
                        persons: '2321',
                        name: '老王',
                        personType: '游客',
                        ip: '江苏无锡',
                        weixName: '凡事',
                        visitedNum: "1214",
                        visitedRate: '80%',
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
                        partment: '江苏分公司-宿迁中支-王大雷团队',
                        persons: '2321',
                        name: '老王',
                        personType: '游客',
                        ip: '江苏无锡',
                        weixName: '凡事',
                        visitedNum: "1214",
                        visitedRate: '80%',
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
                case 'EDIT': 
                    break;
                case 'DELETE': 
                    break;
                case 'PUBLISH': 
                    break;
                case 'OFFLINE': 
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
.analyse_live_member_page{
    .subTitle{
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
    }
}

</style>