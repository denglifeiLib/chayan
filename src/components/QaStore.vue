<template>
    <el-dialog title="查看" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-table
                    ref="multipleTable"
                    :data="form.row.qa"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border>
                    <el-table-column prop="question" label="问题" align="center"></el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <el-table
                    ref="multipleTable"
                    :data="form.row.qa"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border>
                    <el-table-column prop="answer" label="问题" align="center"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <p class="status">
            状态 <el-switch :value="form.row.status==='1'" active-color="#02E1A0"></el-switch>
        </p>
    </el-dialog>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
  name: 'StrategyTemplate',
  data() {
      return {
          formLabelWidth: '140px'
      }
  },
  props: {
    form: {
      type: Object,
      default: ()=> {}
    }
  },
  methods: {

  },
  components: {Icon}
}
</script>

<style lang="scss" scoped>
.status{
    padding-top: 40px;
    text-align: center;
}
</style>
