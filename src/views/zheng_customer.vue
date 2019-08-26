<template>
    <div class="zheng_customer">
        <div class="top">
            <div class="fake">
                <div class="content">
                    <wv-group>
                        <wv-cell title="新建客户" class="out_cell">
                            <p slot="icon">新建客户</p>
                            <wv-input slot="bd" placeholder="请输入客户姓名" v-model="newName"></wv-input>
                            <wv-button slot="ft" type="primary" :mini="true" class="weui-btn_blue">录入</wv-button>
                        </wv-cell>
                    </wv-group>
                </div>
            </div>
        </div>
         <wv-group :class="`no_border item_title ${sticky?'sticky':''}`">
            <wv-cell>
                <div slot="icon">
                    <icon name="bglb_icon_da" scale="1.8"></icon>
                </div>
                <span class="title_val" slot="bd">客户健康档案</span>
                <div class="search" slot="ft">
                    <icon name="search_icon_small" scale="2"></icon>
                    <input type="text" placeholder="输入客户姓名" v-model="searchName">
                </div>
            </wv-cell>
        </wv-group>
        <!-- <refresh :refresh="false" :loadMore="true"  @loadMoreAction="query" ref="refresh"> -->
            <div class="lists">
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
                <div class="item" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                        <span class="name">姜启</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 5</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 70</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>2019-08-14 13:22:12</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
            </div>
        <!-- </refresh> -->
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';
import Refresh from '@/components/Refresh';

export default {
    name: 'zheng_customer',
    data() {
        return {
            newName: '',
            searchName: '',
            mag_list: [
                {
                    title: '系统通知',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    time: '1小时前'
                }, {
                    noread: true,
                    title: '系统通知',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    time: '1小时前'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    title: '系统通知',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    time: '1小时前'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    title: '系统通知',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    time: '08-12 12:00'
                }
            ],
            sticky: false,
            distance: 0
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '我的客户',
            backAction: ()=>{
                this.$router.push({name: 'home_index', query:{}})
            }
        });
        
    },
    mounted() {
        this.distance = document.querySelector(".item_title").offsetTop - 50;
        window.addEventListener('scroll', this.stickyFn);

        // this.$refs.refresh.init({refresh: false, loadmore: true})
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.stickyFn)
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        query(refreshCallback) {
            setTimeout(()=>{
                console.log('query data');
                refreshCallback && refreshCallback();
            }, 500)
        },
        jump() {
            this.$router.push({
                path: '/zheng'
            })
        },
        stickyFn() {
            let top = document.documentElement.scrollTop;
            if(top>=this.distance) {
                this.sticky = true;
            } else {
                this.sticky = false;
            }
        }
    },
    components: {Icon, Refresh}
}
</script>

<style lang="less">
.zheng_customer{
    min-height: 100%;
    background:rgba(249,250,252,1);
    .top{
        height: 115px;
        margin-bottom: 25px;
        .fake{
            padding: 24px 14px 0;
            height:91px;
            background:rgba(29,119,222,1);
            .content{
                padding: 0 22px;
                height:91px;
                overflow: hidden;
                background:rgba(255,255,255,1);
                box-shadow:0px 4px 16px 0px rgba(29,119,222,0.15);
                border-radius:2px;
                .out_cell{
                    padding: 0px 0 5px;
                    > .weui-cell_hd{
                        font-size:16px;
                        font-weight:500;
                    }
                }
                .weui-cells:before{
                    display: none;
                }
            }
        }
    }
    .item_title{
        height: 57px;
        .weui-cells{
            margin-top: 0;
            height: 57px;
            background: #f9fafc;
        }
        .title_val{
            font-size:16px;
            font-weight:500;
            padding-left: 8px;
        }
        .search{
            padding: 5px 10px;
            background:rgba(255,255,255,1);
            border-radius:2px;
            border:1px solid rgba(235,236,241,1);
            input{
                font-size:14px;
                width: 105px;
                outline: 0;
            }
        }
        &.sticky .weui-cells{
            position: fixed;
            top: 50px;
            left: 0;
            right: 0;
            z-index: 9999;
        }
    }
    .lists{
        overflow: hidden;
        margin: 4px 14px 0;
        .item{
            float: left;
            width: 47.2%;
            margin-bottom: 8px;
            padding: 15px 12px;
            text-align: center;
            background:rgba(255,255,255,1);
            border-radius:4px;
            border:1px solid rgba(235,236,241,1);
            &:nth-child(odd){
                margin-right: 5.6%;
            }
            .header_name{
                padding-bottom: 16px;
                border-bottom: solid 1px #EBECF1;
            }
            .flex_justify{
                padding: 15px 0;
                font-size: 12px;
            }
            .svg-icon{
                margin-right: 3px;
            }
            .time{
                color: #A8A8A8;
                font-size: 12px;
                .svg-icon{
                    margin-top: -1px;
                }
            }
            button{
                margin-top: 20px;
                width: 59.722%;
                font-size: 12px;
            }
        }
    }
}
</style>