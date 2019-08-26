<template>
    <div class="my_question">
        <div class="question" v-for="(item,k) in questions" :key="k">
            {{item.title}}
            <p class="more" @click="$router.push({name: 'shequ_detail'})">
                {{item.time}}
                <span class="ml5">{{item.answers}}</span>
            </p>
        </div>

        <img :src="require('@/assets/images/sq_btn_tw@2x.png')" alt="" class="fixed_qa" @click="$router.push({path: '/shequ_ask_question'})">
    </div>
</template> 

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ_reply_detail',
    data() {
        return {
            liked: false,
            questions: [
                {
                    title: '如何面谈三人或多人的客户',
                    time: '2019-08-05 15:20',
                    answers: '56'
                },{
                    title: '如何面谈三人或多人的客户',
                    time: '2019-08-05 15:20',
                    answers: '56'
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '我的提问'
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
        likeToggle() {
            this.liked = !this.liked;
        },
    },
    components: {Icon}
}
</script>

<style lang="less">
.my_question{
    min-height: 100%;
    height: 100%;
    padding-bottom: 75px;
    background: #f9fafc;
    .question{
        margin-bottom: 8px;
        padding: 27px 20px 16px;
        font-size:18px;
        font-weight:600;
        background: #fff;
        border-top: solid 1px #f9fafc;
        .more{
            padding-top: 16px;
            font-size:14px;
            font-weight:500;
            color:rgba(168,168,168,1);
        }
    }
}

</style>