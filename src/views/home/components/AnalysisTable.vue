<template>
  <div>
      <el-table :data="tableInfo.tableData" border style="width:100%;">
            <el-table-column type="index" width="50" label="ID" align="center"/>
            <el-table-column :prop="column.prop" :label="column.label" v-for="(column,index) in tableInfo.columns" :key="index+'pr'">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" alt="" class="list_icon" v-if="tableInfo.type==='channel' && scope.row.icon && column.prop==='channel'">
                    {{scope.row[column.prop]}}
                </template>
            </el-table-column>
            <!-- <el-table-column :prop="column.prop" :label="column.label" v-for="(column,index) in tableInfo.columns" :key="index" v-else/> -->
        </el-table>
        <div class="mt24" v-if="tableInfo.pagination.total != '0'">
            <el-pagination
                :pageSizes="pageSizes"
                :small="true"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableInfo.pagination.curPage"
                :page-size="tableInfo.pagination.pageSize"
                :layout="layout"
                :total="tableInfo.pagination.total">
            </el-pagination>
        </div>
  </div>
</template>

<script>
export default {
    name: 'AnalysisTable',
    props: { },
    data() {
        return { 
            
        }
    },
    props: {
        tableInfo: {
            type: Object,
            default: ()=> {
                return {
                    columns: [],
                    tableData: [],
                    pagination: {
                        pageSize: 4,
                        curPage: 2,
                        total: 0
                    }
                }
            }
        },
        layout: {
            type: String,
            default: "total, prev, pager, next, jumper"
        },
        pageSizes: {
            type: Array,
            default: ()=> [4]
        }
    },
    watch: {},
    mounted() {},
    beforeDestroy() {},
    methods: {
        handleSizeChange(val) {
            this.$emit('changeSize', val, this.tableInfo.type);
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.$emit('changePage', val, this.tableInfo.type);
            console.log(`当前页: ${val}`);
        },
    },
}
</script>

<style lang="scss" scoped>
.list_icon{
    width: 28px;
    vertical-align: middle;
}
</style>
