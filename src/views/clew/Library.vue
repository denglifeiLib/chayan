<template>
  <div class="account-wrapper">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="searchForm.keyWord" placeholder="请输入关键词" size="medium" style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item>
            <el-select v-model="searchForm.channel" placeholder="选择渠道来源" size="medium">
                <el-option label="手机动态验证码" value="dtm"></el-option>
                <el-option label="账号密码" value="ma"></el-option>
                <el-option label="扫码" value="sm"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-select v-model="searchForm.clewType" placeholder="选择线索类型" size="medium">
                <el-option label="选择线索类型" value="1"></el-option>
                <el-option label="品牌公关线索" value="0"></el-option>
                <el-option label="调研线索" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="el-icon-search" size="medium">搜索</el-button>
        </el-form-item>
    </el-form>
    <div class="action_btns">
        <el-button plain icon="el-icon-download" @click="download" size="medium">导出</el-button>
        <el-button type="danger" plain @click="deleteRow" size="medium">删除</el-button>
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
        <el-table-column prop="channelName" label="渠道名称" >
            <template slot-scope="scope">
                <img :src="scope.row.icon" alt="" class="list_icon">
                {{scope.row.channelName}}
            </template>
        </el-table-column>
        <el-table-column prop="catchTime" label="抓取时间" sortable></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column 
            label="线索类型" 
            :filter-multiple="false"
            filter-placement="bottom-start"
            prop="clewType"
            align="center"
            column-key="clewType"
            :filters="[{text:'选择线索类型',value:'1'},{text:'品牌公关线索',value:'0'},{text:'调研线索',value:'2'}]">
            <template slot-scope="scope">
                <span>{{ ({'1': '选择线索类型','0': '品牌公关线索','2':'调研线索'})[scope.row.clewType]}}</span>
            </template>
        </el-table-column>
        <el-table-column 
            label="执行人" 
            :filter-multiple="false"
            filter-placement="bottom-start"
            prop="operator"
             align="center"
            column-key="operator"
            :filters="[{text:'选择线索类型',value:'1'},{text:'品牌公关线索',value:'0'},{text:'调研线索',value:'2'}]">
            <template slot-scope="scope">
                <span :class="scope.row.operator?'blue_header table_header':'yellow_header table_header'">{{scope.row.operator||'待领'}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="144" align="center">
            <template slot-scope="scope">
                <el-button type="text" @click="operateHandle(scope.row, scope.$index)">原文</el-button> <span class="seperator">|</span>
                <el-popover
                    placement="top-end"
                    width="213"
                    :ref="`popover3${scope.$index}`"
                    trigger="click"
                    v-model="scope.row.popoverVisible">
                    <p style="padding-bottom:10px;"><i class="el-icon-warning"></i>你确定要删除此渠道吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" @click="handlePopover(`popover3${scope.$index}`)">取消</el-button>
                        <el-button type="primary" size="mini" @click="operateHandle(scope.row, scope.$index, 'delete', `popover3${scope.$index}`)">确定</el-button>
                    </div>
                    <el-button type="text" slot="reference" :style="{color:scope.row.role==='manager'?'#C0C4CC':'#F56C6C'}" :disabled="scope.row.role==='manager'">删除</el-button>
                </el-popover>
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
    name: 'Library',
    data () {
        return {
            visible2: false,
           searchForm: {
               keyWord: '',
               channel: '',
               clewType: ''
           },
           selectedRows: [],
           tableData: [
               {
                   channelName: '百度贴吧',
                   icon: require('@/assets/images/logo_1.jpg'),
                   account: 'qwertyuiop123456789',
                   catchTime: '2019-03-08 23:12:00',
                   title: '奥迪A8和宝马7系怎么选？',
                   clewType: '0',
                   operator: '俞开渊',
               }, {
                   channelName: '百度贴吧',
                   icon: require('@/assets/images/logo_2.jpg'),
                   account: 'qwertyuiop123456789',
                   catchTime: '2019-03-08 23:12:00',
                   title: '奥迪A8和宝马7系怎么选？',
                   clewType: '1',
                   operator: '俞开渊',
               }, {
                   channelName: '百度贴吧',
                   icon: require('@/assets/images/logo_3.jpeg'),
                   account: 'qwertyuiop123456789',
                   catchTime: '2019-03-08 23:12:00',
                   title: '奥迪A8和宝马7系怎么选？',
                   clewType: '2',
                   operator: '俞开渊',
               }, {
                   channelName: '百度贴吧',
                   icon: require('@/assets/images/logo_1.jpg'),
                   account: 'qwertyuiop123456789',
                   catchTime: '2019-03-08 23:12:00',
                   title: '奥迪A8和宝马7系怎么选？',
                   clewType: '0',
                   operator: '',
               }, {
                   channelName: '百度贴吧',
                   icon: require('@/assets/images/logo_2.jpg'),
                   account: 'qwertyuiop123456789',
                   catchTime: '2019-03-08 23:12:00',
                   title: '奥迪A8和宝马7系怎么选？',
                   clewType: '1',
                   operator: '',
               }, {
                   channelName: '百度贴吧',
                   icon: require('@/assets/images/logo_3.jpeg'),
                   account: 'qwertyuiop123456789',
                   catchTime: '2019-03-08 23:12:00',
                   title: '奥迪A8和宝马7系怎么选？',
                   clewType: '2',
                   operator: '',
               }, {
                   channelName: '百度贴吧',
                   icon: require('@/assets/images/logo_1.jpg'),
                   account: 'qwertyuiop123456789',
                   catchTime: '2019-03-08 23:12:00',
                   title: '奥迪A8和宝马7系怎么选？',
                   clewType: '0',
                   operator: '俞开渊',
               }, {
                   channelName: '百度贴吧',
                   icon: require('@/assets/images/logo_2.jpg'),
                   account: 'qwertyuiop123456789',
                   catchTime: '2019-03-08 23:12:00',
                   title: '奥迪A8和宝马7系怎么选？',
                   clewType: '1',
                   operator: '俞开渊',
               }, {
                   channelName: '百度贴吧',
                   icon: require('@/assets/images/logo_3.jpeg'),
                   account: 'qwertyuiop123456789',
                   catchTime: '2019-03-08 23:12:00',
                   title: '奥迪A8和宝马7系怎么选？',
                   clewType: '2',
                   operator: '俞开渊',
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
        operateHandle(row, index, type, ref) {
            console.log(row, index);
            if(type === 'delete' && ref) {
                this.$refs[ref].doClose();
            }
        },
        handlePopover(ref) {
            this.$refs[ref].doClose();
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
        padding: 20px;
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
        .seperator{
            color: #e9e9e9;
        }
        // 
        .table_header{
            display: inline-block;
            width:40px;
            height:40px;
            font-size:12px;
            line-height: 40px;
            text-align: center;
            border-radius: 40px;
            &.yellow_header{
                color: #F5A623;
                background: #FFF2DC;
            }
            &.blue_header{
                color: #0285FF;
                background: #E6F1FC;
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
