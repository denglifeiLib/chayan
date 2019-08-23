<template>
    <div class="shequ_reply_question">
        <wv-group title="" class="form_wrap">
            <wv-cell  title="如何面谈三人或如何面谈三人或多人" class="question"></wv-cell>
            <wv-textarea placeholder="填写回答内容" :show-counter="false" v-model="content" class="content" max-length="1000"></wv-textarea>
        </wv-group>

        <div class="fix_bottom_btn">
            <wv-button type="primary" class="weui-btn_blue" @click="submit" :disabled="!content">发送</wv-button>
        </div>

    </div>
</template> 

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ_reply_question',
    data() {
        return {
            content: ''
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: ''
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
            //     path: `/my/customer/baogao/tab${index+1}`
            // })
            if(!this.content)return;
            alert('tijiao')
        },
    },
    components: {Icon}
}
</script>

<style lang="less">
.shequ_reply_question{
    min-height: 100%;
    height: 100%;
    padding-bottom: 100px;
    background: #f9fafc;
     .form_wrap{
         height: 100%;
     }
    .form_wrap .weui-cells{
        height: 100%;
        margin-top: 0;
        &::before{
            display: none;
        }
        .question{
            padding: 16px 19px;
        }
        .content{
             height: 100%;
            padding-top: 16px;
            padding-bottom: 16px;
            align-items: top;
            border-top: solid 8px #F9FAFC;
            .weui-cell__bd,textarea{
                height: 100%;
            }
        }
    }
}

</style>