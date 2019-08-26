<template>
    <div class="shequ_reply_detail">
        <div class="question">
            如何面谈三人或如何面谈三人或多人
            <p class="more" @click="$router.push({name: 'shequ_detail'})">查看其他 300 个回答<icon name="icon_yjt" scale="1.2" class="ml5"></icon></p>
        </div>
        
        <div class="replay_content">
            <div class="header_name">
                <img :src="tie.header" alt="" class="header">
                <span class="name">{{tie.name}}</span>
            </div>
            <p class="content">
                有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要自乱阵脚首要分清主次。有些客户没有主见或拿不定主意，喜欢听朋友的意见，明明很喜欢的产品，身边朋友说不好，就会打消购买的念头，营销员分清最终的购买决策者，推销重点，不要轻易转移面谈对象。当然，也不能冷落客户的访客，礼到即可！
            </p>
        </div>

        <div :class="`bottom_btn ${liked?'liked':''}`" @click="likeToggle">
            <icon :name="liked ? 'sq_icon_dz_s' : 'sq_icon_dz_n'" scale="2"></icon><span class="blue" v-if="liked">+1</span>
            <p class="dis">赞同 123123</p>
        </div>

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
            tie: {
                header: require('@/assets/images/header.jpg'),
                name: '锺嫱嫱',
                title: '如何面谈三人或多人的客户',
                content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                support: '10K'
            },
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '问答详情'
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
.shequ_reply_detail{
    min-height: 100%;
    height: 100%;
    padding-bottom: 100px;
    .question{
        padding: 27px 20px 16px;
        font-size:18px;
        font-weight:600;
        border-bottom: solid 8px #f9fafc;;
        .more{
            padding-top: 16px;
            font-size:14px;
            font-weight:500;
            color:rgba(168,168,168,1);
        }
    }

    .replay_content{
        padding: 17px 20px;
        .header_name{
            padding-bottom: 8px;
        }
        .header{
            width: 40px;
            height: 40px;
        }
        .content{
            font-size:16px;
            color:rgba(51,51,51,1);
        }
    }
    .bottom_btn{
        padding-top: 10px;
        position: fixed;
        bottom: 0;
        left:0;
        right: 0;
        height:67px;
        text-align: center;
        font-size:12px;
        color:rgba(113, 113, 113, 1);
        background:rgba(255,255,255,1);
        box-shadow:0px -1px 0px 0px rgba(235,236,241,1);
        &.liked{
            color:rgba(29,119,222,1);
        }
        .dis{
            padding-top: 8px;
        }
        .svg-icon{
            margin-right: 3px;
            vertical-align: middle;
        }
    }
}

</style>