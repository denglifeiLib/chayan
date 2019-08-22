<template>
    <div class="ketang_detail">
        <ul class="items_box">
            <li class="item" v-for="(item,k) in list" :key="k">
                <p class="title">{{item.title}}</p>
                <div class="vedio_box">
                    <video-player  class="video-player vjs-custom-skin"
                        ref="videoPlayer" 
                        :playsinline="true" 
                        :options="playerOptions"
                    />
                </div>
                <div class="mid_ifn">
                    <div class="pro">
                        <span>课程进度</span>
                        <wv-progress :percent="item.pro_class" :show-clear="false"/>
                        <span class="num">{{item.pro_class}}%</span>
                    </div>
                    <div class="pro">
                        <span>练习进度</span>
                        <wv-progress :percent="item.pro_practise" :show-clear="false" class="primary"/>
                        <span class="num">{{item.pro_practise}}%</span>
                    </div>
                </div>
                <wv-flex class="btm_area">
                    <wv-flex-item>
                        <div @click="likeToggle(item, k)">
                            <!-- <img :src="require('@/assets/images/like.png')" alt="" class="icon"> -->
                            <icon :name="item.liked?'kt_icon_xh_s':'kt_icon_xh_n'" scale="2.5" class="icon"></icon>
                            <span class="like">{{item.like}}</span>
                        </div>
                    </wv-flex-item>
                    <wv-flex-item>
                        <div @click="$router.push({name: 'ketang_lianxi', query:{}})">
                            <img :src="require('@/assets/images/lianxi.png')" alt="" class="icon">
                            <span class="blue">练习</span>
                        </div>
                    </wv-flex-item>
                </wv-flex>
            </li>
        </ul>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'ketang_detail',
    data() {
        return {
            process: "50",
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
                poster: require('@/assets/images/poster_2.jpg')
            },
            list: [],
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: this.$route.query.title,
            backAction: ()=>{
                this.$router.push({name: 'ketang_index', query:{}})
            }
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
                    title: '第一节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '234324',
                    pro_class: '10',
                    pro_practise: '90',
                    like: '105',
                    liked: true,
                    poster: require('@/assets/images/poster_1.jpg'),
                    url: 'http://upload.dearmoody.com/7be7442df0b5a0b26224c2459525b435.mp4'
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '111',
                    pro_class: '50',
                    pro_practise: '20',
                    like: '105',
                    liked: false,
                    poster: require('@/assets/images/poster_2.jpg'),
                    url: 'http://upload.dearmoody.com/7be7442df0b5a0b26224c2459525b435.mp4'
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '656',
                    pro_class: '70',
                    pro_practise: '50',
                    like: '105',
                    poster: require('@/assets/images/poster_1.jpg'),
                    url: 'http://upload.dearmoody.com/7be7442df0b5a0b26224c2459525b435.mp4'
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '878',
                    pro_class: '90',
                    pro_practise: '40',
                    like: '105',
                    liked: false,
                    poster: require('@/assets/images/poster_1.jpg'),
                    url: 'http://upload.dearmoody.com/7be7442df0b5a0b26224c2459525b435.mp4'
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '5467',
                    pro_class: '70',
                    pro_practise: '90',
                    like: '105',
                    liked: false,
                    poster: require('@/assets/images/poster_2.jpg'),
                    url: 'http://upload.dearmoody.com/7be7442df0b5a0b26224c2459525b435.mp4'
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '234324',
                    pro_class: '50',
                    pro_practise: '20',
                    like: '105',
                    liked: false,
                    poster: require('@/assets/images/poster_1.jpg'),
                    url: 'http://upload.dearmoody.com/7be7442df0b5a0b26224c2459525b435.mp4'
                }, {
                    title: '第二节 为什么许多营销伙伴都叫云镜为魔镜？',
                    join: '234324',
                    pro_class: '50',
                    pro_practise: '10',
                    like: '105',
                    liked: false,
                    poster: require('@/assets/images/poster_1.jpg'),
                    url: 'http://upload.dearmoody.com/7be7442df0b5a0b26224c2459525b435.mp4'
                }
            ]
        },
        likeToggle(item, i) {
            this.$set(this.list, i, Object.assign({},item,{
                like: item.liked ? +item.like-1 : +item.like+1,
                liked: !item.liked
            }))
        },
        jump(val) {
            this.$router.replace({
                path: `/ketang_lianxi_result`,
                query: {
                    result: val
                }
            })
        },
    },
    components: {Icon}
}
</script>

<style lang="less">
.ketang_detail{
    .items_box{
        overflow: hidden;
        .item{
            border-top: solid 16px #F9FAFC;
            &:first-child{
                margin-top: -11px;
            }
            .vedio_box{
                position: relative;
                height: 211px;
                background: orange;
                // .video_play{
                //     position: absolute;
                //     top: 50%;
                //     left: 50%;
                //     transform: translate(-50%, -50%);
                // }
                .vjs-custom-skin > .video-js .vjs-big-play-button {
                    width: 64px;
                    height: 64px;
                    border: 0;
                    background: url(../assets/images/video_play@2x.png) 0 0 no-repeat;
                    background-size: 100%;
                    :before{
                        display: none;
                    }
                }
            }
            .title{
                padding: 16px 14px 10px;
                font-size:16px;
                font-weight:600;
                color:rgba(20,20,20,1);
            }
            .mid_ifn{
                display: flex;
                align-items: center;
                justify-content: space-around;
            }
            .btm_area{
                padding: 23px 0;
                text-align: center;
                line-height: 24px;
                img{
                    width: 27px;
                    height: 24px;
                    margin-right: 8px;
                }
                .weui-flex__item>div{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:first-child{
                        border-right: solid 1px #EBECF1;
                    }
                }
            }
            .pro{
                display: flex;
                width: 100%;
                padding:14px 15px 0px;
                font-size:12px;
                color:rgba(168,168,168,1);
                .num{
                    font-size:11px;
                }
                .weui-progress{
                    flex: 1;
                    margin: 0 5px 0 10px;
                }
            }
        }
    }
}

</style>