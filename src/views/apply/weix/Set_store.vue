<template>
    <div>
        <h1 class="pageTitle">知识库管理</h1>
         <div class="card_wrapper">
            <h3 class="card_title">知识库管理</h3>
            <div class="card_cont">
                <!-- 搜索form -->
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <el-form-item label="问题关键词：">
                        <el-input v-model="searchForm.rule" placeholder="请输入" size="medium" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" @click="_query" size="medium"  type="primary">搜索</el-button>
                    </el-form-item>
                </el-form>
                <!-- table列表 -->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                    <el-table-column label="问题" >
                        <template slot-scope="scope">
                            <!-- <p v-for="(item,i) in scope.row.questions" :key="i">{{item}}</p> -->
                            <p>{{scope.row.qa && scope.row.qa[0] && scope.row.qa[0]['question']}}</p>
                            <p>{{scope.row.qa && scope.row.qa[1] && scope.row.qa[1]['question']}}</p>
                            <p v-if="scope.row.qa && scope.row.qa[2]">{{scope.row.qa && scope.row.qa[2] && scope.row.qa[2]['question']}}...</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="回复">
                        <template slot-scope="scope">
                            <p>{{scope.row.qa && scope.row.qa[0] && scope.row.qa[0]['answer']}}</p>
                            <p>{{scope.row.qa && scope.row.qa[1] && scope.row.qa[1]['answer']}}</p>
                            <p v-if="scope.row.qa && scope.row.qa[2]">{{scope.row.qa && scope.row.qa[2] && scope.row.qa[2]['answer']}}...</p>
                        </template>
                    </el-table-column>
                    <el-table-column  label="状态" prop="status" align="center">
                        <template slot-scope="scope">
                            <el-switch :value="scope.row.status==='1'" active-color="#02E1A0"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operation" label="操作" width="144" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="operateHandle(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 翻页 -->
                <div class="mt24">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="3"
                        :page-size="5"
                        layout="total, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
            </div>
        </div>
        <qa-store :form="form"></qa-store>
    </div>
</template>

<script>

import QaStore from '@/components/QaStore';

export default {
    name: 'set_store',
    data() {
        return {
            searchForm: {
               rule: '',
               pageSize: 15,
               page: 1
           },
           form: {
                dialogVisible: false,
                row: []
            },
        }
    },
    methods: {
        _query() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        operateHandle(row) {
            console.log(row);
            this.form.dialogVisible = true;
            this.form.row = row;
        },
        handleSelectionChange(arr) {
            this.selectedRows = arr;
            console.log(arr);
        },
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.searchForm.page = 1;
            this. _query();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.searchForm.page = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },
        handlePopover(ref) {
            this.$refs[ref].doClose();
        },
    },
    created() {
        this._query();
        this.tableData = [
            {
                account: 'qwertyuiop123456789',
                qa: [
                    {
                        question: '问题1',
                        answer: 'answer1'
                    }, {
                        question: '问题2',
                        answer: 'answer2'
                    }, {
                        question: '问题3',
                        answer: 'answer3'
                    }, {
                        question: '问题4',
                        answer: 'answer4'
                    }, {
                        question: '问题5',
                        answer: 'answer5'
                    }, {
                        question: '问题6',
                        answer: 'answer6'
                    }
                ],
                status: '0'
            }, {
                account: 'qwertyuiop123456789',
                qa: [
                    {
                        question: '问题1',
                        answer: 'answer1'
                    }, {
                        question: '问题2',
                        answer: 'answer2'
                    }, {
                        question: '问题3',
                        answer: 'answer3'
                    }, {
                        question: '问题4',
                        answer: 'answer4'
                    }, {
                        question: '问题5',
                        answer: 'answer5'
                    }, {
                        question: '问题6',
                        answer: 'answer6'
                    }
                ],
                status: '1'
            }, {
                account: 'qwertyuiop123456789',
                qa: [
                    {
                        question: '问题1',
                        answer: 'answer1'
                    }, {
                        question: '问题2',
                        answer: 'answer2'
                    }, {
                        question: '问题3',
                        answer: 'answer3'
                    }, {
                        question: '问题4',
                        answer: 'answer4'
                    }, {
                        question: '问题5',
                        answer: 'answer5'
                    }, {
                        question: '问题6',
                        answer: 'answer6'
                    }
                ],
                status: '1'
            }, {
                account: 'qwertyuiop123456789',
                qa: [
                    {
                        question: '问题1',
                        answer: 'answer1'
                    }, {
                        question: '问题2',
                        answer: 'answer2'
                    }, {
                        question: '问题3',
                        answer: 'answer3'
                    }, {
                        question: '问题4',
                        answer: 'answer4'
                    }, {
                        question: '问题5',
                        answer: 'answer5'
                    }, {
                        question: '问题6',
                        answer: 'answer6'
                    }
                ],
                status: '1'
            }, {
                account: 'qwertyuiop123456789',
                qa: [
                    {
                        question: '问题1',
                        answer: 'answer1'
                    }, {
                        question: '问题2',
                        answer: 'answer2'
                    }, {
                        question: '问题3',
                        answer: 'answer3'
                    }, {
                        question: '问题4',
                        answer: 'answer4'
                    }, {
                        question: '问题5',
                        answer: 'answer5'
                    }, {
                        question: '问题6',
                        answer: 'answer6'
                    }
                ],
                status: '1'
            }, {
                account: 'qwertyuiop123456789',
                qa: [
                    {
                        question: '问题1',
                        answer: 'answer1'
                    }, {
                        question: '问题2',
                        answer: 'answer2'
                    }, {
                        question: '问题3',
                        answer: 'answer3'
                    }, {
                        question: '问题4',
                        answer: 'answer4'
                    }, {
                        question: '问题5',
                        answer: 'answer5'
                    }, {
                        question: '问题6',
                        answer: 'answer6'
                    }
                ],
                status: '1'
            }, {
                account: 'qwertyuiop123456789',
                qa: [
                    {
                        question: '问题1',
                        answer: 'answer1'
                    }, {
                        question: '问题2',
                        answer: 'answer2'
                    }, {
                        question: '问题3',
                        answer: 'answer3'
                    }, {
                        question: '问题4',
                        answer: 'answer4'
                    }, {
                        question: '问题5',
                        answer: 'answer5'
                    }, {
                        question: '问题6',
                        answer: 'answer6'
                    }
                ],
                status: '1'
            }, {
                account: 'qwertyuiop123456789',
                qa: [
                    {
                        question: '问题1',
                        answer: 'answer1'
                    }, {
                        question: '问题2',
                        answer: 'answer2'
                    }, {
                        question: '问题3',
                        answer: 'answer3'
                    }, {
                        question: '问题4',
                        answer: 'answer4'
                    }, {
                        question: '问题5',
                        answer: 'answer5'
                    }, {
                        question: '问题6',
                        answer: 'answer6'
                    }
                ],
                status: '1'
            }, {
                account: 'qwertyuiop123456789',
                qa: [
                    {
                        question: '问题1',
                        answer: 'answer1'
                    }, {
                        question: '问题2',
                        answer: 'answer2'
                    }, {
                        question: '问题3',
                        answer: 'answer3'
                    }, {
                        question: '问题4',
                        answer: 'answer4'
                    }, {
                        question: '问题5',
                        answer: 'answer5'
                    }, {
                        question: '问题6',
                        answer: 'answer6'
                    }
                ],
                status: '1'
            }, {
                account: 'qwertyuiop123456789',
                qa: [
                    {
                        question: '问题1',
                        answer: 'answer1'
                    }, {
                        question: '问题2',
                        answer: 'answer2'
                    }, {
                        question: '问题3',
                        answer: 'answer3'
                    }, {
                        question: '问题4',
                        answer: 'answer4'
                    }, {
                        question: '问题5',
                        answer: 'answer5'
                    }, {
                        question: '问题6',
                        answer: 'answer6'
                    }
                ],
                status: '1'
            }
        ];
    },
    components: {QaStore}
}
</script>

<style scoped>

</style>