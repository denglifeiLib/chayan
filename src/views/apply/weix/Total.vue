<template>
    <div class="totalPage">
        <h1 class="pageTitle">统计</h1>
        <!-- tab content -->
        <div class="list-wrapper">
            <el-tabs v-model="activeName">
                <el-tab-pane label="日报表" name="1"></el-tab-pane>
                <el-tab-pane label="周报表" name="2"></el-tab-pane>
                <el-tab-pane label="月报表" name="3"></el-tab-pane>
                <el-tab-pane label="事件统计" name="4"></el-tab-pane>
                <el-tab-pane label="群统计" name="5"></el-tab-pane>
            </el-tabs>
            <div class="fr" style="margin-top:20px;">
                <el-button type="primary" plain icon="el-icon-download" @click="down">数据导出</el-button>
            </div>
            <el-form :inline="true" :model="dayWeekForm" class="demo-form-inline" v-if="activeName==='1'||activeName==='2'">
                <el-form-item>
                    <el-date-picker type="date" placeholder="时间选择" v-model="dayWeekForm.date" style="width: 150px;"></el-date-picker>
                </el-form-item>
                <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
            </el-form>
            <el-form :inline="true" :model="monthForm" class="demo-form-inline" v-if="activeName==='3'">
                <el-form-item>
                    <el-select v-model="monthForm.month" placeholder="请选择" multiple>
                        <el-option v-for="(item,i) in allMonth" :key="i" :value="item" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-button icon="el-icon-search" @click="_query('monthForm')" type="primary">搜索</el-button>
            </el-form>
            <el-form :inline="true" :model="eventForm" class="demo-form-inline" v-if="activeName==='4'||activeName==='5'">
                <el-form-item>
                    <el-select v-model="eventForm.rule" placeholder="请选择" multiple>
                        <el-option v-for="(item,i) in allMonth" :key="i" :value="item" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="eventForm.dateRange" placeholder="请选择" @change="dataRangeChange">
                        <el-option v-for="(item,i) in rangeTime" :key="i" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker type="date" placeholder="触发时间" v-model="eventForm.startDate" style="width: 150px;" :disabled="eventForm.dateRange!=='3'"></el-date-picker>
                    -
                    <el-date-picker type="date" placeholder="触发时间" v-model="eventForm.endDate" style="width: 150px;" :disabled="eventForm.dateRange!=='3'"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="_query('eventForm')" type="primary">搜索</el-button>
                </el-form-item>
            </el-form>
            
            <!-- table列表 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                row-key="id"
                border  v-if="activeName!=='4'&& activeName!=='5'">
                <el-table-column prop="time" label="时间" ></el-table-column>
                <el-table-column prop="groupNum" label="群数量" ></el-table-column>
                <el-table-column prop="personNum" label="覆盖人数" ></el-table-column>
                <el-table-column prop="eventRuleNum" label="事件规则数" ></el-table-column>
                <el-table-column prop="triggerNum" label="触发次数"></el-table-column>
                <el-table-column prop="autoResponNum" label="自动回复次数"></el-table-column>
                <el-table-column prop="manualNum" label="人工回复次数"></el-table-column>
                <el-table-column prop="highNum" label="高频次数"></el-table-column>
            </el-table>
            <el-table
                ref="multipleTable3"
                :data="tableData"
                tooltip-effect="dark"
                row-key="id+a"
                style="width: 100%"
                border  v-if="activeName==='4'||activeName==='5'">
                <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="weixGroup" label="微信群">
                    <template slot-scope="scope">
                        <img :src="scope.row.weixGroup.icon" alt="" class="list_icon">
                        {{scope.row.weixGroup.name}}
                    </template>
                </el-table-column>
                <el-table-column prop="triggerNum" label="触发次数"></el-table-column>
                <el-table-column prop="autoResponNum" label="自动回复次数"></el-table-column>
                <el-table-column prop="highNum" label="高频次数"></el-table-column>
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
import moment from 'moment';
console.log(3333333, moment().format('YYYY-MM-DD'), moment().subtract(7, 'days').format('YYYY-MM-DD'))

