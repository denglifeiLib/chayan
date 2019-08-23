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

        <wv-flex :gutter="28" class="fenxi_box">
            <wv-flex-item>
                <div class="content">
                    <img :src="require('@/assets/images/header.jpg')" alt="" class="fenxi_img">
                    <p class="des_tt">面部图片分析</p>
                    <div :class="faceResult?'green result':'red result'" v-if="step!==1">
                        <icon :name="faceResult ? 'ok' : 'error'" scale="1.8"></icon>
                        {{faceResult ? '分析成功':'分析失败'}}
                    </div>
                    <div class="blue result" v-if="step===1">
                        <img :src="require('@/assets/images/jc_icon_ing@2x.png')" alt="" class="fenxi_icon">
                        正在分析
                    </div>
                </div>
            </wv-flex-item>
            <wv-flex-item>
                <div class="content">
                    <img :src="require('@/assets/images/header.jpg')" alt="" class="fenxi_img">
                    <p class="des_tt">舌部图片分析</p>
                    <div :class="tongueResult?'green result':'red result'" v-if="step!==1">
                        <icon :name="tongueResult ? 'ok' : 'error'" scale="1.8"></icon>
                        {{tongueResult ? '分析成功':'分析失败'}}
                    </div>
                    <div class="blue result" v-if="step===1">
                        <img :src="require('@/assets/images/jc_icon_ing@2x.png')" alt="" class="fenxi_icon">
                        正在分析
                    </div>
                </div>
            </wv-flex-item>
        </wv-flex>

        <div class="progress" v-if="step===1">
            <div class="val_tip" :style="{left:progress}">{{progress}}</div>
            <div class="track">
                <div class="val" :style="{width:progress}"></div>
            </div>
            <p class="dis">分析进度</p>
        </div>

        <div class="questions" v-if="step!==1">
            <div class="fix_bottom_btn">
                <wv-button type="primary" class="weui-btn_blue ">{{step==='2'?'查看报告':'重新拍摄'}}</wv-button>
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
            step: 3, // 1正在分析, 2分析成功,3分析失败
            faceResult: true,
            tongueResult: false,
            progress: '70%'
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

    .fenxi_box{
        padding: 58px 28px;
        .content{
            text-align: center;
            .fenxi_img{
                width: 100%;
            }
            .des_tt{
                font-size:16px;
                color:rgba(20,20,20,1);
                padding: 20px 0;
            }
            .result{
                display: block;
                margin: 0 10px;
                height:24px;
                line-height: 24px;
                font-size:14px;
                background:rgba(249,250,252,1);
                border-radius:12px;
                color:#09BA30;
                &.red{
                    color:#EA1818;
                }
                &.blue{
                    color:#1D77DE;
                }
                .fenxi_icon{
                    width: 16px;
                }
            }
        }
    }

    .progress{
        position: relative;
        margin: 30px 30px;
        .val_tip{
            position: absolute;
            top:-35px;
            left: 0;
            height: 30px;
            width: 45px;
            margin-left: -23px;
            line-height: 25px;
            text-align: center;
            font-size:14px;
            color:rgba(255,255,255,1);
            background: url('../assets/images/jc_jindu@2x.png') 0 0 no-repeat;
            background-size: 100%;
        }
        .track{
            height:3px;
            background:rgba(235,236,241,1);
        }
        .val{
            height:3px;
            background:rgba(29,119,222,1);
        }
        .dis{
            margin-top: 8px;
            font-size:13px;
            text-align: center;
            color:rgba(168,168,168,1);
        }
    }
}


</style>