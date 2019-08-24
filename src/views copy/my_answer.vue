<template>
    <div class="my_answer">
        <div class="tie_item" v-for="(item,k) in answers" :key="k" @click="jump(item)">
            <p class="title">{{item.title}}</p>
            <p class="text_ellipse" v-if="!item.isVoice"><span>{{item.content}}</span></p>
            <div class="voice_wrap" v-if="item.isVoice">
                <wei_voice :isRead="true" :audio="item.voice" :clickAble="false"></wei_voice>
            </div>

            <p class="support">{{item.time}} <span class="pl8">{{item.support}}</span> <span>赞同</span> </p> 
        </div>
    </div>
</template> 

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import Wei_voice from '@/components/Wei_voice';
import * as Axios from '@/utils/Action';

export default {
    name: 'my_answer',
    data() {
        return {
            liked: false,
            answers: [
                {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    time: '2019-08-05 15:20',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    time: '2019-08-05 15:20',
                    support: '10K',
                    isVoice: true,
                    isRead: false,
                    voice: require('../assets/hh.mp3')
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    time: '2019-08-05 15:20',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    time: '2019-08-05 15:20',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '我的回答'
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
                path: `/shequ_reply_detail`
            })
        }
    },
    components: {Icon, Wei_voice}
}
</script>

<style lang="less">
.my_answer{
    min-height: 100%;
    padding-bottom: 8px;
    background: #f9fafc;
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