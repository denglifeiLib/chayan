<template>
    <div class="entry_page">
        <div class="my_page">

            <div class="my_top">
                <div class="my_top_header">
                    <wv-group class="no_border my_head">
                        <wv-cell class="">
                            <img :src="require('@/assets/images/header.jpg')" slot="icon" alt="" class="hd_icon">
                            <div class="" slot="bd">
                                <p class="name">金牌业务员</p>
                                <p class="to_fix">上海分部</p>
                            </div>
                        </wv-cell>
                    </wv-group>
                </div>
                <wv-flex class="data_info">
                    <wv-flex-item>
                        <div class="placeholder">
                            <p class="num">24</p>
                            <p class="type">视频观看</p>
                        </div>
                    </wv-flex-item>
                    <wv-flex-item>
                        <div class="placeholder">
                            <p class="num">42</p>
                            <p class="type">视频转发</p>
                        </div>
                    </wv-flex-item>
                    <wv-flex-item>
                        <div class="placeholder">
                            <p class="num">5</p>
                            <p class="type">提问数量</p>
                        </div>
                    </wv-flex-item>
                </wv-flex>
            </div>

            <div class="my_list">
                <div class="item">
                    <wv-group class="no_border catagory">
                        <wv-cell title="观看历史" is-link value="更多" to="/watch_history">
                            <icon name="my_icon1" scale="2.5" class="my_icon" slot="icon"></icon>
                        </wv-cell>
                    </wv-group>
                    <div class="content">
                        <swiper :options="swiperOptionHistory" class="history" v-if="historyList &&historyList.length>0">
                            <swiper-slide v-for="(item,k) in historyList" :key="k">
                                <router-link :to="'/vedio/article'">
                                    <img :src="item.img" alt="">
                                    <p>{{item.title}}</p>
                                </router-link>
                            </swiper-slide>
                        </swiper>
                        <div style="padding-right:17px;" v-else><empty></empty></div>
                    </div>
                </div>
                <div class="item">
                    <wv-group class="no_border catagory">
                        <wv-cell title="分享历史" is-link value="更多" to="/share_history">
                            <icon name="my_icon2" scale="2.5" class="my_icon" slot="icon"></icon>
                        </wv-cell>
                    </wv-group>
                    <div class="content share">
                        <wv-group class="no_border" v-if="shareList &&shareList.length>0">
                            <wv-cell v-for="(item,k) in shareList" :key="k" @click="$router.push('share_history')">
                                <img :src="item.img" alt="" slot="icon" class="share_img">
                                <div slot="bd" class="vertical_bettwen">
                                    <p class="title">{{item.title}}</p>
                                    <div class="bettwen flex flex_justify">
                                        <div>
                                            <img :src="person.header" alt="" v-for="(person,l) in (item.members.length > 5 ? item.members.slice(0,5) : item.members)" :key="l" class="header_img">
                                            <img src="../assets/images/t_t_more.png" alt="" v-if="item.members.length > 5" class="more">
                                        </div>
                                         <div class="text">{{item.members.length}}人看过</div>
                                    </div>
                                </div>
                            </wv-cell>
                        </wv-group>
                        <empty v-else></empty>
                    </div>
                </div>
                <div class="item">
                    <wv-group class="no_border catagory">
                        <wv-cell title="提问历史" is-link value="更多" to="/faq_history">
                            <icon name="my_icon3" scale="2.5" class="my_icon" slot="icon"></icon>
                        </wv-cell>
                    </wv-group>
                    <div class="content questions">
                        <div v-if="questionList &&questionList.length>0">
                            <div class="box" v-for="(item,k) in questionList" :key="k" @click="$router.push({name: 'faq'})">
                                <p class="title">{{item.title}}</p>
                                <div class="answer">
                                    <icon name="news-comment" scale="1.5"></icon>
                                    {{item.answer}}个回复
                                </div>
                            </div>
                        </div>
                        <empty v-else></empty>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import Empty from '@/components/Empty';
import * as Axios from '@/utils/Action';

