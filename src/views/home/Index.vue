<template>
    <div class="home_page">
        <div class="card_wrapper mt25">
            <h3 class="card_title">概述</h3>
            <el-row :gutter="24" class="row_wrap">
                <el-col :span="12">
                    <div class="card">
                        <p class="m_tt">最近直播 <span class="fr" @click="$router.push({name: 'live_list'})">全部直播</span></p>
                        <p class="justify line2" v-for="(item,i) in recentives" :key="i">
                            <span class="fl">{{item.name}}</span>
                            <span class="fr">{{item.time}}</span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="card">
                        <p class="m_tt">回播视频 <span class="fr" @click="$router.push({name: 'live_replay'})">全部视频</span></p>
                        <el-row type="flex" class="live_numbers" justify="center">
                            <el-col :span="6">
                                <p class="type">总数量</p>
                                <p class="number">249,312</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="type">昨天</p>
                                <p class="number">10</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="type">近三天</p>
                                <p class="number">300</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="type">近7天</p>
                                <p class="number">500</p>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="card">
                        <p class="m_tt">近10场直播数据图</p>
                        <div id="echarts" style="width: 100%; height: 600px;"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

import echarts from 'echarts';


function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

export default {
    name: 'home_page',
    data () {
        return {
            echarts: null,
           recentives: [
               {
                   name: '“太”创未来，招募时代先行者',
                   time: '直播中'
               }, {
                   name: '太保营运自助直播',
                   time: '2天前'
               }, {
                   name: '太慧赔',
                   time: '3天前'
               }, {
                   name: '遇见偶然，收获成功',
                   time: '4天前'
               }, {
                   name: '线上沟通，让爱没有距离',
                   time: '5天前'
               }, {
                   name: '金佑典范案例',
                   time: '5天前'
               }
           ]
        };
    },
    created() {
        this._query();
    },
    mounted() {
        this.__resizeHandler = debounce(() => {
            if(this.echarts) {
                this.echarts.resize();
            }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler);

        this.queryEchartData()
    },
    computed: {},
    methods: {

        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                this.list = [
                    {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计血压计血压计血压计血压计血压计血压计血压计',
                        code: 'XYJ-000001（编码）',
                        status: '0', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '1', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '0', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '2', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '1', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }
                ];
            }, 500);
            console.log('发送请求', this.searchForm);
        },

        queryEchartData() {
            
            let option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['直播A', '直播A', '直播A', '直播A', '直播A', '直播A', '直播A'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: [500, 520, 200, 334, 390, 330, 220]
                    }
                ]
            }

            this.echarts = echarts.init(document.getElementById('echarts'));
            this.echarts.setOption(option)
        }

    },
    components: {},
}
</script>
<style lang="scss" scoped>
.home_page{
    .row_wrap{
        padding: 24px;
        > .el-col{
            margin-bottom: 24px;
        }
    }
    .card{
        padding: 0 24px 24px;
        width: 100%;
        border: solid 1px #ccc;
        .m_tt .fr{
            cursor: pointer;
        }
    }
    .live_numbers{
        padding: 55px 0;
        text-align: center;
        .number{
            padding-top: 15px;
            font-size: 20px;
            font-weight: bold;
        }
    }
}
</style>
