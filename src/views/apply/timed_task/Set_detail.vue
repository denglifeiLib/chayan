<template>
    <div class="totalPage">
        <div class="card_wrapper mt25">
            <h3 class="card_title">定时任务配置</h3>
            <div class="card_cont" style="width: 780px;">
                <el-form  :model="searchForm" label-width="104px">
                    <el-form-item label="任务名称">
                        <el-input v-model="searchForm.taskName" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="采集频率">
                        <el-select v-model="searchForm.rate" placeholder="请选择活动区域" width="110px;">
                            <el-option label="每天" value="pd"></el-option>
                            <el-option label="N天" value="nd"></el-option>
                            <el-option label="每小时" value="ph"></el-option>
                            <el-option label="N小时" value="nd"></el-option>
                        </el-select>
                        <el-input-number v-model="searchForm.hour" controls-position="right" :min="1" :max="60" width="117"></el-input-number> 小时
                        <el-input-number v-model="searchForm.second" controls-position="right" :min="1" :max="60"></el-input-number> 分
                    </el-form-item>
                    <el-form-item label="爬虫服务">
                        <el-button icon="el-icon-search" @click="showChooseDialog()" plain>选择爬虫服务</el-button>
                        <ul class="apply_list">
                            <li v-for="(item,i) in applyList" :key="i">
                                <img :src="item.icon" alt="" class="list_icon">
                                {{item.name}}
                                <i class="fr el-icon-close"></i>
                            </li>
                        </ul>
                    </el-form-item>
                    <el-form-item label="数据处理服务">
                        <el-select v-model="searchForm.dataManage" placeholder="请选择数据处理服务" width="110px;">
                            <el-option :label="item.name" :value="item.id" v-for="(item,i) in applyList" :key="i">
                                <img :src="item.icon" alt="" class="list_icon">
                                {{item.name}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据传输服务">
                        <el-select v-model="searchForm.transferData" placeholder="请选择数据传输服务" width="110px;">
                            <el-option :label="item.label" :value="item.value" v-for="(item,i) in transferList" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="goBack()" plain>返回</el-button>
                        <el-button @click="save()" type="primary">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        
        <choose-reptile-applay :form="reptileDialog"></choose-reptile-applay>
    </div>
</template>

<script>
import ChooseReptileApplay from '../../../components/ChooseReptileApplay';
export default {
    name: 'timed_task_set',
    data() {
        return {
            reptileDialog: {
                dialogVisible: false,
                choosedModel: [
                    {
                        id: 1,
                        type: 'apply',
                        name: '代理服务',
                        icon: require('../../../assets/images/logo_1.jpg')
                    }, {
                        id: 2,
                        type: 'apply',
                        name: '代理服务',
                        icon: require('../../../assets/images/logo_1.jpg')
                    }
                ],
            },
            searchForm: {
                taskName: '',
                rate: '',
                hour: '1',
                second: '1',
                dataManage: '',
                transferData: '',
                pageSize: 15,
                page: 1
            },
            applyList: [
                {
                    id: 1,
                    name: '代理服务1',
                    icon: require('../../../assets/images/p_header.jpg')
                }, {
                    id: 11,
                    name: '代理服务2',
                    icon: require('../../../assets/images/p_header.jpg')
                }, {
                    id: 12,
                    name: '代理服务3',
                    icon: require('../../../assets/images/p_header.jpg')
                }, {
                    id: 13,
                    name: '代理服务4',
                    icon: require('../../../assets/images/p_header.jpg')
                }
            ],
            transferList: [
                {
                    label: '内网主机11',
                    value: '01'
                }, {
                    label: '内网主机22',
                    value: '02'
                }, {
                    label: '内网主机33',
                    value: '03'
                }, {
                    label: '内网主机44',
                    value: '04'
                }
            ],
            form: {
                dialogVisible: false,
                row: {}
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
        goBack() {
            this.$router.go(-1)
        },
        showDialog(row) {
            this.form = {
                dialogVisible: true,
                row
            }
        },
        save() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
            }, 500);
            console.log('发送请求');
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
        showChooseDialog() {
            this.$set(this.reptileDialog, 'dialogVisible', true);
        }
    },
    created() {
        this._query();
    },
    components: {ChooseReptileApplay}
}
</script>

<style lang="scss">
.card_cont{
    width: 780px;
    .apply_list{
        margin-top: 8px;
        padding: 0 10px;
        background: #F2F6FC;
        li{
            line-height: 38px;
            border-bottom: solid 1px #E4E7ED;
            img{
                width: 20px;
                height: 20px;
            }
            i{
                padding:12px;
                cursor: pointer;
            }
        }
    }
}
</style>