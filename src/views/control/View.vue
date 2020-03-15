<template>
<div class="question_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">直播分析</h3>
        <div class="card_cont">

            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="部门：">
                    <el-select v-model="searchForm.partment" placeholder="部门选择" size="mini" class="ml20" style="width: 240px">
                        <el-option
                            v-for="item in partmentList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户工号：">
                    <el-input v-model="searchForm.name" placeholder="用户工号" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="回复状态：" v-if="params.page === 'online'">
                    <el-select v-model="searchForm.responceStatus" placeholder="回复状态" size="mini" class="ml20"  style="width: 100px">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary" size="mini">搜索</el-button>
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
            pluginMap: [
                {
                    prop: 'online',
                    label: '在线答疑'
                }, {
                    prop: 'question',
                    label: '调查问卷'
                }, {
                    prop: 'share',
                    label: '分享达人榜'
                },{
                    prop: 'lottery',
                    label: '在线抽奖'
                }, {
                    prop: 'fee',
                    label: '打赏'
                }
            ],

            searchForm: {
                partment: '',
                code: '',
                responceStatus: '',
                pageSize: 10,
                page: 1
            },
            rows: [],
            columns: [],
        }
    },
    
    methods: {
        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                switch (this.params.page) {
                    case 'online': 
                        this.rows = [
                            {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '问题问题问题问题问题?',
                                askTime: '2019-02-05 12:45:35',
                                responce: '冯绍峰的帅哥帅哥',
                                responceTime: '2019-02-05 12:55:35'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '问题问题问题问题问题?',
                                askTime: '2019-02-05 12:45:35',
                                responce: '冯绍峰的帅哥帅哥',
                                responceTime: '2019-02-05 12:55:35'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '问题问题问题问题问题?',
                                askTime: '2019-02-05 12:45:35',
                                responce: '冯绍峰的帅哥帅哥',
                                responceTime: '2019-02-05 12:55:35'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '问题问题问题问题问题?',
                                askTime: '2019-02-05 12:45:35',
                                responce: '冯绍峰的帅哥帅哥',
                                responceTime: '2019-02-05 12:55:35'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '问题问题问题问题问题?',
                                askTime: '2019-02-05 12:45:35',
                                responce: '冯绍峰的帅哥帅哥',
                                responceTime: '2019-02-05 12:55:35'
                            }
                        ];
                        this.rows = this.addBtns(this.rows);
                        break;
                    case 'question': 
                        this.rows = [
                            {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '保险好卖吗?',
                                score: '70',
                                time: '2019-02-05 12:55:35'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '保险好卖吗?',
                                score: '70',
                                time: '2019-02-05 12:55:35'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '保险好卖吗?',
                                score: '70',
                                time: '2019-02-05 12:55:35'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '保险好卖吗?',
                                score: '70',
                                time: '2019-02-05 12:55:35'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '保险好卖吗?',
                                score: '70',
                                time: '2019-02-05 12:55:35'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                question: '保险好卖吗?',
                                score: '70',
                                time: '2019-02-05 12:55:35'
                            }
                        ];
                        this.rows = this.addBtns(this.rows);
                        break;
                    case 'lottery': 
                        this.rows = [
                            {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                title: '新春好礼',
                                wards: 'A'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                title: '新春好礼',
                                wards: 'A'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                title: '新春好礼',
                                wards: 'A'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                title: '新春好礼',
                                wards: 'A'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                title: '新春好礼',
                                wards: 'A'
                            }
                        ];
                        break;
                    case 'share': 
                        this.rows = [
                            {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                shareTimes: '2222',
                                invitNum: '11111'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                shareTimes: '2222',
                                invitNum: '11111'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                shareTimes: '2222',
                                invitNum: '11111'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                shareTimes: '2222',
                                invitNum: '11111'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                shareTimes: '2222',
                                invitNum: '11111'
                            }
                        ];
                        break;
                    case 'fee': 
                        this.rows = [
                            {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                name: '万团',
                                time: '2019-02-05 12:55:35',
                                Amount: '11111423'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                name: '万团',
                                time: '2019-02-05 12:55:35',
                                Amount: '11111423'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                name: '万团',
                                time: '2019-02-05 12:55:35',
                                Amount: '11111423'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                name: '万团',
                                time: '2019-02-05 12:55:35',
                                Amount: '11111423'
                            }, {
                                partment: '江苏分公司-宿迁中支-万达团队',
                                name: '万团',
                                time: '2019-02-05 12:55:35',
                                Amount: '11111423'
                            }
                        ];
                        break;
                }
                
                console.log('发送请求', this.rows);

            }, 500);
            
        },
        addBtns(rows) {
            if(this.params.page === 'online') {
                return rows.map(item=> {
                    item.items = [
                        {
                            key: 'RESPONCE',
                            desc: '回复',
                            size: 'mini'
                        }
                    ];
                    
                    return item;
                })
            }
            if(this.params.page === 'question') {
                return rows.map(item=> {
                    item.items = [
                        {
                            key: 'VIEW',
                            desc: '查看',
                            size: 'mini'
                        }
                    ];
                    
                    return item;
                })
            }
            return rows;
        },
        handleTableCell(type, row, index) {
            console.log(777, type, row, index)
            switch (type) {
                case 'PARTMENT': 
                    this.$router.push({name: 'analyse_live_partment', query: {id: row.id}});
                    break;
                case 'MEMBER': 
                    this.$router.push({name: 'analyse_live_member', query: {id: row.id}});
                    break;
            }
        },
        changePage(val) {
            this.searchForm.page = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },
    },
    created() {
        this._query();
        this.params = this.$route.query;
        console.log(8888, this.params);

        this.partmentList = [
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
        ];

        switch (this.params.page) {
            case 'online': 
                this.columns = [
                    {
                        prop: 'partment',
                        label: '部门名称'
                    }, {
                        prop: 'customerName',
                        label: '用户姓名'
                    }, {
                        prop: 'question',
                        label: '问题'
                    }, {
                        prop: 'askTime',
                        label: '提问时间',
                        width: '120px'
                    }, {
                        prop: 'responce',
                        label: '回复'
                    }, {
                        prop: 'responceTime',
                        label: '回复时间',
                        width: '120px'
                    }, {
                        prop: 'id',
                        label: '操作',
                        component: ButtonCell
                    }
                ];
                break;
            case 'question': 
                this.columns = [
                    {
                        prop: 'partment',
                        label: '部门名称'
                    }, {
                        prop: 'customerName',
                        label: '用户姓名'
                    }, {
                        prop: 'question',
                        label: '问卷'
                    }, {
                        prop: 'score',
                        label: '分数'
                    }, {
                        prop: 'time',
                        label: '时间',
                        width: '120px'
                    }, {
                        prop: 'id',
                        label: '操作',
                        component: ButtonCell
                    }
                ];
                break;
            case 'lottery': 
                this.columns = [
                    {
                        prop: 'partment',
                        label: '部门名称'
                    }, {
                        prop: 'customerName',
                        label: '用户姓名'
                    }, {
                        prop: 'title',
                        label: '在线抽奖标题'
                    }, {
                        prop: 'wards',
                        label: '奖项'
                    }
                ];
                break;
            case 'share': 
                this.columns = [
                    {
                        prop: 'partment',
                        label: '部门名称'
                    }, {
                        prop: 'customerName',
                        label: '用户姓名'
                    }, {
                        prop: 'shareTimes',
                        label: '分享次数'
                    }, {
                        prop: 'invitNum',
                        label: '邀请人数'
                    }
                ];
                break;
            case 'fee': 
                this.columns = [
                    {
                        prop: 'partment',
                        label: '部门名称'
                    }, {
                        prop: 'name',
                        label: '打赏人'
                    }, {
                        prop: 'time',
                        label: '打赏时间'
                    }, {
                        prop: 'Amount',
                        label: '打赏金额'
                    }
                ];
                break;
        }
    },
    components: {Table}
}
</script>

<style lang="scss" scoped>
.question_list_page{
    
}

</style>