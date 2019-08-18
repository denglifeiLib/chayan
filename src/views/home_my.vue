<template>
    <div class="entry_page">
        <div class="my_page">

            <div class="my_top">
                <img :src="require('@/assets/images/my_bg_top@2x.png')" alt="" class="block" style="margin-top:-20px">
                <wv-group class="no_border my_head">
                    <wv-cell class="">
                        <img :src="require('@/assets/images/header.jpg')" slot="icon" alt="" class="hd_icon">
                        <div class="" slot="bd">
                            <p class="name">冯思思</p>
                            <p class="to_fix">修改个人资料<img :src="require('@/assets/images/right_small.png')" class="godeep"></p>
                        </div>
                    </wv-cell>
                </wv-group>
                <div class="vip_info">
                    剩余20天
                    <img :src="require('@/assets/images/my_hy_btn_ck@2x.png')" alt="" class="fr view" >
                </div>
            </div>

            <wv-group class="no_border my_list">
                <wv-cell title="我的客户" is-link to="/my/customer">
                    <icon name="wd_icon1" scale="2.5" class="my_icon" slot="icon"></icon>
                </wv-cell>
                <wv-cell title="开单备注" is-link to="/">
                    <icon name="wd_icon2" scale="2.5" class="my_icon" slot="icon"></icon>
                </wv-cell>
                <wv-cell title="我的提问" is-link to="/">
                    <icon name="wd_icon3" scale="2.5" class="my_icon" slot="icon"></icon>
                </wv-cell>
                <wv-cell title="我的回答" is-link to="/">
                    <icon name="wd_icon4" scale="2.5" class="my_icon" slot="icon"></icon>
                </wv-cell>
                <wv-cell title="检测统计" is-link to="/">
                    <icon name="wd_icon5" scale="2.5" class="my_icon" slot="icon"></icon>
                </wv-cell>
                <wv-cell title="学习统计" is-link to="/">
                    <icon name="wd_icon6" scale="2.5" class="my_icon" slot="icon"></icon>
                </wv-cell>
            </wv-group>
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
            show: false
        });
        this.$emit('tabbar', {
            show: true,
            active: 3
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
.my_top{
    position: relative;
    .my_head{
        position: absolute;
        left: 0;
        right:0;
        top: 15%;
        .weui-cells{
            background: transparent;
        }
        .hd_icon{
            width: 60px;
            height: 60px;
            margin-right: 16px;
            border-radius: 100%;
        }
        .name{
            font-size:18px;
            font-weight:500;
            color:rgba(20,20,20,1);
            padding-bottom: 5px;
        }
        .godeep{
            width: 5px;
            margin-left: 3px;
            margin-top: -2px;
        }
        .to_fix{
            font-size:12px;
            color:rgba(113,113,113,1);
        }
    }
    .vip_info{
        position: absolute;
        left: 21.066666%;
        right:8.2666%;
        bottom: 6.5%;
        font-size:14px;
        font-weight:500;
        color:rgba(212,187,153,1);
        .view{
            height: 23px;
        }
    }
}
.my_list{
    padding-bottom: 20px;
    .weui-cell{
        padding: 21px 20px;
    }
    .weui-cell_hd{
        padding-right: 12px;
    }
    .weui-cell__bd{
        font-size:15px;
        font-weight:500;
        color:rgba(20,20,20,1);
    }
}
</style>