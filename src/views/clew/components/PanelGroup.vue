<template>
  <el-row :gutter="24" class="panel-group">
        <el-col :xs="24" :sm="12" :md="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                <span>今日线索</span>
                <p class="num">8,846</p>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('messages')">
                <span>今日线索</span>
                <p class="num">8,846</p>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('purchases')">
                <span>人均日处理量</span>
                <p class="num">102</p>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('shoppings')">
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
    .card-panel-col{
        margin-bottom: 24px;
    }
    .card-panel {
        height: 108px;
        padding: 24px 32px;
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
        &:first-child{
            background:#fff url('../../..//assets/images/analysis_4.png') right bottom no-repeat;
        }
    }
}
</style>
