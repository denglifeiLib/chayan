<template>
    <div class="entry_page home_index">
        <div class="home_top">
            <img :src="require('@/assets/images/logo_w.png')" alt="" class="w_logo">
            <wv-group class="home_search">
                <wv-cell @click="$router.push('search')">
                    <icon name="home_serch_b" scale="2" slot="icon"></icon>
                    <wv-input placeholder="输入问题搜索解答" slot="bd"></wv-input>
                </wv-cell>
                
            </wv-group>
        </div>

        <swiper :options="swiperOption" class="banner_wrap">
        　　<swiper-slide>
        　　　　 <div class="banner_box">
                    <img :src="require('@/assets/images/index_banner.jpg')" class="banner block" alt="">
                </div>
        　　</swiper-slide>
            <swiper-slide>
        　　　　 <div class="banner_box">
                    <img :src="require('@/assets/images/index_banner.jpg')" class="banner block" alt="">
                </div>
        　　</swiper-slide>
            <swiper-slide>
        　　　　 <div class="banner_box">
                    <img :src="require('@/assets/images/index_banner.jpg')" class="banner block" alt="">
                </div>
        　　</swiper-slide>
        </swiper>

        <div class="notive">
            <icon name="home_gg" scale="2" class="icon"></icon>
            <swiper :options="swiperOptionNotice">
                <swiper-slide v-for="(item,k) in noticeList" :key="k"><router-link :to="item.link">{{item.title}}</router-link></swiper-slide>
            </swiper>
        </div>

        <ul class="home_tabs">
            <li v-for="(item,k) in tabs" :key="k" :class="k==activeKey ? 'active' :''" @click="query(k)">{{item}}</li>
        </ul>
        <v-reload :on-infinite-load="onInfiniteLoad" :parent-pull-up-state="infiniteLoadData.pullUpState">
            <ul class="items_box">
                <li class="item" v-for="(item,k) in list" :key="k">
                    <div class="poster" @click="$router.push('vedio')">
                        <img :src="item.poster" alt="" class="poster-img">
                        <div class="time">
                            <img src="../assets/images/play_small@2x.png" alt="" style="width:11px;">
                            {{item.time}}
                        </div>
                    </div>
                    <div class="bottom">
                        <p class="title">{{item.title}}</p>
                        <wv-group class="no_border ">
                            <wv-cell>
                                <div class="join" slot="bd">{{item.join}}人已学习</div>
                                <div slot="ft" @click="likeToggle(item, k)">
                                    <icon :name="item.liked?'details_ft_icon_d_s':'details_ft_icon_d_n'" scale="1.3" class="icon"></icon>
                                    <span :class="item.liked? 'like likeed' : 'like'">{{item.like}}</span>
                                </div>
                            </wv-cell>
                        </wv-group>
                    </div>
                </li>
            </ul>
        </v-reload>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import PullUpReload from '@/components/PullUpReload';

import * as Axios from '@/utils/Action';

