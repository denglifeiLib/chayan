<template>
    <div class="my_set_pwd">
        <wv-group class="my_list">
            <wv-input type="password" label="新密码" placeholder="请输入新密码" v-model="newPwd"></wv-input>
            <wv-input type="password" label="重复新密码" placeholder=" 请确认新密码" v-model="seconPwd"></wv-input>
        </wv-group>

        <div class="wrap">
            <wv-button type="primary" class="weui-btn_blue" @click="submit">确定修改</wv-button>
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'my_set_pwd',
    data() {
        return {
            newPwd: '冯思思',
            seconPwd: '范边姝团队'
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '修改密码'
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
.my_set_pwd{
    min-height: 100%;
    height: 100%;
    padding-bottom: 100px;
    background: #f9fafc;
    .my_list{
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
    .wrap{
        margin: 24px 30px;
    }
}

</style>