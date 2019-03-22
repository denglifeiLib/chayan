<template>
  <section>
    <warn :msg="msg" />
    <div class="content">
        <div class="update-step">
            <div class="step"><span class="num">1</span>点击列表中最新的启动器版本下载</div>
            <div class="line"></div>
            <div class="step"><span class="num">2</span>从游览器或其他下载工具中打开刚下载的文件</div>
            <div class="line"></div>
            <div class="step"><span class="num">3</span>根据软件提示安装</div>
        </div>
        <el-table :data="tableData" border width= "100%" height="100%">
            <el-table-column type="index" width="50" label="ID" align="center"/>
            <el-table-column prop="version" label="启动器版本" width="180" />
            <el-table-column prop="date" label="更新时间" width="180" />
            <el-table-column prop="describe" label="描述"/>
            <el-table-column prop="option" label="操作" width="96" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" v-if="scope.row.status === 0">下载</el-button>
                    <span type="primary" class="disabled" v-if="scope.row.status !== 0">已安装</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
  </section>
</template>

<script>
import Warn from '@/components/Warn'
export default {
    name: 'Update',
    data () {
        return {
            msg: '未及时安装或更新察言启动器将无法正常使用平台功能',
            tableData: [
                {
                    version: '1.1.2',
                    date: '2016-05-02',
                    describe: '王王小虎王小虎王小虎小虎',
                    status: 0
                }, {
                    version: '1.1.2',
                    date: '2016-05-02',
                    describe: '王王小虎王小虎王小虎小虎',
                    status: 1
                }, {
                    version: '1.1.2',
                    date: '2016-05-02',
                    describe: '王王小虎王小虎王小虎小虎',
                    status: 1
                }, {
                    version: '1.1.2',
                    date: '2016-05-02',
                    describe: '王王小虎王小虎王小虎小虎',
                    status: 1
                }, {
                    version: '1.1.2',
                    date: '2016-05-02',
                    describe: '王王小虎王小虎王小虎小虎',
                    status: 1
                }, {
                    version: '1.1.2',
                    date: '2016-05-02',
                    describe: '王王小虎王小虎王小虎小虎',
                    status: 1
                }, {
                    version: '1.1.2',
                    date: '2016-05-02',
                    describe: '王王小虎王小虎王小虎小虎',
                    status: 1
                }
            ]
        };
    },
    computed: {},
    methods: {
        toggleSideBar() {
            this.isCollapse = !this.isCollapse;
        },
    },
    components: { Warn },
}
</script>
<style lang="scss">
    .wran{
        margin-bottom: 16px;
    }
    .content{
        padding: 32px;
        background:rgba(255,255,255,1);
        border-radius:2px;
        border:1px solid rgba(217,217,217,1);
    }
    .update-step{
        display: flex;
        margin-bottom: 32px;
        justify-content: space-between;
        align-items: center;
        font-size:14px;
        color:rgba(48,49,51,1);
        line-height:20px;
        .num{
            display: inline-block;
            width:32px;
            height:32px;
            margin-right: 8px;
            font-size:16px;
            border:1px solid rgba(0,0,0,0.15);
            text-align: center;
            line-height: 32px;
            border-radius: 50%;
            color:rgba(0,0,0,0.25);
        }
        .line{
            width:72px;
            height:1px;
            background:rgba(0,0,0,0.15);
        }
    }
    .disabled{
        font-size:14px;
        color:rgba(192,196,204,1);
        line-height:22px;
    }
</style>
