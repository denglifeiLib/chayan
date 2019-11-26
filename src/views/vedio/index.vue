<template>
    <div class="vedio_index_page">
        <img src="../../assets/images/system-backnew@2x.png" alt="" class="vedio_back" @click="$router.push('/')">
        <div class="vedio_box" v-if="!endPlay">
            <video 
                src="http://192.168.43.46:8000/vvv.webm" 
                controls 
                width="100%" 
                height="211" 
                id="video" 
                ref="video"
                :poster="require('@/assets/images/poster_1.jpg')"
            ></video>
            <img :src="require('@/assets/images/play_btn.jpg')" alt="" class="play_btn" ref="play_btn" @click="playTrigger" v-if="!isPlaying">
        </div>
        <div class="recommend_wrap" v-if="endPlay">
            <p class="type_tt">推荐视频</p>
            <wv-group class="recommend no_border">
                <wv-cell>
                    <div class="poster_box" slot="icon">
                        <img :src="require('@/assets/images/poster_1.jpg')" alt="">
                    </div>
                    <div class="vedio_des vertical_bettwen" slot="bd">
                        <p class="title">{{title}}</p>
                        <div class="flex text">
                            <icon name="px_icon_rs" scale="2"></icon>
                            <span class="watch">{{watch}}</span>
                            <span class="time">时长：{{time}}</span>
                        </div>
                    </div>
                </wv-cell>
            </wv-group>
            <div class="replay" @click="replay">
                <icon name="system-reload" scale="1.5"></icon>
                <span>重播</span>
            </div>
        </div>

        <div class="vedio_des">
            <p class="title">{{title}}</p>
            <div class="flex text">
                <icon name="px_icon_rs" scale="2"></icon>
                <span class="watch">{{watch}}</span>
                <span class="time">时长：{{time}}</span>
            </div>
        </div>

        <div class="content">
            <ul class="home_tabs" v-if="[4].indexOf(activeKey) === -1">
                <li v-for="(item,k) in tabs" :key="k" :class="k==activeKey ? 'active' :''" @click="query(k)">{{item}}</li>
            </ul>

            <router-view @changePage="changePage" @toggleMsgDialog="toggleMsgDialog"/>

        </div>

        <div class="btm" v-if="[4].indexOf(activeKey) === -1">
            <div class="way" @click="likeToggle">
                <icon :name="liked?'details_ft_icon_d_s':'details_ft_icon_d_n'" scale="2" class="icon"></icon>
                <span :class="liked? 'like likeed' : 'like'">{{likedNum}}</span>
            </div>
            <div class="way" @click="$router.push({name: 'vedio_share'})">
                <icon name="details_ft_icon_f" scale="2"></icon>
                <span>{{share}}</span>
            </div>
            <div class="button_round_blue stock" @click="showDalog = true">
                <icon name="wenda_g" scale="2"></icon>
                <span>留言</span>
            </div>
        </div>

        <MyDialog v-if="showDalog">
            <textarea class="dialog_cont" slot="body" value="value" placeholder="输入您的留言…"></textarea>
            <wv-flex class="" :gutter="10" slot="footer">
                <wv-flex-item>
                    <wv-button type="primary" class="weui-btn_grey grey" @click="showDalog = false">取消</wv-button>
                </wv-flex-item>
                <wv-flex-item>
                    <wv-button type="primary" class="weui-btn_blue" @click="submit">提交</wv-button>
                </wv-flex-item>
            </wv-flex>
        </MyDialog>

    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import MyDialog from '@/components/Dialog';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ_search',
    data() {
        return {
            activeKey: 0,
            tabs: ['课程文稿', '相关问答', '留言'],
            title: '自己还年轻，过段时间再买也不迟？',
            time: '12分50秒',
            watch: 230,
            liked: false,
            likedNum: 20,
            share: 258,
            showDalog: false,
            endPlay: false,
            isPlaying: false,
            video: null
        }
    },
    created() {
        this.$emit('header', {
            show: false,
        });
        this.$emit('tabbar', {
            show: false
        });
    },
    mounted() {
        this.initVedio();
        
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        query(k) {
            this.activeKey = k;
            if(k === 0) {
                this.$router.push('article')
            }
            if(k === 1) {
                this.$router.push('qa')
            }
            if(k === 2) {
                this.$router.push('msg')
            }
        },
        changePage(k) {
            this.activeKey = k;
        },
        likeToggle () {
            this.liked = !this.liked;
            this.likedNum = this.liked ? this.likedNum + 1 : this.likedNum - 1;
        },
        toggleMsgDialog(type) {
            this.showDalog = type;
        },
        submit() {
            this.showDalog = false;
        },
        initVedio() {
            this.video = this.$refs.video;
            this.video.addEventListener('pause', (e)=> {
                this.isPlaying = false;
            })
            this.video.addEventListener('play', (e)=> {
                this.isPlaying = true;
            })

            this.video.addEventListener('ended', (e)=> {
                this.isPlaying = false;
                this.endPlay = true;
            })
        },
        replay() {
            this.endPlay = false;
            this.$nextTick(()=> {
                 this.initVedio();
                this.video.load();
                this.video.play();
            })
        },
        playTrigger() {
            this.video.play();
        }
    },
    components: {Icon, MyDialog}
}
</script>