export default {
    name: 'test',
    data() {
        return {
            swiperOptionHistory: {
                slidesPerView : 'auto',
                centeredSlides: false,
                autoplay: false,
                spaceBetween: 7,
            },
            historyList: [
                {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做你做保险的最你做保险的最你做保险的最…你做保险的最你做保险的最你做保险的最…你做保险的最你做保险的最你做保险的最…保险的最你做保险的最…',
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的'
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做保险的最你做保险的最…'
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做保险的最你做保险的最…'
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做保险的最你做保险的最…'
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做保险的最你做保险的最…'
                }
            ],
            shareList: [
                {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做',
                    members: [
                        {
                            header: require('@/assets/images/header.jpg')
                        }, {
                            header: require('@/assets/images/header.jpg')
                        }
                    ]
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做保险的最你做保险的最…',
                    members: [
                        {
                            header: require('@/assets/images/header.jpg')
                        }, {
                            header: require('@/assets/images/header.jpg')
                        }, {
                            header: require('@/assets/images/header.jpg')
                        }, {
                            header: require('@/assets/images/header.jpg')
                        }, {
                            header: require('@/assets/images/header.jpg')
                        }, {
                            header: require('@/assets/images/header.jpg')
                        }, {
                            header: require('@/assets/images/header.jpg')
                        }
                    ]
                }
            ],
            questionList: [
                {
                    title: '想给客户孩子买一份定期30年的重疾险，有性价比高的产品吗？',
                    answer: 1
                }, {
                    title: '想给客户孩子买一份定期30年的重疾险，有性价比高的产品吗？',
                    answer: 1
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: false
        });
        this.$emit('tabbar', {
            show: true,
            active: 2
        })
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        }
    },
    components: {Icon, Empty}
}
</script>

<style lang="less">
.my_page {
    .my_top{
        position: relative;
        height: 220px;
        background: url('../assets/images/my_top_bg.png') top center no-repeat;
        background-size: 100%;
        .my_head{
            padding: 36px 32px 24px;
            .weui-cells{
                background: transparent;
            }
            .hd_icon{
                width: 60px;
                height: 60px;
                margin-right: 16px;
                border-radius: 100%;
                box-shadow:0px 2px 11px 0px rgba(0,0,0,0.31);
            }
            .name{
                font-size:18px;
                font-weight:500;
                color:#fff;
                padding-bottom: 5px;
            }
            .godeep{
                width: 5px;
                margin-left: 3px;
                margin-top: -2px;
            }
            .to_fix{
                font-size:12px;
                color:#fff;
            }
        }
        .data_info{
            margin: 0 16px;
            height:79px;
            background:linear-gradient(360deg,rgba(255,255,255,0.94) 0%,rgba(255,255,255,1) 100%);
            box-shadow:0px 2px 9px 0px rgba(0,0,0,0.1);
            border-radius:6px;
            opacity:0.97;
            padding: 20px;
            text-align: center;
            .num{
                font-size:20px;
                font-family:DINPro-Medium,DINPro;
                font-weight:500;
                color:rgba(29,119,222,1);
                line-height:26px;
            }
            .type{
                font-size:12px;
                font-family:PingFangSC-Regular,PingFang SC;
                color:rgba(149,166,187,1);
                line-height:17px;
            }
        }
    }
    .my_list .item{
        margin-bottom: 8px;
        .content{
            padding: 0 0 25px 16px;
            background: #fff;
        }
        .catagory{
            .weui-cell{
                padding: 25px 16px;
            }
            .weui-cell_hd{
                padding-right: 12px;
            }
            .weui-cell__bd{
                font-size:18px;
                font-weight:600;
                color:rgba(24,34,56,1);
                line-height:25px;
            }
            .weui-cell__ft{
                font-size:12px;
                font-weight:400;
                color:rgba(156,156,165,1);
                line-height:17px;
                &:after{
                    border-width: 1px 1px 0 0;
                    margin-top: -5px;
                }
            }
        }
        
        .history {
            .swiper-slide{
                width:107px;
                img{
                    width:107px;
                    height:59px;
                    display: block;
                    margin-bottom: 9px;
                }
                p{
                    font-size:12px;
                    color:rgba(24,34,56,1);
                    line-height:17px;
                    width:107px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
        .share{
            padding-right: 17px;
            .weui-cell{
                padding-bottom: 32px;
                &:last-child{
                    padding-bottom: 0;
                }
            }
            .share_img{
                width:34.933vw;
                height:72px;
                margin-right: 16px;
                padding-right: 0;
            }
            .title{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .bettwen{
                .header_img{
                    width:4.27vw;
                    border-radius: 50%;
                    margin-right: 4px;
                }
                .text{
                    font-size:11px;
                    color:rgba(156,156,165,1);
                    line-height:16px;
                }
                .more{
                    width: 4.27vw;
                }
                flex-grow: 1;
            }
            .vertical_bettwen{
                height: 72px;
                display: flex;
                flex-wrap: wrap;
                align-content: space-between;
                
            }
        }
        .questions{
            padding-right: 17px;
            .title{
                font-size:14px;
                font-weight:500;
                color:rgba(24,34,56,1);
                line-height:20px;
            }
            .answer{
                padding-top: 14px;
                font-size:12px;
                color:rgba(29,119,222,1);
                line-height:17px;
                .svg-icon{
                    vertical-align: middle;
                    margin-right: 5px;
                }
            }
            .box{
                padding-bottom: 25px;
                &:last-child{
                    padding-bottom: 0;
                }
            }
        }
    }
}

</style>