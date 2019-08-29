<template>
    <div class="my_sheet">
        <div class="top">
            <div class="search">
                <icon name="search_icon_small" scale="2"></icon>
                <input type="text" placeholder="搜索并选择客户" v-model="searchVal">
            </div>
            <div class="filter_btn" @click="showFilter=true">
                <icon name="icon_shaixuan" scale="1.8" class="filter_icon"></icon>
                筛选
            </div>
        </div>

        <div class="lists">
            <div class="item" @click="$router.push({name: 'baogao'})">
                <div class="header_name">
                    <img :src="require('@/assets/images/header.jpg')" alt="" class="header">
                    <span class="name">姜启</span>
                </div>
                <div class="flex flex_justify blue">
                    <div class="flex">
                        <icon name="bglb_icon_kd" scale="1.5"></icon>
                        <span>开单 5</span>
                    </div>
                </div>
                <div class="time">
                    <icon name="bglb_icon_rl" scale="1.2"></icon>
                    <span>2019-08-14 13:22:12</span>
                </div>
                <wv-button type="default" class="weui-btn_grey_blue" @click.stop="jump">添加开单</wv-button>
            </div>
        </div>

        <filter-dialog filterType="sheet" @cancel="showFilter=false" @confirm="filter" v-if="showFilter"></filter-dialog>
    </div>
</template>

<script>

import FilterDialog from '@/components/FilterDialog';
import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'my_sheet',
    data() {
        return {
            searchVal: '',
            showFilter: false,
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
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '开单备注',
            backAction: ()=>{
                this.$router.push({name: 'my', query:{}})
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
        jump() {
            this.$router.push({
                path: '/zheng_baogao_add'
            })
        },
        filter(param) {
            this.showFilter =false;
            console.log(param)
        }
    },
    components: {Icon, FilterDialog}
}
</script>

<style lang="less">
.my_sheet{
    min-height: 100%;
    background:rgba(249,250,252,1);
    .top{
        position: fixed;
        top: 50px;
        left: 0;
        right: 0;
        padding: 8px 14px 0;
        display: flex;
        align-items: center;
        z-index: 100;
        background:rgba(249,250,252,1);
        .search{
            display: flex;
            height:45px;
            padding: 8px 14px;
            background: #fff;
            align-items: center;
            border-radius:2px;
            flex-grow: 1;
            border:1px solid rgba(235,236,241,1);
            input{
                height: 29px;
                margin-left: 8px;
                flex-grow: 1;
                outline: 0;
                font-size: 15px;
                border: 0;
            }
        }
        .filter_btn{
            margin-left: 6px;
            height: 45px;
            width: 73px;
            line-height: 45px;
            flex-grow: 0;
            flex-shrink: 0;
            background: #fff;
            text-align: center;
            border-radius:2px;
            border:1px solid rgba(235,236,241,1);
            .filter_icon{
                margin-top: -2px;
            }
        }
    }
    
    .lists{
        padding-top: 53px;
        overflow: hidden;
        margin: 16px 14px 0;
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
                text-align: left;
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