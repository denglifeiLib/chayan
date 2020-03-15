<template>
<div class="factory_page">
    <div class="card_wrapper mt25">
        <el-button @click="$router.push({name: 'control_view', query: {page: 'online'}})" type="primary" size="mini">答疑查看及导出</el-button>
        <el-button @click="$router.push({name: 'control_view', query: {page: 'question'}})" type="primary" size="mini">问卷查看及导出</el-button>
        <el-button @click="$router.push({name: 'control_view', query: {page: 'lottery'}})" type="primary" size="mini">抽奖查看及导出</el-button>
        <el-button @click="$router.push({name: 'control_view', query: {page: 'share'}})" type="primary" size="mini">分享查看及导出</el-button>
        <el-button @click="$router.push({name: 'control_view', query: {page: 'fee'}})" type="primary" size="mini">打赏查看及导出</el-button>
        <img src="../../assets/images/eg.jpg" alt="">
    </div>
</div>
</template>

<script>

export default {
    name: 'factory_page',
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

}

</style>