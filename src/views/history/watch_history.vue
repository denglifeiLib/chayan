<template>
    <div class="entry_page watch_history">
        <div class="my_list">
            <wv-group class="no_border" v-if="historyList && historyList.length>0">
                <wv-cell v-for="(item,k) in historyList" :key="k" class=" item">
                    <img :src="item.img" alt="" slot="icon" class="share_img">
                    <div slot="bd" class="vertical_bettwen">
                        <p class="title">{{item.title}}</p>
                        <div class="text">
                            <icon name="jindu" scale="1.5"></icon>
                            <span>{{item.percent === 1 ? '已观看' : `观看至${(Math.floor(item.percent*100))}%`}}</span>
                        </div>
                    </div>
                </wv-cell>
            </wv-group>
            <empty text="暂无观看历史" v-else></empty>
        </div>
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
    name: 'watch_history',
    data() {
        return {
            showDalog: false,
            historyList: [
                {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做你做保险的最你做保险的最你做保险的最…你做保险的最你做保险的最你做保险的最…你做保险的最你做保险的最你做保险的最…保险的最你做保险的最…',
                    percent: 0.5
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的',
                    percent: 0.2
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做保险的最你做保险的最…',
                    percent: 1
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做保险的最你做保险的最…',
                    percent: 0.99
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做保险的最你做保险的最…',
                    percent: 0.99
                }, {
                    id: 12,
                    img: require('@/assets/images/poster_1.jpg'),
                    title: '你做保险的最你做保险的最你做保险的最…',
                    percent: 0.955555
                }
            ],
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '观看历史',
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
            this.historyList = [];
        }
    },
    components: {Icon, Empty, MyDialog}
}
</script>

<style lang="less">

.watch_history{
    min-height: 100vh;
    background: #fff;
    .my_list{
        .weui-cells{
            background: transparent;
        }
        .item{
            padding: 17px 15px;
            background: #fff;
            margin-bottom: 1px;
        }
        
        .share_img{
            width:34.933vw;
            height:72px;
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
        .text{
            font-size:11px;
            color:rgba(156,156,165,1);
            line-height:18px;
            *{
                vertical-align: middle;
            }
        }
        .vertical_bettwen{
            height: 72px;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
        }
        .empty{
            padding-top: 30vh;
        }
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