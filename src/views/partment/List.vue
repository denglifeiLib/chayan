<template>
<div class="partment_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">部门分级设置 <el-button icon="el-icon-plus" @click="$router.push({name: 'partment_add', query: {type: 'ADD'}})" type="primary" class="fr" size="mini">新增部门</el-button></h3>
        <div class="card_cont">

            <!-- <el-button icon="el-icon-plus" @click="_query('dayWeekForm')" type="primary" class="fr">添加问卷</el-button>
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="searchForm.user" placeholder="调查问卷" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
                </el-form-item>
            </el-form> -->

            <Table :columns="columns" :rows="rows" @action="handleTableCell"></Table>
            <!-- 翻页 -->
            <!-- <div class="mt24"> 
                <el-pagination
                    background
                    @current-change="changePage"
                    :current-page="searchForm.page"
                    :page-size="searchForm.pageSize"
                    layout="prev, pager, next"
                    :total="40">
                </el-pagination>
            </div> -->
        </div>
       
    </div>
</div>
</template>

<script>
import Table from '@/components/Table';
import ButtonCell from '@/components/ButtonCell';
export default {
    name: 'partment_list_page',
    data() {
        return {
            searchForm: {
                // user: '',
                // pageSize: 10,
                // page: 1
            },
            rows: [],
            columns: [
                {
                    prop: 'name',
                    label: '部门名称'
                }, {
                    prop: 'upper',
                    label: '上级部门',
                    filter: (row)=> {
                        return row.upper || '无'
                    }
                }, {
                    prop: 'member',
                    label: '成员',
                    btnType: 'link',
                    listKey: 'linkItems',
                    component: ButtonCell
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
                        name: '江苏分公司',
                        upper:'江苏分公司',
                    }, {
                        id: 1,
                        name: '宿迁中支',
                        upper:'江苏分公司',
                    }, {
                        id: 1,
                        name: '杨大严团队',
                        upper:'宿迁中支',
                    }, {
                        id: 1,
                        name: '锋哥团队',
                        upper:'宿迁中支',
                    }, {
                        id: 1,
                        name: '江锋哥团队',
                        upper:'宿迁中支',
                    }, {
                        id: 1,
                        name: '江苏锋哥团队',
                        upper:'宿迁中支',
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
                item.linkItems = [
                    {
                        key: 'MEMBERS',
                        desc: '成员管理',
                    }
                ]
                
                return item;
            })
        },
        handleTableCell(type, row, index) {
            console.log(777, type, row, index)
            switch (type) {
                case 'EDIT': 
                    this.$router.push({name: 'partment_add', query: {id: row.id, type: 'EDIT'}});
                    break;
                case 'DELETE': 
                    this.$confirm('确认删除？').then(_ => {
                        this.handlerDelete(type, row, index)
                    }).catch(_=>{})
                    break;
                case 'MEMBERS': 
                    this.$router.push({name: 'partment_member', query: {id: row.id}});
                    break;
            }
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
        // changePage(val) {
        //     this.searchForm.page = val;
        //     this. _query();
        //     console.log(`当前页: ${val}`);
        // },
    },
    components: {Table}
}
</script>

<style lang="scss" scoped>
.partment_list_page{

}

</style>