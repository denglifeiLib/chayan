<template>
    <div class="analysis-wrapper">
        <panel-group></panel-group>

        <div class="trend">
            <el-tabs v-model="activeTrendTab" type="card" @tab-click="changeTrendTab">
                <el-tab-pane label="线索量趋势" name="clewTrend"></el-tab-pane>
                <el-tab-pane label="渠道量趋势" name="channelTrend"></el-tab-pane>
                <el-tab-pane label="人均处理量趋势" name="averageTrend"></el-tab-pane>
            </el-tabs>
            <div class="trend_contend">
                <line-chart :chart-data="lineChartData"></line-chart>
                <analysis-table 
                :tableInfo="trendTable" 
                @changeSize="chagePagenationSize" 
                @changePage="chagePagenationPage" 
                :pageSizes="[5, 10, 15]"
                layout="total, sizes, prev, pager, next, jumper"/>
            </div>
        </div>

        <el-row>
            <el-col :xs="24" :sm="10">
                <div class="card_wrapper">
                    <h3 class="card_title">渠道来源占比</h3>
                    <div class="card_cont">
                        <pie-chart/>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="14" >
                <div class="card_wrapper">
                    <h3 class="card_title">渠道来源详情</h3>
                    <div class="card_cont">
                        <analysis-table :tableInfo="channelTable" @changeSize="chagePagenationSize" @changePage="chagePagenationPage" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="10">
                <div class="card_wrapper">
                    <h3 class="card_title">关键词画布</h3>
                    <div class="card_cont">
                        <cloudTag/>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="14" >
                <div class="card_wrapper">
                    <h3 class="card_title">关键词分布详情</h3>
                    <div class="card_cont">
                        <analysis-table :tableInfo="keyWordTable" @changeSize="chagePagenationSize" @changePage="chagePagenationPage" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" >
                <div class="card_wrapper">
                    <h3 class="card_title">线索地区分布</h3>
                    <div class="card_cont" style="height:525px;">
                        <map-chart></map-chart>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import MapChart from './components/MapChart'
import cloudTag from './components/cloudTag'
import AnalysisTable from './components/AnalysisTable'


const lineChartData = {
  clewTrend: {
    expectedData: [100, 120, 161, 134, 105, 160, 165, 100, 100, 120, 161, 134, 105, 160, 165, 100, 100, 120, 161, 134, 105, 160, 165, 100],
    actualData: [120, 82, 91, 154, 162, 140, 145, 100, 120, 82, 91, 154, 162, 140, 145, 100, 120, 82, 91, 154, 162, 140, 145, 100]
  },
  channelTrend: {
    expectedData: [200, 192, 120, 144, 160, 130, 140, 100, 200, 192, 120, 144, 160, 130, 140, 100, 200, 192, 120, 144, 160, 130, 140, 100],
    actualData: [180, 160, 151, 106, 145, 150, 130, 100, 180, 160, 151, 106, 145, 150, 130, 100, 180, 160, 151, 106, 145, 150, 130, 100]
  },
  averageTrend: {
    expectedData: [80, 100, 121, 104, 105, 90, 100, 100,180, 160, 151, 106, 145, 150, 130, 100, 180, 160, 151, 106, 145, 150, 130, 10],
    actualData: [120, 90, 100, 138, 142, 130, 130, 120, 120, 90, 100, 138, 142, 130, 130, 120, 120, 90, 100, 138, 142, 130, 130, 120]
  }
}


export default {
    name: 'Analysis',
    data () {
        return {
           activeTrendTab: 'clewTrend',
           lineChartData: lineChartData.clewTrend,
           trendTable: {
               type: 'trend',
               columns: [{prop:'time',label:'时间'}, {prop:'title',label:'标题'}],
               tableData: [{
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎<h1>dsds</h1>'
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎'
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎'
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎'
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎'
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎'
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎'
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎'
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎'
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎'
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎'
                    },
                ],
                pagination: {
                    pageSize: 4,
                    curPage: 2,
                    total: 89
                }
        
            },
            channelTable: {
               type: 'channel',
               columns: [{prop:'time',label:'时间'}, {prop:'channel',label:'渠道'}],
               tableData: [{
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎',
                        channel: '百度贴吧',
                        icon: require('@/assets/images/logo_1.jpg'),
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎',
                        channel: '百度贴吧',
                        icon: require('@/assets/images/logo_1.jpg'),
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎',
                        channel: '百度贴吧',
                        icon: require('@/assets/images/logo_1.jpg'),
                    }, {
                        time: '2016-05-02 12:12:32',
                        title: '王王小虎王小虎王小虎小虎',
                        channel: '百度贴吧',
                        icon: require('@/assets/images/logo_1.jpg'),
                    }
                ],
                pagination: {
                    pageSize: 4,
                    curPage: 2,
                    total: 27
                }
        
            },
            keyWordTable: {
               type: 'keyWord',
               columns: [{prop:'time',label:'时间'}, {prop:'origin',label:'来源'}],
               tableData: [{
                        time: '2016-05-02 12:12:32',
                        origin: '奥迪A8和宝马7系怎么选？',
                    }, {
                        time: '2016-05-02 12:12:32',
                        origin: '奥迪A8和宝马7系怎么选？',
                    }, {
                        time: '2016-05-02 12:12:32',
                        origin: '奥迪A8和宝马7系怎么选？',
                    }, {
                        time: '2016-05-02 12:12:32',
                        origin: '奥迪A8和宝马7系怎么选？',
                    }, {
                        time: '2016-05-02 12:12:32',
                        origin: '奥迪A8和宝马7系怎么选？',
                    }, {
                        time: '2016-05-02 12:12:32',
                        origin: '奥迪A8和宝马7系怎么选？',
                    }
                ],
                pagination: {
                    pageSize: 5,
                    curPage: 3,
                    total: 18
                }
        
            }
        };
    },
    computed: {},
    methods: {
        changeTrendTab(obj) {
            console.log(2222, name)
            this.lineChartData = lineChartData[obj.name];
        },
        chagePagenationSize(val, type) {
            console.log(val, type);
        },
        chagePagenationPage(val) {
            console.log(val, type);
        },
    },
    components: {PanelGroup, LineChart, AnalysisTable, PieChart, MapChart, cloudTag},
}
</script>
<style lang="scss">
.analysis-wrapper{
    .trend_contend{
        margin-bottom: 32px;
        padding: 24px 32px 36px;
        background: #fff;
         .el-table{
             margin-top: 32px;
         }
    }
    .card_wrapper{
        background: #fff;
         margin-bottom: 32px;
        border: solid 1px #E9E9E9;
        .card_title{
            font-size:16px;
            color:rgba(0,0,0,0.85);
            line-height:24px;
            padding: 19px 24px 15px;
            border-bottom: solid 1px #E9E9E9;
        }
        .card_cont{
            padding: 16px 28px 0;
            // height: 370px;
        }
        
    }
    .el-row{
        display: flex;
        flex-wrap: wrap;
        .el-col{
            padding: 8px;
            .card_wrapper{
                height: 100%;
            }
        }
    }
}
</style>
