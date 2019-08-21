<template>
    <div class="baogao">
         <wv-group class="no_border customer_title">
            <wv-cell>
                <img :src="require('@/assets/images/header.jpg')" alt="" class="header" slot="icon">
                <span class="title_val" slot="bd">崔朋朋</span>
                <wv-button type="default" slot="ft" class="weui-btn_grey_blue btn" @click="$router.push({path:'/my/customer/baogao_add'})">添加开单</wv-button>
            </wv-cell>
        </wv-group>

        <wv-tabs :line-width="18" sticky @click="jump">
            <wv-tab v-for="(item,k) in tabs" :title="item.val" :key="k">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </wv-tab>
        </wv-tabs>
        <div class="fix_bottom_btn">
            <wv-button type="primary" class="weui-btn_blue ">再次检测</wv-button>
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'baogao',
    data() {
        return {
            tabs: [
                {
                    key: 'baogao',
                    val: '历次检测报告'
                }, {
                    key: 'beizhu',
                    val: '开单备注'
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '客户信息'
        });
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        jump(index) {
            this.$router.replace({
                path: `/my/customer/baogao/tab${index+1}`
            })
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.baogao{
    min-height: 100%;
    padding-bottom: 90px;
    background: #f9fafc;
}
.customer_title{
    .weui-cells{
        margin-top: 0;
        .weui-cell{
            height: 72px;
        }
        .header{
            width: 40px;
            height: 40px;
            border-radius: 100%;
            margin-right: 8px;
        }
        .title_val{
            font-size:18px;
            font-weight:500;
        }
        .btn{
            width: 78px;
            font-size: 12px;
        }
    }
}
</style>