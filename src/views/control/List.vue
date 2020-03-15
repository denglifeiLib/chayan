<template>
<div class="control_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">直播控场</h3>
        <div class="card_cont">

            <p class="m_tt">进行中直播</p>
            <div class="live_card_group">
                <div class="live_card on_card" @click="clickCard(item)" v-for="(item,i) in on" :key="i">
                    <img :src="item.img" alt="" class="picture">
                    <p class="ellipsis2 title">{{item.title}}</p>
                    <p class="flex_box justify">
                        <span>直播间人数：{{item.personNum}}</span>
                        <el-button @click="$router.push({name: 'control_factory', query: {id: item.id}})" type="primary" size="mini">控场配置</el-button>
                    </p>
                    <p class="mt12 fn_tt">互动功能：</p>
                    <div class="flex_box justify fn_row">
                        <i class="el-icon-edit-outline"></i>
                        <span class="bd">在线答疑</span>
                        <div class="ft on_btn" v-if="item.online">
                            <i class="el-icon-caret-right"></i>
                            <span>开启中</span>
                        </div>
                        <div class="ft off_btn" v-if="!item.online">
                            <span></span>
                            <span>关闭</span>
                        </div>
                    </div>
                    <div class="flex_box justify fn_row">
                        <i class="el-icon-question"></i>
                        <span class="bd">调查问卷</span>
                        <div class="ft on_btn" v-if="item.question">
                            <i class="el-icon-caret-right"></i>
                            <span>开启中</span>
                        </div>
                        <div class="ft off_btn" v-if="!item.question">
                            <span></span>
                            <span>关闭</span>
                        </div>
                    </div>
                    <div class="flex_box justify fn_row">
                        <i class="el-icon-chat-line-square"></i>
                        <span class="bd">用户留言</span>
                        <div class="ft on_btn" v-if="item.msg">
                            <i class="el-icon-caret-right"></i>
                            <span>开启中</span>
                        </div>
                        <div class="ft off_btn" v-if="!item.msg">
                            <span></span>
                            <span>关闭</span>
                        </div>
                    </div>
                    <div class="flex_box justify fn_row">
                        <i class="el-icon-orange"></i>
                        <span class="bd">在线游戏</span>
                        <div class="ft on_btn" v-if="item.game">
                            <i class="el-icon-caret-right"></i>
                            <span>开启中</span>
                        </div>
                        <div class="ft off_btn" v-if="!item.game">
                            <span></span>
                            <span>关闭</span>
                        </div>
                    </div>
                    <div class="flex_box justify fn_row">
                        <i class="el-icon-share"></i>
                        <span class="bd">分享达人榜</span>
                        <div class="ft on_btn" v-if="item.share">
                            <i class="el-icon-caret-right"></i>
                            <span>开启中</span>
                        </div>
                        <div class="ft off_btn" v-if="!item.share">
                            <span></span>
                            <span>关闭</span>
                        </div>
                    </div>
                    <div class="flex_box justify fn_row">
                        <i class="el-icon-coin"></i>
                        <span class="bd">打赏</span>
                        <div class="ft on_btn" v-if="item.fee">
                            <i class="el-icon-caret-right"></i>
                            <span>开启中</span>
                        </div>
                        <div class="ft off_btn" v-if="!item.fee">
                            <span></span>
                            <span>关闭</span>
                        </div>
                    </div>
                </div>
            </div>

            <p class="m_tt">未开始直播</p>
             <div class="live_card_group">
                <div class="live_card end_card" @click="clickCard(item)" v-for="(item,i) in noStart" :key="i">
                    <img :src="item.img" alt="" class="picture">
                    <p class="ellipsis2 title">{{item.title}}</p>
                    <p>开始时间：{{item.startTime}}</p>
                    <el-button @click="$router.push({name: 'control_factory', query: {id: item.id}})" type="primary" size="mini" class="mt12">控场配置</el-button>
                </div>
            </div>

            <p class="m_tt">已结束直播</p>
            <div class="live_card_group">
                <div class="live_card end_card" @click="clickCard(item)" v-for="(item,i) in end" :key="i">
                    <img :src="item.img" alt="" class="picture">
                    <p class="ellipsis2 title">{{item.title}}</p>
                    <p>开始时间：{{item.startTime}}</p>
                    <el-button @click="_query('dayWeekForm')" type="primary" size="mini" class="mt12">详情</el-button>
                </div>
            </div>

        </div>
       
    </div>
</div>
</template>

<script>

export default {
    name: 'control_list_page',
    data() {
        return {
            showDetail: false,
            searchForm: {
                user: '',
                pageSize: 15,
                page: 1
            },
            on: [
                {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    online: true,
                    question: true,
                    share: false,
                    msg: false,
                    game: false,
                    fee: false,
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    online: true,
                    question: true,
                    share: false,
                    msg: false,
                    game: false,
                    fee: false,
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    online: true,
                    question: true,
                    share: false,
                    msg: false,
                    game: false,
                    fee: false,
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    online: true,
                    question: true,
                    share: false,
                    msg: false,
                    game: false,
                    fee: false,
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    online: true,
                    question: true,
                    share: false,
                    msg: false,
                    game: false,
                    fee: false,
                }
            ],
            noStart: [
                {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }
            ],
            end: [
                {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00'
                }
            ],
            list: [],
            troubleList: []
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
                this.list = [
                    {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计血压计血压计血压计血压计血压计血压计血压计',
                        code: 'XYJ-000001（编码）',
                        status: '0', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '1', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '0', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '2', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '1', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }
                ];
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        queryTroubleList(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                this.troubleList = [
                    'fsfsfsdfsdfsdf',
                    'XXXXXXXXXXXX'
                ];
                loading.close();
                callback && callback()
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        clickCard(item) {
            if(item.status === '2') {
                this.queryTroubleList(()=> {
                    this.showDetail = true;
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.control_list_page{
    .live_card_group{
         display: flex;
        flex-wrap: wrap;
        .live_card {
            width: 280px;
            height: 390px;
            padding: 15px;
            background: #fff;
            border-radius:2px;
            box-shadow:0px 2px 8px 0px rgba(0,0,0,0.09);
            margin-right: 24px;
            margin-bottom: 24px;
           &.on_card{
               height: 480px;
           }
           &.end_card{
               height: 330px;
           }
            .picture{
                display: block;
                width: 100%;
            }
            .fn_tt{
                color: #999;
            }
            p{
                margin-bottom: 6px;
            }
            p.title{
                font-weight: bold;
                font-size: 16px;
                padding-top: 8px;
            }
            .share_icon{
                font-size: 24px;
            }
            .actions .link{
                margin-bottom: 8px;
            }
            .fn_row{
                padding-bottom: 3px;
                 > i{
                    font-size: 14px;
                    margin-right: 8px;
                }
            }
            .on_btn{
                width: 70px;
                padding: 0 5px;
                font-size: 12px;
                border: solid 1px rgb(30, 220, 58);
                color: rgb(30, 220, 58);
                border-radius: 2px;
                i{
                    font-size: 18px;
                }
            }
            .off_btn{
                width: 70px;
                padding: 0 5px;
                font-size: 12px;
                border: solid 1px #f56c6c;
                color: #f56c6c;
                border-radius: 2px;
                span:first-child{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    margin: 0 3px;
                    background: #f56c6c;
                    vertical-align: middle;
                }
            }
        }
        
    }
    .codeEditDialogCon p{
        padding-bottom: 10px;
    }
}

</style>