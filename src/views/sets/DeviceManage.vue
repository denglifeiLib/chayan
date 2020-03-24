<template>
    <div class="set_device_page">
        <div class="card_wrapper mt25">
            
            <div class="card_cont">
                <div class="fr">
                    <el-button type="primary" icon="el-icon-plus"  @click="operateHandle">添加设备</el-button>
                </div>
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchForm.user" placeholder="设备名称" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" @click="_query('dayWeekForm')" type="primary">搜索</el-button>
                    </el-form-item>
                </el-form>
                
                <!-- table -->
                <Table 
                    :columns="columns" 
                    :rows="rows" 
                    :showOrder="true" 
                    :showSelect="true" 
                    @action="handleTableCell" 
                    @handleSelectionChange="handleSelectionChange"
                ></Table>

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

        <!-- 新增/编辑弹窗 -->
        <el-dialog :title="`场地设备管理 / ${type === 'add' ?'新增':'编辑'}场地设备`" :visible.sync="dialogVisible" :center="true" :close-on-click-modal="false">
            <el-form :inline="true" :model="dialogForm" class="demo-form-inline"  label-width="115px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="设备名称：">
                            <el-input v-model="dialogForm.name" placeholder="请输入设备名称" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="设备编码：">
                            <el-input v-model="dialogForm.code" placeholder="请输入设备编码" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="厂家：">
                            <el-input v-model="dialogForm.producer" placeholder="请输入厂家" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="连接方式：">
                            <el-radio-group v-model="dialogForm.contactWay">
                                <el-radio label="HTTP">HTTP</el-radio>
                                <el-radio label="文件">文件</el-radio>
                                <el-radio label="蓝牙">蓝牙</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="连接内容：">
                            <el-input v-model="dialogForm.content" placeholder="请输入连接内容" type="textarea" size="medium"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="设备图片：">
                            <el-upload
                                action="#"
                                list-type="picture-card"
                                :file-list="dialogForm.deviceImgs || []"
                                :auto-upload="false"
                                :on-change="(file, filelist)=> {fileChange(file, filelist, 'deviceImgs')}"
                                :on-remove="(file, filelist)=> {fileChange(file, filelist, 'deviceImgs')}">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item> 
                        <el-form-item label="设备操作手册：">
                            <el-upload
                                action="#"
                                list-type="picture-card"
                                :file-list="dialogForm.instructionImgs || []"
                                :auto-upload="false"
                                :on-change="(file, filelist)=> {fileChange(file, filelist, 'instructionImgs')}"
                                :on-remove="(file, filelist)=> {fileChange(file, filelist, 'instructionImgs')}">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item> 
                    </el-col>
                </el-row>
                
            </el-form>

            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="close">返回</el-button> -->
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
import Table from '../../components/Table';
import ButtonCell from '../../components/ButtonCell';
import Switch from '../../components/Switch';
import ImgView from '../../components/ImgView';
export default {
    name: 'set_device_page',
    data() {
        return {
            searchForm: {
                user: '',
                pageSize: 15,
                page: 1
            },
            list: [],
            detail: {},
            columns: [
                {
                    prop: 'image',
                    label: '设备图片',
                    component: ImgView
                }, {
                    prop: 'name',
                    label: '设备名称'
                }, {
                    prop: 'code',
                    label: '设备编码'
                }, {
                    prop: 'producer',
                    label: '厂家'
                }, {
                    prop: 'contactWay',
                    label: '连接方式'
                }, {
                    prop: 'status',
                    label: '状态',
                    disabled: true,
                    component: Switch
                }, {
                    prop: 'id',
                    label: '操作',
                    component: ButtonCell
                }
            ],
            rows: [],

            // 弹窗信息
            type: 'add',
            dialogVisible: false,
            dialogForm: {}
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
                this.rows = [
                    {
                        id: 1,
                        code: 'XYJ-00001',
                        name: '血压计001',
                        producer: '17744885566',
                        contactWay: 'HTTP',
                        image: require('../../assets/images/default.jpg'),
                        content: '连接连接内容连接内容连接内容连接内容内容',
                        deviceImgs: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}],
                        instructionImgs:  [{name: 'defualt.jpg', url: '../../assets/images/default.jpg'}],
                        status: 0
                    }, {
                        id: 2,
                        code: 'XYJ-00001',
                        name: '血压计001',
                        producer: '17744885566',
                        contactWay: 'HTTP',
                        image: require('../../assets/images/default.jpg'),
                        status: 1
                    }, {
                        id: 3,
                        code: 'XYJ-00001',
                        name: '血压计001',
                        producer: '17744885566',
                        contactWay: 'HTTP',
                        image: require('../../assets/images/default.jpg'),
                        status: 1
                    }, {
                        id: 4,
                        code: 'XYJ-00001',
                        name: '血压计001',
                        producer: '17744885566',
                        contactWay: 'HTTP',
                        image: require('../../assets/images/default.jpg'),
                        status: 0
                    }, {
                        id: 5,
                        code: 'XYJ-00001',
                        name: '血压计001',
                        producer: '17744885566',
                        contactWay: 'HTTP',
                        image: require('../../assets/images/default.jpg'),
                        status: 1
                    }
                ];

                this.rows = this.rows.map(item=> {
                    item.status = !!item.status;
                    // 添加操作btns
                    item.items = [
                        {
                            key: 'EDIT',
                            desc: '编辑'
                        }, {
                            key: 'DELETE',
                            desc: '删除',
                            btnType: 'default'
                        }
                    ]
                    return item;
                })
                
            }, 500);
            console.log('发送请求', this.searchForm);
        },

        handleTableCell(type, row, index) {
            switch (type) {
                case 'EDIT':
                    this.type = 'edit';
                    this.dialogVisible = true;
                    this.dialogForm = row;
                    break;
                case 'DELETE': 
                    this.$confirm('确认删除？').then(_ => {
                        this.handlerSwitch(type, row, index)
                    }).catch(_=>{})
                    break;
                case 'SWITCH': 
                    this.changeStatus(row, index)
                    break;
            }
        },
        changeStatus(row, index) {
            row.status = !row.status;
            this.rows.splice(index, 1, row)
        },
        handlerSwitch(type, row, index) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(()=>{
                loading.close();
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
            }, 500);
        },
        handleSelectionChange(val) {
            console.log('handleSelectionChange', val)
        },
        operateHandle() {
            this.type = 'add';
            this.dialogVisible = true;
            this.dialogForm = {};
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
        fileChange(file, filelist, key) {
            this.$set(this.dialogForm, key, filelist);
        },
        submit() {

        }
    },
    components: { Table }
}
</script>

<style lang="scss">
.set_device_page{
    .el-upload--picture-card {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .el-upload-list__item {
        width: 100px;
        height: 100px;
        // display: block;
    }
}

</style>