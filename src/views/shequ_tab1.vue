<template>
    <div class="shequ">
        <div class="tie_item" v-for="(item,k) in hots" :key="k" @click="jump(item)">
            <p class="title">{{item.title}}</p>
            <div class="header_name">
                <img :src="item.header" alt="" class="header">
                <span class="name">{{item.name}}</span>
            </div>
            <p class="text_ellipse" v-if="!item.isVoice"><span>{{item.content}}</span></p>
            <div class="voice_wrap" v-if="item.isVoice">
                <wei_voice :isRead="item.isRead" :audio="item.voice" :clickAble="false"></wei_voice>
            </div>

            <p class="support">{{item.support}} <span class="pl8">赞同</span> </p> 
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import Wei_voice from '@/components/Wei_voice';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ1',
    data() {
        return {
            hots: [
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
                    support: '10K',
                    isVoice: true,
                    isRead: false,
                    voice: require('../assets/hh.mp3')
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
            title: '社区',
            headerClass: 'shequ_search',
            right_callback: ()=> {
                this.$router.push('shequ_search')
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
        jump(item) {
            this.$router.push({
                path: `/shequ_detail`
            })
        }
    },
    components: {Icon, Wei_voice}
}
</script>

<style lang="less">

.shequ{
    .tie_item{
        padding: 18px 20px;
        margin-top: 8px;
        background:rgba(255,255,255,1);
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
        .header_name{
            padding-bottom: 8px;
        }
        .voice_wrap{
            width: 80%;
            padding: 10px 20px 20px 42px;
        }
    }
}


</style>