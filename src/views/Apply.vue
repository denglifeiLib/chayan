<template>
    <div>
        <el-row :gutter="60" class="apply_group">
            <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col">
                <div class="card-panel" @click="jump('reptile_list')">
                    <p class="title">爬虫服务</p>
                </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col">
                <div class="card-panel" @click="jump('data_manage_list')">
                    <p class="title">数据处理</p>
                </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col">
                <div class="card-panel" @click="jump('data_transfer_list')">
                    <p class="title">数据传输</p>
                </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col">
                <div class="card-panel" @click="jump('timed_task_view')">
                    <p class="title">定时任务</p>
                </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col">
                <div class="card-panel" @click="jump('weix_view')">
                    <p class="title">微信服务</p>
                </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col">
                <div class="card-panel" @click="jump('agent_server')">
                    <p class="title">代理服务</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    name: 'apply',
    data() {
        return {
            
        }
    },
    methods: {
        jump(name) {
            this.$router.push({name})
        }
    }
}
</script>

<style lang="scss" scoped>
.apply_group{
    padding-top: 70px;
    .card-panel-col{
        margin-bottom: 24px;
        &:first-child .card-panel{
            background:#fff url('../assets/images/p_apply_1.png') center 43px no-repeat;
        }
        &:nth-child(2) .card-panel{
            background:#fff url('../assets/images/p_apply_2.png') center 43px no-repeat;
        }
        &:nth-child(3) .card-panel{
            background:#fff url('../assets/images/p_apply_3.png') center 43px no-repeat;
        }
        &:nth-child(4) .card-panel{
            background:#fff url('../assets/images/p_apply_4.png') center 43px no-repeat;
        }
        &:nth-child(5) .card-panel{
            background:#fff url('../assets/images/p_apply_5.png') center 43px no-repeat;
        }
        &:nth-child(6) .card-panel{
            background:#fff url('../assets/images/p_apply_6.png') center 43px no-repeat;
        }
    }
    .card-panel {
        height: 220px;
        background: #fff;
        border-radius:2px;
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.09);
        .title{
            padding-top: 158px;
            font-size:16px;
            color:rgba(0,0,0,0.85);
            line-height:22px;
            text-align: center;
        }
    }
}
</style>