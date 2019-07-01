<template>
    <div>
        <div class="card_wrapper mt25">
            <h3 class="card_title">数据传输服务</h3>
            <div class="card_cont">
                 <div class="fr">
                    <el-button type="primary" icon="el-icon-plus"  @click="operateHandle(null, 'add')">添加外网通道</el-button>
                </div>
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchForm.ip" placeholder="请输入外网IP" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
                </el-form>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border>
                    <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="url" label="外网URL"></el-table-column>
                    <el-table-column prop="path" label="本地路径"></el-table-column>
                    <el-table-column label="传输记录" align="center" width="108">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" @click="operateHandle(scope.row, 'transferRecord')">查看</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="日志" align="center" width="108">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" @click="operateHandle(scope.row, 'log')">查看</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" @click="operateHandle(scope.row, 'edit')">编辑</el-link>
                            <i class="seperator">|</i>
                            <el-popover
                                placement="top-end"
                                width="213"
                                :ref="`popover3${scope.$index}`"
                                trigger="click"
                                v-model="scope.row.popoverVisible">
                                <p style="padding-bottom:10px;"><i class="el-icon-warning"></i>你确定要删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" @click="handlePopover(`popover3${scope.$index}`)">取消</el-button>
                                    <el-button type="primary" size="mini" @click="operateHandle(scope.row, 'delete', `popover3${scope.$index}`)">确定</el-button>
                                </div>
                                <!-- <el-button type="text" @click="operateHandle(scope.row, 'delete')" :style="{color:scope.row.role==='管理员'?'#C0C4CC':'#F56C6C'}" :disabled="scope.row.role==='manager'">删除</el-button> -->
                                <el-button type="text" slot="reference" :style="{color:scope.row.role==='管理员'?'#C0C4CC':'#F56C6C'}" :disabled="scope.row.role==='manager'">删除</el-button>
                            </el-popover>
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
                    <span>名称：{{logoDialogInfo.name}}</span>
                    <span>外网URL：{{logoDialogInfo.url}}</span>
                    <span>路径：{{logoDialogInfo.path}}</span>
                </div>
                <div class="log">
                    {{logoDialogInfo.log}}
                </div>
             </div>
        </el-dialog>

        <el-dialog title="传输记录" :visible.sync="transferRecordDiolog.dialogVisible" :center="true" :close-on-click-modal="false" width="963px">
             <div class="dialog_content">
                <div class="log_info">
                    <span>名称：{{transferRecordDiolog.row.name}}</span>
                    <span>外网URL：{{transferRecordDiolog.row.url}}</span>
                    <span>路径：{{transferRecordDiolog.row.path}}</span>
                </div>
                <div class="transferRecord">
                    <el-table
                        ref="multipleTable" 
                        :data="transferRecordDiolog.tableDate"
                        border>
                        <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                        <el-table-column prop="reptileGroup" label="爬虫组"></el-table-column>
                        <el-table-column prop="file" label="传输文件"></el-table-column>
                        <el-table-column prop="times" label="传输记录数"></el-table-column>
                        <el-table-column prop="time" label="传输时间"></el-table-column>
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
    name: 'data_transfer',
    data() {
        return {
            searchForm: {
                ip: '',
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
            transferRecordDiolog: {
                dialogVisible: false,
                row: {
                    name: '',
                    url: '',
                    path: ''
                },
                tableDate: [
                    {
                        reptileGroup: '爬虫组',
                        file: 'SAD222.CSV',
                        times: '223',
                        time: '2019-03-08 23:12:00'
                    }, {
                        reptileGroup: '爬虫组',
                        file: 'SAD222.CSV',
                        times: '223',
                        time: '2019-03-08 23:12:00'
                    }, {
                        reptileGroup: '爬虫组',
                        file: 'SAD222.CSV',
                        times: '223',
                        time: '2019-03-08 23:12:00'
                    }, {
                        reptileGroup: '爬虫组',
                        file: 'SAD222.CSV',
                        times: '223',
                        time: '2019-03-08 23:12:00'
                    }, {
                        reptileGroup: '爬虫组',
                        file: 'SAD222.CSV',
                        times: '223',
                        time: '2019-03-08 23:12:00'
                    }
                ]
            },
            logoDialogVisible: false,
            logoDialogInfo: {},
            tableData: [
                {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 11111,
                    name: '应用名称',
                    icon: require('../../../assets/images/p_header.jpg'),
                    url: '10.10.1.10:80/post_user',
                    path: 'opt/act/dqw',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, 
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
        queryRecords(row) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                let result = Object.assign({}, this.transferRecordDiolog, {
                    dialogVisible: true,
                    row
                });
                this.transferRecordDiolog = result;
                console.log( this.transferRecordDiolog )
            }, 500);
            console.log('发送请求', this.searchForm);
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