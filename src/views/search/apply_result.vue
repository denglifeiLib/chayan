<template>
    <div class="entry_page apply_result_page">
       <div class="textarea">
           <img :src="require('@/assets/images/success.png')" alt="">
           <p class="thks">感谢您的参与</p>
           <p class="des">已收到您的提问<br>我们会尽快补充</p>
       </div>
       <div class="button_round_blue stock button" @click="$router.push('/')">继续使用</div>
    </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'apply_result',
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
    },
    components: {Icon }
}
</script>

<style scoped lang="less">
.apply_result_page{
    min-height: 100vh;
    padding-bottom: 100px;
    .textarea{
        display: block;
        height: calc(100vh - 180px);
        width: 91.4667vw;
        margin: 24px auto 0;
        background: #fff;
        border-radius:16px;
        text-align: center;
        overflow: hidden;
        img{
            width: 134px;
            margin-top: 22.4vw;
        }
        .thks{
            padding: 30px 0 60px;
            font-size:18px;
            font-weight:500;
            color:rgba(24,34,56,1);
            line-height:23px;
        }
        .des{
            font-size:15px;
            color:rgba(156,156,165,1);
            line-height:23px;
        }
    }
    .button{
        position: absolute;
        left: 19.2vw;
        right: 19.2vw;
        bottom: 40px;
    }
}
</style>