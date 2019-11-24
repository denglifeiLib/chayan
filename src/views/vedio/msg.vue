<template>
    <div class="vedio_msg">
        <div class="item" v-for="(item,k) in list" :key="k">
            <wv-group class="auth_info no_border">
                <wv-cell class="box">
                    <img :src="item.header" alt="" slot="icon">
                    <div slot="bd" class="my_bd">
                        <p class="name">{{item.name}}</p>
                        <p class="question">{{item.question}}</p>
                        <div style="text-align: right">
                            <span class="huifu" @click="responce">回复</span>
                        </div>
                    </div>
                </wv-cell>
            </wv-group>
            <wv-group class="auth_info no_border friend_info">
                <wv-cell class="box"  v-for="(member, i) in item.msgs" :key="i">
                    <img :src="member.header" alt="" slot="icon">
                    <div slot="bd">
                        <p class="name">{{member.name}}</p>
                        <p class="question">{{member.answer}}</p>
                    </div>
                </wv-cell>
            </wv-group>
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
            // showDalog: false,
            value: '',
            list: []
        }
    },
    beforeCreate() {
        this.$emit('changePage', 2)
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
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        query() {
            this.list = [
                {
                    header: require('@/assets/images/header.jpg'),
                    name: '石泽峰',
                    question: '想给客户孩子买一份定期30年的重疾险，有性价比高的产品吗？',
                    msgs: [
                        {
                            header: require('@/assets/images/header.jpg'),
                            name: 'Leland Konopelski',
                            answer: '保险早买比晚买好，因为年轻意味着身体好，容易通过核保，而且保费相对较低，恰恰是我们购买保险的最佳时机。',
                        }, {
                            header: require('@/assets/images/header.jpg'),
                            name: '马奥群',
                            answer: '保险早买比晚买好，因为年轻意味着身体好，容易通过核保，而且保费相对较低，恰恰是我们购买保险的最佳时机。',
                        }
                    ]
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '石泽峰',
                    question: '想给客户孩子买一份定期30年的重疾险，有性价比高的产品吗？',
                    msgs: [
                        {
                            header: require('@/assets/images/header.jpg'),
                            name: 'Leland Konopelski',
                            answer: '保险早买比晚买好，因为年轻意味着身体好，容易通过核保，而且保费相对较低，恰恰是我们购买保险的最佳时机。',
                        }
                    ]
                }
            ]
        },
        responce() {
            this.$emit('toggleMsgDialog', true)
        },
    },
    components: {Icon}
}
</script>

<style lang="less">
.vedio_msg{
    .item{
        border-bottom: solid 1px #F0F0F0;
    }
    .auth_info{
        padding: 12px 14px;
        &.friend_info{
            padding-left: 53px;
            padding-top: 0;
            // padding-bottom: 0;
            .box{
                margin-bottom: 10px;
                border-bottom: solid 1px #F0F0F0;
                &:last-child{
                    border-bottom: 0;
                }
                img{
                    width: 17px;
                    height: 17px;
                }
                .name{
                    color: #80869A;
                }
            }
        }
        .box{
            align-items: flex-start;
            padding-bottom: 10px;
            .my_bd{
                padding-bottom: 10px;
                border-bottom: solid 1px #F0F0F0;
                .huifu{
                    display: inline-block;
                    height:20px;
                    padding: 0 10px;
                    background:rgba(240,247,255,1);
                    border-radius:10px;
                    font-size:11px;
                    font-weight:500;
                    color:rgba(29,119,222,1);
                    line-height:20px;
                }
            }
            .name{
                font-size:14px;
                font-weight:500;
                color:rgba(24,34,56,1);
                line-height:20px;
            }
            .question{
                padding: 2px 0 4px;
                font-size:12px;
                color:#182238;
                line-height: 23px;}
            }
            
        img{
            width:32px;
            height:32px;
            border-radius: 50px;
            margin-right: 8px;
        }
    }

}

</style>