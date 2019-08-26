<template>
    <div class="my_set_name">
        <wv-group class="my_list">
            <wv-input label="昵称" placeholder="请输入昵称" v-model="name"></wv-input>
        </wv-group>

        <div class="wrap">
            <wv-button type="primary" class="weui-btn_blue" @click="submit">确定</wv-button>
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'my_set_name',
    data() {
        return {
            name: '冯思思'
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
.my_set_name{
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