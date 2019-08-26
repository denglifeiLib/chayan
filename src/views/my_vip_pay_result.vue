<template>
    <div class="my_vip_pay_result">
        <img :src="require('@/assets/images/md_cg_bg@2x.png')" alt="" class="result_img">
        <div class="reulst_dis">
            <p class="tt">支付成功</p>
            <p class="dis">您的VIP时长 <span class="blue">延长30天</span></p>
        </div>

        <div class="fix_bottom_btn" @click="$router.push({name: 'home_index'})">
            <wv-button type="primary" class="weui-btn_blue" @click="submit">开始使用</wv-button>
        </div>

    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'my_vip_pay_result',
    data() {
        return {
            question: '',
            content: ''
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '会员'
        });
    },
    filterResult () {
      return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        submit () {
            // this.$router.replace({
            //     path: `/zheng_baogao/tab${index+1}`
            // })
            if(!this.question)return;
            alert('tijiao')
        },
    },
    components: {Icon}
}
</script>

<style lang="less">
.my_vip_pay_result{
    .result_img{
        width: 116px;
        height: 126px;
        display: block;
        margin: 70px auto 40px;
    }
    .reulst_dis{
        text-align: center;
        .tt{
            padding-bottom: 16px;
            font-size:20px;
            font-weight:600;
        }
        .dis{
            font-size:16px;
        }
    }
}

</style>