<template>
    <div class="ketang_index">
        <div class="top">
            <img :src="require('@/assets/images/px_bg_top@2x.png')" alt="" class="block">
            <div class="total_view">
                <div class="card">总进度</div>
                <div class="content">
                    <div class="flex">
                        <div class="padding">
                            <p class="percent">{{total_pro_class}}%</p>
                            <p class="dis">已完成课程</p>
                            <div class="pro_box">
                                <wv-progress :percent="total_pro_class" :show-clear="false"/>
                            </div>
                        </div>
                        <div>
                            <p class="percent">{{total_pro_practise}}%</p>
                            <p class="dis">已完成练习</p>
                            <div class="pro_box">
                                <wv-progress class="primary" :percent="total_pro_practise" :show-clear="false"/>
                            </div>
                        </div>
                    </div>
                    <div class="cele_slogen">
                        <icon name="px_icon_gj" scale="2" class="my_icon" slot="icon"></icon>
                        你打败了<span class="num">60%</span>镜友
                    </div>
                </div>
            </div>
        </div>

        <div class="module">
            <p class="module_title">云镜获客课程</p>
            <ul class="items_box">
                <li class="item" v-for="(item,k) in list" :key="k" @click="$router.push({name: 'ketang_detail', query:{title: item.title}})">
                    <div class="vedio_box">
                        <icon name="video_play" scale="3.5" class="video_play" slot="icon"></icon>
                    </div>
                    <p class="title">{{item.title}}</p>
                    <p class="join">{{item.join}} 人参与</p>
                    <div class="pro">
                        <span>课程进度</span>
                        <wv-progress :percent="item.pro_class" :show-clear="false"/>
                        <span class="num">{{item.pro_class}}%</span>
                    </div>
                    <div class="pro">
                        <span>练习进度</span>
                        <wv-progress class="primary" :percent="item.pro_practise" :show-clear="false"/>
                        <span class="num">{{item.pro_practise}}%</span>
                    </div>
                </li>
            </ul>
        </div>
        
         
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'ketang_index',
    data() {
        return {
            total_pro_class: "50",
            total_pro_practise: "70",
            list: [
                {
                    title: '第一章 云镜功用篇',
                    join: '234324',
                    pro_class: '20',
                    pro_practise: '30',
                }, {
                    title: '第二章 云镜触客篇',
                    join: '111',
                    pro_class: '50',
                    pro_practise: '70',
                }, {
                    title: '第三章 云镜检测实战篇',
                    join: '656',
                    pro_class: '70',
                    pro_practise: '45',
                }, {
                    title: '第四章 保险签单篇',
                    join: '878',
                    pro_class: '90',
                    pro_practise: '50',
                }, {
                    title: '第一章 云镜功用篇',
                    join: '5467',
                    pro_class: '70',
                    pro_practise: '50',
                }, {
                    title: '第一章 云镜功用篇',
                    join: '234324',
                    pro_class: '50',
                    pro_practise: '50',
                }, {
                    title: '第一章 云镜功用篇',
                    join: '234324',
                    pro_class: '50',
                    pro_practise: '50',
                }
            ],
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '培训',
            headerClass: 'ketang_index_header',
            backAction: ()=>{
                this.$router.push({name: 'home_index', query:{}})
            }
        });
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        jump(val) {
            this.$router.replace({
                path: `/ketang_lianxi_result`,
                query: {
                    result: val
                }
            })
        },
    },
    components: {Icon}
}
</script>

<style lang="less">
.ketang_index_header{
    background: #F5FAFF!important;
    &+div{
        padding-top: 0;
    }
}
.ketang_index{
    .top{
        position: relative;
        .total_view{
            position: absolute;
            top:75px;
            left: 0;
            .card{
                display: inline-block;
                padding: 0 16px 0 14px;
                height:24px;
                font-size:13px;
                color:#fff;
                text-align: center;
                line-height: 24px;
                background:linear-gradient(270deg,rgba(57,149,255,1) 0%,rgba(97,203,255,1) 100%);
                border-radius:0px 100px 100px 0px;
            }
            .content{
                padding: 25px 20px;
                .padding{
                    padding-right: 33px;
                }
                .percent{
                    padding-bottom: 6px;
                    font-size:18px;
                    font-family:DINPro;
                    font-weight:500;
                    color:rgba(20,20,20,1);
                }
                .dis{
                    padding-bottom: 4px;
                    font-size:12px;
                    color:rgba(168,168,168,1);
                }
                .cele_slogen{
                    font-family:PingFangSC;
                    padding-top: 38px;
                    font-size:16px;
                    font-weight:500;
                    color:rgba(29,119,222,1);
                    .num{
                        padding: 0 5px;
                    }
                }
            }
        }
    }
    .module{
        padding: 39px 0;
        .module_title{
            padding: 0 16px;
            font-size:18px;
            font-family:PingFangSC;
            font-weight:500;
            color:rgba(51,51,51,1);
        }
        .items_box{
            margin: 0 8px 10px;
            overflow: hidden;
            .item{
                float: left;
                height: 200px;
                width: 50%;
                padding: 20px 8px 0;
                .vedio_box{
                    position: relative;
                    height: 92px;
                    border-radius:4px;
                    overflow: hidden;
                    background: orange;
                    .video_play{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
                .title{
                    padding-top: 8px;
                    font-size:14px;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                }
                .join{
                    padding-top: 3px;
                    font-size:11px;
                    color:rgba(168,168,168,1);
                }
                .pro{
                    display: flex;
                    padding-right: 20px;
                    font-size:12px;
                    color:rgba(168,168,168,1);
                    .num{
                        font-size:11px;
                    }
                    .weui-progress{
                        flex: 1;
                        margin: 0 5px 0 10px;
                    }
                }
            }
        }
    }
}

</style>