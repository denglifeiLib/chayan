<template>
<div class="live_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">直播分类管理</h3>
        <div class="card_cont">

            <el-button icon="el-icon-plus" @click="_query('dayWeekForm')" type="primary" class="fr">添加直播分类</el-button>
            <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                <el-form-item>
                    <el-input v-model="searchForm.user" placeholder="直播分类名称" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
                </el-form-item>
            </el-form>

            <Table :columns="columns" :rows="rows" @action="handleTableCell"></Table>
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
                user: '',
                pageSize: 10,
                page: 1
            },
            rows: [],
            columns: [
                {
                    prop: 'title',
                    label: '直播分类名称'
                }, {
                    prop: 'status',
                    label: '排序',
                    filter: (row)=> {
                        return row.status ? '是' : '否'
                    }
                }, {
                    prop: 'id',
                    label: '操作',
                    component: ButtonCell
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
                this.rows = [
                    {
                        id: 1,
                        title: '俱乐部',
                        status: false
                    }, {
                        id: 1,
                        title: '俱乐部',
                        status: true
                    }, {
                        id: 1,
                        title: '俱乐部',
                        status: false
                    }, {
                        id: 1,
                        title: '俱乐部',
                        status: false
                    }, {
                        id: 1,
                        title: '俱乐部',
                        status: true
                    }
                ];
                this.rows = this.addBtns(this.rows);
                console.log('发送请求', this.rows);

            }, 500);
            
        },
        addBtns(rows) {
            return rows.map(item=> {
                item.items = [
                    {
                        key: 'EDIT',
                        desc: '编辑'
                    }, {
                        key: 'DELETE',
                        desc: '删除',
                        btnType: 'default'
                    }
                ]
                return item;
            })
        },
        handleTableCell(type, row, index) {
            console.log(777, type, row, index)
            switch (type) {
                case 'EDIT': 
                    break;
                case 'DELETE': 
                    break;
            }
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