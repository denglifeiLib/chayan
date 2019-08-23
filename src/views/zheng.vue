<template>
    <div class="zheng">
        <wv-group class="no_border customer_title">
            <wv-cell>
                <img :src="require('@/assets/images/Bitmap@2x.png')" alt="" class="header" slot="icon">
                <span class="title_val" slot="bd">
                    <p class="name">
                        崔朋朋
                        <span class="jumpBtn" @click="$router.push({name: 'baogao'})">
                            历史诊断报告
                            <icon name="Path" scale="1"></icon>
                        </span>
                    </p>
                    <p class="dis"><span class="pr5">上次诊断</span>2019-07-21</p>
                </span>
            </wv-cell>
        </wv-group>

        <wv-flex class="zheng_step">
            <wv-flex-item>
                <div class="content">
                    <icon name="jc_icon1_s" scale="5"></icon>
                    <p class="blue">面诊</p>
                </div>
            </wv-flex-item>
            <wv-flex-item>
                 <div :class="step >= 2 ? 'blue line':'line'"></div>
            </wv-flex-item>
            <wv-flex-item>
                <icon :name="step >= 2 ? 'jc_icon2_s' :'jc_icon2_n'" scale="5"></icon>
                <p :class="step >= 2 ? 'blue':'grey'">舌诊</p>
            </wv-flex-item>
            <wv-flex-item>
                 <div :class="step >= 3 ? 'blue line':'line'"></div>
            </wv-flex-item>
            <wv-flex-item>
                <icon :name="step >= 3 ? 'jc_icon3_s' :'jc_icon3_n'" scale="5"></icon>
                <p :class="step >= 3 ? 'blue':'grey'">问诊</p>
            </wv-flex-item>
        </wv-flex>

        <div class="camera_box" v-if="step!==3">
            <img :src="require('@/assets/images/jc_ps@2x.png')" alt="" class="camera">
            <p class="dis">点击拍摄舌部照片</p>
        </div>

        <div class="questions" v-if="step===3">
            <wv-checklist align="right" title="请您选择中医辨证最近三个月最符合您的症状（最多4项）" :options="options" v-model="checkedItems"></wv-checklist>
            <div class="fix_bottom_btn" @click="$router.push({name: 'zheng_fenxi'})">
                <wv-button type="primary" class="weui-btn_blue ">提交</wv-button>
            </div>
        </div>

        
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'zheng',
    data() {
        return {
            step: 3, // 1, 2,3
            options: [
                {
                    label: '易乏力、气短、出汗，活动后尤甚；怕冷或流清涕；遇冷出现胸闷痛；某部位冷痛；',
                    value: '1'
                }, {
                    label: '指甲色淡；健忘；失眠；头晕；发干或脱发；肢体麻木',
                    value: '2'
                }, {
                    label: '牙龈肿痛；情志抑郁，焦虑，多愁善感，无缘无故的叹气；痛经，月经失调，或先期或后期；胸胁胀满、窜痛；咽中似有异物梗阻的感觉',
                    value: '3'
                }, {
                    label: '阳痿、早泄；不孕不育；性冷淡',
                    value: '4'
                }
            ],
            checkedItems: ['2']
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '诊断'
        });
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        jump(index) {
            this.$router.replace({
                path: `/zheng_baogao/tab${index+1}`
            })
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.zheng{
    min-height: 100%;
    padding-bottom: 90px;
    
    .customer_title{
        .weui-cells{
            margin-top: 0;
            .weui-cell{
                padding: 21px 25px;
                height: 108px;
            background: url('../assets/images/jc_top_bg@2x.png');
            background-size: 100%;
            color: #fff;
            }
            .header{
                width: 66px;
                height: 66px;
                border-radius: 100%;
                margin-right: 24px;
            }
            .dis{
                font-weight: normal;
                font-size:13px;
            }
            .pr5{padding-right: 5px;}
            .name{
                font-size:18px;
                font-weight:500;
                padding-bottom: 8px;
            }
            .jumpBtn{
                display: inline-block;
                font-size:12px;
                font-weight:500;
                height:23px;
                line-height: 23px;
                background:rgba(47,139,244,1);
                border-radius:2px;
                padding: 0 5px;
                margin-left: 10px;
                margin-top: -1px;
            }
            .btn{
                width: 78px;
                font-size: 12px;
            }
        }
    }

    .zheng_step{
        padding: 20px;
        .weui-flex__item{
            position: relative;
            text-align: center;
            font-size:14px;
            .svg-icon{
                display: block;
                margin: 0 auto;
            }
            p{
                padding-top: 8px;
            }
            .grey{
                color: #717171;
            }
            .blue{
                color: #1D77DE;
            }
            .line{
                height: 2px;
                background: #EBECF1;
                margin: 22px 10px 0;
                &.blue{
                    background: #1D77DE;
                }
            }
        }
    }

    .camera_box{
        padding-top: 12%;
        text-align: center;
        .camera{width: 80px;}
        .dis{
            padding-top: 20px;
            font-size:16px;
            color:rgba(168,168,168,1);
        }
    }

    .questions{
        .weui-cells{
            padding: 0
        }
        .weui-cell,.weui-cells{
            &::before,&::after{
                display: none;
            }
        }
        .weui-cells_checkbox{
            padding: 10px 20px;
            
        }
        .weui-check__label{
            padding-right: 0;
            margin-bottom: 8px;
            background:rgba(249,250,252,1);
            border-radius:2px;
        }
        .weui-cells__title{
            padding: 0 29px;
            font-size:17px;
            font-weight:500;
            color:rgba(20,20,20,1);
        }
    }
}


</style>