<template>
<div class="question_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">
            问卷管理
            <span class="subtitle">问卷一详情</span>
            <el-button @click="$router.go(-1)" class="fr" size="mini">返回</el-button>
        </h3>
        <div class="card_cont">

            <div class="fr mb12">
                <el-button @click="$router.push({name: 'question_templates', query: {id}})" type="primary" size="small" key="timu_add1">从题库选择</el-button>
                <el-button @click="showAddDialog=true" type="primary" size="small" key="timu_add2">添加问答</el-button>
            </div>

            <Table :columns="columns" :rows="rows" @action="handleTableCell" class="mt24"></Table>
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

        <edit-question :data="form" v-if="showAddDialog" @close="showAddDialog=false;form={}" @submit="addQuestion"></edit-question>
    </div>
</div>
</template>

<script>
import Table from '@/components/Table';
import ButtonCell from '@/components/ButtonCell';
import EditQuestion from '@/components/EditQuestion';
export default {
    name: 'question_list_page',
    data() {
        return {
            id: 'ddd',
            showAddDialog: false,
            form: {},
            dialogModel: {
                title: '',
                startData: '',
                endData: ''
            },
            searchForm: {
                pageSize: 10,
                page: 1
            },
            rows: [],
            columns: [
                {
                    prop: 'title',
                    label: '问卷选题'
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
                        title: '问卷选题1'
                    }, {
                        id: 1,
                        title: '问卷选题2'
                    }, {
                        id: 1,
                        title: '问卷选题3'
                    }, {
                        id: 1,
                        title: '问卷选题4'
                    }, {
                        id: 1,
                        title: '问卷选题5'
                    }
                ];
                this.rows = this.addBtns(this.rows);

                callback && callback()
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
                    this.form = {
                        title: '编辑题目',
                        type: 'single',
                        question: ['single1', 'single2', 'single3'],
                        answer: 'B',
                        analyse: 'fdfdsffsdf'
                    }
                    this.showAddDialog = true;
                    break;
                case 'DELETE': 
                    this.$confirm('确认删除？').then(_ => {
                        this.handlerSwitch(type, row, index)
                    }).catch(_=>{})
                    break;
            }
        },
        changePage(val) {
            this.searchForm.page = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },
        // 问卷添加
        submit() {
            this._query(()=> {
                this.showDialog = false;
            })
        },
        addQuestion(form) {
            console.log(77777, form)
        },
        handlerSwitch(type, row, index) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(()=>{
                loading.close();
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
            }, 500);
        },
    },
    components: {Table, EditQuestion}
}
</script>

<style lang="scss" scoped>
.question_list_page{
    
}

</style>