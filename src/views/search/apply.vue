<template>
    <div class="entry_page apply_page">
       <div class="top">请尽可能描述清楚您的问题</div>
       <textarea type="textarea" placeholder="请输入内容" v-model="value"></textarea>
       <div class="button_round_blue stock button" @click="submit">提交</div>
    </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'apply',
    data() {
        return {
            showDalog: false,
            value: ''
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '申请问题答疑'
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
    components: {Icon }
}
</script>

<style scoped lang="less">
.apply_page{
    min-height: 100vh;
    padding-bottom: 100px;
    .top{
        padding-left: 34.133vw;
        width: 91.4667vw;
        height: 16.8vw;
        color: #fff;
        font-size:13px;
        background: url('../../assets/images/apply_topbg.png') top center no-repeat;
        margin: 10px auto 24px;
        background-size: 100%;
        line-height: 16.8vw;
    }
    textarea{
        display: block;
        width: 91.4667vw;
        margin: 0 auto 0;
        border: 0;
        padding: 16px;
        outline: 0;
        font-size:15px;
        height: 234px;
    }
    .button{
        position: absolute;
        left: 19.2vw;
        right: 19.2vw;
        bottom: 40px;
    }
}
</style>