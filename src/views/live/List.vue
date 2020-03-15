<template>
<div class="live_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">直播管理</h3>
        <div class="card_cont">

            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="searchForm.user" placeholder="直播名称" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-plus" @click="_query('dayWeekForm')" type="primary">添加新直播</el-button>
                </el-form-item>
            </el-form>

            <p class="m_tt">进行中</p>
            <div class="live_card_group">
                <div class="live_card on_card" @click="clickCard(item)" v-for="(item,i) in on" :key="i">
                    <img :src="item.img" alt="" class="picture">
                    <p class="ellipsis2 title">{{item.title}}</p>
                    <p>直播间人数：{{item.personNum}}</p>
                    <p>开始时间：{{item.startTime}}</p>
                    <div class="flex_box justify mt25">
                        <el-button @click="$router.push({name: 'control_factory', query: {id: item.id}})" type="primary" size="mini">控场配置</el-button>
                        <el-link type="primary" @click="$router.push({name: 'analyse_live_partment', query: {id: item.id}})">数据统计</el-link>
                        <i class="el-icon-share share_icon" @click="$router.push({name: 'live_release', query: {id: item.id}})"></i>
                    </div>
                </div>
            </div>

            <p class="m_tt">已发布未开始</p>
            <div class="live_card_group">
                <div class="live_card on_card" @click="clickCard(item)" v-for="(item,i) in noStart" :key="i">
                    <img :src="item.img" alt="" class="picture">
                    <p class="ellipsis2 title">{{item.title}}</p>
                    <p>直播间人数：{{item.personNum}}</p>
                    <p>开始时间：{{item.startTime}}</p>
                    <div class="flex_box justify mt25">
                        <el-button @click="_query('dayWeekForm')" type="primary" size="mini">撤回</el-button>
                        <i class="el-icon-share share_icon" @click="$router.push({name: 'live_release', query: {id: item.id}})"></i>
                    </div>
                </div>
            </div>

            <p class="m_tt">未发布</p>
            <div class="live_card_group">
                <div class="live_card noStart_card" @click="clickCard(item)" v-for="(item,i) in noStart" :key="i">
                    <img :src="item.img" alt="" class="picture">
                    <p class="ellipsis2 title">{{item.title}}</p>
                    <p>直播间人数：{{item.personNum}}</p>
                    <p>开始时间：{{item.startTime}}</p>
                    <div class="actions mt25">
                        <el-link class="link" type="primary" :underline="true" :href="`/#/live/base_info?id=${item.id}`">基本信息</el-link>
                        <el-link class="link" type="primary" :underline="true" :href="`/#/live/layout?id=${item.id}`">登录分享页</el-link>
                        <el-link class="link" type="primary" :underline="true" :href="`/#/live/elements?id=${item.id}`">直播页</el-link>
                        <el-link class="link" type="primary" :underline="true" :href="`/#/live/plugin?id=${item.id}`">插件配置</el-link>
                        <el-link class="link" type="primary" :underline="true" :href="`/#/live/root?id=${item.id}`">权限配置</el-link>
                        <el-link class="link" type="primary" :underline="true" :href="`/#/live/ali?id=${item.id}`">备用地址</el-link>
                        <el-button @click="$router.push({name: 'live_release', query: {id: item.id}})" type="primary" size="mini" class="fr">发布直播</el-button>
                    </div>
                </div>
            </div>

            <p class="m_tt">已结束</p>
            <div class="live_card_group">
                <div class="live_card end_card" @click="clickCard(item)" v-for="(item,i) in end" :key="i">
                    <img :src="item.img" alt="" class="picture">
                    <p class="ellipsis2 title">{{item.title}}</p>
                    <p>开始时间：{{item.startTime}}</p>
                    <div class="flex_box justify mt25">
                        <el-button @click="_query('dayWeekForm')" type="primary" size="mini">回播权限配置</el-button>
                        <el-link type="primary" @click="$router.push({name: 'analyse_live_partment', query: {id: item.id}})">数据统计</el-link>
                    </div>
                </div>
            </div>

            <el-dialog title="报障内容" :visible.sync="showDetail" :center="true" :close-on-click-modal="true" :modal="true">
                <div class="codeEditDialogCon">
                    <p v-for="(item,i) in troubleList" :key="i">{{i+1}}、{{item}}</p>
                </div>
            </el-dialog>
        </div>
       
    </div>
</div>
</template>

<script>

export default {
    name: 'device',
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
.live_list_page{
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
               height: 360px;
           }
           &.end_card{
               height: 330px;
           }
            .picture{
                display: block;
                width: 100%;
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
        }
        
    }
    .codeEditDialogCon p{
        padding-bottom: 10px;
    }
}

</style>