<template>
    <div>
        <div class="card_wrapper mt25">
            <h3 class="card_title">应用管理</h3>
            <div class="card_cont">
                 <div class="fr">
                    <el-button type="primary" icon="el-icon-plus"  @click="operateHandle(null, 'add')">添加应用</el-button>
                </div>
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchForm.user" placeholder="请输入应用名称" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                    <el-table-column prop="supplyName" label="应用名称">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon" alt="" class="list_icon">
                            {{scope.row.supplyName}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="engine" label="主机"></el-table-column>
                    <el-table-column prop="path" label="路径"></el-table-column>
                    <el-table-column prop="port" label="端口"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <span :class="scope.row.status==='1'?'green':'yellow'">{{ ({'1': '运行中','0': '已停止'})[scope.row.status]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" @click="operateHandle(scope.row, 'log')">日志</el-link>
                            <i class="seperator">|</i>
                            <el-link type="primary" :underline="false" @click="operateHandle(scope.row, 'edit')">编辑</el-link>
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

         <el-dialog title="日志" :visible.sync="logoDialogVisible" :center="true" :close-on-click-modal="false" width="590px">
             <div class="dialog_content">
                <div class="log_info">
                    <span>应用： <img :src="logoDialogInfo.icon" alt="" class="list_icon">{{logoDialogInfo.supplyName}}</span>
                    <span>主机：{{logoDialogInfo.engine}}</span>
                    <span>端口：{{logoDialogInfo.port}}</span>
                    <span :class="logoDialogInfo.status==='1'?'green':'yellow'">状态：{{({'1': '运行中','0': '已停止'})[logoDialogInfo.status]}}</span>
                </div>
                <div class="log">
                    {{logoDialogInfo.log}}
                </div>
             </div>
        </el-dialog>

        <add-supply :form="addForm" @callback="_query"></add-supply>
    </div>
</template>

<script>

import AddSupply from '@/components/AddSupply';

export default {
    name: 'base_supply',
    data() {
        return {
            searchForm: {
                user: '',
                pageSize: 15,
                page: 1
            },
            addForm: {
                dialogVisible: false,
                row: {
                    supplyName: '',
                    icon: '',
                    engine: '',
                    path: '',
                    port: '',
                }
            },
            logoDialogVisible: false,
            logoDialogInfo: {},
            tableData: [
                {
                    id: 11111,
                    supplyName: '应用名称',
                    icon: require('../../assets/images/p_header.jpg'),
                    engine: '10.1.1.1',
                    path: 'opt/act/dqw',
                    port: '8888',
                    status: '0',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 222222,
                    supplyName: '应用名称',
                    icon: require('../../assets/images/p_header.jpg'),
                    engine: '10.1.1.1',
                    path: 'opt/act/dqw',
                    port: '8888',
                    status: '1',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 33333,
                    supplyName: '应用名称',
                    icon: require('../../assets/images/p_header.jpg'),
                    engine: '10.1.1.1',
                    path: 'opt/act/dqw',
                    port: '8888',
                    status: '1',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 44444,
                    supplyName: '应用名称',
                    icon: require('../../assets/images/p_header.jpg'),
                    engine: '10.1.1.1',
                    path: 'opt/act/dqw',
                    port: '8888',
                    status: '1',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 555555,
                    supplyName: '应用名称',
                    icon: require('../../assets/images/p_header.jpg'),
                    engine: '10.1.1.1',
                    path: 'opt/act/dqw',
                    port: '8888',
                    status: '1',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
                }, {
                    id: 66666,
                    supplyName: '应用名称',
                    icon: require('../../assets/images/p_header.jpg'),
                    engine: '10.1.1.1',
                    path: 'opt/act/dqw',
                    port: '8888',
                    status: '1',
                    log: '223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN" 223.104.145.144 - - &#9110/Jun/2019:12:43:32 +0800] "POST / HTTP/1.1" 200 748 "https://servicewechat.com/wx2faf6a433651f028/0/page-frame.html" "Mozilla/5.0 (Linux; Android 9; V1824BA Build/PKQ1.181216.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043C) Process/appbrand3 NetType/4G Language/zh_CN"'
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
        operateHandle(row, type) {
            console.log(row, type);
            if(type === 'log') {
                this.logoDialogVisible = true;
                this.logoDialogInfo = row;
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
    components: {AddSupply}
}
</script>

<style scoped lang="scss">
.red{
    color: #FF3636;
    &::before{
        content: ' ';
        display: inline-block;
        width:6px;
        height:6px;
        background: #FF3636;
        border-radius: 5px;
        vertical-align: middle;
        margin-right: 5px;
    }
}
.green{
    &::before{
        content: ' ';
        display: inline-block;
        width:6px;
        height:6px;
        background: #02E1A0;
        border-radius: 5px;
        vertical-align: middle;
        margin-right: 5px;
    }
}
.yellow{
    &::before{
        content: ' ';
        display: inline-block;
        width:6px;
        height:6px;
        background:#F0BD2B;
        border-radius: 5px;
        vertical-align: middle;
        margin-right: 5px;
    }
}
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
        color:rgba(220,223,230,1);
        line-height:17px;
        background:rgba(48,49,51,0.5);
        max-height: 500px;
        overflow-y: scroll;
    }
}
</style>