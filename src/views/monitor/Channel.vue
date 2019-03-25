<template>
  <div class="channel-wrapper">
    <div class="account-wrapper">
        <div class="action_btns">
            <el-button plain @click="handlerRow('start')">开始</el-button>
            <el-button plain @click="handlerRow('pause')">暂停</el-button>
            <el-button type="danger" plain @click="handlerRow('delete')">删除</el-button>
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
            <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
            <el-table-column prop="settleTime" label="部署时间" ></el-table-column>
            <el-table-column prop="clew" label="线索" sortable></el-table-column>
            <el-table-column 
                label="状态" 
                :filter-multiple="false"
                filter-placement="bottom-start"
                prop="status"
                column-key="status"
                :filters="[{text:'正常运行',value:'1'},{text:'账号失效',value:'0'}]">
                <template slot-scope="scope">
                    <span :class="scope.row.status==='1'?'green':scope.row.status==='0'?'red':'yellow'">{{ ({'1': '正常运行','0': '账号失效','2': '暂停'})[scope.row.status]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="190" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="operateHandle(scope.row, scope.$index, 'validate')">验证</el-button> <span class="seperator">|</span>
                    <el-button type="text" @click="operateHandle(scope.row, scope.$index, 'pause')">暂停</el-button> <span class="seperator">|</span>
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

    </div>
  </div>
</template>

<script>

export default {
    name: 'Channel',
    data () {
        return {
            visible2: false,
           selectedRows: [],
           tableData: [
               {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_1.jpg'),
                   createTime: '2019-03-08 23:12:00',
                   settleTime: 'settleTime',
                   clew: '101',
                   status: '1',
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_2.jpg'),
                   createTime: '2019-03-08 23:12:00',
                   settleTime: 'settleTime',
                   clew: '101',
                   status: '2',
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_3.jpeg'),
                   createTime: '2019-03-08 23:12:00',
                   settleTime: 'settleTime',
                   clew: '101',
                   status: '0',
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_2.jpg'),
                   createTime: '2019-03-08 23:12:00',
                   settleTime: 'settleTime',
                   clew: '101',
                   status: '2',
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_3.jpeg'),
                   createTime: '2019-03-08 23:12:00',
                   settleTime: 'settleTime',
                   clew: '101',
                   status: '0',
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_1.jpg'),
                   createTime: '2019-03-08 23:12:00',
                   settleTime: 'settleTime',
                   clew: '101',
                   status: '1',
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_2.jpg'),
                   createTime: '2019-03-08 23:12:00',
                   settleTime: 'settleTime',
                   clew: '101',
                   status: '2',
               }, {
                   name: '百度贴吧',
                   icon: require('@/assets/images/logo_3.jpeg'),
                   createTime: '2019-03-08 23:12:00',
                   settleTime: 'settleTime',
                   clew: '101',
                   status: '0',
               }
           ],
        };
    },
    computed: {},
    methods: {
        handlerRow(type) {
            if(this.selectedRows.length===0){
                this.$confirm('请选则要操作的行！', '提示', {
                    showCancelButton: false
                }).then(()=> {

                })
                return ; 
            }
            this.$confirm(' 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    console.log(2222, this.selectedRows)
                    this.$message({
                        type: 'success',
                        message: type+'操作成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
            });
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
        operateHandle(row, index, type, ref) {
            console.log(row, index);
            if(type === 'delete' && ref) {
                this.$refs[ref].doClose();
                this.$message({
                    type: 'success',
                    message: type+'操作成功!'
                });
            }
        },
        handlePopover(ref) {
            this.$refs[ref].doClose();
        },
    },
    components: { },
}
</script>
<style lang="scss" scoped>
    .channel-wrapper{
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
        .seperator{
            color: #e9e9e9;
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
