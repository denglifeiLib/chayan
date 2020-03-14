<template>
    <div class="totalPage">
        <!-- tab content -->
        <div class="list-wrapper mt25">
            <el-tabs v-model="activeName">
                <el-tab-pane label="用户管理" name="1"></el-tab-pane>
                <el-tab-pane label="权限管理" name="2"></el-tab-pane>
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
                this.$router.push('root')
            }
        }
    },
}
</script>

<style lang="scss">
.totalPage{
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