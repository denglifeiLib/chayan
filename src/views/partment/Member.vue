<template>
<div class="member_list_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">
            部门分级设置 <span class="subtitle">成员管理</span>
            <el-button @click="$router.push({name: 'partment_list'})" class="fr" size="mini">返回</el-button>
        </h3> 
        <div class="card_cont">
            <div class="flex_box actionsEle">
                <span>部门名称：江苏分公司</span>
                 <el-link type="primary" href="">上传模板下载</el-link>
                 <el-upload
                    class="upload-demo"
                    ref="upload"
                    action=""
                    :show-file-list="false"
                    :on-change="handlePreview"
                    :auto-upload="false">
                    <el-button slot="trigger" size="mini" type="primary">批量上传</el-button>
                </el-upload>
                 <el-button @click="$router.push({name: 'partment_add_member', query: {type: 'ADD'}})" class="" size="mini">新增成员</el-button>
            </div>
            <Table :columns="columns" :rows="rows" class="mt25" @action="handleTableCell"></Table>
        </div>
       
    </div>
</div>
</template>

<script>
import Table from '@/components/Table';
import ButtonCell from '@/components/ButtonCell';
export default {
    name: 'member_list_page',
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
                    prop: 'code',
                    label: '成员工号'
                }, {
                    prop: 'pwd',
                    label: '密码'
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
                        code: '4544455488',
                        pwd:'112233',
                    }, {
                        id: 1,
                        code: '4544455488',
                        pwd:'112233',
                    }, {
                        id: 1,
                        code: '4544455488',
                        pwd:'112233',
                    }, {
                        id: 1,
                        code: '4544455488',
                        pwd:'112233',
                    }, {
                        id: 1,
                        code: '4544455488',
                        pwd:'112233',
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
                    this.$router.push({name: 'partment_add_member', query: {type: 'EDIT', id: row.id}})
                    break;
                case 'DELETE': 
                    break;
                case 'MEMBERS': 
                    break;
            }
        },
        handlePreview(file) {
            console.log(file);
        }
    },
    components: {Table}
}
</script>

<style lang="scss" scoped>
.member_list_page{
    .actionsEle > *{
       margin-right: 25px;
    }
}

</style>