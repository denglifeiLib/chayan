<template>
    <div>
        <div class="card_wrapper">
            <h3 class="card_title">昨日微信监控数据</h3>
            <div class="clearfix">
                <ul class="card_cont">
                    <li>群</li>
                    <li><img src="../../../assets/images/p_wx_view_1.png" alt=""><div class="num">20</div></li>
                    <li>日<span class="value"><el-link type="danger" :underline="false">10%<i class="el-icon-top"></i></el-link></span></li>
                    <li>周<span class="value"><el-link type="success" :underline="false">20%<i class="el-icon-bottom"></i></el-link></span></li>
                    <li>月<span class="value"><el-link type="success" :underline="false">20%<i class="el-icon-bottom"></i></el-link></span></li>
                </ul>
                <ul class="card_cont">
                    <li>用户</li>
                    <li><img src="../../../assets/images/p_wx_view_2.png" alt=""><div class="num">200</div></li>
                    <li>日<span class="value"><el-link type="danger" :underline="false">10%<i class="el-icon-top"></i></el-link></span></li>
                    <li>周<span class="value"><el-link type="success" :underline="false">20%<i class="el-icon-bottom"></i></el-link></span></li>
                    <li>月<span class="value"><el-link type="success" :underline="false">20%<i class="el-icon-bottom"></i></el-link></span></li>
                </ul>
                <ul class="card_cont">
                    <li>事件</li>
                    <li><img src="../../../assets/images/p_wx_view_3.png" alt=""><div class="num">2000</div></li>
                    <li>日<span class="value"><el-link type="danger" :underline="false">10%<i class="el-icon-top"></i></el-link></span></li>
                    <li>周<span class="value"><el-link type="success" :underline="false">20%<i class="el-icon-bottom"></i></el-link></span></li>
                    <li>月<span class="value"><el-link type="success" :underline="false">20%<i class="el-icon-bottom"></i></el-link></span></li>
                </ul>
                <ul class="card_cont">
                    <li>自动回复</li>
                    <li><img src="../../../assets/images/p_wx_view_4.png" alt=""><div class="num">20000</div></li>
                    <li>日<span class="value"><el-link type="danger" :underline="false">10%<i class="el-icon-top"></i></el-link></span></li>
                    <li>周<span class="value"><el-link type="success" :underline="false">20%<i class="el-icon-bottom"></i></el-link></span></li>
                    <li>月<span class="value"><el-link type="success" :underline="false">20%<i class="el-icon-bottom"></i></el-link></span></li>
                </ul>
                <ul class="card_cont">
                    <li>高频</li>
                    <li><img src="../../../assets/images/p_wx_view_5.png" alt=""><div class="num">20</div></li>
                    <li>日<span class="value"><el-link type="danger" :underline="false">10%<i class="el-icon-top"></i></el-link></span></li>
                    <li>周<span class="value"><el-link type="success" :underline="false">20%<i class="el-icon-bottom"></i></el-link></span></li>
                    <li>月<span class="value"><el-link type="success" :underline="false">20%<i class="el-icon-bottom"></i></el-link></span></li>
                </ul>
            </div>
        </div>
        <el-row :gutter="20" class="view_bottom">
            <el-col :xs="24" :sm="16">
                <div class="card_wrapper pb0">
                    <h3 class="card_title">今日群信息</h3>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        style="width: 100%;margin-top:-1px;"
                        border>
                        <el-table-column prop="groupName" label="群名" width="240">
                            <template slot-scope="scope">
                                <img :src="scope.row.icon" alt="" class="list_icon">
                                {{scope.row.groupName}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="groupNum" label="群人数"></el-table-column>
                        <el-table-column prop="eventsNum" label="昨日事件数"></el-table-column>
                        <el-table-column prop="responeNum" label="昨日自动回复"></el-table-column>
                        <el-table-column prop="highTime" label="昨日高频时间"></el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" class="msg_row">
                <swiper  :options="swiperOption" ref="mySwiper" class="swiper msg_box">
                    <!-- slides -->
                    <swiper-slide>
                        <div class="masg_card">
                            <h4>最新事件<span class="fr">10分钟前</span></h4>
                            <div class="msg1">
                                <img src="../../../assets/images/p_header.jpg" alt="" class="hd_img">
                                <div class="info_box">
                                    <p class="name">老王</p>
                                    <div class="msg">好我想跟你说你 好我想跟你说你好</div>
                                </div>
                            </div>
                            <div class="msg2">
                                <span class="type">自动回复</span>
                                <span class="msg">老师，收到，请稍等请稍等请稍等请稍等请稍等请稍等请稍等请稍等请稍等</span>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="masg_card">
                            <h4>高频事件<span class="fr">10分钟前</span></h4>
                            <div class="msg1">
                                <img src="../../../assets/images/p_header.jpg" alt="" class="hd_img">
                                <div class="info_box">
                                    <p class="name">老王</p>
                                    <div class="msg">好我想跟你说你 好我想跟你说你好</div>
                                </div>
                            </div>
                            <div class="msg2">
                                <span class="msg">
                                    <p>老师，收到，请稍等请稍等请稍等请稍等请稍等请稍等请稍等请稍等请稍等</p>
                                    <p>老师，收到，请稍等请稍等请稍等等请稍等</p>
                                </span>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="masg_card">
                            <h4>最新事件<span class="fr">10分钟前</span></h4>
                            <div class="msg1">
                                <img src="../../../assets/images/p_header.jpg" alt="" class="hd_img">
                                <div class="info_box">
                                    <p class="name">老王</p>
                                    <div class="msg">好我想跟你说你 好我想跟你说你好</div>
                                </div>
                            </div>
                            <div class="msg2">
                                <span class="type">自动回复</span>
                                <span class="msg">
                                    <p>老师，收到，请稍等请稍等请稍等请稍等请稍等请稍等请稍等请稍等请稍等</p>
                                    <p>老师，收到，请稍等请稍等请稍等等请稍等</p>
                                </span>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="masg_card">
                            <h4>高频事件<span class="fr">10分钟前</span></h4>
                            <div class="msg1">
                                <img src="../../../assets/images/p_header.jpg" alt="" class="hd_img">
                                <div class="info_box">
                                    <p class="name">老王</p>
                                    <div class="msg">好我想跟你说你 好我想跟你说你好</div>
                                </div>
                            </div>
                            <div class="msg2">
                                <span class="msg">
                                    <p>已发送邮件：15155551551@126.com 、15155551551@126.com、15155551551@126.com</p>
                                    <p>已发送短信：15155551551、15155551551、15155551551…</p>
                                </span>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Vue from 'vue';
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);

