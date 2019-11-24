<template>
    <div class="vedio_qa">
        <div class="questions" v-if="faqList &&faqList.length>0">
            <div class="item" v-for="(item,k) in faqList" :key="k">
                <div class="box">
                    <p class="title">{{item.title}}</p>
                    <div class="answer">
                        <img :src="require('@/assets/images/da.png')" alt="" class="da_img">
                        <span class="text">{{item.showAll ? item.answer : (item.answer||'').slice(0, 30)}}</span>
                        <span v-if="!item.showAll">...</span>
                        <div @click="toggleShowAll(item, k)" :class="['fr', 'toggle', {rotate: !item.showAll}]">
                            <span>{{!item.showAll ? '阅读全文' : '收起'}}</span>
                            <icon name="zhankai" scale="0.8" class="ml5 bottom"></icon>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ_search',
    data() {
        return {
            faqList: []
        }
    },
    beforeCreate() {
        this.$emit('changePage', 1)
    },
    created() {
        this.$emit('header', {
            show: false,
        });
        this.$emit('tabbar', {
            show: false
        });
        this.query();
    },
    mounted() { },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        query() {
            this.faqList = [
                {
                    title: '如何看待老婆把她的保险受益人写成她母亲？',
                    showAll: false,
                    answer: '应该合理的买保险5应该合理的买保险1应该合理应该合理的买保险5应该合理的应该合理的买保险5应该合理的买保险1买保险1的买保险5应该合理的买保险1'
                }, {
                    title: '如何看待老婆把她的保险受益人写成她母亲？',
                    showAll: false,
                    answer: '应该合理的买保险5应该合理的买保险1应该合理应该合理的买保险5应该合理的应该合理的买保险5应该合理的买保险1买保险1的买保险5应该合理的买保险1'
                }
            ]
        },
        toggleShowAll(item, k) {
            let el = Object.assign({}, this.faqList[k], {showAll: !item.showAll});
            console.log(2222, el)
            this.faqList.splice(k, 1, el);
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.vedio_qa{
    .questions .item{
        padding: 0 20px 40px;
        background: #fff;
        margin-bottom: 8px;
        .title{
            font-size:16px;
            font-weight:500;
            color:rgba(24,34,56,1);
            line-height:20px;
        }
        .answer{
            padding-top: 14px;
            font-size:12px;
            line-height:17px;
            .da_img{
                width: 18px;
                vertical-align: middle;
                margin-right: 5px;
            }
            .text{
                vertical-align: middle;
                font-size: 15px;
                line-height:24px;
            }
            .toggle{
                color: #1D77DE;
                transition: transform 0.5s;
                line-height:24px;
                .svg-icon{
                    transform: rotate(180deg);
                }
                &.rotate{
                    .svg-icon{
                        transform: rotate(0deg)
                    }
                }
            }
            
        }
        .box{
            padding-bottom: 25px;
            &:last-child{
                padding-bottom: 0;
            }
        }
    }
}

</style>