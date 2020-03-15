<template>
<div class="live_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">回播</h3>
        <div class="card_cont">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="searchForm.name" placeholder="直播名称" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
                </el-form-item>
            </el-form>

            <div class="live_card_group">
                <div class="live_card on_card" @click="clickCard(item)" v-for="(item,i) in list" :key="i">
                    <img :src="item.img" alt="" class="picture">
                    <p class="ellipsis2 title mt25" style="padding-top:0">{{item.title}}</p>
                    <p class="justify mt25">
                        <span class="fl">{{item.startTime}}</span>
                        <span class="fr">{{item.timeLong}}</span>
                    </p>
                    <div class="flex_box justify mt25">
                        <span>观看：{{item.personNum}}</span>
                        <el-link type="primary" @click="$router.push({name: 'analyse_live_partment', query: {id: item.id}})">数据统计</el-link>
                        <el-link type="primary">回播权限配置</el-link>
                    </div>
                </div>
            </div>

            <!-- 翻页 -->
            <div class="mt24"> 
                <el-pagination
                    background
                    @current-change="changePage"
                    :current-page="searchForm.page"
                    :page-size="searchForm.pageSize"
                    layout="prev, pager, next"
                    :total="40">
                </el-pagination>
            </div>
        </div>
       
    </div>
</div>
</template>

<script>
import Table from '@/components/Table';
import ButtonCell from '@/components/ButtonCell';
export default {
    name: 'device',
    data() {
        return {
            searchForm: {
                name: '',
                pageSize: 10,
                page: 1
            },
            list: [
                {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    timeLong: '67分钟'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    timeLong: '67分钟'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    timeLong: '67分钟'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    timeLong: '67分钟'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    timeLong: '67分钟'
                }, {
                    id: 1,
                    img: require('../../assets/images/default.jpg'),
                    title: '直击疫情--太保16款长期疾病保险产品责任扩展说明',
                    personNum: '4324',
                    startTime: '2020-03-03 10:00:00',
                    timeLong: '67分钟'
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
                

            }, 500);
            
        },

        changePage(val) {
            this.searchForm.page = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },
    },
    components: {Table}
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
                padding-bottom: 8px;
            }
        }
        
    }
    .codeEditDialogCon p{
        padding-bottom: 10px;
    }
}

</style>