export default {
    name: 'reptile_author',
    data() {
        return {
            swiperOption: {

                loop: true,
                autoplay: true,
                speed: 1000,
                spaceBetween: 0,
                direction: 'vertical',
                slidesPerView: 2.5,
                spaceBetween: 20,
                slidesOffsetAfter: 200,
                on: {
                    tap: ()=> {
                        alert(this.tableData)
                    }
                }
            
            },
            tableData: [
                {
                    groupName: '王王小虎王小虎王',
                    groupNum: '324',
                    eventsNum: '54545',
                    responeNum: '22',
                    highTime: '2',
                    icon: require('@/assets/images/logo_1.jpg')
                }, {
                    groupName: '王王小虎王小虎王',
                    groupNum: '324',
                    eventsNum: '54545',
                    responeNum: '22',
                    highTime: '2',
                    icon: require('@/assets/images/logo_1.jpg')
                }, {
                    groupName: '王王小虎王小虎王',
                    groupNum: '324',
                    eventsNum: '54545',
                    responeNum: '22',
                    highTime: '2',
                    icon: require('@/assets/images/logo_1.jpg')
                }, {
                    groupName: '王王小虎王小虎王',
                    groupNum: '324',
                    eventsNum: '54545',
                    responeNum: '22',
                    highTime: '2',
                    icon: require('@/assets/images/logo_1.jpg')
                }, {
                    groupName: '王王小虎王小虎王',
                    groupNum: '324',
                    eventsNum: '54545',
                    responeNum: '22',
                    highTime: '2',
                    icon: require('@/assets/images/logo_1.jpg')
                }, {
                    groupName: '王王小虎王小虎王',
                    groupNum: '324',
                    eventsNum: '54545',
                    responeNum: '22',
                    highTime: '2',
                    icon: require('@/assets/images/logo_1.jpg')
                }, {
                    groupName: '王王小虎王小虎王',
                    groupNum: '324',
                    eventsNum: '54545',
                    responeNum: '22',
                    highTime: '2',
                    icon: require('@/assets/images/logo_1.jpg')
                }, {
                    groupName: '王王小虎王小虎王',
                    groupNum: '324',
                    eventsNum: '54545',
                    responeNum: '22',
                    highTime: '2',
                    icon: require('@/assets/images/logo_1.jpg')
                }, {
                    groupName: '王王小虎王小虎王',
                    groupNum: '324',
                    eventsNum: '54545',
                    responeNum: '22',
                    highTime: '2',
                    icon: require('@/assets/images/logo_1.jpg')
                }, {
                    groupName: '王王小虎王小虎王',
                    groupNum: '324',
                    eventsNum: '54545',
                    responeNum: '22',
                    highTime: '2',
                    icon: require('@/assets/images/logo_1.jpg')
                }
            ],
        }
    },
    methods: {
    },
    components: {
        swiper,
        swiperSlide
        },
    computed: {
        swiper() {
        return this.$refs.mySwiper.swiper
        }
    },
}
</script>

