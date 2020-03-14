<template>
    <div>
        <div class="card_wrapper">
            <h3 class="card_title">昨日微信监控数据</h3>
            <div class="clearfix">
                <div class="card_cont">
                    <el-row>
                        <el-col :xs="8" :sm="8" :md="4">
                            <p>爬虫</p>
                            <div>
                                <img src="../../../assets/images/p_d_1.png" alt=""><div class="num">20</div>
                            </div>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="4">
                            <p class="green">完成</p>
                            <div><img src="../../../assets/images/p_d_2.png" alt=""><div class="num green">200</div></div>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="4">
                            <p>采集</p>
                            <div>
                                <img src="../../../assets/images/p_d_3.png" alt=""><div class="num">2000</div>
                            </div>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="4">
                            <p>下发</p>
                            <div>
                                <img src="../../../assets/images/p_d_4.png" alt=""><div class="num">20000</div>
                            </div>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="4">
                            <p class="orange">告警</p>
                            <div>
                                <img src="../../../assets/images/p_d_5.png" alt=""><div class="num orange">20</div>
                            </div>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="4">
                            <p class="red">错误</p>
                            <div>
                                <img src="../../../assets/images/p_d_5.png" alt=""><div class="num red">20</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <el-row :gutter="16">
            <el-col :sm="24" :md="8">
                <div class="card_wrapper pb0">
                    <h3 class="card_title">5分钟内爬虫监控</h3>
                    <div class="card_cont2">
                        <div class="record_card" v-for="(item,i) in data" :key="i">
                            <h3>
                                {{item.name}}
                                <img src="../../../assets/images/p_d_2.png" alt="" v-if="item.status === '0'" class="fr">
                                <img src="../../../assets/images/p_d_5.png" alt="" v-if="item.status === '1'" class="fr">
                                <img src="../../../assets/images/p_d_6.png" alt="" v-if="item.status === '2'" class="fr">
                            </h3>
                            <div class="dis_info">
                                <span>运行 {{item.catchTime}} 分钟</span>
                                <i class="seperator">|</i>
                                <span>{{item.catchTime}} 分钟前</span>
                                <i class="seperator">|</i>
                                <span>{{item.catchTime}} 条数据</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :sm="24" :md="8">
                <div class="card_wrapper pb0">
                    <h3 class="card_title">爬虫错误监控</h3>
                    <div class="card_cont2">
                        <div class="record_card" v-for="(item,i) in dataError" :key="i">
                            <h3>
                                {{item.name}}
                                <img src="../../../assets/images/p_d_6.png" alt="" v-if="item.status === '1'" class="fr">
                            </h3>
                            <div class="dis_info">
                                <span>运行 {{item.catchTime}} 分钟</span>
                                <i class="seperator">|</i>
                                <span>{{item.catchTime}} 分钟前</span>
                                <i class="seperator">|</i>
                                <span>{{item.catchTime}} 条数据</span>
                            </div>
                            <div class="handlerStatus">
                                <span v-if="item.handlerStatus==='0'" class="red_status">待处理</span>
                                <span v-if="item.handlerStatus==='1'" class="primery_status">处理中</span>
                                <span class="fr" v-if="item.operator">处理人：{{item.operator}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :sm="24" :md="8">
                <div class="card_wrapper pb0">
                    <h3 class="card_title">运行中爬虫监控</h3>
                    <div class="card_cont2">
                        <div class="record_card" v-for="(item,i) in dataRunning" :key="i">
                            <h3>
                                {{item.name}}
                                <img src="../../../assets/images/p_d_5.png" alt="" v-if="item.status === '2'" class="fr">
                            </h3>
                            <div class="dis_info">
                                <span>运行 {{item.catchTime}} 分钟</span>
                                <i class="seperator">|</i>
                                <span>{{item.catchTime}} 分钟前</span>
                                <i class="seperator">|</i>
                                <span>{{item.catchTime}} 条数据</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    name: 'reptile_author',
    data() {
        return {
            data: [
                {
                    name: 'XXXXXXX爬虫',
                    status: '0',
                    catchTime: '1',
                    runTime: '5',
                    dataNum: ' 50000',
                    operator: '研发A'
                }, {
                    name: 'XXXXXXX爬虫',
                    status: '2',
                    catchTime: '1',
                    runTime: '5',
                    dataNum: ' 50000',
                    operator: '研发A'
                }, {
                    name: 'XXXXXXX爬虫',
                    status: '1',
                    catchTime: '1',
                    runTime: '5',
                    dataNum: ' 50000',
                    operator: '研发A'
                }, {
                    name: 'XXXXXXX爬虫',
                    status: '0',
                    catchTime: '1',
                    runTime: '5',
                    dataNum: ' 50000',
                    operator: '研发A'
                }, {
                    name: 'XXXXXXX爬虫',
                    status: '1',
                    catchTime: '1',
                    runTime: '5',
                    dataNum: ' 50000',
                    operator: '研发A'
                }
            ],
            dataError: [
                {
                    name: 'XXXXXXX爬虫',
                    status: '1',
                    catchTime: '1',
                    runTime: '5',
                    dataNum: ' 50000',
                    handlerStatus: '1'
                }, {
                    name: 'XXXXXXX爬虫',
                    status: '1',
                    catchTime: '1',
                    runTime: '5',
                    dataNum: ' 50000',
                    operator: '研发A',
                    handlerStatus: '0'
                }
            ],
            dataRunning: [
                {
                    name: 'XXXXXXX爬虫',
                    status: '2',
                    catchTime: '1',
                    runTime: '5',
                    dataNum: ' 50000',
                    handlerStatus: '0'
                }
            ]
        }
    },
    created(){
        this._query();
    },
    methods: {
        _query() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
            }, 500);
            console.log('发送请求');
        },
    }
}
</script>

<style lang="scss" scoped>
.card_wrapper{
    margin-top: 20px;
    margin-bottom: 0px;
    padding-bottom: 45px;
    &.pb0{
        padding-bottom: 0px;
    }
    .card_cont{
        font-size:14px;
        color:rgba(0,0,0,0.65);
        line-height:32px;
        img{
            display: inline-block;
            vertical-align: middle;
            margin-left: -3px;
        }
        .value{padding-left: 18px;}
        .num{
            display: inline-block;
            font-size:30px;
            color: #303133;
            line-height:38px;
            vertical-align: middle;
            &.green{color: #67C23A;}
            &.orange{color: #E6A23C;}
            &.red{color: #F56C6C;}
        }
    }
    .card_cont2{
        min-height: 434px;
        padding: 0 24px;
        .record_card{
            padding: 12px 0 16px;
            border-bottom: solid 1px #EBEEF5;
            h3{
                padding-bottom: 12px;
                font-size:14px;
                font-weight:500;
                color:rgba(48,49,51,1);
                line-height:24px;
            }
            .dis_info{
                display: flex;
                justify-content: space-between;
                font-size:12px;
                color:rgba(96,98,102,1);
                line-height:22px;
            }
            .handlerStatus{
                padding-top: 7px;
                overflow: hidden;
                line-height:20px;
                margin-bottom: -8px;
                .red_status{
                    display: inline-block;
                    color: #F56C6C;
                    padding: 0 8px;
                    background: #FFF5F5;
                }
                .primery_status{
                    display: inline-block;
                    color: #1989FA;
                    padding: 0 8px;
                    background: #F2F6FCF5;
                }
            }
        }
    }
}
</style>