<template>
    <div class="my_statistics_learn">
        <wv-flex class="top_time">
            <wv-flex-item flex="3">
                <div class="data_box" @click="pickDate('startTime')">
                    {{startTime}}
                    <div class="fill_down_arrow"></div>
                </div>
            </wv-flex-item>
            <wv-flex-item flex="1">
                <div class="data_box">至</div>
            </wv-flex-item>
            <wv-flex-item flex="3">
                <div class="data_box" @click="pickDate('endTime')">
                    {{endTime}}
                    <div class="fill_down_arrow"></div>
                </div>
            </wv-flex-item>
        </wv-flex>
        <wv-flex class="total_view card">
            <wv-flex-item>
                <div class="total_view_box">
                    <p class="num">39</p>
                    <p class="dis">观看视频</p>
                </div>
            </wv-flex-item>
            <wv-flex-item>
                <div class="total_view_box">
                    <p class="num">1231</p>
                    <p class="dis">观看视频时长（分钟）</p>
                </div>
            </wv-flex-item>
        </wv-flex>

        <div class="card wrap">
            <p class="card_tt">视频趋势统计</p>
            <x-chart id="vedio_chart" :option="vedioOptions"></x-chart>
        </div>

        <wv-flex class="total_view card">
            <wv-flex-item>
                <div class="total_view_box">
                    <p class="num">20</p>
                    <p class="dis">练习次数</p>
                </div>
            </wv-flex-item>
            <wv-flex-item>
                <div class="total_view_box">
                    <p class="num">80%</p>
                    <p class="dis">练习平均正确率</p>
                </div>
            </wv-flex-item>
        </wv-flex>

        <div class="card wrap">
            <p class="card_tt">练习正确率统计</p>
            <x-chart id="my_statistics_zheng2" :option="option"></x-chart>
        </div>

        <wv-picker
            :visible.sync="showTimePicker"
            :columns="times"
            value-key="time"
            @confirm="confirmTime"
        />
    </div>
</template> 

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import XChart from '@/components/Charts';
import * as Axios from '@/utils/Action';

export default {
    name: 'my_statistics_learn',
    data() {
        return {
            id: 'my_statistics_zheng',
            showTimePicker: false,
            startTime: '2019-08-01',
            endTime: '2020-08-01',
            curTimeKey: '',
            option: {},
            vedioOptions: {},
            times: [
                {
                    values: ['2019','2018','2017'],
                    defaultIndex: 0
                }, {
                    values: ['1','2'],
                    defaultIndex: 0
                }, {
                    values: ['1','2'],
                    defaultIndex: 0
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '学习统计'
        });
        this.setOptions();
        this.setVedioOptions();
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        jump(item) {
            this.$router.push({
                path: `/shequ_reply_detail`
            })
        },
        setOptions() {
            const data = [8, 2, 4, 1]
            const chartConfig = {
                chart: {
                    spacingBottom: 10,
                    spacingLeft: 0,
                    spacingRight: 0,
                },
                xAxis: {
                    lineColor: '#E9E9E9',
                    lineWidth: 1,
                    categories: ['2019-06-16', '2019-06-16', '2019-06-16', '2019-06-16']
                },
                yAxis: {
                    title: null,
                    minPadding: 0,
                    gridLineColor: '#A8A8A8',
                    gridLineDashStyle: 'Dash',
                    labels: {
                        style: {
                            color: '#9dacb6',
                            fontSize: '9px',
                        },
                    },
                },
                legend: {
                    enabled: false,
                },
                credits: {
                    enabled: false,
                },
                title: {
                    text: null,
                },
                plotOptions: {
                    spline: {
                        color: '#1890FF',
                        lineWidth: 2,
                        states: {
                        hover: {
                            lineWidth: 2,
                        },
                        },
                        // lineColor: '#FF6E00',
                        enableMouseTracking: true
                    },
                    series: {
                        marker: {
                        enabled: false,
                        states: {
                            hover: {
                            lineWidth: 1,
                            fillColor: '#fff',
                            lineColor: '#FF6E00',
                            },
                        },
                        },
                    },
                },
                series: [{
                    type: 'spline',
                    data: data,
                }],
            };

            this.option = chartConfig;
        },
        setVedioOptions() {
            const data1 = [18, 0, 0, 30, 5];
            const data2 = [2.5, 0.5, 0, 2, 5];
            const chartConfig = {
                title: {
                    text: null,
                },
                chart: {
                    spacingBottom: 10,
                    spacingLeft: 0,
                    spacingRight: 0,
                },
                xAxis: {
                    labels: {
                        style: {
                            color: '#555555',
                            fontWeight: 'bold'
                        }
                    },
                    lineColor: '#E9E9E9',
                    lineWidth: 1,
                    categories: ['3-16', '6-18', '3-20', '3-22', '3-24']
                },
                yAxis: [
                    {
                        title: null
                    },
                    {
                        title: null,
                        opposite: true,
                        labels: {
                            style: {
                                color: '#555555'
                            },
                            formatter:function(){
                                return this.value + '小时';
                            }
                        }
                    }
                ],
                legend: {
                    enabled: false,
                },
                credits: {
                    enabled: false,
                },
                
                // plotOptions: {
                //     spline: {
                //         color: '#1890FF',
                //         lineWidth: 2,
                //         states: {
                //         hover: {
                //             lineWidth: 2,
                //         },
                //         },
                //         // lineColor: '#FF6E00',
                //         enableMouseTracking: true
                //     },
                //     series: {
                //         marker: {
                //         enabled: false,
                //         states: {
                //             hover: {
                //             lineWidth: 1,
                //             fillColor: '#fff',
                //             lineColor: '#FF6E00',
                //             },
                //         },
                //         },
                //     },
                // },
                series: [{
                    type: 'line',
                    yAxis: 0,
                    data: data1,
                }, {
                    type: 'line',
                    yAxis: 1,
                    data: data2,
                }],
            };

            this.vedioOptions = chartConfig;
        },
        pickDate(type) {
            this.showTimePicker = true;
            this.curTimes = [this.times[type]];
            this.curTimeKey = type;
        },
        confirmTime(picker, val) {
            const pickerVal = picker.getValues().join('-');
            this[this.curTimeKey] = pickerVal;
            this.showTimePicker = false;
        },
    },
    components: {Icon, XChart}
}
</script>

<style lang="less">
.my_statistics_learn{
    min-height: 100%;
    padding-bottom: 8px;
    background: #f9fafc;
    .card{
        margin-top: 8px;
        background: #fff;
    }
    .wrap{
        padding: 20px;
    }
    .card_tt{
        padding-bottom: 10px;
    }
    .top_time,.total_view{
        padding: 15px;
        background: #fff;
    }
    .data_box,.total_view_box{
        text-align: center;
    }
    .total_view{
        .num{
            font-size:24px;
            font-family:DINPro;
            font-weight:500;
        }
        .dis{
            padding-top: 8px;
            font-size:14px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(113,113,113,1);
        }
    }
}

</style>