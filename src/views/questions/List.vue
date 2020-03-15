<template>
<div class="question_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">问卷管理</h3>
        <div class="card_cont">

            <el-button icon="el-icon-plus" @click="_query('dayWeekForm')" type="primary" class="fr">添加问卷</el-button>
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="searchForm.user" placeholder="调查问卷" style="width: 240px;"></el-input>
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
    name: 'question_list_page',
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
                    label: '问卷标题'
                }, {
                    prop: 'status',
                    label: '状态',
                    filter: (row)=> {
                        return row.status === '1' ? '已发布' : '待发布'
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
                        title: '问卷标题1',
                        status:'0' // 0待发布 1已发布
                    }, {
                        id: 1,
                        title: '问卷标题2',
                        status: '1'
                    }, {
                        id: 1,
                        title: '问卷标题3',
                        status: '1'
                    }, {
                        id: 1,
                        title: '问卷标题4',
                        status:'0'
                    }, {
                        id: 1,
                        title: '问卷标题5',
                        status:'0'
                    }
                ];
                this.rows = this.addBtns(this.rows);
                console.log('发送请求', this.rows);

            }, 500);
            
        },
        addBtns(rows) {
            return rows.map(item=> {
                if(item.status === '0') {
                    item.items = [
                        {
                            key: 'EDIT',
                            desc: '编辑'
                        }, {
                            key: 'PUBLISH',
                            desc: '发布',
                            btnType: 'success'
                        }
                    ]
                }
                if(item.status === '1') {
                    item.items = [
                        {
                            key: 'DELETE',
                            desc: '删除',
                            btnType: 'default'
                        }, {
                            key: 'OFFLINE',
                            desc: '下线',
                            btnType: 'danger'
                        }
                    ]
                }
                
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
                case 'PUBLISH': 
                    break;
                case 'OFFLINE': 
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
.question_list_page{
    
}

</style>