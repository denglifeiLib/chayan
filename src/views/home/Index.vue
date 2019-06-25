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

        <div class="data_wrap">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                    <div class="card_wrapper">
                        <h3 class="card_title">
                            最新爬虫运行记录
                            <span class="refresh fr"><i class="el-icon-refresh-right"></i>刷新</span>
                        </h3>
                        <div class="card_cont" style="min-height:136px;">
                            <div class="newest_reptile_record clear">
                                <img src="../../assets/images/p_header.jpg" alt="" class="icon fl">
                                <dl class="fl">
                                    <dt>XXXXXXX爬虫</dt>
                                    <dd>
                                        <span>1 分钟前</span>
                                        <i class="ge"></i>
                                        <span>运行 5 分钟</span>
                                        <i class="ge"></i>
                                        <span>采集 50000 条数据</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <div class="card_wrapper">
                        <h3 class="card_title">
                            最新触发微信事件
                            <span class="refresh fr"><i class="el-icon-refresh-right"></i>刷新</span>
                        </h3>
                        <div class="card_cont" style="min-height:136px;">
                            <div class="msg1">
                                <img src="../../assets/images/p_header.jpg" alt="" class="hd_img">
                                <div class="info_box">
                                    <p class="name">老王<span class="time">1分钟前</span></p>
                                    <div class="msg">好我想跟好我想跟你说你好我想跟你说你好我想跟你说你好我想跟你说你好我想跟你说你我想跟你说你好</div>
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
    </div>
</template>

<script>

import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'


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
           lineChartData: lineChartData.clewTrend
        };
    },
    computed: {},
    methods: {},
    components: {PanelGroup, LineChart},
}
</script>
<style lang="scss">
.analysis-wrapper{
    .trend_contend{
        padding: 24px 32px 36px;
        background: #fff;
    }
    .data_wrap{
        .el-row{
            .el-col{
            margin-top: 32px;
                .card_wrapper{
                    height: 100%;
                    padding-bottom: 0;
                    margin-bottom: 0;
                    .card_cont{padding-bottom: 24px;padding-top: 24px;}
                    .msg1{
                        display: flex;
                        .hd_img{
                            width: 41px;
                            height: 41px;
                            border-radius:4px;
                            margin-right: 10px;
                            flex: 1;
                        }
                        .info_box{
                            flex-grow: 1;
                            flex-shrink: 1;
                            .msg{
                                margin-top: 2px;
                                color:rgba(48,49,51,1);
                                line-height:17px;
                                padding: 8px 17px;
                                background: #F2F6FC;
                                border-radius:4px;
                            }
                            .time{
                                float: right;
                                color:rgba(144,147,153,1);
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
                            width: calc(100% - 78px);
                            dt{
                                font-size:16px;
                                font-weight:500;
                                color:rgba(48,49,51,1);
                                line-height:24px;
                                padding-bottom: 12px;
                            }
                            dd{
                                width: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                font-size:14px;
                                color:rgba(96,98,102,1);
                                line-height:22px;
                                .ge{
                                    display: inline-block;
                                    margin: 0 5px;
                                    width:1px;
                                    height:20px;
                                    background:rgba(216,216,216,1);
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
}
</style>
