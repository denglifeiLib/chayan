<template>
    <div class="login_page">
        <img :src="require('@/assets/images/login_logo@2x.png')" alt="" class="logo">
        <p class="welcome">欢迎使用云镜</p>
        <p class="name">人工智能面</p>
        <wv-group class="login_form">
            <wv-input label="账号" placeholder="请输入账号" v-model="userName"></wv-input>
            <wv-input label="密码" placeholder="请输入密码" type="password" v-model="password"></wv-input>
            <wv-button type="primary" class="weui-btn_white login_btn" @click="submit">登录</wv-button>
        </wv-group>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'login',
    data() {
        return {
            userName: '',
            password: ''
        }
    },
    created() {
        this.$emit('header', {
            show: false
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
            console.log('submit')
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.login_page{
    padding: 34px 30px;
    height: 100%;
    color: #fff;
    background: url('../assets/images/login_bg@2x.png') top center no-repeat;
    background-size: contain;
    .logo{
        display: block;
        width: 100px;
        height: 71px;
        margin: 0 auto 16px;
    }
    .welcome{
        font-size:24px;
        font-weight:500;
        text-align: center;
    }
    .name{
        padding-top: 4px;
        font-size:16px;
        text-align: center;
        letter-spacing:7px;
    }
    .weui-cells{
        margin-top: 35px;
        background: transparent;
        ::after,::before,&::before{display: none;}
        .weui-cell{
            padding:18px 0;
            border-bottom:  solid 1px #fff;
            ::-webkit-input-placeholder {
                color: rgba(255,255,255,.5);
            }
        }
    }
    .login_btn{
        margin-top: 35px;
        color: #1D77DE;
    }
}

</style>