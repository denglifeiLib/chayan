<template>
    <div class="entry_page faq_page">
        <div class="content">
            <div class="content_box">
                <p class="time">2019年5月25日 下午4:08</p>
                <div class="info_box">
                    <div class="msg">您有任何问题都可以直接发问</div>
                </div>
                <div class="info_box my">
                    <div class="msg">保险的主合同和附加合同可以不是同一个被保险人吗？</div>
                </div>
                <div class="info_box">
                    <div class="msg">附加被保险人，是指在保险合同中不是被保险人的身份，但是附加在某个保险人名下参与保险且享有保险权益。</div>
                </div>
                 <div class="info_box">
                    <div class="msg">您有任何问题都可以直接发问</div>
                </div>
                <div class="info_box my">
                    <div class="msg">保险的主合同和附加合同可以不是同一个被保险人吗？</div>
                </div>
                <div class="info_box">
                    <div class="msg">附加被保险人，是指在保险合同中不是被保险人的身份，但是附加在某个保险人名下参与保险且享有保险权益。</div>
                </div>
                
                <!-- <p class="time">2019年5月25日 下午4:08</p> -->
                <div class="info_box">
                    <div class="msg">
                        <img :src="require('@/assets/images/header.jpg')" class="block" alt="">
                    </div>
                </div>
            </div>
            <wv-group class="input_form">
                <wv-input placeholder="请输入您的问题" v-model="valueText" class="in">
                    <icon slot="ft" name="robot_send" scale="3.2" class="tab_icon"></icon>
                </wv-input>
            </wv-group>
        </div>
    </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'faq',
    data() {
        return {
            valueText: ''
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '',
            back: '0',
            showRobot: true
        });
        this.$emit('tabbar', {
            show: true,
            active: 1
        });
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.faq_page{
    .content{
        position: relative;
        height: 100vh;
        padding: 30px 0 50px;
        overflow: scroll;
        .input_form{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 54px;
            padding: 8px 16px 10px;
            background: #F2F2F2;
            input{
                height:40px;
                padding-right: 14px;
                padding-left: 14px;
                background:rgba(253,253,254,1);
                border-radius:4px;
            }
            .in{
                background: #F2F2F2;
                .svg-icon{
                    margin-left: 10px;
                }
            }
        }
    }
    .content_box{
        // height: calc(100vh - 185px);
        .time{
            padding: 15px 0 8px;
            font-size: 14px;
            color: #A5A5A5;
            text-align: center;
        }
        .info_box{
            display: flex;
            padding: 8px 12px;
            &.my{
                flex-direction: row-reverse;
                .msg{
                    background: #1D77DE;
                    color: #fff;
                    &::before{
                        border-color: #1D77DE;
                        right: -5px;
                        left: initial;
                    }
                }
            }
            .msg{
                position: relative;
                padding: 9px 15px;
                margin: 0 5px;
                background: #fff;
                border-radius: 4px;
                line-height: 22px;
                font-size: 17px;
                color: #191919;
                max-width: calc(100% - 110px);
                &::before{
                    position: absolute;
                    content: ' ';
                    width:0;
                    height: 0;
                    border: solid 5px #fff;
                    transform: rotate(45deg);
                    left: -5px;
                    top: 14px;
                }
            }
        }
    }
}
</style>