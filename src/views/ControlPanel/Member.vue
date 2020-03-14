<template>
    <div class="member_page">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchForm.user" placeholder="请输入姓名" style="width: 240px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="60" class="member_group">
            <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col" v-for="(item,i) in list" :key="i">
                <div class="card-panel" @click="clickCard(item)">
                    <img :src="item.img" alt="" class="picture">
                    <div class="sel_info">
                        <p class="justify">
                            <span>用户姓名：</span>
                            <span>{{item.name}}</span>
                        </p>
                        <p class="justify">
                            <span>身份证：</span>
                            <span>{{item.idNum}}</span>
                        </p>
                        <p class="justify">
                            <span>身份证认证</span>
                            <span>{{item.authTime}}</span>
                        </p>
                    </div>
                    <p class="justify" v-for="(device, j) in item.deviceInfo" :key="j">
                        <span>{{device.name}}</span>
                        <span>{{device.status}}</span>
                    </p>
                </div>
            </el-col>
        </el-row>


        <el-dialog title="报障内容" :visible.sync="showDetail" :center="true" :close-on-click-modal="true" :modal="true">
            <div class="dialogCon">
                <el-row class="card-panel">
                    <el-col :span="6"><img :src="detail.img" alt="" class="picture"></el-col>
                    <el-col :span="18" class="sel_info">
                        <p class="justify">
                            <span>用户姓名：</span>
                            <span>{{detail.name}}</span>
                        </p>
                        <p class="justify">
                            <span>身份证：</span>
                            <span>{{detail.idNum}}</span>
                        </p>
                        <p class="justify">
                            <span>身份证认证</span>
                            <span>{{detail.authTime}}</span>
                        </p>
                    </el-col>
                </el-row>
                <Table :columns="columns" :rows="detail.deviceInfo" :showOrder="true" @action="handlePrint"></Table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Table from '../../components/Table';
import ButtonCell from '../../components/ButtonCell';
export default {
    name: 'member',
    data() {
        return {
            showDetail: false,
            searchForm: {
                user: '',
                pageSize: 15,
                page: 1
            },
            list: [],
            detail: {},
            columns: [
                {
                    prop: 'name',
                    label: '设备'
                }, {
                    prop: 'time',
                    label: '时间'
                }, {
                    prop: 'status',
                    label: '状态'
                }, {
                    prop: 'id',
                    label: '操作',
                    component: ButtonCell
                }
            ],
            rows: []
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
                this.list = [
                    {
                        img: require('../../assets/images/p_header_2.jpg'),
                        name: '张*磊',
                        idNum: '3212**********2212',
                        authTime: '10分钟前',
                        deviceInfo: [
                            {
                                name: 'XX设备',
                                status: 1,
                                time: '2020-02-16 10:11:11',
                                id: 1
                            }, {
                                name: 'XX设备',
                                status: '检测中',
                                time: '2020-02-16 10:11:11',
                                id: 1
                            }, {
                                name: 'XX设备',
                                status: '检测失败',
                                time: '2020-02-16 10:11:11',
                                id: 1
                            }
                        ]
                    }, {
                        img: require('../../assets/images/p_header_2.jpg'),
                        name: '张*磊',
                        idNum: '3212**********2212',
                        authTime: '10分钟前',
                        deviceInfo: [
                            {
                                name: 'XX设备',
                                status: '检测成功',
                                time: '2020-02-16 10:11:11',
                                deviceId: 1
                            }, {
                                name: 'XX设备',
                                status: '检测中',
                                time: '2020-02-16 10:11:11',
                                deviceId: 2
                            }, {
                                name: 'XX设备',
                                status: '检测失败',
                                time: '2020-02-16 10:11:11',
                                deviceId: 3
                            }
                        ]
                    }, {
                        img: require('../../assets/images/p_header_2.jpg'),
                        name: '张*磊',
                        idNum: '3212**********2212',
                        authTime: '10分钟前',
                        deviceInfo: [
                            {
                                name: 'XX设备',
                                status: '检测成功',
                                time: '2020-02-16 10:11:11',
                                deviceId: 4
                            }, {
                                name: 'XX设备',
                                status: '检测中',
                                time: '2020-02-16 10:11:11',
                                deviceId: 5
                            }, {
                                name: 'XX设备',
                                status: '检测失败',
                                time: '2020-02-16 10:11:11',
                                deviceId: 6
                            }
                        ]
                    }, {
                        img: require('../../assets/images/p_header_2.jpg'),
                        name: '张*磊',
                        idNum: '3212**********2212',
                        authTime: '10分钟前',
                        deviceInfo: [
                            {
                                name: 'XX设备',
                                status: '检测成功',
                                time: '2020-02-16 10:11:11',
                                deviceId: 2
                            }, {
                                name: 'XX设备',
                                status: '检测中',
                                time: '2020-02-16 10:11:11',
                                deviceId: 2
                            }, {
                                name: 'XX设备',
                                status: '检测失败',
                                time: '2020-02-16 10:11:11',
                                deviceId: 2
                            }
                        ]
                    }, {
                        img: require('../../assets/images/p_header_2.jpg'),
                        name: '张*磊',
                        idNum: '3212**********2212',
                        authTime: '10分钟前',
                        deviceInfo: [
                            {
                                name: 'XX设备',
                                status: '检测成功',
                                time: '2020-02-16 10:11:11',
                                deviceId: 2
                            }, {
                                name: 'XX设备',
                                status: '检测中',
                                time: '2020-02-16 10:11:11',
                                deviceId: 2
                            }, {
                                name: 'XX设备',
                                status: '检测失败',
                                time: '2020-02-16 10:11:11',
                                deviceId: 2
                            }
                        ]
                    }
                ];
                
            }, 500);
            console.log('发送请求', this.searchForm);
        },
       
        clickCard(item) {
            this.showDetail = true;
            this.detail = item;
            this.detail.deviceInfo = this.detail.deviceInfo.map(item=> {
                // 添加操作btns
                item.items = [
                    {
                        key: 'PRINT',
                        desc: '打印'
                    }
                ]
                return item;
            })
        },

        handlePrint(type, row) {
            console.log(7777, type, row)
            if(type === 'PRINT') {
                this.showDetail = false;
            }
        }
    },
    components: { Table }
}
</script>

<style lang="scss" scoped>
.member_page{
    .member_group{
        // padding-top: 22px;
        .card-panel-col{
            margin-bottom: 24px;
            .picture{
                display: block;
                width: 100%;
            }
        }
        .card-panel {
            width: 220px;
            height: 380px;
            padding: 15px;
            background: #fff;
            border-radius:2px;
            box-shadow:0px 2px 8px 0px rgba(0,0,0,0.09);
            .sel_info{
                padding-top: 5px;
                padding-bottom: 12px;
                margin-bottom: 12px;
                border-bottom: solid 1px #f1f1f1;
                p{
                    font-weight: bold;
                    line-height: 2;
                }
            }
            .justify{
                overflow: hidden;
                span:first-child{
                    color: #999;
                    float: left;
                }
                span:last-child{
                    float: right;
                }
            }
        }
 
    }

    .dialogCon {
        .card-panel {
            padding-bottom: 15px;
            overflow: hidden;
            .picture{
                height:120px;
                margin: 0 auto;
            }
            .sel_info{
                float: left;
                p{
                    color: #000;
                    font-weight: bold;
                    line-height: 40px;
                }
            }
            .justify{
                overflow: hidden;
                span:first-child{
                    float: left;
                }
                span:last-child{
                    float: right;
                }
            }
        }
    }
}

</style>