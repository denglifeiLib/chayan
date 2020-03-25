<template>
    <div class="device_page">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchForm.user" placeholder="请输入设备名" style="width: 240px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="60" class="device_group">
            <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col" v-for="(item,i) in list" :key="i">
                <div class="card-panel" @click="clickCard(item)">
                    <img :src="item.img" alt="" class="picture">
                    <div class="sel_info">
                        <p class="name ellipsis2">{{item.name}}</p>
                        <p class="code grey">{{item.code}}</p>
                    </div>
                    <p class="status" v-if="item.status === '0'"><i class="el-icon-video-pause black icon"></i><span>休息中</span></p>
                    <p class="status" v-if="item.status === '1'"><span class="green_s icon"></span><span>运营中</span></p>
                    <p class="status" v-if="item.status === '2'"><i class="el-icon-error danger icon" ></i><span>已报修</span></p>
                    <p class="number">今日使用人数：<span>{{item.useNum}}</span></p>
                    <p class="number">今日检测次数：<span>{{item.checkNum}}</span></p>
                    <p class="number">今日成功次数：<span>{{item.successNum}}</span></p>
                </div>
                <el-button @click="showFormDialog(item)" style="width:220px;margin-top:10px;" :disabled="item.status === '2'" v-if="role !=='manager'">故障报修</el-button>
            </el-col>
        </el-row>

        <!-- 查看保修记录 -->
        <el-dialog title="报障内容" :visible.sync="showDetail" :center="true" :close-on-click-modal="true" :modal="true">
            <div class="codeEditDialogCon">
                <p v-for="(item,i) in troubleList" :key="i">{{i+1}}、{{item}}</p>
            </div>
        </el-dialog>

        <!-- 提交保修信息 -->
        <el-dialog :title="`${row.name}--故障报修`" :visible.sync="showForm" :center="true" :close-on-click-modal="true" :modal="true">
            <el-form ref="form" :model="row">
                <el-form-item prop="content" :rules="[{ required: true, message: '故障情况不能为空'}]">
                    <el-input type="textarea" placeholder="简单说明故障情况" v-model="row.content" :rows="10"></el-input>
                </el-form-item>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="showForm=false">取消</el-button>
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'device',
    data() {
        return {
            role: '', //manager
            showDetail: false,
            showForm: false,
            searchForm: {
                user: '',
                pageSize: 15,
                page: 1
            },
            list: [],
            troubleList: [],
            row: {}
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
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计血压计血压计血压计血压计血压计血压计血压计',
                        code: 'XYJ-000001（编码）',
                        status: '0', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '1', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '0', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '2', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }, {
                        img: require('../../assets/images/p_header.jpg'),
                        name: '血压计（设备名）',
                        code: 'XYJ-000001（编码）',
                        status: '1', // 0 休息中 1 运营中 2 已报修
                        useNum: 4545,
                        checkNum: 389,
                        successNum: 754
                    }
                ];
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        queryTroubleList(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                this.troubleList = [
                    'fsfsfsdfsdfsdf',
                    'XXXXXXXXXXXX'
                ];
                loading.close();
                callback && callback()
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        clickCard(item) {
            if(item.status === '2') {
                this.queryTroubleList(()=> {
                    this.showDetail = true;
                })
            }
        },
        showFormDialog(item){
            this.showForm = true;
            this.row = item;
        },
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const loading = this.$loading({background:'rgba(0,0,0,0)'});
                    setTimeout(() => {
                        this.showForm = false;
                        this.row = {};
                        loading.close();
                    }, 500);
                    console.log('发送请求');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.device_page{
    .device_group{
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
                height: 80px;
            }
            .name{
                // padding-top: 158px;
                font-size:16px;
                color:rgba(0,0,0,0.85);
                line-height:1.5;
            }
        }
        .status{
            margin-bottom: 12px;
            font-size: 16px;
            *{
                vertical-align: middle;
            }
            .icon{
                margin-right: 15px;
            }
        }
        .number{
            color: #999;
        }
        .number span{
            // float: right;
            color: #333;
        }
    }
    .codeEditDialogCon p{
        padding-bottom: 10px;
    }
}

</style>