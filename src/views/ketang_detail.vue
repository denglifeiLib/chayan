<template>
    <div class="ketang_detail">
        <ul class="items_box">
            <li class="item" v-for="(item,k) in list" :key="k">
                <p class="title">{{item.title}}</p>
                <div class="vedio_box">
                    <icon name="video_play" scale="3.5" class="video_play" slot="icon"></icon>
                </div>
                <div class="mid_ifn">
                    <div class="pro">
                        <span>课程进度</span>
                        <wv-progress :percent="item.pro_class" :show-clear="false"/>
                        <span class="num">{{item.pro_class}}%</span>
                    </div>
                    <div class="pro">
                        <span>练习进度</span>
                        <wv-progress :percent="item.pro_practise" :show-clear="false" class="primary"/>
                        <span class="num">{{item.pro_practise}}%</span>
                    </div>
                </div>
                <wv-flex class="btm_area">
                    <wv-flex-item>
                        <img :src="require('@/assets/images/like.png')" alt="" class="icon">
                        <span class="like">104人喜欢</span>
                    </wv-flex-item>
                    <wv-flex-item>
                        <img :src="require('@/assets/images/lianxi.png')" alt="" class="icon">
                        <span class="blue" @click="$router.push({name: 'ketang_lianxi', query:{}})">练习</span>
                    </wv-flex-item>
                </wv-flex>
            </li>
        </ul>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'ketang_detail',
    data() {
        return {
            process: "50",
            list: [
                {
                    title: '第一节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '234324',
                    pro_class: '10',
                    pro_practise: '90',
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '111',
                    pro_class: '50',
                    pro_practise: '20',
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '656',
                    pro_class: '70',
                    pro_practise: '50',
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '878',
                    pro_class: '90',
                    pro_practise: '40',
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '5467',
                    pro_class: '70',
                    pro_practise: '90',
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '234324',
                    pro_class: '50',
                    pro_practise: '20',
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '234324',
                    pro_class: '50',
                    pro_practise: '10',
                }
            ],
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: this.$route.query.title,
            backAction: ()=>{
                this.$router.push({name: 'ketang_index', query:{}})
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
.ketang_detail{
    .items_box{
        overflow: hidden;
        .item{
            border-top: solid 16px #F9FAFC;
            &:first-child{
                margin-top: -11px;
            }
            .vedio_box{
                position: relative;
                height: 211px;
                background: orange;
                .video_play{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            .title{
                padding: 16px 14px 10px;
                font-size:16px;
                font-weight:600;
                color:rgba(20,20,20,1);
            }
            .mid_ifn{
                display: flex;
                align-items: center;
                justify-content: space-around;
            }
            .btm_area{
                padding: 23px 0;
                text-align: center;
                line-height: 24px;
                img{
                    width: 27px;
                    height: 24px;
                    margin-right: 8px;
                }
                .weui-flex__item{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:first-child{
                        border-right: solid 1px #EBECF1;
                    }
                }
            }
            .pro{
                display: flex;
                width: 100%;
                padding:14px 15px 0px;
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

</style>