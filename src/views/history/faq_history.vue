<template>
    <div class="entry_page faq_history" :style="{backgroundColor: (questionList && questionList.length>0) ? 'transparent' : '#fff'}">
        <div class="questions" v-if="questionList &&questionList.length>0">
            <div class="items" v-for="(item,k) in questionList" :key="k" @click="$router.push({name: 'faq'})">
                <div class="box">
                    <p class="title">{{item.title}}</p>
                    <div class="answer">
                        <icon name="news-comment" scale="1.5"></icon>
                        {{item.answer}}个回复
                        <span class="time">{{item.time}}</span>
                    </div>
                </div>
            </div>
        </div>
        <empty v-else text="暂无提问历史"></empty>
        <MyDialog v-if="showDalog">
            <div class="dialog_cont" slot="body">是否清空全部历史记录</div>
            <wv-flex class="" :gutter="10" slot="footer">
                <wv-flex-item>
                    <wv-button type="primary" class="weui-btn_grey" @click="clear">清空</wv-button>
                </wv-flex-item>
                <wv-flex-item>
                    <wv-button type="primary" class="weui-btn_blue" @click="showDalog = false">取消</wv-button>
                </wv-flex-item>
            </wv-flex>
        </MyDialog>
    </div>
</template>

<script>
import { Dialog } from 'we-vue'
import Icon from 'vue-svg-icon/Icon.vue';
import Empty from '@/components/Empty';
import MyDialog from '@/components/Dialog';
import * as Axios from '@/utils/Action';

export default {
    name: 'faq_history',
    data() {
        return {
            showDalog: false,
            questionList: [
                {
                    title: '想给客户孩子买一份定期30年的重疾险，有性价比高的产品吗？',
                    time: '2019-11-20 9:00',
                    answer: 1
                }, {
                    title: '想给客户孩子买一份定期30年的重疾险，有性价比高的产品吗？',
                    time: '2019-11-20 9:00',
                    answer: 1
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '提问历史',
            headerClass: 'more',
            right: '清空历史',
            right_callback: ($event)=> {
                this.showDalog = true;
            }
        });

    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        clear() {
            this.showDalog = false
            this.questionList = [];
        },
    },
    components: {Icon, Empty, MyDialog}
}
</script>

<style lang="less">

.faq_history{
    min-height: 100vh;
    .items{
        padding:24px 17px;
        margin-bottom: 1px;
        background: #fff;
        .title{
            font-size:14px;
            font-weight:500;
            color:rgba(24,34,56,1);
            line-height:20px;
        }
        .answer{
            padding-top: 14px;
            font-size:12px;
            color:rgba(29,119,222,1);
            line-height:17px;
            .svg-icon{
                vertical-align: middle;
                margin-right: 5px;
            }
            .time{
                float: right;
                color: #9C9CA5;
            }
        }
        .box{
            padding-bottom: 25px;
            &:last-child{
                padding-bottom: 0;
            }
        }
    }
    .empty{
        padding-top: 30vh;
    }
    .dialog_cont{
        width: 63.47vw;
        font-size:18px;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:21px;
        text-align: center;
        padding-bottom: 24px;
    }
    // .dialog_ft{
    //     display: flex;
    //     div{
    //         width:105px;
    //         height:41px;
    //         background:rgba(244,244,244,1);
    //         border-radius:3px;
    //     }

    // }
}


</style>