<template>
  <el-table :data="rows" style="width: 100%" border  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="showSelect"></el-table-column>
      <el-table-column type="index" v-if="showOrder" align="center"></el-table-column>
      <el-table-column :prop="column.prop" :label="column.label" :width="column.width||'auto'" v-for="(column,i) in columns" :key="i" align="center">>

        <template slot-scope="scope">
          <component 
            v-if="column.component" 
            :is="column.component" 
            @action="action" 
            :data="scope.row" 
            :column="column"
            :value="scope.row[column.prop]" 
            :index="scope.$index"></component>
          <span v-else-if="column.filter">{{scope.row | useFilter(column.filter)}}</span>
          <span v-else>{{scope.row[column.prop]}}</span>
        </template>

      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'table_f',
  props: {
    columns: {
      type: Array,
      default: ()=> []
    },
    rows: {
      type: Array,
      default: ()=> []
    },
    showOrder: {
      type: Boolean,
      default: false
    },
    showSelect: {
      type: Boolean,
      default: false
    },
  },
  filters: {
      useFilter: (value, filter) => {
        return filter(value);
      }
  },
  methods: {
    action(type, row, index) {
        console.log(7777, type, row, index)
      this.$emit('action', type, row, index);
    },
    handleSelectionChange(val) {
        this.$emit('handleSelectionChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
