<template>
<div class="live_manage_page greyPage">
    <div class="card_wrapper">
        <div class="card_title no_border">
            直播管理 
            <el-button icon="el-icon-plus" class="ml20" @click="$router.push({name: 'partment_add', query: {type: 'ADD'}})" type="primary" size="mini">创建直播</el-button>
        </div>

        <div class="top_filter_area">
            <div style="width: 500px">
                <el-input placeholder="请输入内容" v-model="name" size="middle" class="primary">
                    <el-button slot="append" type="primary" size="middle">搜 索</el-button>
                </el-input>
            </div>
            <el-tabs v-model="activeName" @tab-click="changeTab" class="tabs">
                <el-tab-pane name="on">
                    <span slot="label">进行中<span class="num">0</span></span>
                </el-tab-pane>
                <el-tab-pane name="noStart">
                    <span slot="label">未开始<span class="num">15</span></span>

                </el-tab-pane>
                <el-tab-pane name="end">
                    <span slot="label">已结束<span class="num">20</span></span>
                </el-tab-pane>
            </el-tabs>
        </div>
        
        <div class="card_cont">
            <div class="live_card_group" v-if="activeList.length">
                <div class="live_card" @click="clickCard(item)" v-for="(item,i) in activeList" :key="i" >
                    <img :src="item.img" alt="" class="picture">
                    <div class="dis_box">
                        <p class="ellipsis2 title">{{item.title}}</p>
                        <p class="grey">开始时间：{{item.startTime}}</p>
                    </div>
                    <div class="flex_box icon_btns" v-if="['on', 'noStart'].indexOf(activeName)>-1">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom" :visible-arrow="false">
                            <i class="el-icon-edit"></i>
                        </el-tooltip>
                        <span class="line">|</span>
                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom" :visible-arrow="false">
                            <div class="combine">
                                <img src="../../svg/icon_shanchu_n.svg" alt="" class="n">
                                <img src="../../svg/icon_shanchu_s.svg" alt="" class="s">
                            </div>
                        </el-tooltip>
                        <span class="line">|</span>
                        <el-tooltip class="item" effect="dark" content="分享" placement="bottom" :visible-arrow="false">
                            <i class="el-icon-share"></i>
                        </el-tooltip>
                    </div>
                    <div class="flex_box icon_btns" v-if="['end'].indexOf(activeName)>-1">
                        <el-tooltip class="item" effect="dark" content="回播权限" placement="bottom" :visible-arrow="false">
                            <div class="combine">
                                <img src="../../svg/icon_quanxian_n.svg" alt="" class="n">
                                <img src="../../svg/icon_quanxian_s.svg" alt="" class="s">
                            </div>
                        </el-tooltip>
                        <span class="line">|</span>
                        <el-tooltip class="item" effect="dark" content="数据统计" placement="bottom" :visible-arrow="false">
                            <div class="combine">
                                <icon name="icon_shuju_n" scale="2" class="n"></icon>
                                <icon name="icon_shuju_s" scale="2" class="s"></icon>
                            </div>
                        </el-tooltip>
                        <span class="line">|</span>
                        <el-tooltip class="item" effect="dark" content="分享" placement="bottom" :visible-arrow="false">
                            <i class="el-icon-share"></i>
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <div class="empty" v-else>
                <img src="../../assets/img/empty.png" alt="">
                <p class="grey">暂无直播</p>
            </div>

        </div>
       
    </div>
</div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';

export default {
    name: 'live_manage_page',
    data() {
        return {
            name: '',
            activeName: 'on',
            activeList: [],
            on: [
                {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情-明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }
            ],
            noStart: [],
            end: [
                {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫6款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }
            ],
        }
    },
    created() {
        this._query();
    },
    methods: {
        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                this.activeList = this.on;
                console.log('发送请求', this.rows);

            }, 500);
            
        },
        changeTab(tab) {
            console.log(99999, tab)
            this.activeList = this[this.activeName];
        },
        handlerDelete(type, row, index) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(()=>{
                loading.close();
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }, 500);
        },
    },
    components: {Icon}
}
</script>

<style lang="scss">
.live_manage_page{
    margin-left: -24px;
    margin-right: -24px;
    &.greyPage .card_wrapper{
        background: #EBEEF5;
    }
    .primary .el-input-group__append{
        background-color: #409EFF;
        border-color: #409EFF;
        button span{color: #fff;}
    }
    .el-tabs__nav-wrap::after{
        background: transparent;
    }
    .el-tabs__item{
        font-size: 16px;
    }
    .tabs{
        margin-top: 35px;
    }
    .tabs .num{
        display: inline-block;
        padding: 0 4px;
        height:17px;
        line-height:17px;
        background:rgba(226,240,255,1);
        border-radius:2px;
        vertical-align: middle;
        color: #007AFF;
        margin-left: 4px;
    }
    .card_title, .top_filter_area{
        background: #fff;
    }
    .top_filter_area{
        padding: 10px 24px 0;
    }
    .live_card_group{
        display: flex;
        flex-wrap: wrap;
        .live_card {
            display: flex;
            flex-direction: column;
            width: 266px;
            height: 282px;
            background: #fff;
            box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
            border-radius:2px;
            margin-right: 40px;
            margin-bottom: 24px;
            .picture{
                display: block;
                width: 100%;
                height: 150px;
            }
            .dis_box{
                padding: 16px;
                height: 100px;
                p{
                    margin-bottom: 4px;
                }
                p.title{
                    font-weight: bold;
                    font-size: 16px;
                }
            }
            .icon_btns{
                padding: 0 16px 13px;
                justify-content: space-around;
                i{
                    font-size: 16px;
                    color: #858585;
                    &:hover{
                        color: #007AFF;
                    }
                }
                .line{
                    color: #E8E8E8
                }
                .combine {
                    img{
                        width: 22px;
                    }
                    &:hover .s, .n{
                        display: block;
                    }
                    &:hover .n, .s{
                        display: none;
                    }
                }
            }
            .share_icon{
                font-size: 24px;
            }
            .actions .link{
                margin-bottom: 8px;
            }
        }
        
    }
    .empty{
        padding-top: 120px;
        text-align: center;
    }
}

</style>