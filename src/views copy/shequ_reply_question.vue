<template>
    <div class="shequ_reply_question">
        <wv-group title="" class="form_wrap">
            <wv-cell  title="如何面谈三人或如何面谈三人或多人" class="question"></wv-cell>
        </wv-group>
        <wv-group class="content">
            <wv-textarea placeholder="填写回答内容" :show-counter="false" v-model="content" max-length="1000" v-if="isText"></wv-textarea>
            <wv-cell v-if="!isText">
                <div class="voices_wrap" slot="bd">
                    <div class="cont_wrap">
                        <div class="voice_item"  v-for="(item,k) in answers" :key="k">
                            <wei_voice :isRead="true" :audio="item.voice" @longTouch="translateText(item, k)" :canDelete="true" @deleteHandle="deleteHandle(k)"></wei_voice>
                            <div class="translateText" v-if="item.showText && item.content">
                                {{item.content}}
                            </div>
                        </div>
                    </div>
                    <div class="record_btn">
                        <img :src="require('@/assets/images/sq_icon_ly@2x.png')" alt="" class="record_img">
                        <p class="dis">点击录音</p>
                    </div>
                </div>
            </wv-cell>
        </wv-group>
        


        <div class="fix_bottom_btn">
            <wv-button type="primary" class="weui-btn_blue" @click="submit" :disabled="isText ? !content : answers.length<=0">发送</wv-button>
        </div>

        <div class="record_d">
            <div class="choose_wray">
                <div class="close" @click="cancel">
                    <icon name="system-cancel-bold" scale="1.5"></icon>
                </div>
                <p class="time"></p>
            </div>
        </div>

    </div>
</template> 

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import Wei_voice from '@/components/Wei_voice';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ_reply_question',
    data() {
        return {
            content: '',
            isText: this.$route.query.way === 'text',
            answers: [
                {
                    showText: false,
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    voice: require('../assets/hh.mp3')
                }, {
                    showText: false,
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    voice: require('../assets/hh.mp3')
                }, {
                    showText: false,
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    voice: require('../assets/hh.mp3')
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: ''
        });

        console.log(this.$route)
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
            //     path: `/zheng_baogao/tab${index+1}`
            // })
            if(!this.content)return;
            alert('tijiao')
        },
        translateText(item, i) {
           this.$set(this.answers, i, Object.assign({},item,{
                showText: true
            }))
        },
        deleteHandle(i) {
            this.answers.splice(i, 1)
        }
    },
    components: {Icon, Wei_voice}
}
</script>

<style lang="less">
.shequ_reply_question{
    min-height: 100%;
    height: 100%;
    padding-bottom: 100px;
    background: #f9fafc;
    .form_wrap .weui-cells{
        margin-top: 0;
        &::before{
            display: none;
        }
        .question{
            padding: 16px 19px;
        }
    }
    .content{
        height: calc(100% - 70px);
        // background: #fff;
        border-top: solid 8px #F9FAFC;
        textarea,.weui-cells,.weui-cell,.weui-cell__bd{
            height: 100%;
        }
        .weui-cell__bd{
            overflow: scroll;
        }
        .weui-cells{
            margin-top: 0;
            &::before, &:after{
                display: none;
            }
            .question{
                padding: 16px 19px;
            }
        }
    }

    .voice_item{
        padding: 8px 40px;
        .translateText{
            padding: 6px 9px 6px 12px;
            margin-top: 8px;
            background: #EDF5FF;
            font-size:13px;
            color:rgba(20,20,20,1);
        }
    }
    .cont_wrap{
        height: calc(100%);
        overflow-y: scroll;
    }
    .voices_wrap{
        position: relative;
        height: 100%;
        padding-bottom: 146px;
        .record_btn{
            position: absolute;
            text-align: center;
            bottom: 20px;
            left: 50%;
            margin-left: -53px;
            font-size:14px;
            color:rgba(113,113,113,1);
            img{
                width: 106px;
                height: 106px;
            }
        }
    }

    .record_d{
        position: fixed;
        display: flex;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 550;
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