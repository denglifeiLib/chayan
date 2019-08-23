<template>
    <div class="my_set">
        <wv-group class="my_list">
            <wv-cell title="头像" :value="name" is-link to="/zheng">
                <img slot="ft" :src="require('../assets/images/header.jpg')" alt="" class="header">
            </wv-cell>
        </wv-group>
        <wv-group class="my_list">
            <wv-cell title="修改昵称" :value="name" is-link to="/my_set_name"></wv-cell>
            <wv-cell title="修改密码" is-link to="/my_set_pwd"></wv-cell>
            <wv-cell title="查看团队" :value="team" is-link to="/my_set_team"></wv-cell>
        </wv-group>

        <div class="fix_bottom_btn">
            <wv-button type="primary" class="weui-btn_white" @click="submit">退出登录</wv-button>
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'my_set',
    data() {
        return {
            name: '冯思思',
            team: '范边姝团队'
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '设置'
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
.my_set{
    min-height: 100%;
    height: 100%;
    padding-bottom: 100px;
    background: #f9fafc;
    .my_list{
        .header{
            width:56px;
            height:56px;
            border-radius: 50%;
        }
        .weui-cells{
            margin-top: 8px;
        }
        .weui-cell{
            padding: 18px 20px;
        }
        .weui-cell__ft{
            font-size:14px;
            color:#717171;
        }
        .weui-cell__bd{
            font-size:16px;
        }
    }
}

</style>