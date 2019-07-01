<template>
    <div>
        <el-row :gutter="60" class="apply_group">
            <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col" v-for="(item,i) in applyList" :key="i">
                <div class="card-panel" @click="jump(item.pathName)">
                    <img :src="item.icon" alt="" class="applyIcon">
                    <p class="title">{{item.title}}</p>
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
            applyList: [
                {
                    icon: require('../assets/images/p_apply_1.png'),
                    title: '爬虫服务',
                    pathName: 'reptile_list',
                }, {
                    icon: require('../assets/images/p_apply_2.png'),
                    title: '数据处理',
                    pathName: 'data_manage_list',
                }, {
                    icon: require('../assets/images/p_apply_3.png'),
                    title: '数据传输',
                    pathName: 'data_transfer_list',
                }, {
                    icon: require('../assets/images/p_apply_4.png'),
                    title: '定时任务',
                    pathName: 'timed_task_view',
                }, {
                    icon: require('../assets/images/p_apply_5.png'),
                    title: '微信服务',
                    pathName: 'weix_view',
                }, {
                    icon: require('../assets/images/p_apply_6.png'),
                    title: '代理服务',
                    pathName: 'agent_server',
                }
            ]
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
        .applyIcon{
            margin: 43px auto 37px;
        }
    }
    .card-panel {
        height: 220px;
        background: #fff;
        text-align: center;
        border-radius:2px;
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.09);
        .title{
            // padding-top: 158px;
            font-size:16px;
            color:rgba(0,0,0,0.85);
            line-height:22px;
            
        }
    }
}
</style>