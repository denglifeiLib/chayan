<template>
    <div class="shequ shequ_tab2">
        <div class="tie_item" v-for="(item,k) in shequ_questions" :key="k">
            <p class="title">{{item.title}}</p>
            <p class="support">{{item.response}} <span class="pl8">回答</span> </p> 
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ2',
    data() {
        return {
            shequ_questions: [
                {
                    title: '如何面谈三人或多人的客户',
                    response: '2'
                }, {
                    title: '如何面谈三人或多人的如何面谈三人或多人的客户如何面谈三人或多人的客户如何面谈三人或多人的客户如何面谈三人或多人的客户如何面谈三人或多人的客户如何面谈三人或多人的客户客户',
                    response: '222'
                }, {
                    title: '如何面谈三人或多人如何面谈三人或多人的客户如何面谈三人或多人的客户的客户',
                    response: '42342'
                }
            ]
        }
    },
    created() {
        // this.$emit('header', {
        //     show: true,
        //     title: '社区',
        //     headerClass: 'shequ_search',
        //     right_callback: ()=> {
        //         debugger
        //         this.$router.push('shequ_search')
        //     }
        // });
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        jump(index) {
            this.$router.replace({
                path: `/my/customer/baogao/tab${index+1}`
            })
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.shequ.shequ_tab2 .tie_item{
    padding: 16px 15px;
    .support{
        padding: 0;
    }
    .title{
        padding: 0 0 8px;
    }
}

</style>