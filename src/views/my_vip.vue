<template>
    <div class="my_vip">

        <div class="top">
            <div class="content">
                <img :src="require('@/assets/images/hy_bg_top139@2x.png')" alt="">
                <div class="texts">
                    <p class="com">河南分公司·王大雷团队</p>
                    <p class="my_info">您当前会员剩余 1520 天</p>
                </div>
            </div>
        </div>

        <div class="wrap">
            <p class="vip_type">选择续费时长</p>
            <ul class="vip_type_list">
                <li :class="{choosed: choosed === k}" v-for="(type,k) in vipType" :key="k" @click="choosed = k">
                    <p class="tt">{{type.tt}}</p>
                    <p class="money"><span class="unit">¥</span>{{type.money}}</p>
                </li>
            </ul>

            <p class="quanyi_tt"><span>会员权益</span></p>
            <wv-flex :gutter="10">
                <wv-flex-item>
                    <div class="quanyi_list">
                        <icon name="hy_icon_" scale="5.5"></icon>
                        <p class="dis">云镜功能<br>全开放</p>
                    </div>
                </wv-flex-item>
                <wv-flex-item>
                    <div class="quanyi_list">
                        <icon name="hy_icon_1" scale="5.5"></icon>
                        <p class="dis">加入<br>学习团队</p>
                    </div>
                </wv-flex-item>
                <wv-flex-item>
                    <div class="quanyi_list">
                        <icon name="hy_icon_2" scale="5.5"></icon>
                        <p class="dis">学习资料<br>全免费使用</p>
                    </div>
                </wv-flex-item>
            </wv-flex>

            <div class="btn" @click="$router.push({name: 'my_vip_pay_result'})">立即支付¥340</div>
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'test',
    data() {
        return {
            text: '222',
            vipType: [
                {
                    tt: '年卡',
                    money: '340'
                }, {
                    tt: '半年卡',
                    money: '170'
                }, {
                    tt: '季卡',
                    money: '85'
                }, {
                    tt: '月卡',
                    money: '30'
                }
            ],
            choosed: 0,
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '会员',
            type: 'black'
        });
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.my_vip{
    .top{
        padding-bottom: 25px;
        overflow: hidden;
        background: linear-gradient(to top, #fff 42px; rgba(30, 30, 32, 1) 42px; rgba(30, 30, 32, 1) 0);
        .content{
            position: relative;
            width: 76%;
            margin: 17px auto 0;
            .texts{
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                text-align: center;
                transform: translateY(-45%);
                .com{
                    padding-bottom: 4px;
                    font-size:15px;
                    font-weight:400;
                    color:rgba(254,243,213,1);
                }
                .my_info{
                    font-size:18px;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    line-height:25px;
                    text-shadow:0px 1px 4px rgba(127,99,60,0.5);
                }
            }
        }
    }
    .wrap{
        margin: 0 20px;
        .vip_type{
            padding-bottom: 16px;
            font-size:14px;
            color:rgba(20,20,20,1);
        }
        .vip_type_list{
            overflow: hidden;
            li{
                width: calc(50% - 4px);
                margin-right: 0;
                margin-bottom: 8px;
                float: left;
                height:70px;
                background:rgba(255,255,255,1);
                border-radius:2px;
                text-align: center;
                border:1px solid rgba(235,236,241,1);
                &:nth-child(odd){
                    margin-right: 8px;
                }
                .tt{
                    font-size:14px;
                    font-weight:400;
                    padding-top: 10px;
                    color:rgba(20,20,20,1);
                }
                .money{
                    font-size:20px;
                    font-weight:500;
                    color:rgba(189,148,84,1);
                }
                .unit{
                    padding-right: 5px;
                }
                &.choosed{
                    background:rgba(255,251,242,1);
                    border:1px solid rgba(189,148,84,1);
                }
            }
        }
        .quanyi_tt{
            margin: 24px 0 34px;
            text-align: center;
            font-size:14px;
            font-weight:400;
            color:rgba(20,20,20,1);
            height: 10px;
            background: #fff;
            border-bottom: solid 1px rgba(236, 236, 236, 1);
            span{
                display: inline-block;
                padding: 0 20px; 
                 background: #fff;
            }
        }
        .quanyi_list{
            text-align: center;
            .dis{
                padding-top: 12px;
                font-size:13px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(20,20,20,1);
            }
        }
        .btn{
            margin-top: 9px;
            height:47px;
            font-size:18px;
            color:rgba(20,20,20,1);
            text-align: center;
            line-height: 47px;
            background:linear-gradient(90deg,rgba(243,218,153,1) 0%,rgba(230,194,104,1) 100%);
            border-radius:2px;
        }
    }
}

</style>