<style lang="less">
.vedio_index_page{
    position: relative;
    padding-bottom: 80px;
    min-height: 100vh;
    .vedio_back{
        position: absolute;
        top: 9px;
        left: 15px;
        width: 28px;
        z-index: 88;
    }
    .vedio_box{
        position: relative;
        .play_btn{
            position: absolute;
            left: 50%;
            top: 50%;
            width: 44px;
            height: 44px;
            margin: -42px 0 0 -22px;
            border-radius: 80px;
        }
        
    }
    .recommend_wrap{
        padding: 48px 20px 15px 14px;
        height: 211px;
        color: #fff;
        background: #000;
        .weui-cells, .weui-cell, .vedio_des {background: #000;}
        .type_tt{
            font-size:12px;
            margin-bottom: 10px;
            color:rgba(156,156,165,1);
        }
        .poster_box{
            width: 34.933vw;
            height: 19.2vw;
            margin-right: 15px;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .vedio_des{
            &.vertical_bettwen{
                padding: 0;
                height: 72px;
                display: flex;
                flex-wrap: wrap;
                align-content: space-between;
            }
            .title{
                color: #fff;
                font-size:14px;
            }
        }
        .replay{
            margin-top: 23px;
            font-size: 14px;
            font-weight: bold;
            span{
                padding-left: 5px;
            }
        }
    }
    .vedio_des{
        padding: 12px 14px 16px;
        margin-bottom: 8px;
        background: #fff;
        .title{
            padding-bottom: 4px;
            font-size:16px;
            font-weight:600;
            color:rgba(20,20,20,1);
            line-height:28px;
        }
        .text{
            font-size:12px;
            color:#A8A8A8;
            line-height:18px;
            *{
                padding-right: 8px;
                vertical-align: middle;
            }
            .watch{
                position: relative;
                margin-right: 8px;
                &:after{
                    position: absolute;
                    content: ' ';
                    width: 1px;
                    height: 8px;
                    right: 0;
                    top: 50%;
                    margin-top: -4px;
                    background: #A8A8A8;
                }
            }
        }
    }

    .content{
        padding-top: 20px;
        background: #fff;
        overflow: hidden;
        .home_tabs{
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
            li{
                margin-right: 0;
            }
        }
    }

    .btm{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height:64px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background:rgba(255,255,255,1);
        font-size: 14px;
        box-shadow:0px -1px 4px 0px rgba(0,0,0,0.2);
        > div{
            height: 38px;
            line-height: 36px;
            *{
                vertical-align: middle;
            }
        }
        .way{
            width: 26.933vw;
             display: flex;
            align-items: center;
            justify-content: center;
            color: #182238;
            border: solid 1px #F2F2F2;
            border-radius: 100px;
            span{
                margin-left: 8px;
            }
            .likeed{
                color: #FF7D36;
            }
        }
    }

    .dialog_cont{
        width:78.4vw;
        height: 45.867vw;
        padding: 15px;
        font-size:18px;
        border-radius:7px;
        border:1px solid rgba(231,231,231,1);
        font-weight:500;
        color:#182238;
        line-height:21px;
        margin-bottom: 24px;
        resize: none;
        outline: none;
        &::placeholder{
            color: #9C9CA5;
        }

    }
    .weui-btn_grey.grey{
        color:#182238;
        font-weight: normal;
    }
}

</style>