<template>
  <div class="account-wrapper">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="searchForm.keyWord" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
            <el-select v-model="searchForm.type" placeholder="选择验证方式">
                <el-option label="手机动态验证码" value="dtm"></el-option>
                <el-option label="账号密码" value="ma"></el-option>
                <el-option label="扫码" value="sm"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-select v-model="searchForm.status" placeholder="选择账号状态">
                <el-option label="正常运行" value="1"></el-option>
                <el-option label="账号失效" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">搜索</el-button>
        </el-form-item>
    </el-form>
    <div class="action_btns">
        <el-button plain icon="el-icon-download" @click="download">账号导出</el-button>
        <el-button type="danger" plain @click="deleteRow">删除</el-button>
    </div>

    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @filter-change="filterAction"
        border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="渠道名称" >
            <template slot-scope="scope">
                <img :src="scope.row.icon" alt="" class="list_icon">
                {{scope.row.name}}
            </template>
        </el-table-column>
        <el-table-column prop="account" label="账号" ></el-table-column>
        <el-table-column prop="password" label="密码" ></el-table-column>
        <el-table-column prop="type" label="验证方式" >
            <template slot-scope="scope">
                <span>{{ ({dtm: '手机动态验证码',ma: '账号密码',sm:'扫码'})[scope.row.type] }}</span>
            </template>
        </el-table-column>
        <el-table-column 
            label="状态" 
            :filter-multiple="false"
            filter-placement="bottom-start"
            prop="status"
            column-key="status"
            :filters="[{text:'正常运行',value:'1'},{text:'账号失效',value:'0'}]">
            <template slot-scope="scope">
                <span :class="scope.row.status==='1'?'green':'red'">{{ ({'1': '正常运行','0': '账号失效'})[scope.row.status]}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="75" align="center">
            <template slot-scope="scope">
                <el-button type="text" @click="validateAction(scope.row, scope.$index)">验证</el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="mt24">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="3"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>
    </div>

    <el-dialog title="账号验证" :visible.sync="formDate.dialogVisible" :center="true" :close-on-click-modal="false">
        <div class="validate_alert">
            <div class="logo_wrap">
                <img :src="formDate.logo" alt="" class="logo">
                {{formDate.name}}
            </div>
            <el-tabs v-model="formDate.callBackactiveName" @tab-click="changeAlertTab">
                <el-tab-pane name="ma">
                    <div slot="label"><span class="zhang"></span>账号密码<span class="zhang"></span></div>
                    <div class="content">
                        <el-form label-width="84px">
                            <el-form-item label="账号">
                                <el-input v-model="formDate.account" size="medium" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="formDate.password" size="medium" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="验证码">
                                <el-input v-model="formDate.yzm" size="medium" clearable style="width: 145px;"></el-input>
                                <img :src="require('@/assets/images/logo_1.jpg')" alt="" class="yzm_img">
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="dtm">
                    <div slot="label"><span class="zhang"></span>手机验证码<span class="zhang"></span></div>
                    <div class="content">
                        <el-form label-width="84px">
                            <el-form-item label="手机号">
                                <el-input v-model="formDate.phone" size="medium" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="验证码">
                                <el-input v-model="formDate.yzm" size="medium" clearable style="width: 125px;"></el-input>
                                <el-button type="primary" size="medium">获取验证码</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="sm">
                    <div slot="label"><span class="zhang"></span>扫码登录<span class="zhang"></span></div>
                    <div class="content">
                        <img :src="require('@/assets/images/logo_1.jpg')" alt="" class="ewm_img">
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="callBack('jump')">查看渠道原页面</el-button>
            <el-button type="primary" @click="callBack('save')">保存</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
    name: 'Account',
    data () {
        return {
           searchForm: {
               keyWord: '',
               type: '',
               status: ''
           },
           selectedRows: [],
           tableData: [
               {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_1.jpg'),
                   account: 'qwertyuiop123456789',
                   password: '1234567890',
                   type: 'dtm',
                   status: '1',
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_2.jpg'),
                   account: 'qwertyuiop123456789',
                   password: '1234567890',
                   type: 'ma',
                   status: '0'
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_3.jpeg'),
                   account: 'qwertyuiop123456789',
                   password: '1234567890',
                   type: 'sm',
                   status: '1'
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_1.jpg'),
                   account: 'qwertyuiop123456789',
                   password: '1234567890',
                   type: 'dtm',
                   status: '1',
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_2.jpg'),
                   account: 'qwertyuiop123456789',
                   password: '1234567890',
                   type: 'ma',
                   status: '0'
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_3.jpeg'),
                   account: 'qwertyuiop123456789',
                   password: '1234567890',
                   type: 'sm',
                   status: '1'
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_1.jpg'),
                   account: 'qwertyuiop123456789',
                   password: '1234567890',
                   type: 'dtm',
                   status: '1',
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_2.jpg'),
                   account: 'qwertyuiop123456789',
                   password: '1234567890',
                   type: 'ma',
                   status: '0'
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_3.jpeg'),
                   account: 'qwertyuiop123456789',
                   password: '1234567890',
                   type: 'sm',
                   status: '1'
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_3.jpeg'),
                   account: 'qwertyuiop123456789',
                   password: '1234567890',
                   type: 'sm',
                   status: '1'
               }
           ],
           formDate: {
               dialogVisible:false,
               activeName: '',
               logo: '',
               name: '',
               account: '',
               yzm: ''
           }
        };
    },
    computed: {},
    methods: {
        onSubmit() {
            alert('search')
        },
        download() {
            alert('download')
        },
        deleteRow() {
            if(this.selectedRows.length===0){
                this.$confirm('请选则要删除的行?', '提示', {
                    showCancelButton: false
                }).then(()=> {

                })
                return ; 
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    console.log(2222, this.selectedRows)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
        },
        validateAction(row, index) {
            console.log(row, index);
            this.formDate.dialogVisible = true;
            this.formDate.logo = row.icon;
            this.formDate.name = row.name;
            this.formDate.account = row.account;
            this.formDate.password = row.password;
            this.formDate.callBackactiveName = row.type;

            // this.$message({
            //     type: 'success',
            //     message: '删除成功!----'+index
            // });
        },
        handleSelectionChange(arr) {
            this.selectedRows = arr;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        filterAction(value) {
            console.log(value)
        },
        changeAlertTab(tab){
            this.formDate.activeName = tab.name;
        },
        callBack(type) {
            switch (type) {
                case 'jump': 
                    this.formDate.dialogVisible = false;
                    this.$router.push({name:'update'});
                    break;
                case 'save': 
                    this.formDate.dialogVisible = false;
                    this.confirm();
                    break;
            }
        },
        confirm() {
            alert('confirm')
        }
    },
    components: { },
}
</script>
<style lang="scss">
    .account-wrapper{
        padding: 24px 32px 30px;
        background: #fff;
        border-radius:2px;
        .action_btns{
            padding-bottom: 22px;
        }
        .list_icon{
            width: 32px;
            vertical-align: middle;
        }
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
        .validate_alert{
            width: 382px;
            margin: 0 auto;
            .zhang{
                display: inline-block;
                width: 20px;
            }
            .yzm_img{
                width:92px;
                height:37px;
                vertical-align: middle;
            }
            .el-form-item label{
                text-align: left;
            }
            .content{
                padding:35px 28px 0;
                border: 0;
                .ewm_img{
                    display: block;
                    width:174px;
                    height:174px;
                    margin: 0 auto 30px;
                }
            }
        }
        .logo_wrap{
            padding-bottom: 50px;
            color: #000;
            font-size: 20px;
            text-align: center;
            .logo{
                width: 40px;
                height: 40px;
                vertical-align: middle;
            }
        }
    }
</style>
