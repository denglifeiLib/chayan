<template>
    <div class="baogao_view">
        <div class="top hide">
             <div class="content">
                 <img :src="require('@/assets/images/jkbg_bg_top@2x.png')" alt="">
            </div>
        </div>

         <div class="top">
             <div class="content">
                 <img :src="require('@/assets/images/jkbg_bg_top@2x.png')" alt="">
                 <div class="main">
                    <div class="flex flex_justify">
                        <wv-group class="no_border out-head">
                            <wv-cell>
                                <icon name="default_header" scale="4.5" class="header" slot="icon"></icon>
                                <span class="title_val" slot="bd">
                                    <p class="name">王可可</p>
                                    <p class="time">2019-07-21</p>
                                </span>
                            </wv-cell>
                        </wv-group>
                        <div class="rate">
                            <wv-circle :line-width="3" :value="12" :diameter="100">评估指数</wv-circle>
                        </div>
                    </div>
                    <div class="btns">
                        <wv-flex :gutter="14">
                            <wv-flex-item>
                                <wv-button type="primary" class="weui-btn_plain-blue" :plain="true" @click="change('baogao')"><icon name="jkbg_icon_dhlb" scale="2" class="btns_icon"></icon>报告导航</wv-button>
                            </wv-flex-item>
                            <wv-flex-item>
                                <wv-button type="primary" class="weui-btn_blue" @click="change('ewm')"><icon name="jkbg_icon_ewm" scale="2" class="btns_icon"></icon>二维码分享</wv-button>
                            </wv-flex-item>
                        </wv-flex>
                    </div>
                 </div>
                 <div class="baogao_nav" v-if="showBaogaoNav">
                    <wv-flex :gutter="10">
                        <wv-flex-item>
                            <div class="list" @click="scrollHandler('baogao_qixu')">
                                <icon name="jcbg_icon_p_5" scale="3.5" class="baogao_card_tt_icon"></icon>
                                <p>疑似气虚症</p>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list" @click="scrollHandler('baogao_face')">
                                <icon name="jcbg_icon_p_1" scale="3.5" class="baogao_card_tt_icon"></icon>
                                <p>面部诊断报告</p>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list" @click="scrollHandler('baogao_tongue')">
                                <icon name="jcbg_icon_p_2" scale="3.5" class="baogao_card_tt_icon"></icon>
                                <p>舌部诊断报告</p>
                            </div>
                        </wv-flex-item>
                    </wv-flex>
                    <wv-flex :gutter="10">
                        <wv-flex-item>
                            <div class="list" @click="scrollHandler('baogao_tiaoli')">
                                <icon name="jcbg_icon_p_3" scale="3.5" class="baogao_card_tt_icon"></icon>
                                <p>食养调理方案</p>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list" @click="scrollHandler('baogao_juyan')">
                                <icon name="jcbg_icon_p_4" scale="3.5" class="baogao_card_tt_icon"></icon>
                                <p>居养调理方案</p>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list" @click="scrollHandler('baogao_shuyan')">
                                <icon name="jcbg_icon_p_copy" scale="3.5" class="baogao_card_tt_icon"></icon>
                                <p>术养调理方案</p>
                            </div>
                        </wv-flex-item>
                    </wv-flex>
                    <wv-flex :gutter="10">
                        <wv-flex-item>
                            <div class="list" @click="scrollHandler('baogao_xinyan')">
                                <icon name="jcbg_icon_p_copy2" scale="3.5" class="baogao_card_tt_icon"></icon>
                                <p>心养调理方案</p>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list" @click="scrollHandler('baogao_dongyan')">
                                <icon name="jcbg_icon_p_copy1" scale="3.5" class="baogao_card_tt_icon"></icon>
                                <p>动养调理方案</p>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item></wv-flex-item>
                    </wv-flex>
                 </div>
             </div>
             <div class="bg"></div>
         </div>
        <div class="baogao_contents" v-if="!showEwm">
            <baogao_qixu ref="baogao_qixu"></baogao_qixu>
            <baogao_face ref="baogao_face"></baogao_face>
            <baogao_tongue ref="baogao_tongue"></baogao_tongue>
            <baogao_tiaoli ref="baogao_tiaoli"></baogao_tiaoli>
            <baogao_juyan ref="baogao_juyan"></baogao_juyan>
            <baogao_shuyan ref="baogao_shuyan"></baogao_shuyan>
            <baogao_xinyan ref="baogao_xinyan"></baogao_xinyan>
            <baogao_dongyan ref="baogao_dongyan"></baogao_dongyan>
        </div>
        <div class="show_ewm" v-if="showEwm">
            <img :src="require('@/assets/images/jkbg_icon_ewm@2x.png')" alt="" class="show_ewm_img">
            <img :src="require('@/assets/images/jkbg_ewm_bg@2x.png')" alt="">
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import Baogao_qixu from '@/components/Baogao_qixu';
import Baogao_face from '@/components/Baogao_face';
import Baogao_tongue from '@/components/Baogao_tongue';
import Baogao_tiaoli from '@/components/Baogao_tiaoli';
import Baogao_juyan from '@/components/Baogao_juyan';
import Baogao_xinyan from '@/components/Baogao_xinyan';
import Baogao_dongyan from '@/components/Baogao_dongyan';
import Baogao_shuyan from '@/components/Baogao_shuyan';
import * as Axios from '@/utils/Action';