export default {
    name: 'weix_set_total',
    data() {
        return {
            activeName: '1',
            dayWeekForm: {
                date: '',
                pageSize: 15,
                page: 1
            },
            monthForm: {
                checkAll: false,
                month: '',
                pageSize: 15,
                page: 1
            },
            eventForm: {
                startDate: '',
                endDate: '',
                dateRange: '',
                rule: '',
                pageSize: 15,
                page: 1
            },
            groupForm: {
                date1: '',
                date2: '',
                source: '1',
                type: '2',
               rule: '',
               pageSize: 15,
               page: 1
            },
            allMonth: [ '全选','2019-01','2019-02' ,'2019-03','2019-04','2019-05', '2019-06'],
            eventRules: [
                {
                    value: '0',
                    label: 'fdsfsdfsd'
                }, {
                    value: '1',
                    label: 'fddddddd'
                }, {
                    value: '2',
                    label: 'ggggggg'
                }, {
                    value: '3',
                    label: 'rrrrrr'
                }
            ],
            rangeTime: [
                {
                    value: '0',
                    label: '今天'
                }, {
                    value: '1',
                    label: '最近7天'
                }, {
                    value: '2',
                    label: '最近30天'
                }, {
                    value: '3',
                    label: '自定义'
                }
            ],
            reptileDialog: {
                dialogVisible: false
            },
            tableData: [
                {
                    id: 54,
                    time: '2019-03-23',
                    groupNum: '444444',
                    personNum: '444444',
                    eventRuleNum: '444444',
                    triggerNum: '444444',
                    manualNum: '444444',
                    autoResponNum: '2222',
                    highNum: '444444',
                    weixGroup: {
                        icon: require('@/assets/images/logo_1.jpg'),
                        name: '保险讨论'
                    }
                }, {
                    id: 1,
                    time: '2019-03-23',
                    groupNum: '444444',
                    personNum: '444444',
                    eventRuleNum: '444444',
                    triggerNum: '444444',
                    manualNum: '444444',
                    autoResponNum: '2222',
                    highNum: '444444',
                    weixGroup: {
                        icon: require('@/assets/images/logo_1.jpg'),
                        name: '保险讨论'
                    }
                }, {
                    id: 2,
                    time: '2019-03-23',
                    groupNum: '444444',
                    personNum: '444444',
                    eventRuleNum: '444444',
                    triggerNum: '444444',
                    manualNum: '444444',
                    autoResponNum: '2222',
                    highNum: '444444',
                    weixGroup: {
                        icon: require('@/assets/images/logo_1.jpg'),
                        name: '保险讨论'
                    }
                }, {
                    id: 3,
                    time: '2019-03-23',
                    groupNum: '444444',
                    personNum: '444444',
                    eventRuleNum: '444444',
                    triggerNum: '444444',
                    manualNum: '444444',
                    autoResponNum: '2222',
                    highNum: '444444',
                    weixGroup: {
                        icon: require('@/assets/images/logo_1.jpg'),
                        name: '保险讨论'
                    }
                }, {
                    id: 4,
                    time: '2019-03-23',
                    groupNum: '444444',
                    personNum: '444444',
                    eventRuleNum: '444444',
                    triggerNum: '444444',
                    manualNum: '444444',
                    autoResponNum: '2222',
                    highNum: '444444',
                    weixGroup: {
                        icon: require('@/assets/images/logo_1.jpg'),
                        name: '保险讨论'
                    }
                }, {
                    id: 5,
                    time: '2019-03-23',
                    groupNum: '444444',
                    personNum: '444444',
                    eventRuleNum: '444444',
                    triggerNum: '444444',
                    manualNum: '444444',
                    autoResponNum: '2222',
                    highNum: '444444',
                    weixGroup: {
                        icon: require('@/assets/images/logo_1.jpg'),
                        name: '保险讨论'
                    }
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
            console.log('发送请求', this.dayWeekForm);
        },
        down() {
            console.log('download')
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
        dataRangeChange(val) {
            // this.selectedRows = arr;
            // rangeTimeVal: [moment().format('YYYY-MM-DD'), moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(30, 'days').format('YYYY-MM-DD')],
            switch(val) {
                case '0':
                    this.$set(this.eventForm, 'startDate', moment().format('YYYY-MM-DD'));
                    this.eventForm.endDate = moment().format('YYYY-MM-DD');
                    break;
                case '1':
                    this.eventForm.startDate = moment().format('YYYY-MM-DD');
                    this.eventForm.endDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
                    break;
                case '2':
                    this.eventForm.startDate = moment().format('YYYY-MM-DD');
                    this.eventForm.endDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
                    break;
                case '3':
                    this.eventForm.startDate = '';
                    this.eventForm.endDate = '';
                    break;
                default:
                    break;
            }

        },
        handleSizeChange(val) {
            this.dayWeekForm.pageSize = val;
            this.dayWeekForm.page = 1;
            this. _query();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.dayWeekForm.page = val;
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

<style lang="scss">
.totalPage{
    .demo-form-inline{
        margin-top: 20px;
    }
    .el-tabs--top{
        margin-left: -32px;
        margin-right: -32px;
        margin-top: -20px;
        
    }
    .el-tabs__nav-scroll{
        padding-left: 20px;
    }
    .el-tabs__item.is-active {
        background: transparent;
    }
}
</style>