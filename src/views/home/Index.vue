<template>
    <div class="analysis-wrapper">
        <panel-group></panel-group>

        <div class="trend">
            <!-- <el-tabs v-model="activeTrendTab" type="card" @tab-click="changeTrendTab">
                <el-tab-pane label="线索量趋势" name="clewTrend"></el-tab-pane>
                <el-tab-pane label="渠道量趋势" name="channelTrend"></el-tab-pane>
                <el-tab-pane label="人均处理量趋势" name="averageTrend"></el-tab-pane>
            </el-tabs> -->
            <div class="trend_contend">
                <line-chart :chart-data="lineChartData"></line-chart>
                <!-- <analysis-table 
                :tableInfo="trendTable" 
                @changeSize="chagePagenationSize" 
                @changePage="chagePagenationPage" 
                :pageSizes="[5, 10, 15]"
                layout="total, sizes, prev, pager, next, jumper"/> -->
            </div>
        </div>

        <el-row>
            <el-col :xs="24" :sm="12">
                <div class="card_wrapper">
                    <h3 class="card_title">最新爬虫运行记录</h3>
                    <div class="card_cont">
                        <div class="newest_reptile_record">
                            <img src="../../assets/images/p_header.jpg" alt="" class="icon fl">
                            <dl class="fl">
                                <dt>XXXXXXX爬虫</dt>
                                <dd>
                                    1 分钟前<i class="ge"></i>运行 5 分钟<i class="ge"></i>采集 50000 条数据
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" >
                <div class="card_wrapper">
                    <h3 class="card_title">最新触发微信事件</h3>
                    <div class="card_cont">
                        <div class="msg1">
                            <img src="../../assets/images/p_header.jpg" alt="" class="hd_img">
                            <div class="info_box">
                                <p class="name">老王</p>
                                <div class="msg">好我想跟你说你 好我想跟你说你好</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" >
                <div class="card_wrapper">
                    <h3 class="card_title">常用应用</h3>
                    <div class="card_cont">
                        <ul class="clearfix active_applys">
                            <li>
                                <img src="../../assets/images/p_apply_1.png" alt="" class="apply_icon">
                                <p>爬虫服务</p>
                            </li>
                            <li>
                                <img src="../../assets/images/p_apply_2.png" alt="" class="apply_icon">
                                <p>微信服务</p>
                            </li>
                            <li>
                                <img src="../../assets/images/p_apply_3.png" alt="" class="apply_icon">
                                <p>定时任务</p>
                            </li>
                        </ul>
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
//   channelTrend: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140, 100, 200, 192, 120, 144, 160, 130, 140, 100, 200, 192, 120, 144, 160, 130, 140, 100],
//     actualData: [180, 160, 151, 106, 145, 150, 130, 100, 180, 160, 151, 106, 145, 150, 130, 100, 180, 160, 151, 106, 145, 150, 130, 100]
//   },
//   averageTrend: {
//     expectedData: [80, 100, 121, 104, 105, 90, 100, 100,180, 160, 151, 106, 145, 150, 130, 100, 180, 160, 151, 106, 145, 150, 130, 10],
//     actualData: [120, 90, 100, 138, 142, 130, 130, 120, 120, 90, 100, 138, 142, 130, 130, 120, 120, 90, 100, 138, 142, 130, 130, 120]
//   }
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
        // changeTrendTab(obj) {
        //     console.log(2222, name)
        //     this.lineChartData = lineChartData[obj.name];
        // },
        // chagePagenationSize(val, type) {
        //     console.log(val, type);
        // },
        // chagePagenationPage(val) {
        //     console.log(val, type);
        // },
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
    .el-row{
        display: flex;
        flex-wrap: wrap;
        margin-left: -12px;
        margin-right: -12px;
        .el-col{
            padding: 8px;
            .card_wrapper{
                height: 100%;
                padding-bottom: 0;
                .msg1{
                    overflow: hidden;
                    .hd_img{
                        width: 41px;
                        height: 41px;
                        border-radius:4px;
                        margin-right: 10px;
                        float: left;
                    }
                    .info_box{
                        float: left;
                        .msg{
                            margin-top: 2px;
                            color:rgba(48,49,51,1);
                            line-height:17px;
                            padding: 8px 17px;
                            background: #F2F6FC;
                            border-radius:4px;
                        }
                    }
                }
                .newest_reptile_record {
                    .icon{
                        width: 52px;
                        height: 52px;
                    }
                    dl{
                        padding-left: 26px;
                        dt{
                            font-size:16px;
                            font-weight:500;
                            color:rgba(48,49,51,1);
                            line-height:24px;
                            padding-bottom: 12px;
                        }
                        dd{
                            font-size:14px;
                            color:rgba(96,98,102,1);
                            line-height:22px;
                            .ge{
                                display: inline-block;
                                width:1px;
                                height:20px;
                                background:rgba(216,216,216,1);
                                margin: 0 40px;
                                vertical-align: middle;
                            }
                        }
                    }
                }
                .active_applys{
                    padding-top: 8px;
                    overflow: hidden;
                    li{
                        float: left;
                        width: 128px;
                        text-align: center;
                        list-style: none;
                        img{
                            width: 46px;
                            height: 46px;
                        }
                    }
                }
            }
        }
    }
}
</style>
