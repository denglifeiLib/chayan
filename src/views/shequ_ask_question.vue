<template>
    <div class="shequ_ask_question">
        <div class="top_dis">你的提问非常重要，平台会组织各路大神为您解答</div>

        <wv-group title="" class="form_wrap">
            <wv-input label="" placeholder="输入您的问题" v-model="question" class="question"></wv-input>
            <wv-textarea placeholder="补充说明（选填）" :show-counter="false" :rows="6" v-model="content" class="content"></wv-textarea>
        </wv-group>

        <div class="fix_bottom_btn">
            <wv-button type="primary" class="weui-btn_blue" @click="submit" :disabled="!question">发送</wv-button>
        </div>

    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ_ask_question',
    data() {
        return {
            question: '',
            content: ''
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '提问'
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
.shequ_ask_question{
    min-height: 100%;
    height: 100%;
    padding-bottom: 75px;
    background: #f9fafc;
    .top_dis{
        padding: 11px 20px;
        font-size:13px;
        color:rgba(29,119,222,1);
        background: #EDF5FF;
    }
    .form_wrap .weui-cells{
        margin-top: 0;
        .weui-cell::before{
            left: 0;
            right: 0
        }
        .question{
            height: 73px;
            input{font-size:18px;}
        }
        .content{
            padding-top: 16px;
            padding-bottom: 16px;
        }
    }
}

</style>