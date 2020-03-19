<template>
<div class="question_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">题库管理</h3>
        <div class="card_cont">

            <el-button icon="el-icon-plus" @click="showAddDialog=true" type="primary" class="fr mb12" size="small">添加问答</el-button>

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
        

        <el-dialog title="问卷添加" :visible.sync="showDialog" :center="true" :close-on-click-modal="false" width="500px">
            <div class="content">
                <el-form label-position="right" label-width="100px" :model="dialogModel">
                    <el-form-item label="问卷标题：">
                        <el-input v-model="dialogModel.title"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间：">
                        <el-date-picker v-model="dialogModel.startData" type="date" placeholder="选择日期" style="width: 350px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间：">
                        <el-date-picker v-model="dialogModel.endData" type="date" placeholder="选择日期" style="width: 350px"></el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-dialog>
    </div>

    <edit-question :data="form" v-if="showAddDialog" @close="showAddDialog=false;form={}" @submit="addQuestion"></edit-question>
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
            showAddDialog: false,
            showDialog: false,
            form: {},
            dialogModel: {
                title: '',
                startData: '',
                endData: ''
            },
            searchForm: {
                user: '',
                pageSize: 10,
                page: 1
            },
            rows: [],
            columns: [
                {
                    prop: 'title',
                    label: '题目标题'
                }, {
                    prop: 'status',
                    label: '状态',
                    filter: (row)=> {
                        return row.status === '0' ? '禁用' : '启用'
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

                callback && callback()
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
                            key: 'DISABLE',
                            desc: '禁用',
                            btnType: 'danger'
                        }, {
                            key: 'DELETE',
                            desc: '删除',
                            btnType: 'default'
                        }
                    ]
                }
                if(item.status === '1') {
                    item.items = [
                        {
                            key: 'EDIT',
                            desc: '编辑'
                        }, {
                            key: 'ENABLE',
                            desc: '启用',
                            btnType: 'success'
                        }, {
                            key: 'DELETE',
                            desc: '删除',
                            btnType: 'default'
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
                case 'ENABLE': 
                    this.$confirm('确认开启？').then(_ => {
                        this.handlerSwitch(type, row, index)
                    }).catch(_=>{})
                    break;
                case 'DISABLE': 
                    this.$confirm('确认禁止？').then(_ => {
                        this.handlerSwitch(type, row, index)
                    }).catch(_=>{})
                    break;
            }
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
        add() {
            this.$set(form, 'show', true)
        },
        addQuestion(form) {
            console.log(77777, form)
        } 
    },
    components: {Table, ButtonCell, EditQuestion}
}
</script>

<style lang="scss" scoped>
.question_list_page{
    
}

</style>