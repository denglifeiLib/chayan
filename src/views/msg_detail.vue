<template>
    <div class="msg_detail">
        <p class="title">系统通知</p>
        <p class="sub_tt">2019-08-07 12:21:21</p>
        <div class="content">欢迎使用中医云镜系统，您的账号正式开通。VIP免费使用7天。</div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'test',
    data() {
        return {
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '消息详情'
        });
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.msg_detail{
    padding: 24px 20px;
}
.title{
    font-size:24px;
    font-weight:600;
    color:rgba(20,20,20,1);
}
.sub_tt{
    padding: 8px 0 24px;
   font-size:13px;
    color:rgba(168,168,168,1); 
}
.content{
    font-size:15px;
color:rgba(51,51,51,1);
line-height:24px;
}
</style>