<template>
    <div class="vedio_index_page">
        <div class="vedio_box">
            <!-- <video-player  class="video-player vjs-custom-skin"
                ref="videoPlayer" 
                :playsinline="true" 
                :options="playerOptions" 
            /> -->
            <video src="http://192.168.43.46:8000/vvv.webm"  controls width="100%" height="211" id="video" :poster="require('@/assets/images/poster_1.jpg')"></video>
            <img src="../../assets/images/system-backnew@2x.png" alt="" class="vedio_back" @click="$router.push('/')">
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
            playerOptions: { ///---------https://docs.videojs.com/tutorial-options#height 文档地址
                // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                // autoplay: false, //如果true,浏览器准备好时开始回放。
                // muted: false, // 默认情况下将会消除任何音频。
                // loop: false, // 导致视频一结束就重新开始。
                // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                // language: 'zh-CN',
                // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                // sources: [{
                //     type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                //     src: "" //url地址
                // }],
                // poster: "../../static/images/test.jpg", //你的封面地址
                // // width: document.documentElement.clientWidth, //播放器宽度
                // notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                
                // height: '211',
                // muted: false,
                // language: 'zh-CN',
                // preload: 'auto',
                // sources: [{
                //     type: "video/mp4",
                //     src: "http://192.168.43.46:8000/vvv.webm"
                // }],
                // controlBar: {
                //     timeDivider: true,
                //     durationDisplay: true,
                //     remainingTimeDisplay: false,
                // },
                // poster: require('@/assets/images/poster_1.jpg')
            },
            title: '自己还年轻，过段时间再买也不迟？',
            time: '12分50秒',
            watch: 230,
            liked: false,
            likedNum: 20,
            share: 258,
            showDalog: false
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
        let video = document.getElementById('video');
        // let audio = this.$refs.videoPlayer;
        video.addEventListener('pause', function(e) {
            console.log('暂停播放')
            console.log(e)
        })

        video.addEventListener('ended', function(e) {
            console.log('视频播放完了')
            console.log(e)
        })
        
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
        }
    },
    components: {Icon, MyDialog}
}
</script>

<style lang="less">
.vedio_index_page{
    padding-bottom: 80px;
    min-height: 100vh;
    .vedio_back{
        position: absolute;
        top: 9px;
        left: 15px;
        width: 28px;
    }
    .vedio_box{
        position: relative;
        // height: 211px;
        // .vjs-custom-skin > .video-js .vjs-big-play-button {
        //     width: 64px;
        //     height: 64px;
        //     border: 0;
        //     margin-left: -32px;
        //     background: url(../../assets/images/video_play@2x.png) 0 0 no-repeat;
        //     background-size: 100%;
        //     :before{
        //         display: none;
        //     }
        // }
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