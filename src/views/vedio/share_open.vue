<template>
    <div class="share_open">
        <div class="vedio_box">
            <video-player  class="video-player vjs-custom-skin"
                ref="videoPlayer" 
                :playsinline="true" 
                :options="playerOptions" 
            />
        </div>
        <div class="vedio_des">
            <p class="title">{{title}}</p>
            <div class="flex text">
                <icon name="px_icon_rs" scale="2"></icon>
                <span class="watch">{{watch}}</span>
                <span class="time">时长：{{time}}</span>
            </div>
        </div>

        <div class="btm_card">
            <div class="info_box">
                <img :src="data.header" alt="" class="header">
                <p class="des">本知识由您的好友</p>
                <span class="name">{{data.name}}</span>
                <p class="des">分享</p>
            </div>
            <img :src="require('@/assets/images/logo_n.png')" alt="" class="logo">
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'share_open',
    data() {
        return {
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
                
                height: '211',
                muted: false,
                language: 'zh-CN',
                preload: 'auto',
                sources: [{
                    type: "video/mp4",
                    src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                }],
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                },
                poster: require('@/assets/images/poster_1.jpg')
            },
            title: '自己还年轻，过段时间再买也不迟？',
            time: '12分50秒',
            watch: 230,

            data: {
                poster: require('@/assets/images/poster_1.jpg'),
                watch: 20,
                msg: 54,
                header: require('@/assets/images/header.jpg'),
                name: '@业务员',
            }
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            back: '0',
            title: '太保百问百答'
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
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.share_open{

    .vedio_box{
        position: relative;
        height: 211px;
        background: orange;
        .vjs-custom-skin > .video-js .vjs-big-play-button {
            width: 64px;
            height: 64px;
            border: 0;
            margin-left: -32px;
            background: url(../../assets/images/video_play@2x.png) 0 0 no-repeat;
            background-size: 100%;
            :before{
                display: none;
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


    .btm_card{
        height: calc(100vh - 350px);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background: url('../../assets/images/share_open_bg.png') 0 0 no-repeat;
        background-size: 100% 100%;
        text-align: center;
        .info_box{
            padding-top: 10px;
        }
        .logo{
            display: block;
            width: 28.267vw;
            margin: 0 auto;
        }
        .des{
            font-size:14px;
            color:rgba(128,134,154,1);
            line-height:20px;
        }
        .header{
            width: 62px;
            height: 62px;
            margin-bottom: 15px;
            border-radius: 100%;
        }
        .name{
            padding: 5px 0;
            font-size:17px;
            font-weight:500;
            color:rgba(29,119,222,1);
            line-height:24px;
        }

    }
    
}

</style>