<template>
<div class="factory_page">
    <!-- <div>
        <el-button @click="$router.push({name: 'control_view', query: {page: 'online'}})" type="primary" size="mini">答疑查看及导出</el-button>
        <el-button @click="$router.push({name: 'control_view', query: {page: 'question'}})" type="primary" size="mini">问卷查看及导出</el-button>
        <el-button @click="$router.push({name: 'control_view', query: {page: 'lottery'}})" type="primary" size="mini">抽奖查看及导出</el-button>
        <el-button @click="$router.push({name: 'control_view', query: {page: 'share'}})" type="primary" size="mini">分享查看及导出</el-button>
        <el-button @click="$router.push({name: 'control_view', query: {page: 'fee'}})" type="primary" size="mini">打赏查看及导出</el-button>
    </div> -->
    <div class="top_nav flex_box justify">
        <div class="flex_box left">
            <i class="el-icon-video-camera-solid blue bold"></i>
            <el-input v-model="vedioId" placeholder="请输入视频ID" size="mini" class="input"></el-input>
            <el-button size="mini">开始管理</el-button>
            <p class="tip bold">直击疫情—太保16款长期疾病保险产品责任</p>
        </div>
        <div class="flex_box right">
            <i class="el-icon-user-solid blue"></i>
            <span class="grey">当前观看用户</span>
            <span class="blue bold">100320</span>
            <el-button size="mini">关闭页面</el-button>
        </div>
    </div>
    <div class="main mt25 flex_box">

        <div class="phone_wrap">
            <iframe :src="iframeUrl" frameborder="0" class="iframe"></iframe>
        </div>

        <div class="menues">
            <ul>
                <li :class="['item', {active: active===item.type}]" v-for="(item, i) in routes_top" :key="i"  @click="change(item)">{{item.name}}</li>
            </ul>
            <ul class="mt25" style="height:492px;">
                <li class="mb12"><el-button @click="$router.push({name: 'live_plugin'})" size="small" style="display:block;width: 160px">插件编辑</el-button></li>
                <li :class="['item', {active: active===item.type}]" v-for="(item, i) in routes_btm" :key="i" @click="change(item)">{{item.name}}</li>
            </ul>
        </div>

        <router-view @public="public"></router-view>

    </div>
    
</div>
</template>

<script>

export default {
    name: 'factory_page',
    data() {
        return {
            vedioId: '',
            active: 'online',
            routes_top: [
                {
                    name: '公告置顶',
                    type: 'notice'
                }, {
                    name: '用户留言',
                    type: 'msg'
                }, {
                    name: '文件资料',
                    type: 'document'
                }, {
                    name: '图文介绍配置',
                    type: 'introduce'
                }
            ],
            routes_btm: [
                {
                    name: '在线答疑',
                    type: 'online'
                }, {
                    name: '调查问卷',
                    type: 'question'
                }, {
                    name: '在线抽奖',
                    type: 'lottery'
                }, {
                    name: '分享达人榜',
                    type: 'share'
                }, {
                    name: '打赏',
                    type: 'fee'
                }
            ],
            searchForm: {
                user: '',
                pageSize: 15,
                page: 1
            },
            iframeUrl: 'http://m.baidu.com/'
            
        }
    },
    created() {
        document.documentElement.style.overflow = 'scroll';
        document.body.style.overflow = 'scroll';
        this._query();
        this.init()
    },
    methods: {
        init() {
            this.active = 'notice';
            this.$router.push({name: 'factory_view', query: {page: 'notice', name: '公告置顶'}})
        },
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
        change(item) {
            if(item.type !== this.active) {
                this.active = item.type;
                if(item.type == 'msg') {
                    this.$router.replace({name:'factory_view_msg', query: {page: item.type, name: item.name}})
                } else if(item.type == 'introduce') {
                    this.$router.replace({name:'factory_view_introduce', query: {page: item.type, name: item.name}})
                } else {
                    this.$router.replace({name:'factory_view', query: {page: item.type, name: item.name}})
                }
                
            }
        },
        public(url) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                this.iframeUrl = url || 'http://192.168.43.46:8848/lehuo_mui/html/live/index.html'
            }, 500);
            console.log('发送请求', this.searchForm);
        }
    }
}
</script>

<style lang="scss">
.factory_page{
    height: 100%;
    min-height: 717px;
    background: #F5F7FA;
    .main{
        align-items: flex-start;
        align-items: stretch;
    }
    .top_nav{
        padding: 0 24px;
        height: 38px;
        background: #fff;
        .left>*{
            margin-right: 10px;
        }
        .right>*{
            margin-left: 10px;
        }
        .tip{
            white-space: nowrap;
        }
        i{
            font-size: 18px;
        }
        .input .el-input__inner{
            background: #F5F5F7;
            border: 0;
        }
    }
    .cont_wrap{
        background: #fff;
    }
    .phone_wrap {
        padding-top: 45px;
        width: 434px;
        height: 717px;
        margin-right: 17px;
        background: url(../../assets/images/phone.png) center no-repeat;
        background-size: 100%;
        flex-flow: 0;
        flex-shrink: 0;
        .iframe{
            display: block;
            width:368px;
            height:620px;
            margin: 0 auto;
        }
    }
    .menues {
        margin-right: 8px;
        ul{
            padding: 16px 7px;
            background: #fff;
            li.item{
                position: relative;
                padding-left: 28px;
                width: 160px;
                height: 42px;
                font-size:16px;
                line-height: 42px;
                cursor: pointer;
                &.active{
                    color: #007AFF;
                    &::before{
                        position: absolute;
                        left: 0;
                        top: 9px;
                        width: 4px;
                        height: 24px;
                        background: #007AFF;
                        content: ' ';
                    }
                }
            }
        }
    }


    .card_title{
        font-size:16px;
        color:rgba(48,49,51,1);
    }

    .el-table th{
        font-size:14px;
        font-weight:500;
        text-align: left;
        color:rgba(133,133,133,1);
    }
    .el-table td{
        font-size:14px;
        color:rgba(13,27,53,1);
        text-align: left;
    }

    .card_wrapper, .list-wrapper{
        border: 0;
        margin-bottom: 0;
    }

}

</style>