<template>
    <div>
        <h1 class="pageTitle">事件触发规则</h1>
       <!-- tabs -->
        <el-tabs value="1" type="card">
            <el-tab-pane label="微信事件" name="1"></el-tab-pane>
        </el-tabs>
        <!-- tab content -->
        <div class="list-wrapper">
            <!-- 搜索form -->
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item>
                    <el-date-picker type="date" placeholder="触发时间" v-model="searchForm.date1" style="width: 150px;"></el-date-picker>
                    -
                    <el-date-picker type="date" placeholder="触发时间" v-model="searchForm.date2" style="width: 150px;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchForm.rule" placeholder="事件内容" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="searchForm.source" style="width: 170px;">
                        <el-option label="来源群" value="0"></el-option>
                        <el-option label="广州合作群" value="1"></el-option>
                        <el-option label="江苏保险群" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="searchForm.type" style="width: 170px;">
                        <el-option label="处理方案" value="0"></el-option>
                        <el-option label="内部知识库回复" value="1"></el-option>
                        <el-option label="调用知识库" value="2"></el-option>
                        <el-option label="转人工处理" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-button icon="el-icon-search" @click="_query" type="primary">搜索</el-button>
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
                <el-table-column prop="source" label="事件来源" width="240">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon" alt="" class="list_icon">
                        {{scope.row.source}}
                    </template>
                </el-table-column>
                <el-table-column prop="triggerTime" label="事件触发时间"></el-table-column>
                <el-table-column prop="catchTime" label="触发事件内容">
                    <template slot-scope="scope">
                        <el-link type="primary" :underline="false" @click="showReptileData(scope.row)">{{scope.row.triggerContent}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column  label="触发用" prop="user" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon2" alt="" class="list_icon">
                        {{scope.row.user}}
                    </template>
                </el-table-column>
                 <el-table-column prop="type" label="处理方案"></el-table-column>
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
        <reptile-data :form="reptileDialog"></reptile-data>
    </div>
</template>

<script>

import ReptileData from '@/components/ReptileData';

export default {
    name: 'weix_list',
    data() {
        return {
            searchForm: {
                date1: '',
                date2: '',
                source: '1',
                type: '2',
               rule: '',
               pageSize: 15,
               page: 1
            },
            reptileDialog: {
                dialogVisible: false
            },
           tableData: [
               {
                    source: '保险讨论',
                    triggerTime: '2019-03-08 23:12',
                    triggerContent: '老师，报了个问题，请处理。',
                    user: '王王小虎王小虎王',
                    type: '自动回复，老师，收到，请稍等。',
                    icon: require('@/assets/images/logo_1.jpg'),
                    icon2: require('@/assets/images/logo_2.jpg'),
                }, {
                    source: '保险讨论',
                    triggerTime: '2019-03-08 23:12',
                    triggerContent: '老师，报了个问题，请处理。',
                    user: '王王小虎王小虎王',
                    type: '自动回复，老师，收到，请稍等。',
                    icon: require('@/assets/images/logo_1.jpg'),
                    icon2: require('@/assets/images/logo_2.jpg'),
                }, {
                    source: '保险讨论',
                    triggerTime: '2019-03-08 23:12',
                    triggerContent: '老师，报了个问题，请处理。',
                    user: '王王小虎王小虎王',
                    type: '自动回复，老师，收到，请稍等。',
                    icon: require('@/assets/images/logo_1.jpg'),
                    icon2: require('@/assets/images/logo_2.jpg'),
                }, {
                    source: '保险讨论',
                    triggerTime: '2019-03-08 23:12',
                    triggerContent: '老师，报了个问题，请处理。',
                    user: '王王小虎王小虎王',
                    type: '自动回复，老师，收到，请稍等。',
                    icon: require('@/assets/images/logo_1.jpg'),
                    icon2: require('@/assets/images/logo_2.jpg'),
                }, {
                    source: '保险讨论',
                    triggerTime: '2019-03-08 23:12',
                    triggerContent: '老师，报了个问题，请处理。',
                    user: '王王小虎王小虎王',
                    type: '自动回复，老师，收到，请稍等。',
                    icon: require('@/assets/images/logo_1.jpg'),
                    icon2: require('@/assets/images/logo_2.jpg'),
                }, {
                    source: '保险讨论',
                    triggerTime: '2019-03-08 23:12',
                    triggerContent: '老师，报了个问题，请处理。',
                    user: '王王小虎王小虎王',
                    type: '自动回复，老师，收到，请稍等。',
                    icon: require('@/assets/images/logo_1.jpg'),
                    icon2: require('@/assets/images/logo_2.jpg'),
                }, {
                    source: '保险讨论',
                    triggerTime: '2019-03-08 23:12',
                    triggerContent: '老师，报了个问题，请处理。',
                    user: '王王小虎王小虎王',
                    type: '自动回复，老师，收到，请稍等。',
                    icon: require('@/assets/images/logo_1.jpg'),
                    icon2: require('@/assets/images/logo_2.jpg'),
                }, {
                    source: '保险讨论',
                    triggerTime: '2019-03-08 23:12',
                    triggerContent: '老师，报了个问题，请处理。',
                    user: '王王小虎王小虎王',
                    type: '自动回复，老师，收到，请稍等。',
                    icon: require('@/assets/images/logo_1.jpg'),
                    icon2: require('@/assets/images/logo_2.jpg'),
                }, {
                    source: '保险讨论',
                    triggerTime: '2019-03-08 23:12',
                    triggerContent: '老师，报了个问题，请处理。',
                    user: '王王小虎王小虎王',
                    type: '自动回复，老师，收到，请稍等。',
                    icon: require('@/assets/images/logo_1.jpg'),
                    icon2: require('@/assets/images/logo_2.jpg'),
                }, {
                    source: '保险讨论',
                    triggerTime: '2019-03-08 23:12',
                    triggerContent: '老师，报了个问题，请处理。',
                    user: '王王小虎王小虎王',
                    type: '自动回复，老师，收到，请稍等。',
                    icon: require('@/assets/images/logo_1.jpg'),
                    icon2: require('@/assets/images/logo_2.jpg'),
                }
            ]
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
        showReptileData(row) {
            this.reptileDialog.dialogVisible = true;
            this.reptileDialog.icon = row.icon;
            this.reptileDialog.source = row.source;
            this.reptileDialog.triggerTime = row.triggerTime;
            this.reptileDialog.chat = [{
                user: '0',
                time: '下午4:08',
                header: '@/assets/images/p_header.jpg',
                userName: '老王',
                msg: '我想跟你说你'
            }, {
                user: '1',
                header: '@/assets/images/p_header2.jpg',
                msg: '我也是'
            }, {
                user: '0',
                time: '下午4:08',
                header: '@/assets/images/p_header.jpg',
                userName: '老王',
                msg: '好我想跟你说你 好我想跟你说你好'
            }]
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
    },
    created() {
        this._query();
    },
    components: {ReptileData}
}
</script>

<style scoped>

</style>