export default {
    name: 'baogao_view_1',
    data() {
        return {
           showEwm: false,
           showBaogaoNav: false
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '健康报告',
            type: 'blue'
        });
    },
    mounted() {
        this.initTop = document.querySelector('.baogao_contents').getBoundingClientRect().top;
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        change(type) {
            if(type === 'baogao') {
                this.showEwm = false;
                this.showBaogaoNav = true;
            }
            if(type === 'ewm') {
                this.showEwm = true;
            }
        },
        scrollHandler(ref) {
            this.showBaogaoNav = false;
            
            const top = this.$refs[ref].$el.getBoundingClientRect().top;
            const pageY = document.documentElement.scrollTop || document.body.scrollTop;
            
            document.body.scrollTop = top + pageY - this.initTop;
        }
    },
    components: {Icon, Baogao_qixu, Baogao_face, Baogao_tongue, Baogao_tiaoli, Baogao_juyan, Baogao_xinyan, Baogao_dongyan, Baogao_shuyan}
}
</script>

<style lang="less">
.baogao_view{
    min-height: 100%;
    background: #f9fafc;
        overflow: hidden;
    .top{
        position: fixed;
        top: 50px;
        left: 0;
        right: 0;
        z-index: 5555555;
        &.hide{
            position: relative;
            visibility: hidden;
        }
        .bg{
            position: absolute;
            top:0;
            right: 0;
            left: 0;
            height: 158px;
            background: #1D77DE;
            z-index: 20;
        }
        .content{
            padding: 10px;
            position: relative;
            z-index: 33;
            .main{
                position: absolute;
                padding-top: 25px;
                top: 0;
                right: 29px;
                left: 29px;
                .out-head{
                    .weui-cells{
                        margin-top: 0;
                    }
                }
                .header{
                    width: 52px;
                    height: 52px;
                    margin-right: 12px;
                }
                .name{
                    font-size:20px;
                    font-weight:500;
                    color:rgba(20,20,20,1);
                }
                .time{
                    margin-top: 3px;
                    font-size:13px;
                    font-weight:400;
                    color:rgba(168,168,168,1);
                }
                .btns{
                    padding: 25px 15px;
                    .btns_icon{
                        margin-top: -2px;
                        margin-right: 8px;
                    }
                }
            }
        }
    }
    .show_ewm{
        position: relative;
        margin: 32px auto;
        width: 85.0666667%;
        .show_ewm_img{
            position: absolute;
            width: 56%;
            left: 22%;
            top: 32%;
            z-index: 33;
        }
    }
    .baogao_nav{
        position: absolute;
        left: 10px;
        right:10px;
        margin-top: -10px;
        padding-top: 24px;
        text-align: center;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 7px 0px rgba(29,119,222,0.3);
        .list{
            p{
                padding-top: 8px;
                padding-bottom: 24px;
                font-size:13px;
                color:rgba(20,20,20,1);
            }
        }
    }
}

</style>