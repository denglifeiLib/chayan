<template>
    <div class="totalPage">
        <h1 class="title">健康小屋（静安寺店）</h1>
        <!-- tab content -->
        <div class="list-wrapper">
            
            <el-tabs v-model="activeName">
                <el-tab-pane label="设备监控" name="1"></el-tab-pane>
                <el-tab-pane label="人员监控" name="2"></el-tab-pane>
            </el-tabs>
            <transition>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>

export default {
    name: 'base_user',
    data() {
        return {
            activeName: '1'
        }
    },
    watch: {
        activeName(val, oldval) {
            if(val === '1') {
                this.$router.push('device')
            }
            if(val === '2') {
                this.$router.push('member')
            }
        }
    },
}
</script>

<style lang="scss">
.totalPage{
    .title{
        font-size: 26px;
        line-height: 2.5;
    }
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
}
</style>