<style lang="scss" scoped>
.card_wrapper{
    margin-top: 20px;
    margin-bottom: 0px;
    padding-bottom: 45px;
    &.pb0{
        padding-bottom: 0px;
    }
    .card_cont{
        font-size:14px;
        color:rgba(0,0,0,0.65);
        line-height:32px;
        float: left;
        width: 20%;
        img{
            display: inline-block;
            vertical-align: middle;
            margin-bottom: 30px;
        }
        .value{padding-left: 18px;}
        .num{
            display: inline-block;
            font-size:30px;
            color: #000;
            line-height:38px;
            margin-bottom: 30px;
            vertical-align: middle;
        }
    }
}

.view_bottom{
    .msg_row{
        padding-top: 20px;
        padding-right: 0!important;
    }
    .msg_box{
        height: 639px;
        // overflow-y: scroll;
        // overflow-x: hidden;
        .masg_card{
            margin-bottom: 20px;
            background: #F2F2F2;
            &:last-child{
                margin-bottom: 0;
            }
            h4{
                padding: 0 16px 0 24px;
                line-height: 55px;
                background: #fff;
                font-size:16px;
                span{
                    font-size:12px;
                    color:rgba(144,147,153,1);
                    line-height: 55px;
                    font-weight: normal;
                }
            }
            .msg1{
                padding: 17px 24px;
                overflow: hidden;
                .hd_img{
                    width: 41px;
                    height: 41px;
                    border-radius:4px;
                    margin-right: 10px;
                    float: left;
                }
                .info_box{
                    float: left;
                    .msg{
                        margin-top: 2px;
                        color:rgba(48,49,51,1);
                        line-height:17px;
                        padding: 8px 17px;
                        background: #fff;
                        border-radius:4px;
                    }
                }
            }
            .msg2{
                display: flex;
                align-items: stretch;
                background: #fff;
                .type{
                    flex-grow: 0;
                    flex-shrink: 0;
                    width: 75px;
                    // display: block;
                    border-right: solid 1px #F0F2F5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .msg{
                    flex-grow: 1;
                    color:rgba(48,49,51,1);
                    line-height:17px;
                    padding: 14px 11px;
                }
            }
        }
    }
}
</style>