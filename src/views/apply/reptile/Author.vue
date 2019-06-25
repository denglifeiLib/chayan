<template>
    <div class="totalPage">
        <!-- tab content -->
        <div class="list-wrapper mt25">
            <el-tabs v-model="activeName">
                <el-tab-pane label="爬虫授权" name="1"></el-tab-pane>
                <el-tab-pane label="权限配置" name="2"></el-tab-pane>
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
    name: 'reptile_author',
    data() {
        return {
            activeName: '1'
        }
    },
    watch: {
        activeName(val, oldval) {
            if(val === '1') {
                this.$router.push({name: 'reptile_author'})
            }
            if(val === '2') {
                this.$router.push({name: 'reptile_author_set'})
            }
        }
    }
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