export default {
    name: 'test',
    data() {
        return {
            swiperOption: {
                slidesPerView : 'auto',
                centeredSlides: true,
                loop: true,
                autoplay: true
            },
            swiperOptionNotice: {
                direction: 'vertical',
                centeredSlides: true,
                loop: true,
                autoplay: true
            },
            noticeList: [
                {
                    title: '双十一大优惠尽在太平洋保险1',
                    link: ''
                }, {
                    title: '双十一大优惠尽在太平洋保险2',
                    link: ''
                }, {
                    title: '双十一大优惠尽在太平洋保险3',
                    link: ''
                }
            ],
            tabs: ['推荐', '保险', '经济', '法律'],
            activeKey: 0,
            list: [],

            infiniteLoadData: {
                pullUpState: 0, // 子组件的pullUpState状态
            }
        }
    },
    created() {
        this.$emit('header', {
            show: false,
        });
        this.$emit('tabbar', {
            show: true,
            active: 0
        });
        this.query();
    },
    mounted() {
        this.$nextTick(()=>{
            this.activeKey = 0;
        })
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        query(k, isFresh) {
            this.activeKey = k;

            setTimeout(()=>{
                const queryData = [
                    {
                        title: '你做保险的最大动力？',
                        join: '234324',
                        like: '105',
                        liked: true,
                        poster: require('@/assets/images/poster_1.jpg'),
                        time: '08.00',
                    }, {
                        title: '你做保险的最大动力？',
                        join: '234324',
                        like: '105',
                        liked: true,
                        poster: require('@/assets/images/poster_1.jpg'),
                        time: '08.00',
                    }, {
                        title: '你做保险的最大动力？',
                        join: '234324',
                        like: '105',
                        liked: true,
                        poster: require('@/assets/images/poster_1.jpg'),
                        time: '08.00',
                    }, {
                        title: '你做保险的最大动力？',
                        join: '234324',
                        like: '105',
                        liked: true,
                        poster: require('@/assets/images/poster_1.jpg'),
                        time: '08.00',
                    }
                ]
                if(isFresh) {
                    this.list = queryData
                } else {
                    this.list = this.list.concat(queryData);
                    console.log(this.list)
                }
            }, 500)
        },
        likeToggle(item, i) {
            this.$set(this.list, i, Object.assign({},item,{
                like: item.liked ? +item.like-1 : +item.like+1,
                liked: !item.liked
            }))
        },

        // 上拉加载
        onInfiniteLoad (done) {
            if (this.infiniteLoadData.pullUpState === 0) {
                this.query(this.activeKey, false);
            }
            done();
        },
    },
    components: {Icon, 'v-reload': PullUpReload}
}
</script>

<style lang="less">
.home_index{
    background: #F2F3F6;

    .home_top{
        width: 100vw;
        padding-top: 14px;
        height: 50.67vw;
        background: url('../assets/images/home_top_bg.png') top center;
        background-size: 100%;
        .w_logo{
            display: block;
            height: 22px;
            margin: 0 auto 18px;
        }
        .home_search {
            margin: 0 18px;
            border-radius: 20px;
            overflow: hidden;
            padding-left: 15px;
            background: #fff;
            box-shadow:0px 3px 10px 0px rgba(33,106,194,0.5);
            input{
                padding-left: 10px;
                height: 35px;
                color: #1D77DE;
                font-size:12px;
                &::placeholder{
                    color: #1D77DE;
                    font-size:12px;
                }
            }
        }
    }

    .banner_wrap {
        margin-top: -16vw;
        .swiper-slide{
            width:91.7%;
            height: 154px;
            &.swiper-slide-active .banner{
                height:145px;
                box-shadow: 0 0 15px #f1f1f1;
            }
        }
        .banner_box{
            padding: 0 8px;
            .banner{
                border-radius: 8px;
                width:100%;
                height:140px;
                transition: height 0.5s;
            }
            
        }
    }
    
    .notive {
        position: relative;
        margin: 10px 24px 25px;
        height:18px;
        padding-left: 30px;
        overflow: hidden;
        .swiper-slide{
            height:18px;
            font-size:13px;
            color:rgba(24,34,56,1);
            line-height:18px;
        }
        .icon{
            position: absolute;
            left: 0;
            top:0;
        }
    }


    .items_box{
        overflow: hidden;
        .item{
            margin-bottom:6px;
            background: #fff;
            .poster{
                position: relative;
                .poster-img{
                    display: block;
                    width: 100%;
                }
                .time{
                    position: absolute;
                    padding: 0 5px;
                    right: 16px;
                    bottom: 8px;
                    height:17px;
                    color:#fff;
                    background:rgba(0,0,0,0.3);
                    border-radius:12px;
                    font-size:12px;
                    line-height:17px;
                }
            }
            .bottom{
                padding: 16px;
                .title{
                    padding-bottom: 8px;
                    font-size:16px;
                    font-weight:600;
                    color:rgba(20,20,20,1);
                }
                .join,.like{
                    font-size:12px;
                    color:rgba(156,156,165,1);
                    line-height:17px;
                    &.likeed{
                        color: #FF7D36;
                    }
                }
            }
        }
    }

    
}
</style>