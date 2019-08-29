<template>
    <div class="my_set_team">
        <wv-group class="my_list no_border">
            <wv-cell title="分公司" :value="company"></wv-cell>
            <wv-cell title="中支" :value="zhi"></wv-cell>
            <wv-cell title="团队" :value="team"></wv-cell>
            <wv-cell title="姓名" :value="name"></wv-cell>
            <wv-cell title="工号" :value="id"></wv-cell>
            <wv-cell title="手机号" :value="phone"></wv-cell>
        </wv-group>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'my_set_team',
    data() {
        return {
            company: '江苏分公司',
            zhi: '苏州中支',
            team: '花花团队',
            name: '王芳',
            id: '1111222233',
            phone: '13822223333'
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '我的团队'
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
.my_set_team{
    min-height: 100%;
    height: 100%;
    padding-bottom: 100px;
    background: #f9fafc;
    .my_list{
        .weui-cells{
            margin-top: 8px;
            background: transparent;
        }
        .weui-cell{
            padding: 18px 20px;
            background: #fff;
            margin-bottom: 1px;
        }
        .weui-cell__ft{
            font-size:16px;
            color: #141414;
        }
        .weui-cell__bd{
            font-size:14px;
            color:#717171;
        }
    }
    .wrap{
        margin: 24px 30px;
    }
}

</style>