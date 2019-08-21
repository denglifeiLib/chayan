<template>
    <div class="entry_page">
        <img :src="require('@/assets/images/index_banner.jpg')" alt="" class="banner block">
        <wv-flex>
            <wv-flex-item class="fdf">
                <div class="top_type top_type_1">
                    <p class="type_tt">人工智能面诊<icon name="card_icon-2" scale="1.8" class="model_icon"></icon></p>
                    <p class="type_dis"><icon name="card_icon-2" scale="1.8" class="model_icon"></icon>本周排行 20</p>
                </div>
            </wv-flex-item>
            <wv-flex-item class="fdf">
                <div class="top_type top_type_2" @click="$router.push({name: 'ketang_index'})">
                    <p class="type_tt">人工智能面诊<icon name="card_icon-2" scale="1.8" class="model_icon"></icon></p>
                    <p class="type_dis"><icon name="card_icon-2" scale="1.8" class="model_icon"></icon>完成40%</p>
                </div>
            </wv-flex-item>
        </wv-flex>

        <wv-group class="no_border item_title">
            <wv-cell title="云镜贴吧" value="进入贴吧" is-link to="/">
                <img :src="require('@/assets/images/home_icon_tb@2x.png')" slot="icon" alt="" class="hd_icon">
            </wv-cell>
        </wv-group>

        <div class="tie_item" v-for="(item,k) in ties" :key="k">
            <div class="header_name">
                <img :src="item.header" alt="" class="header">
                <span class="name">{{item.name}}</span>
            </div>
            <p class="title">{{item.title}}</p>
            <p class="text_ellipse">{{item.content}}</p>
            <p class="support">{{item.support}} <span class="pl8">赞同</span> </p> 
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'test',
    data() {
        return {
            text: '222',
            ties: [
                {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '首页',
            back: '0'
        });
        this.$emit('tabbar', {
            show: true,
            active: 0
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
    components: {Icon}
}
</script>

<style lang="less">
.banner{
    margin: 0 auto;
}
.top_type{
    height: 215px;
    margin-top: 8px;
    text-align: center;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &_1{
        color: #fff;
        margin-left: 8px;
        background-image: url('../assets/images/sy_bg_1@2x.png');
    }
    &_2{
        color: #1D77DE;
        margin-right: 8px;
        background-image: url('../assets/images/sy_bg_2@2x.png');
    }
    .type_tt{
        font-size: 16px;
        padding-top: 135px;
        font-weight: bold;
    }
    .type_dis{
        padding-top: 8px;
        font-size: 13px;
    }
}
.item_title{
    margin-bottom: 15px;
}
.item_title .weui-cells{
    .weui-cell_hd{
        padding-right: 8px;
        .hd_icon{
            width: 27px;
        }
    }
    .weui-cell__bd{
        font-size: 18px;
        font-weight: bold;
    }
    .weui-cell__ft{
        font-size: 12px;
    }
}
.tie_item{
    padding: 18px 15px;
    margin: 0 12px 24px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 8px 0px rgba(0,0,0,0.15);
    border-radius:4px;
    background: url('../assets/images/home_bg_tb180@2x.png') bottom center no-repeat;
    background-size: 100% auto;
    .title{
        font-size:16px;
        padding: 8px 0;
        font-weight:500;
    }
    .support{
        padding: 8px 0;
        font-size:12px;
        font-weight:500;
        color:rgba(168,168,168,1);
    }
}
</style>