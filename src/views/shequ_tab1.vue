<template>
    <div class="shequ">
        <div class="tie_item" v-for="(item,k) in hots" :key="k">
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
            title: '社区'
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
.shequ{
    min-height: 100%;
    padding-bottom: 90px;
    background: #f9fafc;
    .tie_item{
        padding: 18px 15px;
        margin: 0 12px 24px;
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
    }
}

</style>