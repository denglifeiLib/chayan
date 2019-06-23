<template>
    <div class="list-wrapper mt25">
        <el-tabs v-model="activeName">
            <el-tab-pane label="用户管理" name="1"></el-tab-pane>
            <el-tab-pane label="权限管理" name="2"></el-tab-pane>
        </el-tabs>
        <div class="mt25">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                border>
                <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="version" label="版本"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column prop="discribe" label="描述"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" :underline="false" download href="fdfd.txt">环境下载</el-link>
                        <i class="seperator">|</i>
                        <el-link type="primary" :underline="false" download href="fdfd.txt">文档下载</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

export default {
    name: 'server',
    data() {
        return {
            activeName: '1',
            tableData: [
                {
                    version: 'V1.2.2',
                    updateTime: '2019-03-08 23:12:00',
                    discribe: '正常维护',
                }, {
                    version: 'V1.2.2',
                    updateTime: '2019-03-08 23:12:00',
                    discribe: '正常维护',
                }, {
                    version: 'V1.2.2',
                    updateTime: '2019-03-08 23:12:00',
                    discribe: '正常维护',
                }, {
                    version: 'V1.2.2',
                    updateTime: '2019-03-08 23:12:00',
                    discribe: '正常维护',
                }
            ]
        }
    },
    watch: {
        activeName(val, oldval) {
            this._query(val);
        }
    },
    methods: {
        _query(type) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            console.log(type)
            setTimeout(() => {
                loading.close();
            }, 500);
        },
    }
}
</script>

<style lang="scss">
.demo-form-inline{
    margin-top: 20px;
}
.el-tabs--top{
    margin-left: -32px;
    margin-right: -32px;
    margin-top: -20px;
    
}
.el-tabs__nav-scroll{
    padding-left: 20px;
}
.el-tabs__item.is-active {
    background: transparent;
}
</style>