<template>
    <div>
        <div class="card_wrapper mt25">
            <h3 class="card_title">
                任务运行清单
                <el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block">
                    <el-breadcrumb-item v-for="(item,i) in breadcrumb" :key="i">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
            </h3>
            <div class="card_cont">
                <!-- 搜索form -->
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" v-if="!showGroupDetail">
                    <el-form-item>
                        <el-select v-model="searchForm.runStatus" style="width: 170px;" placeholder="运行状态">
                            <el-option label="待执行" value="0"></el-option>
                            <el-option label="执行中" value="1"></el-option>
                            <el-option label="执行完毕" value="2"></el-option>
                            <el-option label="审核完毕" value="3"></el-option>
                            <el-option label="下发中" value="4"></el-option>
                            <el-option label="下发完毕" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="searchForm.runResult" style="width: 170px;" placeholder="执行结果状态">
                            <el-option label="正确" value="0"></el-option>
                            <el-option label="告警" value="1"></el-option>
                            <el-option label="错误" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searchForm.taskName" placeholder="任务名称" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker type="date" placeholder="执行时间" v-model="searchForm.date1" style="width: 150px;"></el-date-picker>
                        -
                        <el-date-picker type="date" placeholder="执行时间" v-model="searchForm.date2" style="width: 150px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" @click="_query" type="primary">搜索</el-button>
                    </el-form-item> 
                </el-form>
                <el-button type="primary" size="medium" icon="el-icon-arrow-left" @click="goBack()" v-if="showGroupDetail" class="back">返回</el-button>
                <div class="mb12">
                    <el-button size="mini" @click="handlerRows('1')" v-if="!showGroupDetail" class="back">批量选中审核通过</el-button>
                    <el-button size="mini" @click="handlerRows('2')" v-if="!showGroupDetail" class="back">全部任务审核通过</el-button>
                    <el-button size="mini" @click="handlerRows('3')" v-if="showGroupDetail" class="back mt25">选中批量执行</el-button>
                </div>

                <el-table
                    ref="multipleTable"
                    :data="showGroupDetail ? detailData : tableData"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                    <el-table-column prop="startTime" label="任务开始时间"></el-table-column>
                    <el-table-column prop="taskName" label="任务名称">
                        <template slot-scope="scope">
                            <img :src="scope.row.type==='group'?file:scope.row.icon" alt="" class="list_icon">
                            {{scope.row.taskName}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="dataNum" label="采集数据" align="center"></el-table-column>
                    <el-table-column prop="runStatus" label="运行状态" align="center">
                        <template slot-scope="scope">
                            {{{'0': '运行状态 ', '1': '待执行', '2': '执行中', '3': '执行完毕', '4': '审核完毕', '5': '下发中', '6': '下发完毕'}[scope.row.runStatus]}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="runResult" label="执行结果" align="center">
                        <template slot-scope="scope">
                            <span :class="{'0': 'green ', '1': 'orange', '2': 'red'}[scope.row.runResult]">{{{'0': '正确 ', '1': '告警', '2': '错误'}[scope.row.runResult]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="查看日志" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" @click="operateHandle(scope.row, 'log')">查看</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="查看数据" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" @click="operateHandle(scope.row, 'transferRecord')">查看</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" @click="operateHandle(scope.row, 'operate')">再次执行</el-link>
                            <i class="seperator">|</i>
                            <el-link type="primary" :underline="false" @click="operateHandle(scope.row, 'operate')">审核通过</el-link>
                            <i class="seperator">|</i>
                            <el-link type="primary" :underline="false"  @click="goDetail(scope.row)" v-if="scope.row.type==='group'">查看组内运行情况</el-link>
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

         <el-dialog title="日志" :visible.sync="logoDialogVisible" :center="true" :close-on-click-modal="false" width="963px">
             <div class="dialog_content">
                <div class="log_info">
                    <span>任务：<img :src="logoDialogInfo.type==='group'?file:logoDialogInfo.icon" alt="" class="list_icon">{{logoDialogInfo.taskName}}</span>
                    <span>时间：{{logoDialogInfo.startTime}}</span>
                </div>
                <div class="log">
                    {{logoDialogInfo.log}}
                </div>
             </div>
        </el-dialog>

        <el-dialog title="传输记录" :visible.sync="reptileRecordDiolog.dialogVisible" :center="true" :close-on-click-modal="false" width="1127px">
             <div class="dialog_content">
                <div class="log_info">
                    <span>爬虫任务：<img :src="logoDialogInfo.type==='group'?file:logoDialogInfo.icon" alt="" class="list_icon">{{logoDialogInfo.taskName}}</span>
                </div>
                <div class="transferRecord">
                    <el-table
                        ref="multipleTable" 
                        :data="reptileRecordDiolog.tableDate"
                        border
                        width="100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" align="center"></el-table-column>
                        <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                        <el-table-column prop="title" label="标题" width="134"></el-table-column>
                        <el-table-column prop="time" label="发布时间" width="157"></el-table-column>
                        <el-table-column prop="content" label="内容"></el-table-column>
                        <el-table-column prop="unit" label="处罚单位" width="132"></el-table-column>
                        <el-table-column prop="time2" label="数据抓取时间" width="157"></el-table-column>
                        <el-table-column prop="time3" label="数据下发时间" width="157"></el-table-column>
                    </el-table>
                </div>
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
        </el-dialog>

        <add-entry :form="addForm" @callback="_query"></add-entry>
    </div>
</template>

<script>

import AddEntry from '@/components/AddEntry';

export default {
    name: 'timed_task_list',
    data() {
        return {
            file:require('../../../assets/images/p_file.png'),
            breadcrumb: ['全部'],
            showGroupDetail: false,
            searchForm: {
                runStatus: '',
                runResult: '',
                taskName: '',
                date1: '',
                date2: '',
                pageSize: 15,
                page: 1
            },
            addForm: {
                dialogVisible: false,
                row: {
                    name: '',
                    url: '',
                    path: ''
                }
            },
            reptileRecordDiolog: {
                dialogVisible: false,
                row: {
                    name: '',
                    url: '',
                    path: ''
                },
                tableDate: [
                    {
                        title: '保险讨论群',
                        time: '2019-03-08 23:12',
                        time2: '2019-03-08 23:12',
                        time3: '2019-03-08 23:12',
                        content: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        unit: 'xx保险',
                    }, {
                        title: '保险讨论群',
                        time: '2019-03-08 23:12',
                        time2: '2019-03-08 23:12',
                        time3: '2019-03-08 23:12',
                        content: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        unit: 'xx保险',
                    }, {
                        title: '保险讨论群',
                        time: '2019-03-08 23:12',
                        time2: '2019-03-08 23:12',
                        time3: '2019-03-08 23:12',
                        content: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        unit: 'xx保险',
                    }, {
                        title: '保险讨论群',
                        time: '2019-03-08 23:12',
                        time2: '2019-03-08 23:12',
                        time3: '2019-03-08 23:12',
                        content: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        unit: 'xx保险',
                    }, {
                        title: '保险讨论群',
                        time: '2019-03-08 23:12',
                        time2: '2019-03-08 23:12',
                        time3: '2019-03-08 23:12',
                        content: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        unit: 'xx保险',
                    }, {
                        title: '保险讨论群',
                        time: '2019-03-08 23:12',
                        time2: '2019-03-08 23:12',
                        time3: '2019-03-08 23:12',
                        content: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        unit: 'xx保险',
                    }
                ]
            },
            logoDialogVisible: false,
            logoDialogInfo: {},
            tableData: [
                {
                    id: 11111,
                    type: 'group',
                    startTime: '2019-03-08 23:12',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '0',
                    runResult: '1',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 223,
                    startTime: '2019-03-08 23:12',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '2',
                    runResult: '1',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    startTime: '应用名称',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '1',
                    runResult: '1',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 22,
                    startTime: '2019-03-08 23:12',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '3',
                    runResult: '2',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 33,
                    startTime: '2019-03-08 23:12',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '4',
                    runResult: '0'
                }, {
                    id: 44,
                    startTime: '应用名称',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '5',
                    runResult: '0',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 55,
                    startTime: '应用名称',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '3',
                    runResult: '1',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 66,
                    startTime: '2019-03-08 23:12',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '5',
                    runResult: '2',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 66,
                    startTime: '2019-03-08 23:12',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '6',
                    runResult: '2',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, 
            ],
            detailData: [
                {
                    id: 22,
                    startTime: '2019-03-08 23:12',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '3',
                    runResult: '2',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 33,
                    startTime: '2019-03-08 23:12',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '4',
                    runResult: '0'
                }, {
                    id: 44,
                    startTime: '应用名称',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '5',
                    runResult: '0',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 55,
                    startTime: '应用名称',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '3',
                    runResult: '1',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 66,
                    startTime: '2019-03-08 23:12',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '5',
                    runResult: '2',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 66,
                    startTime: '2019-03-08 23:12',
                    taskName: '应用名称',
                    dataNum: '22',
                    icon: require('../../../assets/images/p_header.jpg'),
                    runStatus: '6',
                    runResult: '2',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, 
            ],
        }
    },
    created(){
        this._query();
    },
    methods: {
        _query() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        queryRecords(row) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                let result = Object.assign({}, this.reptileRecordDiolog, {
                    dialogVisible: true,
                    row
                });
                this.reptileRecordDiolog = result;
                console.log( this.reptileRecordDiolog )
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        goDetail(row) {
            // if(row.type !== 'group')return;
            this.breadcrumb.push(row.taskName);
            this.showGroupDetail = true;
            this._query(row);
        },
        goBack() {
            this.showGroupDetail = false;
            this.breadcrumb = ['全部'];
        },
        operateHandle(row, type, ref) {
            console.log(row, type);
            if(type === 'log') {
                this.logoDialogVisible = true;
                this.logoDialogInfo = row;
            }
            if(type === 'transferRecord') {
                this.queryRecords(row)
            }
            if(type === 'edit') {
                this.$set(this.addForm, 'dialogVisible', true);
                this.$set(this.addForm, 'row', row);
            }
            if(type === 'add') {
                this.$set(this.addForm, 'dialogVisible', true);
                this.$set(this.addForm, 'row', {
                    supplyName: '',
                    icon: '',
                    engine: '',
                    path: '',
                    port: '',
                })
            }
            if(type === 'delete') {
                this.delete(row, ref)
            }
        },
        delete(row, ref) {
            console.log(5555, row);
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                console.log('发送请求', row);
                loading.close();
                this.$refs[ref].doClose();
            }, 500);

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
        handleSelectionChange(arr) {
            this.selectedRows = arr;
            console.log(arr);
        },
        handlerRows(type) {
             console.log(type);
        }
    },
    components: {AddEntry}
}
</script>

<style scoped lang="scss">

.dialog_content{
    .log_info{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .log{
        margin-top: 15px;
        padding: 22px 31px;
        width:100%;
        height: 367px;
        color:rgba(220,223,230,1);
        line-height:17px;
        background:#606266;
        max-height: 500px;
        overflow-y: scroll;
    }
}
.transferRecord{
    margin-top: 16px;
}

</style>