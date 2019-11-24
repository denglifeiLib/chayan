<template>

    <div class="zheng_customer">
        <slot name="header"></slot>
        <v-reload :on-infinite-load="onInfiniteLoad" :parent-pull-up-state="infiniteLoadData.pullUpState">
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
            <div class="lists">
                <div class="item" v-for="(item,k) in list" :key="k" @click="$router.push({name: 'baogao'})">
                    <div class="header_name">
                        <img :src="item.header" alt="" class="header">
                        <span class="name">{{item.name}}</span>
                    </div>
                    <div class="flex flex_justify blue">
                        <div class="flex">
                            <icon name="bglb_icon_jc" scale="1.5"></icon>
                            <span>检测 {{item.check}}</span>
                        </div>
                        <div class="flex">
                            <icon name="bglb_icon_pf" scale="1.5"></icon>
                            <span>评分 {{item.score}}</span>
                        </div>
                    </div>
                    <div class="time">
                        <icon name="bglb_icon_rl" scale="1.5"></icon>
                        <span>{{item.time}}</span>
                    </div>
                    <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">再次检测</wv-button>
                </div>
            </div>
        </v-reload>
    </div>

</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';
import PullUpReload from '@/components/PullUpReload';

export default {
    name: 'zheng_customer',
    data() {
        return {
            newName: '',
            searchName: '',
            list: [],
            sticky: false,
            distance: 0,
            
            infiniteLoadData: {
                pullUpState: 0, // 子组件的pullUpState状态
            }
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
        this.query();
    },
    mounted() {
        this.distance = document.querySelector(".item_title").offsetTop - 50;
        window.addEventListener('scroll', this.stickyFn);

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
        query() {
            setTimeout(()=>{
                console.log('query data');
                this.list = this.list.concat([
                    {
                        header: require('@/assets/images/header.jpg'),
                        name: '姜启',
                        check: 5,
                        score: 70,
                        time: '2019-08-14 13:22:12'
                    }, {
                        header: require('@/assets/images/header.jpg'),
                        name: '姜启',
                        check: 5,
                        score: 70,
                        time: '2019-08-14 13:22:12'
                    }, {
                        header: require('@/assets/images/header.jpg'),
                        name: '姜启',
                        check: 5,
                        score: 70,
                        time: '2019-08-14 13:22:12'
                    }
                ])
            }, 500)
        },
        // 上拉加载
        onInfiniteLoad (done) {
            if (this.infiniteLoadData.pullUpState === 0) {
                this.query()
            }
            done()
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
        },
    },
    components: {Icon, 'v-reload': PullUpReload}
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
            padding:3px 10px;
            background:rgba(255,255,255,1);
            border-radius:2px;
            border:1px solid rgba(235,236,241,1);
            .svg-icon{
                vertical-align: middle;
            }
            input{
                font-size:14px;
                width: 105px;
                height: 28px;
                outline: 0;
                border: 0;
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
                display: inline-block;
                margin: 20px auto 0;
                width: auto;
                font-size: 12px;
            }
        }
    }
}
</style>