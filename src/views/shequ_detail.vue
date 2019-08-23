<template>
    <div class="shequ shequ_detail">
        <div class="tie_item">
            <p class="title">{{tie.title}}</p>
            <p class="content" v-if="!tie.isVoice">
                {{showAll ? tie.content : (tie.content||'').slice(0, 30)}}
                <span v-if="!showAll">...</span>
                <span class="to_show_all fr" v-if="!showAll" @click="toggleShowAll">展开问题描述<icon name="icon_yjt" scale="1.2" class="ml5 bottom"></icon></span>
            </p>
            <p class="to_show_view" v-if="showAll" @click="toggleShowAll">收起问题描述<icon name="icon_yjt" scale="1.2" class="ml5 top"></icon></p>
            <div class="voice_wrap" v-if="tie.isVoice">
                <wei_voice :isRead="tie.isRead" :audio="tie.voice" @longTouch="translateText(tie)"></wei_voice>
            </div>
        </div>
         <div class="go_answer" @click="showChooseWay = true">
            <icon name="sq_icon_hd" scale="2"></icon>
            <span>去回答</span>
        </div>

        <p class="answers_tt">{{answers.length}}个回答</p>
        <div class="tie_item" v-for="(item,k) in answers" :key="k">
            <div class="header_name">
                <img :src="item.header" alt="" class="header">
                <span class="name">{{item.name}}</span>
                <div class="fr" @click="showEdit(item, $event)">
                    <icon name="sq_icon_more" scale="0.5"></icon>
                </div>
            </div>
            <p class="text_ellipse" v-if="!item.isVoice"><span>{{item.content}}</span></p>
            <div class="voice_wrap" v-if="item.isVoice">
                <wei_voice :isRead="item.isRead" :audio="item.voice" @longTouch="translateText(item, k)"></wei_voice>
            </div>
            <div class="translateText" v-if="item.isVoice && item.showText && item.content">
                {{item.content}}
            </div>

            <p class="support">
                {{item.support}}
                <span class="pl pr8">赞同</span>
                <span class="fr">查看详情<icon name="icon_yjt" scale="1.2" class="ml5"></icon></span>
            </p> 
        </div>

        <ul class="edit_pop" v-show="showEditPop">
            <li class="blue" @click="goAskQuestion"><icon name="news-write" scale="2"></icon>编辑问题</li>
            <li class="red" @click="deleteHandler"><icon name="system-delete" scale="2"></icon>删除回答</li>
        </ul>
        
        <!-- 选择回答方式 -->
        <div class="choose_wray_d" v-if="showChooseWay">
            <div class="choose_wray">
                <div class="close" @click="showChooseWay=false">
                    <icon name="system-cancel-bold" scale="1.5"></icon>
                </div>
                <p class="tt blue">选择回答方式</p>
                <ul>
                    <li @click="$router.push({name: 'shequ_reply_question'})">
                        <icon name="hd_icon_tt" scale="1.4" class="way_icon"></icon>文字回答
                    </li>
                    <li>
                        <icon name="hd_icon_yy" scale="1.4" class="way_icon"></icon>语音回答
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'we-vue'
import Icon from 'vue-svg-icon/Icon.vue';
import Wei_voice from '@/components/Wei_voice';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ1',
    data() {
        return {
            showEditPop: false,
            showAll: false,
            tie: {
                header: require('@/assets/images/header.jpg'),
                name: '锺嫱嫱',
                title: '如何面谈三人或多人的客户',
                content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                support: '10K'
            },
            answers: [
                {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    support: '10K',
                    isVoice: true,
                    isRead: false,
                    showText: false,
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    voice: require('../assets/hh.mp3')
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }
            ],
            editItem: {},
            showChooseWay: false,
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '问答详情',
            headerClass: 'more',
            right_callback: ($event)=> {
               this.showEdit(this.tie, $event)
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
        goAskQuestion() {
            this.$router.push({
                path: '/shequ_ask_question'
            })
        },
        showEdit(item,e) {
            if(this.showEditPop) {
                this.hideEdit();
                return;
            }
            this.editItem = item;
            this.showEditPop = true;
            let top = e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height + 20;
            document.querySelector('.edit_pop').style.top = top + 'px'
        },
        hideEdit() {
            this.showEditPop = false;
        },
        deleteHandler() {
            this.hideEdit();
            console.log('delete handler')
        },
        toggleShowAll() {
            this.showAll = !this.showAll;
        },
        translateText(item, i) {
            this.$set(this.answers, i, Object.assign({},item,{
                showText: true
            }))
            console.log(232323, this.answers[i])
        }
    },
    components: {Icon, Wei_voice}
}
</script>

<style lang="less">

.shequ.shequ_detail{
    .tie_item{
        padding: 18px 20px;
        margin-top: 8px;
        background:rgba(255,255,255,1);
        .title{
            font-size:16px;
            padding: 8px 0;
            font-weight:500;
        }
        .support{
            padding-top: 18px;
            font-size:12px;
            font-weight:500;
            color:rgba(168,168,168,1);
        }
        .header_name{
            padding-bottom: 8px;
        }
        .voice_wrap{
            width: 80%;
            padding: 10px 20px 0 42px;
        }
        .translateText{
            padding: 6px 9px 6px 12px;
            margin: 4px 0 0 42px;
            background: #EDF5FF;
            font-size:13px;
            color:rgba(20,20,20,1);
        }
        .ml5{
            margin-left: 5px;
        }
        .to_show_all{
            color: #A8A8A8;
            .bottom{
                margin-top: -3px;
                transform: rotate(90deg);
            }
        }
        .content{
            font-size: 14px;
            color: #717171;
        }
        .to_show_view{
            margin-top: 5px;
            font-size: 14px;
            color: #A8A8A8;
            text-align: right;
            .top{
                transform: rotate(-90deg);
            }
        }
    }
    .go_answer{
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-top: solid 1px #EBECF1;
        .svg-icon{
            margin-right: 5px;
        }
    }
    .answers_tt{
        padding: 16px 20px 4px;
        font-size:14px;
        font-weight:500;
        color:rgba(113,113,113,1);
    }

    .choose_wray_d{
        position: fixed;
        display: flex;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        align-items: center;
        justify-content: center;
        background:rgba(0,0,0,0.5);
        .choose_wray{
            position: relative;
            padding: 25px 14px 32px;
            width: 70%;
            text-align: center;
            border-radius:4px;
            background: #fff;
            .tt{
                padding-bottom: 7px;
                font-size:17px;
                font-weight:500;
            }
            li{
                display: flex;
                margin-top: 7px;
                height:47px;
                font-size:16px;
                border-radius:2px;
                align-items: center;
                justify-content: center;
                border:1px solid rgba(235,236,241,1);
                .way_icon{
                    margin-top: 2px;
                    margin-right: 10px;
                }
            }
            .close{
                position: absolute;
                top:0px;
                right: 0px;
                line-height: 1;
                padding: 10px;
            }
        }
    }
}


</style>