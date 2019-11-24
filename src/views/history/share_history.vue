<template>
    <div class="entry_page share_history" :style="{backgroundColor: (shareList && shareList.length>0) ? 'transparent' : '#fff'}">
        <div class="my_list" v-if="shareList && shareList.length>0">
            <wv-group class="no_border item"  v-for="(item,k) in shareList" :key="k">
                <wv-cell class="my_share">
                    <img :src="item.img" alt="" slot="icon" class="share_img">
                    <div slot="bd" class="vertical_bettwen">
                        <p class="title">{{item.title}}</p>
                    </div>
                </wv-cell>
                <wv-cell class="share_members" v-for="(member,i) in item.members.slice(0, item.max).filter(m=>m)" :key="i">
                    <div slot="bd">
                        <div class="memb_info">
                            <img :src="member.header" alt="" class="member_header" >
                            <span class="name">{{member.name}}</span>
                            <img :src="require('@/assets/images/zhuanfa.png')" alt="" class="fa" v-if="member.hadShare">
                        </div>
                        <div class="flex text">
                            <icon name="px_icon_rs" scale="2"></icon>
                            <span class="time">{{member.time}}</span>
                            <span class="watch">{{member.watch}}</span>
                        </div>
                    </div>
                </wv-cell>
                <div @click="toggleShowAll(item, k)" :class="['toggle', {rotate: !item.sou}]" v-if="item.members.length > 2">
                    <span>{{item.sou ? '展开' : '收起'}}</span>
                    <icon name="zhankai" scale="0.8" class="ml5 bottom"></icon>
                </div>
            </wv-group>
        </div>
        <empty text="暂无分享历史" v-else></empty>
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
    name: 'share_history',
    data() {
        return {
            showDalog: false,
            shareList: [
                {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做',
                    max: 3,
                    sou: true,
                    members: [
                        {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: true,
                            header: require('@/assets/images/header.jpg')
                        }, {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: false,
                            header: require('@/assets/images/header.jpg')
                        }, {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: true,
                            header: require('@/assets/images/header.jpg')
                        }, {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: true,
                            header: require('@/assets/images/header.jpg')
                        }, {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: true,
                            header: require('@/assets/images/header.jpg')
                        }, {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: true,
                            header: require('@/assets/images/header.jpg')
                        }
                    ]
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做',
                    max: 3,
                    members: [
                        {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: true,
                            header: require('@/assets/images/header.jpg')
                        }, {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: false,
                            header: require('@/assets/images/header.jpg')
                        }
                    ]
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的你做保险的最你做你做保险的最你做你做保险的最你做你做保险的最你做最你做',
                    max: 3,
                    members: [
                        {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: true,
                            header: require('@/assets/images/header.jpg')
                        }, {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: false,
                            header: require('@/assets/images/header.jpg')
                        }, {
                            name: '孟平平',
                            time: '观看5分钟',
                            watch: '2019-11-15 09:00',
                            hadShare: false,
                            header: require('@/assets/images/header.jpg')
                        }
                    ]
                }
            ],
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '分享历史',
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
            this.shareList = [];
        },
        toggleShowAll(item, k) {
            let el = Object.assign({}, this.shareList[k], {sou: !item.sou, max: item.max === 3 ? item.members.length : 3});
            console.log(2222, el)
            this.shareList.splice(k, 1, el);
        }
    },
    components: {Icon, Empty, MyDialog}
}
</script>

<style lang="less">

.share_history{
    min-height: 100vh;
    .my_list{
        .my_share{
            padding: 0 10px 8px;
            margin-bottom: 20px;
            border-bottom: solid 1px #EEEFF3;
        }
        .weui-cells{
            background: transparent;
        }
        .item{
            padding: 17px 15px;
            background: #fff;
            margin-bottom: 8px;
        }
        
        .share_img{
            width:100px;
            height:54px;
            margin-right: 16px;
            padding-right: 0;
        }
        .title{
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .memb_info{
            padding-bottom: 5px;
            *{
                margin-right: 8px;
                vertical-align: middle;
            }
            .name{
                font-size: 13px;
            }
            .fa{
                height: 16px;
            }
        }
        .text{
            font-size:12px;
            color:#A8A8A8;
            line-height:18px;
            *{
                padding-right: 8px;
                vertical-align: middle;
            }
            .time{
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
        .vertical_bettwen{
            height: 54px;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
        }
        .share_members{
            padding: 0 10px 20px;
            .member_header{
                width: 15px;
                height: 15px;
                border-radius: 50%;
                margin-right: 8px;
                vertical-align: middle;
            }
        }
        .toggle{
            text-align: center;
            font-size:12px;
            color:rgba(29,119,222,1);
            line-height:17px;
            transition: transform 0.5s;
            &.rotate{
                .svg-icon{
                    transform: rotate(180deg)
                }
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