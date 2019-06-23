<template>
  <el-row :gutter="24" class="panel-group">
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <span>今日线索</span>
                <p class="num">8,846</p>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <span>历史线索</span>
                <p class="num">8,846</p>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <span>协作成员</span>
                <p class="num">102</p>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <span>人均日处理量</span>
                <p class="num">102</p>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'PanelGroup',
  props: { },
  data() {
    return { }
  },
  watch: {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.panel-group {
    padding-top: 20px;
    .card-panel-col{
        margin-bottom: 24px;
        &:first-child .card-panel{
            background:#fff url('../../..//assets/images/analysis_1.png') left bottom no-repeat;
        }
        &:nth-child(2) .card-panel{
            background:#fff url('../../..//assets/images/analysis_2.png') left bottom no-repeat;
        }
        &:nth-child(3) .card-panel{
            background:#fff url('../../..//assets/images/analysis_3.png') left bottom no-repeat;
        }
        &:nth-child(4) .card-panel{
            background:#fff url('../../..//assets/images/analysis_4.png') left bottom no-repeat;
        }
    }
    .card-panel {
        height: 130px;
        padding: 32px 0 24px 150px;
        background: #fff;
        border-radius:2px;
        border:1px solid rgba(220,223,230,1);
        span{
            color: #A8A8A8;
            font-size: 14px;
            line-height:22px;
        }
        .num{
            padding-top: 4px;
            color: #262626;
            font-size:30px;
            line-height:38px;
        }
    }
}
</style>
