<template>
    <div class="baogao_tab">
        <div class="chart_wrap">
            <x-chart :id="id" :option="option"></x-chart>
        </div>
        <wv-group class="list">
            <wv-cell title="标题文字" is-link to="/my/customer/baogao_view_1">
                <icon name="khxx_icon_bg" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">评分 80</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/my/customer/baogao_view_1">
                <icon name="khxx_icon_bg" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">评分 80</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/my/customer/baogao_view_1">
                <icon name="khxx_icon_bg" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">评分 80</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/my/customer/baogao_view_1">
                <icon name="khxx_icon_bg" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">评分 80</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/my/customer/baogao_view_1">
                <icon name="khxx_icon_bg" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">评分 80</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/my/customer/baogao_view_1">
                <icon name="khxx_icon_bg" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">评分 80</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
        </wv-group>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';
import XChart from '@/components/Charts';


export default {
    name: 'baogao_tab1',
    data() {
        return {
            id: 'baogao_tab1_chart',
            option: {}
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '客户信息'
        });
        this.setOptions();
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        jump(index, tab) {
            this.$router.push({
                path: `/customer/baogao/tab${index+1}`
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
        }
    },
    components: {Icon, XChart}
}
</script>

<style lang="less">
#baogao_tab1_chart{
    padding: 0 18px 20px;
    height: 220px;
}
.baogao_tab{
    .chart_wrap{
        background: #fff;
    }
    .list{
        border-top:solid 10px #f9fafc;
        .weui-cells{
            margin-top:0;
            .val{
                padding-left: 16px;
                font-size:14px;
                font-weight:500;
                color:rgba(20,20,20,1);
            }
            .weui-cell{
                height: 50px;
                .ft{
                    font-size:13px;
                    font-weight:400;
                    color:rgba(168,168,168,1);
                }
            }
        }
    }
}
</style>