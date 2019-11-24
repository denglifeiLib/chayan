<template>
    <div class="vedio_article">
        <div class="category">
            <icon name="icon_lecturer" scale="2.4"></icon>
            <span>主讲大咖</span>
        </div>
        <wv-group class="auth_info no_border">
            <wv-cell class="box">
                <img :src="data.header" alt="" slot="icon">
                <div slot="bd">
                    <p class="name">{{data.name}}</p>
                    <p class="job">{{data.job}}</p>
                    <div class="slogen">{{data.slogen}}</div>
                </div>
            </wv-cell>
        </wv-group>

        <div class="category">
            <icon name="icon_page" scale="2.4"></icon>
            <span>课程文稿</span>
        </div>
        <div class="article_content">
            <h2 class="title">{{data.title}}</h2>
            <p>{{data.content}}</p>
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'article_page',
    data() {
        return {
            data: {

            }
        }
    },
    beforeCreate() {
        this.$emit('changePage', 0)
    },
    created() {
        this.$emit('header', {
            show: false,
            backAction: ()=>{
                this.$router.go('/')
            }
        });
        this.$emit('tabbar', {
            show: false
        });
        this.query();
    },
    mounted() { },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        query() {
            this.data = {
                header: require('@/assets/images/header.jpg'),
                name: '石泽峰',
                job: '太平洋寿险上海分公司主任',
                slogen: '保险，就是要会"玩"，玩出花样，保险也能越做越好。',
                title: '自己还年轻，过段时间再买也不迟？',
                content: '保险早买比晚买好，因为年轻意味着身体好，容易通过核保，而且保费相对较低，恰恰是我们购买保险的最佳时机。购买保险就是一个未雨绸缪和提前规划的行为，年轻人切不可因自己年轻而忽视保险的规划。人们会给汽车上保险，是因为风险并不会识别汽车的老与旧。同样，意外、健康风险也并不会因为我们年轻而选择绕道而行，因此不能等年龄更大了再买保险。所以保险购买越早准备。同时，购买保险，我们需求的并不是一份保险商品，而是一份保险保障方案，因此需要有专业的保险营销顾问为我们做好规划。'
            }
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.vedio_article{
    padding: 0 20px 32px;
    .category{
        padding-bottom: 24px;
        span{
            font-size:14px;
            font-weight:500;
            color:rgba(29,119,222,1);
            vertical-align: middle;
        }
        .svg-icon{
            vertical-align: middle;
            margin-right: 4px;
        }
    }

    .auth_info{
        padding-bottom: 24px;
        margin-bottom: 24px;
        border-bottom: solid 1px #F0F0F0;
        .box{
            align-items: flex-start;
            .name{
                font-size:15px;
                font-weight:500;
                color:rgba(24,34,56,1);
                line-height:21px;
            }
            .job{
                padding: 2px 0 4px;
                font-size:12px;
                color:rgba(156,156,165,1);
                line-height:17px;}
            }
            .slogen{
                position: relative;
                padding: 12px 15px;
                font-size:14px;
                color:rgba(24,34,56,1);
                line-height:20px;
                background:rgba(248,248,248,1);
                &::before{
                    position: absolute;
                    content: ' ';
                    width:0;
                    height: 0;
                    border: solid 5px rgba(248,248,248,1);
                    transform: rotate(45deg);
                    left: -5px;
                    top: 5px;
                }
            }
        img{
            width:50px;
            height:50px;
            border-radius: 50px;
            margin-right: 20px;
        }
    }
    .article_content{
        .title{
            font-size:15px;
        }
        p{
            padding-top: 12px;
            font-size:15px;
            color:rgba(120,124,138,1);
            line-height:26px;
        }
    }
}

</style>