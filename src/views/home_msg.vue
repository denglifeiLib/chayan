<template>
 
<div class="entry_page home_msg">
    <refresh @refreshAction="query" @loadMoreAction="query" ref="refresh">
        <wv-group class="msg_item" :refresh="true" :load="false">
            <wv-cell v-for="(msg,k) in mag_list" :key="k" @click="goDetail(msg, k)">
                <img :src="msg.header || require('@/assets/images/icon_msg.png')" slot="icon" class="msg-icon">
                <div slot="bd">
                    <wv-badge style="position: absolute;top:50%;left: 47px;margin-top:-24px;" :is-dot="true" v-if="msg.noread"></wv-badge>
                    <p class="title">{{msg.title}}<span class="fr">{{msg.time}}</span></p>
                    <p class="text_ellipse">{{msg.content}}</p>
                </div>
            </wv-cell>
        </wv-group>
    </refresh>
</div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import Refresh from '@/components/Refresh';
import * as Axios from '@/utils/Action';
import { setTimeout } from 'timers';

export default {
    name: 'test',
    data() {
        return {
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
            title: '消息',
            back: '0',
            right: '<span class="blue bar_right_text">全部已读</span>',
            right_callback: ()=>{
                console.log('click 全部已读')
            }
        });
        this.$emit('tabbar', {
            show: true,
            active: 2
        })
    },
    mounted() {
        this.$refs.refresh.init({refresh: true, loadmore: true})
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
        goDetail(info, id) {
            this.$router.push({
                path: `/msg/${id}`,
                query: info
            });
        }
    },
    components: {Icon, Refresh}
}
</script>

<style lang="less">
.home_msg.entry_page{
    position: fixed;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 54px;
    padding: 0;
}
.msg-icon{
    width: 44px;
    height: 44px;
    margin-right: 14px;
    border-radius: 100%;
}
.msg_item{
    .weui-cells{
        margin-top: 0;
        &::before{
            display: none;
        }
    }
    .weui-cell{
        padding: 20px 15px;
    }
    .title{
        font-size: 16px;
        padding-bottom: 8px;
        font-weight: bold;
        .fr{
            font-size:13px;
            font-weight:400;
            color:rgba(168,168,168,1);
        }
    }
    .text_ellipse{
        padding-right: 12%;
    }
    .weui-badge_dot{
        padding: .5em;
        border: solid 1px #fff;
    }
}
</style>