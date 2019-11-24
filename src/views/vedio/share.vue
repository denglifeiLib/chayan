<template>
    <div class="entry_page share_page">
       <div class="card">
           <img :src="require('@/assets/images/logo_n.png')" alt="" class="logo">
           <img :src="data.poster" alt="" class="poster">
           <p class="text">
               <icon name="px_icon_rs" scale="1.6"></icon>
               <span>{{data.watch}}</span>
               <icon name="wenda_g" scale="1.6"></icon>
               <span>{{data.msg}}</span>
           </p>
           <p class="title">什么是保险受益人？</p>

           <div class="bottom_info">
               <p class="des">您的好友</p>
               <img :src="data.header" alt="" class="header">
               <span class="name">{{data.name}}</span>
               <p class="target">推荐您观看短片</p>
           </div>

           <img :src="require('@/assets/images/header.jpg')" alt="" class="ewm">
       </div>
       <div class="button_round_blue stock button" @click="submit">下载到本地相册</div>
    </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'share',
    data() {
        return {
            data: {
                poster: require('@/assets/images/poster_1.jpg'),
                watch: 20,
                msg: 54,
                header: require('@/assets/images/header.jpg'),
                name: '@业务员',
            }
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '二维码分享'
        });

    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        submit() {
            this.$router.push('apply_result')
        }
    },
    components: {Icon}
}
</script>

<style scoped lang="less">
.share_page{
    min-height: 100vh;
    padding-bottom: 110px;
    background: url('../../assets/images/share_bg.png') center 50px no-repeat;
    background-size: 100% calc(100 - 50px);
    .card{
        position: relative;
        display: block;
        width: 90.4vw;
        height: 126.07vw;
        margin: 2.67vw auto 0;
        padding: 9.067vw;
        background: url('../../assets/images/share_cellbg.png') center no-repeat;
        background-size: 100% 100%;
        .ewm{
            position: absolute;
            bottom: 9.067vw;
            right: 9.067vw;
            width: 21.867vw;
            height: 21.867vw;
        }
        .logo{
            width: 28.267vw;
        }
        .poster{
            display: block;
            margin: 5.33vw auto 18px;
            height: 40.8vw;
        }
        .text{
            padding-bottom: 5.33vw;
            font-size: 12px;
            color: #A8A8A8;
            .svg-icon,span{
                vertical-align: middle;
                margin-right: 4px;
            }
            span{
                padding-right: 20px;
            }
        }
        .des{
            margin-bottom: 2.67vw;
            padding-top: 13.6vw;
            font-size:12px;
            color:rgba(199,231,255,1);
        }
        .header{
            width: 28px;
            height: 28px;
            border-radius: 100%;
            margin-right: 2.67vw;
            vertical-align: middle;
        }
        .name{
            font-size:14px;
            color:rgba(255,255,255,1);
            vertical-align: middle;
        }
        .target{
            font-size:4vw;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:21px;
            padding-top: 11px;
        }
    }
    .button{
        position: absolute;
        left: 19.2vw;
        right: 19.2vw;
        bottom: 40px;
        height: 43px;
        line-height: 43px;
    }
}
</style>