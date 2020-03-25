<template>
    <div class="set_banner_page">
        <div class="card_wrapper mt25">
            
            <div class="card_cont">
                <div class="fr mb12" style="overflow:hidden">
                    <el-button type="primary" icon="el-icon-plus"  @click="operateHandle" size="small">添加轮播图</el-button>
                </div>
                
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
        <el-dialog :title="`轮播图管理 / ${type === 'add' ?'新增':'编辑'}轮播图`" :visible.sync="dialogVisible" :center="true" :close-on-click-modal="false">
            <el-form :model="dialogForm" class="demo-form-inline"  label-width="115px">
                <el-form-item label="轮播图名：">
                    <el-input v-model="dialogForm.name" placeholder="请输入设备名称" size="medium" style="width: 400px" clearable></el-input>
                </el-form-item>
                <el-form-item label="轮播图图片：">
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        :file-list="dialogForm.bannerImgs || []"
                        :auto-upload="false"
                        :on-change="(file, filelist)=> {fileChange(file, filelist, 'bannerImgs')}"
                        :on-remove="(file, filelist)=> {fileChange(file, filelist, 'bannerImgs')}">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item> 
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
    name: 'set_banner_page',
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
                    prop: 'name',
                    label: '轮播图名'
                }, {
                    prop: 'image',
                    label: '轮播图片',
                    component: ImgView
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
                        name: '血压计001',
                        image: require('../../assets/images/default.jpg'),
                        bannerImgs: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}],
                        status: 0
                    }, {
                        id: 1,
                        name: '血压计001',
                        image: require('../../assets/images/default.jpg'),
                        bannerImgs: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}],
                        status: 1
                    }, {
                        id: 1,
                        name: '血压计001',
                        image: require('../../assets/images/default.jpg'),
                        bannerImgs: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}],
                        status: 0
                    }, {
                        id: 1,
                        name: '血压计001',
                        image: require('../../assets/images/default.jpg'),
                        bannerImgs: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}],
                        status: 1
                    }, {
                        id: 1,
                        name: '血压计001',
                        image: require('../../assets/images/default.jpg'),
                        bannerImgs: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}],
                        status: 0
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
.set_banner_page{
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