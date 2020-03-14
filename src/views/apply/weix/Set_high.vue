<template>
    <div>
        <h1 class="pageTitle">高频事件规则<el-button @click="ruleDialog.dialogVisible=true" type="primary">配置</el-button></h1>
        <div class="top_info">
            <el-row>
                <el-col :span="6">最小时间段： 20 分钟</el-col>
                <el-col :span="18">
                    <dl>
                        <dt>提醒消息发送手机： </dt>
                        <dd>15000999999、15000999999、15000999999、15000999999、15000999999、15000999999、5000999999、</dd>
                    </dl>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">最小时间段： 20 分钟</el-col>
                <el-col :span="18">
                    <dl>
                        <dt>提醒消息发送手机： </dt>
                        <dd>15000999999、15000999999、15000999999、15000999999、15000999999、15000999999、5000999999、</dd>
                    </dl>
                </el-col>
            </el-row>
        </div>
        <!-- tab content -->
        <div class="card_wrapper">
            <h3 class="card_title">高频触发历史</h3>
            <div class="card_cont">
                <!-- <pie-chart/> -->
                <!-- table列表 -->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border>
                    <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                    <el-table-column prop="eventsName" label="高频触发事件名称" width="240"></el-table-column>
                    <el-table-column prop="startTime" label="开始时间"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间"></el-table-column>
                    <el-table-column prop="triggerTimes" label="触发次数" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" @click="showReptileData(scope.row)">查看事件清单</el-link>
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

        <reptile-data :form="reptileDialog"></reptile-data>
        <high-event-rule :form="ruleDialog"></high-event-rule>
    </div>
</template>

<script>

import ReptileData from '@/components/ReptileData';
import HighEventRule from '@/components/HighEventRule';

export default {
    name: 'weix_set_high',
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
            ruleDialog: {
                dialogVisible: false,
                timeRange: 3,
                minTimes: 6,
                msg_tip: '',
                email_tip: ''
            },
           tableData: [
                {
                    eventsName: '高频触发事件名称',
                    startTime: '2019-03-08 23:12',
                    endTime: '2019-03-08 23:12',
                    triggerTimes: '3444'
                }, {
                    eventsName: '高频触发事件名称',
                    startTime: '2019-03-08 23:12',
                    endTime: '2019-03-08 23:12',
                    triggerTimes: '3444'
                }, {
                    eventsName: '高频触发事件名称',
                    startTime: '2019-03-08 23:12',
                    endTime: '2019-03-08 23:12',
                    triggerTimes: '3444'
                }, {
                    eventsName: '高频触发事件名称',
                    startTime: '2019-03-08 23:12',
                    endTime: '2019-03-08 23:12',
                    triggerTimes: '3444'
                }, {
                    eventsName: '高频触发事件名称',
                    startTime: '2019-03-08 23:12',
                    endTime: '2019-03-08 23:12',
                    triggerTimes: '3444'
                }, {
                    eventsName: '高频触发事件名称',
                    startTime: '2019-03-08 23:12',
                    endTime: '2019-03-08 23:12',
                    triggerTimes: '3444'
                }, {
                    eventsName: '高频触发事件名称',
                    startTime: '2019-03-08 23:12',
                    endTime: '2019-03-08 23:12',
                    triggerTimes: '3444'
                }, {
                    eventsName: '高频触发事件名称',
                    startTime: '2019-03-08 23:12',
                    endTime: '2019-03-08 23:12',
                    triggerTimes: '3444'
                }, {
                    eventsName: '高频触发事件名称',
                    startTime: '2019-03-08 23:12',
                    endTime: '2019-03-08 23:12',
                    triggerTimes: '3444'
                }, {
                    eventsName: '高频触发事件名称',
                    startTime: '2019-03-08 23:12',
                    endTime: '2019-03-08 23:12',
                    triggerTimes: '3444'
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
            this.reptileDialog.icon = require('@/assets/images/logo_1.jpg');
            this.reptileDialog.source = "保险讨论";
            this.reptileDialog.triggerTime = "2019-03-08 23:12";
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
    components: {ReptileData, HighEventRule}
}
</script>

<style lang="scss" scoped>
.pageTitle button{
    margin-left: 20px;
}
.top_info{
    padding: 10px 32px 10px;
    margin: -16px -24px 0 -24px;
    background: #fff;
    margin-bottom: 24px;
    color: #666;
    .el-row{
        padding-bottom: 15px;
        dl{
            display: flex;
            dt{
                flex-shrink: 0;
            }
        }
    }
}
</style>